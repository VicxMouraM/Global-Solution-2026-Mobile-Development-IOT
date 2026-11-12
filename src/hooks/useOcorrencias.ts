import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth, useUsuarioLogado } from "../contexts/AuthContext";
import { ocorrenciaService } from "../services";
import { Ocorrencia } from "../types";

export function useOcorrencias() {
    const usuario = useUsuarioLogado();
    const { isAgente } = useAuth();
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [loading, setLoading] = useState(true);

    const carregar = useCallback(async () => {
        const lista = isAgente
            ? await ocorrenciaService.listarTodas()
            : await ocorrenciaService.listarDoUsuario(usuario.id);
        setOcorrencias(lista);
        setLoading(false);
    }, [usuario.id, isAgente]);

    useFocusEffect(
        useCallback(() => {
            carregar();
        }, [carregar])
    );

    const abertas = ocorrencias.filter((ocorrencia) => ocorrencia.status !== "resolvida").length;

    return { ocorrencias, loading, abertas };
}
