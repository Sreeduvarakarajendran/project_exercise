CREATE TABLE book (
    id serial PRIMARY KEY,
    title VARCHAR(80),
    isbn INT,
    summary TEXT,
    rating INT,
    bookTime date
) 


SELECT * FROM book 
ORDER BY ASC;

INSERT INTO book (id,title,isbn,summary,rating,bookTime) VALUES (1,Cinderla,4567,wonderful story of destiny, 4.5,06.12.2025)

UPDATE book SET rating = $1 WHERE Id = $2 ;

DELETE FROM book WHERE id = $1;

