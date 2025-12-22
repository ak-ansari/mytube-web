import axios from "axios";
import { http } from "./http";
class FileService {
  getPresignedUrl(key: string, size: number): Promise<{key: string, url: string}> {
    return http.get("/api/files/presign", {
      params: {
        key,
        size,
      },
    });
  }

  uploadToS3 = async (
    presignedUrl: string,
    file: File,
    onProgress?: (percent: number) => void
  ) => {
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type, // IMPORTANT
      },
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress?.(percent);
      },
    });
  };
  getUrl(key: string): Promise<string> {
    return http.get(`/api/files/url`, { params: { key } });
  }
}
export default new FileService();
