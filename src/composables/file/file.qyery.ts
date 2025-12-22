import { useQuery } from "@tanstack/vue-query";
import { FileKeys } from "./file.keys";
import fileService from "@/api/file.service";

export const getFileDownloadUrl = (key: string) => {
  return useQuery({
    queryKey: FileKeys.getFileDownloadUrl(key),
    queryFn: () => fileService.getUrl(key),
    enabled: key !== "",
    staleTime: 1000 * 60 * 10,
  });
};
