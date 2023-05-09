const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const MTree = new MerkleTree(niceList);
  //console.log(MTree.getRoot()); //ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa added to server/index.js 

  const searchName = "Merle Fisher"//Add a name here to check if it is on the list, like Merle Fisher;

  const index = niceList.findIndex(n => n === searchName); // -1 if not on the list, else position on the list
  //console.log(index);

  const proof = MTree.getProof(index);

  //console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof, 
    searchName
  });

  console.log({ gift });
}

main();