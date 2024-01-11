
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
 * Rook can only move Straight
 * 
 * If I click on block then all horizontal Straight block will show as red
 * If I click on block then all vertical Straight block will show as red
 * 
 * For Example I clicked on 
 *  block number 20 ( row3 ) then  
 *   block are 
 *     
 *     
       row1  -- -- -- 04 -- -- -- -- 
       row2  -- -- -- 12 -- -- -- --
       row3  17 18 19 20 21 22 23 24
       row4  -- -- -- 28 -- -- -- --
       row5  -- -- -- 36 -- -- -- --
       row6  -- -- -- 44 -- -- -- -- 
       row7  -- -- -- 52 -- -- -- -- 
       row8  -- -- -- 60 -- -- -- --

 *  For Example I clicked on 
    block number 33 ( row 5 ) then  
 *  diagonal block are 
 *     
 *     
       row1  01 -- -- -- -- -- -- -- 
       row2  09 -- -- -- -- -- -- --
       row3  17 -- -- -- -- -- -- --
       row4  25 -- -- -- -- -- -- --
       row5  33 34 35 36 37 38 39 40
       row6  41 -- -- -- -- -- -- -- 
       row7  49 -- -- -- -- -- -- -- 
       row8  57 -- -- -- -- -- -- -- 


       
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
           resetBoard();
           markPath(getBNumber, row);
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
           traverseRookWise(clickedrow, blockNumber);
       
       }
       
       function traverseRookWise(clickedrow, blockNumber) {    
       for (let row = 1; row <= 8; row++) {
           const rowUsedForCal = (row < clickedrow) ? clickedrow - row : row - clickedrow;
           const pivotUsed = (row < clickedrow) ? blockNumber - 8 * rowUsedForCal : blockNumber + 8 * rowUsedForCal
           const start = (row - 1) * 8;
           const end = (row * 8) - 1;
           if (rowUsedForCal != 0) {
               const markOne = pivotUsed - 1;
               // Horizontal Marking
                markRedColor(allCheckBox[markOne]);
       
           } else {
               // Vertical Marking
               for( let i=start;i<=end;i++)
               markRedColor(allCheckBox[i]);
           }
       }
       
       }
       
       
       function markRedColor(ele) {
           if (ele)
               ele.style.backgroundColor = 'red';
       }
       