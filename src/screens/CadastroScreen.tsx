import React from "react";
import { Text } from "react-native";
import { Button, Input, OptionGroup, Screen } from "../components";
import { useCadastroForm } from "../hooks";
import { globalStyles } from "../styles/global.styles";
import { Perfil } from "../types";

const PERFIS: { chave: Perfil; rotulo: string }[] = [
    { chave: "cidadao", rotulo: "Sou morador" },
    { chave: "agente", rotulo: "Sou agente da Defesa Civil" },
];

export default function CadastroScreen() {
    const { valores, erros, erroGeral, loading, alterar, alterarPerfil, handleCadastro } = useCadastroForm();

    return (
        <Screen edges={["bottom"]}>
            <Text style={globalStyles.introducao}>
                Preencha seus dados para receber os avisos do seu bairro. Leva menos de 1 minuto.
            </Text>

            <OptionGroup label="Quem é você?" options={PERFIS} value={valores.perfil} onChange={alterarPerfil} />

            <Input
                label="Nome completo"
                placeholder="Ex.: Maria da Silva"
                autoCapitalize="words"
                value={valores.nome}
                onChangeText={(texto) => alterar("nome", texto)}
                error={erros.nome}
            />
            <Input
                label="CPF"
                placeholder="000.000.000-00"
                keyboardType="number-pad"
                maxLength={14}
                value={valores.cpf}
                onChangeText={(texto) => alterar("cpf", texto)}
                error={erros.cpf}
            />
            <Input
                label="Celular com DDD"
                placeholder="(11) 90000-0000"
                keyboardType="phone-pad"
                maxLength={15}
                value={valores.telefone}
                onChangeText={(texto) => alterar("telefone", texto)}
                error={erros.telefone}
            />
            <Input
                label="CEP de onde você mora"
                placeholder="00000-000"
                keyboardType="number-pad"
                maxLength={9}
                value={valores.cep}
                onChangeText={(texto) => alterar("cep", texto)}
                error={erros.cep}
            />

            {valores.perfil === "agente" && (
                <Input
                    label="Matrícula"
                    help="6 números do seu crachá."
                    placeholder="000000"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={valores.matricula}
                    onChangeText={(texto) => alterar("matricula", texto)}
                    error={erros.matricula}
                />
            )}

            <Input
                label="Crie uma senha"
                help="Pelo menos 6 letras ou números."
                secureTextEntry
                value={valores.senha}
                onChangeText={(texto) => alterar("senha", texto)}
                error={erros.senha}
            />
            <Input
                label="Repita a senha"
                secureTextEntry
                value={valores.confirmacao}
                onChangeText={(texto) => alterar("confirmacao", texto)}
                error={erros.confirmacao}
            />

            {erroGeral ? (
                <Text style={globalStyles.mensagemErro} accessibilityRole="alert" accessibilityLiveRegion="assertive">
                    {erroGeral}
                </Text>
            ) : null}

            <Button title="Criar conta" icon="checkmark-circle-outline" onPress={handleCadastro} loading={loading} />
        </Screen>
    );
}
