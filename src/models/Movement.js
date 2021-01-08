import {  Sequelize  } from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";
import Client from "../models/Client";


const Movement = sequelize.define(
    "movement",
    {
        id_movement : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false,
        },
        date : {
            type: Sequelize.DATEONLY,
            allowNull : false,
        },
        amount : {
            type : Sequelize.FLOAT,
            allowNull : false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);


Client.hasMany(Movement,{ foreignKey: "id_client"});
Movement.belongsTo(Client, { foreignKey: "id_client"});

export default Movement;