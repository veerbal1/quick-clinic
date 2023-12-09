// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin';
};

export type QuickClinicDoctor = {
  id: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
  qualifications: string;
  gender: string;
  verifiedstatus: 'pending' | 'verified' | 'rejected';
  doctorcode: number;
  qrcode: string;
  role: string;
  createdat: Date;
  updatedat: Date;
  adminid: string;
  experience: number;
  bio: string;
  contactnumber: string;
  location: string;
  rating: number;
};
