import { Constants } from "@/utils";
import { defineStore } from "pinia";

const initialState = {
  search: "",
  page: Constants.defaultPage,
  limit: Constants.defaultLimit,
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
  },
});
