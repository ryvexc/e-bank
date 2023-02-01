import nextConnect from 'next-connect';
import database from './database';
import session from './session';
import passport from '../lib/passport';

const middleware = nextConnect();

middleware.use(database, session, passport.initialize(), passport.session());

export default middleware;