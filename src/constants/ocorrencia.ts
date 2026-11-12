import { InfoStatus, InfoTipo, StatusOcorrencia, TipoOcorrencia } from "../types";

export const TIPOS_OCORRENCIA: InfoTipo[] = [
    { chave: "alagamento", rotulo: "Alagamento" },
    { chave: "bueiro", rotulo: "Bueiro entupido" },
    { chave: "deslizamento", rotulo: "Deslizamento" },
    { chave: "arvore", rotulo: "Árvore caída" },
];

export const STATUS: Record<StatusOcorrencia, InfoStatus> = {
    recebida: { chave: "recebida", rotulo: "Recebida", cor: "#0B5CAD", icone: "mail-open" },
    atendimento: { chave: "atendimento", rotulo: "Em atendimento", cor: "#975A16", icone: "construct" },
    resolvida: { chave: "resolvida", rotulo: "Resolvida", cor: "#1B7F3B", icone: "checkmark-done" },
};

export const ORDEM_STATUS: StatusOcorrencia[] = ["recebida", "atendimento", "resolvida"];

export function rotuloTipo(chave: TipoOcorrencia): string {
    const tipo = TIPOS_OCORRENCIA.find((item) => item.chave === chave);
    return tipo ? tipo.rotulo : chave;
}
