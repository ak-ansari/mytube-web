import type { Ref } from "vue";

export const videoKeys = {
  searchVideos: (search: Ref<string>, page: Ref<number>, limit: Ref<number>) => [
    "search_video",
    search,
    page,
    limit,
  ],
  uploadVideo: () => ["upload_video"],
};
