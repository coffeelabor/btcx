<template>
  <div class="block-container">
    <div v-if="loaderVisible" class="overlay">
      <div class="lds-dual-ring"></div>
    </div>
    <div>
      <h1>Block #{{ height }}</h1>
      <h3>Proof-of-Work:
        <br><Info v-bind:infoType="InfoType.MerkleField">{{ hash }}</Info>
      </h3>
    </div>
    <div>
      <div class="left">
        <div class="view-info">
          <p v-if="currentRoute == 'pretty'">This block has been formatted to display the various parts of a Bitcoin block in a way that easy for beginners to understand.
            <br /><br />Click on the items <Info v-bind:infoType="InfoType.Underlined">underlined</Info> in blue to learn more about them.
          </p>
          <p v-if="currentRoute == 'json'">This block is being displayed in <i>JSON</i>. JSON is a way to format information for use with the JavaScript programming language.
            <br /><br />This is what a Bitcoin block might look like if you were developing an application using a block explorer API (as this application is).
            <br /><br />This more accurately represents a raw Bitcoin block, but still has some modifications for ease of understanding.
            <br /><br />Click on the items <Info v-bind:infoType="InfoType.Underlined">underlined</Info> in blue to learn more about them.
          </p>
          <p v-if="currentRoute == 'hex'">This block is being displayed in hex format, which is the most accurate representation of a raw Bitcoin block that is still human readable.
            <br /><br />Actual Bitcoin blocks are stored in compressed binary format.
            <br /><br />Click on the items <Info v-bind:infoType="InfoType.Underlined">underlined</Info> in blue to learn more about them.
          </p>
        </div>
      </div>
      <div class="center">
        <router-view @UpdateBlockDisplay="UpdateBlockDisplay" @hideLoader="hideLoader" ref="view"></router-view>
      </div>
      <div class="right">
        <div class="block-header-info">
          <h2 class="center-h2" @mouseenter="highlight('blockheadertable')" @mouseleave="highlight('blockheadertable')">
            <Info v-bind:infoType="InfoType.MerkleField">Block Header</Info>
          </h2>
        </div>
        <div class="block-body-info">
          <h2 class="center-h2" @mouseenter="highlight('blockbodytable')" @mouseleave="highlight('blockbodytable')">
            <Info v-bind:infoType="InfoType.MerkleField">Block Body</Info>
          </h2>
        </div>
      </div>
    </div>
    <InfoSharedPopup/>
  </div>
</template>

<script>
import Info from "./Info.vue";
import InfoSharedPopup from "./InfoSharedPopup.vue";
import { InformationType } from "../Information";

const BG_DEFAULT_COLOR = "#182028";
const BG_HOVER_COLOR = "#181c1f";

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
  computed: {
    currentRoute: function() {
      return this.$route.name;
    }
  },
  data: function() {
    return {
      hash: '',
      height: '',
      loaderVisible: true,
      highlighted: false,
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
    },
    highlight: function(ref) {
      this.$refs.view.$refs[ref].style.background = this.highlighted ? BG_DEFAULT_COLOR : BG_HOVER_COLOR
      this.highlighted = !this.highlighted;
    }
  }
};
</script>

<style scoped>

/*BEGIN CSS LOADER*/
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
/*END CSS LOADER*/

.block-container {
  width: 100%;
}

.left {
  width: 25%;
  float: left;
  padding-left: 35px;
  padding-right: 35px;
}

.center {
  width: 50%;
  display: inline-block;
}

.right {
  width: 25%;
  float: right;
  padding-left: 35px;
  padding-right: 35px;
}

.view-info {
  background-color: #182028;
  color: #ffffff;
  padding: 10px;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: #0a1014;
}

.block-header-info {
  height: 135px;
  color: #ffffff;
  text-align: left;
}

.center-h2 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.block-body-info {
  height: 500px;
  color: #ffffff;
  text-align: left;
}

p {
  margin-bottom: 0px;
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
