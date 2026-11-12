import React from "react";
import { Text, View } from "react-native";
import { Badge, Button, EmptyState, Loading, Screen } from "../components";
import { ORDEM_STATUS, STATUS, rotuloTipo } from "../constants/ocorrencia";
import { useAuth } from "../contexts/AuthContext";
import { useOcorrenciaDetalhe } from "../hooks";
import { OcorrenciasScreenProps } from "../navigation/types";
import { styles } from "../styles/detalheOcorrencia.styles";
import { globalStyles } from "../styles/global.styles";
import { formatarDataHora } from "../utils/formatters";
import { mascaraCep, mascaraTelefone } from "../utils/masks";

export default function DetalheOcorrenciaScreen({ route }: OcorrenciasScreenProps<"DetalheOcorrencia">) {
    const { id, nova } = route.params;
    const { isAgente } = useAuth();
    const { ocorrencia, loading, mudarStatus } = useOcorrenciaDetalhe(id);

    if (loading) {
        return <Loading />;
    }

    if (!ocorrencia) {
        return (
            <Screen>
                <EmptyState title="Ocorrência não encontrada" />
            </Screen>
        );
    }

    const status = STATUS[ocorrencia.status];
    const proximoStatus = ORDEM_STATUS[ORDEM_STATUS.indexOf(ocorrencia.status) + 1];

    return (
        <Screen>
            {nova && (
                <Text style={globalStyles.mensagemSucesso} accessibilityRole="alert" accessibilityLiveRegion="polite">
                    Aviso enviado. A Defesa Civil já recebeu.
                </Text>
            )}

            <View style={globalStyles.cartao}>
                <View style={styles.topo}>
                    <Text style={styles.tipo} accessibilityRole="header">
                        {rotuloTipo(ocorrencia.tipo)}
                    </Text>
                    <Badge item={status} prefix="Situação: " />
                </View>

                <Text style={styles.rotulo}>Onde</Text>
                <Text style={globalStyles.texto}>
                    {ocorrencia.endereco}, {ocorrencia.numero} · CEP {mascaraCep(ocorrencia.cep)}
                </Text>

                <Text style={styles.rotulo}>O que está acontecendo</Text>
                <Text style={globalStyles.texto}>{ocorrencia.descricao}</Text>

                {isAgente && (
                    <>
                        <Text style={styles.rotulo}>Quem avisou</Text>
                        <Text style={globalStyles.texto}>
                            {ocorrencia.usuarioNome} · {mascaraTelefone(ocorrencia.telefone)}
                        </Text>
                    </>
                )}
            </View>

            <Text style={globalStyles.subtitulo} accessibilityRole="header">
                Andamento
            </Text>
            <View style={globalStyles.cartao}>
                {ocorrencia.historico.map((passo, indice) => {
                    const rotulo = STATUS[passo.status].rotulo;
                    const data = formatarDataHora(passo.data);

                    return (
                        <View
                            key={`${passo.status}-${passo.data}`}
                            style={[styles.passo, indice > 0 && styles.passoComLinha]}
                            accessible
                            accessibilityLabel={`${rotulo}, ${data}, por ${passo.por}`}
                        >
                            <Text style={styles.passoTitulo}>{rotulo}</Text>
                            <Text style={globalStyles.textoSuave}>
                                {data} · {passo.por}
                            </Text>
                        </View>
                    );
                })}
            </View>

            {isAgente && proximoStatus && (
                <Button
                    title={`Marcar como "${STATUS[proximoStatus].rotulo}"`}
                    icon={STATUS[proximoStatus].icone}
                    onPress={() => mudarStatus(proximoStatus)}
                />
            )}
        </Screen>
    );
}
