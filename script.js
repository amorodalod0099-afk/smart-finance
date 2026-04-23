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
        showNotification('Transaction added successfully!');
        this.renderTransactions();
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

    renderTransactions() {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';
        this.transactions.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${t.date}</td><td>${t.category}</td><td>$${t.amount}</td>`;
            tbody.appendChild(row);
        });
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
    console.log('Rendering chart with data:', data);
}

// Notifications
function showNotification(message) {
    const notificationList = document.getElementById('notificationList');
    const notif = document.createElement('div');
    notif.style.cssText = 'background: #4CAF50; color: white; padding: 10px; margin: 10px 0; border-radius: 5px;';
    notif.textContent = message;
    notificationList.appendChild(notif);
    
    // Auto remove after 5 seconds
    setTimeout(() => notif.remove(), 5000);
}

// Currency Conversion
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return amount * data.rates[toCurrency];
    } catch (error) {
        console.error('Error converting currency:', error);
        return null;
    }
}

// Data Export
function exportData() {
    const transactions = new TransactionManager().getTransactions();
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.json';
    link.click();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const transactionManager = new TransactionManager();
    
    // Handle transaction form
    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('transactionDate').value;
            const desc = document.getElementById('transactionDesc').value;
            const amount = parseFloat(document.getElementById('transactionAmount').value);
            
            if (date && desc && amount) {
                const transaction = new Transaction(
                    Date.now(),
                    amount,
                    date,
                    'expense',
                    desc
                );
                transactionManager.addTransaction(transaction);
                transactionForm.reset();
            }
        });
    }
    
    // Handle budget form
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const desc = document.getElementById('budgetDesc').value;
            const amount = parseFloat(document.getElementById('budgetAmount').value);
            
            if (desc && amount) {
                const budgetDisplay = document.getElementById('budgetDisplay');
                const budgetItem = document.createElement('div');
                budgetItem.style.cssText = 'background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px;';
                budgetItem.innerHTML = `<strong>${desc}</strong>: $${amount}`;
                budgetDisplay.appendChild(budgetItem);
                showNotification('Budget set successfully!');
                budgetForm.reset();
            }
        });
    }
    
    // Render initial transactions
    transactionManager.renderTransactions();
});