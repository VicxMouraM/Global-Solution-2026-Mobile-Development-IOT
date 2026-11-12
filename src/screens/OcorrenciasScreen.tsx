import React from "react";
import { FlatList, View } from "react-native";
import { Button, EmptyState, Loading, OcorrenciaCard } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { useOcorrencias } from "../hooks";
import { OcorrenciasScreenProps } from "../navigation/types";
import { styles } from "../styles/screen.styles";

export default function OcorrenciasScreen({ navigation }: OcorrenciasScreenProps<"Ocorrencias">) {
    const { isAgente } = useAuth();
    const { ocorrencias, loading } = useOcorrencias();

    if (loading) {
        return <Loading label="Carregando ocorrências" />;
    }

    return (
        <View style={styles.fundo}>
            <FlatList
                data={ocorrencias}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.conteudo}
                ListHeaderComponent={
                    isAgente ? undefined : (
                        <Button
                            title="Avisar um problema"
                            icon="add-circle-outline"
                            onPress={() => navigation.navigate("NovaOcorrencia")}
                        />
                    )
                }
                ListEmptyComponent={
                    <EmptyState
                        title={isAgente ? "Nenhuma ocorrência registrada" : "Você ainda não avisou nenhum problema"}
                        text={
                            isAgente
                                ? "Os avisos dos moradores aparecem aqui."
                                : 'Viu um alagamento ou bueiro entupido? Toque em "Avisar um problema".'
                        }
                    />
                }
                renderItem={({ item }) => (
                    <OcorrenciaCard
                        ocorrencia={item}
                        showAuthor={isAgente}
                        onPress={() => navigation.navigate("DetalheOcorrencia", { id: item.id })}
                    />
                )}
            />
        </View>
    );
}
