import { useState, useEffect, useCallback } from "react";
import { changeRequestService } from "../api/services";
import { type ChangeRequest } from "../types";

export type RequestListType = "my" | "pending" | "approved";

export const useRequestList = (type: RequestListType) => {
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let response;
      if (type === "my") {
        response = await changeRequestService.getMyRequests();
      } else if (type === "pending") {
        response = await changeRequestService.getPending();
      } else {
        response = await changeRequestService.getApprovedQueue();
      }

      if (response.data.success) {
        setRequests(response.data.data);
      } else {
        setError("Failed to fetch requests");
      }
    } catch (err: any) {
      console.error("Failed to fetch requests", err);
      setError(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    refresh: fetchRequests,
  };
};
