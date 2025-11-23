import 'dotenv/config';
import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import path from "path";                 // ✅ Importar path
import { fileURLToPath } from "url";     // ✅ Importar fileURLToPath

const __filename = fileURLToPath(import.meta.url);  // ✅ Definir __filename
const __dirname = path.dirname(__filename);         // ✅ Definir __dirname

const app = express();

// JSON
app.use(express.json());

// Configuración de sesión y passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // ✅ Ahora funciona

// Rutas
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

export default app;
