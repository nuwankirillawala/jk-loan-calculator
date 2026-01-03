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

function DailyLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [days, setDays] = useState('')
  const [results, setResults] = useState(null)
  const [amountError, setAmountError] = useState('')
  const [daysError, setDaysError] = useState('')

  const monthlyInterestRate = 0.10 // 10%
  const dailyInterestRate = monthlyInterestRate / 30 // Divide by 30 days

  // Helper function to round to nearest 10
  const roundToNearest10 = (value) => {
    return Math.round(value / 10) * 10
  }

  const validateAmount = (value) => {
    if (!value || value === '') {
      setAmountError('Loan amount is required')
      return false
    }
    const amount = parseFloat(value)
    if (isNaN(amount) || amount <= 0) {
      setAmountError('Please enter a valid loan amount')
      return false
    }
    setAmountError('')
    return true
  }

  const validateDays = (value) => {
    if (!value || value === '') {
      setDaysError('Number of days is required')
      return false
    }
    const numDays = parseInt(value)
    if (isNaN(numDays) || numDays <= 0) {
      setDaysError('Please enter a valid number of days')
      return false
    }
    setDaysError('')
    return true
  }

  const calculate = () => {
    const isAmountValid = validateAmount(loanAmount)
    const isDaysValid = validateDays(days)

    if (!isAmountValid || !isDaysValid) {
      return
    }

    const amount = parseFloat(loanAmount)
    const numDays = parseInt(days)

    // Interest calculated for month and divided for days
    const monthlyInterest = amount * monthlyInterestRate
    const dailyInterest = monthlyInterest / 30
    const totalInterest = dailyInterest * numDays
    const dailyInstallment = (amount + totalInterest) / numDays
    const roundedDailyInstallment = roundToNearest10(dailyInstallment)

    setResults({
      loanAmount: amount,
      days: numDays,
      monthlyInterestRate: monthlyInterestRate * 100,
      dailyInterestRate: dailyInterestRate * 100,
      monthlyInterest,
      dailyInterest,
      totalInterest,
      dailyInstallment,
      roundedDailyInstallment,
      totalAmount: amount + totalInterest,
    })
  }

  const reset = () => {
    setLoanAmount('')
    setDays('')
    setResults(null)
    setAmountError('')
    setDaysError('')
  }

  return (
    <CalculatorLayout
      title="Daily Loan Calculator"
      description="Calculate your daily loan installment. Interest is calculated monthly and divided by days."
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Loan Amount (LKR)"
            type="number"
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(e.target.value)
              if (amountError) validateAmount(e.target.value)
            }}
            onBlur={() => validateAmount(loanAmount)}
            variant="outlined"
            error={!!amountError}
            helperText={amountError}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Number of Days"
            type="number"
            value={days}
            onChange={(e) => {
              setDays(e.target.value)
              if (daysError) validateDays(e.target.value)
            }}
            onBlur={() => validateDays(days)}
            variant="outlined"
            error={!!daysError}
            helperText={daysError}
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
                      <Typography variant="body2" fontWeight={500}>{results.days} days</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Monthly Interest Rate:</Typography>
                      <Typography variant="body2" fontWeight={500}>{results.monthlyInterestRate.toFixed(2)}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Daily Interest Rate:</Typography>
                      <Typography variant="body2" fontWeight={500}>{results.dailyInterestRate.toFixed(4)}%</Typography>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Daily Interest:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.dailyInterest.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2" color="text.secondary">Installment Before Rounding:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.dailyInstallment.toLocaleString('en-US', {
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
                    Daily Installment Value
                  </Typography>
                  <Typography 
                    variant="h3" 
                    fontWeight={700}
                    sx={{ 
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1
                    }}
                  >
                    LKR {results.roundedDailyInstallment?.toLocaleString('en-US', {
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

export default DailyLoanCalculator

