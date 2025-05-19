<template>
  <div id="app">
    <MapContainer />
  </div>
</template>

<script>
import MapContainer from "./components/MapContainer.vue";

export default {
  name: "App",
  components: {
    MapContainer,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
