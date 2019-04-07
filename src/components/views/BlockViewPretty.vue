<template>
  <div>
    <table class="block-header-table" ref="blockheadertable">
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldVersion">Version</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValueVersion">{{ block.version }}</Info></td>
      </tr>
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldPrevHash">Previous Block Hash</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValuePrevHash">{{ block.previousblockhash }}</Info></td>
      </tr>
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldMerkle">Merkel Root Hash</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValueMerkle">{{ block.merkleroot }}</Info></td>
      </tr>
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldTime">Time</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValueTime">{{ block.time }}</Info></td>
      </tr>
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldTarget">Block Target</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValueTarget">{{ block.bits }}</Info></td>
      </tr>
      <tr>
        <td><Info v-bind:infoType="InfoType.HeaderFieldNonce">Nonce</Info></td>
        <td><Info v-bind:infoType="InfoType.HeaderValueNonce">{{ block.nonce }}</Info></td>
      </tr>
    </table>
    <div class="block-body-container">
      <table class="block-body-table" ref="blockbodytable">
        <tr v-for="value in tx" :key="value.txid">
          <td>
            <dl>
              <dt>
                <Info v-bind:infoType="InfoType.PrettyViewTxId">TX ID</Info>
              </dt>
              <dd>{{ value.txid }}</dd>
              <div v-for="(vin, index) in value.vin" :key="index + vin.txid">
                <dt class="tx-info">
                  <Info v-bind:infoType="InfoType.PrettyViewFrom">From</Info>
                </dt>
                <dd>{{ formatInputAddr(vin.addr) }} -
                  <Info v-bind:infoType="InfoType.PrettyViewAmount">Amount</Info>
                  : {{ formatValue(vin.value) }} BTC
                </dd>
              </div>
              <div v-for="(vout, index) in value.vout" :key="index">
                <dt class="tx-info">
                  <Info v-bind:infoType="InfoType.PrettyViewTo">To</Info>
                </dt>
                <dd>{{ formatOutputAddr(vout.scriptPubKey.addresses) }} -
                  <Info v-bind:infoType="InfoType.PrettyViewAmount">Amount</Info>
                  : {{ vout.value }} BTC
                </dd>
              </div>
              <dt class="tx-info">
                <Info v-bind:infoType="InfoType.PrettyViewFee">Fee</Info>
              </dt>
              <dd>{{ formatValue(value.fees) }} BTC</dd>
              <dt class="tx-info">
                <Info v-bind:infoType="InfoType.PrettyViewSize">Size</Info>
              </dt>
              <dd>{{ value.size }} bytes</dd>
            </dl>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { InformationType } from "../../Information";
import Info from "../Info.vue";
import InfoSharedPopup from "../InfoSharedPopup.vue";

const NUMBER_OF_TX_TO_DISPLAY = 20;

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
      InfoType: InformationType
    };
  },
  methods: {
    GetBlockData() {
      if(this.hash != undefined) {
        this.block = {};
        this.tx = [];
        axios.get("https://blockexplorer.com/api/block/" + this.hash).then(response => {
            this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
            this.block = response.data;
            this.GetTxData();
        })
        .catch(error => {
          if(error.response) {
            console.log(error.response.data);
          } else if(error.request) {
            console.log(error.request);
          } else  {
            console.log(error.message);
          }
          alert('Error loading data! Please refresh page, or try again later.')
        });
      }
      else {
        axios.get("https://blockexplorer.com/api/status?q=getBestBlockHash").then(response => {
          var hash = response.data.bestblockhash
          this.$emit('UpdateBlockDisplay', response.data.hash, response.data.height);
          this.$router.push({ name: 'pretty', params: { hash } })
        })
        .catch(error => {
          if(error.response) {
            console.log(error.response.data);
          } else if(error.request) {
            console.log(error.request);
          } else  {
            console.log(error.message);
          }
          alert('Error loading data! Please refresh page, or try again later.')
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
      .catch(error => {
        if(error.response) {
          console.log(error.response.data);
        } else if(error.request) {
          console.log(error.request);
        } else  {
          console.log(error.message);
        }
        alert('Error loading data! Please refresh page, or try again later.')
      });
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
}
</script>

<style scoped>
.block-header-table {
  height: 135px;
  width: 750px;
  text-align: left;
  margin: 0 auto;
}

.block-body-container {
  height: 500px;
  width: 750px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.block-body-table {
  width: 750px;
  text-align: left;
  margin-top: -1px;
}

.tx-info {
  width: 105px;
  text-align: right;
}

td {
  font-size: 14px;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
  padding-left: 5px;
  color: #fff;
}

table {
  background-color: #182028;
  font-family: "Courier New", Courier, monospace;
}

dl {
  margin-top: 5px;
  margin-bottom: 5px;
}

dt {
  float: left;
  font-weight: normal;
}

dt:after {
  content: ": ";
  white-space: pre;
}

dd {
  margin-bottom: 0px;
}
</style>