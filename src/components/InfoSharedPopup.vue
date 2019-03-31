<template>
  <div id="InfoSharedPopup" class="none" v-tippy-html>
    <div class="popup-title">
      <h3 v-if="info != null">{{ info.title }}</h3>
    </div>
    <div class="popup-content">
      <p v-if="info != null" v-html="info.content">{{ info.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null
    }
  },
  created() {
    window.EventBus.$on("infoItem", info => { 
      this.info = info 
    });
  }
}
</script>

<style> /*Can we scope this? */
.none {
    display: none;
}

.popup-title {
  border-bottom-style: solid !important;
  border-bottom-color: #01b7f0 !important;
  border-bottom-width: 1px !important;
  background-color: #131a20;
  color: #ffffff;
  padding: 10px 10px 10px 10px !important;
}
.popup-title h3 {
  margin: 0px;
  padding: 0px;
}

.popup-content {
  text-align: left;
  background-color: #262f36 !important;
  color: white;
  border-style: none !important;
  height: 100%;
  padding: 10px;
}

.popup-content p {
  margin: 0px;
}

.tippy-tooltip.btc-theme {
  background-color: #1e262b;
  border: 1px solid #4f5762;
  box-shadow: rgb(0, 0, 0) 0px 0px 20px;
  border-radius: 5px;
  padding: 0px;
  max-width: 700px;
}

.tippy-popper[x-placement^="bottom"] .tippy-tooltip.btc-theme .tippy-arrow {
  border-bottom: 8px solid #4f5762;
  margin-top: -1px;
}
</style>
