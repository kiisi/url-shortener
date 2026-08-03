"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface border border-border/50",
        className
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <div className="flex items-baseline gap-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <Skeleton className="flex-1 w-full rounded-xl" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 px-6 border-b border-border">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-5 w-32 ml-auto" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}
