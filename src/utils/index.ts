import moment from "moment";
import { v4 } from "uuid";
import type { Ref } from "vue";

export * from "./constants";

export const getFallbackThumbnailKey = (id: string | Ref<string>): string => {
  const _id = typeof id === "string" ? id : id.value;
  return `thumbnails/${_id}/${_id}.jpeg`;
};
export const getVideoAge = (uploadedAt: string | Date) => {
  const now = moment();
  const then = moment(uploadedAt);
  const years = now.diff(then, "years");
  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;

  const months = now.diff(then, "months");
  if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;

  const days = now.diff(then, "days");
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;

  const hours = now.diff(then, "hours");
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;

  const minutes = now.diff(then, "minutes");
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
};
const getExtension = (fileName: string) => fileName?.split(".").pop();
export const getUniqueFileName = (file: File): string => `${v4()}.${getExtension(file.name)}`;
