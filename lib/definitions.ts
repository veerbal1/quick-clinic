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
  verifiedStatus: 'pending' | 'verified' | 'rejected';
  doctorCode: number;
  qrCode: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  adminId: string;
  experience: number;
  bio: string;
  contactNumber: string;
  location: string;
  rating: number;
};
