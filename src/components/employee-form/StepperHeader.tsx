import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import {
  Person,
  ContactPhone,
  School,
  Work,
  FamilyRestroom,
  MoreHoriz,
  Check,
} from '@mui/icons-material';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#E5E7EB',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ownerState }) => ({
  backgroundColor: '#E5E7EB',
  zIndex: 1,
  color: '#9CA3AF',
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
    color: '#fff',
    boxShadow: '0 4px 20px 0 rgba(79,91,213,0.4)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
    color: '#fff',
    boxShadow: '0 4px 20px 0 rgba(34,197,94,0.4)',
  }),
}));

interface StepIconProps {
  active?: boolean;
  completed?: boolean;
  icon: React.ReactNode;
  className?: string;
}

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Person />,
    2: <ContactPhone />,
    3: <School />,
    4: <Work />,
    5: <FamilyRestroom />,
    6: <MoreHoriz />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check sx={{ fontSize: 24 }} /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

interface StepperHeaderProps {
  activeStep: number;
  steps: string[];
}

const StepperHeader: React.FC<StepperHeaderProps> = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: '100%', py: 3 }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} icon={index + 1} />
              )}
              sx={{
                '& .MuiStepLabel-label': {
                  mt: 1,
                  fontSize: '0.875rem',
                  fontWeight: activeStep === index ? 600 : 400,
                  color: activeStep === index ? '#4F5BD5' : '#6B7280',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperHeader;
