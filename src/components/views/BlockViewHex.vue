<template>
    <div>
      <table class="block-header-table" ref="blockheadertable">
        <tr>
          <td>
            <p>
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
          <td>
            <p>
              <Info v-bind:infoType="InfoType.Version" v-bind:highlight="true">{{ blockBody }}</Info>
            </p>
          </td>
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
      InfoType: InformationType
    };
  },
  methods: {
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
        axios.get("https://blockexplorer.com/api/status?q=getBestBlockHash").then(response => {
          var hash = response.data.bestblockhash
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

table {
  background-color: #182028;
  font-family: "Courier New", Courier, monospace;
  /*box-shadow: 0px 0px 20px #000;*/
}

td {
  padding-left: 5px;
  color: #fff;
  overflow-wrap: break-word;
}

p {
  color: #ffffff;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 12px;
  width: 730px;
}
</style>
