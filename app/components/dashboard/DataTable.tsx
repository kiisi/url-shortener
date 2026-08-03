"use client";

import { ReactNode } from "react";
import { cn } from "@/utils";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyState?: ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyState,
}: DataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <div className="mt-6">{emptyState}</div>;
  }

  return (
    <div className="w-full bg-white border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-4 font-semibold text-heading whitespace-nowrap",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-surface/50 transition-colors group"
              >
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={cn(
                      "px-6 py-4 text-paragraph",
                      col.className
                    )}
                  >
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                        ? (item[col.accessorKey] as ReactNode)
                        : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
