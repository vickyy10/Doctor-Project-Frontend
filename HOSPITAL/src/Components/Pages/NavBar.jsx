import React, { useContext } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
   
    let {user,logoutUser}=useContext(AuthContext)
    
  return (
    <div>
              <Disclosure as="nav" className="bg-gray-800 w-full">
        <div className="px-2 sm:px-6 lg:px-8 w-full">
          <div className="relative flex h-16 items-center justify-between w-full">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                {user ? (
    user.is_admin ? (
        <Link className='text-3xl font-bold tracking-tight text-white sm:text-4xl' to='/adminpanel'>
            <h1>ADMIN PANEL</h1>
        </Link>
    ) : user.is_doctor ? (
        <Link className='text-3xl font-bold tracking-tight text-white sm:text-4xl' to='/home'>
            <h1>DOCTOR HOME</h1>
        </Link>
    ) : (
        <Link className='text-3xl font-bold tracking-tight text-white sm:text-4xl' to='/home'>
            <h1>USER HOME</h1>
        </Link>
    )
) : (
    <Link className='text-3xl font-bold tracking-tight text-white sm:text-4xl' to='/login'>
        <h1>SIGN IN</h1>
    </Link>
)}


                </div>
              </div>
            </div>
            {user ? (
                <p onClick={logoutUser} >Logout</p>
            ):
            (
            <span>
            <Link to='/Login' >Login</Link>
            <Link to='/' >sighn up</Link>
            </span>

            )}

            {user && <p>{user.name}</p>}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      
    </div>
  )
}

export default NavBar
