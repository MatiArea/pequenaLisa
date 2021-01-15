import Sequelize from "sequelize";
import Product from "../models/Product";

import ProductSale from "../models/ProductSale";
import sequelize from "../BaseDeDatos/database";

const Sale = sequelize.define(
  "sale",
  {
    id_sale: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Relations

Sale.belongsToMany(Product, { through: { model: ProductSale, unique: false } });
Product.belongsToMany(Sale, { through: { model: ProductSale, unique: false } });

ProductSale.belongsTo(Product, {
  foreignKey: "id_product",
  onDelete: "SET NULL",
});
ProductSale.belongsTo(Sale, { foreignKey: "id_sale", onDelete: "SET NULL" });
Product.hasMany(ProductSale, {
  foreignKey: "id_product",
  onDelete: "SET NULL",
});
Sale.hasMany(ProductSale, { foreignKey: "id_sale", onDelete: "SET NULL" });

export default Sale;
