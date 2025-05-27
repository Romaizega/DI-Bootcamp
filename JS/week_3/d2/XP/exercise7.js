const allBooks = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    alreadyRead: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    alreadyRead: false
  }
];

const section = document.querySelector(".listBooks");

for (let book of allBooks) {
  const div = document.createElement("div");

  const titleAuthor = document.createElement("p");
  titleAuthor.textContent = `${book.title} written by ${book.author}`;
  
  const img = document.createElement("img");
  img.src = book.image;
  img.style.width = "100px";

  if (book.alreadyRead) {
    titleAuthor.style.color = "red";
  }

  div.appendChild(titleAuthor);
  div.appendChild(img);
  section.appendChild(div);
}
