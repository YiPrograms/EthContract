
$(document).ready(async function() {
    const txt = $("#txt");

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable().then((accounts) => {
            acc = accounts[0];
        })
        console.log(web3)
        
        const netID = web3.eth.currentProvider.networkVersion;
        if (netID != "4") {
            console.log("Please connect to the Rinkeby Testnet!");
        } else {
            contract = new web3.eth.Contract(await $.get("events-abi.json"), "0x416cBE3b3E062267346eB7C7401A0EFb89BC103b");
            console.log(contract);
            let is_owner = await contract.methods.is_owner(acc).call();
            if (is_owner) {
                $("#owner_only").removeAttr("hidden");
            }
            web3.eth.getBalance(acc, web3.eth.defaultBlock, (e, bal) => {
                txt.text("Account: " + acc + ", Balance: " + web3.utils.fromWei(bal, "ether") + " ETH, Is Owner: " + is_owner);
            })

        }
    } else {
        console.log("No web3 provider detected!");
    }
})

$("#add_owner_btn").on("click", (e) => {
    const addr = $("#add_owner_addr").val()
    if (contract && addr.length > 0) {
        contract.methods.addOwner(addr).send({
            from: acc
        }).then((receipt) => {
            console.log(receipt)
            $("<span>Success!</span>").insertAfter("#add_owner_addr")
        })
    }
})

$("#del_owner_btn").on("click", (e) => {
    const addr = $("#del_owner_addr").val()
    if (contract && addr.length > 0) {
        contract.methods.removeOwner(addr).send({
            from: acc
        }).then((receipt) => {
            console.log(receipt)
            $("<span>Success!</span>").insertAfter("#del_owner_addr")
        })
    }
})

$("#add_event_btn").on("click", (e) => {
    const name = $("#add_event_name").val()
    const raters = $("#add_event_raters").val()
    if (contract && name.length > 0 && raters.length > 0) {
        contract.methods.createEvent(name, raters).send({
            from: acc
        }).then((receipt) => {
            console.log(receipt)
            $("<span>Success!</span>").insertAfter("#del_owner_addr")
        })
    }
})

$("#check_event_btn").on("click", (e) => {
    const id = $("#check_event_id").val()
    if (contract && id.length > 0) {
        contract.methods.events(id).call().then((event) => {
            console.log(event)
            $("<span>" + event.name + "</span>").insertAfter("#check_event_id")
        })
    }
})

$("#upload_work_btn").on("click", (e) => {
            $("<span>Implement later XD</span>").insertAfter("#upload_work_btn")

})