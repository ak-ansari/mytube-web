import { Constants } from "@/utils";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { videoKeys } from "./video.keys";
import videoService from "@/api/video.service";
import { computed, ref, type Ref, unref } from "vue";

export const useSearchVideo = (
  search: Ref<string>,
  page: Ref<number> = ref(Constants.defaultPage),
  limit: Ref<number> = ref(Constants.defaultLimit)
) => {
  return useQuery({
    queryKey: videoKeys.searchVideos(search, page, limit),
    queryFn: () =>
      videoService.searchVideos(unref(search), unref(page), unref(limit)),
    enabled: computed(() => unref(search) !== ""), // only fetch if search is non-empty
  });
};

export const useUploadVideo = () => {
  return useMutation({
    mutationKey: videoKeys.uploadVideo(),
    mutationFn: videoService.uploadVideo,
  });
};
