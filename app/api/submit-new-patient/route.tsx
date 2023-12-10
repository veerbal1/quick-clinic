import { createClient } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { createAppointment } from '../util';

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const client = createClient();
    await client.connect();

    const data = await req.json();
    console.log(data);

    const { rows } = await client.sql`
    INSERT INTO quick_clinic_patients (name, dateOfBirth, gender, address, mobileNumber, email)
    VALUES
      (
        ${data.name}, 
        ${data.dateOfBirth}, 
        ${data.gender}, 
        ${data.address}, 
        ${data.mobileNumber}, 
        ${data.email}) RETURNING id;
    `;
    const patientId = rows[0].id;
    console.log('Row', rows);
    // submit-new-appointment
    const { lastAppointmentId, tokenNumber } = await createAppointment(client, {
      patientId: patientId,
      doctorId: data.doctorCode,
      healthIssues: data.healthIssues,
      date: new Date().toDateString(),
    });
    console.log('Appointment created', lastAppointmentId);
    return NextResponse.json({
      status: 'success',
      message: 'Appointment created successfully',
      data: {
        status: 'success',
        appointmentId: lastAppointmentId,
        tokenNumber: tokenNumber,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};
