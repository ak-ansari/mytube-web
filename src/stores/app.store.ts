import { defineStore } from "pinia";

const initialState = {
  sidebarVisible: true,
};
const useAppStore = defineStore("appStore", {
  state: () => initialState,
  actions: {
    toggleSidebarVisible() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
});
