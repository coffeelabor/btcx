<template>
  <div class="block-viewer">
    <div v-if="loaderVisible" class="overlay">
      <div class="lds-dual-ring" v-bind:class="{ 'lds-dual-ring-nav-menu': fullNavMenu }"></div>
    </div>
    <div class="pow-container">
      <h1 class="block-height">Block #{{ height }}</h1>
      <h3>Proof-of-Work:
        <br><Info v-bind:infoType="InfoType.HeaderProofOfWork">{{ hash }}</Info>
      </h3>
    </div>
    <div class="block-container">
      <div class="left">
        <div class="view-info">
          <p v-if="currentRoute == 'pretty'">This block has been formatted to display the various parts of a Bitcoin block in a way that is easy for beginners to understand.
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
            <Info v-bind:infoType="InfoType.BlockHeader">Block Header</Info>
          </h2>
        </div>
        <div class="block-body-info">
          <h2 class="center-h2" @mouseenter="highlight('blockbodytable')" @mouseleave="highlight('blockbodytable')">
            <Info v-bind:infoType="InfoType.BlockBody">Block Body</Info>
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
      fullNavMenu: true,
      loaderVisible: true,
      highlighted: false,
      InfoType: InformationType
    };
  },
  created() {
    window.EventBus.$on("toggleNav", fullNavMenu => {
      this.fullNavMenu = fullNavMenu
    });
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
  margin-top: -25px;  /* half of height, to actually center div */
  margin-left: -25px; /* half of width,  to actually center div */
  position: fixed;
  top: 50%;
  left: 50%;
}

.lds-dual-ring-nav-menu {
  margin-left: 125px; /* This centers the circle when the menu is open */
                      /* 125 = Menu Width / 2 + Current Margin-Left    */
                      /* (300/2)+(-25) = 125px                         */
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

.block-viewer {
  width: 100%;
  overflow: auto;
}

.left {
  width: 25%;
  display: inline-block;
  margin: 0 auto;
  vertical-align: top;
  padding-left: 35px;
  padding-right: 35px;
}

.center {
  width:750px;
  display: inline-block;
  margin: 0 auto;
  vertical-align: top;
}

.right {
  width: 25%;
  display: inline-block;
  margin: 0 auto;
  vertical-align: top;
  padding-left: 35px;
  padding-right: 35px;
}

.block-height {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  padding-top: 55px;
  padding-bottom: 15px;
}

.block-container, .pow-container {
  padding-left: 20px;
}

@media (max-width: 1550px) {
  .block-container {
    display: flex;
    flex-direction: column;
  }
  .left, .center, .pow-container { width: 750px; padding-left: 0; padding-right: 0px; padding-bottom: 20px; margin: auto;}
  .right { display: none; }
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

h3 {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  font-size: 17px !important;
  padding-bottom: 15px;
}
</style>
