const FORM_STORAGE_KEY = 'wake_call_form_data'

export interface FormData {
  name: string
  phone_number: string
  date: string
  time: string
  reason: string
}

export const formPersistence = {
  save: (data: Partial<FormData>) => {
    try {
      const existingData = formPersistence.load()
      const newData = { ...existingData, ...data }
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(newData))
    } catch (error) {
      console.error('Error saving form data:', error)
    }
  },

  load: (): Partial<FormData> => {
    try {
      const data = localStorage.getItem(FORM_STORAGE_KEY)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error loading form data:', error)
      return {}
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing form data:', error)
    }
  }
} 