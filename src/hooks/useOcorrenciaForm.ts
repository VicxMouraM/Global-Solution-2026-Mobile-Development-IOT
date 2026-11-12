import { useState } from "react";
import { useUsuarioLogado } from "../contexts/AuthContext";
import { ocorrenciaService } from "../services";
import { DadosOcorrencia, Erros, Ocorrencia, TipoOcorrencia } from "../types";
import { mascaraCep, mascaraNumero, mascaraTelefone } from "../utils/masks";
import { semErros, validarCep, validarDescricao, validarObrigatorio, validarTelefone } from "../utils/validators";

type CampoTexto = Exclude<keyof DadosOcorrencia, "tipo">;

const MASCARAS: Partial<Record<CampoTexto, (valor: string) => string>> = {
    cep: mascaraCep,
    numero: mascaraNumero,
    telefone: mascaraTelefone,
};

function validar(valores: DadosOcorrencia): Erros<DadosOcorrencia> {
    return {
        tipo: validarObrigatorio(valores.tipo, "Escolha o tipo do problema."),
        cep: validarCep(valores.cep),
        endereco: validarObrigatorio(valores.endereco, "Digite o nome da rua."),
        numero: validarObrigatorio(valores.numero, "Digite o número mais próximo."),
        descricao: validarDescricao(valores.descricao),
        telefone: validarTelefone(valores.telefone),
    };
}

export function useOcorrenciaForm(onSalvar: (ocorrencia: Ocorrencia) => void) {
    const usuario = useUsuarioLogado();
    const [valores, setValores] = useState<DadosOcorrencia>({
        tipo: "",
        cep: mascaraCep(usuario.cep),
        endereco: "",
        numero: "",
        descricao: "",
        telefone: mascaraTelefone(usuario.telefone),
    });
    const [erros, setErros] = useState<Erros<DadosOcorrencia>>({});
    const [erroGeral, setErroGeral] = useState("");
    const [loading, setLoading] = useState(false);

    function alterar(campo: CampoTexto, texto: string) {
        const mascara = MASCARAS[campo];
        setValores((atuais) => ({ ...atuais, [campo]: mascara ? mascara(texto) : texto }));
        setErros((atuais) => ({ ...atuais, [campo]: "" }));
    }

    function alterarTipo(tipo: TipoOcorrencia) {
        setValores((atuais) => ({ ...atuais, tipo }));
        setErros((atuais) => ({ ...atuais, tipo: "" }));
    }

    async function handleEnviar() {
        const novosErros = validar(valores);
        setErros(novosErros);
        setErroGeral("");
        if (!semErros(novosErros)) {
            setErroGeral("Confira os campos marcados em vermelho.");
            return;
        }

        setLoading(true);
        try {
            const criada = await ocorrenciaService.criar(valores, usuario);
            onSalvar(criada);
        } catch {
            setErroGeral("Não foi possível salvar. Tente de novo.");
            setLoading(false);
        }
    }

    return { valores, erros, erroGeral, loading, alterar, alterarTipo, handleEnviar };
}
