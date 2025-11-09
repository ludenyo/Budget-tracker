let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let currentTab = 'all';
let expenseChart = null;
let incomeExpenseChart = null;

const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');
const monthFilter = document.getElementById('month-filter');
const clearFilterBtn = document.getElementById('clear-filter');
const tabBtns = document.querySelectorAll('.tab-btn');
const logoutBtn = document.getElementById('logout-btn');

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    totalIncomeEl.textContent = formatCurrency(income);
    totalExpensesEl.textContent = formatCurrency(expenses);
    balanceEl.textContent = formatCurrency(balance);
}

function renderTransactions(filterMonth = null) {
    transactionList.innerHTML = '';
    let filteredTransactions = transactions;

    // Filter by tab
    if (currentTab !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === currentTab);
    }

    if (filterMonth) {
        filteredTransactions = filteredTransactions.filter(t => {
            const transactionDate = new Date(t.date);
            const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
            return transactionMonth === filterMonth;
        });
    }

    filteredTransactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong><br>
                <small>${transaction.category} - ${new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <span class="transaction-amount ${transaction.type}">${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}</span>
            <button class="delete-btn" data-id="${transaction.id}">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date
    };

    transactions.push(transaction);
    saveTransactions();
    updateSummary();
    renderTransactions();
    renderCharts();

    transactionForm.reset();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateSummary();
    renderTransactions();
    renderCharts();
}

function filterByMonth() {
    const selectedMonth = monthFilter.value;
    renderTransactions(selectedMonth);
}

function clearFilter() {
    monthFilter.value = '';
    renderTransactions();
}

function switchTab(tab) {
    currentTab = tab;
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    renderTransactions();
}

function renderCharts() {
    renderExpenseChart();
    renderIncomeExpenseChart();
}

function renderExpenseChart() {
    if (expenseChart) {
        expenseChart.destroy();
    }
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#C9CBCF'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Expenses by Category'
                }
            }
        }
    });
}

function renderIncomeExpenseChart() {
    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    const monthlyData = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
        }
        monthlyData[month][transaction.type] += transaction.amount;
    });

    const labels = Object.keys(monthlyData).sort();
    const incomeData = labels.map(month => monthlyData[month].income);
    const expenseData = labels.map(month => monthlyData[month].expense);

    incomeExpenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }, {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Income vs Expenses Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

transactionForm.addEventListener('submit', addTransaction);
transactionList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.dataset.id);
        deleteTransaction(id);
    }
});
monthFilter.addEventListener('change', filterByMonth);
clearFilterBtn.addEventListener('click', clearFilter);

// Initial render
updateSummary();
renderTransactions();
renderCharts();
