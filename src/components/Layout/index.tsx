import Header from './Header'
import Main from './Main'
import Footer from './Footer'

type LayoutProps = {
  children: JSX.Element
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
