const cardsBacklog = [{
  id: crypto.randomUUID(),
  title: "Card 1",
  description: "This is a description for card 1",
  assigned: "John Doe",
  priority: "High",
  state: "inProgress",
  deadline: "2021-12-31",
}];

const cardsTodo = [];

const cardsInProgress = [];

const cardsBlocked = [];

const cardsDone = [];

const columns = [document.getElementById("backlog"),
              document.getElementById("todo"),
              document.getElementById("inProgress"),
              document.getElementById("blocked"),
              document.getElementById("done"),
            ]

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
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

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

function createCard({ title, description, assigned, priority, state, deadline }) {
  const id = crypto.randomUUID();

  cards.shift({ id, title, description, assigned, priority, state, deadline });
}

function updateCards(column) {
  const col = columns[column];
  col.
  cards.forEach((card) => {
    const cardTemplate = document.querySelector("#card");
    const h = cardTemplate.content.querySelector("h5");
    console.log({ h });
    const p = cardTemplate.content.querySelector("p");

    h.textContent = title;
    p.textContent = description;
    let clone = document.importNode(cardTemplate.content, true);

    col.appendChild(clone);
  })
}

createCard(cards[0]);

const handleCardSave = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const assigned = document.getElementById("assigned").value;
  const priority = document.getElementById("priority").value;
  const state = document.getElementById("state").value;
  const deadline = document.getElementById("deadline").value;

  createCard({ title, description, assigned, priority, state, deadline });
  updateCards();
}
