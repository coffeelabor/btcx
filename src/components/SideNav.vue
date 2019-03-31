<template>
  <div class="side-nav">
    <h1> BTCX </h1>
    <ul>
      <router-link tag="li" class="li-top-nav" to="/block/pretty/">Pretty View</router-link>
      <router-link tag="li" class="li-top-nav" to="/block/json/">JSON View</router-link>
      <router-link tag="li" class="li-top-nav" to="/block/hex/">Hex View</router-link>
    </ul>
    <ul class="ul-bottom-nav">
      <li class="li-bottom-nav" v-on:click="show('modal-about')">About</li>
      <li class="li-bottom-nav" v-on:click="show('modal-contact')">Contact</li>
      <li class="li-bottom-nav" v-on:click="show('modal-support')">Support Me</li>
      <p><span class="address">14FFBGBESq7ZbbG7wJrVeHE31xvh4MsvHM</span></p>
    </ul>
    <modal name="modal-about" classes="modal-border" :pivot-y="0.2" height="auto">
      <div class="modal-header"><h2>About</h2></div>
      <div class="modal-body">
        <img src="../assets/images/about.png" height="128px" width="128px">
        <br /><br />Hi there!<br /><br />My name is Tanner Rogers, I'm a software developer from Des Moines, Iowa. 
        <br /><br />By day, I work primarily with .NET and JavaScript. However, in my spare time, I love learning and teaching others about Bitcoin. As such, I currently help organize the <a href="https://twitter.com/dsmblockchain" target="_blank">Des Moiens Bitcoin & Blockchain Meetup</a> group.
        <br /><br />I created this project as a way to try and help others learn more about how Bitcoin actually works. There is a big gap between those who understand Bitcoin under the hood, and those who dont. I want to help shrink that gap by giving people technical information that is easy to consume and understand.
      </div>
    </modal>
    <modal name="modal-contact" classes="modal-border" :pivot-y="0.2" height="auto">
      <div class="modal-header"><h2>Contact Me</h2></div>
      <div class="modal-body">
        <img src="../assets/images/contact.png" height="128px" width="128px">
        <br /><br />If you would like to get in touch with me, the best option is to reach out directly via <a href="https://twitter.com/tannerrogers7" target="_blank">Twitter</a>.
        If you've found a bug or noticed a problem with this project specifically, please open an issue on <a href="https://github.com/TannerR1776/btcx" target="_blank">Github</a>.
      </div>
    </modal>
    <modal name="modal-support" classes="modal-border" :pivot-y="0.2" height="auto">
      <div class="modal-header"><h2>Support Me</h2></div>
      <div class="modal-body">
        <div><img src="../assets/images/support.png" height="128px" width="128px"></div>
        <br />If you like this project, and found it helpful, you can support me in any of the following ways.<br />
        <ul class="ul-support">
          <li><a href="https://twitter.com/tannerrogers7" target="_blank">Follow me on Twitter</a></li>
          <li><a href="https://github.com/TannerR1776/btcx" target="_blank">Star this project on Github</a></li>
          <li>Donate BTC: 14FFBGBESq7ZbbG7wJrVeHE31xvh4MsvHM</li>
          <li>Donate Satoshi's (tippin.me): <span>Coming soon!</span></li>
        </ul>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import VModal from "vue-js-modal";

Vue.use(VModal);

export default {
  name: 'SideNav',
  methods: {
    show(modal) {
      this.$modal.show(modal);
    }
  }
}
</script>

<style>
.modal-header {
  text-align: center;
  background-color: #131a20;
  color: #ffffff;
  padding: 10px !important;
  border-bottom: 1px solid #01b7f0 !important;
}

.modal-body {
  text-align: center;
  background-color: #1e262b;
  color: #ffffff;
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

.modal-border {
  border-style: solid;
  border-color: #4f5762;
  border-width: 1px;
  background-color: unset;
  border-radius: 3px;
}

.side-nav {
  width: 325px;
  background-color: #182028;
  float: left;
  position: relative;
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
  font-size: 12px;
  color: white;
}

.ul-support {
  display: inline-block; text-align: left;
}
</style>
