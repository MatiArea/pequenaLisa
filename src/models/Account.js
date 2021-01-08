import Sequelize from "sequelize";
import { sequelize } from "../BaseDeDatos/database";

const Account = sequelize.define(
  "account",{
    id_account: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Account;
