import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon, children }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
        }}
      >
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(79,91,213,0.3)',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#1A1F36',
            fontSize: '1.1rem',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3, borderColor: '#E5E7EB' }} />
      {children}
    </Box>
  );
};

export default FormSection;
