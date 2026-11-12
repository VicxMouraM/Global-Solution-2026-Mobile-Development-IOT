import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { alertaService, sensorService } from "../services";
import { Alerta, Estacao, ModoSimulacao, NivelRisco } from "../types";

type SensorContextData = {
    estacoes: Estacao[];
    alertas: Alerta[];
    modo: ModoSimulacao;
    riscoGeral: NivelRisco;
    alternarModo: () => void;
    limparAlertas: () => Promise<void>;
};

const SensorContext = createContext<SensorContextData>({} as SensorContextData);

export function SensorProvider({ children }: { children: React.ReactNode }) {
    const [estacoes, setEstacoes] = useState<Estacao[]>(sensorService.criarEstacoes);
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [modo, setModo] = useState<ModoSimulacao>("normal");

    const estacoesRef = useRef(estacoes);
    const alertasRef = useRef(alertas);
    const modoRef = useRef(modo);

    useEffect(() => {
        async function carregarDadosSalvos() {
            const alertasSalvos = await alertaService.listar();
            const modoSalvo = await alertaService.lerModoSimulacao();
            alertasRef.current = alertasSalvos;
            modoRef.current = modoSalvo;
            setAlertas(alertasSalvos);
            setModo(modoSalvo);
        }
        carregarDadosSalvos();
    }, []);

    useEffect(() => {
        async function lerSensores() {
            const anteriores = estacoesRef.current;
            const atuais = anteriores.map((estacao) => sensorService.proximaLeitura(estacao, modoRef.current));
            estacoesRef.current = atuais;
            setEstacoes(atuais);

            const novos = sensorService.removerRepetidos(
                sensorService.gerarAlertas(anteriores, atuais),
                alertasRef.current
            );
            if (novos.length > 0) {
                const lista = await alertaService.registrar(novos);
                alertasRef.current = lista;
                setAlertas(lista);
            }
        }

        const temporizador = setInterval(lerSensores, sensorService.INTERVALO_LEITURA_MS);
        return () => clearInterval(temporizador);
    }, []);

    function alternarModo() {
        const novoModo: ModoSimulacao = modoRef.current === "chuva" ? "normal" : "chuva";
        modoRef.current = novoModo;
        setModo(novoModo);
        alertaService.salvarModoSimulacao(novoModo);
    }

    async function limparAlertas() {
        const lista = await alertaService.limpar();
        alertasRef.current = lista;
        setAlertas(lista);
    }

    return (
        <SensorContext.Provider
            value={{
                estacoes,
                alertas,
                modo,
                riscoGeral: sensorService.riscoGeral(estacoes),
                alternarModo,
                limparAlertas,
            }}
        >
            {children}
        </SensorContext.Provider>
    );
}

export function useSensores() {
    return useContext(SensorContext);
}
