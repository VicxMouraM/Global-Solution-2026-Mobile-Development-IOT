import { DadosCadastro, Usuario, UsuarioComSenha } from "../types";
import { gerarId } from "../utils/formatters";
import { apenasNumeros } from "../utils/masks";
import { USUARIOS_DEMO } from "./mockData";
import { STORAGE_KEYS, storageService } from "./storageService";

async function listarUsuarios(): Promise<UsuarioComSenha[]> {
    const usuarios = await storageService.getItem<UsuarioComSenha[] | null>(STORAGE_KEYS.USUARIOS, null);
    if (usuarios) return usuarios;
    await storageService.setItem(STORAGE_KEYS.USUARIOS, USUARIOS_DEMO);
    return USUARIOS_DEMO;
}

function removerSenha(usuario: UsuarioComSenha): Usuario {
    const { senha, ...dados } = usuario;
    return dados;
}

async function entrar(cpf: string, senha: string): Promise<Usuario> {
    const usuarios = await listarUsuarios();
    const encontrado = usuarios.find((usuario) => usuario.cpf === apenasNumeros(cpf));
    if (!encontrado || encontrado.senha !== senha) {
        throw new Error("CPF ou senha incorretos.");
    }
    const sessao = removerSenha(encontrado);
    await storageService.setItem(STORAGE_KEYS.SESSAO, sessao);
    return sessao;
}

async function cadastrar(dados: DadosCadastro): Promise<Usuario> {
    const usuarios = await listarUsuarios();
    const cpf = apenasNumeros(dados.cpf);
    if (usuarios.some((usuario) => usuario.cpf === cpf)) {
        throw new Error("Já existe uma conta com este CPF.");
    }
    const novo: UsuarioComSenha = {
        id: gerarId("usr"),
        nome: dados.nome.trim(),
        cpf,
        telefone: apenasNumeros(dados.telefone),
        cep: apenasNumeros(dados.cep),
        perfil: dados.perfil,
        matricula: dados.perfil === "agente" ? apenasNumeros(dados.matricula) : "",
        senha: dados.senha,
    };
    await storageService.setItem(STORAGE_KEYS.USUARIOS, [...usuarios, novo]);
    const sessao = removerSenha(novo);
    await storageService.setItem(STORAGE_KEYS.SESSAO, sessao);
    return sessao;
}

async function carregarSessao(): Promise<Usuario | null> {
    await listarUsuarios();
    return storageService.getItem<Usuario | null>(STORAGE_KEYS.SESSAO, null);
}

async function sair(): Promise<void> {
    await storageService.removeItem(STORAGE_KEYS.SESSAO);
}

export const authService = { entrar, cadastrar, carregarSessao, sair };
