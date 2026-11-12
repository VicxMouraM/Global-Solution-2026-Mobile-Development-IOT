export type Perfil = "cidadao" | "agente";

export interface Usuario {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    cep: string;
    perfil: Perfil;
    matricula: string;
}

export interface UsuarioComSenha extends Usuario {
    senha: string;
}

export interface DadosCadastro {
    perfil: Perfil;
    nome: string;
    cpf: string;
    telefone: string;
    cep: string;
    matricula: string;
    senha: string;
    confirmacao: string;
}
