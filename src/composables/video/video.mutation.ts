import videoService from "@/api/video.service";
import { useMutation } from "@tanstack/vue-query";
import { videoKeys } from "./video.keys";
import fileService from "@/api/file.service";

export const useUploadVideo = (
  onProgress: (progress: number) => void
) => {
  return useMutation({
    mutationKey: videoKeys.uploadVideo(),
    mutationFn: async (file: File) => {
      try {
        const presignedResult = await videoService.presignedUrl({
          file_name: file.name,
          size: file.size,
        });
        await fileService.uploadToS3(presignedResult.url, file, onProgress);
        return presignedResult;
      } catch (error) {
        throw error;
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
