import { supabase } from './supabase'
import type { WakeCall } from '@/types'

export const database = {
  // Check if tables exist
  async checkTablesExist() {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1)

      return !error
    } catch (error) {
      return false
    }
  },

  // Wake Calls
  async getWakeCalls(userId: string) {
    try {
      const { data, error } = await supabase
        .from('wake_calls')
        .select('*')
        .eq('user_id', userId)
        .order('scheduled_at', { ascending: false })

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('Wake calls table not created yet - returning mock data')
          return []
        }
        throw error
      }
      return data as WakeCall[]
    } catch (error) {
      console.log('Database not ready, using mock data')
      return []
    }
  },

  async createWakeCall(wakeCall: Omit<WakeCall, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('wake_calls')
        .insert([wakeCall])
        .select()
        .single()

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('Wake calls table not created yet - simulating success')
          return { ...wakeCall, id: 'mock-id', created_at: new Date().toISOString() } as WakeCall
        }
        throw error
      }
      return data as WakeCall
    } catch (error) {
      console.log('Database not ready, simulating call creation')
      return { ...wakeCall, id: 'mock-id', created_at: new Date().toISOString() } as WakeCall
    }
  },

  async updateWakeCall(id: string, updates: Partial<WakeCall>) {
    try {
      const { data, error } = await supabase
        .from('wake_calls')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('Wake calls table not created yet - simulating update')
          return { id, ...updates } as WakeCall
        }
        throw error
      }
      return data as WakeCall
    } catch (error) {
      console.log('Database not ready, simulating call update')
      return { id, ...updates } as WakeCall
    }
  },

  async deleteWakeCall(id: string) {
    try {
      const { error } = await supabase
        .from('wake_calls')
        .delete()
        .eq('id', id)

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('Wake calls table not created yet - simulating delete')
          return
        }
        throw error
      }
    } catch (error) {
      console.log('Database not ready, simulating call deletion')
    }
  },

  // User Profiles
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('User profiles table not created yet')
          return null
        }
        if (error.code === 'PGRST116') {
          // No rows found - this is okay for new users
          return null
        }
        throw error
      }
      return data
    } catch (error) {
      console.log('Database not ready, profile unavailable')
      return null
    }
  },

  async updateUserProfile(userId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({ id: userId, ...updates })
        .select()
        .single()

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('User profiles table not created yet - simulating update')
          return { id: userId, ...updates }
        }
        throw error
      }
      return data
    } catch (error) {
      console.log('Database not ready, simulating profile update')
      return { id: userId, ...updates }
    }
  },

  // User Integrations
  async getUserIntegrations(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', userId)

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('User integrations table not created yet')
          return []
        }
        throw error
      }
      return data
    } catch (error) {
      console.log('Database not ready, integrations unavailable')
      return []
    }
  },

  async upsertIntegration(userId: string, integrationType: string, integrationData: any) {
    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .upsert({
          user_id: userId,
          integration_type: integrationType,
          integration_data: integrationData,
          is_active: true
        })
        .select()
        .single()

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('User integrations table not created yet - simulating upsert')
          return { user_id: userId, integration_type: integrationType, integration_data: integrationData, is_active: true }
        }
        throw error
      }
      return data
    } catch (error) {
      console.log('Database not ready, simulating integration upsert')
      return { user_id: userId, integration_type: integrationType, integration_data: integrationData, is_active: true }
    }
  },

  async deleteIntegration(userId: string, integrationType: string) {
    try {
      const { error } = await supabase
        .from('user_integrations')
        .delete()
        .eq('user_id', userId)
        .eq('integration_type', integrationType)

      if (error) {
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('User integrations table not created yet - simulating delete')
          return
        }
        throw error
      }
    } catch (error) {
      console.log('Database not ready, simulating integration deletion')
    }
  }
}
