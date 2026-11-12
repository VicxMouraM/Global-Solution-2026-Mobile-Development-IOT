import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Screen } from "../components";
import { useAuth, useUsuarioLogado } from "../contexts/AuthContext";
import { globalStyles } from "../styles/global.styles";
import { styles } from "../styles/perfil.styles";
import { cores } from "../styles/theme";
import { esconderCpf, mascaraCep, mascaraTelefone } from "../utils/masks";

type LinhaProps = {
    rotulo: string;
    valor: string;
};

function Linha({ rotulo, valor }: LinhaProps) {
    return (
        <View style={styles.linha} accessible accessibilityLabel={`${rotulo}: ${valor}`}>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <Text style={globalStyles.texto}>{valor}</Text>
        </View>
    );
}

export default function PerfilScreen() {
    const usuario = useUsuarioLogado();
    const { isAgente, logout } = useAuth();

    return (
        <Screen>
            <View style={styles.cabecalho}>
                <Ionicons name={isAgente ? "shield-checkmark" : "person-circle"} size={72} color={cores.primaria} />
                <Text style={styles.nome} accessibilityRole="header">
                    {usuario.nome}
                </Text>
                <Text style={globalStyles.textoSuave}>{isAgente ? "Agente da Defesa Civil" : "Morador"}</Text>
            </View>

            <View style={globalStyles.cartao}>
                <Linha rotulo="CPF" valor={esconderCpf(usuario.cpf)} />
                <Linha rotulo="Celular" valor={mascaraTelefone(usuario.telefone)} />
                <Linha rotulo="CEP" valor={mascaraCep(usuario.cep)} />
                {isAgente && <Linha rotulo="Matrícula" valor={usuario.matricula} />}
            </View>

            <Text style={[globalStyles.textoSuave, styles.aviso]}>
                Seus dados ficam guardados só neste aparelho. Este é um protótipo com dados fictícios.
            </Text>

            <Button title="Sair da conta" icon="log-out-outline" variant="secundario" onPress={logout} />
        </Screen>
    );
}
