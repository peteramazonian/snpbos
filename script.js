document.addEventListener("DOMContentLoaded", function() {
    const blocksRight = document.querySelectorAll('.blocks.right .block');
    const blocksLeft = document.querySelectorAll('.blocks.left .block');
    let currentRightIndex = 0;
    let currentLeftIndex = blocksLeft.length;
    let movingToLeft = true;

    function moveBlocks() {
        if (movingToLeft) {
            if (currentRightIndex < blocksRight.length) {
                let block = blocksRight[currentRightIndex];
                setTimeout(() => {
                    document.querySelector('.blocks.left').appendChild(block);
                    currentRightIndex++;
                    currentLeftIndex++;
                }, 2000); // Adjust timing for visual effect
            } else {
                movingToLeft = false;
            }
        } else {
            if (currentLeftIndex > 0) {
                let block = document.querySelector('.blocks.left .block:last-child');
                setTimeout(() => {
                    document.querySelector('.blocks.right').appendChild(block);
                    currentRightIndex--;
                    currentLeftIndex--;
                }, 2000); // Adjust timing for visual effect
            } else {
                movingToLeft = true;
            }
        }
    }

    setInterval(moveBlocks, 5000); // Interval between each move
});
