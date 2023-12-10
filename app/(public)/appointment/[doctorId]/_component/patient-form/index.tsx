'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MobileVerification from './mobile-verification';

function PatientForm() {
  const [mobileVerificationState, setMobileVerification] = useState({
    mobileNumber: '',
    verified: false,
  });
  return (
    <div>
      {!mobileVerificationState.verified && (
        <MobileVerification setMobileVerification={setMobileVerification} />
      )}
      {mobileVerificationState.verified && (
        <div>Mobile Verified - {mobileVerificationState.mobileNumber}</div>
      )}
    </div>
  );
}

export default PatientForm;
