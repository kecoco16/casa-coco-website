import { useTranslation } from 'next-i18next'

const pages = [
  {
    id: 1,
    label: 'home',
    href: '#'
  },
  {
    id: 2,
    label: 'gallery',
    href: '#'
  },
  {
    id: 3,
    label: 'map',
    href: '#'
  }
]

const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className='flex h-[5vh] bg-gray-800'>
      <nav className='flex items-center space-x-2'>
        {pages?.map(page => {
          return (
            <a
              key={page.id}
              href={page.href}
              className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
              aria-current='page'
            >
              {t(page.label)}
            </a>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
