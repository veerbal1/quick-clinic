import { getAppointmentDetails } from '@/lib/db-queries';
import DoctorProfile from '../../_components/card/doctor-profile';
import PatientProfile from '../../_components/card/patient-profile';

async function TokenNumberPage({
  params,
}: {
  params: {
    appointmentId: string;
  };
}) {
  const { data } = await getAppointmentDetails(params.appointmentId);
  return (
    <div className="flex flex-col justify-center w-full p-6">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="antialiased text-9xl text-blue-500">
          {data?.token_number}
        </h1>
        <h2 className="text-muted-foreground">Your Token Number</h2>
      </div>

      <div className="w-full flex flex-col justify-center">
        <PatientProfile
          age={
            new Date().getFullYear() -
            new Date(data?.patient_dob.toDateString()).getFullYear()
          }
          gender={data?.patient_gender}
          name={data?.patient_name}
          timing={data?.appointment_date.toDateString()}
          healthIssues={data?.appointment_health_issue}
        />

        <DoctorProfile
          name={data?.doctor_name}
          experience={data?.doctor_experience}
          rating={data?.doctor_rating}
          verified={data?.doctor_verified_status === 'verified'}
          specialization={data?.doctor_specialization}
        />
      </div>
    </div>
  );
}

export default TokenNumberPage;
