const router = require('express').Router();
const { Doings } = require('../db/models');
const { checkUser } = require('../middleWare/userMiddle');

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
        status: false,
      }
    
    );
    res.json( newTodo );
  });

  router.route('/:id')
  .delete(async (req, res) => {
    await Doings.destroy({ where: { id: req.params.id } });
    res.sendStatus('200');
  });

  router.route('/status/:id')
    .put(async (req, res) => {
      const updatePost = await Doings.update(
        { ...req.body, status: req.body.status },
  
        { where: { id: Number(req.params.id) } },
      );
      const result = await Doings.findOne({ where: { id: +req.params.id }, raw: true });
      res.json({ result });
    });
module.exports = router;