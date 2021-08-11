const bookShelf = document.querySelector("#shelf");
const addButton = document.querySelector("#add");
const addWindow = {
    main: document.querySelector("#add-window"),
    title: document.querySelector("#add-title"),
    author: document.querySelector("#add-author"),
    pages: document.querySelector("#add-pages"),
    read: document.querySelector("#add-read"),
    confirm: document.querySelector("#add-confirm"),
    cancel: document.querySelector("#add-cancel"),
};

let books = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.bookId = `T${title.toUpperCase()}a${author.toLowerCase()}`;
    }

    generateElement() {
        const element = document.createElement("div");
        element.classList.add("card");
        if (this.read) {
            element.classList.add("read");
        }

        const titleElement = document.createElement("p");
        titleElement.classList.add("title");
        titleElement.textContent = `"${this.title}" by ${this.author}`;
        element.appendChild(titleElement);

        const pageCountElement = document.createElement("p");
        pageCountElement.classList.add("page-count");
        pageCountElement.textContent = `Pages: ${this.pages}`;
        element.appendChild(pageCountElement);

        const readButton = document.createElement("button");
        readButton.classList.add("read-btn");
        readButton.textContent = "READ";
        element.appendChild(readButton);
        readButton.addEventListener("click", () => {
            this.read = !this.read;
            element.classList.toggle("read");
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("del-btn");
        deleteButton.textContent = "X";
        element.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            books = books.filter(({ bookId }) => bookId !== this.bookId);
            element.remove();
        });

        return element;
    }
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);

    // If the same book already exists in the library, don't add it
    if (books.some((other) => other.bookId === book.bookId)) {
        return;
    }

    books.push(book);
    return book;
}

function displayBooks() {
    books.forEach((book) => {
        const element = book.generateElement();
        bookShelf.appendChild(element);
    });
}

addBook("A Book of Cheeses", "Cheez Mahn", 329, false);
addBook("The Story", "Mr. Author", 927, true);

displayBooks();

function showAddWindow() {
    addWindow.main.style.visibility = "visible";
}

function hideAddWindow() {
    addWindow.main.style.visibility = "hidden";
}

addButton.addEventListener("click", showAddWindow);
addWindow.cancel.addEventListener("click", hideAddWindow);

function submitBook() {
    const newBook = addBook(
        addWindow.title.value || "UNTITLED",
        addWindow.author.value || "UNKNOWN AUTHOR",
        addWindow.pages.value || -1,
        addWindow.read.checked
    );

    if (!newBook) {
        return;
    }

    bookShelf.appendChild(newBook.generateElement());
    hideAddWindow();
}

addWindow.confirm.addEventListener("click", submitBook);
