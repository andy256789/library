const HTMLlibrary = document.querySelector(".library");
const dialog = document.querySelector(".dialog");
const dialogShow = document.querySelector("#dialogShow");
const dialogConfirm = document.querySelector("#dialogConfirm");
const formTitle = document.querySelector("#formTitle");
const formAuthor = document.querySelector("#formAuthor");
const formPages = document.querySelector("#formPages");
const formRead = document.querySelector("#formRead");
const myLibrary = [];

dialogShow.addEventListener("click", () => dialog.showModal());

dialogConfirm.addEventListener("click", (event) => {
    event.preventDefault();
    if (!(formTitle.value && formAuthor.value && formPages.value)) { return }
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.checked = false;
    dialog.close();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    printLibrary();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    printLibrary();
}

function printLibrary() {
    HTMLlibrary.replaceChildren();
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");

        const title = document.createElement("h1");
        const author = document.createElement("h2");
        const pages = document.createElement("p");

        const image = document.createElement("div");

        const read = document.createElement("button");
        const del = document.createElement("button");

        title.textContent = `${book.title}`;
        author.textContent = `by ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        read.textContent = book.read ? "READ" : "NOT READ";
        del.textContent = `DELETE`;

        card.classList.add("book");
        image.classList.add("image");
        del.classList.add("delete");

        book.read ? read.classList.add("on") : read.classList.add("off");

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(image);
        card.appendChild(read);
        card.appendChild(del);

        read.addEventListener("click", () => {
            book.toggleRead();
            printLibrary();
        });

        del.addEventListener("click", () => deleteBook(index));

        HTMLlibrary.appendChild(card);
    });
}