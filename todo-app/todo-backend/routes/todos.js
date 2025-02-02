const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {setAsync, getAsync} = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  if (todo) {
    const result = await getAsync('added_todos') ?? 0; 
    const addition = await setAsync('added_todos', parseInt(result) + 1 );
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;
  
  const updatedTodo = await Todo.updateOne(req.todo, body, { new: true })

  res.send(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
