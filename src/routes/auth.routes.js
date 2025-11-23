import express from "express";
import passport from "passport";
import { googleCallback, dashboard, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  googleCallback
);

// Dashboard
router.get('/dashboard', dashboard);

// Logout
router.get('/logout', logout);

export default router;
