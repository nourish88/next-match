"use client"
import { Dropdown, DropdownTrigger,  DropdownMenu, Button, NavbarItem, DropdownItem } from "@nextui-org/react";


import Link from "next/link";
import { icons } from "./CustomerMenu";

interface Props{
    name:string
}

export default function SalesMenu({name}:Props) {
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
          as={Link} href='/sales/products/add'
        key="product-add"
        description="Ürün satışı eklemek için tıklayınız."
        startContent={icons.add}
      >
        Ürün Satış
      </DropdownItem>
      <DropdownItem
      as={Link} href='/sales/products/list'
        key="product-search"
        description="Ürün satışı sorgulamak için tıklayınız."
        startContent={icons.search}
      >
       Ürün Satış Sorgulama
      </DropdownItem>
      <DropdownItem
          as={Link} href='/sales/brands/add'
        key="brands-add"
        description="Marka satışı eklemek için tıklayınız."
        startContent={icons.add}
      >
        Marka Satış
      </DropdownItem>
      <DropdownItem
      as={Link} href='/sales/brands/list'
        key="brand-search"
        description="Marka satışı sorgulamak için tıklayınız."
        startContent={icons.search}
      >
        Marka Satış Sorgulama
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}
