document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("selection-container");
    const startBtn = document.getElementById("startBtn");

    if (!container || !startBtn) return;

    let array = [];
    let isSorting = false;
    let isSorted = false;

    // Use the EXACT same fixed array as Insertion Sort for easy comparison
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

    async function selectionSort() {
        isSorting = true;
        startBtn.disabled = true;
        startBtn.innerHTML = "Sorting...";
        let boxes = document.getElementsByClassName("num-box");

        for (let i = 0; i < array.length; i++) {
            let minIndex = i;

            // Mark starting assumption of the minimum (Blue)
            boxes[minIndex].classList.add("min");
            await sleep(300);

            for (let j = i + 1; j < array.length; j++) {

                // Highlight the box we are scanning (Red)
                boxes[j].classList.add("active");
                await sleep(400);

                if (array[j] < array[minIndex]) {
                    // Remove blue from old minimum
                    if (minIndex !== i) {
                        boxes[minIndex].classList.remove("min");
                    }

                    minIndex = j;

                    // Mark newly discovered minimum (Blue)
                    boxes[minIndex].classList.remove("active");
                    boxes[minIndex].classList.add("min");
                } else {
                    // Not a minimum, remove red scan
                    boxes[j].classList.remove("active");
                }
            }

            // Swap values if a smaller number was found
            if (minIndex !== i) {
                // 1. Swap in the underlying array
                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;

                // 2. Swap the text inside the HTML elements
                boxes[i].innerText = array[i];
                boxes[minIndex].innerText = array[minIndex];

                // 3. Add a "pop" animation to make the swap satisfying
                boxes[i].style.transform = "scale(1.15)";
                boxes[minIndex].style.transform = "scale(1.15)";
                await sleep(300);
                boxes[i].style.transform = "scale(1)";
                boxes[minIndex].style.transform = "scale(1)";
                await sleep(300);

                // Clean up blue class
                boxes[minIndex].classList.remove("min");
            } else {
                boxes[minIndex].classList.remove("min");
            }

            // Lock in the sorted number (Neon Green)
            boxes[i].classList.add("sorted");
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
            selectionSort();
        }
    });
});