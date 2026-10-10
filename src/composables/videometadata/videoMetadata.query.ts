import { useQuery } from "@tanstack/vue-query";
import { computed, ref, unref } from "vue";
import { videoMetadataKeys } from "./videoMetadata.keys";
import videoMetadataService from "@/api/videoMetadata.service";
import type { VideoMetadata } from "@/types";
import fileService from "@/api/file.service";

export const useGetVideoMetadata = (id: string) => {
    const idRef = ref(id)
  return useQuery({
    queryKey: videoMetadataKeys.get(idRef),
    queryFn: async(): Promise<VideoMetadata> =>{
       const meta = await videoMetadataService.getVideoMetadata(unref(idRef));
       const manifestUrl = await fileService.getUrl(meta.manifest_path)
       return {...meta,manifestUrl}
    } ,
    enabled: computed(() => unref(idRef) !== ""), // only fetch if search is non-empty
  });
};