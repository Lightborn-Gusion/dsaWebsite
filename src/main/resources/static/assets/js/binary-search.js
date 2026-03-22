document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("binary-container");
    const startBtn = document.getElementById("startBtn");
    const targetDisplay = document.getElementById("targetDisplay");

    if (!container || !startBtn || !targetDisplay) return;

    let array = [];
    let target = 0;
    let isSearching = false;
    let hasSearched = false;

    // 1. Generate a NEW array of random multiples of 10, then SORT it
    function generateNewArray() {
        array = [];

        // Pick 7 unique multiples of 10 (between 10 and 150)
        while(array.length < 7) {
            let randomNum = (Math.floor(Math.random() * 15) + 1) * 10;

            // Prevent duplicate numbers from showing up in the same array
            if (!array.includes(randomNum)) {
                array.push(randomNum);
            }
        }

        // BINARY SEARCH RULE #1: The array MUST be sorted for the math to work!
        array.sort((a, b) => a - b);

        // Clear the old boxes and draw the new ones
        container.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const box = document.createElement("div");
            box.classList.add("num-box");
            box.innerText = array[i];
            container.appendChild(box);
        }
    }

    // 2. Pick a random number from our freshly generated array
    function pickNewTarget() {
        const randomIndex = Math.floor(Math.random() * array.length);
        target = array[randomIndex];
        targetDisplay.innerText = `Looking for: ${target}`; // Update the text!
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function binarySearch() {
        isSearching = true;
        startBtn.disabled = true;
        startBtn.innerHTML = "Searching...";
        let boxes = document.getElementsByClassName("num-box");

        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            // Find the middle index
            let mid = Math.floor((left + right) / 2);

            // Highlight the middle element being checked (Yellow)
            boxes[mid].style.backgroundColor = "#ffc107";
            boxes[mid].style.color = "#121212";
            boxes[mid].style.borderColor = "#ffc107";
            await sleep(800);

            if (array[mid] === target) {
                // Target FOUND!
                boxes[mid].style.backgroundColor = "";
                boxes[mid].classList.add("sorted"); // Neon Green

                boxes[mid].style.transform = "scale(1.2)";
                await sleep(300);
                boxes[mid].style.transform = "scale(1)";
                break; // Stop searching
            } else if (array[mid] < target) {
                // Target is greater, so eliminate the left half by fading it out
                for (let k = left; k <= mid; k++) {
                    boxes[k].style.backgroundColor = "";
                    boxes[k].style.color = "";
                    boxes[k].style.borderColor = "";
                    boxes[k].style.opacity = "0.2";
                }
                left = mid + 1; // Move the left boundary up
            } else {
                // Target is smaller, so eliminate the right half by fading it out
                for (let k = mid; k <= right; k++) {
                    boxes[k].style.backgroundColor = "";
                    boxes[k].style.color = "";
                    boxes[k].style.borderColor = "";
                    boxes[k].style.opacity = "0.2";
                }
                right = mid - 1; // Move the right boundary down
            }
            await sleep(500);
        }

        isSearching = false;
        hasSearched = true; // Mark that we finished a search
        startBtn.disabled = false;
        startBtn.innerHTML = "<i class='bi bi-arrow-clockwise'></i> Generate New Array & Target";
    }

    // Setup the page initially
    generateNewArray();
    pickNewTarget();

    startBtn.addEventListener("click", () => {
        if (!isSearching) {
            // If we already searched once, rebuild everything from scratch!
            if (hasSearched) {
                generateNewArray();
                pickNewTarget();
            }
            binarySearch();
        }
    });
});