import type { Video } from "@/types";
import { Constants } from "@/utils";
import { defineStore } from "pinia";
interface InitialState {
  search: string;
  page: number;
  limit: number;
  videos: Video[];
}
const initialState: InitialState = {
  search: "",
  page: Constants.defaultPage,
  limit: Constants.defaultLimit,
  videos: [],
};
export const useVideoStore = defineStore("videoStore", {
  state: () => initialState,
  actions: {
    setSearch(search: string) {
      this.search = search;
    },
    setPage(page: number) {
      this.page = page;
    },
    setLimit(limit: number) {
      this.limit = limit;
    },
    setVideos(videos: Video[]) {
      this.videos = videos;
    },
  },
});
