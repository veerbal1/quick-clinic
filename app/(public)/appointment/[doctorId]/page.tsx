import { getDoctorDetailsByDoctorCode } from '@/lib/db-queries';
import DoctorProfile from './_component/doctor-profile';

async function Appointment({ params }: { params: { doctorId: string } }) {
  const { status, message, data } = await getDoctorDetailsByDoctorCode(
    params.doctorId
  );
  if (status === 'failed') return <div>{message}</div>;
  return (
    <div className="px-6 flex justify-start w-full">
      <DoctorProfile
        name={data?.name}
        specialization={data?.specialization}
        rating={data?.rating}
        verified={data?.verifiedstatus === 'verified'}
        experience={data?.experience}
      />
    </div>
  );
}
export default Appointment;
