"use client"

import { useState } from "react"
import { CallCard } from "@/components/call-card"
import { StatsCards } from "@/components/stats-cards"
import { ProtectedRoute } from "@/components/protected-route"
import { DatabaseStatus } from "@/components/database-status"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useAuth } from "@/components/auth-provider"
import { Plus } from 'lucide-react'
import Link from "next/link"
import type { WakeCall, CallStats } from "@/types"

// Mock data - will be replaced with real data once database is set up
const mockCalls: WakeCall[] = [
  {
    id: "1",
    user_id: "user1",
    scheduled_at: "2024-01-15T07:00:00Z",
    reason: "Important client meeting",
    status: "scheduled",
    retries: 0,
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "2",
    user_id: "user1",
    scheduled_at: "2024-01-12T06:30:00Z",
    reason: "Flight to New York",
    status: "completed",
    retries: 0,
    created_at: "2024-01-08T15:30:00Z",
  },
  {
    id: "3",
    user_id: "user1",
    scheduled_at: "2024-01-10T08:00:00Z",
    reason: "Job interview",
    status: "failed",
    retries: 2,
    created_at: "2024-01-05T12:00:00Z",
  },
]

const mockStats: CallStats = {
  totalCalls: 15,
  successfulCalls: 12,
  failedCalls: 3,
  upcomingCalls: 2,
  successRate: 80,
}

export default function DashboardPage() {
  const [calls, setCalls] = useState<WakeCall[]>(mockCalls)
  const [stats, setStats] = useState<CallStats>(mockStats)
  const { user } = useAuth()

  const upcomingCalls = calls.filter((call) => new Date(call.scheduled_at) > new Date() && call.status === "scheduled")
  const pastCalls = calls.filter((call) => new Date(call.scheduled_at) <= new Date() || call.status !== "scheduled")

  const handleCancelCall = (id: string) => {
    setCalls((prev) => prev.filter((call) => call.id !== id))
    // In real app, make API call to cancel the call
  }

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
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}!
                </h1>
                <p className="text-muted-foreground">Manage your wake-up calls and view statistics</p>
              </div>
              <Button asChild>
                <Link href="/schedule">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Call
                </Link>
              </Button>
            </div>

            <StatsCards stats={stats} />

            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Calls</TabsTrigger>
                <TabsTrigger value="history">Call History</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Wake-Up Calls</CardTitle>
                    <CardDescription>Your scheduled calls that haven't been completed yet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingCalls.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingCalls.map((call) => (
                          <CallCard key={call.id} call={call} onCancel={handleCancelCall} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No upcoming calls scheduled</p>
                        <Button asChild>
                          <Link href="/schedule">
                            <Plus className="mr-2 h-4 w-4" />
                            Schedule Your First Call
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Call History</CardTitle>
                    <CardDescription>Your past wake-up calls and their outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pastCalls.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pastCalls.map((call) => (
                          <CallCard key={call.id} call={call} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No call history available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
