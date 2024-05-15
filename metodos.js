const express = require('express');
const app = express();
const port = 3000;

// Simulación de una base de datos de tareas
let tasks = [
    { id: 1, description: 'Learn Node.js', completed: false },
    { id: 2, description: 'Learn Express', completed: false },
];

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener todas las tareas (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Ruta para agregar una nueva tarea (POST)
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Ruta para actualizar una tarea existente por ID (PUT)
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
});

// Ruta para eliminar una tarea por ID (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send(); // Respuesta exitosa sin contenido
});


// Iniciar el servidor
app.listen(3000, () => { // Utiliza `app` para iniciar el servidor
    console.log("El servidor está ejecutándose en el puerto 3000");
});

