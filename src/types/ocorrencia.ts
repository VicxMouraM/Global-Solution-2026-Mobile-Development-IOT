import { IconName } from "./icone";

export type TipoOcorrencia = "alagamento" | "bueiro" | "deslizamento" | "arvore";

export type StatusOcorrencia = "recebida" | "atendimento" | "resolvida";

export interface InfoTipo {
    chave: TipoOcorrencia;
    rotulo: string;
}

export interface InfoStatus {
    chave: StatusOcorrencia;
    rotulo: string;
    cor: string;
    icone: IconName;
}

export interface PassoHistorico {
    status: StatusOcorrencia;
    data: string;
    por: string;
}

export interface Ocorrencia {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    tipo: TipoOcorrencia;
    cep: string;
    endereco: string;
    numero: string;
    descricao: string;
    telefone: string;
    status: StatusOcorrencia;
    criadaEm: string;
    historico: PassoHistorico[];
}

export interface DadosOcorrencia {
    tipo: TipoOcorrencia | "";
    cep: string;
    endereco: string;
    numero: string;
    descricao: string;
    telefone: string;
}
