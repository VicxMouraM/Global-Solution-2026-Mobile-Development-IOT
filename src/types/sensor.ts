import { IconName } from "./icone";

export type NivelRisco = "normal" | "atencao" | "alerta" | "emergencia";

export type ModoSimulacao = "normal" | "chuva";

export interface InfoNivel {
    chave: NivelRisco;
    indice: number;
    rotulo: string;
    cor: string;
    icone: IconName;
    orientacao: string;
}

export interface EstacaoBase {
    id: string;
    nome: string;
    local: string;
    nivelBase: number;
    cota: number;
    nivel: number;
    chuva: number;
}

export interface Estacao extends EstacaoBase {
    risco: NivelRisco;
    atualizadaEm: string;
}

export interface Alerta {
    id: string;
    estacaoId: string;
    estacaoNome: string;
    risco: NivelRisco;
    nivel: number;
    cota: number;
    chuva: number;
    orientacao: string;
    data: string;
}
