import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GiDrippingTube } from 'react-icons/gi'
import { auth } from '@/auth'
import UserMenu from './UserMenu'
import CustomerMenu from './CustomerMenu'
import BrandMenu from './BrandMenu'
import ProductMenu from './ProductMenu'
import SalesMenu from './SalesMenu'


export default async function TopNav() {
    const session = await auth();
    return (
        <Navbar
            maxWidth='xl'
            className='bg-gradient-to-r from-purple-400 to-purple-700'
            classNames={{
                item: [
                    'text-xl',
                    'text-white',
                    'uppercase',
                    'data-[active=true]:text-yellow-200'
                ]
            }}
        >
            <NavbarBrand as={Link} href='/'>
                <GiDrippingTube size={40} className='text-gray-200' />
                <div className='font-bold text-3xl flex'>
                    <span className='text-gray-900'>Yazıcı</span>
                    <span className='text-gray-200'>Eczanesi</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify='center'>
            <CustomerMenu name="MÜŞTERİ" />
            <BrandMenu name="MARKA" />
            <ProductMenu name="ÜRÜN" />
            <SalesMenu name="SATIŞ" />
           
            </NavbarContent>
            <NavbarContent justify='end'>
                {session?.user ? (
                    <UserMenu user={session.user} />
                ) : (
                    <>
                        <Button as={Link} href='/login' variant='bordered' className='text-white'>Login</Button>
                        <Button as={Link} href='/register' variant='bordered' className='text-white'>Register</Button>
                    </>
                )}

            </NavbarContent>
        </Navbar>
    )
}