import { createClient } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { createAppointment } from '../util';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  console.log(data); // { patientId, doctorId as doctorCode', date, healthIssues }

  const client = createClient();
  await client.connect();

  const { lastAppointmentId, tokenNumber } = await createAppointment(
    client,
    data
  );
  return NextResponse.json({
    message: 'Appointment created successfully',
    data: {
      status: 'success',
      appointmentId: lastAppointmentId,
      tokenNumber: tokenNumber,
    },
  });
};
