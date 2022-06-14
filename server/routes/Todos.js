const express = require('express');

const router = express.Router();

const {
  getAllToDos,
  getPaginatedToDos,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/Todo');

router.get('/', getAllToDos);
router.get('/paginated', getPaginatedToDos);
router.post('/', createToDo);
router.get('/:id', getToDo);
router.patch('/:id', updateToDo);
router.delete('/:id', deleteToDo);

module.exports = router;
