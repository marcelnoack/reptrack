import express from 'express';
import passport, { Profile } from 'passport';
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  VerifyCallback
} from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

import AuthService from '../components/auth/authService';
import { UserDTO } from '../components/users/usersAPI';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  const _authService: AuthService = new AuthService();

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      async (email: string, password: string, done) => {
        try {
          const user: UserDTO | undefined = await _authService.signInLocal(
            email,
            password
          );
          return done(null, user);
        } catch (err) {
          done(err, {});
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId ?? '',
        clientSecret: config.googleClientSecret ?? '',
        callbackURL: `/${config.api.prefix}/auth/google/callback`
      },
      async (
        accessToken: string,
        refreshToken: string,
        params: GoogleCallbackParameters,
        profile: Profile,
        done: VerifyCallback
      ) => {
        // 1) check if user exists
        // 2) if exists done(null, user)
        // 3) if not --> create --> done(null, user)
        // 4) error => done(null, err) / done(null, null)
        const user: UserDTO | undefined = await _authService.authenticateGoogle(
          profile
        );

        done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};
