# Loan Calculator

A modern web application for calculating loan installments for different loan types, built with React and Material-UI.

## Features

- **Home Page**: Beautiful and intuitive interface to select loan types
- **Five Loan Calculators**:
  - Daily Loan
  - Speed Loan
  - Micro Loan
  - Finance Loan (with diminishing balance)
  - Poli Loan

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Loan Types

### Daily Loan
- Installment period: Days
- Interest calculation: Monthly interest divided by days
- Monthly interest rate: 10%

### Speed Loan
- Installment period: Months
- Interest calculation: Monthly
- Monthly interest rate: 10%

### Micro Loan
- Installment period: Weeks
- Interest calculation: Monthly
- Monthly interest rate: 8%
- Special rules:
  - 10K, 15K, 25K: Fixed 18 weeks
  - 30K and above: 18 or 36 weeks

### Finance Loan
- Installment period: Months
- Interest calculation: Diminishing balance method
- Monthly interest rate: 5%

### Poli Loan
- Installment period: Months
- Interest calculation: Monthly
- Monthly interest rate: 6%
- Monthly installment equals the interest for the month

## Technologies Used

- React 18
- Material-UI (MUI) 5
- React Router DOM
- Vite

