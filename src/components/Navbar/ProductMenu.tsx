"use client"
import Link from "next/link";
import { icons } from "./CustomerMenu";
import { Dropdown, NavbarItem, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";

interface Props{
    name:string
}

export default function ProductMenu({name}:Props) {
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
          as={Link} href='/products/add'
        key="ekleme"
        description="Ürün eklemek için tıklayınız."
        startContent={icons.add}
      >
        Ekleme
      </DropdownItem>
      <DropdownItem
      as={Link} href='/products/list'
        key="sorgulama"
        description="Eklenmiş ürünleri sorgulamak için tıklayınız."
        startContent={icons.search}
      >
        Sorgulama
      </DropdownItem>
     
    </DropdownMenu>
  </Dropdown>
  )
}
