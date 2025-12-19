import { http } from "./http";
import type { UploadVideoDto, Video } from "@/types";

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
  uploadVideo(video: UploadVideoDto): Promise<string> {
    return http.post("/api/videos/upload/presign", video);
  }
}
export default new VideoService();
