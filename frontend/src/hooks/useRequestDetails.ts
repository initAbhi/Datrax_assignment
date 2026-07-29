import { useState, useEffect, useCallback } from "react";
import { changeRequestService } from "../api/services";
import type { ChangeRequest } from "../types";

export const useRequestDetails = (id: string | undefined) => {
  const [request, setRequest] = useState<ChangeRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDetails = useCallback(async () => {
    if (!id) return;
    try {
      const response = await changeRequestService.getDetails(id);
      if (response.data.success) {
        setRequest(response.data.data);
      } else {
        setError("Failed to fetch request details");
      }
    } catch (err) {
      setError("Failed to fetch request details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    if (!id) return;
    setActionLoading(true);
    try {
      await changeRequestService.updateStatus(id, status);
      await fetchDetails();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    request,
    loading,
    actionLoading,
    error,
    handleAction,
    refresh: fetchDetails,
  };
};
