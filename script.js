const cards = {
  backlog: [{
    id: crypto.randomUUID(),
    title: "Card 1",
    description: "This is a description for card 1",
    assigned: "John Doe",
    priority: "High",
    state: "backlog",
    deadline: "2021-12-31",
  }],
  todo: [],
  inProgress: [],
  blocked: [],
  done: [],
}

const columns = [document.getElementById("backlog"),
document.getElementById("todo"),
document.getElementById("inProgress"),
document.getElementById("blocked"),
document.getElementById("done"),
]

const backgroundColors = ['has-background-dark',
  'has-background-info',
  'has-background-warning',
  'has-background-danger',
  'has-background-success'
]

const fontColors = ["has-text-white",
  "has-text-white",
  "has-text-white",
  "has-text-white",
  "has-text-white"
]

document.addEventListener('DOMContentLoaded', () => {

  function openModal($el) {
    console.log({ $el });
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  const $target = document.querySelector(".js-modal-trigger");

  const $modal = document.querySelector('#addcard');

  $target.addEventListener('click', () => {
    openModal($modal);
  });


  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });


  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

function createCard({ title, description, assigned, priority, state, deadline }) {
  const id = crypto.randomUUID();

  const column = Object.keys(cards).indexOf(state) + 1;

  cards[state].push({ id, title, description, assigned, priority, state, deadline });

  updateCards(column, cards[state]);
}

function updateCards(columnIndex, cards) {
  const col = columns[columnIndex - 1];
  console.log({ col });
  const previousCards = col.querySelectorAll(".draggable");
  previousCards.forEach(element => element.remove());

  console.log({ cards, columnIndex });

  cards.forEach((card) => {
    const cardTemplate = document.querySelector("#card");

    const h = cardTemplate.content.querySelector("h5");
    const p = cardTemplate.content.querySelector("p");

    h.textContent = card.title;
    p.textContent = card.description;

    const clone = document.importNode(cardTemplate.content, true);

    const div = clone.querySelector("div");
    const h5 = div.querySelector("h5");
    const paragraph = div.querySelector("p");

    h5.classList.add("is-size-5");
    paragraph.classList.add("is-size-6");

    div.classList.add('draggable');
    div.classList.add('card');

    div.classList.add(backgroundColors[columnIndex-1]);
    h5.classList.add(fontColors[columnIndex-1]);
    paragraph.classList.add(fontColors[columnIndex-1]);

    div.draggable = true;

    div.id = card.id;

    col.appendChild(clone);
  });
}

updateCards(1, cards.backlog);


const handleCardSave = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const assigned = document.getElementById("assigned").value;
  const priority = document.getElementById("priority").value;
  const state = document.getElementById("state").value;
  const deadline = document.getElementById("deadline").value;

  const esValidoTitle = validarTitleModal(title);
  const esValidoDescription = validarDescriptionModal(description);
  const esValidoDeadLine = validarDeadLineModal(deadline);


  if (!esValidoTitle || !esValidoDescription || !esValidoDeadLine) {
    return;
  }

  console.log({ title, description, assigned, priority, state, deadline });

  createCard({ title, description, assigned, priority, state, deadline });
}

const errorTitle = document.getElementById("errorTitle");
const errorDescription = document.getElementById("errorDescription");
const errorDeadLine = document.getElementById("errorDeadLine");

function moveCard(cardId, targetColumn) {
  const card = Object.values(cards).flat().find(card => card.id === cardId);

  console.log({ card, cardId, targetColumn });

  const previousColumn = cards[card.state];

  previousColumn.splice(previousColumn.indexOf(card), 1);

  cards[targetColumn].push({
    ...card,
    state: targetColumn,
  });

  updateCards(Object.keys(cards).indexOf(card.state) + 1, previousColumn);
  updateCards(Object.keys(cards).indexOf(targetColumn) + 1, cards[targetColumn]);

  console.log({ cards });
}

function validarTitleModal(title) {
  if (title.trim() === "") {
    errorTitle.textContent = "Debe escribir el nombre de la tarea.";
    return false;
  } else {
    errorTitle.textContent = "";
    return true;
  }
}

function validarDescriptionModal(description) {
  if (description.trim() === "") {
    errorDescription.textContent = "Debe escribir una breve descripcion de la tarea.";
    return false;
  } else {
    errorDescription.textContent = "";
    return true;
  }
}

function validarDeadLineModal(deadLine) {

  if (deadLine === "") {
    errorDeadLine.textContent = "Debe seleccionar una fecha.";
    return false;
  } else {
    errorDeadLine.textContent = "";
    return true;
  }
}


