let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");

let isO = true;
const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left diagonal
    [2, 4, 6] // Right diagonal
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (isO) {
            box.innerText = "O";
            isO = false;
        } else {
            box.innerText = "X";
            isO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                msg.innerText = `Winner: ${pos1Val}`;
                disableAllBoxes();
                return;
            }
        }
    }

    // Check for a tie
    const allDisabled = Array.from(boxes).every(box => box.disabled);
    if (allDisabled) {
        msg.innerText = "It's a Tie!";
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Reset game button functionality
resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    isO = true;
    msg.innerText = ""; // Clear the winner message
});