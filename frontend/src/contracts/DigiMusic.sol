// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.10;
// import './Token.sol';

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
// changed import
// musics smart contract inherits ERC721 interface 
contract DigiMusic is ERC721 {
  // this contract's token collection name
  string public collectionName;
  // this contract's token symbol
  string public collectionNameSymbol;
  // total number of crypto boys minted
  uint256 public musicCounter;

  address public deployer;
  // define crypto boy struct
   struct Music {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    uint256 price;
    string imageHash;
    string audioHash;
    uint256 numberOfTransfers;
    bool forSale;
    bool is3d;
  }

  // map music's token id to crypto boy
  mapping(uint256 => Music) public allMusic;
  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public tokenAudioExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;
  //check if tokenId exists
  mapping(uint256=>bool)public tokenIdExists;
  //map tokenName to token
  mapping(string=>Music)public nameToMusic;
  //map name to Id
   mapping(string=>uint256)public nameToId;

  // initialize contract while deployment with contract's collection name and token
  constructor() ERC721("Music Collection", "MC") {
    deployer = msg.sender;
    collectionName = name();
    collectionNameSymbol = symbol();
   
  }
  
  // mint a new crypto boy
  function mintMusic(string memory _name, string memory _tokenURI, uint256 _price,string memory _imageHash,string memory _audioHash, bool _is3d) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // increment counter
    musicCounter ++;
    // check if a token exists with the above token id => incremented counter
    require(!_exists(musicCounter));
    // check if the token name already exists or not
    require(!tokenNameExists[_name]);
    // check if the image already exists or not
    require(!tokenAudioExists[_imageHash]);
    // check if the token URI already exists or not
    require(!tokenURIExists[_tokenURI]);
    
    // mint the token
    _mint(msg.sender, musicCounter);
    // set token URI (bind token id with the passed in token URI)
    // _setTokenURI(musicCounter, _tokenURI); 
    // make passed token URI as exists
    tokenURIExists[_tokenURI] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    tokenAudioExists[_imageHash]=true;
    //make tokenId passed as exists
    tokenIdExists[musicCounter]=true;
    // creat a new crypto boy (struct) and pass in new values
    Music memory newMusic = Music(
    musicCounter,
    _name,
    _tokenURI,
    payable(msg.sender),
    payable(msg.sender),
    _price,
    _imageHash,
    _audioHash,
    0,
    true,
    _is3d);
    // add the token id and it's crypto boy to all crypto boys mapping
    allMusic[musicCounter] = newMusic;
    nameToMusic[_name]=newMusic;
    nameToId[_name]=musicCounter;
  }

  // get owner of the token
  function getTokenOwner(uint256 _tokenId) public view returns(address) {
    address _tokenOwner = ownerOf(_tokenId);
    return _tokenOwner;
  }

  // get metadata of the token
  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = tokenURI(_tokenId);
    return tokenMetaData;
  }
  
  
  // get total number of tokens owned by an address
  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    return totalNumberOfTokensOwned;
  }
  // check if the token already exists
  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    bool tokenExists = _exists(_tokenId);
    return tokenExists;
  }
  // by a token by passing in the token's id
  function buyToken(uint256 _tokenId) public payable {
    
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => music)
    Music memory music = allMusic[_tokenId];
    // price sent in to buy should be equal to or more than the token's price
   require(msg.value == music.price);
    // token should be for sale
    require(music.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = music.currentOwner;
    // send token's worth of ethers to the owner from smart contract
    sendTo.transfer(msg.value);
    //transferTokensToContract(_price,msg.sender, _tokenadd);
    //transferTokensToAccount(_price,sendTo,_tokenadd);
    // update the token's previous owner
    // music.previousOwner = music.currentOwner;
    // update the token's current owner
    music.currentOwner = payable(msg.sender);
    // update the how many times this token was transfered
    music.numberOfTransfers += 1;
    // set and update that token in the mapping
    allMusic[_tokenId] = music;
  }

  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => music)

    Music memory music = allMusic[_tokenId];
    // update token's price with new price
    
       music.price = _newPrice;
    
  
    // set and update that token in the mapping
    allMusic[_tokenId] = music;
  }



  // switch between set for sale and set not for sale
  function toggleForSale(uint256 _tokenId) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => music)
    Music memory music = allMusic[_tokenId];
    // if token's forSale is false make it true and vice versa
    if(music.forSale) {
      music.forSale = false;
    } else {
      music.forSale = true;
    }
    // set and update that token in the mapping
    allMusic[_tokenId] = music;
  }

  
}

