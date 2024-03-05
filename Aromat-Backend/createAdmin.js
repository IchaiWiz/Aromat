const mysql = require("mysql");
const bcrypt = require('bcrypt');
const readlineSync = require('readline-sync');

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Aromat",
  connectTimeout: 100000,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la base de données:", err);
    process.exit(1);
  }
  console.log("Connecté à la base de données MySQL.");
});

// Fonction pour créer un utilisateur administrateur
async function createAdminUser() {
  const email = readlineSync.question('Email: ');
  const password = readlineSync.question('Mot de passe: ', {hideEchoBack: true});
  const first_name = readlineSync.question('Prenom: ');
  const last_name = readlineSync.question('Nom: ');
  const sign_up_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const status = 'admin';

  const hashedPassword = await bcrypt.hash(password, 10);

  const userToInsert = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    sign_up_date,
    status
  };

  const query = 'INSERT INTO users SET ?';

  db.query(query, userToInsert, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion de l'utilisateur dans la base de données:", err);
      return;
    }
    console.log(`Utilisateur administrateur créé avec succès. ID: ${result.insertId}`);
    db.end(); // Fermer la connexion à la base de données
  });
}

createAdminUser();
