import Sale from "../models/Sale";
import Product from "../models/Product";
import ProductSale from "../models/ProductSale";
import { each } from "async";

export async function createSale(req, res) {
  const body = req.body;
  if (body) {
    if (body.total >= 0 && body.total && body.date && body.items) {
      var sale = {
        number: body.number,
        date: body.date,
        total: body.total,
      };
      await Sale.create(sale)
        .then(async (newSale) => {
          body.items.forEach(async (item) => {
            let quantity = item.quantity;
            await Product.findByPk(item.id_product).then((product) => {
              let arrayCost = [];
              product.cost_price.forEach((element) => {
                arrayCost.push(element);
              });
              while (quantity > 0) {
                let costPrice = arrayCost[0].price;
                let quantityStock = arrayCost[0].quantity;
                if (quantityStock <= quantity) {
                  arrayCost.shift();
                  newSale.addProduct(product, {
                    through: {
                      quantity: quantityStock,
                      cost_price: costPrice,
                      sale_price: product.sale_price,
                      id_product: item.id_product,
                      id_sale: newSale.id_sale,
                    },
                  });
                } else {
                  newSale.addProduct(product, {
                    through: {
                      quantity: quantity,
                      cost_price: costPrice,
                      sale_price: product.sale_price,
                      id_product: item.id_product,
                      id_sale: newSale.id_sale,
                    },
                  });
                  arrayCost[0].quantity -= quantity;
                }
                quantity -= quantityStock;
              }
              product.stock -= item.quantity;
              product.cost_price = [];
              arrayCost.forEach((element) => {
                product.cost_price.push(element);
              });
              product.save().then();
            });
          });
          return res.status(200).json({
            message: "Ok, Sale created succeffully",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error, Sale not created",
          });
        });
    } else {
      return res.status(500).json({
        message: "Error, Sale not created",
      });
    }
  } else {
    return res.status(500).json({
      message: "Error, Sale not created",
    });
  }
}

export async function updateSale(req, res) {}

export async function deleteSale(req, res) {
  let params = req.params;
  if (params) {
    await Sale.findByPk(params.id, {
      include: [{ model: ProductSale }, { model: Product }],
      through: {
        model: ProductSale,
      },
    })
      .then(async (sale) => {
        var cost_array = [];
        each(sale.productsales, async (item) => {
          if (cost_array.length == 0) {
            cost_array.push({
              id_product: item.id_product,
              quantity: item.quantity,
              cost_price: [{ quantity: item.quantity, price: item.cost_price }],
            });
          } else {
            let bandera = true;
            for (let index = 0; index < cost_array.length; index++) {
              if (cost_array[index].id_product == item.id_product) {
                cost_array[index].quantity += item.quantity;
                cost_array[index].cost_price.push({
                  quantity: item.quantity,
                  price: item.cost_price,
                });
                bandera = false;
                break;
              }
            }
            if (bandera) {
              cost_array.push({
                id_product: item.id_product,
                quantity: item.quantity,
                cost_price: [
                  { quantity: item.quantity, price: item.cost_price },
                ],
              });
            }
          }
          await item.destroy().then();
        });
        each(sale.products, async (product) => {
          let arrayCost = [];
          product.cost_price.forEach((element) => {
            arrayCost.push(element);
          });
          for (let index = 0; index < cost_array.length; index++) {
            if (cost_array[index].id_product == product.id_product) {
              product.stock += cost_array[index].quantity;
              product.cost_price = cost_array[index].cost_price.concat(
                arrayCost
              );
              await product.save().then();
              break;
            }
          }
        });
        await sale
          .destroy()
          .then((saleDeleted) => {
            if (saleDeleted) {
              return res.status(200).json({
                message: "Sale deleted succefully",
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, sale not deleted",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: "Error, sale not exist",
        });
      });
  } else {
    return res.status(500).json({
      message: "Error, sale not exist",
    });
  }
}

export async function getOneSale(req, res) {
  let params = req.params;
  if (params) {
    Sale.findByPk(params.id, {
      include: [
        { model: Product, attributes: ["id_product", "name"] },
        { model: ProductSale },
      ],
      through: {
        model: ProductSale,
        unique: false,
      },
    })
      .then((sale) => {
        return res.status(200).json({
          sale,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error, sale not exist",
        });
      });
  } else {
    return res.status(500).json({
      message: "Error, sale not exist",
    });
  }
}

export async function getAllSales(req, res) {
  let offset = req.params.page;
  Sale.findAll({
    offset,
    limit: 10,
    order: [["date", "DESC"]],
  }).then((sales) => {
    return res.status(200).json({
      sales,
    });
  });
}
