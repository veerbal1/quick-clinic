import Table from '@/app/_components/tables';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { getAppointments } from '@/lib/db-queries';
import { FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

async function Appointments() {
  const session = await auth();
  if (!session) return null;
  const { data } = await getAppointments(
    session?.user.id as string,
    new Date()
  );
  return (
    <div className="flex flex-col gap-4">
      <h1>
        <span className="text-lg font-bold text-muted-foreground">
          Today's Appointments
        </span>
      </h1>
      <Table
        caption="Today's Appointments"
        rows={data?.map((patient) => ({
          ...patient,
          actions: (
            <div className="flex gap-1 justify-end">
              <Link href={`/doctor/patient/${patient.appointmentid}`}>
                <Button size="sm" variant="default">
                  <FileIcon />
                </Button>
              </Link>
            </div>
          ),
        }))}
        columns={[
          {
            header: 'tokennumber',
            value: 'Token',
          },
          {
            header: 'name',
            value: 'Name',
          },
          {
            header: 'gender',
            value: 'Gender',
          },
          {
            header: 'age',
            value: 'Age',
            cell: (row) => (
              <span>
                {new Date().getFullYear() -
                  new Date(row.dateofbirth).getFullYear()}
              </span>
            ),
          },
          {
            header: 'healthissues',
            value: 'Health Issues',
          },
          {
            header: 'status',
            value: 'Status',
          },
          {
            header: 'time',
            value: 'Time',
            cell: (row) => {
              return <span>{new Date(row.date).toLocaleTimeString()}</span>;
            },
          },
          {
            className: 'text-right',
            header: 'actions',
            value: 'Actions',
          },
        ]}
      />
    </div>
  );
}

export default Appointments;
