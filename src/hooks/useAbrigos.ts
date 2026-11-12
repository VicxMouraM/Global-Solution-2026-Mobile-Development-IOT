import { useEffect, useState } from "react";
import { abrigoService } from "../services";
import { Abrigo } from "../types";

export function useAbrigos() {
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ativo = true;

        abrigoService.listar().then((lista) => {
            if (ativo) {
                setAbrigos(lista);
                setLoading(false);
            }
        });

        return () => {
            ativo = false;
        };
    }, []);

    return { abrigos, loading };
}
