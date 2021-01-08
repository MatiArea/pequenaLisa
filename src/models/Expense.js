import {  Sequelize  } from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";


const Expense = sequelize.define(
    "expense",
    {
        id_expense : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false,
        },
        date : {
            type: Sequelize.DATEONLY,
            allowNull : false,
        },
        type : {
            type : Sequelize.STRING,
            allowNull : false,
        },
        amount : {
            type : Sequelize.FLOAT,
            allowNull : false,
        },
        description : {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Expense;