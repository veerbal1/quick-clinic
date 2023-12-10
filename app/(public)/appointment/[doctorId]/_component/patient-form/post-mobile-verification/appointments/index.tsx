import { useEffect } from 'react';

function ExistingAppointMents() {
  useEffect(() => {
    fetch('/api/get-patient-appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: '1234567890',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Appointments', data);
      });
  }, []);
  return <div>Existing Appoingement</div>;
}

export default ExistingAppointMents;
