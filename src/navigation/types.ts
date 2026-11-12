import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
    Login: undefined;
    Cadastro: undefined;
};

export type OcorrenciasStackParamList = {
    Ocorrencias: undefined;
    NovaOcorrencia: undefined;
    DetalheOcorrencia: { id: string; nova?: boolean };
};

export type AppTabParamList = {
    Painel: undefined;
    Alertas: undefined;
    OcorrenciasTab: NavigatorScreenParams<OcorrenciasStackParamList> | undefined;
    Abrigos: undefined;
    Perfil: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;

export type TabScreenProps<T extends keyof AppTabParamList> = BottomTabScreenProps<AppTabParamList, T>;

export type OcorrenciasScreenProps<T extends keyof OcorrenciasStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<OcorrenciasStackParamList, T>,
    BottomTabScreenProps<AppTabParamList>
>;
