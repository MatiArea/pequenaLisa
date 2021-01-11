import Purchase from "../models/Purchase";
import Product from "../models/Product";
import ProductPurchase from "../models/ProductPurchase";
import each from "async";
const jwt = require("jsonwebtoken");

function removeItemFromArr(arr, item) {
  var i = arr.indexOf(item);

  if (i !== -1) {
    arr.splice(i, 1);
  }
}

export async function createPurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body && body.items.length > 0) {
      const purchase = {
        date: body.date,
        total: body.total,
      };
      await Purchase.create(purchase)
        .then(async (newPurchase) => {
          body.items.forEach(async (item) => {
            await Product.findByPk(item.product.id_product).then(
              async (product) => {
                try {
                  newPurchase.addProduct(product, {
                    through: {
                      quantity: item.quantity,
                      price: item.unit_price,
                      id_product: item.product.id_product,
                      id_purchase: newPurchase.id_purchase,
                    },
                  });
                } catch (error) {
                  console.log(error);
                }

                let arrayPrice = [];

                product.cost_price.forEach((element) => {
                  arrayPrice.push(element);
                });

                let newPrice = {
                  quantity: item.quantity,
                  price: item.unit_price,
                };

                arrayPrice.push(newPrice);
                product
                  .update(
                    {
                      stock: product.stock + item.quantity,
                      cost_price: arrayPrice,
                    },
                    {
                      where: {
                        id_product: item.product.id_product,
                      },
                    }
                  )
                  .then();
              }
            );
          });
          return res.status(200).json({
            message: "Purchase created succeffully",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: "Error, purchase not created",
          });
        });
    }
  });
}

export async function updatePurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
  });
}

export async function deletePurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let idPurchase = req.params.id;
    await Purchase.findByPk(idPurchase, {
      include: [{ model: ProductPurchase }],
    })
      .then((purchase) => {
        purchase.productpurchases.forEach(async (item) => {
          await Product.findByPk(item.id_product).then(async (product) => {
            let arrayPrice = [];

            product.cost_price.forEach((element) => {
              arrayPrice.push(element);
            });

            let price = {
              quantity: item.quantity,
              price: item.price,
            };

            removeItemFromArr(arrayPrice,price)
            product
              .update(
                {
                  stock: product.stock - item.quantity,
                  cost_price: arrayPrice,
                },
                {
                  where: {
                    id_product: item.id_product,
                  },
                }
              )
              .then(() => {
                item.destroy().then();
              });
          });
        });
        purchase
          .destroy()
          .then((purchaseDestroy) => {
            if (purchaseDestroy) {
              return res.status(200).json({
                message: "Purchase deleted succeffully",
              });
            } else {
              console.log("error");

              return res.status(500).json({
                message: "Error, purchase not deleted",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              message: "Error, purchase not deleted",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: "Purchase not exist",
        });
      });
  });
}

export async function getAllPurchases(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let offset = req.params.page * 10;
    await Purchase.findAll({
      offset,
      limit: 10,
      order: [["date", "DESC"]],
    })
      .then((purchases) => {
        return res.status(200).json({
          purchases,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: "Error",
        });
      });
  });
}

export async function getOnePurchases(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let idPurchase = req.params.id;
    await Purchase.findByPk(idPurchase)
      .then((purchase) => {
        if (purchase) {
          return res.status(200).json({
            purchase,
          });
        } else {
          return res.status(500).json({
            message: "Purchase not exist",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Purchase not exist",
        });
      });
  });
}
