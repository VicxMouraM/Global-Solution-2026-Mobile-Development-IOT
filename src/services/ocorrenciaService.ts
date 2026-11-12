import { DadosOcorrencia, Ocorrencia, StatusOcorrencia, TipoOcorrencia, Usuario } from "../types";
import { gerarId } from "../utils/formatters";
import { apenasNumeros } from "../utils/masks";
import { STORAGE_KEYS, storageService } from "./storageService";

function maisRecentesPrimeiro(a: Ocorrencia, b: Ocorrencia): number {
    return new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime();
}

async function listarTodas(): Promise<Ocorrencia[]> {
    const lista = await storageService.getItem<Ocorrencia[]>(STORAGE_KEYS.OCORRENCIAS, []);
    return [...lista].sort(maisRecentesPrimeiro);
}

async function listarDoUsuario(usuarioId: string): Promise<Ocorrencia[]> {
    const lista = await listarTodas();
    return lista.filter((ocorrencia) => ocorrencia.usuarioId === usuarioId);
}

async function buscar(id: string): Promise<Ocorrencia | null> {
    const lista = await listarTodas();
    return lista.find((ocorrencia) => ocorrencia.id === id) ?? null;
}

async function criar(dados: DadosOcorrencia, usuario: Usuario): Promise<Ocorrencia> {
    const lista = await storageService.getItem<Ocorrencia[]>(STORAGE_KEYS.OCORRENCIAS, []);
    const agora = new Date().toISOString();
    const nova: Ocorrencia = {
        id: gerarId("oc"),
        usuarioId: usuario.id,
        usuarioNome: usuario.nome,
        tipo: dados.tipo as TipoOcorrencia,
        cep: apenasNumeros(dados.cep),
        endereco: dados.endereco.trim(),
        numero: dados.numero,
        descricao: dados.descricao.trim(),
        telefone: apenasNumeros(dados.telefone),
        status: "recebida",
        criadaEm: agora,
        historico: [{ status: "recebida", data: agora, por: usuario.nome }],
    };
    await storageService.setItem(STORAGE_KEYS.OCORRENCIAS, [...lista, nova]);
    return nova;
}

async function atualizarStatus(id: string, status: StatusOcorrencia, agente: Usuario): Promise<Ocorrencia | null> {
    const lista = await storageService.getItem<Ocorrencia[]>(STORAGE_KEYS.OCORRENCIAS, []);
    const agora = new Date().toISOString();
    const atualizada = lista.map((ocorrencia) =>
        ocorrencia.id === id
            ? {
                  ...ocorrencia,
                  status,
                  historico: [...ocorrencia.historico, { status, data: agora, por: agente.nome }],
              }
            : ocorrencia
    );
    await storageService.setItem(STORAGE_KEYS.OCORRENCIAS, atualizada);
    return atualizada.find((ocorrencia) => ocorrencia.id === id) ?? null;
}

export const ocorrenciaService = { listarTodas, listarDoUsuario, buscar, criar, atualizarStatus };
