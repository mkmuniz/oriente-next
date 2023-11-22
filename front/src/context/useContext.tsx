"use client"

import { createContext, useState } from "react";
export const ProjContext: any = createContext("");

export const ProjectProvider = ({ children }: any) => {
  const [projId, setProjId] = useState("");
  const [path, setPath] = useState("");
  const [tipo, setTipo] = useState("");
  const [idNotif, setNotif] = useState("");
  const [alertaTxt, setTxt] = useState("");

  const setProj = (idProj: any, path: any, tipo: any, idNotif: any) => {
    setProjId(idProj);
    setPath(path);
    setTipo(tipo);
    setNotif(idNotif);
    console.log({ idProj, path, tipo, idNotif });
  };

  return (
    <ProjContext.Provider
      value={{ projId, setProj, path, tipo, idNotif, alertaTxt, setTxt }}
    >
      {children}
    </ProjContext.Provider>
  );
};
