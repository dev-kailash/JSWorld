/*
In the Document, you have div#inputs that contain 4 input fields with 'input' class.
Here is how these inputs should work:
1. Each of the fields only takes a single-digit number as input.
2. When a number is entered, the focus moves to the next input field.
3. Pressing Backspace or Delete key removes the input of the current field, and the focus moves to the previous field.

You can utilise methods like isNan(value), Element.focus(), Element.nextElementSibling and Element.previousElementSibling to make the above-mentioned features work.

*/
const backspaceKey = "deleteContentBackward";
const deleteKey = 'deleteContentForward';

const backspaceKeyCode = 8;
const deleteKeyCode = 46;

const inputs = document.getElementById('inputs');

console.log(inputs.children);

Array.from(inputs.children).forEach( 
    input => { 
        // input.addEventListener('input', otpEntered);
        input.addEventListener('keyup', keyupTrigger);
    }
)


function keyupTrigger(e) {

    const keyCode = e.keyCode;
    const target = e.target;
    if ( keyCode == backspaceKeyCode || keyCode == deleteKeyCode) { 
      const prevEle = target.previousElementSibling;
      if ( prevEle) {
         prevEle.focus();
      }
    }

   // Each of the fields only takes a single-digit number as input.
    if ( isNaN(target.value)) {
        target.value=null;
        e.preventDefault();
        return;
    } else {
        const nextEle = target.nextElementSibling;
          if ( nextEle ) {
            if ( keyCode != backspaceKeyCode && keyCode != deleteKeyCode) {
              nextEle.focus();
            }
          }

    }
}




