const router = require('express').Router();
const { Doings } = require('../db/models');
// const { checkUser } = require('../middleWare/userMiddle');

router.route('/')

  .get(async (req, res) => {
    const todos = await Doings.findAll({ order: [['createdAt', 'DESC']], raw: true });
    res.json(todos);
  })

  .post(async (req, res) => {
    
    const newTodo = await Doings.create(
      {
        title: req.body.title,
        user_id: req.body.user_id,
        status: req.body.status,
      },
    );
    console.log(newTodo)
    console.log(req.body.title);
    res.json({ newTodo });
    // catch (err) {
    //     console.log(err)
    //   }
  });

module.exports = router;