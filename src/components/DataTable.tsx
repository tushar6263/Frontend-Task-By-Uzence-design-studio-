import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number | string>>(new Set());

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const aVal = a[col.dataIndex];
      const bVal = b[col.dataIndex];
      if (aVal === bVal) return 0;
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [data, sortKey, sortOrder, columns]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(o => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSelectRow = (id: number | string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    if (onRowSelect) {
      onRowSelect(data.filter(d => newSelected.has(d.id)));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center items-center">
        <span className="animate-spin text-gray-400">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2"/>
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"/>
          </svg>
        </span>
        <span className="ml-2 text-gray-500">Loading...</span>
      </div>
    );
  }

  // Empty state
  if (!sortedData.length) {
    return (
      <div className="w-full py-8 flex justify-center items-center text-gray-500">
        No data available.
      </div>
    );
  }

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          {selectable && <th className="px-4 py-2"></th>}
          {columns.map(col => (
            <th
              key={col.key}
              className={`px-4 py-2 text-left cursor-pointer select-none`}
              onClick={() => col.sortable && handleSort(col.key)}
            >
              {col.title}
              {col.sortable && (
                <span className="ml-1">
                  {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
       {sortedData.map(row => (
          <tr key={row.id} className="border-t">
            {selectable && (
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="px-4 py-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}