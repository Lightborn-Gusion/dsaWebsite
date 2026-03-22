document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("linear-container");
    const startBtn = document.getElementById("startBtn");
    const targetDisplay = document.getElementById("targetDisplay"); // Grab the H4 text

    if (!container || !startBtn || !targetDisplay) return;

    // Hardcode the array so it stays the same
    const array = [34, 12, 45, 9, 77, 21, 56];
    let target = 77; // Make target a let so we can change it!
    let isSearching = false;
    let hasSearched = false; // Track if we need to pick a new number

    // 1. Draw the array ONCE when the page loads
    function initArray() {
        container.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const box = document.createElement("div");
            box.classList.add("num-box");
            box.innerText = array[i];
            container.appendChild(box);
        }
    }

    // 2. Clean off the colors and opacities without deleting the boxes
    function resetVisuals() {
        let boxes = document.getElementsByClassName("num-box");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].classList.remove("active", "sorted");
            boxes[i].style.opacity = "1"; // Bring back full brightness
            boxes[i].style.transform = "scale(1)"; // Reset size
        }
    }

    // 3. Pick a random number from our array
    function pickNewTarget() {
        const randomIndex = Math.floor(Math.random() * array.length);
        target = array[randomIndex];
        targetDisplay.innerText = `Looking for: ${target}`; // Update the text on screen!
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function linearSearch() {
        isSearching = true;
        startBtn.disabled = true;
        startBtn.innerHTML = "Searching...";
        let boxes = document.getElementsByClassName("num-box");

        for (let i = 0; i < array.length; i++) {

            // Highlight the box we are checking (Red)
            boxes[i].classList.add("active");
            await sleep(500);

            if (array[i] === target) {
                // Target FOUND!
                boxes[i].classList.remove("active");
                boxes[i].classList.add("sorted"); // Make it Neon Green

                // Satisfying pop animation
                boxes[i].style.transform = "scale(1.2)";
                await sleep(300);
                boxes[i].style.transform = "scale(1)";
                break; // Stop searching!
            } else {
                // Not the target, remove highlight and dim it out
                boxes[i].classList.remove("active");
                boxes[i].style.opacity = "0.3";
            }
        }

        isSearching = false;
        hasSearched = true; // Mark that we finished a search
        startBtn.disabled = false;
        startBtn.innerHTML = "<i class='bi bi-arrow-clockwise'></i> Find New Number";
    }

    // Setup the page initially
    initArray();
    targetDisplay.innerText = `Looking for: ${target}`;

    startBtn.addEventListener("click", () => {
        if (!isSearching) {
            // If we already searched once, reset the board and pick a new target
            if (hasSearched) {
                resetVisuals();
                pickNewTarget();
            }
            linearSearch();
        }
    });
});