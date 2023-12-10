import { getDoctorDetailsByDoctorCode } from '@/lib/db-queries';
import DoctorProfile from '../../_components/card/doctor-profile';
import PatientForm from './_component/patient-form';

async function Appointment({ params }: { params: { doctorId: string } }) {
  const { status, message, data } = await getDoctorDetailsByDoctorCode(
    params.doctorId
  );
  if (status === 'failed') return <div>{message}</div>;
  return (
    <div className="px-6 flex flex-col justify-start w-full">
      <DoctorProfile
        name={data?.name}
        specialization={data?.specialization}
        rating={data?.rating}
        verified={data?.verifiedstatus === 'verified'}
        experience={data?.experience}
      />
      <div className="content mt-4">
        <PatientForm doctorId={params.doctorId} />
      </div>
    </div>
  );
}
export default Appointment;
