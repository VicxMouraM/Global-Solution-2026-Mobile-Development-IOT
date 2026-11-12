import { InfoNivel, NivelRisco } from "../types";

export const NIVEIS: Record<NivelRisco, InfoNivel> = {
    normal: {
        chave: "normal",
        indice: 0,
        rotulo: "Normal",
        cor: "#1B7F3B",
        icone: "checkmark-circle",
        orientacao: "Sem risco no momento. Continue acompanhando em dias de chuva.",
    },
    atencao: {
        chave: "atencao",
        indice: 1,
        rotulo: "Atenção",
        cor: "#975A16",
        icone: "eye",
        orientacao: "Chuva ou nível do córrego subindo. Evite deixar objetos e carros em pontos baixos.",
    },
    alerta: {
        chave: "alerta",
        indice: 2,
        rotulo: "Alerta",
        cor: "#C2410C",
        icone: "warning",
        orientacao: "Risco de alagamento. Separe documentos e remédios e fique pronto para sair.",
    },
    emergencia: {
        chave: "emergencia",
        indice: 3,
        rotulo: "Emergência",
        cor: "#B00020",
        icone: "alert-circle",
        orientacao: "O córrego transbordou. Vá agora para o ponto de apoio mais próximo e ligue 199.",
    },
};

export const ORDEM_NIVEIS: NivelRisco[] = ["normal", "atencao", "alerta", "emergencia"];

export const LIMITES = {
    nivelAtencao: 0.6,
    nivelAlerta: 0.8,
    nivelEmergencia: 1,
    chuvaAtencao: 25,
    chuvaAlerta: 50,
};
