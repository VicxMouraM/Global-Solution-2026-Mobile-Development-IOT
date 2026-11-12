function doisDigitos(numero: number): string {
    return String(numero).padStart(2, "0");
}

export function formatarDataHora(iso: string): string {
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return "";
    const dia = `${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)}/${data.getFullYear()}`;
    const hora = `${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`;
    return `${dia} às ${hora}`;
}

export function gerarId(prefixo: string): string {
    return `${prefixo}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}
