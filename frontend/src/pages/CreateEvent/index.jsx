import { Box } from '@chakra-ui/react';
import React from 'react';
import BackButton from './subpages/BackButton';
import FormHeader from './subpages/FormHeader';
import BasicForm from './subpages/step1/BasicForm';
import Stepper from './subpages/Stepper';

const Index = () => {
  const [step, setStep] = useState(1)
  return (
    <Box py="4">
      <FormHeader />
      <Stepper />
      <Box>
        <BasicForm />
      </Box>
    </Box>
  );
};

export default index;
