"use client"

import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeProf } from "@/components/Home/HomeProf";
import { CardAlertaNotificacao } from "@/components/Notifications/AlertaNotificacoes";
import { CardPerfil } from "@/components/Card/CardPerfil";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { Overlay } from "@/components/Overlay/Overlay";
import axios from "@/utils/axiosConfig";

function Home() {
  const [notificacoes, setNotificacoes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/notificacoes/count`);
        if (response.status === 200) {
          setNotificacoes(response.data.numNotif);
          console.log(response.data.numNotif);
        }
      } catch (err) {
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
      <HomeProf>
        <CardPerfil role="DRT" />
        {notificacoes > 0 && <CardAlertaNotificacao num={notificacoes} />}
        {isLoading ? (
          <Overlay visible={isLoading}>
            <Loader />
          </Overlay>
        ) : (
          ""
        )}
      </HomeProf>
    </ProvedorTema>
  );
}

export default Home;
