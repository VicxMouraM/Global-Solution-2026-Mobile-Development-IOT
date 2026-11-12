import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Erros, UsuarioComSenha } from "../types";
import { mascaraCpf } from "../utils/masks";
import { semErros, validarCpf, validarObrigatorio } from "../utils/validators";

type CamposLogin = {
    cpf: string;
    senha: string;
};

export function useLoginForm() {
    const { login } = useAuth();
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState<Erros<CamposLogin>>({});
    const [erroGeral, setErroGeral] = useState("");
    const [loading, setLoading] = useState(false);

    function alterarCpf(texto: string) {
        setCpf(mascaraCpf(texto));
    }

    function preencher(conta: UsuarioComSenha) {
        setCpf(mascaraCpf(conta.cpf));
        setSenha(conta.senha);
        setErros({});
        setErroGeral("");
    }

    async function handleLogin() {
        const novosErros: Erros<CamposLogin> = {
            cpf: validarCpf(cpf),
            senha: validarObrigatorio(senha, "Digite sua senha."),
        };
        setErros(novosErros);
        setErroGeral("");
        if (!semErros(novosErros)) return;

        setLoading(true);
        try {
            await login(cpf, senha);
        } catch (erro) {
            setErroGeral(erro instanceof Error ? erro.message : "Não foi possível entrar.");
            setLoading(false);
        }
    }

    return { cpf, senha, erros, erroGeral, loading, alterarCpf, alterarSenha: setSenha, preencher, handleLogin };
}
