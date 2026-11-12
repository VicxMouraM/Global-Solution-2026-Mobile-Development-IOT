import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Screen } from "../components";
import { useLoginForm } from "../hooks";
import { AuthScreenProps } from "../navigation/types";
import { USUARIOS_DEMO } from "../services";
import { globalStyles } from "../styles/global.styles";
import { styles } from "../styles/login.styles";
import { cores } from "../styles/theme";

export default function LoginScreen({ navigation }: AuthScreenProps<"Login">) {
    const form = useLoginForm();

    return (
        <Screen edges={["top", "bottom"]}>
            <View style={styles.cabecalho}>
                <Ionicons name="rainy" size={64} color={cores.primaria} />
                <Text style={globalStyles.titulo} accessibilityRole="header">
                    AlertaChuva
                </Text>
                <Text style={styles.frase}>Avisos de enchente para o seu bairro</Text>
            </View>

            <Input
                label="CPF"
                placeholder="000.000.000-00"
                keyboardType="number-pad"
                maxLength={14}
                value={form.cpf}
                onChangeText={form.alterarCpf}
                error={form.erros.cpf}
            />
            <Input
                label="Senha"
                placeholder="Sua senha"
                secureTextEntry
                value={form.senha}
                onChangeText={form.alterarSenha}
                onSubmitEditing={form.handleLogin}
                error={form.erros.senha}
            />

            {form.erroGeral ? (
                <Text style={globalStyles.mensagemErro} accessibilityRole="alert" accessibilityLiveRegion="assertive">
                    {form.erroGeral}
                </Text>
            ) : null}

            <Button title="Entrar" icon="log-in-outline" onPress={form.handleLogin} loading={form.loading} />
            <Button title="Criar minha conta" variant="secundario" onPress={() => navigation.navigate("Cadastro")} />

            <View style={styles.demo}>
                <Text style={styles.demoTitulo}>Acesso para testar</Text>
                <Text style={globalStyles.textoSuave}>
                    Escolha um perfil para preencher os dados de exemplo.
                </Text>
                <View style={styles.demoBotoes}>
                    {USUARIOS_DEMO.map((conta) => (
                        <View key={conta.id} style={styles.demoBotao}>
                            <Button
                                title={conta.perfil === "agente" ? "Agente" : "Cidadão"}
                                variant="secundario"
                                icon={conta.perfil === "agente" ? "shield-checkmark-outline" : "person-outline"}
                                hint={`Preenche o login com a conta de teste de ${conta.nome}`}
                                onPress={() => form.preencher(conta)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </Screen>
    );
}
