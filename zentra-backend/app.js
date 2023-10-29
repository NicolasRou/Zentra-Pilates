const express = require("express");
const sociosRoutes = require("./routes/socios");
const horariosRoutes = require("./routes/horarios");
const adminRoutes = require("./routes/admin")
const app = express();
const cors = require("cors");
const i18n = require('i18n');

const PORT = process.env.PORT || 5000;

i18n.configure({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
});

app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", sociosRoutes);
app.use("/", horariosRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
