
/*

You have to a JS program such that:
1. Whenever mouse hovers over any span.star:
1.1. All the stars till the target span.star, change color to yellow.
1.2. To do this you need to add class of 'star-filled' to stars that need to be yellow.
1.3. and remove the class of 'star-filled' from all the stars that need to be of default color. (grey)

2. Whenever any span.star is clicked on:
2.1. You need to repeat step 1 to color the stars yellow till the target span.star
2.2. Update the Rating Count (span#count) with the star points. (Ex: If third star is clicked, rating count becomes 3)
2.3. Store the value of star points globally, to update the colors when the mouse hovers over or leaves any span.star

3. Whenever mouse leaves any span.star after hover:
3.1. Remove the class of 'star-filled' from all the stars beyond the selected star points global value. (set to 0 by default)
*/


const starFilledClass = 'star-filled';
const attributeNmae = 'data-index';

const starcontainer = document.querySelectorAll('.container #star-container .star');
const count = document.querySelector('.container h2 span#count');


Array.from( starcontainer).forEach(
    spanstar => {
        spanstar.addEventListener('mouseover', hoveredOnStar);
        spanstar.addEventListener('mouseleave', hoverOutsideStar);
        spanstar.addEventListener('click', clickedOnStar);
    }
)


// Hover Outside 
function hoverOutsideStar() {
    removeYellowColorInStar(starcontainer.length, count.textContent);
}

// Hover 
 function hoveredOnStar(event) {
    const spanStar = event.target;
    let hoveredIndex = getIndex(spanStar);
    fillYellowColorInStar(hoveredIndex);
 }

// Click 
function clickedOnStar(event) {
  const spanStar = event.target;
  const clickedIndex = getIndex(spanStar);
  removeYellowColorInStar(starcontainer.length, 0);
  fillYellowColorInStar(clickedIndex);
  count.textContent = clickedIndex;
}

function fillYellowColorInStar(index) {
    while(index-- > 0) {
        addYellowColor(starcontainer[index]);
     }
}

function removeYellowColorInStar(index, tillIndex) {
    while(index-- > tillIndex) {
        removeYellowColor(starcontainer[index]);
     }
}

function getIndex( starElement) {
   return parseInt(starElement.getAttribute(attributeNmae));
}

function addYellowColor( starElement) {
    starElement.classList.add(starFilledClass);
}

function removeYellowColor( starElement) {
    starElement.classList.remove(starFilledClass);
}