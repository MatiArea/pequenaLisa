import Sequelize from "sequelize";
import sequelize from "../BaseDeDatos/database";
import Product from "../models/Product";
import ProductPurchase from "../models/ProductPurchase";

const Purchase = sequelize.define(
  "purchase",
  {
    id_purchase: {
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

Purchase.belongsToMany(Product, {
  through: { model: ProductPurchase, unique: false, onDelete: "cascade" },
});
Product.belongsToMany(Purchase, {
  through: { model: ProductPurchase, unique: false, onDelete: "cascade" },
});

ProductPurchase.belongsTo(Product, { foreignKey: "id_product" });
ProductPurchase.belongsTo(Purchase, { foreignKey: "id_purchase" });
Product.hasMany(ProductPurchase, { foreignKey: "id_product" });
Purchase.hasMany(ProductPurchase, { foreignKey: "id_purchase" });

export default Purchase;
