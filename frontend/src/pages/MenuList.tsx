import React, { useEffect, useState } from 'react';
import { menuItemService } from '../api/services';
import { Card } from '../components/ui/Card';
import { Table, TableHead, TableRow, TableHeader, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import type { MenuItem } from '../types';

export const MenuList: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await menuItemService.getAll();
        if (response.data.success) {
          setItems(response.data.data);
        } else {
          setError('Failed to fetch menu items');
        }
      } catch (err: any) {
        console.error('Failed to fetch menu items', err);
        setError(err.response?.data?.message || 'Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Current Menu</h1>
      
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading menu...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No menu items found.</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Item Name</TableHeader>
                <TableHeader>Current Price</TableHeader>
                <TableHeader>Availability</TableHeader>
                <TableHeader>Description</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-gray-900">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    ${Number(item.currentPrice).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {item.currentAvailability ? (
                      <Badge variant="approved">Available</Badge>
                    ) : (
                      <Badge variant="rejected">Unavailable</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 truncate max-w-xs block">
                      {item.description || 'No description'}
                    </span>
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
