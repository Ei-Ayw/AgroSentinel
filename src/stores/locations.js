import { defineStore } from "pinia";

export const useLocationStore = defineStore("locations", {
  state: () => ({
    locations: [],
    currentSpaceId: 1,
  }),
  actions: {
    setLocations(locations) {
      this.locations = locations;
    },
    setCurrentSpaceId(spaceId) {
      this.currentSpaceId = spaceId;
    },
  },
});
