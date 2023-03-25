import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GetGiftItems } from '../../redux/features/gift/service';
import { dispatch } from '../../redux/store';
import FormHeader from './subpages/FormHeader';
import BasicForm from './subpages/step1/BasicForm';
import EventImageForm from './subpages/step2/EventImageForm';
import AddGiftForm from './subpages/step3';
import DeliveryDetailsForm from './subpages/step4/DeliveryDetailsForm';
import SummaryForm from './subpages/step5/SummaryForm';
import Stepper from './subpages/Stepper';
import EventPreview from './subpages/EventPreview'
import { useLocation } from 'react-router-dom';

const Index = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();

  useEffect(() => {
    dispatch(GetGiftItems());
  }, []);
  return (
    <Box py={step !==6 ? '4' : '0'}>
      {step !== 6 && 
        <>
        <FormHeader step={step} setStep={setStep} />
        <Stepper step={step} />
        </> 
      }
      <Box>
        {step === 1 && <BasicForm step={step} setStep={setStep} />}
        {step === 2 && <EventImageForm step={step} setStep={setStep} />}
        {step === 3 && <AddGiftForm step={step} setStep={setStep}/>}
        {step === 4 && <DeliveryDetailsForm step={step} setStep={setStep} />}
        {step === 5 && <SummaryForm setStep={setStep} />}
        {step === 6 && <EventPreview setStep={setStep} />}
      </Box>
    </Box>
  );
};

export default Index;
