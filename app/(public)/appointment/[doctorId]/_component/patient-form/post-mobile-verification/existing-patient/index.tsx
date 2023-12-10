import { PatientProfile } from '../type';

function ExistingPatient({
  doctorId,
  patientProfile,
}: {
  doctorId: string;
  patientProfile: PatientProfile;
}) {
  return (
    <div>
      <h6 className="text-md font-bold tracking-tight text-muted-foreground mb-2">
        Set Appointment
      </h6>
      <h2 className="text-2xl font-bold tracking-tight text-blue-500">
        {patientProfile.name}
      </h2>
      <p className="text-sm text-muted-foreground">
        {/* Details */}
        <span>
          {(
            new Date().getFullYear() -
            new Date(patientProfile.dateofbirth).getFullYear()
          ).toString() + ' years old'}
        </span>
        <span>
          ,{' '}
          {patientProfile.gender.charAt(0).toUpperCase() +
            patientProfile.gender.slice(1)}
        </span>
      </p>
    </div>
  );
}

export default ExistingPatient;
