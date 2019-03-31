export var InformationType = Object.freeze({
  "Underlined": 0,
  "HeaderProofOfWork": 1,
  "HeaderFieldVersion": 2,
  "HeaderFieldPrevHash": 3,
  "HeaderFieldMerkle": 4,
  "HeaderFieldTime": 5,
  "HeaderFieldTarget": 6,
  "HeaderFieldNonce": 7,
  "HeaderValueVersion": 8,
  "HeaderValuePrevHash": 9,
  "HeaderValueMerkle": 10,
  "HeaderValueTime": 11,
  "HeaderValueTarget": 12,
  "HeaderValueNonce": 13,
  "BlockHeader": 14,
  "BlockBody": 15,
  "PrettyViewTxId": 16,
  "PrettyViewFrom": 17,
  "PrettyViewTo": 18,
  "PrettyViewAmount": 19,
  "PrettyViewFee": 20,
  "PrettyViewSize": 21,
  "JsonViewTx": 22,
  "JsonViewTxVersion": 23,
  "JsonViewTxIn": 24,
  "JsonViewTxInArr": 25,
  "JsonViewTxInPrevOut": 26,
  "JsonViewTxInPrevOutHash": 27,
  "JsonViewTxInPrevOutIndex": 28,
  "JsonViewTxInScriptBytes": 29,
  "JsonViewTxInSigScript": 30,
  "JsonViewTxInCoinbase": 31,
  "JsonViewTxInSequence": 32,
  "JsonViewTxOut": 33,
  "JsonViewTxOutArr": 34,
  "JsonViewTxOutValue": 35,
  "JsonViewTxOutScriptLen": 36,
  "JsonViewTxOutScript": 37,
  "JsonViewTxLockTime": 38,
  "HexViewVersion": 39,
  "HexViewPrevHash": 40,
  "HexViewMerkle": 41,
  "HexViewTime": 42,
  "HexViewTarget": 43,
  "HexViewNonce": 44,
  "HexViewTx": 45,
})

var Information = [];
Information.push(
  {
    id: InformationType.Underlined,
    title: "You catch on fast...",
    content: "Now try clicking on one of the other popups!"
  },
  {
    id: InformationType.HeaderProofOfWork,
    title: "What is a Block Hash?",
    content: "A Block Hash, also known as a Block ID or Proof-of-Work, is the the infomation used to uniquely identify and block on the Bitcoin blockchain."
  },
  {
    id: InformationType.HeaderFieldVersion,
    title: "What is the Version field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderFieldPrevHash,
    title: "What is the Previous Block Hash field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderFieldMerkle,
    title: "What is the Merkel Root Field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderFieldTime,
    title: "What is the Time field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderFieldTarget,
    title: "What is the Block Target field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderFieldNonce,
    title: "What is the Nonce field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValueVersion,
    title: "What is the Version value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValuePrevHash,
    title: "What is the Previous Block Hash value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValueMerkle,
    title: "What is the Merkel Root value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValueTime,
    title: "What is the Time value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValueTarget,
    title: "What is the Block Target value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HeaderValueNonce,
    title: "What is the Nonce value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.BlockHeader,
    title: "What is the Block Header?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.BlockBody,
    title: "What is the Block Body?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewTxId,
    title: "What is the TX ID?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewFrom,
    title: "What is a From address?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewTo,
    title: "What is a To address?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewAmount,
    title: "What is the Amount?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewFee,
    title: "What is the Fee?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.PrettyViewSize,
    title: "What is the TX Size?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTx,
    title: "What is the TX array?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxVersion,
    title: "What is the TX Version field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxIn,
    title: "What is TX In field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInArr,
    title: "What is TX In array?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInPrevOut,
    title: "What is the Previous Ouput?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInPrevOutHash,
    title: "What is the Previous Output Hash?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxPrevOutIndex,
    title: "What is the Previous Output Index?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInScriptBytes,
    title: "What is the Script Bytes field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInSigScript,
    title: "What is the Signature Script?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInCoinbase,
    title: "What is the Coinbase field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxInSequence,
    title: "What is the Sequence field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxOut,
    title: "What is the TX Out field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxOutArr,
    title: "What is the TX Out array?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxOutValue,
    title: "What is the TX Out Value field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxOutScriptLen,
    title: "What is the TX Out Script Length?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxOutScript,
    title: "What is the Out Script?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.JsonViewTxLockTime,
    title: "What is the TX Lock Time?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewVersion,
    title: "What is the Version value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewPrevHash,
    title: "What is the Previous Block Hash value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewMerkle,
    title: "What is the Merkel Root value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewTime,
    title: "What is the Time value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewTarget,
    title: "What is the Block Target value?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewNonce,
    title: "What is the Nonce field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.HexViewTx,
    title: "What is the Block Body?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
);

export function GetInformation(id) {
  return Information.find(obj => { 
    return obj.id == id 
  });
}