"use client"

import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { database } from '@/lib/database'
import { AlertTriangle, Database, ExternalLink } from 'lucide-react'

export function DatabaseStatus() {
  const [tablesExist, setTablesExist] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const exists = await database.checkTablesExist()
        setTablesExist(exists)
      } catch (error) {
        setTablesExist(false)
      } finally {
        setChecking(false)
      }
    }

    checkDatabase()
  }, [])

  if (checking) {
    return null
  }

  if (tablesExist) {
    return null
  }

  return (
    <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <Database className="h-5 w-5" />
          Database Setup Required
        </CardTitle>
        <CardDescription className="text-yellow-700 dark:text-yellow-300">
          The database tables haven't been created yet. The app will work with limited functionality until the schema is set up.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-yellow-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Next Steps:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Go to your Supabase dashboard</li>
              <li>Navigate to the SQL Editor</li>
              <li>Copy and paste the schema from the database/schema.sql file</li>
              <li>Execute the SQL to create tables and policies</li>
            </ol>
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://uibbbjhfxrtbgsxrihck.supabase.co/project/default/sql', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Supabase SQL Editor
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.reload()}
          >
            Refresh After Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
