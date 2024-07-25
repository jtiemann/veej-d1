--npx wrangler d1 execute prod-d1-veejr  --file migrations/update.sql

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    active BOOLEAN,
    name TEXT UNIQUE,
    role TEXT
);

CREATE UNIQUE INDEX users_name_key ON users(name);

CREATE TABLE templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    template BLOB
);

CREATE UNIQUE INDEX templates_name_key ON templates(name);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL
);

CREATE UNIQUE INDEX products_pkey ON products(id);

INSERT INTO products (id, name, description, price) VALUES (1,'hedge trimmer','trims hedges', 19);
INSERT INTO products (id, name, description, price) VALUES (2,'axe','dangerous chop chop', 29.5);

INSERT INTO templates (id, name, template) VALUES (1, 'homepage', '<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>
<style type="text/css">#print-logo {
  font-family: sans-serif;
  font-size: 3em;
  margin-top: 1em;
  text-align: center;
}
#my-name {
  font-family: sans-serif;
  font-size: 1.5em;
  margin-top: .4em;
  text-align: center
}
#my-title {
  font-family: monospace;
  font-size: 1.3em;
  text-align: center
}
#my-number {
  font-family: sans-serif;
  font-size: 1.2em;
  text-align: center
}
</style>

<p id="print-Logo">A Software Development Resource For Agile Teams</p>
<div id="my-number">301.437.5129</div>

{{partners}}
<div style="margin: 100px; text-align: center">
    <a id="puzzleLink" href="https://chesspuzzle.net/Daily">
    <img id="puzzleImage" alt="Daily Chess Puzzle" />
    </a><br />
    <h3><span id="puzzleText" /></h3>
    </div>

    <script type="text/javascript">
    var request = new XMLHttpRequest();
    request.open("GET", "https://chesspuzzle.net/Daily/Api", true);
    request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
    var result = JSON.parse(request.responseText);
    document.getElementById("puzzleText").textContent = result.Text;
    document.getElementById("puzzleLink").href = result.Link;
    document.getElementById("puzzleImage").src = result.Image;
    }
    };
    request.send();
    </script>
</body>
</html>');

INSERT INTO users (id, active, name, role) VALUES (1, TRUE, 'Jon Tiemann', 'Architect/Developer/Coach');
INSERT INTO users (id, active, name, role) VALUES (2, TRUE, 'Eric Glassman', 'Architect/Developer');
INSERT INTO users (id, active, name, role) VALUES (3, TRUE, 'Brigitte Rau', 'Requirements Engr./Agile Coach');
INSERT INTO users (id, active, name, role) VALUES (5, TRUE, 'felicity remarks', 'mutant');
