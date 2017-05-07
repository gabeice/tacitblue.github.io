const View = require('./snake-view');

$l(() => {
  window.boardView = new View('#board');
  for(let i=0; i<20; i++) {
    const newEl = document.createElement("li");
    newEl.className = "row";
    newEl.id = "row" + i;
    boardView.$el.append(newEl);
  }
  $l('.row').each(row => {
    const newUl = document.createElement("ul");
    row.appendChild(newUl);
    for(let j=0; j<20; j++) {
      const newCol = document.createElement("li");
      newCol.className = "column";
      newCol.id = "col" + row.id.slice(3) + "-" + j;
      newUl.appendChild(newCol);
    }
  });
});
