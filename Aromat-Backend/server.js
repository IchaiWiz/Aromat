const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const multer = require('multer');
const path = require('path');

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'Aromat/images'); // Chemin du dossier de destination sur le serveur
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Générer un nom de fichier unique
  }
});


const upload = multer({ storage: storage });

const util = require("util");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "zrq@u639+e4+pk01x^oqzu@&7l4k1b#(d&planmds*hvn)qi";

const stripe = require("stripe")(
  "sk_test_51OdXxoEJHb46mWX2KXd5jl4xendU1ApOOQGpnlGlfNpIkCglD6EVSKYONRVah8ODH8WcBxuiZsvfUwgwE75QeFXP00em9i0hUf"
);

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '131406',
  database: 'Aromat'
});

db.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB:', error);
    return;
  }
  console.log('Connected to the database.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Importer SendGrid Mail
const sgMail = require("@sendgrid/mail");

// Configurer SendGrid avec votre clé API
sgMail.setApiKey(
  "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"
);

app.get("/api/random-quote", (req, res) => {
  db.query("SELECT * FROM quotes ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération de la citation");
    } else {
      res.send(result[0]); // Envoie la première citation (et unique dans ce cas) de la liste
    }
  });
});

app.get("/api/top-products", (req, res) => {
  const query = `
    SELECT p.product_id, p.name, p.description, p.price, p.stock, p.rating, p.review, (
        SELECT image_url FROM productimages WHERE product_id = p.product_id ORDER BY RAND() LIMIT 1
    ) AS image_url
    FROM products p
    ORDER BY p.rating DESC, p.review DESC
    LIMIT 3
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.log("Erreur lors de la requête à la base de données:", err);
      res.status(500).send("Erreur lors de la récupération des produits");
    } else {
      console.log("Résultats obtenus avec succès:", results);
      res.send(results);
    }
  });
});


app.post("/api/subscribe", async (req, res) => {
  console.log("Received subscription request:", req.body);
  const { email } = req.body;
  if (!email) {
    console.log("Email is missing in the request.");
    return res.status(400).send({ message: "Email is required" });
  }

  console.log(`Inserting ${email} into database...`);
  const query =
    "INSERT INTO newsletter (email, date_inscription) VALUES (?, NOW())";
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .send({ message: "Error subscribing to newsletter" });
    }

    try {
      console.log(`Sending newsletter email to ${email}...`);
      const msg = {
        to: email, // L'email de l'utilisateur qui s'abonne
        from: "ichaiwizm@gmail.com", // Votre adresse email vérifiée par SendGrid
        subject: "Welcome to Our Spices Newsletter!",
        text: "Thank you for subscribing to our newsletter! Stay tuned for the latest updates on our spices.",
        html: "<strong>Thank you for subscribing to our newsletter!</strong> Stay tuned for the latest updates on our spices.",
      };

      // Envoyer l'email
      await sgMail.send(msg);
      console.log("Newsletter email sent.");
      res.send({
        message: "Subscribed successfully and confirmation email sent",
      });
    } catch (error) {
      console.error("Send Mail Error:", error);
      return res.status(500).send({
        message: "Error sending confirmation email",
        error: error.toString(),
      });
    }
  });
});

app.get("/api/product-details/:productId", (req, res) => {
  const { productId } = req.params;
  const productQuery = `
      SELECT * FROM Products WHERE product_id = ?
  `;
  const imagesQuery = `
      SELECT image_url FROM ProductImages WHERE product_id = ? 
  `;
  const detailsQuery = `
      SELECT spa, dining, quality, eco, health FROM Details_Products WHERE product_id = ?
  `;

  // D'abord, récupérer les informations du produit
  db.query(productQuery, [productId], (err, productResults) => {
    if (err)
      return res.status(500).send("Erreur lors de la récupération du produit");

    if (productResults.length > 0) {
      const product = productResults[0];

      // Ensuite, récupérer les images du produit
      db.query(imagesQuery, [productId], (err, imagesResults) => {
        if (err)
          return res
            .status(500)
            .send("Erreur lors de la récupération des images du produit");

        // Puis, récupérer les détails du produit
        db.query(detailsQuery, [productId], (err, detailsResults) => {
          if (err)
            return res
              .status(500)
              .send("Erreur lors de la récupération des détails du produit");

          res.send({
            ...product,
            images: imagesResults.map((img) => img.image_url),
            details: detailsResults.length > 0 ? detailsResults[0] : {},
          });
        });
      });
    } else {
      res.status(404).send("Produit non trouvé");
    }
  });
});

app.get("/api/product-minidetails/:productId", (req, res) => {
  const { productId } = req.params;
  const query = `
      SELECT detail_type, icon, title, description FROM infos_products WHERE product_id = ?
  `;
  db.query(query, [productId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .send("Erreur lors de la récupération des détails du produit");
    }
    res.json(results);
  });
});

app.post("/api/signup", async (req, res) => {
  const { first_name, last_name, email, password, sign_up_date } = req.body;

  // Validation de l'email et du mot de passe
  if (!(email && password && first_name && last_name)) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Validation du format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Le format de l'email est invalide." });
  }

  try {
    // Vérification de l'unicité de l'email
    const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Erreur lors de la vérification de l'email.");
      }
      if (results.length > 0) {
        return res.status(409).json({ error: "Cet email est déjà utilisé." });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insertion de l'utilisateur sans inclure le token dans la DB
        const userToInsert = {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          sign_up_date,
          status: "customer",
        };
        const insertQuery = "INSERT INTO users SET ?";
        db.query(insertQuery, userToInsert, (err, results) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send("Erreur lors de l'inscription de l'utilisateur.");
          }
          // Génération du token avec l'ID utilisateur
          const userId = results.insertId;
          const token = jwt.sign({ email, userId }, jwtSecret, {
            expiresIn: "24h",
          });
          res.status(201).json({
            message: "Utilisateur créé avec succès",
            token,
            userId,
            email,
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur par email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la connexion.");
    }

    if (results.length === 0) {
      return res.status(401).send("Email ou mot de passe incorrect.");
    }

    const user = results[0];

    // Comparer le mot de passe hashé
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Générer le token JWT incluant userId, email et status
      const token = jwt.sign(
        { userId: user.id, email: user.email, status: user.status },
        jwtSecret,
        { expiresIn: "24h" }
      );
      res.json({ token }); // Envoyer le token au client
    } else {
      res.status(401).send("Email ou mot de passe incorrect.");
    }
  });
});

app.post("/api/add-to-cart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  const findCartQuery =
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";

  // Chercher si le produit existe déjà dans le panier
  db.query(findCartQuery, [userId, productId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la recherche dans le panier", err);
      return res.status(500).send("Erreur lors de l'ajout au panier.");
    }

    if (results.length > 0) {
      // Produit déjà dans le panier, pas de mise à jour nécessaire
      res.send({
        message: "Produit déjà dans le panier.",
        alreadyInCart: true,
      });
    } else {
      // Produit non présent dans le panier, insertion d'une nouvelle entrée
      const insertCartQuery =
        "INSERT INTO cart (user_id, product_id, quantity, added_date) VALUES (?, ?, ?, NOW())";
      db.query(insertCartQuery, [userId, productId, quantity], (err) => {
        if (err) {
          console.error("Erreur lors de l'insertion dans le panier", err);
          return res.status(500).send("Erreur lors de l'ajout au panier.");
        }
        res.send({
          message: "Produit ajouté au panier.",
          alreadyInCart: false,
        });
      });
    }
  });
});

app.get("/api/cart-details/:userId", (req, res) => {
  const { userId } = req.params;

  const cartDetailsQuery = `
    SELECT c.product_id, c.quantity, p.name, p.price, (
      SELECT image_url FROM ProductImages WHERE product_id = c.product_id ORDER BY image_id LIMIT 1
    ) AS image
    FROM cart c
    JOIN Products p ON c.product_id = p.product_id
    WHERE c.user_id = ?
  `;

  db.query(cartDetailsQuery, [userId], (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des détails du panier",
        err
      );
      return res
        .status(500)
        .send("Erreur lors de la récupération des détails du panier.");
    }
    res.send(results);
  });
});

app.post("/api/update-cart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (quantity === 0) {
    // Supprimer le produit du panier si la quantité est 0
    const deleteQuery = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(deleteQuery, [userId, productId], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la suppression du produit du panier",
          err
        );
        return res
          .status(500)
          .send("Erreur lors de la suppression du produit du panier.");
      }
      res.send({ message: "Produit supprimé du panier." });
    });
  } else {
    // Mettre à jour la quantité du produit dans le panier
    const updateQuery =
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    db.query(updateQuery, [quantity, userId, productId], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la mise à jour de la quantité du produit",
          err
        );
        return res
          .status(500)
          .send("Erreur lors de la mise à jour de la quantité du produit.");
      }
      res.send({ message: "Quantité mise à jour." });
    });
  }
});

app.get("/api/products", (req, res) => {
  const { search, category, sort } = req.query;

  let query = `
    SELECT p.product_id, p.name, p.price, p.description, pi.image_url 
    FROM Products p
    JOIN ProductImages pi ON p.product_id = pi.product_id
  `;

  let conditions = [];
  let queryParams = [];

  if (search) {
    conditions.push(`p.name LIKE ?`);
    queryParams.push(`%${search}%`);
  }

  if (category) {
    conditions.push(`p.categories = ?`);
    queryParams.push(category);
  }

  if (conditions.length) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  query += ` GROUP BY p.product_id`;

  if (sort === "price_asc") {
    query += ` ORDER BY p.price ASC`;
  } else if (sort === "price_desc") {
    query += ` ORDER BY p.price DESC`;
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des produits.");
    }
    res.json(results);
  });
});

app.get("/api/order-summary", (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Supposons que le token est envoyé en tant que Bearer token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token invalide.");
    }
    const userId = decoded.userId;

    const cartDetailsQuery = `
      SELECT c.product_id, c.quantity, p.name, p.price
      FROM cart c
      JOIN Products p ON c.product_id = p.product_id
      WHERE c.user_id = ?
    `;

    db.query(cartDetailsQuery, [userId], (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des détails du panier",
          err
        );
        return res
          .status(500)
          .send("Erreur lors de la récupération des détails du panier.");
      }
      // Calculez le total ici si nécessaire ou laissez-le à faire côté client
      res.send(results);
    });
  });
});

app.post("/api/create-order", (req, res) => {
  const {
    userId,
    contactInfo,
    country_region,
    addressLine,
    city,
    zipCode,
    shippingMethod,
    status = "pending",
    total,
    products,
  } = req.body;

  // Assurez-vous d'abord de vérifier l'authentification et l'autorisation de l'utilisateur.

  // Insérez la commande dans la table `orders`
  const insertOrderQuery = `
    INSERT INTO orders (user_id, contact_info, country_region, address_line, city, zip_code, shipping_method, status, total, order_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    insertOrderQuery,
    [
      userId,
      contactInfo,
      country_region,
      addressLine,
      city,
      zipCode,
      shippingMethod,
      status,
      total,
    ],
    (err, orderResult) => {
      if (err) {
        console.error("Erreur lors de l'insertion de la commande", err);
        return res
          .status(500)
          .send("Erreur lors de la création de la commande.");
      }

      // ID de la commande nouvellement créée
      const orderId = orderResult.insertId;

      // Insérez les détails de la commande dans la table `order_details`
      const insertOrderDetailsQuery = `
      INSERT INTO order_details (order_id, product_id, quantity)
      VALUES ?;
    `;

      // Préparez les valeurs pour les détails de la commande
      const orderDetailsValues = products.map((product) => [
        orderId,
        product.productId,
        product.quantity,
      ]);

      db.query(
        insertOrderDetailsQuery,
        [orderDetailsValues],
        (err, detailsResult) => {
          if (err) {
            console.error(
              "Erreur lors de l'insertion des détails de la commande",
              err
            );
            return res
              .status(500)
              .send("Erreur lors de l'ajout des détails de la commande.");
          }

          // Supprimez les entrées dans la table `cart` pour cet utilisateur
          const deleteCartQuery = `DELETE FROM cart WHERE user_id = ?`;

          db.query(deleteCartQuery, [userId], (err, deleteResult) => {
            if (err) {
              console.error(
                "Erreur lors de la suppression des éléments du panier",
                err
              );
              return res
                .status(500)
                .send("Erreur lors de la vidange du panier.");
            }

            res.send({
              message: "Commande créée avec succès",
              orderId: orderId,
            });
          });
        }
      );
    }
  );
});

app.post("/api/payment", async (req, res) => {
  try {
    const { amount } = req.body; // Assurez-vous de valider et de nettoyer l'entrée

    if (!amount) {
      return res.status(400).send({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur", // ou 'usd', selon votre cas
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/api/latest-order", (req, res) => {
  console.log("Starting /api/latest-order");
  const token = req.headers.authorization.split(" ")[1];
  console.log("Token received:", token);

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ error: "Token invalide." });
    }
    console.log("JWT verified successfully, user ID:", decoded.userId);
    const userId = decoded.userId;

    const latestOrderQuery = `
          SELECT o.order_id, o.city, o.contact_info, o.address_line, o.shipping_method, o.total
          FROM orders o
          WHERE o.user_id = ? AND o.status = 'pending'
          ORDER BY o.order_date DESC
          LIMIT 1
      `;

    console.log("Executing latest order query for user ID:", userId);
    db.query(latestOrderQuery, [userId], (err, orderResults) => {
      if (err || orderResults.length === 0) {
        console.error(
          "Failed to retrieve latest order:",
          err || "No orders found"
        );
        return res.status(500).json({
          error:
            "Erreur lors de la récupération de la commande ou commande non trouvée.",
        });
      }

      const order = orderResults[0];
      console.log("Latest order found:", order);

      const orderDetailsQuery = `
          SELECT order_details.product_id, order_details.quantity, products.name, products.price
          FROM order_details
          JOIN products ON order_details.product_id = products.product_id
          WHERE order_details.order_id = ?
      `;

      console.log("Retrieving order details for order ID:", order.order_id); // Correction ici
      db.query(orderDetailsQuery, [order.order_id], (err, productsResults) => {
        // Correction ici
        if (err) {
          console.error("Failed to retrieve order details:", err);
          return res.status(500).json({
            error: "Erreur lors de la récupération des détails de la commande.",
          });
        }

        order.products = productsResults;
        console.log("Products results:", productsResults); // Ajouté pour le débogage
        console.log("Order details retrieved successfully:", order);
        res.json(order);
      });
    });
  });
});

app.get("/api/user-info", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token invalide.");
    }
    const userId = decoded.userId;

    const userInfoQuery = `SELECT first_name, last_name FROM users WHERE id = ?`;

    db.query(userInfoQuery, [userId], (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur",
          err
        );
        return res
          .status(500)
          .send(
            "Erreur lors de la récupération des informations de l'utilisateur."
          );
      }
      if (results.length > 0) {
        res.send({
          firstName: results[0].first_name,
          lastName: results[0].last_name,
        });
      } else {
        res.status(404).send("Utilisateur non trouvé.");
      }
    });
  });
});

app.post("/api/update-profile", async (req, res) => {
  const { token, email, firstName, lastName, password } = req.body;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    // Optionnel : hacher le nouveau mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `UPDATE users SET email = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?`;
    db.query(
      query,
      [email, firstName, lastName, hashedPassword, userId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du profil." });
        }
        res.json({ message: "Profil mis à jour avec succès." });
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Token invalide." });
  }
});

app.get("/api/my-orders", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Aucun token d'authentification fourni.");
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Token invalide.");
    }
    const userId = decoded.userId;

    // Requête pour récupérer les commandes de l'utilisateur
    const ordersQuery = `
      SELECT o.order_id, o.order_date, o.status, o.total, o.shipping_method, s.time AS delivery_time
      FROM orders o
      JOIN shipping s ON o.shipping_method = s.method
      WHERE o.user_id = ?
      ORDER BY o.order_date DESC
    `;

    db.query(ordersQuery, [userId], (err, ordersResults) => {
      if (err) {
        console.error("Erreur lors de la récupération des commandes", err);
        return res
          .status(500)
          .send("Erreur lors de la récupération des commandes.");
      }

      const orders = ordersResults.map((order) => ({
        ...order,
        products: [],
      }));

      // Pour chaque commande, récupérez les détails des produits
      const promises = orders.map((order) => {
        return new Promise((resolve, reject) => {
          const detailsQuery = `
            SELECT od.quantity, p.name
            FROM order_details od
            JOIN products p ON od.product_id = p.product_id
            WHERE od.order_id = ?
          `;

          db.query(detailsQuery, [order.order_id], (err, detailsResults) => {
            if (err) {
              console.error(
                "Erreur lors de la récupération des détails des commandes",
                err
              );
              reject(err);
            } else {
              order.products = detailsResults;
              resolve();
            }
          });
        });
      });

      Promise.all(promises)
        .then(() => {
          res.json(orders);
        })
        .catch((err) => {
          console.error(
            "Erreur lors de la récupération des détails des produits",
            err
          );
          res
            .status(500)
            .send("Erreur lors de la récupération des détails des produits.");
        });
    });
  });
});

app.get("/api/dashboard-summary", (req, res) => {
  const ordersPendingQuery =
    "SELECT COUNT(*) AS pendingOrders FROM orders WHERE status = 'pending'";
  db.query(ordersPendingQuery, (err, pendingOrdersResults) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des commandes en attente:",
        err
      );
      return res
        .status(500)
        .send(
          "Erreur serveur lors de la récupération des commandes en attente."
        );
    }

    const usersCountQuery =
      "SELECT COUNT(*) AS totalUsers, SUM(status = 'customer') AS customers, SUM(status = 'admin') AS admins FROM users";
    db.query(usersCountQuery, (err, usersCountResults) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération du nombre d'utilisateurs:",
          err
        );
        return res
          .status(500)
          .send(
            "Erreur serveur lors de la récupération du nombre d'utilisateurs."
          );
      }

      const productsCountQuery =
        "SELECT COUNT(*) AS totalProducts FROM products";
      db.query(productsCountQuery, (err, productsCountResults) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération du nombre de produits:",
            err
          );
          return res
            .status(500)
            .send(
              "Erreur serveur lors de la récupération du nombre de produits."
            );
        }

        res.json({
          pendingOrders: pendingOrdersResults[0].pendingOrders,
          totalUsers: usersCountResults[0].totalUsers,
          customers: usersCountResults[0].customers,
          admins: usersCountResults[0].admins,
          totalProducts: productsCountResults[0].totalProducts,
        });
      });
    });
  });
});

const fs = require('fs');

// Convertir db.query en promesse pour utiliser async/await
const query = util.promisify(db.query).bind(db);

app.post("/api/add-product", upload.array("images", 4), async (req, res) => {
  console.log(req.files);
  const { name, description, price, stock, rating, review, category } =
    req.body;
  const details = JSON.parse(req.body.details);
  const uses = JSON.parse(req.body.uses);
  const deliveries = JSON.parse(req.body.deliveries);

  console.log("Parsed uses:", uses);
  console.log("Parsed deliveries:", deliveries);

  try {
    const productResult = await query(
      "INSERT INTO products (name, description, price, stock, rating, review, categories) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, rating, review, category]
    );

    const productId = productResult.insertId;

    // Insérer dans la table detail_products
    await query(
      "INSERT INTO details_products (product_id, spa, dining, quality, eco, health) VALUES (?, ?, ?, ?, ?, ?)",
      [
        productId,
        details.spa,
        details.dining,
        details.quality,
        details.eco,
        details.health,
      ]
    );

    // Insérer les utilisations du produit
    for (const useKey in uses) {
      const { icon, title, description } = uses[useKey];
      await query(
        'INSERT INTO infos_products (product_id, detail_type, icon, title, description) VALUES (?, "use", ?, ?, ?)',
        [productId, icon, title, description]
      );
    }

    // Définition des attributs pour chaque type de livraison
    const deliveryAttributes = {
      Local: {
        icon: "LocalShippingIcon",
        title: "Global Delivery",
        description: deliveries.Local,
      },
      Support: {
        icon: "SupportAgentIcon",
        title: "24/7 Support",
        description: deliveries.Support,
      },
      Refresh: {
        icon: "RefreshIcon",
        title: "Easy Returns",
        description: deliveries.Refresh,
      },
      Hourglass: {
        icon: "HourglassEmptyIcon",
        title: "Timely Delivery",
        description: deliveries.Hourglass,
      },
    };

    // Itération sur les attributs de livraison pour insérer les données
    for (const key in deliveryAttributes) {
      const { icon, title, description } = deliveryAttributes[key];
      await query(
        'INSERT INTO infos_products (product_id, detail_type, icon, title, description) VALUES (?, "delivery", ?, ?, ?)',
        [productId, icon, title, description]
      );
    }


    try {
      // Insérer les chemins des images dans la table product_images
      await Promise.all(req.files.map(async (file) => {
        // Utilisez directement le chemin fourni par Multer
        const imagePath = `http://aromat.cloud/images/${file.filename}`; // Utilisez l'URL complète accessible publiquement


        await query("INSERT INTO productimages (product_id, image_url) VALUES (?, ?)", [productId, imagePath]);
        console.log(`Fichier enregistré: ${imagePath}`);
      }));
    } catch (error) {
      console.error("Erreur lors de l'insertion des chemins d'image:", error);
    }

    res.json({ message: "Produit ajouté avec succès", productId });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).send("Erreur lors de l'ajout du produit.");
  }
});
