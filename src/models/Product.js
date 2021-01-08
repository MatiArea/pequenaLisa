import Sequelize from "sequelize";
import { sequelize } from "../BaseDeDatos/database";

const Product = sequelize.define(
  "product",
  {
    id_product: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cost_price: {
      type: Sequelize.JSON,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Product;
