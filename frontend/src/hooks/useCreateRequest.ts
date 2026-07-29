import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRequestSchema,
  type CreateRequestFormData,
} from "../schemas/changeRequest.schema";
import { menuItemService, changeRequestService } from "../api/services";
import { ChangeType } from "../types/enums";

export const useCreateRequest = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      changeType: ChangeType.PRICE_UPDATE,
    },
  });

  const watchItemId = watch("itemId");
  const watchChangeType = watch("changeType");

  // Fetch menu items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await menuItemService.getAll();
        if (response.data.success) {
          setItems(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch items", err);
        setError("Failed to load menu items");
      }
    };
    fetchItems();
  }, []);

  // Update selectedItem details whenever form item selection changes
  useEffect(() => {
    if (watchItemId) {
      const item = items.find((i) => i.id === watchItemId);
      setSelectedItem(item || null);
    } else {
      setSelectedItem(null);
    }
  }, [watchItemId, items]);

  // Form submit handler
  const onSubmit = async (data: CreateRequestFormData) => {
    setLoading(true);
    setError("");
    try {
      let oldValue = "";
      if (selectedItem) {
        if (data.changeType === ChangeType.PRICE_UPDATE) {
          oldValue = selectedItem.currentPrice.toString();
        } else if (data.changeType === ChangeType.AVAILABILITY_UPDATE) {
          oldValue = selectedItem.currentAvailability.toString();
        } else if (data.changeType === ChangeType.DESCRIPTION_UPDATE) {
          oldValue = selectedItem.description || "";
        }
      }

      const response = await changeRequestService.create({
        ...data,
        oldValue,
      });

      if (response.data.success) {
        navigate("/requests/my");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    selectedItem,
    loading,
    error,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    watchChangeType,
    navigate,
  };
};
