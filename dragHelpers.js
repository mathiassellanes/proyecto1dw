let dragSrcEl = null;

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  // if (dragSrcEl !== this) {
  //   dragSrcEl.innerHTML = this.innerHTML;
  //   this.innerHTML = e.dataTransfer.getData('text/html');
  // }
  console.log(dragSrcEl)


  this.classList.remove('over');
}

function dragEnd(e) {
  const listItens = document.querySelectorAll('.draggable');
  listItens.forEach(function (item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

const listItens = document.querySelectorAll('.draggable');
const columnsSelection = document.querySelectorAll('.column');

listItens.forEach(function (item) {
  addEventsDragAndDrop(item);
});

columnsSelection.forEach(function (column) {
  column.addEventListener('dragover', dragOver, false);
  column.addEventListener('drop', function (e) {
    e.preventDefault();

    moveCard(dragSrcEl.id, column.id);

    dragSrcEl.style.opacity = '1';
  }, false);
});
