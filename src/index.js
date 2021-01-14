import app from "./app";
import "@babel/polyfill";
import sequelize from "./BaseDeDatos/database";

async function main() {
  var port = process.env.PORT || 80;
  var host = process.env.HOST || "0.0.0.0";
  try {
    await app.listen(port, host, function () {
      console.log("Listening on port %d", port);
    });
    await sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Se ha producido un error", error);
      });
  } catch (error) {
    console.log({ Error: error });
  }
}

main();
