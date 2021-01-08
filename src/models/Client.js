import Sequelize from "sequelize";
import { sequelize } from "../BaseDeDatos/database";

const Client = sequelize.define(
  "client",
  {
    id_client: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    id_account: {
        type: Sequelize.INTEGER,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Client;
