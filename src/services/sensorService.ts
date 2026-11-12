import { LIMITES, NIVEIS, ORDEM_NIVEIS } from "../constants/risco";
import { Alerta, Estacao, EstacaoBase, ModoSimulacao, NivelRisco } from "../types";
import { gerarId } from "../utils/formatters";
import { ESTACOES_INICIAIS } from "./mockData";

const INTERVALO_LEITURA_MS = 4000;
const JANELA_REPETICAO_MS = 60000;
const CHUVA_TEMPESTADE = 60;
const CHUVA_TEMPO_FIRME = 2;

function limitar(valor: number, minimo: number, maximo: number): number {
    return Math.min(Math.max(valor, minimo), maximo);
}

function sortear(minimo: number, maximo: number): number {
    return minimo + Math.random() * (maximo - minimo);
}

function classificarRisco(nivel: number, cota: number, chuva: number): NivelRisco {
    const proporcao = nivel / cota;
    let indice = 0;

    if (proporcao >= LIMITES.nivelEmergencia) indice = 3;
    else if (proporcao >= LIMITES.nivelAlerta) indice = 2;
    else if (proporcao >= LIMITES.nivelAtencao) indice = 1;

    if (chuva >= LIMITES.chuvaAlerta) indice = Math.max(indice, 2);
    else if (chuva >= LIMITES.chuvaAtencao) indice = Math.max(indice, 1);

    return ORDEM_NIVEIS[indice];
}

function comRisco(estacao: EstacaoBase): Estacao {
    return {
        ...estacao,
        risco: classificarRisco(estacao.nivel, estacao.cota, estacao.chuva),
        atualizadaEm: new Date().toISOString(),
    };
}

function criarEstacoes(): Estacao[] {
    return ESTACOES_INICIAIS.map(comRisco);
}

function proximaLeitura(estacao: Estacao, modo: ModoSimulacao): Estacao {
    const chuvaEsperada = modo === "chuva" ? CHUVA_TEMPESTADE : CHUVA_TEMPO_FIRME;
    const chuva = limitar(estacao.chuva + (chuvaEsperada - estacao.chuva) * 0.25 + sortear(-3, 3), 0, 90);

    const enchimento = chuva * 0.35;
    const escoamento = (estacao.nivel - estacao.nivelBase) * 0.08;
    const nivel = limitar(
        estacao.nivel + enchimento - escoamento + sortear(-1, 1),
        estacao.nivelBase * 0.8,
        estacao.cota * 1.3
    );

    return comRisco({ ...estacao, chuva: Math.round(chuva), nivel: Math.round(nivel) });
}

function gerarAlertas(anteriores: Estacao[], atuais: Estacao[]): Alerta[] {
    const alertas: Alerta[] = [];

    atuais.forEach((atual) => {
        const anterior = anteriores.find((estacao) => estacao.id === atual.id);
        const indiceAntes = anterior ? NIVEIS[anterior.risco].indice : 0;
        const indiceAgora = NIVEIS[atual.risco].indice;
        const subiuParaAlerta = indiceAgora > indiceAntes && indiceAgora >= NIVEIS.alerta.indice;

        if (subiuParaAlerta) {
            alertas.push({
                id: gerarId("al"),
                estacaoId: atual.id,
                estacaoNome: `${atual.nome} · ${atual.local}`,
                risco: atual.risco,
                nivel: atual.nivel,
                cota: atual.cota,
                chuva: atual.chuva,
                orientacao: NIVEIS[atual.risco].orientacao,
                data: atual.atualizadaEm,
            });
        }
    });

    return alertas;
}

function removerRepetidos(novos: Alerta[], existentes: Alerta[]): Alerta[] {
    return novos.filter((novo) => {
        const recente = existentes.find(
            (antigo) =>
                antigo.estacaoId === novo.estacaoId &&
                new Date(novo.data).getTime() - new Date(antigo.data).getTime() < JANELA_REPETICAO_MS
        );
        return !recente || NIVEIS[novo.risco].indice > NIVEIS[recente.risco].indice;
    });
}

function riscoGeral(estacoes: Estacao[]): NivelRisco {
    return estacoes.reduce<NivelRisco>(
        (pior, estacao) => (NIVEIS[estacao.risco].indice > NIVEIS[pior].indice ? estacao.risco : pior),
        "normal"
    );
}

export const sensorService = {
    INTERVALO_LEITURA_MS,
    classificarRisco,
    criarEstacoes,
    proximaLeitura,
    gerarAlertas,
    removerRepetidos,
    riscoGeral,
};
