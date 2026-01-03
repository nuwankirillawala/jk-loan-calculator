import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function CalculatorLayout({ title, description, children }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            JK Capital Private Limited
          </Typography>
        </Box>
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>

          {children}
        </Paper>
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

export default CalculatorLayout

