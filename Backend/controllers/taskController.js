const Task = require('../models/task');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id   // ownership
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Tasks (user -> own, admin -> all)
exports.getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.find().populate('user', 'name email');
        } else {
            tasks = await Task.find({ user: req.user._id });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task (user -> own, admin -> any)
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed ?? task.completed;

        const updated = await task.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
