const connectBtn = document.getElementById("connectBtn");
const setDataBtn = document.getElementById("setDataBtn");
const getDataBtn = document.getElementById("getDataBtn");
const dataDisplay = document.getElementById("dataDisplay");

let web3; // Declare a variable for the web3 instance
let contract; // Declare a variable for the contract instance

//contract url for reference
//https://github.com/kals-slak/Dapp-demo/blob/main/sample.sol

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) { // Check for Metamask
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      connectBtn.textContent = "Connected";
      connectBtn.disabled = true;
      setDataBtn.disabled = false;
      getDataBtn.disabled = false;

      // Create a contract instance using the ABI and contract address
      const contractAddress = "your contract address"; // Replace with the actual address
      const ABI = []; //add your contract abi
      contract = new web3.eth.Contract(ABI, contractAddress);

    } catch (error) {
      console.error(error);
      alert("Error connecting to Metamask!");
    }
  } else {
    alert("Please install Metamask!");
  }
});

setDataBtn.addEventListener("click", async () => {
  const dataToSet = document.getElementById("setDataInput").value;

  try {
    const transaction = await contract.methods.SetGreeting(dataToSet).send({
      from: window.ethereum.selectedAddress,
    });

    console.log("Transaction hash:", transaction.transactionHash);
    alert("Greeting successfully set!");
  } catch (error) {
    console.error(error);
    alert("Error setting greeting!");
  }
});

getDataBtn.addEventListener("click", async () => {

  try {
    const greeting = await contract.methods.greet().call();
    dataDisplay.textContent = greeting;
  } catch (error) {
    console.error(error);
    alert("Error retrieving greeting!");
  }
});
