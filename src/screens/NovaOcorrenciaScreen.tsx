import React from "react";
import { Text } from "react-native";
import { Button, Input, OptionGroup, Screen } from "../components";
import { TIPOS_OCORRENCIA } from "../constants/ocorrencia";
import { useOcorrenciaForm } from "../hooks";
import { OcorrenciasScreenProps } from "../navigation/types";
import { globalStyles } from "../styles/global.styles";
import { styles } from "../styles/novaOcorrencia.styles";

export default function NovaOcorrenciaScreen({ navigation }: OcorrenciasScreenProps<"NovaOcorrencia">) {
    const { valores, erros, erroGeral, loading, alterar, alterarTipo, handleEnviar } = useOcorrenciaForm((criada) =>
        navigation.replace("DetalheOcorrencia", { id: criada.id, nova: true })
    );

    return (
        <Screen>
            <Text style={globalStyles.introducao}>
                Conte o que está acontecendo. A Defesa Civil recebe o aviso e você acompanha o andamento aqui no app.
            </Text>

            <OptionGroup
                label="Qual é o problema?"
                options={TIPOS_OCORRENCIA}
                value={valores.tipo}
                onChange={alterarTipo}
                error={erros.tipo}
            />

            <Input
                label="CEP do local"
                placeholder="00000-000"
                keyboardType="number-pad"
                maxLength={9}
                value={valores.cep}
                onChangeText={(texto) => alterar("cep", texto)}
                error={erros.cep}
            />
            <Input
                label="Rua"
                placeholder="Ex.: Rua das Acácias"
                value={valores.endereco}
                onChangeText={(texto) => alterar("endereco", texto)}
                error={erros.endereco}
            />
            <Input
                label="Número mais próximo"
                placeholder="Ex.: 120"
                keyboardType="number-pad"
                maxLength={5}
                value={valores.numero}
                onChangeText={(texto) => alterar("numero", texto)}
                error={erros.numero}
            />
            <Input
                label="O que está acontecendo?"
                help="Ex.: a água já cobre a calçada em frente ao mercado."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={styles.descricao}
                value={valores.descricao}
                onChangeText={(texto) => alterar("descricao", texto)}
                error={erros.descricao}
            />
            <Input
                label="Celular para contato"
                placeholder="(11) 90000-0000"
                keyboardType="phone-pad"
                maxLength={15}
                value={valores.telefone}
                onChangeText={(texto) => alterar("telefone", texto)}
                error={erros.telefone}
            />

            {erroGeral ? (
                <Text style={globalStyles.mensagemErro} accessibilityRole="alert" accessibilityLiveRegion="assertive">
                    {erroGeral}
                </Text>
            ) : null}

            <Button title="Enviar aviso" icon="send-outline" onPress={handleEnviar} loading={loading} />
        </Screen>
    );
}
