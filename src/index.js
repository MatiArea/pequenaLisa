import app from "./app";
import "@babel/polyfill";
import sequelize from "./BaseDeDatos/database";

async function main() {
  var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
  var server_host = process.env.YOUR_HOST || "0.0.0.0";
  try {
    await app.listen(server_port, server_host, function () {
      console.log("Listening on port %d", server_port);
    });
    await sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Base de datos conectada");
      })
      .catch((error) => {
        console.log("Se ha producido un error", error);
      });
  } catch (error) {
    console.log({ Error: error });
  }
}

main();
