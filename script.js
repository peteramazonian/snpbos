document.addEventListener("DOMContentLoaded", function() {
    const blocksRight = document.querySelectorAll('.blocks.right .block');
    const blocksLeft = document.querySelectorAll('.blocks.left .block');
    let currentRightIndex = blocksRight.length - 1;
    let currentLeftIndex = 0;
    let movingToLeft = true;

    function moveBlock() {
        if (movingToLeft && currentRightIndex >= 0) {
            const block = blocksRight[currentRightIndex];
            block.classList.add('moving');
            setTimeout(() => {
                document.querySelector('.blocks.left').appendChild(block);
                block.classList.remove('moving');
                currentRightIndex--;
                currentLeftIndex++;
                if (currentRightIndex < 0) {
                    movingToLeft = false;
                }
            }, 2000);  // adjust timing based on animation
        } else if (!movingToLeft && currentLeftIndex > 0) {
            const block = blocksLeft[currentLeftIndex - 1];
            block.classList.add('moving');
            setTimeout(() => {
                document.querySelector('.blocks.right').appendChild(block);
                block.classList.remove('moving');
                currentRightIndex++;
                currentLeftIndex--;
                if (currentLeftIndex == 0) {
                    movingToLeft = true;
                }
            }, 2000);  // adjust timing based on animation
        }
    }

    setInterval(moveBlock, 3000); // interval between moves
});
