const animationElement = document.getElementById("ascii-animation");

fetch("chingling.json")
    .then(response => response.json())
    .then(animation => {
        let frameIndex = 0;

        function renderFrame() {
            const frame = animation.frames[frameIndex];

            // Clear the previous frame
            animationElement.innerHTML = "";

            for (const row of frame.cells) {
                for (const cell of row) {
                    const span = document.createElement("span");

                    span.textContent = cell.g;

                    span.style.color =
                        `rgb(${cell.fg[0]}, ${cell.fg[1]}, ${cell.fg[2]})`;

                    span.style.backgroundColor =
                        `rgb(${cell.bg[0]}, ${cell.bg[1]}, ${cell.bg[2]})`;

                    animationElement.appendChild(span);
                }

                animationElement.appendChild(document.createElement("br"));
            }

            const delay = animation.delays[frameIndex];

            frameIndex++;

            if (frameIndex >= animation.frames.length) {
                frameIndex = 0;
            }

            setTimeout(renderFrame, delay);
        }

        renderFrame();
    })
    .catch(error => {
        console.error("Failed to load ASCII animation:", error);
    });
