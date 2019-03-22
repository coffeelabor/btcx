<template>
  <div class="block-container">
    <div>
      <h1>Block #{{ block.height }}</h1>
      <h3>
        Proof-of-Work:
        <br>
        <Info v-bind:infoType="InfoType.MerkleField">{{ block.hash }}</Info>
      </h3>
    </div>
    <PrettyBlock v-if="activeView == viewType.Pretty"/>
    <JSONBlock v-if="activeView == viewType.JSON"/>
    <InfoSharedPopup/>
  </div>
</template>

<script>
const axios = require("axios");
import PrettyBlock from "./PrettyBlock.vue";
import JSONBlock from "./JSONBlock.vue";
import Info from "./Info.vue";
import InfoSharedPopup from "./InfoSharedPopup.vue";
import { InformationType } from "../Information";

export default {
  name: "Block",
  props: {
    viewType: Object,
    activeView: Number
  },
  components: {
    PrettyBlock,
    JSONBlock,
    Info,
    InfoSharedPopup
  },
  data: function() {
    return {
      block: {},
      tx: [],
      Info: {
        Title: "",
        Content: ""
      },
      InfoType: InformationType
    };
  },
  methods: {
    GetTxData: function() {
      for (var i = 0; i < 20; i++) {
        /*console.log(this.block.tx[i]);*/
        axios
          .get("https://blockexplorer.com/api/tx/" + this.block.tx[i]) // response.data.hash)
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
    axios.get("https://api.blockcypher.com/v1/btc/main").then(response => {
      axios
        .get(
          "https://blockexplorer.com/api/block/" +
            "0000000000000000000abeacccd9086605de0c7df750be6959dcfd6f3ee24c7d"
        ) // Hard coded for now
        .then(response => {
          this.block = response.data;
          this.GetTxData();
        });
    });
  }
};
</script>

<style scoped>
.block-container {
  width: 100%;
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
</style>
