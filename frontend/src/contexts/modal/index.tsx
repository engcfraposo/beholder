import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';


interface ModalContextData {
  symbolModal: string;
  handleOpenModal: (symbol: string) => void;
  handleCloseModal: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider = ({ children }: Props) => {
  const [ symbolModal, setSymbolModal ] = useState("");

  const handleOpenModal = useCallback((symbol: string) => {
    setSymbolModal(symbol);
  },[]);

  const handleCloseModal = useCallback(() => {
    setSymbolModal("");
  },[]);

  return (
    <ModalContext.Provider
      value={{ 
        symbolModal,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  return context;
}