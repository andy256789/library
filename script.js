const HTMLlibrary = document.querySelector(".library");

const dialog = document.querySelector(".dialog");
const dialogConfirm = document.querySelector("#dialogConfirm");
const dialogShow = document.querySelector("#dialogShow");

const formTitle = document.querySelector("#formTitle");
const formAuthor = document.querySelector("#formAuthor");
const formPages = document.querySelector("#formPages");
const formRead = document.querySelector("#formRead");

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
    printLibrary(myLibrary);
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    printLibrary(myLibrary);
}

function changeRead(book) {
    book.read = !book.read;
    printLibrary(myLibrary);
}

function printLibrary(library) {
    HTMLlibrary.replaceChildren();
    library.forEach(book => {
        const card = document.createElement("div");

        const image = document.createElement("div");
        const title = document.createElement("h1");
        const author = document.createElement("h2");
        const pages = document.createElement("p");
        const read = document.createElement("button");
        const del = document.createElement("button");

        title.textContent = `${book.title}`;
        author.textContent = `by ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        read.textContent = `${book.read ? "READ" : "NOT READ"}`;
        book.read ? read.classList.add("on") : read.classList.add("off");
        del.textContent = `DELETE`;
        del.classList.add("delete");
        image.classList.add("image");

        read.addEventListener("click", () => changeRead(book));
        del.addEventListener("click", () => deleteBook(library.indexOf(book)));

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(image);
        card.appendChild(read);
        card.appendChild(del);

        card.classList.add("book");
        HTMLlibrary.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", "563", "not read");
addBookToLibrary("A song of ice and fire", "George R. R. Martin", "674", "read");
addBookToLibrary("Fourth Wing", "Rebecca Yarros", "512", "read");

printLibrary(myLibrary);