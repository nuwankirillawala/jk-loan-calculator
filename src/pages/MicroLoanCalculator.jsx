import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  MenuItem,
} from '@mui/material'
import CalculatorLayout from '../components/CalculatorLayout'

function MicroLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [weeks, setWeeks] = useState('')
  const [results, setResults] = useState(null)
  const [amountError, setAmountError] = useState('')
  const [weeksError, setWeeksError] = useState('')

  const monthlyInterestRate = 0.08 // 8%
  const weeklyInterestRate = monthlyInterestRate / 4 // Approximate weekly rate

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

    // Check minimum amount
    if (amount < 10000) {
      setAmountError('Loan amount must be at least LKR 10,000')
      return false
    }

    // If amount is exactly 10K, it's valid (fixed to 18 weeks)
    if (amount === 10000) {
      setAmountError('')
      return true
    }

    // For amounts above 10K, must be a multiple of 5K
    if (amount > 10000 && amount % 5000 !== 0) {
      const nearestLower = Math.floor(amount / 5000) * 5000
      const nearestHigher = Math.ceil(amount / 5000) * 5000
      let suggestion = ''
      
      if (nearestLower >= 10000) {
        suggestion = ` (Try LKR ${nearestLower.toLocaleString('en-US')} or LKR ${nearestHigher.toLocaleString('en-US')})`
      } else {
        suggestion = ` (Try LKR ${nearestHigher.toLocaleString('en-US')})`
      }
      
      setAmountError(`Loan amount must be a multiple of LKR 5,000${suggestion}`)
      return false
    }

    setAmountError('')
    return true
  }

  const validateWeeks = (value) => {
    if (!value || value === '') {
      setWeeksError('Please select a loan period')
      return false
    }

    const numWeeks = parseInt(value)
    const amount = parseFloat(loanAmount)
    
    // If amount is exactly 10K, must be 18 weeks
    if (amount === 10000 && numWeeks !== 18) {
      setWeeksError('Loan amount of LKR 10,000 is fixed to 18 weeks period')
      return false
    }
    
    // For amounts above 10K, can be 18 or 26 weeks
    if (amount > 10000 && numWeeks !== 18 && numWeeks !== 26) {
      setWeeksError('Loan period must be either 18 or 26 weeks')
      return false
    }

    setWeeksError('')
    return true
  }

  const calculate = () => {
    const isAmountValid = validateAmount(loanAmount)
    const isWeeksValid = validateWeeks(weeks)

    if (!isAmountValid || !isWeeksValid) {
      return
    }

    const amount = parseFloat(loanAmount)
    const numWeeks = parseInt(weeks)

    // Monthly interest calculation
    const monthlyInterest = amount * monthlyInterestRate
    const weeklyInterest = monthlyInterest / 4
    const totalMonths = numWeeks / 4
    const totalInterest = amount * monthlyInterestRate * totalMonths
    const weeklyInstallment = (amount + totalInterest) / numWeeks
    const roundedWeeklyInstallment = roundToNearest10(weeklyInstallment)

    setResults({
      loanAmount: amount,
      weeks: numWeeks,
      monthlyInterestRate: monthlyInterestRate * 100,
      monthlyInterest,
      weeklyInterest,
      totalInterest,
      weeklyInstallment,
      roundedWeeklyInstallment,
      totalAmount: amount + totalInterest,
    })
  }

  const reset = () => {
    setLoanAmount('')
    setWeeks('')
    setResults(null)
    setAmountError('')
    setWeeksError('')
  }

  const handleAmountChange = (value) => {
    setLoanAmount(value)
    
    // Validate on change if there's already an error or if field is being cleared
    if (amountError || value === '') {
      if (value === '') {
        setAmountError('')
      } else {
        validateAmount(value)
      }
    }
    
    const amount = parseFloat(value)
    
    // Auto-set weeks based on amount
    if (!isNaN(amount)) {
      if (amount === 10000) {
        // 10K is fixed to 18 weeks
        setWeeks('18')
      } else if (amount > 10000 && amount % 5000 === 0) {
        // Amounts above 10K (multiple of 5K) can choose 18 or 26 weeks
        if (!weeks || weeks === '') {
          setWeeks('18')
        }
      } else {
        // Clear weeks if amount is invalid
        if (weeks) {
          setWeeks('')
        }
      }
    }
  }

  const handleAmountBlur = () => {
    validateAmount(loanAmount)
  }

  const handleWeeksChange = (value) => {
    setWeeks(value)
    if (weeksError) {
      validateWeeks(value)
    }
  }

  const handleWeeksBlur = () => {
    validateWeeks(weeks)
  }

  return (
    <CalculatorLayout
      title="Micro Loan Calculator"
      description="Calculate your weekly installment for micro loans. Monthly interest calculation applied. Minimum: LKR 10,000 (18 weeks fixed). Above 10K: Must be a multiple of LKR 5,000 (18 or 26 weeks)."
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Loan Amount (LKR)"
            type="number"
            value={loanAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onBlur={handleAmountBlur}
            variant="outlined"
            error={!!amountError}
            helperText={amountError || "Minimum: LKR 10,000 (18 weeks fixed) | Above 10K: Must be a multiple of LKR 5,000 (e.g., 15,000, 20,000, 25,000, 30,000, etc.)"}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Number of Weeks"
            value={weeks}
            onChange={(e) => handleWeeksChange(e.target.value)}
            onBlur={handleWeeksBlur}
            variant="outlined"
            error={!!weeksError}
            disabled={parseFloat(loanAmount) === 10000}
            helperText={weeksError || (parseFloat(loanAmount) === 10000 ? "Fixed to 18 weeks for LKR 10,000" : "Select 18 or 26 weeks")}
            sx={{ mb: 2 }}
          >
            <MenuItem value="18">18 weeks</MenuItem>
            <MenuItem value="26">26 weeks</MenuItem>
          </TextField>
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
                      <Typography variant="body2" fontWeight={500}>{results.weeks} weeks</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="body2" color="text.secondary">Monthly Interest Rate:</Typography>
                      <Typography variant="body2" fontWeight={500}>{results.monthlyInterestRate.toFixed(2)}%</Typography>
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
                      <Typography variant="body2" color="text.secondary">Weekly Interest:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.weeklyInterest.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2" color="text.secondary">Installment Before Rounding:</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        LKR {results.weeklyInstallment.toLocaleString('en-US', {
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
                    Weekly Installment Value
                  </Typography>
                  <Typography 
                    variant="h3" 
                    fontWeight={700}
                    sx={{ 
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1
                    }}
                  >
                    LKR {results.roundedWeeklyInstallment?.toLocaleString('en-US', {
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

export default MicroLoanCalculator

