import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'

export type GlobalContextProps = {
  lastViewedPhoto: number | null
  setLastViewedPhoto: Dispatch<SetStateAction<number | null>>
}

export type GlobalProviderProps = {
  children: JSX.Element | JSX.Element[]
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

const GlobalProvider: React.FC<GlobalProviderProps> = ({
  children
}: GlobalProviderProps) => {
  const [lastViewedPhoto, setLastViewedPhoto] = useState<number | null>(null)

  return (
    <GlobalContext.Provider
      value={{
        lastViewedPhoto,
        setLastViewedPhoto
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobal = () => {
  const context = useContext(GlobalContext)

  if (context === undefined) {
    throw new Error(`useGlobal must be used within a GlobalProvider`)
  }

  return context
}

export { GlobalProvider, useGlobal }
