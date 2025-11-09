# Personal Budget Tracker

A comprehensive web-based application for tracking personal finances, income, and expenses with visual analytics.

## Features

### 💰 Financial Tracking
- **Income & Expense Tracking**: Add and categorize transactions with descriptions and dates
- **Balance Calculation**: Automatic calculation of total income, expenses, and net balance
- **Category Management**: Pre-defined categories including Food, Transport, Entertainment, Utilities, Rent, Salary, Savings, and Other

### 📊 Visual Analytics
- **Interactive Charts**: Pie chart showing expense breakdown by category
- **Time-based Analysis**: Bar chart displaying income vs expenses over time
- **Monthly Filtering**: Filter transactions by specific months

### 🗂️ Transaction Management
- **Tabbed Views**: Separate tabs for All Transactions, Income (Credit), and Expenses (Debit)
- **Transaction History**: Complete list of all transactions with edit/delete functionality
- **Data Persistence**: All data saved locally in browser storage

### 🎨 User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with professional styling
- **Visual Feedback**: Color-coded income (green) and expenses (red)

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Interactive functionality and data management
- **Chart.js**: Data visualization library for charts
- **Local Storage**: Client-side data persistence

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Chart.js library

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ludenyo/Budget-tracker.git
   cd budget-tracker
   ```

2. **Open in browser:**
   - Open `index.html` in your web browser
   - Or use a local server for better experience

### Usage

1. **Add Transactions:**
   - Fill in the transaction form with description, amount, type, category, and date
   - Click "Add Transaction" to save

2. **View Analytics:**
   - Check the summary section for total income, expenses, and balance
   - View the pie chart for expense category breakdown
   - Use the bar chart to see income vs expenses over time

3. **Filter Data:**
   - Use the month filter to view transactions for specific periods
   - Switch between tabs to view all transactions, income only, or expenses only

4. **Manage Transactions:**
   - Click the "Delete" button next to any transaction to remove it
   - All changes are automatically saved

## Project Structure

```
budget-tracker/
├── index.html          # Main application page
├── styles.css          # Application styling
├── script.js           # Application logic and functionality
└── README.md           # Project documentation
```

## Features in Detail

### Transaction Categories
- **Food**: Groceries, dining out, etc.
- **Transport**: Public transport, fuel, vehicle maintenance
- **Entertainment**: Movies, games, hobbies
- **Utilities**: Electricity, water, internet, phone
- **Rent**: Housing payments
- **Salary**: Income from employment
- **Savings**: Money set aside for future use
- **Other**: Miscellaneous transactions

### Data Visualization
- **Expense Breakdown**: Pie chart showing percentage spent in each category
- **Trend Analysis**: Bar chart comparing income and expenses across months
- **Real-time Updates**: Charts update automatically when transactions are added or removed

### Data Persistence
- Uses browser's Local Storage API
- Data persists between browser sessions
- No server required - works completely offline

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] User authentication and multi-user support
- [ ] Export data to CSV/PDF
- [ ] Budget goal setting and tracking
- [ ] Recurring transaction scheduling
- [ ] Cloud backup and sync
- [ ] Advanced filtering and search
- [ ] Currency conversion support

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Chart.js for data visualization
- Unsplash for background images
- Font Awesome for icons (if used in future updates)

---

**Built with ❤️ for personal finance management**
