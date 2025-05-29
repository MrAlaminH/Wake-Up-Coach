export interface User {
  id: string
  email: string
  name?: string
}

export interface WakeCall {
  id: string
  user_id: string
  scheduled_at: string
  reason: string
  status: "scheduled" | "completed" | "failed" | "missed" | "cancelled"
  retries: number
  phone_number?: string
  created_at: string
  updated_at?: string
}

export interface CallStats {
  totalCalls: number
  successfulCalls: number
  failedCalls: number
  upcomingCalls: number
  successRate: number
}

export interface ScheduleCallData {
  date: string
  time: string
  reason: string
  name: string
  phone_number: string
}

export interface UserProfile {
  id: string
  name?: string
  phone_number?: string
  timezone?: string
  notification_preferences?: {
    email: boolean
    sms: boolean
  }
  created_at: string
  updated_at: string
}

export interface UserIntegration {
  id: string
  user_id: string
  integration_type: string
  integration_data: any
  is_active: boolean
  created_at: string
  updated_at: string
}
