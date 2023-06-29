const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Bcrypt = require('../utils/bcrypt');
const { Users } = require('../db/models');

const TOKEN = process.env.TOKEN

function createToken(user) {
return jwt.sign({ userId: user.id, userName: user.name, userEmail: user.email }, TOKEN, {
expiresIn: '30m'
});
}

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};


router.route('/signup')
.post(async (req, res) => {
try {
const { email, password, name } = req.body;
  const pass = await Bcrypt.hash(password);
  const result = await Users.create({ email, password: pass, name });

  if (result.id) {
    const token = createToken(result); 
    return res.json({ user: result, token });
  }
  throw Error(result);
} catch (error) {
  return res.json(error);
}
});

router.route('/logout')
.get(async (req, res) => {
try {
req.session.destroy();
res.clearCookie('sid');
res.sendStatus(200);
} catch (error) {
res.json(error);
}
});


router.route('/signin')
.post(async (req, res) => {
const { email, password } = req.body;
if (!email) {
return res.json({ text: 'EmptyFieldFailure', field: 'email' });
}
if (!password) {
return res.json({ text: 'EmptyFieldFailure', field: 'password' });
}
try {
const user = await Users.findOne({ where: { email }, raw: true });
if (!user) {
return res.json({ text: 'UserDoesntExistFailure' });
}
const result = await Bcrypt.compare(password, user.password);
if (result) {
const token = createToken(user); 
return res.json({ user, token }); 
}
return res.json({ text: 'PasswordsDoNotMatch' });
} catch (err) {
return res.status(500).end();
}
});

router.route('/auth').get(authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await Users.findByPk(userId);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;