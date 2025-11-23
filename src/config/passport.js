import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import OAuthUser from '../models/OAuthUser.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await OAuthUser.findOne({ googleId: profile.id });
    if (!user) {
      user = await OAuthUser.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      });
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await OAuthUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
