"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, CheckCircle, ExternalLink, Info, Settings, Zap } from 'lucide-react'

export default function IntegrationsPage() {
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleGoogleCalendarConnect = async () => {
    setIsConnecting(true)

    try {
      // TODO: Implement Google Calendar OAuth flow
      console.log("Connecting to Google Calendar...")

      // Simulate connection process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsGoogleCalendarConnected(true)
    } catch (error) {
      console.error("Failed to connect Google Calendar:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleGoogleCalendarDisconnect = () => {
    // TODO: Implement disconnect logic
    console.log("Disconnecting Google Calendar...")
    setIsGoogleCalendarConnected(false)
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
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Integrations</h1>
              <p className="text-muted-foreground">
                Connect your favorite apps and services to enhance your WakeCall experience
              </p>
            </div>

            {/* Google Calendar Integration */}
            <Card className="border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Google Calendar
                        {isGoogleCalendarConnected && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>Automatically schedule wake-up calls based on your calendar events</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={isGoogleCalendarConnected}
                    onCheckedChange={isGoogleCalendarConnected ? handleGoogleCalendarDisconnect : handleGoogleCalendarConnect}
                    disabled={isConnecting}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Features
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Auto-schedule wake-up calls 30 minutes before important meetings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Sync with your calendar events in real-time
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Smart detection of early morning appointments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Customizable wake-up time offset for different event types
                    </li>
                  </ul>
                </div>

                {!isGoogleCalendarConnected ? (
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Connect your Google Calendar to automatically schedule wake-up calls for your important events.
                      </AlertDescription>
                    </Alert>
                    <Button
                      onClick={handleGoogleCalendarConnect}
                      disabled={isConnecting}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black"
                    >
                      {isConnecting ? "Connecting..." : "Connect Google Calendar"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-green-500/20 bg-green-50 dark:bg-green-950">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        Google Calendar is successfully connected! Wake-up calls will be automatically scheduled for your
                        events.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Settings
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGoogleCalendarDisconnect}
                        className="text-red-600 hover:text-red-700"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Coming Soon Integrations */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Coming Soon</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Outlook Calendar</CardTitle>
                        <CardDescription className="text-sm">Microsoft Outlook integration</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Zapier</CardTitle>
                        <CardDescription className="text-sm">Connect with 5000+ apps</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Apple Calendar</CardTitle>
                        <CardDescription className="text-sm">iCloud Calendar sync</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
