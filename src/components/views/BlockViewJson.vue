<template>
  <div class="block-container">
    <div class="left">
      <div class="view-info">
        <p class="block-view-info">This block is being displayed in <i>JSON</i>. JSON is a way to format information for use with the JavaScript programming language.
          <br /><br />This is what a Bitcoin block might look like if you were developing an application using a block explorer API (as this application is).
          <br /><br />This more accuratly represents a raw Bitcoin block, but still has some modifications for ease of understanding.
          <br /><br />Click on the items <span class="info-text">underlined</span> in blue to learn more about them.
        </p>
      </div>
    </div>
    <div class="center">
      <table class="block-header-table" ref="blockheadertable">
        <tr>
          <p class="block">{ <br />
          <span class="span-twenty">
            "<Info v-bind:infoType="InfoType.Version">version</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.version }}</Info>", <br />
            "<Info v-bind:infoType="InfoType.Version">previousblockhash</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.previousblockhash }}</Info>", <br />
            "<Info v-bind:infoType="InfoType.Version">merkleroot</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.merkleroot }}</Info>", <br />
            "<Info v-bind:infoType="InfoType.Version">time</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.time }}</Info>", <br />
            "<Info v-bind:infoType="InfoType.Version">bits</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.bits }}</Info>", <br />
            "<Info v-bind:infoType="InfoType.Underlined">nonce</Info>": "<Info v-bind:infoType="InfoType.ProofOfWork">{{ block.nonce }}</Info>", <br />
          </span>
          </p>
        </tr>
      </table>
      <table class="block-body-table" ref="blockbodytable">
        <tr>
          <p class="block">
            <span class="span-twenty ">
              "<Info v-bind:infoType="InfoType.Underlined">tansactions</Info>": [
              <span class="span-ten" v-for="value in tx" :key="value.txid">
                {
                <span class="span-ten">
                  "<Info v-bind:infoType="InfoType.ProofOfWork">version</Info>": "{{ value.version }}",
                  <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_in</Info>": "{{ value.vin.length }}",
                  <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_in</Info>": [
                  <span class="span-ten" v-for="vin in value.vin" :key="vin.txid">
                    {
                    <br />
                    <span class="span-twenty">
                      "<Info v-bind:infoType="InfoType.ProofOfWork">previous_output</Info>": {
                      <br />
                      <span class="span-twenty">
                        "<Info v-bind:infoType="InfoType.ProofOfWork">hash</Info>": "{{ vin.txid }}",
                        <br />"<Info v-bind:infoType="InfoType.ProofOfWork">index</Info>": "{{ vin.n }}",
                      </span>
                      <br />}
                      <br />
                      <span v-if="value.isCoinBase != true">
                        "<Info v-bind:infoType="InfoType.ProofOfWork">script_bytes</Info>": "{{ vin.scriptSig.hex.length }}",
                        <br />"<Info v-bind:infoType="InfoType.ProofOfWork">signature_script</Info>": "{{ vin.scriptSig.asm }}",
                      </span>
                      <span v-else>
                        "<Info v-bind:infoType="InfoType.ProofOfWork">coinbase</Info>": "{{ vin.coinbase }}",
                      </span>
                      <br />"<Info v-bind:infoType="InfoType.ProofOfWork">sequence</Info>": "{{ vin.sequence }}"
                    </span>
                    <br />},
                  </span>
                  <br />],
                  <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_out</Info>": "{{ value.vout.length }}",
                  <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_out</Info>": [
                  <br /><span class="span-ten" v-for="vout in value.vout" v-bind:key="vout">
                    {
                    <br />
                    <span class="span-twenty">
                      "<Info v-bind:infoType="InfoType.ProofOfWork">value</Info>": "{{ vout.value }}",
                      <br />"<Info v-bind:infoType="InfoType.ProofOfWork">pk_script_length</Info>": "{{ vout.scriptPubKey.hex.length }}",
                      <br />"<Info v-bind:infoType="InfoType.ProofOfWork">pk_script</Info>": "{{ vout.scriptPubKey.asm }}",
                    </span>
                    <br />},
                  </span>
                  <br />]
                  <br />"<Info v-bind:infoType="InfoType.ProofOfWork">lock_time</Info>": "{{ value.locktime }}"
                </span>
              <br />},
              </span>
              <br />]
            </span>
          }
          </p>
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
  name: "BlockViewJson",
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
      block: {},
      tx: [],
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
        axios.get("https://blockexplorer.com/api/block/" + this.hash)
          .then(response => {
            this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
            this.block = response.data;
            this.GetTxData();
        });
      }
      else {
        axios.get("https://api.blockcypher.com/v1/btc/main").then(response => {
          var hash = response.data.previous_hash //Trying to get the latest block seemed to introduce API issues
          this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
          this.$router.push({ name: 'json', params: { hash } })
        });
      }
    },
    GetTxData: function() {
      var txIds = this.block.tx.slice(0, NUMBER_OF_TX_TO_DISPLAY).map(txId => axios.get("https://blockexplorer.com/api/tx/" + txId))
      axios.all(txIds).then(response => {
        //TODO: Add error checking
        response.forEach(element => {
          this.tx.push(element.data)
        });
        this.$emit('hideLoader');
      })
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
  margin: 0 auto;
  width: 100%;
  table-layout: fixed;
  display: block;
  height: 500px;
  overflow: auto;
margin-top: -1px;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
}

.block-header-table {
  text-align: left;
  border-spacing:0;
  border-collapse: collapse;
  margin: 0 auto;

  overflow: auto;
  width: 100% !important;
  table-layout: fixed;
  display: block;

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
</style>
