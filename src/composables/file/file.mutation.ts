import { useMutation } from "@tanstack/vue-query";
import { FileKeys } from "./file.keys";
import fileService from "@/api/file.service";
import { useOnFileUpload } from "./useOnFileUpload";

export const useUploadFile = (onFileUpload: (key: string) => void) => {
  const { onError, onProgress, onSuccess, cleanup } = useOnFileUpload();
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
        onSuccess();
        return presignedResult;
      } catch (error) {
        onError();
        throw error;
      } finally {
        cleanup();
      }
    },
  });
};
