import moment from "moment";
import { VideoStatus, type ChannelSummary, type VideoCard } from "@/types";

/** 1234 -> "1.2K", 1500000 -> "1.5M" */
export const formatCount = (n: number): string => {
  if (n >= 1_000_000_000) return `${+(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(1)}K`;
  return `${n}`;
};

export const formatViews = (n: number) => `${formatCount(n)} ${n === 1 ? "view" : "views"}`;

export const formatSubscribers = (n: number) => `${formatCount(n)} ${n === 1 ? "subscriber" : "subscribers"}`;

/** 75 -> "1:15", 3725 -> "1:02:05" */
export const formatDuration = (seconds?: number | null): string => {
  if (!seconds || seconds < 0) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
};

export const timeAgo = (date: string | Date) => moment(date).fromNow();

export const formatDate = (date: string | Date) => moment(date).format("MMM D, YYYY");

export const channelName = (c: Pick<ChannelSummary, "channel_name" | "user_name">) => c.channel_name || c.user_name;

export interface StatusInfo {
  label: string;
  color: string;
  icon: string;
  /** still moving through the pipeline */
  processing: boolean;
  /** uploaded and checked, waiting for title/visibility (confirm) */
  needsDetails: boolean;
}

export const videoStatusInfo = (v: Pick<VideoCard, "status" | "title">): StatusInfo => {
  switch (v.status) {
    case VideoStatus.Published:
    case VideoStatus.Done:
      return { label: "Published", color: "success", icon: "mdi-check-circle", processing: false, needsDetails: false };
    case VideoStatus.Phase1Failed:
    case VideoStatus.Phase2Failed:
      return { label: "Failed", color: "error", icon: "mdi-alert-circle", processing: false, needsDetails: false };
    case VideoStatus.UploadPending:
    case VideoStatus.Uploaded:
      return { label: "Uploading", color: "info", icon: "mdi-cloud-upload", processing: true, needsDetails: false };
  }
  if (!v.title) {
    return { label: "Draft", color: "warning", icon: "mdi-file-edit-outline", processing: false, needsDetails: true };
  }
  return { label: "Processing", color: "info", icon: "mdi-progress-clock", processing: true, needsDetails: false };
};

export const visibilityIcon: Record<string, string> = {
  public: "mdi-earth",
  unlisted: "mdi-link-variant",
  private: "mdi-lock-outline",
};
