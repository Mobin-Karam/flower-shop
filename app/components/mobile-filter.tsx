"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { Button } from "@/app/components/ui/button";

export default function MobileFilter({
  search,
  setSearch,
  tags,
  activeTag,
  setActiveTag,
  clearFilters,
}: any) {
  return (
    <div className="lg:hidden container-custom py-3 space-y-3">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setActiveTag(null);
        }}
        placeholder="جستجو..."
        className="input bg-background text-foreground border-border"
      />

      {/* FILTER DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-card text-foreground border-border"
          >
            <span className="flex items-center gap-2">
              <Filter size={16} />
              فیلتر دسته‌بندی
            </span>

            {activeTag && (
              <span className="text-xs text-primary">{activeTag}</span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {tags.map((tag: string) => {
            const active = activeTag === tag;

            return (
              <DropdownMenuItem
                key={tag}
                onClick={() => setActiveTag(active ? null : tag)}
                className={`cursor-pointer flex justify-between ${
                  active ? "text-primary font-medium" : ""
                }`}
              >
                <span className="text-right w-full">{tag}</span>

                {active && <span className="text-xs text-primary">✓</span>}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem
            onClick={clearFilters}
            className="text-destructive cursor-pointer"
          >
            پاک‌سازی فیلترها
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* CLEAR BUTTON (optional UX improvement) */}
      {(search || activeTag) && (
        <Button
          variant="ghost"
          className="text-xs text-destructive w-full"
          onClick={clearFilters}
        >
          پاک‌سازی
        </Button>
      )}
    </div>
  );
}
