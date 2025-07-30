import { useState } from 'react'
import List from './components/Book';
import { useRef } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
};

const books: Book[] = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" },
];

function App() {
  const [book, setbook] = useState<Book[]>(books)
  const inputReftitle = useRef<HTMLInputElement>(null)
  const inputRefAuthor = useRef<HTMLInputElement>(null)
  
  const addNewBook = () => {
    if (inputReftitle.current && inputRefAuthor.current) {
      const newBook: Book = {
        id: book.length + 1,
        title: inputReftitle.current.value,
        author: inputRefAuthor.current.value
      };
      setbook([...book, newBook]);
      inputReftitle.current.value = "";
      inputRefAuthor.current.value = "";
    }
  };


  return (
    <>
    <List
      items={book}
      renderItem={(book) => (
        <div>
          <strong>{book.title}</strong> by {book.author}
        </div>
      )}
    />
    <input type="text" ref={inputReftitle} placeholder='title'/>
    <input type="text" ref={inputRefAuthor} placeholder='author'/>
    <button onClick={addNewBook}>Add book</button>
    </>
  )
}

export default App



import { type ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>): ReactNode {
  return (
    <div>
      <h2>Book list:</h2>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default List;

