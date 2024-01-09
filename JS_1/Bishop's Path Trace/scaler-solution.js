let checkBoxesDiv = document.querySelectorAll("div.checkbox");
for (let i = 0; i < checkBoxesDiv.length; i++) {
  checkBoxesDiv[i].addEventListener("click", () => {
    console.time();
    boardRefresh();
    traceBishopByIndex(i);
    console.timeEnd();
  });
}

function traceBishopByIndex(idx) {
  let directionArr = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];

  turnCheckboxRedByIndex(idx);
  for (let di = 0; di < directionArr.length; di++) {
    let dr = directionArr[di][0];
    let dc = directionArr[di][1];

    let ri = Math.floor(idx / 8);
    let ci = idx - ri * 8;
    // idx = (row * 8) + col + 1;
    while (ri + dr < 8 && ri + dr >= 0 && ci + dc < 8 && ci + dc >= 0) {
      ri = ri + dr;
      ci = ci + dc;
      turnCheckboxRedByIndex(ri * 8 + ci);
    }
  }
}

function turnCheckboxRedByIndex(idx) {
  checkBoxesDiv[idx].style.backgroundColor = "red";
}

function boardRefresh() {
  for (let i = 0; i < checkBoxesDiv.length; i++) {
    let boxId = Number(checkBoxesDiv[i]["id"]);
    let rowId = Number(checkBoxesDiv[i].parentNode.id);
    if (rowId % 2 == 0) {
      if (boxId % 2 != 0) {
        checkBoxesDiv[i].style.backgroundColor = "white";
      } else {
        checkBoxesDiv[i].style.backgroundColor = "black";
      }
    } else {
      if (boxId % 2 == 0) {
        checkBoxesDiv[i].style.backgroundColor = "white";
      } else {
        checkBoxesDiv[i].style.backgroundColor = "black";
      }
    }
  }
}
