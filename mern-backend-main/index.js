import express from "express";
import path from "path";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";
import dbConnect from "./config/db.js";
import session from "express-session";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import authRouter from "./routes/authRoute.js";
import orderRouter from "./routes/orderRoute.js";
import seedAdmin from "./config/seedAdmin.js";

const app = express();
dotenv.config();

// ✅ Middlewares (PUT THESE FIRST)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ View Engine
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "layout");

// ✅ Static Files
app.use(express.static("public"));

// ✅ Session
app.use(
  session({
    secret: "hello123",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Make session global in EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// ✅ Routes
app.use("/admin", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// ✅ Start Server (FIXED FOR DEPLOYMENT)
const startServer = async () => {
  try {
    await dbConnect();
    await seedAdmin();

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();
