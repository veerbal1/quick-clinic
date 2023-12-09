const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const TABLE_PREFIX = 'quick_clinic';

const seedAdmin = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        DROP TABLE IF EXISTS quick_clinic_users CASCADE;
        CREATE TABLE quick_clinic_users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(100) DEFAULT 'admin',
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;

    console.log('Users table created');

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await client.sql`
        INSERT INTO quick_clinic_users (name, email, password)
        VALUES ('Veerbal Singh', ${process.env.ADMIN_EMAIL}, ${hashedPassword});    
    `;
    console.log('Inserted Admin');
    return;
  } catch (error) {
    console.error('Error seeding quickclinic_users:', error);
    throw error;
  }
};

const seedDoctor = async (client) => {
  try {
    await client.sql`
        DROP TYPE IF EXISTS verifiedStatus;
        CREATE TYPE verifiedStatus AS ENUM ('pending', 'verified', 'rejected');
        DROP TABLE IF EXISTS quick_clinic_doctors CASCADE;
        CREATE TABLE quick_clinic_doctors (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            specialization VARCHAR(255) NOT NULL,
            qualifications TEXT,
            gender VARCHAR(10) NOT NULL,
            verifiedStatus verifiedStatus DEFAULT 'pending',
            doctorCode NUMERIC(8, 0) UNIQUE,
            qrCode VARCHAR(255) UNIQUE,
            role VARCHAR(100) DEFAULT 'doctor',
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            adminId UUID REFERENCES quick_clinic_users(id) ON DELETE CASCADE,
            experience INT,
            bio TEXT,
            contactNumber VARCHAR(20),
            location VARCHAR(255),
            rating FLOAT
        );
    `;

    console.log('Doctors table created');

    const hashedPassword = await bcrypt.hash('12345678', 10);
    await client.sql`
      INSERT INTO quick_clinic_doctors (name, email, password, specialization, qualifications, gender, verifiedStatus, doctorCode, qrCode, role, createdAt, updatedAt, adminId, experience, bio, contactNumber, location, rating)
      VALUES ('Veerbal Singh', 'veerbal1@gmail.com', ${hashedPassword}, 'Cardiology', 'MBBS, MD', 'Male', 'pending', 12345678, 'ABC123', 'doctor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM quick_clinic_users WHERE email = ${process.env.ADMIN_EMAIL}), 5, 'Experienced cardiologist', '+1234567890', 'New York', 4.5);    
    `;
    console.log('Inserted Doctor');
    return;
  } catch (error) {
    console.error('Error seeding quickclinic_doctors:', error);
    throw error;
  }
};

const main = async () => {
  const client = await db.connect();

  await seedAdmin(client);
  await seedDoctor(client);

  await client.end();
};

main().catch((error) => {
  console.log(error);
});
