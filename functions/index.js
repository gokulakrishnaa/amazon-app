const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request Received", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://localhost:5001/my-clone-project-3f0f9/us-central1/api
