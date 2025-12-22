import { Constants } from "@/utils";
import { useQuery } from "@tanstack/vue-query";
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
export const useSuggestSearch = (search: Ref<string>) => {
  return useQuery({
    queryKey: videoKeys.suggest(search),
    queryFn: () => videoService.getSuggestions(unref(search)),
    enabled: computed(() => unref(search) !== ""), // only fetch if search is non-empty
  });
};
export const getVideo = (id: Ref<string>) => {
  return useQuery({
    queryKey: videoKeys.getVideo(id),
    queryFn: () => videoService.getVideo(unref(id)),
    enabled: computed(() => unref(id) !== ""), // only fetch if search is non-empty
  });
};
