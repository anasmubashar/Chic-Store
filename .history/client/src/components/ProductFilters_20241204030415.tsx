import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 20000]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">Category</h3>
        <Select onValueChange={(value) => onFilterChange({ category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Winter2024">Winter 2024</SelectItem>
            <SelectItem value="Summer2024">Summer 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Collection</h3>
        <Select
          onValueChange={(value) => onFilterChange({ collection: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Western">Western</SelectItem>
            <SelectItem value="Eastern">Eastern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          defaultValue={[0, 20000]}
          max={20000}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full"
          onClick={() =>
            onFilterChange({
              minPrice: priceRange[0].toString(),
              maxPrice: priceRange[1].toString(),
            })
          }
        >
          Apply Price Filter
        </Button>
      </div>
    </div>
  );
}
