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
import { supabase } from "@/lib/supabaseClient"; // Import supabase client

const FORM_STORAGE_KEY = "schedule_form_data";

// Read webhook URL from environment variable
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

// Ensure webhook URL is defined
if (!WEBHOOK_URL) {
  throw new Error(
    "Missing Webhook URL. Make sure NEXT_PUBLIC_WEBHOOK_URL is set in your environment variables."
  );
}

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
              // Calculate the schedule time by combining date and time
              const dateObj = parseISO(data.date);
              const [hours, minutes] = data.time.split(":");
              dateObj.setHours(parseInt(hours, 10));
              dateObj.setMinutes(parseInt(minutes, 10));
              dateObj.setSeconds(0);
              dateObj.setMilliseconds(0);

              const scheduleTime = dateObj.toISOString();

              // Data to be inserted into Supabase and sent to webhook
              const payload = {
                user_id: user?.id, // Get user ID from auth hook
                scheduled_at: scheduleTime,
                reason: data.reason || null,
                phone_number: data.phone_number || null,
                status: "scheduled",
                retries: 0,
                email: user?.email, // Include email for webhook
                name: user?.user_metadata?.name || null, // Include user's name for webhook
              };

              let supabaseError = null;
              let webhookError = null;

              // Attempt to insert data into Supabase
              const { data: insertedCall, error: dbError } = await supabase
                .from("wake_calls")
                .insert([
                  {
                    user_id: payload.user_id,
                    scheduled_at: payload.scheduled_at,
                    reason: payload.reason,
                    phone_number: payload.phone_number,
                    status: payload.status,
                    retries: payload.retries,
                  },
                ])
                .select()
                .single();

              if (dbError) {
                console.error("Error inserting call into Supabase:", dbError);
                supabaseError = dbError;
              }

              // Attempt to send data to webhook
              try {
                // Include the newly created call ID in the webhook payload
                const webhookPayload = {
                  ...payload,
                  id: insertedCall?.id, // Add the generated Supabase row ID
                };
                const response = await fetch(WEBHOOK_URL!, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(webhookPayload),
                });

                if (!response.ok) {
                  webhookError = new Error(
                    `Webhook failed with status: ${response.status}`
                  );
                  console.error("Webhook error:", webhookError);
                }
              } catch (error) {
                webhookError = error;
                console.error("Error sending data to webhook:", error);
              }

              // Provide feedback to the user
              if (!supabaseError && !webhookError) {
                toast({
                  title: "Success!",
                  description:
                    "Your wake-up call has been scheduled successfully (Supabase and Webhook).",
                });
                // Clear form data only if both were successful (or adjust based on preference)
                localStorage.removeItem(FORM_STORAGE_KEY);
              } else if (supabaseError && webhookError) {
                toast({
                  title: "Error",
                  description:
                    "Failed to schedule call in Supabase AND send to webhook.",
                  variant: "destructive",
                });
              } else if (supabaseError) {
                toast({
                  title: "Supabase Error",
                  description: `Failed to save call to database: ${supabaseError.message}. Webhook call attempted.`,
                  variant: "destructive",
                });
              } else if (webhookError) {
                toast({
                  title: "Webhook Error",
                  description: `Failed to send data to webhook: ${
                    webhookError instanceof Error
                      ? webhookError.message
                      : String(webhookError)
                  }. Supabase insertion attempted.`,
                  variant: "destructive",
                });
                // Consider if you want to clear local storage if only webhook fails but supabase succeeds
                // localStorage.removeItem(FORM_STORAGE_KEY);
              }
            }}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}
