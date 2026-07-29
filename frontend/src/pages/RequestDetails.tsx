import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { changeRequestService } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Check, X, ArrowLeft } from 'lucide-react';

export const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = async () => {
    try {
      if (id) {
        const response = await changeRequestService.getDetails(id);
        if (response.data.success) setRequest(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch request details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
    if (!id) return;
    setActionLoading(true);
    try {
      await changeRequestService.updateStatus(id, status);
      await fetchDetails();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  if (error || !request) return <div className="p-8 text-red-500">{error || 'Request not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Request Information</h2>
              <Badge variant={request.status.toLowerCase() as any}>{request.status}</Badge>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Request Number</p>
                  <p className="font-medium">{request.requestNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Item Name</p>
                  <p className="font-medium">{request.item?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Change Type</p>
                  <p className="font-medium bg-gray-100 px-2 py-1 rounded inline-block text-sm">
                    {request.changeType.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created By</p>
                  <p className="font-medium">{request.createdBy?.email}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4 grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded border border-red-100">
                  <p className="text-xs text-red-600 font-medium mb-1">Old Value</p>
                  <p className="text-sm strike-through text-gray-700">{request.oldValue || 'N/A'}</p>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-100">
                  <p className="text-xs text-green-600 font-medium mb-1">New Value</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {request.changeType === 'AVAILABILITY_UPDATE' 
                      ? (request.newValue === 'true' ? 'Available' : 'Unavailable') 
                      : request.newValue}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-500 mb-1">Reason for Change</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded border border-gray-100">
                  {request.reason}
                </p>
              </div>
            </CardBody>
          </Card>

          {user?.role === 'SUPERVISOR' && request.status === 'PENDING' && (
            <Card>
              <CardBody className="flex justify-end space-x-4">
                <Button 
                  variant="danger" 
                  onClick={() => handleAction('REJECTED')}
                  disabled={actionLoading}
                  className="flex items-center"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => handleAction('APPROVED')}
                  disabled={actionLoading}
                  className="flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
              </CardBody>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <h3 className="font-medium text-gray-900">Timeline</h3>
            </CardHeader>
            <CardBody>
              <div className="relative border-l border-gray-200 ml-3 space-y-6">
                <div className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </span>
                  <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900">Created</h3>
                  <time className="block mb-2 text-xs font-normal leading-none text-gray-400">
                    {new Date(request.createdAt).toLocaleString()}
                  </time>
                  <p className="text-xs font-normal text-gray-500">By {request.createdBy?.email}</p>
                </div>

                <div className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full -left-3 ring-4 ring-white">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </span>
                  <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900">Pending Review</h3>
                </div>

                {(request.status === 'APPROVED' || request.status === 'REJECTED') && (
                  <div className="ml-6">
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white ${request.status === 'APPROVED' ? 'bg-green-100' : 'bg-red-100'}`}>
                      <div className={`w-2 h-2 rounded-full ${request.status === 'APPROVED' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </span>
                    <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900">
                      {request.status === 'APPROVED' ? 'Approved' : 'Rejected'}
                    </h3>
                    {request.approvedAt && (
                      <time className="block mb-2 text-xs font-normal leading-none text-gray-400">
                        {new Date(request.approvedAt).toLocaleString()}
                      </time>
                    )}
                    <p className="text-xs font-normal text-gray-500">By {request.approvedBy?.email}</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
