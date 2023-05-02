import * as React from 'react'
import { LogoImage } from '../common/styled'
import { topNavItems } from '.'
// import Button from '../Buttons/Button'
// import { network } from '.'
import Link from 'next/link';
import { BiMenu, BiSearch } from 'react-icons/bi';
import { ConnectWallet } from "../Tools/ConnectWallet";
import { RiCloseFill } from 'react-icons/ri';
import { NetworkSwitch } from '../Tools/NetworkSwitch';

export const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div>

      <div className='z-[99999999] px-[10vw] py-2 shadow-2xl flex justify-between'>

        <div className='float-left pr-[30px] md:pr-0 md:hidden py-3'>
          <button>
            <BiSearch className='text-2xl z-0 cursor-pointer' />
          </button>
        </div>

        <LogoImage className='z-0'/>

        <nav className='flex float-right gap-3 md:gap-5 z-0'>
          {topNavItems.map((val, key) => {
            return (
              <div key={key} className='p-3 md:block hidden'>
                <Link href={`${val.to}`}>{val.title}</Link>
              </div>
            )
          })}

          <span className='mt-2 duration-300 select-none md:block hidden z-0'>
            <ConnectWallet />
          </span>

          <span className='flex justify-center align-baseline md:hidden z-0'>
            <BiMenu size={33} className='mt-2 p-1 duration-300 cursor-pointer' onClick={() => setIsMenuOpen(true)} />
          </span>

        </nav>

      </div>

      {isMenuOpen && (
        <div
          className='fixed top-0 inset-0 z-50 overflow-hidden'
        >
          <div className='relative !bg-white/95 !text-slate-900 sm:w-[25vw] w-full min-h-screen p-4 shadow-lg duration-300 ease-in-out'>

            <div className="pb-2 px-2">
              <LogoImage />
            </div>
        
            <button
              className='absolute right-0 top-0 mx-2 my-2 px-2 py-2 border border-slate-500 rounded-full text-inherit text-md hover:bg-slate-800 hover:text-white ease-in-out duration-300'
              onClick={() => setIsMenuOpen(false)}
            >
              <RiCloseFill />
            </button>

            <nav className='grid gap-3 md:gap-5 content-center'>
              {topNavItems.map((val, key) => {
                return (
                  <div key={key} className='p-2'>
                    <Link onClick={() => setIsMenuOpen(false)} href={`${val.to}`}>{val.title}</Link>
                  </div>
                )
              })}

              <span className='duration-300 select-none opacity-90'>
                <ConnectWallet />
              </span>

            </nav>

          </div>

        </div>
      )}

    </div>
    
  )
}

