<template>
  <div>
    <table class="block-header-table" ref="blockheadertable">
      <tr>
        <p>{ <br />
        <span class="padding-twenty">
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
        <p>
          <span class="padding-twenty">
            "<Info v-bind:infoType="InfoType.Underlined">tansactions</Info>": [
            <span class="padding-ten" v-for="value in tx" :key="value.txid">
              {
              <span class="padding-ten">
                "<Info v-bind:infoType="InfoType.ProofOfWork">version</Info>": "{{ value.version }}",
                <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_in</Info>": "{{ value.vin.length }}",
                <br />"<Info v-bind:infoType="InfoType.ProofOfWork">tx_in</Info>": [
                <span class="padding-ten" v-for="(vin, index) in value.vin" :key="index + vin.txid">
                  {
                  <br />
                  <span class="padding-twenty">
                    "<Info v-bind:infoType="InfoType.ProofOfWork">previous_output</Info>": {
                    <br />
                    <span class="padding-twenty">
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
                <br /><span class="padding-ten" v-for="(vout, index) in value.vout" v-bind:key="index">
                  {
                  <br />
                  <span class="padding-twenty">
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
        //TODO: Add error checking
        response.forEach(element => {
          this.tx.push(element.data)
        });
        this.$emit('hideLoader');
      })
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
