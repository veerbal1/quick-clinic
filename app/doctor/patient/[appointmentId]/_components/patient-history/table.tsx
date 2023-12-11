import Table from '@/app/_components/tables';
import { getPatientHistory } from '@/lib/db-queries';

async function PatientHistoryTable({ patientId }: { patientId: string }) {
  const { data } = await getPatientHistory(patientId);
  return (
    <Table
      caption="Patient History"
      columns={[
        {
          value: 'Date',
          header: 'date',
          cell: (row) => <span>{new Date(row.date).toLocaleDateString()}</span>,
        },
        {
          value: 'Health Issues',
          header: 'healthissues',
        },
        {
          value: 'Doctor Remarks',
          header: 'doctorremarks',
        },
      ]}
      rows={data}
    />
  );
}

export default PatientHistoryTable;
