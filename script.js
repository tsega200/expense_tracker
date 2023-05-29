// Expense data
let expenses = [];

// Expense form submit event
document.getElementById('expenseForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input values
  const description = document.getElementById('descriptionInput').value;
  const amount = parseFloat(document.getElementById('amountInput').value);
  const category = document.getElementById('categorySelect').value;

  // Create expense object
  const expense = {
    description,
    amount,
    category
  };

  // Add expense to array
  expenses.push(expense);

  // Clear form inputs
  document.getElementById('descriptionInput').value = '';
  document.getElementById('amountInput').value = '';
  document.getElementById('categorySelect').value = '';

  // Update expense list
  updateExpenseList();

  // Update chart
  updateChart();
});

// Update expense list
function updateExpenseList() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  expenses.forEach(function(expense) {
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category})`;
    expenseList.appendChild(listItem);
  });
}

// Update chart
function updateChart() {
  // Calculate total expenses for each category
  const categoryTotals = {};
  expenses.forEach(function(expense) {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  // Prepare chart data
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  // Get chart canvas
  const chartCanvas = document.getElementById('chartCanvas');

  // Check if chart already exists
  let expenseChart = Chart.getChart(chartCanvas);

  // If chart exists, update the chart data and options
  if (expenseChart) {
    expenseChart.data.labels = categories;
    expenseChart.data.datasets[0].data = amounts;
    expenseChart.update();
  }
  // If chart doesn't exist, create a new chart
  else {
    // Create bar chart
    new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [{
          label: 'Expenses by Category',
          data: amounts,
          backgroundColor: 'rgba(0, 123, 255, 0.7)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// Initial update of expense list and chart
updateExpenseList();
updateChart();
