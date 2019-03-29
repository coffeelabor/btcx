<template>
  <div class="block-container">
    <div class="left">
      <div class="view-info">
        <p class="block-view-info">This block is being desplayed in hex format, which is the most accurate representation of a raw Bitcoin block that is still human readable.
          <br /><br />Actual Bitcoin blocks are stored in compressed binary format.
          <br /><br />Click on the items <span class="info-text">underlined</span> in blue to learn more about them.
        </p>
      </div>
    </div>
    <div class="center">
      <table class="block-header-table" ref="blockheadertable">
        <tr>
          <td class="wrap-text">
            <p class="block">
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.version }}</Info>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.prevBlockHash }}</Info>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.merkleRoot }}</Info>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.time }}</Info>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.bits }}</Info>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockHeader.nonce }}</Info>
            </p>
          </td>
        </tr>
      </table>
      <table class="block-body-table" ref="blockbodytable">
        <tr>
          <td class="wrap-text">
            <p class="block">
              {{ blockBody }}
            </p>
          </td>
        </tr>
      </table>
    </div>
    <div class="right">
      <div class="block-header-info">
        <h2 @mouseenter="highlight('blockheadertable')" @mouseleave="highlight('blockheadertable')">
          <Info v-bind:infoType="InfoType.Version">Block Header</Info>
        </h2>
      </div>
        <div class="block-body-info">
        <h2 @mouseenter="highlight('blockbodytable')" @mouseleave="highlight('blockbodytable')">
          <Info v-bind:infoType="InfoType.Version">Block Body</Info>
        </h2>
      </div>
    </div>
    <InfoSharedPopup/>
  </div>
</template>

<script>
const axios = require("axios");
import Info from "../Info.vue";
import { InformationType } from "../../Information";
import InfoSharedPopup from "../InfoSharedPopup.vue"

const NUMBER_OF_TX_TO_DISPLAY = 20;
const BG_DEFAULT_COLOR = "#182028";
const BG_HOVER_COLOR = "#181c1f";

export default {
  name: "BlockViewHex",
  components: {
    Info,
    InfoSharedPopup
  },
  props: [
    'hash'
  ],
  watch: {
    '$route' () {
      this.GetBlockData();
    }
  },
  data: function() {
    return {
      blockHeader: {},
      blockBody: "",
      InfoType: InformationType,
      activeHighlight: false
    };
  },
  methods: {
    highlight: function(ref) {
      this.$refs[ref].style.background = this.highlighted ? BG_DEFAULT_COLOR : BG_HOVER_COLOR
      this.highlighted = !this.highlighted;
    },
    GetBlockData() {
      if(this.hash != undefined) {
        this.block = {};
        this.tx = [];
        axios.get("https://blockexplorer.com/api/rawblock/" + this.hash)
          .then(response => {

            axios.get("https://blockexplorer.com/api/block/" + this.hash) // We have to make this call to get the block height
              .then(response => {
                this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
                this.$emit('hideLoader');
            });

            this.blockHeader = {
              version: response.data.rawblock.substring(0,8),
              prevBlockHash: response.data.rawblock.substring(8,72),
              merkleRoot: response.data.rawblock.substring(72,136),
              time: response.data.rawblock.substring(136,144),
              bits: response.data.rawblock.substring(144,152),
              nonce: response.data.rawblock.substring(152,160),
            }
            this.blockBody = response.data.rawblock.substring(160);
        });
      }
      else {
        axios.get("https://api.blockcypher.com/v1/btc/main").then(response => {
          var hash = response.data.previous_hash //Trying to get the latest block seemed to introduce API issues
          this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
          this.$router.push({ name: 'hex', params: { hash } })
        });
      }
    }
  },
  mounted() {
    this.GetBlockData();
  }
};
</script>

<style scoped>
.left {
  width: 25%;
  float: left;
}

.center {
  width: 50%;
  display: inline-block;
}

.right {
  width: 25%;
  float: right;
}

.hidden {
  visibility: hidden;
}

.block-container {
  width: 100%;
}

.popover {
  max-width: 100%;
  width: 400px;
}

.popover-body {
  width: 400px !important;
}

.learnmore {
  cursor: pointer;
  text-decoration-style: dotted;
  text-decoration-line: underline;
  text-decoration-color: #01b7f0;
}

.info-text {
  cursor: pointer;
  text-decoration-style: dotted;
  text-decoration-line: underline;
  text-decoration-color: #01b7f0;
}

.learn-more {
  cursor: pointer;
  text-decoration-style: dotted;
  text-decoration-line: underline;
  text-decoration-color: #01b7f0;
}

h1 {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  padding-bottom: 15px;
}

h3 {
  margin: 0;
  color: #fff;
  font-family: "Courier New", Courier, monospace !important;
  font-size: 17px !important;
  padding-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  /* margin: 0 10px; */
}

a {
  color: #42b983;
}

th {
  font-size: 14px;
  border-style: solid;
  border-width: 1px;
  padding-right: 100px;
  padding-left: 5px;
  color: #fff;
}

td {
  font-size: 14px;
  padding-right: 5px;
  padding-left: 5px;
  color: #fff;
}

table {
  background-color: #182028;
  font-family: "Courier New", Courier, monospace;
  /*box-shadow: 0px 0px 20px #000;*/
}

dt {
  display: block;
  float: left;
  font-weight: normal;
}

dl {
  margin-top: 5px;
  margin-bottom: 5px;
}

.tx-info {
  width: 105px;
  text-align: right;
}

dt:after {
  content: ": ";
  white-space: pre;
}

dd {
  display: block;
  margin-bottom: 0px !important;
}

.view-info {
  height: 100%;
  color: #ffffff;
  padding-left: 35px;
  padding-right: 35px;
}

.block-header-info {
  height: 135px;
  color: #ffffff;
  text-align: left;
}

.block-body-info {
  height: 500px;
  color: #ffffff;
  text-align: left;
}

.block-body {
  height: 500px;
  overflow:auto;
  margin: 0 auto;
  display: inline-block;
  overflow-x:hidden;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #0a1014;
}

.block-body-table {
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  margin: 0 auto;
  width: 100%;
  table-layout: fixed;
  height: 500px;
  margin-top: -1px;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
  overflow: auto;
}

.block-header-table {
  text-align: left;
  border-spacing:0;
  border-collapse: collapse;
  margin: 0 auto;
  height: 135px;
  overflow: auto;
  width: 100% !important;
  table-layout: fixed;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
}

.block-view-info {
  background-color: #182028;
  /*border-radius: 10px;*/
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #0a1014;
}

pre {
  color: #ffffff !important;
  margin-bottom: 0px;
}

.span-tx {
  display:inline-block;
  padding-left: 60px;
}

.span-tx-start {
  display:inline-block;
  padding-left: 20px;
}

.span-vin {
  display:inline-block;
  padding-left: 40px;
}

.span-ten {
  display:inline-block;
  padding-left: 10px;
  width: 100%;
  font-size: 12px;
}

.span-twenty {
  display:inline-block;
  padding-left: 20px;
  font-size: 12px;
}

span {
  color: #ffffff;
}

.block {
  color: #ffffff;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 12px;
  word-spacing: -3px;
  width: 760px;
}

.block-header-info img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.block-header-info h2 {
  position: relative;
  padding-left: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.block-body-info img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.block-body-info h2 {
  position: relative;
  padding-left: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.wrap-text {
  overflow-wrap: break-word;
}
</style>
