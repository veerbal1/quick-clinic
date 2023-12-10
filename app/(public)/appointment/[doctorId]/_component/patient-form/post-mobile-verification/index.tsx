// After mobile verification, this component will be rendered. This component will be responsible for
// 1. Creating a new patient record in the database if not exists

import { useEffect, useState } from 'react';
import { PatientProfile } from './type';
import ExistingPatient from './existing-patient';
import NewPatient from './new-patient';

// 2. Creating a new appointment record in the database
function PostMobileVerification({
  mobileNumber,
  doctorId,
}: {
  mobileNumber: string;
  doctorId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(
    null
  );
  useEffect(() => {
    setLoading(true);
    fetch('/api/get-patient-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber: mobileNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setPatientProfile(data.data);
        } else {
          console.log('Error fetching patient profile', data);
          setError(data.message);
        }
        setLoading(false);
        console.log('User profile', data);
      });
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="">
      {patientProfile ? (
        <ExistingPatient doctorId={doctorId} patientProfile={patientProfile} />
      ) : (
        <NewPatient mobileNumber={mobileNumber} />
      )}
    </div>
  );
}

export default PostMobileVerification;
