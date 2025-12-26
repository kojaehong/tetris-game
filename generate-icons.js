const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background - dark blue
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, size, size);

    // Calculate block size
    const padding = size * 0.1;
    const blockArea = size - (padding * 2);
    const cellSize = blockArea / 4;
    const gap = cellSize * 0.08;

    // Tetromino colors
    const colors = {
        I: '#00ffff',
        O: '#ffff00',
        T: '#800080',
        S: '#00ff00',
        Z: '#ff0000',
        J: '#0000ff',
        L: '#ff8000'
    };

    // Draw a T-tetromino in the center (iconic tetris shape)
    function drawCell(col, row, color) {
        const x = padding + col * cellSize + gap;
        const y = padding + row * cellSize + gap;
        const cellWidth = cellSize - gap * 2;

        // Main cell
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellWidth, cellWidth);

        // Highlight (top-left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x, y, cellWidth, cellWidth * 0.15);
        ctx.fillRect(x, y, cellWidth * 0.15, cellWidth);

        // Shadow (bottom-right)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x, y + cellWidth * 0.85, cellWidth, cellWidth * 0.15);
        ctx.fillRect(x + cellWidth * 0.85, y, cellWidth * 0.15, cellWidth);
    }

    // Draw T-tetromino (center)
    drawCell(0.5, 1, colors.T);
    drawCell(1.5, 1, colors.T);
    drawCell(2.5, 1, colors.T);
    drawCell(1.5, 2, colors.T);

    // Draw I-tetromino piece (partial, left side)
    drawCell(0, 0, colors.I);

    // Draw L-tetromino piece (partial, right side)
    drawCell(3, 0, colors.L);
    drawCell(3, 1, colors.L);

    // Draw S-tetromino (bottom)
    drawCell(0.5, 2.5, colors.S);
    drawCell(1.5, 2.5, colors.Z);
    drawCell(2.5, 2.5, colors.S);

    // Draw O-tetromino piece (corner)
    drawCell(0, 2.5, colors.O);
    drawCell(3, 2.5, colors.J);

    // Add rounded corner effect to the whole icon
    ctx.globalCompositeOperation = 'destination-in';
    const radius = size * 0.15;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();

    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'www', filename), buffer);
    console.log(`Generated: www/${filename} (${size}x${size})`);
}

// Generate both icons
generateIcon(192, 'icon-192.png');
generateIcon(512, 'icon-512.png');

console.log('Icons generated successfully!');
