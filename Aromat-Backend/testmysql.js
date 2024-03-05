// script pour tester la connexion a mysql

const mysql = require("mysql");

// Configuration de la connexion à la base de données

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Aromat",
});

db.connect((err) => {
    if (err) {
        console.error("Erreur lors de la connexion à la base de données:", err);
        process.exit(1);
    }
    console.log("Connecté à la base de données MySQL.");
});

