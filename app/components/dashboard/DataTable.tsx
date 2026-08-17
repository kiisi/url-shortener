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
  isLoading?: boolean;
  isPending?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyState,
  isLoading,
  isPending,
}: DataTableProps<T>) {

  if (isLoading) {
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
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={cn(
                        "px-6 py-4",
                        col.className
                      )}
                    >
                      <div
                        className={cn(
                          "h-4 rounded-md bg-surface animate-pulse",
                          columnIndex === 0
                            ? "w-36"
                            : columnIndex === columns.length - 1
                              ? "w-20"
                              : "w-28"
                        )}
                      />
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

  if (data?.length === 0 && emptyState) {
    return <div className="mt-6">{emptyState}</div>;
  }

  return (
    <div className="w-full bg-white border border-border rounded-2xl overflow-hidden">
      <div className="relative overflow-x-auto">
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
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
