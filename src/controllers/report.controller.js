import Purchase from "../models/Purchase";
import ProductSale from "../models/ProductSale";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
import { sequelize } from "../BaseDeDatos/database";
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const jwt = require("jsonwebtoken");

export async function dayReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
   
  });
}

export async function weekReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    
  });
}

export async function monthReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    
  });
}

export async function yearReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    
  });
}
