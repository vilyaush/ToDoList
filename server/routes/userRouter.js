const router = require('express').Router();
const Bcrypt = require('../utils/bcrypt');
const { Users } = require('../db/models');

router.route('/signup')
  .post(async (req, res) => {
    try {
      const {
        email, password, name
      } = req.body;

      const pass = await Bcrypt.hash(password);
      const result = await Users.create({
        email, password: pass, name
      });
      if (result.id) {
        req.session.userId = result.id;
        req.session.userName = result.name;
        req.session.email = result.email;

        return res.json(result);
      }
      throw Error(result);
    } catch (error) {
      // console.log(error);
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
    // console.log('singin999999999999');
    const { email, password } = req.body;
    if (!email) {
      return res.json({ text: 'EmptyFieldFailure', field: 'email' });
    }
    if (!password) {
      return res.json({ text: 'EmptyFieldFailure', field: 'password' });
    }
    try {
      const user = await Users.findOne({
        where: { email },
        raw: true,
      });
      if (!user) {
        return res.json({ text: 'UserDoesntExistFailure' });
      }
      const result = await Bcrypt.compare(password, user.password);

      if (result) {
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.email = user.email;
        
        return res.json(user);
      }
      return res.json({ text: 'PasswordsDoNotMatch' });
    } catch (err) {
      return res.status(500).end();
    }
  });

  router.route('/auth')
  .get(async (req, res) => {
    try {
      const result = await Users.findByPk(req.session.userId);
      res.json(result);
    } catch (error) {
      // console.log(error);
      res.json(error);
    }
  });

module.exports = router;