"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  NavbarItem,
  DropdownItem,
} from "@nextui-org/react";

import Link from "next/link";
import { icons } from "./CustomerMenu";

interface Props {
  name: string;
}

export default function CustomerMenu({ name }: Props) {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="text-xl  text-white p-0 bg-transparent data-[hover=true]:bg-transparent"
            endContent={icons.chevron}
            radius="sm"
            variant="light"
          >
            {name}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Customers"
        className="w-[340px]"
        itemClasses={{
          base: "gap-2",
        }}
      >
        <DropdownItem
          as={Link}
          href="/brands/add"
          key="ekleme"
          description="Marka eklemek için tıklayınız."
          startContent={icons.add}
        >
          Ekleme
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/brands/list"
          key="sorgulama"
          description="Eklenmiş markaları sorgulamak için tıklayınız."
          startContent={icons.search}
        >
          Sorgulama
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
