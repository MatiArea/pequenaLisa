import { product } from "puppeteer";
import Product from "../models/Product";
import Purchase from "../models/Purchase";
const jwt = require("jsonwebtoken");

export async function createProduct(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    console.log(body.stock > 0);
    if (
      body.name != " " &&
      body.stock > 0 &&
      body.sale_price >= 0 &&
      body.cost_price >= 0
    ) {
      const product = {
        name: body.name,
        stock: body.stock,
        cost_price: [
          {
            quantity: body.stock,
            price: body.cost_price,
          },
        ],
        sale_price: body.sale_price,
      };
      await Product.create(product)
        .then((newProduct) => {
          if (newProduct) {
            return res.status(200).json({
              message: "Product created succefully",
            });
          } else {
            return res.status(500).json({
              message: "Product not created",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Product not created",
          });
        });
    } else if (
      body.name != " " &&
      body.stock == 0 &&
      body.sale_price >= 0 &&
      body.cost_price == 0
    ) {
      const product = {
        name: body.name,
        stock: body.stock,
        cost_price: [],
        sale_price: body.sale_price,
      };
      await Product.create(product)
        .then((newProduct) => {
          if (newProduct) {
            return res.status(200).json({
              message: "Product created succefully",
            });
          } else {
            return res.status(500).json({
              message: "Product not created",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Product not created",
          });
        });
    } else {
      return res.status(500).json({
        message: "Product not created",
      });
    }
  });
}

export async function updateProduct(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body.id != " ") {
      await Product.update(
        {
          name: body.name,
          sale_price: body.sale_price,
        },
        {
          where: {
            id_product: body.id_product,
          },
        }
      ).then((productUpdated) => {
        if(productUpdated){
          res.status(200).json({
            message: "Product updated succefully",
          });
        }
        else{
          res.status(500).json({
            message: "Error, Product not updated",
          });
        }
      });
    } else {
      req.status(500).json({
        message: "Product not exist",
      });
    }
  });
}

export async function deleteProduct(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.params;
    if (body.id != " ") {
      await Product.findByPk(body.id)
        .then((productToDelet) => {
          if (productToDelet) {
            productToDelet.destroy().then((product) => {
              return res.status(200).json({
                message: "Product deleted succefully",
              });
            });
          } else {
            return res.status(500).json({
              message: "Product not deleted",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Product not deleted",
          });
        });
    } else {
      return res.status(500).json({
        message: "Product not deleted",
      });
    }
  });
}

export async function getAllProducts(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    await Product.findAll({ order: [["name", "ASC"]] })
      .then((products) => {
        if (products) {
          return res.status(200).json({
            products,
          });
        } else {
          return res.status(500).json({
            message: "Error",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error",
        });
      });
  });
}

export async function getAllProductsTable(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let offset = req.params.page * 10;
    await Product.findAll({
      offset,
      limit: 10,
      order: [["name", "ASC"]],
    })
      .then((products) => {
        return res.status(200).json({
          products,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error",
        });
      });
  });
}

export async function getOneProduct(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let idProduct = req.params.id;
    await Product.findByPk(idProduct)
      .then((product) => {
        if (product) {
          return res.status(200).json({
            product,
          });
        } else {
          return res.status(500).json({
            message: "Product not exist",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Product not exist",
        });
      });
  });
}
