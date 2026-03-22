document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("insertion-container");
    const startBtn = document.getElementById("startBtn");

    if (!container || !startBtn) return;

    let array = [];
    let isSorting = false;
    let isSorted = false;

    // Use a FIXED starting array every time so the animation is predictable and easy to learn!
    function generateArray() {
        container.innerHTML = '';

        // Hardcoded, scrambled 10-70 sequence
        array = [50, 20, 70, 10, 40, 30, 60];

        // Draw the square number boxes
        for (let i = 0; i < array.length; i++) {
            const box = document.createElement("div");
            box.classList.add("num-box");
            box.innerText = array[i];
            container.appendChild(box);
        }

        isSorted = false;
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function insertionSort() {
        isSorting = true;
        startBtn.disabled = true;
        startBtn.innerHTML = "Sorting...";
        let boxes = document.getElementsByClassName("num-box");

        for (let i = 1; i < array.length; i++) {
            let j = i;

            // Highlight the "Key" we are currently trying to place (Yellow)
            boxes[j].style.backgroundColor = "#ffc107";
            boxes[j].style.borderColor = "#ffc107";
            boxes[j].style.color = "#121212";
            await sleep(500);

            // Keep swapping it backwards until it finds its correct spot
            while (j > 0 && array[j - 1] > array[j]) {

                // Highlight the element we are comparing against (Red)
                boxes[j - 1].classList.add("active");
                await sleep(400);

                // 1. Swap in the underlying array
                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;

                // 2. Swap visually
                boxes[j].innerText = array[j];
                boxes[j - 1].innerText = array[j - 1];

                // 3. Move the yellow color backwards with the number
                boxes[j].style.backgroundColor = "";
                boxes[j].style.borderColor = "";
                boxes[j].style.color = "";

                boxes[j - 1].style.backgroundColor = "#ffc107";
                boxes[j - 1].style.borderColor = "#ffc107";
                boxes[j - 1].style.color = "#121212";

                // Remove red highlight
                boxes[j].classList.remove("active");

                j--;
                await sleep(300);
            }

            // Remove yellow highlight once the number has settled into its final spot
            boxes[j].style.backgroundColor = "";
            boxes[j].style.borderColor = "";
            boxes[j].style.color = "";
            await sleep(200);
        }

        // Final sweep to turn everything Neon Green (Sorted!)
        for(let k = 0; k < array.length; k++){
            boxes[k].classList.add("sorted");
            await sleep(100);
        }

        isSorting = false;
        isSorted = true;
        startBtn.disabled = false;
        startBtn.innerHTML = "<i class='bi bi-arrow-clockwise'></i> Reset & Run Again";
    }

    generateArray();

    startBtn.addEventListener("click", () => {
        if (!isSorting) {
            if (isSorted) {
                generateArray();
            }
            insertionSort();
        }
    });
});