import React from "react";
import { Text, View } from "react-native";
import { Badge, Button, EmptyState, Screen } from "../components";
import { NIVEIS } from "../constants/risco";
import { useAuth } from "../contexts/AuthContext";
import { useSensores } from "../contexts/SensorContext";
import { TabScreenProps } from "../navigation/types";
import { styles } from "../styles/alertas.styles";
import { globalStyles } from "../styles/global.styles";
import { formatarDataHora } from "../utils/formatters";

export default function AlertasScreen({ navigation }: TabScreenProps<"Alertas">) {
    const { isAgente } = useAuth();
    const { alertas, limparAlertas } = useSensores();

    if (alertas.length === 0) {
        return (
            <Screen>
                <EmptyState
                    icon="notifications-off-outline"
                    title="Nenhum alerta até agora"
                    text="Quando um sensor indicar risco de alagamento, o aviso aparece aqui."
                />
            </Screen>
        );
    }

    const contagem = alertas.length === 1 ? "1 alerta registrado" : `${alertas.length} alertas registrados`;

    return (
        <Screen>
            <Text style={[globalStyles.textoSuave, styles.contagem]}>
                {contagem}. O mais novo aparece primeiro.
            </Text>

            {alertas.map((alerta) => {
                const nivel = NIVEIS[alerta.risco];
                const data = formatarDataHora(alerta.data);

                return (
                    <View
                        key={alerta.id}
                        style={[globalStyles.cartao, styles.cartao, { borderLeftColor: nivel.cor }]}
                        accessible
                        accessibilityLabel={`${nivel.rotulo} em ${alerta.estacaoNome}, ${data}. ${alerta.orientacao}`}
                    >
                        <View style={styles.topo}>
                            <Badge item={nivel} />
                            <Text style={globalStyles.textoSuave}>{data}</Text>
                        </View>
                        <Text style={styles.local}>{alerta.estacaoNome}</Text>
                        <Text style={globalStyles.textoSuave}>
                            Córrego em {alerta.nivel} cm (limite {alerta.cota} cm) · Chuva de {alerta.chuva} mm/h
                        </Text>
                        <Text style={[globalStyles.texto, styles.orientacao]}>{alerta.orientacao}</Text>
                    </View>
                );
            })}

            {isAgente ? (
                <Button title="Limpar histórico" variant="perigo" icon="trash-outline" onPress={limparAlertas} />
            ) : (
                <Button title="Ver para onde ir" icon="home-outline" onPress={() => navigation.navigate("Abrigos")} />
            )}
        </Screen>
    );
}
