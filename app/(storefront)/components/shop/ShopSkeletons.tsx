import Skeleton from "react-loading-skeleton";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-border rounded-xl p-3 space-y-3 bg-card"
        >
          <Skeleton height={160} borderRadius={12} />
          <Skeleton height={14} width="85%" />
          <Skeleton height={12} width="60%" />
          <Skeleton height={20} width="45%" />
        </div>
      ))}
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton height={16} width="60%" />
          <Skeleton height={12} width="80%" />
          <Skeleton height={12} width="70%" />
          <Skeleton height={12} width="75%" />
        </div>
      ))}
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-20 space-y-2">
          <Skeleton height={64} borderRadius={12} />
          <Skeleton height={12} width="80%" />
        </div>
      ))}
    </div>
  );
}
