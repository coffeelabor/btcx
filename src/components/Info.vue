<template>
  <span class="learn-more" @show="GetInfo" v-tippy="{ html: '#InfoSharedPopup' }">
    <slot></slot>
  </span>
</template>

<script>
import Vue from "vue";
import { GetInformation } from "../Information";

export default {
  name: "Info",
  props: {
    infoType: Number
  },
  data: function() {
    return {
      Info: null
    };
  },
  methods: {
    GetInfo: function() {
      window.EventBus.$emit("infoItem", GetInformation(this.infoType))
    }
  }
};
</script>

<style scoped>
.learn-more {
  cursor: pointer;
  text-decoration-style: dotted;
  text-decoration-line: underline;
  text-decoration-color: #01b7f0;
}
</style>
