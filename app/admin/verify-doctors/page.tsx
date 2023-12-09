import Table from '@/app/_components/tables';
import { Button } from '@/components/ui/button';
import { CheckIcon, Cross1Icon, FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function VerifyDoctors() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Doctor Verification Page</h1>
      <Table
        caption="List of Doctors"
        rows={[
          {
            name: 'Veerbal Singh',
            email: 'veerbalsing1@gmail.com',
            specialization: 'Dentist',
            qualifications: 'BDS',
            actions: (
              <div className="flex gap-1 justify-end">
                <Link href="/admin/doctor/details">
                  <Button size="sm" variant="default">
                    <FileIcon />
                  </Button>
                </Link>
              </div>
            ),
          },
        ]}
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
            header: 'specialization',
            value: 'Specialization',
          },
          {
            header: 'qualifications',
            value: 'Qualifications',
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
