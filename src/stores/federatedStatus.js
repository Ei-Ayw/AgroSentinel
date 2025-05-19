import { defineStore } from "pinia";

export const useFederatedStore = defineStore("federated", {
  state: () => ({
    trainingStatus: null,
    modelPerformance: null,
  }),
  actions: {
    updateTrainingStatus(status) {
      this.trainingStatus = status;
    },
    updateModelPerformance(performance) {
      this.modelPerformance = performance;
    },
  },
});
