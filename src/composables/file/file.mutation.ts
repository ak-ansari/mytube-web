import { useMutation } from "@tanstack/vue-query";
import { FileKeys } from "./file.keys";
import fileService from "@/api/file.service";

export const useUploadFile = (
  onProgress: (progress: number) => void,
  onFileUpload: (key: string) => void
) => {
  return useMutation({
    mutationKey: FileKeys.getUploadUrl(),
    mutationFn: async ({ file, key }: { file: File; key: string }) => {
      try {
        const presignedResult = await fileService.getPresignedUrl(
          key,
          file.size
        );
        await fileService.uploadToS3(presignedResult.url, file, onProgress);
        onFileUpload(key);
        return presignedResult;
      } catch (error) {
        throw error;
      }
    },
  });
};
