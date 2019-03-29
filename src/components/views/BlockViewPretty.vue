<template>
  <div class="block-container">
    <div class="left">
      <div class="view-info">
        <p>
          This block has been formatted to display the various parts of a Bitcoin block in a way that easy for beginners to understand.
          <br>
          <br>Click on the items
          <Info v-bind:infoType="InfoType.Underlined">underlined</Info> in blue to learn more about them.
        </p>
      </div>
    </div>
    <div class="center">
      <table class="block-header-table" ref="blockheadertable">
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Version</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.version }}</Info></td>
        </tr>
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Previous Block Hash</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.previousblockhash }}</Info></td>
        </tr>
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Merkel Root Hash</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.merkleroot }}</Info></td>
        </tr>
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Time</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.time }}</Info></td>
        </tr>
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Block Target</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.bits }}</Info></td>
        </tr>
        <tr>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">Nonce</Info></td>
          <td><Info v-bind:infoType="InfoType.ProofOfWork">{{ block.nonce }}</Info></td>
        </tr>
      </table>
      <div class="block-body">
        <table class="block-body-table" ref="blockbodytable">
          <tr v-for="value in tx" :key="value.txid">
            <td colspan="2">
              <div>
                <dl>
                  <dt>
                    <Info v-bind:infoType="InfoType.ProofOfWork">TX ID</Info>
                  </dt>
                  <dd>{{ value.txid }}</dd>
                  <div v-for="(vin, index) in value.vin" :key="index + vin.txid">
                    <dt class="tx-info">
                      <Info v-bind:infoType="InfoType.ProofOfWork">From</Info>
                    </dt>
                    <dd>
                      {{ formatInputAddr(vin.addr) }} -
                      <Info v-bind:infoType="InfoType.ProofOfWork">Amount</Info>
                      : {{ formatValue(vin.value) }} BTC
                    </dd>
                  </div>
                  <div v-for="(vout, index) in value.vout" :key="index">
                    <dt class="tx-info">
                      <Info v-bind:infoType="InfoType.ProofOfWork">To</Info>
                    </dt>
                    <dd>
                      {{ formatOutputAddr(vout.scriptPubKey.addresses) }} -
                      <Info v-bind:infoType="InfoType.ProofOfWork">Amount</Info>
                      : {{ vout.value }} BTC
                    </dd>
                  </div>
                  <dt class="tx-info">
                    <Info v-bind:infoType="InfoType.ProofOfWork">Fee</Info>
                  </dt>
                  <dd>{{ formatValue(value.fees) }} BTC</dd>
                  <dt class="tx-info">
                    <Info v-bind:infoType="InfoType.ProofOfWork">Size</Info>
                  </dt>
                  <dd>{{ value.size }} bytes</dd>
                </dl>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right">
      <div class="block-header-info">
        <h2 @mouseenter="highlight('blockheadertable')" @mouseleave="highlight('blockheadertable')">
          <Info v-bind:infoType="InfoType.MerkleField">Block Header</Info>
        </h2>
      </div>
      <div class="block-body-info">
        <h2 @mouseenter="highlight('blockbodytable')" @mouseleave="highlight('blockbodytable')">
          <Info v-bind:infoType="InfoType.MerkleField">Block Body</Info>
        </h2>
      </div>
    </div>
    <InfoSharedPopup/>
  </div>
</template>

<script>
const axios = require("axios");
import { InformationType } from "../../Information";
import Info from "../Info.vue";
import InfoSharedPopup from "../InfoSharedPopup.vue";

const NUMBER_OF_TX_TO_DISPLAY = 20;
const BG_DEFAULT_COLOR = "#182028";
const BG_HOVER_COLOR = "#181c1f";

export default {
  name: "BlockViewPretty",
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
      highlighted: false,
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
        axios.get("https://blockexplorer.com/api/block/" + this.hash).then(response => {
            this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
            this.block = response.data;
            this.GetTxData();
        });
      }
      else {
        axios.get("https://blockexplorer.com/api/status?q=getBestBlockHash").then(response => {
          var hash = response.data.bestblockhash
          this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
          this.$router.push({ name: 'pretty', params: { hash } })
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

.block-header-info h2 {
  position: relative;
  padding-left: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.block-body-info h2 {
  position: relative;
  padding-left: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.block-body-info {
  height: 500px;
  color: #ffffff;
  text-align: left;
}

.block-body {
  height: 500px;
  overflow: auto;
  margin: 0 auto;
  display: inline-block;
  overflow-x: hidden;
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
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 auto;
}
</style>