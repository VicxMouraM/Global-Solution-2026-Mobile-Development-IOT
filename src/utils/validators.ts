import { apenasNumeros } from "./masks";

export function validarNome(nome: string): string {
    const partes = nome.trim().split(/\s+/);
    if (nome.trim().length < 3) return "Digite seu nome.";
    if (partes.length < 2) return "Digite nome e sobrenome.";
    return "";
}

function calcularDigitoCpf(numeros: string, tamanho: number): number {
    let soma = 0;
    for (let i = 0; i < tamanho; i += 1) {
        soma += Number(numeros[i]) * (tamanho + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
}

export function cpfValido(cpf: string): boolean {
    const numeros = apenasNumeros(cpf);
    if (numeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(numeros)) return false;
    return (
        calcularDigitoCpf(numeros, 9) === Number(numeros[9]) &&
        calcularDigitoCpf(numeros, 10) === Number(numeros[10])
    );
}

export function validarCpf(cpf: string): string {
    if (!apenasNumeros(cpf)) return "Digite seu CPF.";
    if (!cpfValido(cpf)) return "CPF inválido. Confira os números.";
    return "";
}

export function validarTelefone(telefone: string): string {
    const numeros = apenasNumeros(telefone);
    if (!numeros) return "Digite seu telefone com DDD.";
    if (numeros.length < 10) return "Telefone incompleto. Use DDD + número.";
    return "";
}

export function validarCep(cep: string): string {
    const numeros = apenasNumeros(cep);
    if (!numeros) return "Digite o CEP.";
    if (numeros.length !== 8) return "CEP incompleto. São 8 números.";
    return "";
}

export function validarSenha(senha: string): string {
    if (!senha) return "Digite uma senha.";
    if (senha.length < 6) return "A senha precisa ter pelo menos 6 caracteres.";
    return "";
}

export function validarConfirmacao(senha: string, confirmacao: string): string {
    if (!confirmacao) return "Repita a senha.";
    if (senha !== confirmacao) return "As senhas não são iguais.";
    return "";
}

export function validarMatricula(matricula: string): string {
    if (apenasNumeros(matricula).length !== 6) return "A matrícula tem 6 números.";
    return "";
}

export function validarObrigatorio(valor: string, mensagem: string = "Preencha este campo."): string {
    return valor.trim() ? "" : mensagem;
}

export function validarDescricao(descricao: string): string {
    if (descricao.trim().length < 10) return "Conte o que está acontecendo (pelo menos 10 letras).";
    return "";
}

export function semErros(erros: Record<string, string | undefined>): boolean {
    return Object.values(erros).every((mensagem) => !mensagem);
}
