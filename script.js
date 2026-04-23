// script.js

// Transaction Management
class Transaction {
    constructor(id, amount, date, type, category) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.type = type; // 'income' or 'expense'
        this.category = category;
    }
}

class TransactionManager {
    constructor() {
        this.transactions = this.loadTransactions();
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.saveTransactions();
        this.showNotification('Transaction added successfully!');
    }

    loadTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    getTransactions() {
        return this.transactions;
    }
}

// Budget Tracking
class Budget {
    constructor(income, expenses) {
        this.income = income;
        this.expenses = expenses;
    }

    getBalance() {
        return this.income - this.expenses;
    }
}

// Chart Rendering
function renderChart(data) {
    // Logic to render charts using a library like Chart.js
}

// Notifications
function showNotification(message) {
    // Display notification to the user
    console.log(message);
}

// Currency Conversion
async function convertCurrency(amount, fromCurrency, toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return amount * data.rates[toCurrency];
}

// Data Export
function exportData() {
    const transactions = new TransactionManager().getTransactions();
    const blob = new Blob([JSON.stringify(transactions)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.json';
    link.click();
}

// Example Usage
const transactionManager = new TransactionManager();
transactionManager.addTransaction(new Transaction(1, 100, new Date(), 'income', 'Salary'));