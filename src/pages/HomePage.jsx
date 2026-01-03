import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
import {
  AccountBalance,
  Speed,
  BusinessCenter,
  TrendingUp,
  CalendarToday,
} from '@mui/icons-material'

const loanTypes = [
  {
    id: 'daily',
    name: 'Daily Loan',
    path: '/daily-loan',
    icon: <CalendarToday sx={{ fontSize: 40 }} />,
    description: 'Calculate your daily loan installment with flexible repayment options.',
    color: '#1976d2',
    bgColor: '#e3f2fd',
    hoverBgColor: '#bbdefb',
  },
  {
    id: 'speed',
    name: 'Speed Loan',
    path: '/speed-loan',
    icon: <Speed sx={{ fontSize: 40 }} />,
    description: 'Quick and easy monthly installment calculation for speed loans.',
    color: '#d32f2f',
    bgColor: '#ffebee',
    hoverBgColor: '#ffcdd2',
  },
  {
    id: 'micro',
    name: 'Micro Loan',
    path: '/micro-loan',
    icon: <BusinessCenter sx={{ fontSize: 40 }} />,
    description: 'Weekly installment plans for micro loans with competitive rates.',
    color: '#388e3c',
    bgColor: '#e8f5e9',
    hoverBgColor: '#c8e6c9',
  },
  {
    id: 'finance',
    name: 'Finance Loan',
    path: '/finance-loan',
    icon: <AccountBalance sx={{ fontSize: 40 }} />,
    description: 'Monthly installment with diminishing balance calculation.',
    color: '#f57c00',
    bgColor: '#fff3e0',
    hoverBgColor: '#ffe0b2',
  },
  {
    id: 'poli',
    name: 'Poli Loan',
    path: '/poli-loan',
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    description: 'Monthly installment where payment equals monthly interest.',
    color: '#7b1fa2',
    bgColor: '#f3e5f5',
    hoverBgColor: '#e1bee7',
  },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              letterSpacing: '1px',
            }}
          >
            JK Capital Private Limited
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem' },
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Loan Calculator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Choose the loan type that best fits your needs and calculate your installment
            payments with ease.
          </Typography>
        </Box>

      <Grid container spacing={3}>
        {loanTypes.map((loan) => (
          <Grid item xs={12} sm={6} md={4} key={loan.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: loan.bgColor,
                borderTop: `4px solid ${loan.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  backgroundColor: loan.hoverBgColor,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 3 }}>
                <Box sx={{ color: loan.color, mb: 2 }}>{loan.icon}</Box>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom 
                  fontWeight={600}
                  sx={{ color: loan.color }}
                >
                  {loan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {loan.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(loan.path)}
                  sx={{ 
                    px: 4,
                    backgroundColor: loan.color,
                    '&:hover': {
                      backgroundColor: loan.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Calculate
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          This solution is designed by{' '}
          <Typography
            component="span"
            variant="body2"
            sx={{ fontWeight: 600, color: 'primary.main' }}
          >
            Ceyapps Global Solutions
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default HomePage

