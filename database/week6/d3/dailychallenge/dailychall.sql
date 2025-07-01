-- PART 1

CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(100) NOT NULL
);

CREATE TABLE customer_profile(
	customer_profile_id SERIAL PRIMARY KEY,
	isLoggedIn BOOLEAN DEFAULT false,
	customer_id INTEGER UNIQUE REFERENCES customers(customer_id)
) 


INSERT INTO customers(first_name, last_name)
VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO customer_profile(isLoggedIn, customer_id)
VALUES 
(
	true,
	(SELECT customer_id FROM customers WHERE first_name = 'John' AND last_name = 'Doe')
),
(
	false,
	(SELECT customer_id FROM customers WHERE first_name = 'Jerome' AND last_name = 'Lalu')
);

SELECT 
customers.first_name
FROM customer_profile
JOIN customers ON customers.customer_id = customer_profile.customer_id 
WHERE customer_profile.isLoggedIn


SELECT 
customers.first_name,
customer_profile.isLoggedIn
FROM customers
LEFT JOIN customer_profile ON customers.customer_id = customer_profile.customer_id 


SELECT customer_profile.isLoggedIn, COUNT(*)
FROM customer_profile
LEFT JOIN customers ON customers.customer_id = customer_profile.customer_id 
WHERE customer_profile.isLoggedIn = false
GROUP BY customer_profile.isLoggedIn

-- PART 2

CREATE TABLE Book(
	book_id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	author VARCHAR(50) NOT NULL 
)

INSERT INTO Book (title, author)
VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee')


CREATE TABLE Student(
	student_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	age INTEGER CHECK (age <= 15)
)

INSERT INTO Student(name, age)
VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14)

CREATE TABLE Library(
	book_fk_id INTEGER REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
	student_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
	borrowed_date DATE,
	PRIMARY KEY(book_fk_id, student_id)
)

INSERT INTO Library (book_fk_id, student_id, borrowed_date) VALUES
(
  (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
  (SELECT student_id FROM Student WHERE name = 'John'),
  '2022-02-15'
),
(
  (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
  (SELECT student_id FROM Student WHERE name = 'Bob'),
  '2021-03-03'
),
(
  (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
  (SELECT student_id FROM Student WHERE name = 'Lera'),
  '2021-05-23'
),
(
  (SELECT book_id FROM Book WHERE title = 'Harry Potter'),
  (SELECT student_id FROM Student WHERE name = 'Bob'),
  '2021-08-12'
);


SELECT * FROM Library

SELECT
Student.name,
Book.title
FROM Library
JOIN Student ON Library.student_id = Student.student_id
JOIN Book ON Library.booK_fk_id = Book.book_id

SELECT AVG(Student.age) AS average_age
FROM Library
JOIN Student ON Library.student_id = Student.student_id
JOIN Book ON Library.book_fk_id = Book.book_id
WHERE Book.title = 'Alice In Wonderland';

DELETE FROM Student WHERE name = 'Bob';
-- When a student is deleted, all related rows in the Library table are automatically deleted
-- because of the ON DELETE CASCADE foreign key constraint.