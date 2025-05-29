"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, User } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import type { ScheduleCallData } from "@/types";
import { formPersistence } from "@/lib/form-persistence";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth, userProfile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const FORM_STORAGE_KEY = "schedule_form_data";

interface CallSchedulerFormProps {
  onSubmit: (data: ScheduleCallData) => Promise<void>;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  phone_number?: string;
  date?: string;
  time?: string;
  reason?: string;
}

export function CallSchedulerForm({
  onSubmit,
  isLoading: parentLoading = false,
}: CallSchedulerFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const user = await auth.getCurrentUser();
        if (user) {
          const { data: profile, error } = await userProfile.getProfile(
            user.id
          );
          if (profile && !error) {
            setName(profile.name || "");
            setPhoneNumber(profile.phone_number || "");
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    loadUserProfile();
  }, []);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.date) setDate(new Date(data.date));
        if (data.time) setTime(data.time);
        if (data.reason) setReason(data.reason);
        if (data.name) setName(data.name);
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    const formData = {
      date: date?.toISOString(),
      time,
      reason,
      name,
      phoneNumber,
    };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [date, time, reason, name, phoneNumber]);

  const resetForm = () => {
    // Only reset scheduling-related fields
    setDate(undefined);
    setTime("");
    setReason("");

    // Clear errors and touched states for scheduling fields
    setErrors((prev) => ({
      ...prev,
      date: undefined,
      time: undefined,
      reason: undefined,
    }));
    setTouched((prev) => ({
      ...prev,
      date: false,
      time: false,
      reason: false,
    }));

    // Save the current state to localStorage, preserving name and phone
    const formData = {
      date: undefined,
      time: "",
      reason: "",
      name,
      phoneNumber,
    };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  };

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return undefined;

      case "phone_number":
        if (!value?.trim()) return "Phone number is required";
        // The react-phone-number-input component already handles validation
        return undefined;

      case "date":
        if (!value) return "Date is required";
        if (value < new Date()) return "Please select a future date";
        return undefined;

      case "time":
        if (!value?.trim()) return "Time is required";
        return undefined;

      case "reason":
        if (!value?.trim()) return "Reason is required";
        if (value.trim().length < 5)
          return "Reason must be at least 5 characters";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value =
      field === "date"
        ? date
        : field === "phone_number"
        ? phoneNumber
        : field === "name"
        ? name
        : field === "time"
        ? time
        : reason;
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all fields
    const fields = ["name", "phone_number", "date", "time", "reason"];
    fields.forEach((field) => {
      const value =
        field === "date"
          ? date
          : field === "phone_number"
          ? phoneNumber
          : field === "name"
          ? name
          : field === "time"
          ? time
          : reason;
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      phone_number: true,
      date: true,
      time: true,
      reason: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save user profile data
      const user = await auth.getCurrentUser();
      if (user) {
        const { error: profileError } = await userProfile.upsertProfile(
          user.id,
          {
            name,
            phone_number: phoneNumber,
          }
        );

        if (profileError) {
          console.error("Error saving user profile:", profileError);
          toast({
            title: "Warning",
            description:
              "Your call was scheduled, but we couldn't save your profile information.",
            variant: "destructive",
          });
        }
      }

      await onSubmit({
        date: format(date!, "yyyy-MM-dd"),
        time,
        reason,
        name,
        phone_number: phoneNumber,
      });

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Error",
        description: "Failed to schedule call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    resetForm();
  };

  const isLoading = isSubmitting || parentLoading;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Schedule Wake-Up Call
        </CardTitle>
        <CardDescription>
          Set up a reliable wake-up call for your important day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={cn("pl-10", errors.name && "border-red-500")}
                  required
                  disabled={isLoading}
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="US"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || "")}
                onBlur={() => handleBlur("phone_number")}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.phone_number && "border-red-500"
                )}
                disabled={isLoading}
              />
              {touched.phone_number && errors.phone_number && (
                <p className="text-sm text-red-500">{errors.phone_number}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      errors.date && "border-red-500"
                    )}
                    onBlur={() => handleBlur("date")}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || isLoading}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {touched.date && errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={() => handleBlur("time")}
                className={cn(errors.time && "border-red-500")}
                required
                disabled={isLoading}
              />
              {touched.time && errors.time && (
                <p className="text-sm text-red-500">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Important meeting at 9 AM, Flight departure, Job interview..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onBlur={() => handleBlur("reason")}
              className={cn("min-h-[100px]", errors.reason && "border-red-500")}
              required
              disabled={isLoading}
            />
            {touched.reason && errors.reason && (
              <p className="text-sm text-red-500">{errors.reason}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Scheduling...
                </div>
              ) : (
                "Schedule Call"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
