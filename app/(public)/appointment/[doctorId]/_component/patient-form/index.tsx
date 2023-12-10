'use client';

import { Button } from '@/components/ui/button';
import { Suspense, useState } from 'react';
import MobileVerification from './mobile-verification';
import PostMobileVerification from './post-mobile-verification';

function PatientForm() {
  const [mobileVerificationState, setMobileVerification] = useState({
    mobileNumber: '',
    verified: false,
  });
  return (
    <div>
      {/* {!mobileVerificationState.verified && (
        <MobileVerification setMobileVerification={setMobileVerification} />
      )} */}
      {/* {mobileVerificationState.verified && (
        <Suspense fallback={<div>Loading Details...</div>}>
          <PostMobileVerification
            mobileNumber={mobileVerificationState.mobileNumber}
          />
        </Suspense>
      )} */}
      <PostMobileVerification
        mobileNumber={mobileVerificationState.mobileNumber}
      />
    </div>
  );
}

export default PatientForm;
