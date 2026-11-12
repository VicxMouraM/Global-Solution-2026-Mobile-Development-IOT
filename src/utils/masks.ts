export function apenasNumeros(valor: string = ""): string {
    return valor.replace(/\D/g, "");
}

export function mascaraCpf(valor: string): string {
    return apenasNumeros(valor)
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascaraTelefone(valor: string): string {
    const numeros = apenasNumeros(valor).slice(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    }
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export function mascaraCep(valor: string): string {
    return apenasNumeros(valor)
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2");
}

export function mascaraMatricula(valor: string): string {
    return apenasNumeros(valor).slice(0, 6);
}

export function mascaraNumero(valor: string): string {
    return apenasNumeros(valor).slice(0, 5);
}

export function esconderCpf(cpf: string): string {
    const numeros = apenasNumeros(cpf);
    if (numeros.length !== 11) return "";
    return `${numeros.slice(0, 3)}.***.***-${numeros.slice(9)}`;
}
