<template>
  <div>
    <table class="block-header-table" ref="blockheadertable">
      <tr>
        <p>{ <br />
        <span class="padding-twenty">
          "<Info v-bind:infoType="InfoType.HeaderFieldVersion">version</Info>": "<Info v-bind:infoType="InfoType.HeaderValueVersion">{{ block.version }}</Info>", <br />
          "<Info v-bind:infoType="InfoType.HeaderFieldPrevHash">previousblockhash</Info>": "<Info v-bind:infoType="InfoType.HeaderValuePrevHash">{{ block.previousblockhash }}</Info>", <br />
          "<Info v-bind:infoType="InfoType.HeaderFieldMerkle">merkleroot</Info>": "<Info v-bind:infoType="InfoType.HeaderValueMerkle">{{ block.merkleroot }}</Info>", <br />
          "<Info v-bind:infoType="InfoType.HeaderFieldTime">time</Info>": "<Info v-bind:infoType="InfoType.HeaderValueTime">{{ block.time }}</Info>", <br />
          "<Info v-bind:infoType="InfoType.HeaderFieldTarget">bits</Info>": "<Info v-bind:infoType="InfoType.HeaderValueTarget">{{ block.bits }}</Info>", <br />
          "<Info v-bind:infoType="InfoType.HeaderFieldNonce">nonce</Info>": "<Info v-bind:infoType="InfoType.HeaderValueNonce">{{ block.nonce }}</Info>", <br />
        </span>
        </p>
      </tr>
    </table>
    <table class="block-body-table" ref="blockbodytable">
      <tr>
        <p>
          <span class="padding-twenty">
            "<Info v-bind:infoType="InfoType.JsonViewTx">tansactions</Info>": [
            <span class="padding-ten" v-for="value in tx" :key="value.txid">
              {
              <span class="padding-ten">
                "<Info v-bind:infoType="InfoType.JsonViewTxVersion">version</Info>": "{{ value.version }}",
                <br />"<Info v-bind:infoType="InfoType.JsonViewTxIn">tx_in</Info>": "{{ value.vin.length }}",
                <br />"<Info v-bind:infoType="InfoType.JsonViewTxInArr">tx_in</Info>": [
                <span class="padding-ten" v-for="(vin, index) in value.vin" :key="index + vin.txid">
                  {
                  <br />
                  <span class="padding-twenty">
                    "<Info v-bind:infoType="InfoType.JsonViewTxInPrevOut">previous_output</Info>": {
                    <br />
                    <span class="padding-twenty">
                      "<Info v-bind:infoType="InfoType.JsonViewTxInPrevOutHash">hash</Info>": "{{ vin.txid }}",
                      <br />"<Info v-bind:infoType="InfoType.JsonViewPrevOutIndex">index</Info>": "{{ vin.n }}",
                    </span>
                    <br />}
                    <br />
                    <span v-if="value.isCoinBase != true">
                      "<Info v-bind:infoType="InfoType.JsonViewTxInScriptBytes">script_bytes</Info>": "{{ vin.scriptSig.hex.length }}",
                      <br />"<Info v-bind:infoType="InfoType.JsonViewTxInSigScript">signature_script</Info>": "{{ vin.scriptSig.asm }}",
                    </span>
                    <span v-else>
                      "<Info v-bind:infoType="InfoType.JsonViewTxInCoinbase">coinbase</Info>": "{{ vin.coinbase }}",
                    </span>
                    <br />"<Info v-bind:infoType="InfoType.JsonViewTxInSequence">sequence</Info>": "{{ vin.sequence }}"
                  </span>
                  <br />},
                </span>
                <br />],
                <br />"<Info v-bind:infoType="InfoType.JsonViewTxOut">tx_out</Info>": "{{ value.vout.length }}",
                <br />"<Info v-bind:infoType="InfoType.JsonViewTxOutArr">tx_out</Info>": [
                <br /><span class="padding-ten" v-for="(vout, index) in value.vout" v-bind:key="index">
                  {
                  <br />
                  <span class="padding-twenty">
                    "<Info v-bind:infoType="InfoType.JsonViewTxOutValue">value</Info>": "{{ vout.value }}",
                    <br />"<Info v-bind:infoType="InfoType.JsonViewTxOutScriptLen">pk_script_length</Info>": "{{ vout.scriptPubKey.hex.length }}",
                    <br />"<Info v-bind:infoType="InfoType.JsonViewTxOutScript">pk_script</Info>": "{{ vout.scriptPubKey.asm }}",
                  </span>
                  <br />},
                </span>
                <br />]
                <br />"<Info v-bind:infoType="InfoType.JsonViewTxLockTime">lock_time</Info>": "{{ value.locktime }}"
              </span>
            <br />},
            </span>
            <br />]
          </span>
        }
        </p>
      </tr>
    </table>
    <InfoSharedPopup/>
  </div>
</template>

<script>
const axios = require("axios");
import Info from "../Info.vue";
import { InformationType } from "../../Information";
import InfoSharedPopup from "../InfoSharedPopup.vue"

const NUMBER_OF_TX_TO_DISPLAY = 20;

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
      InfoType: InformationType
    };
  },
  methods: {
    GetBlockData() {
      if(this.hash != undefined) {
        this.block = {};
        this.tx = [];
        axios.get("https://blockexplorer.com/api/block/" + this.hash)
          .then(response => {
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
          this.$router.push({ name: 'json', params: { hash } })
        });
      }
    },
    GetTxData: function() {
      var txIds = this.block.tx.slice(0, NUMBER_OF_TX_TO_DISPLAY).map(txId => axios.get("https://blockexplorer.com/api/tx/" + txId))
      axios.all(txIds).then(response => {
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
    }
  },
  mounted() {
    this.GetBlockData();
  }
};
</script>

<style scoped>
.block-header-table {
  height: 135px;
  width: 750px;
  margin: 0 auto;
  text-align: left;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
}

.block-body-table {
  text-align: left;
  display: block;
  height: 500px;
  width: 750px;
  margin: auto;
  margin-top: -1px;
  overflow: auto;
  border-style: solid;
  border-width: 1px;
  border-color: #0a1014;
}

.padding-twenty {
  display: inline-block;
  padding-left: 20px;
  font-size: 12px;
}

.padding-ten {
  display:inline-block;
  padding-left: 10px;
  width: 100%;
  font-size: 12px;
}

table {
  background-color: #182028;
  font-family: "Courier New", Courier, monospace;
  /*box-shadow: 0px 0px 20px #000;*/
}

p {
  color: #ffffff;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 12px;
}
</style>
