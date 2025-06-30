-- EXERCISE 1

SELECT * FROM language

SELECT
film.title,
film.description,
language.name
FROM language
JOIN film ON film.language_id = language.language_id

SELECT
film.title,
film.description,
language.name
FROM language
LEFT JOIN film ON film.language_id = language.language_id


CREATE TABLE new_film (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO new_film (name)
VALUES 
  ('Inception'),
  ('The Matrix'),
  ('Interstellar');

CREATE TABLE customer_review (
	review_id SERIAL PRIMARY KEY,
	film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
	language_id INTEGER REFERENCES language(language_id),
	review_title VARCHAR(50),
	score INTEGER CHECK (score BETWEEN 1 AND 10),
	review_text TEXT ,
	last_update DATE DEFAULT CURRENT_DATE
)

INSERT INTO customer_review (film_id, language_id, review_title, score, review_text)
VALUES
  (1, 1, 'Amazing Sci‑Fi Adventure', 9, 'A visual spectacle with a captivating storyline.'),
  (2, 3, 'Heartfelt Drama', 8, 'Touching performances and a moving script.');

DELETE FROM new_film
WHERE name = 'Inception'
-- All reviews related to this film were deleted from the customer_review table


-- EXERCISE 2

UPDATE film
SET language_id = 2
WHERE film_id = 1

UPDATE film
SET language_id = 2
WHERE film_id = 2

-- The customer table has foreign keys like store_id and address_id. 
-- This means: when inserting a new customer, those values must exist in the store and address tables.

DROP TABLE customer_review;
-- yes, it's easy technically, but double-checking is highly recommended

SELECT COUNT(*)
FROM rental
WHERE return_date IS NUL


SELECT
	film.title,
	film.rental_rate
FROM rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE return_date IS NULL
ORDER BY film.rental_rate DESC
LIMIT 30


SELECT 
film.title,
film.description,
actor.first_name,
actor.last_name

FROM film_actor
JOIN film ON film.film_id = film_actor.film_id
JOIN actor ON actor.actor_id = film_actor.actor_id
WHERE actor.first_name = 'Penelope' AND actor.last_name = 'Monroe' AND film.description  ILIKE '%sumo%'


SELECT 
film.title
FROM film
WHERE rating = 'R' AND length < 60 AND film.description ILIKE '%documentary%'


SELECT 
customer.first_name,
customer.last_name,
payment.amount,
payment.payment_date,
rental.rental_date,
film.title,
inventory.film_id
FROM customer
JOIN payment ON customer.customer_id = payment.customer_id
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE 
    customer.first_name = 'Matthew' 
    AND customer.last_name = 'Mahan' 
    AND payment.amount > 4.00 
    AND rental.return_date 
    BETWEEN '2005-07-28' 
    AND '2005-08-01'

SELECT DISTINCT
  film.title,
  film.description,
  film.replacement_cost,
  customer.first_name,
  customer.last_name
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE 
  customer.first_name = 'Matthew' AND customer.last_name = 'Mahan'
  AND (film.title ILIKE '%boat%' OR film.description ILIKE '%boat%')
  ORDER BY film.replacement_cost DESC
  LIMIT 1