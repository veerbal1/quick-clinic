import { createClient } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const mobileNumber = data.mobileNumber;

  try {
    const client = createClient();
    await client.connect();

    const { rows } = await client.sql`
    SELECT * FROM quick_clinic_patients WHERE mobilenumber = ${mobileNumber}
    `;
    if (rows.length === 0) {
      return NextResponse.json({
        status: 'success',
        message: 'Patient not found',
        data: null,
      });
    }
    return NextResponse.json({
      status: 'success',
      data: rows[0],
      message: 'Patient details fetched successfully',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};
