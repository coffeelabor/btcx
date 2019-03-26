<template>
    <div class="SideNav">
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
            <p><span style="font-size: 12px; color: white;">3P3QsMVK89JBNqZQv5zMAKG8FK3kJM4rjt </span></p>
        </ul>
        <modal name="modal-about" :pivot-y="0.2">
            <div class="modal-header"><h2>About Me</h2></div>
            <div class="modal-body">
                <img src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" height="128px" width="128px">
                Hello! My name is Tanner Rogers. I am a software developer from Des Moines, Iowa.
            </div>
        </modal>
        <modal name="modal-contact" :pivot-y="0.2">
            <div class="modal-header"><h2>Contact Me</h2></div>
            <div class="modal-body">
                <img src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" height="128px" width="128px">
                If, for whatever reason, you would like to contact me, the best way is to reach out to me directly on Twitter. If you would like to reach out to in regards to this project speciically, you can also reach me on Github.
            </div>
        </modal>
        <modal name="modal-support" :pivot-y="0.2">
            <div class="modal-header"><h2>Support Me</h2></div>
            <div class="modal-body">
                <img src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" height="128px" width="128px">
                Hello! My name is Tanner Rogers. I am a software developer from Des Moines, Iowa.
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

<style scoped>

.modal-header {
    text-align: center;
}

.modal-header h2 {
    width: 100%;
}

.SideNav {
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

h1 {
    padding-top: 25px;
    font-size: 72px;
    background: -webkit-linear-gradient(#0A77C5, #00C6FB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
