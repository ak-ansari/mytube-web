import type { Ref } from "vue";

export const videoKeys = {
  searchVideos: (
    search: Ref<string>,
    page: Ref<number>,
    limit: Ref<number>
  ) => ["search_video", search, page, limit],
  uploadVideo: () => ["upload_video"],
  confirmVideo: () => ["confirm_video"],
  suggest: (search: Ref<string>) => ["search_suggestions", search],
  getVideoUrl: (key: string) => ["get_video_url", key],
  getVideo: (id: Ref<string>) => ["get_video", id],
};
