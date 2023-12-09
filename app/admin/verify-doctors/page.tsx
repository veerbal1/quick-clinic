import Table from '@/app/_components/tables';
import { Button } from '@/components/ui/button';
import { getDoctorsList } from '@/lib/db-queries';
import { FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

async function VerifyDoctors() {
  const { data } = await getDoctorsList();
  return (
    <div className="flex flex-col gap-4">
      <h1>
        <span className="text-lg font-bold text-muted-foreground">
          Active/Inactive Doctors List
        </span>
      </h1>
      <Table
        caption="List of Doctors"
        rows={data?.map((doctor) => ({
          ...doctor,
          actions: (
            <div className="flex gap-1 justify-end">
              <Link href={`/admin/doctor/${doctor.id}`}>
                <Button size="sm" variant="default">
                  <FileIcon />
                </Button>
              </Link>
            </div>
          ),
        }))}
        columns={[
          {
            header: 'name',
            value: 'Name',
          },
          {
            header: 'email',
            value: 'Email',
          },
          {
            header: 'location',
            value: 'Location',
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

export default VerifyDoctors;
