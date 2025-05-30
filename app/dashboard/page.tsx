"use client";

import { useState, useEffect } from "react";
import { CallCard } from "@/components/call-card";
import { StatsCards } from "@/components/stats-cards";
import { ProtectedRoute } from "@/components/protected-route";
import { DatabaseStatus } from "@/components/database-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/components/auth-provider";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { WakeCall, CallStats } from "@/types";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { useToast } from "@/hooks/use-toast"; // Import useToast hook

// Helper function to calculate stats from a list of calls
const calculateStats = (calls: WakeCall[]): CallStats => {
  const totalCalls = calls.length;
  const successfulCalls = calls.filter(
    (call) => call.status === "completed"
  ).length;
  const failedCalls = calls.filter(
    (call) => call.status === "failed" || call.status === "missed"
  ).length;
  const upcomingCallsCount = calls.filter(
    (call) =>
      new Date(call.scheduled_at) > new Date() && call.status === "scheduled"
  ).length;
  const successRate =
    totalCalls === 0 ? 0 : Math.round((successfulCalls / totalCalls) * 100);
  return {
    totalCalls,
    successfulCalls,
    failedCalls,
    upcomingCalls: upcomingCallsCount,
    successRate,
  };
};

export default function DashboardPage() {
  const [calls, setCalls] = useState<WakeCall[]>([]); // Initialize calls as empty array
  const [stats, setStats] = useState<CallStats | null>(null); // Initialize stats as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const { user } = useAuth();
  const { toast } = useToast(); // Initialize useToast

  // Fetch data from Supabase on component mount
  useEffect(() => {
    let subscription: any;

    const fetchCalls = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("wake_calls")
        .select("*")
        .order("scheduled_at", { ascending: true });

      if (error) {
        console.error("Error fetching calls:", error);
        setError(error.message);
        setLoading(false);
      } else {
        setCalls(data as WakeCall[]);
        // Calculate stats from fetched data
        setStats(calculateStats(data as WakeCall[]));
        setLoading(false);
      }
    };

    fetchCalls();

    // Real-time subscription
    subscription = supabase
      .channel("public:wake_calls")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wake_calls" },
        (payload) => {
          fetchCalls(); // Refetch data on any change
        }
      )
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const upcomingCalls = calls.filter(
    (call) =>
      new Date(call.scheduled_at) > new Date() && call.status === "scheduled"
  );
  const pastCalls = calls
    .filter(
      (call) =>
        new Date(call.scheduled_at) <= new Date() || call.status !== "scheduled"
    )
    .sort(
      (a, b) =>
        new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
    );

  const handleCancelCall = async (id: string) => {
    // Make function async
    const { error } = await supabase.from("wake_calls").delete().eq("id", id);

    if (error) {
      console.error("Error cancelling call:", error);
      // Optionally, show an error message to the user
      toast({
        title: "Error",
        description: `Failed to cancel call: ${error.message}`,
        variant: "destructive",
      });
    } else {
      // Update state only if delete was successful
      setCalls((prev) => {
        const updatedCalls = prev.filter((call) => call.id !== id);
        // Re-calculate stats based on updatedCalls
        setStats(calculateStats(updatedCalls));
        return updatedCalls; // Return the updated calls array
      });
    }
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
          </div>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DatabaseStatus />

            {/* Display loading or error messages */}
            {loading && <p>Loading calls...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    Welcome back,{" "}
                    {user?.user_metadata?.name ||
                      user?.email?.split("@")[0] ||
                      "User"}
                    !
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your wake-up calls and view statistics
                  </p>
                </div>
                <Button asChild>
                  <Link href="/schedule">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New Call
                  </Link>
                </Button>
              </div>
            )}

            {/* Pass stats only when not loading and no error */}
            {!loading && !error && stats && <StatsCards stats={stats} />}

            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Calls</TabsTrigger>
                <TabsTrigger value="history">Call History</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Wake-Up Calls</CardTitle>
                    <CardDescription>
                      Your scheduled calls that haven't been completed yet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Display upcoming calls only when not loading and no error */}
                    {!loading &&
                      !error &&
                      (upcomingCalls.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {upcomingCalls.map((call) => (
                            <CallCard
                              key={call.id}
                              call={call}
                              onCancel={handleCancelCall}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            No upcoming calls scheduled
                          </p>
                          <Button asChild>
                            <Link href="/schedule">
                              <Plus className="mr-2 h-4 w-4" />
                              Schedule Your First Call
                            </Link>
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Call History</CardTitle>
                    <CardDescription>
                      Your past wake-up calls and their outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Display past calls only when not loading and no error */}
                    {!loading &&
                      !error &&
                      (pastCalls.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {pastCalls.map((call) => (
                            <CallCard key={call.id} call={call} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No call history available
                          </p>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
