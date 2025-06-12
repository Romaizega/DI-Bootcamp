interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string
}

class Library {
    private books: Book[];
    constructor(books: Book[]) {
        this.books = books
    }
    public addBook(book: Book): void { 
         this.books.push(book)
    }
    public getBookDetails(isbn: string): Book | undefined {
        return this.books.find(book => book.isbn === isbn)
    }
    
    getBooks(): Book [] {
        return this.books
    }
}

class DigitalLibrary extends Library {
    readonly website: string;
    constructor(books : Book[], website: string) {
        super(books)
        this.website = website;
    }
    public listBooks(): string[] {
        return this.getBooks().map(book => book.title)
    }
}

const myBooks: Book[] = [
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    genre: "Dystopian"
  },
];

const myLibrary = new DigitalLibrary(myBooks, "https://mybookshelf.com");
myLibrary.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  isbn: "978-0061120084",
  publishedYear: 1960
});

myLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  publishedYear: 2008,
  genre: "Programming"
});

const bookDetails = myLibrary.getBookDetails("978-0132350884");
if (bookDetails) {
  console.log(bookDetails);
} else {
  console.log("There is not a book");
}
console.log(myLibrary.listBooks());
