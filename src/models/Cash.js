import {  Sequelize  } from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";


const Cash = sequelize.define(
    "cash",
    {
        id_cash : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false,
        },
        init:{
            type: Sequelize.BOOLEAN,
            allowNull:false
        },
        amount : {
            type : Sequelize.FLOAT,
            allowNull : false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Cash;