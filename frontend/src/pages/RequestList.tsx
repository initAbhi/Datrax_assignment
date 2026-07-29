import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableHeader, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useRequestList } from '../hooks/useRequestList';

interface RequestListProps {
  type: 'my' | 'pending' | 'approved';
}

export const RequestList: React.FC<RequestListProps> = ({ type }) => {
  const { requests, loading } = useRequestList(type);

  const titles = {
    my: 'My Requests',
    pending: 'Pending Requests',
    approved: 'Approved Queue'
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">{titles[type]}</h1>
      
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No requests found.</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Request Number</TableHeader>
                <TableHeader>Item Name</TableHeader>
                <TableHeader>Change Type</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-gray-900">
                    {request.requestNumber}
                  </TableCell>
                  <TableCell>{request.item?.name}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {request.changeType.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={request.status.toLowerCase() as any}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link 
                      to={`/requests/${request.id}`}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};
