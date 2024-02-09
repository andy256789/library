const HTMLlibrary = document.querySelector(".library");
const addButton = document.querySelector(".add");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}
function promptUser() {
    let title = prompt("Enter the title: ");
    let author = prompt("Enter the author: ");
    let pages = prompt("Enter the pages: ");
    let read = prompt("Have you read it: ");
    addBookToLibrary(title, author, pages, read);
    printLibrary(myLibrary);
}

function printLibrary(library) {
    HTMLlibrary.replaceChildren();
    library.forEach(book => {
        const card = document.createElement("div");

        const title = document.createElement("h1");
        const author = document.createElement("h2");
        const pages = document.createElement("p");
        const read = document.createElement("p");

        title.textContent = `Title :${book.title}`;
        author.textContent = `Author :${book.author}`;
        pages.textContent = `Pages :${book.pages}`;
        read.textContent = `Read :${book.read}`;

        card.appendChild(title)
            .appendChild(author)
            .appendChild(pages)
            .appendChild(read);

        card.classList.add("book");
        HTMLlibrary.appendChild(card);
    });
}

addButton.addEventListener("click", () => promptUser());

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", "563", "not read");
addBookToLibrary("A song of ice and fire", "George R. R. Martin", "674", "read");
addBookToLibrary("Fourth Wing", "Rebecca Yarros", "512", "read");

printLibrary(myLibrary);