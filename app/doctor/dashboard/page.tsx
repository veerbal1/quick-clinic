import { auth } from '@/auth';
import { getDoctorDetails } from '@/lib/db-queries';
import Link from 'next/link';
import React from 'react';

const DoctorDashboardPage: React.FC = async () => {
  const session = await auth();
  const user = session?.user;
  const id = user?.id;
  const doctorDetails = await getDoctorDetails(id as string);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <h1>Welcome to the Doctor Dashboard</h1>
        <p>
          Here you can manage your appointments, patients, and medical records.
        </p>
      </div>

      {/* Add your dashboard components and functionality here */}

      <div className="border rounded-md p-4 mt-[5rem] flex flex-col gap-2">
        <h4 className='text-xs font-semibold'>Share this link with your patients to book appointments</h4>
        <p className='border p-1 rounded-md border-primary'>https://quick-clinic.vercel.app/appointment/{doctorDetails.data?.doctorcode}</p>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
