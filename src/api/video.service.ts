import { http } from "./http";
import type { UploadVideoDto, Video, VideoConfirmDto,PresignedResult } from "@/types";

class VideoService {
  searchVideos(
    search: string,
    page: number = 1,
    limit: number = 20
  ): Promise<Video[]> {
    return http.get("/api/videos/search", {
      params: {
        search,
        limit,
        page,
      },
    });
  }
  presignedUrl(video: UploadVideoDto): Promise<PresignedResult> {
    return http.post("/api/videos/upload/presign", video);
  }
  getSuggestions(search: string): Promise<string[]> {
    return http.get("/api/videos/suggest", {
      params: {
        search,
      },
    });
  }
  getVideo(id: string): Promise<Video> {
    return http.get(`/api/videos/${id}`);
  }
  confirmVideo({id,video}: {id: string, video: VideoConfirmDto}): Promise<Video> {
    return http.post(`/api/videos/${id}/confirm`, video);
  }
  getVideoUrl(key: string): Promise<string> {
    return http.get(`/api/videos/url`, { params: { key } });
  }
}
export default new VideoService();
