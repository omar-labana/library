let library = [];
const booksDiv = document.getElementById('books');

function Book(author, title, nop, read) {
  this.author = author;
  this.title = title;
  this.nop = nop;
  this.read = read;
}

Book.prototype.toggleRead = function toggleRead() {
  this.read = this.read === 'Yes' ? 'No' : 'Yes';
};

library.push(new Book('The Odin Project', 'JavaScript', 101, 'No'));
library.push(new Book('Microverse', 'RoR', 42, 'Yes'));
library.push(new Book('Zoom', 'Meetings', 155, 'No'));
library.push(new Book('Clockify', 'Time', 23, 'Yes'));

// Create one book card
// Modal
const modalButton = document.getElementById('modal-btn');
const modal = document.getElementById('modal');
const span = document.getElementsByClassName('close')[0];

modalButton.onclick = () => {
  modal.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const markRead = (e) => {
  const element = e.target.parentElement;
  const li = element.querySelectorAll('li');
  const i = library.findIndex(
    (book) => {
      const isAuthor = li[0].innerHTML.includes(book.author);
      const isTitle = li[1].innerHTML.includes(book.title);
      return isAuthor && isTitle;
    },
  );
  library[i].toggleRead();
  li[3].innerHTML = `Read: ${library[i].read}`;
  element.querySelectorAll('button')[1].innerHTML = library[i].read === 'Yes' ? 'Mard as unread' : 'Mark as read';
};

const removeBook = (e) => {
  const element = e.target.parentElement;
  const li = element.querySelectorAll('li');
  library = library.filter(
    (book) => {
      const isAuthor = li[0].innerHTML.includes(book.author);
      const isTitle = li[1].innerHTML.includes(book.title);
      return isAuthor && isTitle;
    },
  );
  e.target.parentElement.remove();
};

const createCard = (book) => {
  // ul
  const ul = document.createElement('ul');
  ul.className += ' border-2 p-6 rounded-lg';

  // Author li
  const author = document.createElement('li');
  author.innerHTML = `Author: ${book.author}`;
  ul.appendChild(author);

  // Title li
  const title = document.createElement('li');
  title.innerHTML = `Title: ${book.title}`;
  ul.appendChild(title);

  // nop li
  const nop = document.createElement('li');
  nop.innerHTML = `Title: ${book.nop}`;
  ul.appendChild(nop);

  // read li
  const read = document.createElement('li');
  read.innerHTML = `Read: ${book.read}`;
  ul.appendChild(read);

  // remove button
  let btn = document.createElement('button');
  btn.innerHTML = 'Remove';
  btn.className += 'bg-red-700 p-2 border rounded text-white text-sm';
  btn.addEventListener('click', removeBook);
  ul.appendChild(btn);

  // read button
  btn = document.createElement('button');
  btn.className += 'bg-blue-700 p-2 border rounded text-white text-sm';
  btn.innerHTML = read === 'Yes' ? 'Mard as unread' : 'Mark as read';
  btn.addEventListener('click', markRead);
  ul.appendChild(btn);

  booksDiv.appendChild(ul);
};

// Add Book
const addBook = (e) => {
  e.preventDefault();
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const nop = document.getElementById('nop').value;
  const read = document.getElementById('read');
  const data = read.options[read.selectedIndex].text;
  const book = new Book(author, title, nop, data);
  createCard(book);
  library.push(book);
  modal.style.display = 'none';
};

const form = document.getElementById('add-book');
form.addEventListener('submit', addBook);

// UI Render
const renderBooks = (books) => {
  books.forEach((book) => {
    createCard(book);
  });
};

renderBooks(library);
