let library = [];
const booksDiv = document.getElementById('books');

function Book(author, title, nop, read) {
    this.author = author;
    this.title = title;
    this.nop = nop;
    this.read = read;
}

library.push(new Book('The Odin Project', 'JavaScript', 101, 'No'));
library.push(new Book('Microverse', 'RoR', 42, 'Yes'));
library.push(new Book('Zoom', 'Meetings', 155, 'No'));
library.push(new Book('Clockify', 'Time', 23, 'Yes'));


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


const markRead = (e) => {
    let element = e.target.parentElement
    let li = element.querySelectorAll('li')
    let i = library.findIndex(book => li[0].innerHTML.includes(book.author) && li[1].innerHTML.includes(book.title))
    library[i].read = 'Yes'
    li[3].innerHTML = 'Read: Yes'
    element.querySelectorAll('button')[1].remove()

}

const removeBook = (e) => {
    let element = e.target.parentElement
    let li = element.querySelectorAll('li')
    library = library.filter(book => !li[0].innerHTML.includes(book.author) && !li[1].innerHTML.includes(book.title))
    console.log();
    e.target.parentElement.remove()
}
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
    read.innerHTML = `Read: ${book.read}`;
    ul.appendChild(read);

    // remove button
    let btn = document.createElement('button');
    btn.innerHTML = 'Remove';
    btn.className += 'bg-red-700 p-2 border rounded text-white text-sm';
    btn.addEventListener('click', removeBook);
    ul.appendChild(btn);

    // read button
    if (book.read === 'No') {
        btn = document.createElement('button');
        btn.className += 'bg-blue-700 p-2 border rounded text-white text-sm';
        btn.innerHTML = 'Mark as Read';
        btn.addEventListener('click', markRead);
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

