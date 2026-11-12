import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useUsuarioLogado } from "../contexts/AuthContext";
import { ocorrenciaService } from "../services";
import { Ocorrencia, StatusOcorrencia } from "../types";

export function useOcorrenciaDetalhe(id: string) {
    const usuario = useUsuarioLogado();
    const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            ocorrenciaService.buscar(id).then((encontrada) => {
                setOcorrencia(encontrada);
                setLoading(false);
            });
        }, [id])
    );

    async function mudarStatus(status: StatusOcorrencia) {
        setOcorrencia(await ocorrenciaService.atualizarStatus(id, status, usuario));
    }

    return { ocorrencia, loading, mudarStatus };
}
