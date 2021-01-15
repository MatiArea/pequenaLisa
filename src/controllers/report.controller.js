import Purchase from "../models/Purchase";
import ProductSale from "../models/ProductSale";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
import sequelize from "../BaseDeDatos/database";
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const jwt = require("jsonwebtoken");

export async function dayReport(req, res) {
  var date = req.params.date;
  await Sale.findAll({
    where: {
      date: date,
    },
    attributes: ["total"],
    include: [{ model: ProductSale }],
  })
    .then(async (sales) => {
      await Expense.findAll({
        where: {
          date: date,
        },
        attributes: ["amount"],
      })
        .then(async (expenses) => {
          await Purchase.findAll({
            where: {
              date: date,
            },
            attributes: ["total"],
          })
            .then(async (purchases) => {
              res.status(200).json({
                sales,
                expenses,
                purchases,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Error not information",
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error not information",
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error not information",
      });
    });
}

export async function weekReport(req, res) {}

export async function monthReport(req, res) {
  var month = req.params.month;
  var year = new Date().getFullYear();
  await Sale.findAll({
    where: {
      [op.and]: [
        sequelize.where(
          sequelize.fn("date_part", "month", sequelize.col("date")),
          month
        ),
        sequelize.where(
          sequelize.fn("date_part", "year", sequelize.col("date")),
          year
        ),
      ],
    },
    attributes: ["total"],
    include: [{ model: ProductSale }],
  })
    .then(async (sales) => {
      await Expense.findAll({
        where: {
          [op.and]: [
            sequelize.where(
              sequelize.fn("date_part", "month", sequelize.col("date")),
              month
            ),
            sequelize.where(
              sequelize.fn("date_part", "year", sequelize.col("date")),
              year
            ),
          ],
        },
        attributes: ["amount"],
      })
        .then(async (expenses) => {
          await Purchase.findAll({
            where: {
              [op.and]: [
                sequelize.where(
                  sequelize.fn("date_part", "month", sequelize.col("date")),
                  month
                ),
                sequelize.where(
                  sequelize.fn("date_part", "year", sequelize.col("date")),
                  year
                ),
              ],
            },
            attributes: ["total"],
          })
            .then(async (purchases) => {
              res.status(200).json({
                sales,
                expenses,
                purchases,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Error not information",
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error not information",
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error not information",
      });
    });
}

export async function yearReport(req, res) {
  var year = req.params.year;
  await Sale.findAll({
    where: {
      andOp: sequelize.where(
        sequelize.fn("date_part", "year", sequelize.col("date")),
        year
      ),
    },
    attributes: ["total"],
    include: [{ model: ProductSale }],
  })
    .then(async (sales) => {
      await Expense.findAll({
        where: {
          andOp: sequelize.where(
            sequelize.fn("date_part", "year", sequelize.col("date")),
            year
          ),
        },
        attributes: ["amount"],
      })
        .then(async (expenses) => {
          await Purchase.findAll({
            where: {
              andOp: sequelize.where(
                sequelize.fn("date_part", "year", sequelize.col("date")),
                year
              ),
            },
            attributes: ["total"],
          })
            .then(async (purchases) => {
              res.status(200).json({
                sales,
                expenses,
                purchases,
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).json({
                message: "Error not information",
              });
            });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: "Error not information",
          });
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: "Error not information",
      });
    });
}
