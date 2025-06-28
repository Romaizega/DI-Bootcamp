CREATE DATABASE public
    WITH TEMPLATE = template0
    OWNER = postgres
    ENCODING = 'UTF8'
	LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE TABLE items(
	id SERIAL PRIMARY KEY,
	name_item VARCHAR (50),
	price INTEGER
);

CREATE TABLE customers(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR (50),
	last_name VARCHAR (50)
);

INSERT INTO items(name_item, price)
VALUES
  ('Small Desk', 100),
  ('Large desk', 300),
  ('Fan', 80);

INSERT INTO customers(first_name, last_name)
VALUES
  ('Greg', 'Jones'),
  ('Sandra', 'Jones'),
  ('Scott', 'Scott'),
  ('Trevor', 'Green'),
  ('Melanie', 'Johnson');

SELECT * FROM items

SELECT * FROM customers

SELECT * FROM items
WHERE price > 80
ORDER BY name_item

SELECT * FROM items
WHERE price <= 300
ORDER BY name_item

SELECT * FROM customers
WHERE last_name = 'Smith';

SELECT * FROM customers
WHERE last_name = 'Jones';

SELECT * FROM customers
WHERE first_name != 'Scott';
