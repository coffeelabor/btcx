<template>
  <span class="learn-more" v-bind:class="{ highlight: highlight }" @show="GetInfo" v-tippy="{ html: '#InfoSharedPopup' }">
    <slot></slot>
  </span>
</template>

<script>
import { GetInformation } from "../Information";

export default {
  name: "Info",
  props: {
    infoType: Number,
    highlight: Boolean
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

.highlight:hover {
  background-color: #4e4e4e;
}
</style>
