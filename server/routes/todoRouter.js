const router = require('express').Router();
const { Doings } = require('../db/models');
// const { checkUser } = require('../middleWare/userMiddle');

router.route('/')

  .get(async (req, res) => {
    const todos = await Doings.findAll({ order: [['createdAt', 'DESC']], raw: true });
    res.json(todos);
  })

  .post(async (req, res) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body);
    const newTodo = await Doings.create(
      {
        title: req.body.title,
        user_id: req.body.user_id,
        status: false,
      }
    
    );
    console.log('objobjobj', newTodo)
    // console.log('titletitletitle', {title});
    res.json( newTodo );

    // catch (err) {
    //     console.log(err)
    //   }
  });

  // .post(async (req, res) => {
  //   const { title }  = req.body;
  //   console.log('iiiiiii',title);
  //   try {
  //     const result = await Doings.create({ title, status: false });
  //     res.json(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })

module.exports = router;