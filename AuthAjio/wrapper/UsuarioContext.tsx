import React, { createContext, useContext, useState, ReactNode } from "react";

interface UsuarioContextType {
  usuarioSeleccionado: object;
  setUsuarioSeleccionado: React.Dispatch<React.SetStateAction<object>>;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario must be used within a UsuarioProvider");
  }
  return context;
};

interface UsuarioProviderProps {
  children: ReactNode;
}

export const UsuarioProvider = ({ children }: UsuarioProviderProps) => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  return (
    <UsuarioContext.Provider
      value={{ usuarioSeleccionado, setUsuarioSeleccionado }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
