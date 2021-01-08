import Sequelize from "sequelize";
import Client from "../models/Client";
import Product from "../models/Product";

import ProductSale from "../models/ProductSale";
import { sequelize } from "../BaseDeDatos/database";

const Sale = sequelize.define(
  "sale",
  {
    id_sale: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    payment: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    id_client: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Relations

Client.hasMany(Sale, { foreignKey: "id_client" });
Sale.belongsTo(Client, { foreignKey: "id_client" });

Sale.belongsToMany(Product, { through: { model: ProductSale, unique: false } });
Product.belongsToMany(Sale, { through:  { model: ProductSale, unique: false } });

ProductSale.belongsTo(Product,{ foreignKey: "id_product" });
ProductSale.belongsTo(Sale,{ foreignKey: "id_sale" });
Product.hasMany(ProductSale,{ foreignKey: "id_product" });
Sale.hasMany(ProductSale,{ foreignKey: "id_sale" });

export default Sale;
