import { Sequelize } from "sequelize";
import { sequelize } from "../BaseDeDatos/database";
import Product from "../models/Product";
import Sale from "./Sale";

const ProductSale = sequelize.define(
  "productsale",
  {
    id_product_sale: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cost_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    sale_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_sale: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ProductSale;
