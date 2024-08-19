
'use client';
import { signOutUser } from "@/app/actions/authActions";
import { Dropdown, DropdownTrigger, Avatar, user, DropdownMenu, DropdownSection, DropdownItem, Button, NavbarItem } from "@nextui-org/react";


import Link from "next/link";
import { Activity, AddIcon, ChevronDown, Flash, Scale, SearchIcon, Server, TagUser } from "../../../public/icons/icons";
interface Props{
    name:string
}

export default function CustomerMenu({name}:Props) {
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        add: <AddIcon className="text-primary" fill="currentColor" size={30} />,
        activity: <SearchIcon className="text-secondary" fill="currentColor" size={30} />,
        // flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        // server: <Server className="text-success" fill="currentColor" size={30} />,
        // user: <TagUser className="text-danger" fill="currentColor" size={30} />,
      };
  return (
<Dropdown placement='bottom-end'>
        <DropdownTrigger>
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
                as={Link} href='/members'
              key="ekleme"
              description="Müşteri eklemek için tıklayınız."
              startContent={icons.add}
            >
              Ekleme
            </DropdownItem>
            <DropdownItem
            as={Link} href='/members'
              key="sorgulama"
              description="Eklenmiş müşterilerinizi sorgulamak için tıklayınız."
              startContent={icons.activity}
            >
              Sorgulama
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                    Signed in as {user?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit'>
                Edit profile
            </DropdownItem>
            <DropdownItem color='danger' onClick={async () => signOutUser()} >
                Log out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
