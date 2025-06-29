CREATE TABLE FirstTab (
	id integer,
	name VARCHAR(10)
)

INSERT INTO FirstTab (id, name)
VALUES 
  (5, 'Pawan'),
  (6, 'Sharlee'),
  (7, 'Krish'),
  (NULL, 'Avtaar');

CREATE TABLE SecondTab (
	id integer
)


 SELECT COUNT(*) 
 FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL )
 -- output will be : the query returns 0 because NOT IN (NULL) results in an unknown condition, which filters out all rows.

 SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 )
-- The result is 2 because id = 5 is excluded, and the row with NULL is ignored due to NOT IN returning unknown when compared with NULL.


SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab )
-- The result is 0 because SecondTab contains NULL, and NOT IN (NULL) makes the condition unknown for all rows

SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL )
-- The result is 2 because the subquery excludes NULL, so only id = 5 is filtered out. That leaves two matching ids in FirstTab