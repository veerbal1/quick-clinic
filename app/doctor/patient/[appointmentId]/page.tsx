import { getAppointmentDetails } from '@/lib/db-queries';
import { notFound } from 'next/navigation';
import PatientHistory from './_components/patient-history';
import Remarks from './_components/remarks';

async function PatientDetails({
  params,
}: {
  params: {
    appointmentId: string;
  };
}) {
  const { data } = await getAppointmentDetails(params.appointmentId);
  if (!data) return notFound();
  const patient = data;
  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="text-xl font-bold">Patient Details</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">Name</h1>
          <p className="leading-7 text-sm">{patient.patient_name}</p>
        </div>
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">Age</h1>
          <p className="leading-7 text-sm">
            {new Date().getFullYear() -
              new Date(patient.patient_dob).getFullYear()}
          </p>
        </div>
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">Gender</h1>
          <p className="leading-7 text-sm">{patient.patient_gender}</p>
        </div>
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">
            Appointment Status
          </h1>
          <p className="leading-7 text-sm">{patient.appointment_status}</p>
        </div>
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">
            Health Issues
          </h1>
          <p className="leading-7 text-sm">
            {patient.appointment_health_issue}
          </p>
        </div>
        <div>
          <h1 className="text-lg font-bold text-muted-foreground">
            Token Number
          </h1>
          <p className="leading-7 text-sm">{patient.token_number}</p>
        </div>
        {data.appointment_status === 'completed' && (
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">
              Remarks by Doctor
            </h1>
            <p className="leading-7 text-sm">
              {patient.appointment_doctor_remarks}
            </p>
          </div>
        )}
      </div>
      {data.appointment_status === 'scheduled' &&
        !data.appointment_doctor_remarks && (
          <div className="grid grid-cols-2">
            <Remarks appointmentId={params.appointmentId} />
          </div>
        )}

      {/* Patient History */}
      <hr className="my-2" />
      <PatientHistory patientId={patient.patient_id} />
    </div>
  );
}

export default PatientDetails;
