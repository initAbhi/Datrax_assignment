import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
      {children}
    </thead>
  );
};

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <tr className={`bg-white border-b hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <th scope="col" className={`px-6 py-3 font-medium ${className}`}>
      {children}
    </th>
  );
};

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <td className={`px-6 py-4 ${className}`}>
      {children}
    </td>
  );
};
