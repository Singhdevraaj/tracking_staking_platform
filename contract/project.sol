
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTArtMarketplace {
    string public name = "NFTArtMarketplace";
    string public symbol = "NFTAM";
    uint256 public nextTokenId;
    uint256 public listingFee = 0.01 ether;

    struct NFT {
        uint256 tokenId;
        address owner;
        string tokenURI;
    }

    struct ArtListing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isAuction;
        uint256 auctionEnd;
        address highestBidder;
        uint256 highestBid;
    }

    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => ArtListing) public listings;

    event ArtMinted(uint256 tokenId, address owner, string tokenURI);
    event ArtListed(uint256 tokenId, address seller, uint256 price, bool isAuction);
    event ArtBought(uint256 tokenId, address buyer, uint256 price);
    event NewBid(uint256 tokenId, address bidder, uint256 amount);
    event AuctionEnded(uint256 tokenId, address winner, uint256 amount);

    function mintArt(string memory tokenURI) public {
        uint256 tokenId = nextTokenId++;
        nfts[tokenId] = NFT(tokenId, msg.sender, tokenURI);
        emit ArtMinted(tokenId, msg.sender, tokenURI);
    }

    function listArt(uint256 tokenId, uint256 price, bool isAuction, uint256 duration) public payable {
        require(nfts[tokenId].owner == msg.sender, "Not the owner");
        require(msg.value == listingFee, "Listing fee required");

        listings[tokenId] = ArtListing(
            tokenId,
            payable(msg.sender),
            price,
            isAuction,
            isAuction ? block.timestamp + duration : 0,
            address(0),
            0
        );

        emit ArtListed(tokenId, msg.sender, price, isAuction);
    }

    function buyArt(uint256 tokenId) public payable {
        ArtListing memory listing = listings[tokenId];
        require(!listing.isAuction, "This is an auction item");
        require(msg.value == listing.price, "Incorrect price");

        listing.seller.transfer(msg.value);
        nfts[tokenId].owner = msg.sender;
        delete listings[tokenId];

        emit ArtBought(tokenId, msg.sender, msg.value);
    }

    function placeBid(uint256 tokenId) public payable {
        ArtListing storage listing = listings[tokenId];
        require(listing.isAuction, "Not an auction item");
        require(block.timestamp < listing.auctionEnd, "Auction ended");
        require(msg.value > listing.highestBid, "Bid too low");

        if (listing.highestBidder != address(0)) {
            payable(listing.highestBidder).transfer(listing.highestBid);
        }

        listing.highestBidder = msg.sender;
        listing.highestBid = msg.value;
        emit NewBid(tokenId, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 tokenId) public {
        ArtListing storage listing = listings[tokenId];
        require(listing.isAuction, "Not an auction");
        require(block.timestamp >= listing.auctionEnd, "Auction ongoing");
        require(listing.highestBidder != address(0), "No bids placed");

        listing.seller.transfer(listing.highestBid);
        nfts[tokenId].owner = listing.highestBidder;
        delete listings[tokenId];

        emit AuctionEnded(tokenId, listing.highestBidder, listing.highestBid);
    }

    function updateListingFee(uint256 _fee) external {
        require(msg.sender == nfts[0].owner, "Only owner can update fee");
        listingFee = _fee;
    }

    function withdraw() external {
        require(msg.sender == nfts[0].owner, "Only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
}
