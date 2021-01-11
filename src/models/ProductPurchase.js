import { Sequelize } from "sequelize";
import sequelize from "../BaseDeDatos/database";

const ProductPurchase = sequelize.define(
  "productpurchase",
  {
    id_product_purchase: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_purchase: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ProductPurchase;
