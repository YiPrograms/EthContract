
$(document).ready(async function() {
    const txt = $("#txt");
    const desc = $("#desc");


    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        let acc;
        await window.ethereum.enable().then((accounts) => {
            acc = accounts[0];
        })
        console.log(web3)
        
        const netID = web3.eth.currentProvider.networkVersion
        if (netID != "4") {
            txt.text("Please connect to the Rinkeby Testnet!");
            desc.text("Choose Rinkeby Testnet in the MetaMask menu!");
        } else {
            txt.text("Welcome to Rinkeby Testnet!");
            web3.eth.getBalance(acc, web3.eth.defaultBlock, (e, bal) => {
                desc.text("Account:" + acc + " Balance: " + web3.utils.fromWei(bal, "ether") + " ETH");
            })
            $("<a href=\"events.html\">Continue to contract</a>").insertAfter(desc);
        }
    } else {
        txt.text("No web3 provider detected!");
        desc.text("Consider installing MetaMask!");
    }
})

