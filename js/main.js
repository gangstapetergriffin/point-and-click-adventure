document.getElementById("title").innerText = ":3";
//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory
inventoryList = document.getElementById("inventoryBox")

//main character
const mainCharacter = document.getElementById("Hero");
const offsetCharacter = 16;

const tree1 = document.getElementById("squareTree")

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //FIX: character going out of bounds and character not animating on the first click
    //TODO: calc offset base on character size
    mainCharacter.style.left = x - offsetCharacter + "px"
    mainCharacter.style.top = y - offsetCharacter + "px"

    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
        case "key":
            console.log("YOU HAVE FOUND THE KEY");
            document.getElementById("key").remove();
            const keyElement = document.createElement("li");
            keyElement.id = "inv-key";
            keyElement.innerText = "key"
            inventoryList.appendChild(keyElement);
            break
        default:
            tree1.style.opacity = 1;
    }
}