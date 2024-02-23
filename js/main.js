//game window reference
const gameWindow = document.getElementById("gameWindow");

//gamestate
gameState = {
    "inventory": []
}

//inventory
inventoryList = document.getElementById("inventoryBox")

//main character
const mainCharacter = document.getElementById("Hero");
const offsetCharacter = 16;

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset base on character size
    if (e.target.id !== "heroImg") {
        mainCharacter.style.left = x - offsetCharacter + "px"
        mainCharacter.style.top = y - offsetCharacter + "px"
    }

    switch (e.target.id) {
        case "key":
            changeInventory("key", "add")
            document.getElementById("key").remove();
            break
        case "well":
            changeInventory("coin", "add")
            document.getElementById("well").remove();
            break
        case "doorWizardHut":
            if (checkItem("key")) {
                console.log("dor OPEN YESSS");
            } else if (checkItem("coin")) {
                console.log("my coin GON E WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH.")
                changeInventory("coin", "delete")
            } else {
                console.log(" I NED KEY FOR DOOR ")
            }
            break
        case "statue":
            console.log("THIS GAME IS SPONSORED BY RAID SHADOW LEGENDS")
            break
        default:
            break
    }
}

function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("big error 😭")
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName
            });
            break
    }
    updateInventory(gameState.inventory, inventoryList)
}

function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerText = "";
    gameState.inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}