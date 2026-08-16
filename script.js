const animationElement = document.getElementById("ascii-animation");

fetch("spinningcubes.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(animation => {
        let frameIndex = 0;

        // Keep the overall animation background transparent
        animationElement.style.backgroundColor = "transparent";

        function renderFrame() {
            const frame = animation.frames[frameIndex];

            // Clear previous frame
            animationElement.innerHTML = "";

            const fragment = document.createDocumentFragment();

            for (const row of frame.cells) {

                for (const cell of row) {

                    // Spaces do not need their own span.
                    // Using a text node reduces the amount of HTML
                    // the browser has to create every frame.
                    if (cell.g === " ") {
                        fragment.appendChild(
                            document.createTextNode(" ")
                        );
                        continue;
                    }

                    const span = document.createElement("span");

                    span.textContent = cell.g;

                    // Use the foreground color stored in the JSON
                    span.style.color =
                        `rgb(${cell.fg[0]}, ${cell.fg[1]}, ${cell.fg[2]})`;

                    // Ignore the JSON background color
                    span.style.backgroundColor = "transparent";

                    fragment.appendChild(span);
                }

                fragment.appendChild(
                    document.createTextNode("\n")
                );
            }

            animationElement.appendChild(fragment);

            // Use the timing from the JSON
            const delay = animation.delays[frameIndex] ?? 50;

            frameIndex++;

            // Continuously loop the animation
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
