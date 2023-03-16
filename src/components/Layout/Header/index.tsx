import { useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../../../public/logo.png'

const pages = [
  {
    id: 1,
    label: 'overview',
    href: '/overview'
  },
  {
    id: 2,
    label: 'gallery',
    href: '/gallery'
  },
  {
    id: 3,
    label: 'map',
    href: '/map'
  },
  {
    id: 4,
    label: 'thingsToDo',
    href: '/things-to-do'
  },
  {
    id: 5,
    label: 'reviews',
    href: '/reviews'
  },
  {
    id: 6,
    label: 'contact',
    href: '/contact'
  }
]

const Header: React.FC = () => {
  const { t } = useTranslation()
  const [showMenu, setShowMenu] = useState(false)

  const handleToggleMenu = useCallback(() => {
    setShowMenu(showMenu => !showMenu)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false)
  }, [])

  return (
    <header>
      <nav className='p-3'>
        <div className='container mx-auto flex flex-wrap items-center justify-between'>
          <Link href='/'>
            <Image alt='Logo' src={Logo} height={40} />
          </Link>
          <button
            className='inline-flex items-center rounded-md p-2 ml-3 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            onClick={handleToggleMenu}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
          <div
            className={`${
              showMenu ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
          >
            <ul className='flex space-y-2 flex-col mt-4 bg-gray-50 md:space-y-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent'>
              {pages?.map(page => {
                return (
                  <li key={page.id}>
                    <Link
                      href={page.href}
                      className='block rounded-md py-2 pl-3 pr-4 bg-gray-100 md:bg-transparent md:p-0'
                      aria-current='page'
                      onClick={handleCloseMenu}
                    >
                      {t(page.label)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
