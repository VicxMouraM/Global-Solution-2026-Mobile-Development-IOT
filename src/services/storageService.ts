import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
    USUARIOS: "@alertachuva:usuarios",
    SESSAO: "@alertachuva:sessao",
    OCORRENCIAS: "@alertachuva:ocorrencias",
    ALERTAS: "@alertachuva:alertas",
    MODO_SIMULACAO: "@alertachuva:modoSimulacao",
};

async function getItem<T>(chave: string, padrao: T): Promise<T> {
    try {
        const texto = await AsyncStorage.getItem(chave);
        return texto ? (JSON.parse(texto) as T) : padrao;
    } catch (erro) {
        console.warn("Erro ao ler do storage:", chave, erro);
        return padrao;
    }
}

async function setItem<T>(chave: string, valor: T): Promise<void> {
    try {
        await AsyncStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
        console.warn("Erro ao salvar no storage:", chave, erro);
    }
}

async function removeItem(chave: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(chave);
    } catch (erro) {
        console.warn("Erro ao remover do storage:", chave, erro);
    }
}

export const storageService = { getItem, setItem, removeItem };
