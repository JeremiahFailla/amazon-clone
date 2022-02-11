const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KRg8OBsDwIUVUIFr2Og4ZYAYWmOoKUE1ZzL7IkmZyC2aULoCYsSerXaM8Lvagt2taWwRY0jnkrYM4W9I76vnaHg00xXMw5ixr"
);

// API

// - app config
const app = express();

// - middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // ok - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-a3b0c/us-central1/api
