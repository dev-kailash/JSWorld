
/**
 * one row has 8 boxes 
 * first row starts with black and then alternative 
 * column wise first is black then alternative 
 * 
 * black white black white black white black white 
 * white  .      .     .      .     .    .    .
 * and so on  
 * 
 * 
       row1  01 02 03 04 05 06 07 08 
       row2  09 10 11 12 13 14 15 16
       row3  17 18 19 20 21 22 23 24
       row4  25 26 27 28 29 30 31 32
       row5  33 34 35 36 37 38 39 40
       row6  41 42 43 44 45 46 47 48 
       row7  49 50 51 52 53 54 55 56 
       row8  57 58 59 60 61 62 63 64
 * 
 * 
 * Bishop can only move diagonal
 * 
 * If I click on white block then all diagonal white block will show as red
 * If I click on black block then all diagonal black block will show as red
 * 
 * For Example I clicked on 
 *  block number 20 ( row3 ) then  
 *  diagonal block are 
 *     
 *     
       row1  -- 02 -- -- -- 06 -- -- 
       row2  -- -- 11 -- 13 -- -- --
       row3  -- -- -- 20 -- -- -- --
       row4  -- -- 27 -- 29 -- -- --
       row5  -- 34 -- -- -- 38 -- --
       row6  41 -- -- -- -- -- 47 -- 
       row7  -- -- -- -- -- -- -- 56 
       row8  -- -- -- -- -- -- -- --

 *  For Example I clicked on 
    block number 33 ( row 5 ) then  
 *  diagonal block are 
 *     
 *     
       row1  -- -- -- -- 05 -- -- -- 
       row2  -- -- -- 12 -- -- -- --
       row3  -- -- 19 -- -- -- -- --
       row4  -- 26 -- -- -- -- -- --
       row5  33 -- -- -- -- -- -- --
       row6  -- 42 -- -- -- -- -- -- 
       row7  -- -- 51 -- -- -- -- -- 
       row8  -- -- -- 60 -- -- -- -- 


       
 */


let board = document.querySelector('.board');
let allCheckBox = board.querySelectorAll('.checkbox');

Array.from(allCheckBox).forEach(el => {
    el.textContent = el.id
    el.style.color = 'blue';
});

const boardClone = board.cloneNode(true);

const clickOutSide = document.addEventListener('click', outSideClicked);

function outSideClicked(event) {

    if (event.target.nodeName == 'DIV') {
        event.stopImmediatePropagation();
    } else {
        resetBoard();
    }
}

board.addEventListener('click', boardClick);

function boardClick(event) {
    const block = event.target;
    const getBNumber = block.id;
    const row = block.closest('.row').id;
    console.time();
    resetBoard();
    markPath(getBNumber, row);
    console.timeEnd();
}

function resetBoard() {
    board.remove();
    board = boardClone.cloneNode(true);
    document.body.appendChild(board);

    board.addEventListener('click', boardClick);
    allCheckBox = board.querySelectorAll('.checkbox');
}

function markPath( blockNumber, row) {
    const clickedrow = parseInt(row);
    blockNumber = parseInt(blockNumber);
    traverseRowWise(clickedrow, blockNumber);

}

function traverseRowWise(clickedrow, blockNumber) {    
for (let row = 1; row <= 8; row++) {
    const rowUsedForCal = (row < clickedrow) ? clickedrow - row : row - clickedrow;

    const pivotUsed = (row < clickedrow) ? blockNumber - 8 * rowUsedForCal : blockNumber + 8 * rowUsedForCal

    if (rowUsedForCal != 0) {
        const start = (row - 1) * 8;
        const end = (row * 8) - 1;
        const markOne = pivotUsed - rowUsedForCal - 1;
        const markTwo = pivotUsed + rowUsedForCal - 1;
        if (markOne >= start && markOne <= end)
            markRedColor(allCheckBox[markOne]);
        if (markTwo >= start && markTwo <= end)
            markRedColor(allCheckBox[markTwo]);

    } else {
        const markClicked = pivotUsed - rowUsedForCal - 1;
        markRedColor(allCheckBox[markClicked]);
    }
}

}


function markRedColor(ele) {
    if (ele)
        ele.style.backgroundColor = 'red';
}
