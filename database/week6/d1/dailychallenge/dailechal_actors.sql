SELECT * FROM actors

INSERT INTO actors (first_name, last_name, age, number_oscar)
VALUES 
('Bryan', 'Cranston', '1956-03-07', 2),
('Charlize', 'Theron', '1975-08-07', 1),
('Javier', 'Bardem', '1969-03-01', 1);

SELECT COUNT(first_name) FROM actors