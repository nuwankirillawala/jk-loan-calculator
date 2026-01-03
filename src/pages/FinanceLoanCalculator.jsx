import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material'
import CalculatorLayout from '../components/CalculatorLayout'

function FinanceLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [months, setMonths] = useState('')
  const [results, setResults] = useState(null)

  const monthlyInterestRate = 0.05 // 5%

  // Helper function to round to nearest 10
  const roundToNearest10 = (value) => {
    return Math.round(value / 10) * 10
  }

  const calculate = () => {
    const amount = parseFloat(loanAmount)
    const numMonths = parseInt(months)

    if (!amount || !numMonths || amount <= 0 || numMonths <= 0) {
      alert('Please enter valid loan amount and number of months')
      return
    }

    // Calculate all interest first, then distribute as equal installments
    const totalInterest = amount * monthlyInterestRate * numMonths
    const monthlyInstallment = (amount + totalInterest) / numMonths
    const roundedMonthlyInstallment = roundToNearest10(monthlyInstallment)
    const monthlyPrincipal = amount / numMonths
    const monthlyInterest = totalInterest / numMonths

    setResults({
      loanAmount: amount,
      months: numMonths,
      monthlyInterestRate: monthlyInterestRate * 100,
      totalInterest,
      monthlyPrincipal,
      monthlyInterest,
      monthlyInstallment,
      roundedMonthlyInstallment,
      totalAmount: amount + totalInterest,
    })
  }

  const reset = () => {
    setLoanAmount('')
    setMonths('')
    setResults(null)
  }

  return (
    <CalculatorLayout
      title="Finance Loan Calculator"
      description="Calculate your monthly installment. All interest is calculated first, then distributed as equal monthly installments."
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Loan Amount (LKR)"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Number of Months"
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={calculate} size="large">
              Calculate
            </Button>
            <Button variant="outlined" onClick={reset} size="large">
              Reset
            </Button>
          </Box>
        </Grid>

        {results && (
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Helping Values Section */}
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
                  <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
                    Calculation Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Loan Amount:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.loanAmount.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Period:</Typography>
                      <Typography variant="body2" fontWeight={500}>{results.months} months</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Monthly Interest Rate:</Typography>
                      <Typography variant="body2" fontWeight={500}>{results.monthlyInterestRate.toFixed(2)}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Monthly Principal:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.monthlyPrincipal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Monthly Interest:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.monthlyInterest.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2" color="text.secondary">Installment Before Rounding:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.monthlyInstallment.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Installment Value - Highlighted */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={4} 
                  sx={{ 
                    p: 4, 
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '100%'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                    Monthly Installment Value
                  </Typography>
                  <Typography 
                    variant="h3" 
                    fontWeight={700}
                    sx={{ 
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1
                    }}
                  >
                    LKR {results.roundedMonthlyInstallment?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) || '0'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                    Rounded to nearest 10
                  </Typography>
                </Paper>
              </Grid>

              {/* Total Interest */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    bgcolor: '#fff3e0',
                    borderLeft: '4px solid #ff9800'
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Total Interest
                  </Typography>
                  <Typography variant="h5" fontWeight={600} color="#e65100">
                    LKR {results.totalInterest.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Paper>
              </Grid>

              {/* Total Amount to Pay */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    bgcolor: '#e8f5e9',
                    borderLeft: '4px solid #4caf50'
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Total Amount to Pay
                  </Typography>
                  <Typography variant="h5" fontWeight={600} color="#2e7d32">
                    LKR {results.totalAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </CalculatorLayout>
  )
}

export default FinanceLoanCalculator

