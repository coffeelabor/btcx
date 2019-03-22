<template>
  <div class="block-container">
    <div class="left">
      <div class="view-info">
        <p class="block-view-info">This block is being displayed in <i>JSON</i> format. JSON is a way to format information for use with the JavaScript programming language. 
          <br /><br />This is what a Bitcoin blocks fields might look like if you were developing an application using a block explorer API (as this application is).
          <br /><br />
          Click on the items <span class="info-text">underlined</span> in blue to learn more about them.
        </p>
      </div>
    </div>
    <div class="center">
      <table class="block-header-table" ref="blockheadertable">
        <tr>
<pre>{
    <Info v-bind:infoType="InfoType.ProofOfWork">"hash"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.hash }}</Info>"
    <Info v-bind:infoType="InfoType.Version">"version"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.version }}</Info>"
    <Info v-bind:infoType="InfoType.Version">"previousblockhash"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.previousblockhash }}</Info>"
    <Info v-bind:infoType="InfoType.Version">"merkleroot"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.merkleroot }}</Info>"
    <Info v-bind:infoType="InfoType.Version">"time"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.time }}</Info>"
    <Info v-bind:infoType="InfoType.Version">"bits"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.bits }}</Info>"
    <Info v-bind:infoType="InfoType.Underlined">"nonce"</Info>: "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.nonce }}</Info>"
}</pre>
        </tr>
      </table>
      <div class="block-body">
        <table class="block-body-table" ref="blockbodytable">
          <tr v-for="value in tx" :key="value.txid">
            <td colspan="2">
              <div>
                Todo
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right">
      <div class="block-header-info">
        <img src="../assets/images/brace.png" style="float: left;">
        <h2 style="line-height: 150px;"><Info v-bind:infoType="InfoType.Version">Block Header</Info></h2>
      </div>
        <div class="block-body-info">
        <img src="../assets/images/brace-lg.png" style="float: left;">
        <h2 style="line-height: 500px;"><Info v-bind:infoType="InfoType.Version">Block Body</Info></h2>
      </div>
    </div>
    <InfoSharedPopup/>
  </div>
</template>

<script>
const axios = require("axios");
import Vue from "vue";
import Info from "./Info.vue";
import { InformationType } from "../Information";
import InfoSharedPopup from "./InfoSharedPopup.vue"

export default {
  name: "JSONBlock",
  components: {
    Info,
    InfoSharedPopup
  },
  data: function() {
    return {
      block: {},
      blockHeader: [],
      tx: [],
      Info: {
        Title: "",
        Content: ""
      },
      InfoType: InformationType,
      activeHighlight: false
    };
  },
  methods: {
    highlight: function(ref) {
      if(this.activeHighlight) {
        this.$refs[ref].style.background = '#182028';
      }
      else {
        this.$refs[ref].style.background = '#181c1f';
      }
      this.activeHighlight = !(this.activeHighlight);
    },
    GetTxData: function() {
      for (var i = 0; i < 20; i++) {
        axios
          .get("https://blockexplorer.com/api/tx/" + this.block.tx[i])
          .then(response => {
            this.tx.push(response.data);
          });
      }
    },
    formatOutputAddr: function(txs) {
      var addr = "";
      if (txs === undefined || txs == "") {
        addr = "Unparsed address";
      } else {
        addr = txs.toString();
      }

      return addr;
    },
    formatInputAddr: function(address) {
      var addr = "";
      if (address === undefined || address == "") {
        addr = "Coinbase Transaction (Minted Coins)";
      } else {
        addr = address;
      }

      return addr;
    },
    formatValue: function(value) {
      var val = "";
      if (value === undefined || value == "") {
        val = "N/A";
      } else {
        val = value;
      }

      return val;
    }
  },
  mounted() {
    //axios.get("https://api.blockcypher.com/v1/btc/main").then(response => {
    axios
        .get(
          "https://blockexplorer.com/api/block/" +
            "0000000000000000000abeacccd9086605de0c7df750be6959dcfd6f3ee24c7d"
        )
        .then(response => {
          this.block = response.data;
          this.GetTxData();
        });
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
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
  padding-right: 50px;
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
  height: 100%;
  color: #ffffff;
  text-align: left;
}

.block-header-info h2 {
  margin-bottom: 0px;
  line-height: 500px;
}

.block-body-info {
  height: 100%;
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
  margin: 0 auto;
  width: 777px;
  margin-top: -1px;
}

.block-header-table {
  text-align: left;
  border-spacing:0;
  border-collapse: collapse;
  margin: 0 auto;
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
}
</style>
