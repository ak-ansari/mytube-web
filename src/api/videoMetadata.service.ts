import type { VideoMetadata } from "@/types";
import { http } from "./http";
class VideoMetadataService {
  getVideoMetadata = (id: string): Promise<VideoMetadata> => {
    return http.get(`/api/video-meta/${id}`);
  };
}
export default new VideoMetadataService();
