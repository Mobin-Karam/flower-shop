"use client";

import { Filter } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import FilterSidebar, { FilterState, defaultFilters } from "./FilterSidebar";

type Props = {
  products: Product[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  activeCount: number;
};

export default function MobileFilterSheet({
  products,
  filters,
  onChange,
  activeCount,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={14} />
          فیلتر
          {activeCount > 0 && (
            <span className="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-right">فیلترها</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <FilterSidebar
            products={products}
            filters={filters}
            onChange={onChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
