import videoService from "@/api/video.service";
import { useMutation } from "@tanstack/vue-query";
import { videoKeys } from "./video.keys";
import fileService from "@/api/file.service";
import { useOnFileUpload } from "../file/useOnFileUpload";

export const useUploadVideo = () => {
  return useMutation({
    mutationKey: videoKeys.uploadVideo(),
    mutationFn: async (file: File) => {
      const { onSuccess, onProgress, onError, cleanup } = useOnFileUpload();
      try {
        const presignedResult = await videoService.presignedUrl({
          file_name: file.name,
          size: file.size,
        });
        await fileService.uploadToS3(presignedResult.url, file, onProgress);
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
export const useConfirmVideo = () => {
  return useMutation({
    mutationKey: videoKeys.confirmVideo(),
    mutationFn: videoService.confirmVideo,
  });
};
