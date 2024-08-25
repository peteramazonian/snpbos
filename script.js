document.addEventListener("DOMContentLoaded", function() {
    const blocksRight = document.querySelectorAll('.blocks.right .block');
    const blocksLeft = document.querySelectorAll('.blocks.left .block');
    const craneTrolley = document.querySelector('.crane-trolley');
    const hook = document.querySelector('.hook');

    let currentRightIndex = 0;
    let currentLeftIndex = blocksLeft.length;
    let movingToLeft = true;

    function moveBlocks() {
        if (movingToLeft) {
            if (currentRightIndex < blocksRight.length) {
                let block = blocksRight[currentRightIndex];
                block.remove();
                document.querySelector('.blocks.left').appendChild(block);
                currentRightIndex++;
                currentLeftIndex++;
            } else {
                movingToLeft = false;
            }
        } else {
            if (currentLeftIndex > 0) {
                let block = document.querySelector('.blocks.left .block:last-child');
                block.remove();
                document.querySelector('.blocks.right').appendChild(block);
                currentRightIndex--;
                currentLeftIndex--;
            } else {
                movingToLeft = true;
            }
        }
    }

    setInterval(() => {
        craneTrolley.classList.add('moving');
        setTimeout(() => {
            moveBlocks();
            craneTrolley.classList.remove('moving');
        }, 5000); // Move the block every 5 seconds
    }, 10000); // Each full cycle of moving left to right (or vice versa) takes 10s
});
