"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Group } from "@prisma/client";
interface Props {
  data: Group[];
}
export default function BrandsSelectList({ data }: Props) {
  return (
    <div>
      <Autocomplete
        label="Select a Brand"
        placeholder="Choose a brand"
        className="max-w-xs"
      >
        {data.map((group) => (
          <AutocompleteItem key={group.id} value={group.id}>
            {group.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
