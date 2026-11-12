import { Alerta, ModoSimulacao } from "../types";
import { STORAGE_KEYS, storageService } from "./storageService";

const MAXIMO_GUARDADO = 50;

async function listar(): Promise<Alerta[]> {
    return storageService.getItem<Alerta[]>(STORAGE_KEYS.ALERTAS, []);
}

async function registrar(novos: Alerta[]): Promise<Alerta[]> {
    const antigos = await listar();
    const lista = [...novos, ...antigos].slice(0, MAXIMO_GUARDADO);
    await storageService.setItem(STORAGE_KEYS.ALERTAS, lista);
    return lista;
}

async function limpar(): Promise<Alerta[]> {
    await storageService.removeItem(STORAGE_KEYS.ALERTAS);
    return [];
}

async function lerModoSimulacao(): Promise<ModoSimulacao> {
    return storageService.getItem<ModoSimulacao>(STORAGE_KEYS.MODO_SIMULACAO, "normal");
}

async function salvarModoSimulacao(modo: ModoSimulacao): Promise<void> {
    await storageService.setItem(STORAGE_KEYS.MODO_SIMULACAO, modo);
}

export const alertaService = { listar, registrar, limpar, lerModoSimulacao, salvarModoSimulacao };
