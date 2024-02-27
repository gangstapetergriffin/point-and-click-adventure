//game window reference
const gameWindow = document.getElementById("gameWindow");
const sec = 1000;

//gamestate
gameState = {
    "inventory": []
}

//inventory
inventoryList = document.getElementById("inventoryBox")

//main character
const mainCharacter = document.getElementById("Hero");
const offsetCharacter = 16;
//speech bubbles
const heroSpeech = document.getElementById("heroSpeech")
const counterSpeech = document.getElementById("counterSpeech")
const counterCharacter = document.getElementById("counterCharacter")
const heroAudio = document.getElementById("heroAudio")
const counterAudio = document.getElementById("counterAudio")

gameWindow.onclick = function (e) {
    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
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
                    showMessage(heroSpeech, "OH MEIN GOTT ZE DOOR IES OPEN", heroAudio)
                } else if (checkItem("coin")) {
                    showMessage(heroSpeech, "FUCKING HELL MY COIN IS GONE", heroAudio)
                    changeInventory("coin", "delete")
                } else {
                    showMessage(heroSpeech, "huh, the door seems to be locked", heroAudio)
                }
                break
            case "statue":
                showMessage(heroSpeech, "Hey statue, do you want to get some sloppy toppy?", heroAudio)
                setTimeout(counterCharacter.style.opacity = 1)
                setTimeout(showMessage, 4 * sec, counterSpeech, "HELL NO, anyway wanna hear something?", counterAudio)
                setTimeout(showMessage, 8 * sec, heroSpeech, "yeah sure, what is it?", heroAudio)
                setTimeout(showMessage, 12 * sec, counterSpeech, "there is a key behind one of the grave stones on the left", counterAudio)
                setTimeout(function () { counterCharacter.style.opacity = 0 }, 16 * sec)
                break
            default:
                break
        }
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

function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play(targetSound);
    targetBubble.innerText = message
    targetBubble.style.opacity = 1
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound)
}

function hideMessage(targetBubble, targetSound) {
    targetSound.pause(targetSound);
    targetBubble.innerText = "..."
    targetBubble.style.opacity = 0
}
