const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Whitelist the domain you want to allow
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

class Paystack {
  constructor() {
    this.API_URL = "https://api.paystack.co";
    this.API_KEY = process.env.PAYSTACK_SECRET_KEY;
  }

  async initializeTransaction(data) {
    try {
      const response = await axios.post(
        `${this.API_URL}/transaction/initialize`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initializing transaction:", error);
      throw error;
    }
  }

  async verifyTransaction(reference) {
    try {
      const response = await axios.get(
        `${this.API_URL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying transaction:", error);
      throw error;
    }
  }

  async chargeTransaction(data) {
    try {
      const response = await axios.post(`${this.API_URL}/charge`, data, {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error charging transaction:", error);
      throw error;
    }
  }
}

const paystack = new Paystack();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Payment server is running" });
});

app.post("/initialize", async (req, res) => {
  try {
    const data = req.body;
    const response = await paystack.initializeTransaction(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error initializing transaction" });
  }
});

app.get("/verify/:reference", async (req, res) => {
  try {
    const reference = req.params.reference;
    const response = await paystack.verifyTransaction(reference);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error verifying transaction" });
  }
});

app.post("/charge", async (req, res) => {
  try {
    const data = req.body;
    const response = await paystack.chargeTransaction(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error charging transaction" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(JSON.stringify({ message: `Server running at port ${PORT}` }));
});
