const canvas = document.getElementById("ascii-animation");
const ctx = canvas.getContext("2d");

fetch("media/spinningcube.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(animation => {

        let frameIndex = 0;

        const fontSize = 7;
        const lineHeight = 7;

        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = "top";

        // Determine width of one monospace character
        const charWidth = ctx.measureText("M").width;

        // Set canvas to match the ASCII animation dimensions
        canvas.width = Math.ceil(animation.cols * charWidth);
        canvas.height = animation.rows * lineHeight;

        // Canvas width/height resets context settings
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = "top";

        function renderFrame() {

            const frame = animation.frames[frameIndex];

            // Clear canvas while keeping it transparent
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            for (let rowIndex = 0; rowIndex < frame.cells.length; rowIndex++) {

                const row = frame.cells[rowIndex];

                for (let colIndex = 0; colIndex < row.length; colIndex++) {

                    const cell = row[colIndex];

                    // Don't waste time drawing blank spaces
                    if (cell.g === " ") {
                        continue;
                    }

                    ctx.fillStyle =
                        `rgb(${cell.fg[0]}, ${cell.fg[1]}, ${cell.fg[2]})`;

                    ctx.fillText(
                        cell.g,
                        colIndex * charWidth,
                        rowIndex * lineHeight
                    );
                }
            }

            const delay =
                animation.delays[frameIndex] ?? 50;

            frameIndex++;

            if (frameIndex >= animation.frames.length) {
                frameIndex = 0;
            }

            setTimeout(renderFrame, delay);
        }

        renderFrame();
    })
    .catch(error => {
        console.error(
            "Failed to load ASCII animation:",
            error
        );
    });
