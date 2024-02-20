//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory
let inventory = [];
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
            getItem("Rusty Key", "rustykey")
            break
        case "well":
            getItem("coin", "coin")
            break
        case "doorWizardHut":
            if (checkItem("Rusty Key")) {
                console.log("dor OPEN YESSS");
            } else if (checkItem("coin")) {
                console.log("my coin GONE WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH.")
                removeItem("coin", "coin");
            } else {
                console.log(" I NED KEY FOR DOOR ")
            }
            break
    }
}

function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }
}

function checkItem(itemName) {
    return inventory.includes(itemName);
}

function showItem(itemName, itemId) {
    console.log("YOU HAVE FOUND " + itemName + "!");
    const keyElement = document.createElement("li");
    keyElement.id = itemId;
    keyElement.innerText = itemName
    inventoryList.appendChild(keyElement);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName
    });
    document.getElementById(itemId).remove();
}