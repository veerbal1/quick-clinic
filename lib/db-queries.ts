'use server';

import { createClient } from '@vercel/postgres';
import { QuickClinicDoctor } from './definitions';

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

// Type: QuickClinicDoctor
export const getDoctorDetails = async (doctorId: string) => {
  const client = createClient();
  await client.connect();
  try {
    const res = await client.sql<QuickClinicDoctor>`
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
                u.id = d.doctorId
            WHERE
                d.doctorId = ${doctorId};
        `;
    if (res.rows.length === 0) {
      return {
        status: 'failed',
        message: 'Doctor not found',
        date: null,
      };
    }
    return {
      status: 'success',
      data: res.rows[0],
      message: 'Doctor details fetched successfully',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getAppointments = async (doctorId: string, date: Date) => {
  const client = createClient();
  await client.connect();
  try {
    const { rows } = await client.sql`
    SELECT 
    a.id as appointmentId,
    a.date,
    a.tokennumber,
    a.status,
    a.healthissues,
    a.doctorremarks,

    p.name,
    p.dateofbirth,
    p.gender,
    p.address,
    p.mobilenumber
FROM 
    quick_clinic_appointments AS a
INNER JOIN
    quick_clinic_patients AS p
ON a.patientId = p.id
WHERE
    a.doctorId = ${doctorId} 
AND
    a.date = ${date.toDateString()}
    ;
        `;
    console.log('Appointments', rows);
    return {
      status: 'success',
      data: rows,
      message: 'Appointments fetched successfully',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
