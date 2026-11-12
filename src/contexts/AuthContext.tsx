import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services";
import { DadosCadastro, Usuario } from "../types";

type AuthContextData = {
    usuario: Usuario | null;
    loading: boolean;
    isAgente: boolean;
    login: (cpf: string, senha: string) => Promise<void>;
    cadastrar: (dados: DadosCadastro) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService
            .carregarSessao()
            .then(setUsuario)
            .finally(() => setLoading(false));
    }, []);

    async function login(cpf: string, senha: string) {
        setUsuario(await authService.entrar(cpf, senha));
    }

    async function cadastrar(dados: DadosCadastro) {
        setUsuario(await authService.cadastrar(dados));
    }

    async function logout() {
        await authService.sair();
        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                loading,
                isAgente: usuario?.perfil === "agente",
                login,
                cadastrar,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useUsuarioLogado(): Usuario {
    const { usuario } = useAuth();
    if (!usuario) {
        throw new Error("Esta tela precisa de um usuário logado.");
    }
    return usuario;
}
