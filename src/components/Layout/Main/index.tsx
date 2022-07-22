type MainProps = {
  children: JSX.Element
}

const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return <main>{children}</main>
}

export default Main
