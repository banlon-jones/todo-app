import {getAuth} from "firebase-admin/auth";
import fbApp from "./firebaseConfig";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  const firebaseAuth = getAuth(fbApp);
  firebaseAuth.verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Unauthorized access' });
    });
}

export default isAuthenticated()
