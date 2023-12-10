import { PatientProfile } from '../type';
import HealthForm from './health-form';

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
      <div>
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
      <hr className="my-2" />
      <HealthForm />
    </div>
  );
}

export default ExistingPatient;
