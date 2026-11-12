export * from "./usuario";
export * from "./sensor";
export * from "./ocorrencia";
export * from "./abrigo";
export * from "./icone";

export type Erros<T> = Partial<Record<keyof T, string>>;
