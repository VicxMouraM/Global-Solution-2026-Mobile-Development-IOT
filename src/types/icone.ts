import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export interface ItemSelo {
    rotulo: string;
    cor: string;
    icone: IconName;
}
