import Expense from "../models/Expense";
const moment = require("moment");
const jwt = require("jsonwebtoken");

moment.suppressDeprecationWarnings = true;

export async function createExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body.date != " " && body.amount != 0) {
      const expense = {
        date: body.date,
        amount: body.amount,
        description: body.description,
      };
      await Expense.create(expense)
        .then((newExpense) => {
          if (newExpense) {
            return res.status(200).json({
              message: "Expense created succefully",
            });
          } else {
            return res.status(500).json({
              message: "Expense not created",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: "Expense not created",
          });
        });
    } else {
      return res.status(500).json({
        message: "Expense not created",
      });
    }
  });
}

export async function updateExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
  });
}

export async function deleteExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    if (params.id != " ") {
      await Expense.findByPk(params.id)
        .then((expenseToDelete) => {
          if (expenseToDelete) {
            expenseToDelete.destroy().then((expense) => {
              return res.status(200).json({
                message: "Expense deleted succefully",
              });
            });
          } else {
            return res.status(500).json({
              message: "Expense not deleted",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Expense not deleted",
          });
        });
    } else {
      return res.status(500).json({
        message: "Expense not deleted",
      });
    }
  });
}

export async function getOneExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    if (params.id != " ") {
      await Expense.findByPk(params.id)
        .then((expense) => {
          if (expense) {
            return res.status(200).json({
              expense,
            });
          } else {
            return res.status(500).json({
              message: "Expense not exist",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Expense not exist",
          });
        });
    } else {
      return res.status(500).json({
        message: "Expense not exist",
      });
    }
  });
}

export async function getAllExpenses(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let offset = req.params.page * 10;
    await Expense.findAll({ offset, limit: 10, order: [["date", "DESC"]] })
      .then((expenses) => {
        return res.status(200).json({
          expenses,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error, expenses not find",
        });
      });
  });
}
