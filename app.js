const library = [];
const booksDiv = document.getElementById('books');

function Book(author, title, nop, read) {
    this.author = author;
    this.title = title;
    this.nop = nop;
    this.read = read;
}

library.push(new Book('The Odin Project', 'JavaScript', 101, false));
library.push(new Book('Microverse', 'RoR', 42, true));
library.push(new Book('Zoom', 'Meetings', 155, false));
library.push(new Book('Clockify', 'Time', 23, true));


// Add Book
const addBook = (e) => {
    e.preventDefault()
    let author = document.getElementById('author').value
    let title = document.getElementById('title').value
    let nop = document.getElementById('nop').value
    let read = document.getElementById('read')
    let data = read.options[read.selectedIndex].text
    book = new Book(author, title, nop, data)
    createCard(book)
    library.push(book);
};

const form = document.getElementById('add-book')
form.addEventListener('submit', addBook)

// UI Render

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
    read.innerHTML = `Read: ${book.read ? 'Yes' : 'No'}`;
    ul.appendChild(read);

    // remove button
    let btn = document.createElement('button');
    btn.innerHTML = 'Remove';
    btn.className += 'bg-red-700 p-2 border rounded text-white text-sm';
    btn.addEventListener('click', () => {
        console.log('Removed');
    });
    ul.appendChild(btn);

    // read button
    if (!book.read) {
        btn = document.createElement('button');
        btn.className += 'bg-blue-700 p-2 border rounded text-white text-sm';
        btn.innerHTML = 'Mark as Read';
        btn.addEventListener('click', () => {
            console.log('Marked');
        });
        ul.appendChild(btn);
    }

    booksDiv.appendChild(ul);
};

const renderBooks = (books) => {
    books.forEach((book) => {
        createCard(book);
    });
};

renderBooks(library);

// Modal 
let modalButton = document.getElementById("modal-btn");
let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close")[0];


modalButton.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}