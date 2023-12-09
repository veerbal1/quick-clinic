'use server';

import { createClient } from '@vercel/postgres';

export const getDoctorsList = async () => {
  const client = createClient();
  await client.connect();
  try {
    const res = await client.sql`
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                d.gender,
                d.specialization,
                d.qualifications,
                d.verifiedStatus,
                d.doctorCode,
                d.qrCode,
                d.experience,
                d.bio,
                d.contactNumber,
                d.location,
                d.rating
            FROM 
                quick_clinic_users AS u
            INNER JOIN
                quick_clinic_doctors AS d
            ON
                u.id = d.doctorId;
        `;
    return {
      status: 'success',
      data: res.rows,
      message: 'Doctors list fetched successfully',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
