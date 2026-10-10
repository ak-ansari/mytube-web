import { v4 } from "uuid";
import type { Ref } from "vue";

export * from "./constants";
export * from "./format";

export const getFallbackThumbnailKey = (id: string | Ref<string>): string => {
  const _id = typeof id === "string" ? id : id.value;
  return `thumbnails/${_id}/${_id}.jpeg`;
};
export const getExtension = (fileName: string) => fileName?.split(".").pop();
export const getUniqueFileName = (file: File): string => `${v4()}.${getExtension(file.name)}`;
export const stripExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, "");
