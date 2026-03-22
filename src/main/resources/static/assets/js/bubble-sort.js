document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("bars-container");
    const startBtn = document.getElementById("startBtn");

    if (!container || !startBtn) return;

    let array = [];
    let isSorting = false;
    let isSorted = false;

    // 1. FIXED ARRAY so it matches the other pages
    function generateArray() {
        container.innerHTML = '';

        array = [50, 20, 70, 10, 40, 30, 60];

        // Draw the BARS!
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${array[i] * 4}px`; // Scaled up 4x so they are tall
            container.appendChild(bar);
        }

        isSorted = false;
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function bubbleSort() {
        isSorting = true;
        startBtn.disabled = true;
        startBtn.innerHTML = "Sorting...";
        let bars = document.getElementsByClassName("bar");

        for (let i = 0; i < array.length; i++) {
            let swapped = false;
            for (let j = 0; j < array.length - i - 1; j++) {

                // Highlight the two bars being compared (Red)
                bars[j].classList.add("active");
                bars[j + 1].classList.add("active");

                // Pause to let the user see the two bars
                await sleep(400);

                if (array[j] > array[j + 1]) {
                    // Swap in array
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    // Swap the heights instantly
                    bars[j].style.height = `${array[j] * 4}px`;
                    bars[j + 1].style.height = `${array[j + 1] * 4}px`;

                    // THE SELECTION SORT ANIMATION: "Pop" the bars
                    bars[j].style.transform = "scale(1.15)";
                    bars[j + 1].style.transform = "scale(1.15)";
                    swapped = true;

                    // Pause while popped out
                    await sleep(300);

                    // Shrink them back to normal
                    bars[j].style.transform = "scale(1)";
                    bars[j + 1].style.transform = "scale(1)";
                    await sleep(300);
                } else {
                    // If no swap happened, small pause
                    await sleep(200);
                }

                // Remove the red highlights
                bars[j].classList.remove("active");
                bars[j + 1].classList.remove("active");
            }

            // Lock in the sorted bar (Neon Green)
            bars[array.length - i - 1].classList.add("sorted");

            if (!swapped) {
                // Sweep the remaining bars green
                for(let k = 0; k < array.length - i; k++){
                    bars[k].classList.add("sorted");
                    await sleep(100);
                }
                break;
            }
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
            bubbleSort();
        }
    });
});