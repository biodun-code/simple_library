// Get the book container element
const bookContainer = document.querySelector('#book-container');

// Define a Book class with a toggleReadStatus method
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// Define an array of books
const myLibrary = [
//   new Book('The Hobbit', 'J.R.R. Tolkien', 300, true),
//   new Book('To Kill a Mockingbird', 'Harper Lee', 281, false),
//   new Book('1984', 'George Orwell', 328, true),
];

// Loop through the array of books and create a card for each book
function renderBooks() {
  bookContainer.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: <span class="${book.read ? 'read' : 'not-read'}">${book.read ? 'Yes' : 'No'}</span></p>
      <button class="remove-btn" data-index="${i}">Remove</button>
      <button class="toggle-read-btn" data-index="${i}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
    `;
    bookContainer.appendChild(card);
  }
}

// Call the renderBooks function to display the initial books
renderBooks();

// Add event listeners for the "NEW BOOK" button and the new book form
const newBookBtn = document.querySelector('#new-book-btn');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');
const newBookForm = document.querySelector('#new-book-form');

newBookBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBooks();
  modal.style.display = 'none';
  newBookForm.reset();
});

// Add event listeners for the remove and toggle read buttons on each book card
bookContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const index = event.target.dataset.index;
    myLibrary.splice(index, 1);
    renderBooks();
  }
  if (event.target.classList.contains('toggle-read-btn')) {
    const index = event.target.dataset.index;
    myLibrary[index].toggleReadStatus();
    renderBooks();
  }
});
