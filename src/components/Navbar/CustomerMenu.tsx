
'use client';

import { Dropdown, DropdownTrigger,  DropdownMenu, DropdownItem, Button, NavbarItem } from "@nextui-org/react";


import Link from "next/link";
import {  AddIcon, ChevronDown, Flash, Scale, SearchIcon} from "../../../public/icons/icons";
interface Props{
    name:string
}
export const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    add: <AddIcon className="text-primary" fill="currentColor" size={30} />,
    search: <SearchIcon className="text-secondary" fill="currentColor" size={30} />,
     flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    // server: <Server className="text-success" fill="currentColor" size={30} />,
    // user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };
export default function CustomerMenu({name}:Props) {
   
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
                as={Link} href='/customers/add'
              key="ekleme"
              description="Müşteri eklemek için tıklayınız."
              startContent={icons.add}
            >
              Ekleme
            </DropdownItem>
            <DropdownItem
            as={Link} href='/customers/list'
              key="sorgulama"
              description="Eklenmiş müşterilerinizi sorgulamak için tıklayınız."
              startContent={icons.search}
            >
              Sorgulama
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
    
  
  )
}
