import firebaseApp from '../helper/firebase';

const verifyToken = async (req, res, role, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'Provide a token',
      data: undefined,
      error: true,
    });
  }
  try {
    const response = await firebaseApp.auth().verifyIdToken(token);
    req.headers.firebaseUid = response.user_id;
    if (!role.some((r) => r === response.role)) {
      throw new Error('Unauthorized');
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default verifyToken;
