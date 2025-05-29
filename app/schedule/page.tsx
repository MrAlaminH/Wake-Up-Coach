"use client";

import { useState, useEffect } from "react";
import { CallSchedulerForm } from "./components/call-scheduler-form";
import { ScheduleSkeleton } from "./components/schedule-skeleton";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

const FORM_STORAGE_KEY = "schedule_form_data";
const WEBHOOK_URL =
  "https://n8n.deployify.xyz/webhook/51124d03-6f93-4c3a-a795-6c6233520c49";

export default function SchedulePage() {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initializePage = async () => {
      // Add a minimum loading time to prevent flicker
      const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 800));

      // Wait for both auth and minimum loading time
      await Promise.all([
        new Promise((resolve) => {
          if (!authLoading) resolve(true);
        }),
        minLoadingTime,
      ]);

      if (mounted) {
        setIsLoading(false);
      }
    };

    initializePage();

    return () => {
      mounted = false;
    };
  }, [authLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return <ScheduleSkeleton />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Schedule Your Wake-Up Call</h1>
            <p className="text-muted-foreground">
              Set up your wake-up call by choosing a date, time, and providing
              your contact information.
            </p>
          </div>

          <CallSchedulerForm
            onSubmit={async (data) => {
              try {
                // Calculate the schedule time by combining date and time
                const dateObj = parseISO(data.date);
                const [hours, minutes] = data.time.split(":");
                dateObj.setHours(parseInt(hours, 10));
                dateObj.setMinutes(parseInt(minutes, 10));
                dateObj.setSeconds(0);
                dateObj.setMilliseconds(0);

                const scheduleTime = dateObj.toISOString();

                const response = await fetch(WEBHOOK_URL, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...data,
                    schedule_time: scheduleTime,
                    user_id: user?.id,
                    email: user?.email,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Failed to schedule wake-up call");
                }

                // Show success message
                toast({
                  title: "Success!",
                  description:
                    "Your wake-up call has been scheduled successfully.",
                });

                // Clear form data from local storage on successful submission
                localStorage.removeItem(FORM_STORAGE_KEY);
              } catch (error) {
                console.error("Error scheduling call:", error);
                toast({
                  title: "Error",
                  description:
                    "Failed to schedule wake-up call. Please try again.",
                  variant: "destructive",
                });
                throw error;
              }
            }}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}
