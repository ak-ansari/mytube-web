export * from "./constants";
export * from "./format";

export const getExtension = (fileName: string) => fileName?.split(".").pop();
export const stripExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, "");
