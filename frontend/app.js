let web3;
let account;
const contractAddress = '0x7371019836Dc5240c0D9E027fcAA585D776D5B2F';
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ArtBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAuction",
				"type": "bool"
			}
		],
		"name": "ArtListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "ArtMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "NewBid",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyArt",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "finalizeAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAuction",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "listArt",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listingFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAuction",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "auctionEnd",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mintArt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "updateListingFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
let contract;

// Initialize Web3
window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Please install MetaMask!");
  }
});

// Connect Wallet Button Handler
document.getElementById('connectWallet').addEventListener('click', async () => {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    alert(`Wallet connected: ${account}`);
  } catch (error) {
    console.error(error);
  }
});

// Mint NFT Function
async function mintNFT() {
  const uri = document.getElementById('tokenURI').value;
  if (!uri) {
    alert('Please enter a Token URI');
    return;
  }

  try {
    await contract.methods.mintArt(uri).send({ from: account });
    alert('NFT Minted Successfully!');
  } catch (err) {
    console.error(err);
    alert('Minting failed.');
  }
}

// List NFT Function
async function listNFT() {
  const tokenId = document.getElementById('listTokenId').value;
  const price = web3.utils.toWei(document.getElementById('price').value, 'ether');
  const isAuction = document.getElementById('isAuction').checked;
  const duration = document.getElementById('duration').value;
  const listingFee = web3.utils.toWei('0.01', 'ether');

  try {
    await contract.methods.listArt(tokenId, price, isAuction, duration)
      .send({ from: account, value: listingFee });
    alert('NFT Listed Successfully!');
  } catch (err) {
    console.error(err);
    alert('Listing failed.');
  }
}

// Load Marketplace Listings
async function loadMarketplace() {
  const listingsDiv = document.getElementById('listings');
  listingsDiv.innerHTML = 'Loading...';

  try {
    const nextId = await contract.methods.nextTokenId().call();
    listingsDiv.innerHTML = '';

    for (let tokenId = 0; tokenId < nextId; tokenId++) {
      const listing = await contract.methods.listings(tokenId).call();

      if (listing.seller !== '0x0000000000000000000000000000000000000000') {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'listing-item';

        itemDiv.innerHTML = `
          <p><strong>Token ID:</strong> ${listing.tokenId}</p>
          <p><strong>Price:</strong> ${web3.utils.fromWei(listing.price, 'ether')} ETH</p>
          <p><strong>Seller:</strong> ${listing.seller}</p>
          <button onclick="buyNFT(${listing.tokenId}, '${listing.price}', ${listing.isAuction})">
            ${listing.isAuction ? 'Place Bid' : 'Buy Now'}
          </button>
        `;

        listingsDiv.appendChild(itemDiv);
      }
    }

    if (listingsDiv.innerHTML === '') {
      listingsDiv.innerHTML = 'No listings found.';
    }
  } catch (err) {
    console.error(err);
    listingsDiv.innerHTML = 'Failed to load listings.';
  }
}

// Buy or Place Bid
async function buyNFT(tokenId, price, isAuction) {
  if (isAuction) {
    const bidAmount = prompt('Enter your bid amount in ETH:');
    if (!bidAmount) return;

    try {
      await contract.methods.placeBid(tokenId).send({
        from: account,
        value: web3.utils.toWei(bidAmount, 'ether')
      });
      alert('Bid placed successfully!');
    } catch (err) {
      console.error(err);
      alert('Bid failed.');
    }

  } else {
    try {
      await contract.methods.buyArt(tokenId).send({
        from: account,
        value: price
      });
      alert('NFT Purchased!');
    } catch (err) {
      console.error(err);
      alert('Purchase failed.');
    }
  }
}


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update the CSS variables to move the glow
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });

  card.addEventListener('mouseenter', () => {
    card.classList.add('glow-active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('glow-active');
    // Reset glow position if you want it to fade out nicely
    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
  });
});
