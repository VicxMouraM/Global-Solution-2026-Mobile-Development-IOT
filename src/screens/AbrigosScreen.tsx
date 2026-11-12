import React from "react";
import { ActivityIndicator, Linking, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Screen } from "../components";
import { useAbrigos } from "../hooks";
import { styles } from "../styles/abrigos.styles";
import { globalStyles } from "../styles/global.styles";
import { cores } from "../styles/theme";
import { apenasNumeros } from "../utils/masks";

const TELEFONE_DEFESA_CIVIL = "199";

function ligar(telefone: string) {
    Linking.openURL(`tel:${apenasNumeros(telefone)}`);
}

export default function AbrigosScreen() {
    const { abrigos, loading } = useAbrigos();

    return (
        <Screen>
            <Text style={globalStyles.introducao}>
                Lugares seguros perto de você, do mais próximo para o mais distante.
            </Text>

            <Button
                title={`Ligar para a Defesa Civil (${TELEFONE_DEFESA_CIVIL})`}
                icon="call-outline"
                variant="perigo"
                onPress={() => ligar(TELEFONE_DEFESA_CIVIL)}
            />

            {loading ? (
                <ActivityIndicator size="large" color={cores.primaria} accessibilityLabel="Carregando pontos de apoio" />
            ) : (
                abrigos.map((abrigo) => (
                    <View key={abrigo.id} style={globalStyles.cartao}>
                        <View
                            accessible
                            accessibilityLabel={
                                `${abrigo.nome}, a ${abrigo.distancia}. ${abrigo.endereco}. ` +
                                `${abrigo.vagas} vagas. Tem: ${abrigo.recursos.join(", ")}.`
                            }
                        >
                            <View style={styles.topo}>
                                <Text style={styles.nome}>{abrigo.nome}</Text>
                                <Text style={styles.distancia}>{abrigo.distancia}</Text>
                            </View>
                            <View style={styles.linha}>
                                <Ionicons name="location-outline" size={18} color={cores.textoSuave} />
                                <Text style={globalStyles.texto}>{abrigo.endereco}</Text>
                            </View>
                            <View style={styles.linha}>
                                <Ionicons name="people-outline" size={18} color={cores.textoSuave} />
                                <Text style={globalStyles.texto}>{abrigo.vagas} vagas</Text>
                            </View>
                            <Text style={[globalStyles.textoSuave, styles.recursos]}>
                                {abrigo.recursos.join(" · ")}
                            </Text>
                        </View>
                        <Button
                            title={`Ligar: ${abrigo.telefone}`}
                            icon="call-outline"
                            variant="secundario"
                            hint={`Liga para ${abrigo.nome}`}
                            onPress={() => ligar(abrigo.telefone)}
                        />
                    </View>
                ))
            )}

            <Text style={globalStyles.textoSuave}>
                Protótipo: endereços e telefones dos pontos de apoio são fictícios.
            </Text>
        </Screen>
    );
}
