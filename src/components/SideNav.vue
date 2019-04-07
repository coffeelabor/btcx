<template>
  <div>
    <div class="scroll-container">
      <transition name="slide">
      <span v-if="!fullNavMenu" class="open-menu" v-on:click="toggleNav">&#9776;</span>
      <div  v-if="fullNavMenu" class="side-nav" id="nav" ref="navs">
        <span class="close-menu" v-on:click="toggleNav">&times;</span>
        <h1> BTCX </h1>
        <ul>
          <router-link tag="li" class="li-top-nav" to="/block/pretty/">Pretty View</router-link>
          <router-link tag="li" class="li-top-nav" to="/block/json/">JSON View</router-link>
          <router-link tag="li" class="li-top-nav" to="/block/hex/">Hex View</router-link>
        </ul>
        <ul class="ul-bottom-nav">
          <li class="li-bottom-nav" v-on:click="showModal('modal-about')">About</li>
          <li class="li-bottom-nav" v-on:click="showModal('modal-contact')">Contact</li>
          <li class="li-bottom-nav" v-on:click="showModal('modal-support')">Support Me</li>
          <p><span class="address">14FFBGBESq7ZbbG7wJrVeHE31xvh4MsvHM</span></p>
        </ul>
        <modal name="modal-about" classes="modal-border" :pivot-y="0.2" height="auto" :adaptive="true" :scrollable="true">
          <div class="modal-header">
            <h2>About</h2>
            <span class="modal-close" v-on:click="hideModal('modal-about')">&times;</span>
          </div>
          <div class="modal-body">
            <img src="../assets/images/about.png" height="64px" width="64px">
            <br /><br />My name is Tanner Rogers, I'm a software developer from Iowa.
            <br /><br />By day, I work primarily with .NET and JavaScript. However, in my spare time, I love learning and teaching others about Bitcoin. As such, I currently help organize the <a href="https://twitter.com/dsmblockchain" target="_blank">Des Moines Bitcoin & Blockchain Meetup</a> group.
            <br /><br />I created this project as a way to try and help others learn more about how Bitcoin actually works. There is a big gap between those who understand Bitcoin under the hood, and those who dont. I want to help shrink that gap by giving people technical information that is easy to consume and understand.
          </div>
        </modal>
        <modal name="modal-contact" classes="modal-border" :pivot-y="0.2" height="auto" :adaptive="true" :scrollable="true">
          <div class="modal-header">
            <h2>Contact Me</h2>
            <span class="modal-close" v-on:click="hideModal('modal-contact')">&times;</span>
          </div>
          <div class="modal-body">
            <img src="../assets/images/contact.png" height="64px" width="64px">
            <br /><br />If you would like to get in touch with me, the best option is to reach out directly via <a href="https://twitter.com/tannerrogers7" target="_blank">Twitter</a>.
            If you've found a bug or noticed a problem with this project specifically, please open an issue on <a href="https://github.com/TannerR1776/btcx" target="_blank">Github</a>.
          </div>
        </modal>
        <modal name="modal-support" classes="modal-border" :pivot-y="0.2" height="auto" :adaptive="true" :scrollable="true">
          <div class="modal-header">
            <h2>Support Me</h2>
            <span class="modal-close" v-on:click="hideModal('modal-support')">&times;</span>
          </div>
          <div class="modal-body">
            <div><img src="../assets/images/support.png" height="64px" width="64px"></div>
            <br />If you like this project, and found it helpful, you can support me in any of the following ways.<br />
            <ul class="ul-support">
              <li><a href="https://twitter.com/tannerrogers7" target="_blank">Follow me on Twitter</a></li>
              <li><a href="https://github.com/TannerR1776/btcx" target="_blank">Star this project on Github</a></li>
              <li>Donate BTC: <span class="address">14FFBGBESq7ZbbG7wJrVeHE31xvh4MsvHM</span></li>
              <li>Donate Satoshi's (tippin.me): <span>Coming soon!</span></li>
            </ul>
          </div>
        </modal>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VModal from "vue-js-modal";

Vue.use(VModal);

export default {
  name: 'SideNav',
  data: function() {
    return {
      fullNavMenu: true
    }
  },
  methods: {
    showModal(modal) {
      this.$modal.show(modal);
    },
    hideModal(modal) {
      this.$modal.hide(modal);
    },
    toggleNav() {
      this.fullNavMenu = !this.fullNavMenu
      window.EventBus.$emit("toggleNav", this.fullNavMenu)
    }
  }
}
</script>

<style>
.scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.open-menu {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 45px;
  line-height: 100%;
  cursor: pointer;
  color: #fff;
}

.close-menu {
  font-size: 45px;
  cursor: pointer;
  line-height: 100%;
  position: absolute;
  right: 15px;
  top: -10px;
  color: #fff;
}

.modal-header {
  text-align: center;
  background-color: #131a20;
  color: #ffffff;
  padding: 10px !important;
  border-style: solid;
  border-color: #4f5762;
  border-width: 1px;
  border-radius: 3px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: 1px solid #01b7f0 !important;
}

.modal-body {
  text-align: center;
  background-color: #1e262b;
  color: #ffffff;
  border-style: solid;
  border-color: #4f5762;
  border-width: 1px;
  border-radius: 3px;
}

.modal-body a {
  color: #01b7f0;
}

.modal-body a:hover {
  color: #01b7f0;
}

.modal-header h2 {
  width: 100%;
  margin-bottom: 0px;
}

.modal-close {
  font-size: 45px;
  cursor: pointer;
  line-height: 30px;
  color: #fff;
}

.modal-border {
  padding: 15px;
}

.side-nav {
  width: 300px;
  height: 100%;
  background-color: #182028;
  position: relative;
  min-height: 450px;
}

.li-top-nav {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  color: #ffffff;
  border-left: 3px solid transparent;
}

.li-top-nav:hover {
  background-color: #181C1F;
  cursor: pointer;
  border-image: linear-gradient( to bottom, #3FBAFF, #075793) 1 100%;
  border-width: 3px;
  border-left-style: solid;
}

.router-link-active {
  background-color: #181C1F;
  cursor: pointer;
  border-image: linear-gradient( to bottom, #3FBAFF, #075793) 1 100%;
  border-width: 3px;
  border-left-style: solid;
}

.ul-bottom-nav {
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.li-bottom-nav {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  color: #ffffff;
  border-left: 3px solid transparent;
}

.li-bottom-nav:hover {
  background-color: #181C1F;
  cursor: pointer;
}

ul {
  padding: 0px;
  margin-top: 30px;
}

.side-nav h1 {
  padding-top: 25px;
  font-size: 72px;
  background: -webkit-linear-gradient(#0A77C5, #00C6FB);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.address {
  font-size: 13px;
  color: white;
}

.ul-support {
  display: inline-block;
  text-align: left;
  padding: 15px;
}
</style>
