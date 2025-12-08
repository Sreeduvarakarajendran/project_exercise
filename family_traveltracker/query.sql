CREATE TABLE items(
    id serial PRIMARY KEY,
    title varchar(50),
);

INSERT INTO items (title) COLUMNS ("Do a homework");

SELECT * FROM items ORDER BY id ASC;

INSERT INTO items (title) VALUES ($1);

UPDATE items SET title = ($1) WHERE id = $2;

DELETE FROM items WHERE id = $1;