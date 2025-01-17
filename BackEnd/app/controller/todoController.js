const Todo = require('../controllerBL/todoBL');

const todoController = {
    // fetch all the data from DB 
    getAll: (req, res) => {
        Todo.getAll((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json(results);
        });
    },

    // fetch the data from DB by ID
    getById: (req, res) => {
        const { id } = req.params;
        Todo.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.json(result[0]);
        });
    },

    // Save the task Entry in DB
    create: (req, res) => {
        const data = req.body;
        Todo.create(data, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json({ message: 'Todo created', id: result.insertId });
        });
    },

    // Update the Tast with taskId 
    updateById: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        Todo.updateById(id, data, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Todo updated' });
        });
    },

    // Delete the Task by id
    deleteById: (req, res) => {
        const { id } = req.params;
        Todo.deleteById(id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Todo deleted' });
        });
    }
};

module.exports = todoController;
