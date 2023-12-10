import DoctorProfile from '../../_components/card/doctor-profile';
import PatientProfile from '../../_components/card/patient-profile';

function TokenNumberPage() {
  return (
    <div className="flex flex-col justify-center w-full p-6">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="antialiased text-9xl text-blue-500">12</h1>
        <h2 className="text-muted-foreground">Your Token Number</h2>
      </div>

      <div className="w-full flex flex-col justify-center">
        <PatientProfile
          age="34"
          gender="male"
          name="Bhola"
          timing="12 Dec 2021, 10:00 AM"
          healthIssues="Headache"
        />

        <DoctorProfile
          name="Veerbal Singh"
          experience={3}
          rating={4.5}
          verified={true}
          specialization="Cardiologist, Interventional Cardiologist, Internal Medicine"
        />
      </div>
    </div>
  );
}

export default TokenNumberPage;
