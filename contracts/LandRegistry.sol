//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LandRegistry is ERC721URIStorage {

    address payable owner;
     
    using Counters for Counters.Counter;
    //_landIds variable has the most recent uploaded landID
    Counters.Counter private _landIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _landsSold;
    uint256 listPrice = 0.01 ether;//fee demanded by the marketplace to list a land

    //The structure to store info about a listed land
    struct ListedLand {
        uint256 landId;
        address payable owner;
        address payable seller;
        // string landType;
        // string landAddress;
        // string landSize;
        uint256 price;
        bool currentlyListed;
    }
 
    constructor() ERC721("LandRegistry", "LR"){
        owner = payable(msg.sender);
    }

    mapping(uint256 => ListedLand)  private idToListedLand; //change landId into type ListedLand to display details of land

    function updateListPrice(uint256 _listPrice) public payable{
        require(owner == msg.sender, "Only owner can update the listing");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256){
        return listPrice;
    }

    function getLatestIdToListedLand() public view returns (ListedLand memory) {
        uint256 currentLandId = _landIds.current();
        return idToListedLand[currentLandId];
    }

    function getListedLandForId(uint256 landId) public view returns (ListedLand memory) {
        return idToListedLand[landId];
    }

    function getCurrentLand() public view returns (uint256) {
        return _landIds.current();
    }

     //The first time a land is created, it is listed here
    function createLandID(string memory landURI, uint256 price) public payable returns (uint) {
        
        require(msg.value == listPrice, "Send enough ether to list");
        require(price > 0, "Make sure the price isn't negative");
        
        _landIds.increment();  //Increment the landId counter, which is keeping track of the number of listed lands
        uint256 newLandId = _landIds.current();
        
        _safeMint(msg.sender, newLandId);   //Mint the NFT with landId newLandId to the address who called createToken???
    
        _setlandURI(newLandId, landURI);     //Map the landId to the landURI (which is an IPFS URL with the land metadata)
        createListedLand(newLandId, price);     //Helper function to update Global variables and emit an event

        return newLandId;
    }

     function createListedLand(uint256 landId, uint256 price) private {

        //Update the mapping of landId's to land details, useful for retrieval functions
        idToListedLand[landId] = ListedLand(
            landId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        //_transfer(msg.sender, address(this), landId); approval for creating NFT, not needed for land registry?

     }

     //This will return all the lands currently listed to be sold on the marketplace
    function getAllLands() public view returns (ListedLand[] memory) {
        uint landCount = _landIds.current();
        ListedLand[] memory lands = new ListedLand[](landCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<landCount;i++)
        {
            currentId = i + 1;
            ListedLand storage currentItem = idToListedLand[currentId];
            lands[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'lands' has the list of all lands in the marketplace
        return lands;
    }

    //Returns all the lands that the current user is owner or seller in
    function getMyLands() public view returns (ListedLand[] memory) {
        uint totalLandCount = _landIds.current();
        uint landCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the lands that belong to the user before we can make an array for them
        for(uint i=0; i < totalLandCount; i++)
        {
            if(idToListedLand[i+1].owner == msg.sender || idToListedLand[i+1].seller == msg.sender){
                landCount += 1;
            }
        }

        //Once you have the count of relevant lands, create an array then store all the lands in it
        ListedLand[] memory myLands = new ListedLand[](landCount);
        for(uint i=0; i < totalLandCount; i++) {
            if(idToListedLand[i+1].owner == msg.sender || idToListedLand[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedLand storage currentLand = idToListedLand[currentId];
                myLands[currentIndex] = currentLand;
                currentIndex += 1;
            }
        }
        return myLands;
    }

    function executeSale(uint256 landId) public payable {
        uint price = idToListedLand[landId].price;
        address seller = idToListedLand[landId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //update the details of the land
        idToListedLand[landId].currentlyListed = true;
        idToListedLand[landId].seller = payable(msg.sender);
        _landsSold.increment();

        
        _transfer(address(this), msg.sender, landId);       //Actually transfer the land to the new owner
        
        approve(address(this), landId);     //approve the marketplace to sell lands on your behalf

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the land
        payable(seller).transfer(msg.value);
    }

}
