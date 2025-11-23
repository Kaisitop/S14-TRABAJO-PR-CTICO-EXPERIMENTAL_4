import mongoose from "mongoose";

const oauthUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  googleId: { type: String, required: true }, // obligatorio para login Google
}, { timestamps: true });

const OAuthUser = mongoose.model("OAuthUser", oauthUserSchema);
export default OAuthUser;
