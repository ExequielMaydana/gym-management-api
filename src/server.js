import app from "./index.js";
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
