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

// Get doctor details using doctor code for public appoinment
export const getDoctorDetailsByDoctorCode = async (doctorCode: string) => {
  try {
    const client = createClient();
    await client.connect();
    const { rows } = await client.sql`
    SELECT u.name, d.specialization, d.verifiedstatus, d.doctorcode, d.contactnumber, d.location, d.rating, d.experience
    FROM quick_clinic_doctors AS d
    INNER JOIN quick_clinic_users AS u
    ON d.doctorId = u.id
    WHERE d.doctorCode = ${doctorCode}
    `;
    if (rows.length === 0) {
      return {
        status: 'failed',
        message: 'Doctor not found',
        data: null,
      };
    }
    return {
      status: 'success',
      data: rows[0],
      message: 'Doctor details fetched successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

// Get patient details using mobile number

export const getAppointmentDetails = async (appointmentId: string) => {
  try {
    const client = createClient();
    await client.connect();

    const { rows } = await client.sql`
      SELECT
        aq.id AS appointment_id,
        aq.patientId AS patient_id,
        aq.tokenNumber AS token_number,
        aq.date AS appointment_date,
        aq.doctorremarks AS appointment_doctor_remarks,
        aq.status AS appointment_status,
        aq.healthIssues AS appointment_health_issue,
        u.name AS doctor_name,
        u.email AS doctor_email,
        u.role AS doctor_role,
        d.gender AS doctor_gender,
        d.specialization AS doctor_specialization,
        d.verifiedStatus AS doctor_verified_status,
        d.doctorCode AS doctor_code,
        d.experience AS doctor_experience,
        d.contactNumber AS doctor_contact_number,
        d.location AS doctor_location,
        d.rating AS doctor_rating,
        p.name AS patient_name,
        p.dateOfBirth AS patient_dob,
        p.gender AS patient_gender,
        p.address AS patient_address
      FROM quick_clinic_appointments AS aq
      INNER JOIN quick_clinic_doctors AS d ON aq.doctorId = d.doctorId
      INNER JOIN quick_clinic_patients AS p ON aq.patientId = p.id
      INNER JOIN quick_clinic_users AS u ON d.doctorId = u.id
      WHERE aq.id = ${appointmentId}
    `;

    if (rows.length === 0) {
      return {
        status: 'status',
        message: 'Appointment not found',
        data: null,
      };
    }
    return {
      status: 'success',
      data: rows[0],
      message: 'Appointment details fetched successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getPatientHistory = async (patientId: string) => {
  try {
    const client = createClient();
    await client.connect();

    // quick_clinic_appointments
    const { rows } = await client.sql`
      SELECT ap.date, 
             ap.healthissues,
             ap.doctorremarks
      FROM 
              quick_clinic_appointments 
      AS 
              ap 
      WHERE 
              ap.patientId = ${patientId} 
      AND 
              ap.status = 'completed';
    `;
    return {
      status: 'success',
      data: rows,
      message: 'Patient history fetched successfully',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
