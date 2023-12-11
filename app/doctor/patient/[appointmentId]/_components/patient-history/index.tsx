import PatientHistoryTable from './table';

function PatientHistory({ patientId }: { patientId: string }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="text-xl font-bold">Patient History</h1>
      <PatientHistoryTable patientId={patientId} />
    </div>
  );
}

export default PatientHistory;
