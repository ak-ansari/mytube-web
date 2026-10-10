import fileService from "@/api/file.service";
import { getExtension } from "@/utils";
import { v4 } from "uuid";

/** Uploads a file straight to object storage under `${prefix}/<uuid>.<ext>` and returns its key. */
export const uploadObject = async (prefix: string, file: File, onProgress?: (percent: number) => void): Promise<string> => {
  const key = `${prefix}/${v4()}.${getExtension(file.name) || "bin"}`;
  const { url } = await fileService.getPresignedUrl(key, file.size);
  await fileService.uploadToS3(url, file, onProgress);
  return key;
};
