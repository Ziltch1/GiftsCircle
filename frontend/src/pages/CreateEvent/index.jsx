import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GetGiftItems } from '../../redux/features/gift/service';
import { dispatch } from '../../redux/store';
import FormHeader from './components/FormHeader';
import BasicForm from './subpages/step1';
import EventImageForm from './subpages/step2/Index';
import AddGiftForm from './subpages/step3';
import SummaryForm from './subpages/step5/Index';
import Stepper from './components/Stepper';
import EventPreview from './subpages/EventPreview';
import DeliveryDetailsForm from './subpages/step4'

const Index = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    dispatch(GetGiftItems());
  }, []);
  return (
    <Box py={step !== 6  ? '5' : '0'}>
      {step !== 6 && (
        <>
          <FormHeader step={step} setStep={setStep} />
          <Stepper step={step} />
        </>
      )}
      <Box>
        {step === 1 && <BasicForm step={step} setStep={setStep} />}
        {step === 2 && <EventImageForm step={step} setStep={setStep} />}
        {step === 3 && <AddGiftForm step={step} setStep={setStep} />}
        {step === 4 && <DeliveryDetailsForm step={step} setStep={setStep} />}
        {step === 5 && <SummaryForm setStep={setStep} step={step} />}
        {step === 6 && <EventPreview setStep={setStep} />}
      </Box>
    </Box>
  );
};

export default Index;
