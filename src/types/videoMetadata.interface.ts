export interface VideoMetadata {
  id: string;                    // uuid
  video_id: string;              // uuid (FK → videos)
  filename: string;
  original_object_key: string;
  sha256: string | null;
  duration_seconds: number;
  size: number;                  // int64 → number
  codec_video: string ;
  codec_audio: string ;
  width: number | null;
  height: number | null;
  manifest_path: string;
  available_qualities: string[]; // e.g. ["360p", "720p"]
  thumbnail: string ;
  manifestUrl: string
  created_at: string;            // ISO date string
  updated_at: string;            // ISO date string
}
