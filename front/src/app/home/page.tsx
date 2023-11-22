"use client"

import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeBase } from "@/components/Home/Home";
import { CardPerfil } from "@/components/Card/CardPerfil";
import { CardAlertaNotificacao } from "@/components/Notifications/AlertaNotificacoes";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { Overlay } from "@/components/Overlay/Overlay";
import axios from "@/utils/axiosConfig";

function Home() {
  const [notificacoes, setNotificacoes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/notificacoes/count`);
        if (response && response.status === 200) {
          setNotificacoes(response.data.numNotif);
          console.log(response.data.numNotif);
        }
      } catch (err: any) {
        if (err?.response?.status === 401) {
          return;
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <ProvedorTema>
      <Estilos />
      <HomeBase>
        <CardPerfil role="TIA" />
        {isLoading ? (
          <Overlay visible={isLoading}>
            <Loader />
          </Overlay>
        ) : (
          ""
        )}
        {notificacoes > 0 && <CardAlertaNotificacao num={notificacoes} />}
      </HomeBase>
    </ProvedorTema>
  );
}

export default Home;
