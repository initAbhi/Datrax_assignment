import React from "react";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { ChangeType } from "../types/enums";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const CreateRequest: React.FC = () => {
  const {
    items,
    selectedItem,
    loading,
    error,
    register,
    handleSubmit,
    errors,
    watchChangeType,
    navigate,
  } = useCreateRequest();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Create Change Request
          </h2>
        </CardHeader>
        <CardBody>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Menu Item
              </label>
              <select
                {...register("itemId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Select Item --</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.itemId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.itemId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Type
              </label>
              <select
                {...register("changeType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={ChangeType.PRICE_UPDATE}>Price Update</option>
                <option value={ChangeType.AVAILABILITY_UPDATE}>
                  Availability Update
                </option>
                <option value={ChangeType.DESCRIPTION_UPDATE}>
                  Description Update
                </option>
              </select>
              {errors.changeType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.changeType.message}
                </p>
              )}
            </div>

            {selectedItem && (
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Current Value:</p>
                <p className="font-medium text-gray-900">
                  {watchChangeType === ChangeType.PRICE_UPDATE &&
                    `$${selectedItem.currentPrice}`}
                  {watchChangeType === ChangeType.AVAILABILITY_UPDATE &&
                    (selectedItem.currentAvailability
                      ? "Available"
                      : "Unavailable")}
                  {watchChangeType === ChangeType.DESCRIPTION_UPDATE &&
                    (selectedItem.description || "No description")}
                </p>
              </div>
            )}

            {watchChangeType === ChangeType.AVAILABILITY_UPDATE ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Availability
                </label>
                <select
                  {...register("newValue")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">-- Select --</option>
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
                {errors.newValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newValue.message}
                  </p>
                )}
              </div>
            ) : (
              <Input
                label={
                  watchChangeType === ChangeType.PRICE_UPDATE
                    ? "New Price"
                    : "New Description"
                }
                {...register("newValue")}
                error={errors.newValue?.message}
                type={
                  watchChangeType === ChangeType.PRICE_UPDATE
                    ? "number"
                    : "text"
                }
                step={
                  watchChangeType === ChangeType.PRICE_UPDATE
                    ? "0.01"
                    : undefined
                }
              />
            )}

            <Input
              label="Reason for Change"
              {...register("reason")}
              error={errors.reason?.message}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="secondary"
                className="mr-3"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
