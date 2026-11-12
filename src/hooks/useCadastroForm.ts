import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { DadosCadastro, Erros, Perfil } from "../types";
import { mascaraCep, mascaraCpf, mascaraMatricula, mascaraTelefone } from "../utils/masks";
import {
    semErros,
    validarCep,
    validarConfirmacao,
    validarCpf,
    validarMatricula,
    validarNome,
    validarSenha,
    validarTelefone,
} from "../utils/validators";

type CampoTexto = Exclude<keyof DadosCadastro, "perfil">;

const VALORES_INICIAIS: DadosCadastro = {
    perfil: "cidadao",
    nome: "",
    cpf: "",
    telefone: "",
    cep: "",
    matricula: "",
    senha: "",
    confirmacao: "",
};

const MASCARAS: Partial<Record<CampoTexto, (valor: string) => string>> = {
    cpf: mascaraCpf,
    telefone: mascaraTelefone,
    cep: mascaraCep,
    matricula: mascaraMatricula,
};

function validar(valores: DadosCadastro): Erros<DadosCadastro> {
    return {
        nome: validarNome(valores.nome),
        cpf: validarCpf(valores.cpf),
        telefone: validarTelefone(valores.telefone),
        cep: validarCep(valores.cep),
        matricula: valores.perfil === "agente" ? validarMatricula(valores.matricula) : "",
        senha: validarSenha(valores.senha),
        confirmacao: validarConfirmacao(valores.senha, valores.confirmacao),
    };
}

export function useCadastroForm() {
    const { cadastrar } = useAuth();
    const [valores, setValores] = useState<DadosCadastro>(VALORES_INICIAIS);
    const [erros, setErros] = useState<Erros<DadosCadastro>>({});
    const [erroGeral, setErroGeral] = useState("");
    const [loading, setLoading] = useState(false);

    function alterar(campo: CampoTexto, texto: string) {
        const mascara = MASCARAS[campo];
        setValores((atuais) => ({ ...atuais, [campo]: mascara ? mascara(texto) : texto }));
        setErros((atuais) => ({ ...atuais, [campo]: "" }));
    }

    function alterarPerfil(perfil: Perfil) {
        setValores((atuais) => ({ ...atuais, perfil }));
    }

    async function handleCadastro() {
        const novosErros = validar(valores);
        setErros(novosErros);
        setErroGeral("");
        if (!semErros(novosErros)) {
            setErroGeral("Confira os campos marcados em vermelho.");
            return;
        }

        setLoading(true);
        try {
            await cadastrar(valores);
        } catch (erro) {
            setErroGeral(erro instanceof Error ? erro.message : "Não foi possível criar a conta.");
            setLoading(false);
        }
    }

    return { valores, erros, erroGeral, loading, alterar, alterarPerfil, handleCadastro };
}
