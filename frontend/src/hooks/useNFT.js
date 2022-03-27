import ipfs from "./ipfs";


function useNFT() {

  const getAllNFTs = async (musicNFT) => {
    console.log(musicNFT)
    try {

    console.log("here",musicNFT);
    let nftCount = await musicNFT.methods
    .musicCounter()
    .call();
    // setNftCount(nftCount)
    console.log(nftCount)
    let tempDes = [];
  
          for (var i = 1; i <= nftCount; i++) {


              let nftMus = await musicNFT.methods
                  .allMusic(i)
                  .call();
              const metaDataURI = nftMus.tokenURI
              let result = await fetch(metaDataURI);
              const metaData = await result.json();

              // console.log(metaDataERC1155)
              nftMus = [{
                  ...nftMus,
                  "metadata": metaData
              }];
              tempDes.push(nftMus);
            }
              

            console.log(tempDes);
      return {tempDes,nftCount};
    
  }
    catch(err) {
      console.log(err);
    }
  
  }

  const createNFT = async (musicNFT,name, description, bufferImage,bufferMusic, tokenPrice,categories,is3d,account) => {
    // const nameIsUsed = await musicNFT.methods
    // .tokenNameExists(name)
    // .call();
    // if (!nameIsUsed) {
      const file = await ipfs.add(bufferImage)
      const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      //const imageIsUsed = await musicNFT.methods.imageExists(imageHash).call();
      console.log("img",imageHash);
      // if(!imageIsUsed){
        const file2 = await ipfs.add(bufferMusic)
        
        const audioHash = `https://ipfs.infura.io/ipfs/${file2.path}`;
        console.log("aud",audioHash);
        // if(!audioHash){
          let price = tokenPrice;
          price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
          const tokenObject = {
            image: imageHash,
            audioHash:audioHash,
            name: name,
            description: description,
            mintedBy: account,
            price: price,    
        // }
          }
          console.log(account)
        const cid = await ipfs.add(JSON.stringify(tokenObject))
        let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
        musicNFT.methods
                      .mintMusic(name,tokenURI, price,imageHash,audioHash ,is3d)
                      .send({
                          from: account
                      })
                      .on("confirmation", () => {console.log("confirmed")
                      return "confirmed"})
        }
    //     else{
    //         return "audioUsed"
    //     }
    //   }
    //   else{
    //       return "imageUsed"
    //   }
    // }else{
    //     return "nameUsed"
    // }
  

  const buyNFT = async (musicNFT,tokenId,price,account) => {
    musicNFT.methods
            .buyToken(tokenId)
            .send({
              from:account,value:price

          })
          .on("confirmation", () => {console.log("confirmed")
          return "confirmed"})
  }

  const toggleForSale = async (musicNFT,tokenId,account) => {
    musicNFT.methods
              .toggleForSale(tokenId)
              .send({
                  from:account
              })
              .on("confirmation", () => {console.log("confirmed")
              return "confirmed"})
  }

  const changeTokenPrice = async (musicNFT,tokenId,newPrice,account) => {
    musicNFT.methods
        .changeTokenPrice(tokenId,newPrice)
        .send({
            from: account
        })
        .on("confirmation", () => {console.log("confirmed")
        return "confirmed"})
  }

  const getTokenMetaData = async () => {

  }

  return {
    getAllNFTs,
    createNFT,
    buyNFT,
    toggleForSale,
    changeTokenPrice,
    getTokenMetaData
  }
}

export default useNFT;