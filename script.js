const animationElement = document.getElementById("ascii-animation");

fetch("chingling.json")
    .then(response => response.json())
    .then(animation => {
        let frameIndex = 0;

        // Keep the entire animation container transparent
        animationElement.style.backgroundColor = "transparent";

        function renderFrame() {
            const frame = animation.frames[frameIndex];

            // Clear the previous frame
            animationElement.innerHTML = "";

            for (const row of frame.cells) {
                for (const cell of row) {
                    const span = document.createElement("span");

                    span.textContent = cell.g;

                    // Keep the ASCII foreground/text color
                    span.style.color =
                        `rgb(${cell.fg[0]}, ${cell.fg[1]}, ${cell.fg[2]})`;

                    // Remove the black background from each character
                    span.style.backgroundColor = "transparent";

                    animationElement.appendChild(span);
                }

                animationElement.appendChild(
                    document.createElement("br")
                );
            }

            // Prevent the 3000ms pause at the end
            const isLastFrame =
                frameIndex === animation.frames.length - 1;

            const delay = isLastFrame
                ? 30
                : (animation.delays[frameIndex] ?? 30);

            frameIndex++;

            // Loop back to the beginning
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
