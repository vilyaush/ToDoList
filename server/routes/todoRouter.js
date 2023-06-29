const router = require('express').Router();
const { Doings } = require('../db/models');

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
  .patch(async (req, res) => {
    try {
      const todo = await Doings.findOne({ where: { id: +req.params.id } });
      if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      await todo.update({ status: !todo.status });
      
      res.json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.route('/:id')
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTodo = await Doings.update(req.body, { where: { id } });
      if (updatedTodo[0] === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      const todo = await Doings.findOne({ where: { id }, raw: true });
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;