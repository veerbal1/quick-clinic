import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const mobileNumber = data.mobileNumber;
  console.log(data);
  return NextResponse.json({
    message: 'Hello, World!',
  });
};
