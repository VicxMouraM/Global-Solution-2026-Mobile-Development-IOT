import { Abrigo } from "../types";
import { ABRIGOS } from "./mockData";

const ATRASO_SIMULADO_MS = 600;

function listar(): Promise<Abrigo[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(ABRIGOS), ATRASO_SIMULADO_MS);
    });
}

export const abrigoService = { listar };
