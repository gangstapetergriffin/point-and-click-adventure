//game window reference
const gameWindow = document.getElementById("gameWindow");
const sec = 1000;

//gamestate
gameState = {
    "inventory": []
}

localStorage.removeItem("gameState")

if (Storage) {
    if (localStorage.gameState) {
        gameState = JSON.parse(localStorage.gameState)
    } else {
        // convert object into string and store in localStorage
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }
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

updateInventory(gameState.inventory, inventoryList)


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
                saveGamestate(gameState);
                break
            case "doorWizardHut":
                if (checkItem("key")) {
                    showMessage(heroSpeech, "YESS, its open", heroAudio, 2)
                    setTimeout(function () { changeInventory("coin", "add") }, 4 * sec)
                    document.getElementById("doorWizardHut").remove();
                } else {
                    showMessage(heroSpeech, "huh, it seems like the chest is locked", heroAudio, 3)
                }
                break
            case "statue":
                if (checkItem("coin")) {
                    showMessage(heroSpeech, "Here is your coin.", heroAudio, 4)
                    setTimeout(counterCharacter.style.opacity = 1)
                    setTimeout(showMessage, 4 * sec, counterSpeech, "OMG😭,  thank you so much. Here is your sword.", counterAudio, 4)
                    setTimeout(function () { counterCharacter.style.opacity = 0 }, 8 * sec)
                    setTimeout(function () { changeInventory("sword", "add") }, 8 * sec)
                    setTimeout(showMessage, 8 * sec, heroSpeech, "YIPPIE, i won this shitty web game 😀", heroAudio, 4)
                } else if (checkItem("key")) {
                    setTimeout(counterCharacter.style.opacity = 1)
                    showMessage(counterSpeech, "You should use the key to open the chest, so i can get my coin.", heroAudio, 4)
                    setTimeout(function () { counterCharacter.style.opacity = 0 }, 4 * sec)
                } else {
                    showMessage(heroSpeech, "Hey, i need a sword could you help me with that", heroAudio, 4)
                    setTimeout(counterCharacter.style.opacity = 1)
                    setTimeout(showMessage, 4 * sec, counterSpeech, "Sure, i can provide you with a sword, but you will need to do something for me.", counterAudio, 4)
                    setTimeout(showMessage, 8 * sec, heroSpeech, "yeah sure, what is it?", heroAudio, 4)
                    setTimeout(showMessage, 12 * sec, counterSpeech, "there is a chest on the nearby pier with a coin in it that i want. there should be a key for it behind a rock.", counterAudio, 6)
                    setTimeout(function () { counterCharacter.style.opacity = 0 }, 18 * sec)
                }
                break
            default:
                break
        }
    }
}

showMessage(heroSpeech, "I need to find a sword. maybe i could ask at that house.", heroAudio, 4)

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

function showMessage(targetBubble, message, targetSound, hidetime) {
    targetSound.currentTime = 0;
    targetSound.play(targetSound);
    targetBubble.innerText = message
    targetBubble.style.opacity = 1
    setTimeout(hideMessage, hidetime * sec, targetBubble, targetSound)
}

function hideMessage(targetBubble, targetSound) {
    targetSound.pause(targetSound);
    targetBubble.innerText = "..."
    targetBubble.style.opacity = 0
}

function saveGamestate(gameState) {
    localStorage.gameState = JSON.stringify(gameState)
}