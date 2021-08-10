const books = [];

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
        element.dataset.bookId = this.bookId;
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

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("del-btn");
        deleteButton.textContent = "X";
        element.appendChild(deleteButton);

        return element;
    }
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);

    // If the same book already exists in the library, don't add it
    if (books.some((other) => other.bookId === book.bookId)) {
        return;
    }

    books.add(book);
    return book;
}
