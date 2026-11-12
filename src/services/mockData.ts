import { Abrigo, EstacaoBase, UsuarioComSenha } from "../types";

export const ESTACOES_INICIAIS: EstacaoBase[] = [
    { id: "est-1", nome: "Estação 1", local: "Margem do rio", nivelBase: 90, cota: 300, nivel: 95, chuva: 1 },
    { id: "est-2", nome: "Estação 2", local: "Córrego da rua de baixo", nivelBase: 60, cota: 220, nivel: 64, chuva: 2 },
    { id: "est-3", nome: "Estação 3", local: "Ponte perto da escola", nivelBase: 70, cota: 260, nivel: 72, chuva: 0 },
];

export const ABRIGOS: Abrigo[] = [
    {
        id: "abr-1",
        nome: "Escola municipal do bairro",
        endereco: "Rua das Acácias, 120",
        distancia: "350 m",
        vagas: 80,
        recursos: ["Água", "Colchões", "Banheiro acessível"],
        telefone: "(11) 5555-0101",
    },
    {
        id: "abr-2",
        nome: "Centro comunitário",
        endereco: "Avenida Principal, 900",
        distancia: "800 m",
        vagas: 45,
        recursos: ["Água", "Alimentação", "Aceita animais"],
        telefone: "(11) 5555-0102",
    },
    {
        id: "abr-3",
        nome: "Quadra da igreja",
        endereco: "Rua do Alto, 45",
        distancia: "1,2 km",
        vagas: 30,
        recursos: ["Água", "Colchões"],
        telefone: "(11) 5555-0103",
    },
];

export const USUARIOS_DEMO: UsuarioComSenha[] = [
    {
        id: "demo-cidadao",
        nome: "Maria da Silva",
        cpf: "52998224725",
        telefone: "11988887777",
        cep: "04685001",
        perfil: "cidadao",
        matricula: "",
        senha: "cidadao123",
    },
    {
        id: "demo-agente",
        nome: "João Pereira",
        cpf: "11144477735",
        telefone: "11977776666",
        cep: "04685001",
        perfil: "agente",
        matricula: "123456",
        senha: "agente123",
    },
];
