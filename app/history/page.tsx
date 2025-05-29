"use client"

import { useState } from "react"
import { CallCard } from "@/components/call-card"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from 'lucide-react'
import type { WakeCall } from "@/types"

// Mock data - replace with actual API calls
const mockCallHistory: WakeCall[] = [
  {
    id: "1",
    user_id: "user1",
    scheduled_at: "2024-01-12T06:30:00Z",
    reason: "Flight to New York",
    status: "completed",
    retries: 0,
    created_at: "2024-01-08T15:30:00Z",
  },
  {
    id: "2",
    user_id: "user1",
    scheduled_at: "2024-01-10T08:00:00Z",
    reason: "Job interview",
    status: "failed",
    retries: 2,
    created_at: "2024-01-05T12:00:00Z",
  },
  {
    id: "3",
    user_id: "user1",
    scheduled_at: "2024-01-08T07:15:00Z",
    reason: "Important client meeting",
    status: "completed",
    retries: 1,
    created_at: "2024-01-03T09:00:00Z",
  },
  {
    id: "4",
    user_id: "user1",
    scheduled_at: "2024-01-05T06:00:00Z",
    reason: "Early morning workout",
    status: "missed",
    retries: 3,
    created_at: "2024-01-01T20:00:00Z",
  },
  {
    id: "5",
    user_id: "user1",
    scheduled_at: "2024-01-03T09:30:00Z",
    reason: "Doctor appointment",
    status: "completed",
    retries: 0,
    created_at: "2023-12-28T14:00:00Z",
  },
]

export default function CallHistoryPage() {
  const [calls, setCalls] = useState<WakeCall[]>(mockCallHistory)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredCalls = calls.filter((call) => {
    const matchesSearch = call.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || call.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusStats = () => {
    const total = calls.length
    const completed = calls.filter((call) => call.status === "completed").length
    const failed = calls.filter((call) => call.status === "failed").length
    const missed = calls.filter((call) => call.status === "missed").length

    return { total, completed, failed, missed }
  }

  const stats = getStatusStats()

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
          </div>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Call History</h1>
                <p className="text-muted-foreground">View and manage your past wake-up calls</p>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export History
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Failed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Missed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.missed}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter & Search</CardTitle>
                <CardDescription>Find specific calls in your history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="missed">Missed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Call History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Call History</CardTitle>
                  <Badge variant="secondary">{filteredCalls.length} calls</Badge>
                </div>
                <CardDescription>Your complete wake-up call history</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredCalls.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCalls.map((call) => (
                      <CallCard key={call.id} call={call} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No calls found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
