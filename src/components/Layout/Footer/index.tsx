import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { pages } from 'config/constants'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className='container mx-auto py-6 flex flex-col items-center md:flex-row md:justify-between'>
        <a
          href='mailto:contact@casacoco.info'
          className='text-blue-600 hover:underline'
        >
          contact@casacoco.info
        </a>

        <ul className='flex space-y-2 flex-col mt-4 md:space-y-0 md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent'>
          {pages?.map(page => {
            return (
              <li key={page.id}>
                <Link href={page.href} aria-current='page'>
                  {t(page.label)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
