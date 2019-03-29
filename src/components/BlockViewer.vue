<template>
  <div class="block-container">
    <div v-if="loaderVisible" class="overlay">
      <div class="lds-dual-ring"></div>
    </div>
    <div>
      <h1>Block #{{ height }}</h1>
      <h3>
        Proof-of-Work:
        <br>
        <Info v-bind:infoType="InfoType.MerkleField">{{ hash }}</Info>
      </h3>
    </div>
    <!-- Refactor this. Move left/Center/Right divs into BlockViewer, reduce ViewPretty and ViewJson to just block data... -->
    <router-view @UpdateBlockDisplay="UpdateBlockDisplay" @hideLoader="hideLoader"></router-view>
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
  watch: {
    '$route' () {
      this.showLoader();
    }
  },
  data: function() {
    return {
      hash: '',
      height: '',
      loaderVisible: true,
      InfoType: InformationType
    };
  },
  methods: {
    UpdateBlockDisplay(hash, height) {
      this.hash = hash;
      this.height = height;
    },
    showLoader() {
      this.loaderVisible = true
    },
    hideLoader() {
      this.loaderVisible = false
    }
  }
};
</script>

<style scoped>
.overlay { 
  background: #04080c75;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.lds-dual-ring {
  
  width: 50px;
  height: 50px;
  /*transform: translate(-250%, 800%);
  display: inline-block;*/
  position: fixed;
  top: 50%;
  left: 56%;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;

}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



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
