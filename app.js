// const express = require('express');
// const app = express();

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // In-memory array to store expenses
// let expenses = [];

// // Routes

// // Home Route - Display All Expenses
// app.get('/', (req, res) => {
//     res.render('index', { expenses });
// });

// // Add Expense Route - Show Add Expense Form
// app.get('/add', (req, res) => {
//     res.render('add-expense');
// });

// // Handle Form Submission and Add Expense
// app.post('/add', (req, res) => {
//     const { description, amount } = req.body;
//     expenses.push({ description, amount });
//     res.redirect('/');
// });

// // Delete Expense Route
// app.post('/delete/:index', (req, res) => {
//     const index = req.params.index;
//     if (index > -1) {
//         expenses.splice(index, 1);
//     }
//     res.redirect('/');
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense_tracker');

// Define Expense schema and model
const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    date: Date
});

const Expense = mongoose.model('Expense', expenseSchema);

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    const expenses = await Expense.find();
    res.render('index', { expenses: expenses });
});

app.post('/add-expense', async (req, res) => {
    const { description, amount, date } = req.body;
    const expense = new Expense({ description, amount, date });
    await expense.save();
    res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
