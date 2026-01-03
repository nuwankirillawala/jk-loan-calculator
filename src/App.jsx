import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DailyLoanCalculator from './pages/DailyLoanCalculator'
import SpeedLoanCalculator from './pages/SpeedLoanCalculator'
import MicroLoanCalculator from './pages/MicroLoanCalculator'
import FinanceLoanCalculator from './pages/FinanceLoanCalculator'
import PoliLoanCalculator from './pages/PoliLoanCalculator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/daily-loan" element={<DailyLoanCalculator />} />
      <Route path="/speed-loan" element={<SpeedLoanCalculator />} />
      <Route path="/micro-loan" element={<MicroLoanCalculator />} />
      <Route path="/finance-loan" element={<FinanceLoanCalculator />} />
      <Route path="/poli-loan" element={<PoliLoanCalculator />} />
    </Routes>
  )
}

export default App

