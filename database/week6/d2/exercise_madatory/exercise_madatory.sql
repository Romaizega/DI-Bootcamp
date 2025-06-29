-- EXERCISE 1

SELECT * FROM items
ORDER BY price

SELECT * FROM items
WHERE price >= 80
ORDER BY price

SELECT first_name, last_name
FROM customers
ORDER BY first_name, last_name ASC
LIMIT 3;

SELECT last_name
FROM customers
ORDER BY last_name DESC;

-- EXERCISE 2
-- 2.1
SELECT * FROM customer

-- 2.2
SELECT  CONCAT(first_name,' ', last_name) AS full_name
FROM customer

-- 2.3
SELECT DISTINCT create_date
FROM customer

-- 2.4
SELECT * FROM customer
ORDER BY first_name DESC;

-- 2.5
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate

-- 2.6
SELECT address, phone
FROM address
WHERE district = 'Texas'

-- 2.7
SELECT * FROM film
WHERE film_id IN (15, 150)

-- 2.8
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title =  'Avatar'

-- 2.9
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title ILIKE  'av%'

-- 2.10

SELECT * FROM film
ORDER BY rental_rate ASC

LIMIT 10

-- 2.11 
WITH renatal_film AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY rental_rate ASC, title) AS row_num
  FROM film
)
SELECT *
FROM renatal_film
WHERE row_num BETWEEN 11 AND 20;

-- 2.12

SELECT
customer.first_name,
customer.last_name,
payment.amount,
payment.payment_date
FROM customer
JOIN payment ON customer.customer_id = payment.customer_id
ORDER BY customer.customer_id

-- 2.13

SELECT
film.film_id,
inventory.film_id
FROM film
LEFT JOIN inventory ON film.film_id = inventory.film_id
WHERE inventory.film_id IS NULL;

-- 2.14

SELECT
city.city,
country.country
FROM city
JOIN country ON city.country_id = country.country_id
GROUP BY country.country, city.city
ORDER BY country.country

-- Bonus

SELECT
customer.first_name,
customer.last_name,
payment.amount,
payment.payment_date,
staff.first_name,
staff.last_name
FROM payment
JOIN customer ON payment.customer_id = customer.customer_id 
JOIN staff ON payment.staff_id = staff.staff_id