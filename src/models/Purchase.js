import Sequelize from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";
import Product from "../models/Product";


const Purchase = sequelize.define(
    "purchase",{
        id_purchase: {
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
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price:{
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Product.hasMany(Purchase,{ foreignKey: "id_product"});
Purchase.belongsTo(Product, { foreignKey: "id_product"});

export default Purchase; 