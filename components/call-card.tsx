"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { WakeCall } from "@/types";

interface CallCardProps {
  call: WakeCall;
  onCancel?: (id: string) => void;
}

export function CallCard({ call, onCancel }: CallCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "missed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const scheduledDate = new Date(call.scheduled_at);
  const isUpcoming = scheduledDate > new Date();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Wake-Up Call
          </CardTitle>
          <Badge className={getStatusColor(call.status)}>
            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(scheduledDate, "PPP")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{format(scheduledDate, "p")}</span>
        </div>

        {call.reason && (
          <div className="text-sm">
            <span className="font-medium">Reason: </span>
            <span className="text-muted-foreground">{call.reason}</span>
          </div>
        )}

        {isUpcoming && call.status === "scheduled" && onCancel && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(call.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Cancel Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
