import type { Ref } from "vue";

export const videoMetadataKeys = {
    get: (id: Ref<string>)=> (["get_video_meta",id])
}