<template>
  <div class="block-container">
    <div>
      <h1>Block #{{ height }}</h1>
      <h3>
        Proof-of-Work:
        <br>
        <Info v-bind:infoType="InfoType.MerkleField">{{ hash }}</Info>
      </h3>
    </div>
    <router-view @UpdateBlockDisplay="UpdateBlockDisplay"></router-view>
    <InfoSharedPopup/>
  </div>
</template>

<script>
import Info from "./Info.vue";
import InfoSharedPopup from "./InfoSharedPopup.vue";
import { InformationType } from "../Information";

export default {
  name: "BlockViewer",
  components: {
    Info,
    InfoSharedPopup
  },
  data: function() {
    return {
      hash: '',
      height: '',
      InfoType: InformationType
    };
  },
  methods: {
    UpdateBlockDisplay(hash, height) {
      this.hash = hash;
      this.height = height;
    }
  }
};
</script>

<style scoped>
.block-container {
  width: 100%;
}

h1 {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  padding-top: 30px;
  padding-bottom: 15px;
}

h3 {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  font-size: 17px !important;
  padding-bottom: 15px;
}
</style>
