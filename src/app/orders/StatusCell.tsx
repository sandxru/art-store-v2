"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

type StatusCellProps = {
  id: number;
  status: "p" | "c";
};

const StatusCell: React.FC<StatusCellProps> = ({ id, status }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = async () => {
    try {
      const newStatus = currentStatus === "p" ? "c" : "p";

      await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Reload the page after updating
      window.location.reload();
    } catch (error) {
      console.error("Failed to update the status:", error);
      setCurrentStatus(status); // Revert to previous status in case of failure
    }
  };

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger>
          <Badge
            onClick={() => setIsDialogOpen(true)}
            className={`cursor-pointer text-xs py-1 text-white rounded-md border-0 border-slate-200 ${
              currentStatus === "p" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            {currentStatus === "p" ? "Pending" : "Complete"}
          </Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to change the status to{" "}
            {currentStatus === "p" ? "Complete" : "Pending"}?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleStatusChange();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StatusCell;
