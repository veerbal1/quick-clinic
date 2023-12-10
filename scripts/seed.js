const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const TABLE_PREFIX = 'quick_clinic';

const seedAdmin = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        DROP TABLE IF EXISTS quick_clinic_users CASCADE;
        DROP TYPE IF EXISTS USER_ROLE;
        CREATE TYPE USER_ROLE AS ENUM ('admin', 'doctor', 'patient');
        CREATE TABLE quick_clinic_users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role USER_ROLE NOT NULL,
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;

    console.log('Users table created');

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const hashedDoctorPassword = await bcrypt.hash('12345678', 10);
    await client.sql`
        INSERT INTO quick_clinic_users (name, email, password, role)
        VALUES ('Veerbal Singh', ${process.env.ADMIN_EMAIL}, ${hashedPassword}, 'admin');    
    `;
    console.log('Inserted Admin Profile');
    await client.sql`
        INSERT INTO quick_clinic_users (name, email, password, role)
        VALUES ('Veerbal Singh', 'veerbal1@gmail.com', ${hashedDoctorPassword}, 'doctor');
    `;
    console.log('Inserted Doctor Profile');
    return;
  } catch (error) {
    console.error('Error seeding quickclinic_users:', error);
    throw error;
  }
};

const seedDoctor = async (client) => {
  try {
    await client.sql`
        DROP TABLE IF EXISTS quick_clinic_doctors CASCADE;
        DROP TYPE IF EXISTS VERIFIED_STATUS;
        DROP TYPE IF EXISTS GENDER;
        
        CREATE TYPE VERIFIED_STATUS AS ENUM ('pending', 'verified', 'rejected');
        CREATE TYPE GENDER AS ENUM ('male', 'female', 'other');
        
        CREATE TABLE quick_clinic_doctors (
          doctorId UUID PRIMARY KEY REFERENCES quick_clinic_users(id) ON DELETE CASCADE,
          gender GENDER NOT NULL,
          specialization VARCHAR(255) NOT NULL,
          qualifications TEXT,
          verifiedStatus VERIFIED_STATUS DEFAULT 'pending',
          doctorCode NUMERIC(8, 0) UNIQUE,
          qrCode VARCHAR(255) UNIQUE,
          experience INT,
          bio TEXT,
          contactNumber VARCHAR(20),
          location VARCHAR(255),
          rating FLOAT
      );
    `;

    console.log('Doctors table created');

    await client.sql`
      INSERT INTO quick_clinic_doctors (doctorId, gender, specialization, qualifications, verifiedStatus, doctorCode, qrCode, experience, bio, contactNumber, location, rating)
      VALUES (
        (SELECT id FROM quick_clinic_users WHERE email = 'veerbal1@gmail.com'),
        'male',
        'Cardiologist, Interventional Cardiologist, Internal Medicine',
        'MBBS, MD - General Medicine, DM - Cardiology',
        'pending',
        '12345678',
        '12345678',
         5,
        'Experience over 10 years in the field of Cardiology and Internal Medicine with special interest in Interventional Cardiology. Have been trained in the field of Cardiology at the prestigious Escorts Heart Institute and Research Centre, New Delhi. Have been trained in the field of Internal Medicine at the prestigious Post Graduate Institute of Medical Education and Research, Chandigarh',
        '9876543210',
        'Sector 16, Chandigarh',
         4.5
      );    
    `;
    console.log('Inserted Doctor details');
    return;
  } catch (error) {
    console.error('Error seeding quickclinic_doctors:', error);
    throw error;
  }
};

const seedPatient = async (client) => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS quick_clinic_patients CASCADE;

      CREATE TABLE quick_clinic_patients (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        gender GENDER NOT NULL,
        address TEXT,
        mobileNumber VARCHAR(10) NOT NULL UNIQUE,
        email VARCHAR(255) UNIQUE
      );
    `);
    console.log('Patients table created');

    // Insert two users
    await client.query(`
      INSERT INTO quick_clinic_patients (name, dateOfBirth, gender, address, mobileNumber, email)
      VALUES
        ('John Doe', '01/03/1986', 'male', '123 Main St', '1234567890', 'john.doe@example.com'),
        ('Jane Smith', '06/07/1978', 'female', '456 Elm St', '9876543210', 'jane.smith@example.com');
    `);
    console.log('Two users inserted');
  } catch (error) {
    console.error('Error seeding quickclinic_patients:', error);
    throw error;
  }
};

const seedToken = async (client) => {
  try {
    await client.sql`
      DROP TABLE IF EXISTS quick_clinic_tokens CASCADE;

      CREATE TABLE quick_clinic_tokens (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        doctorId UUID REFERENCES quick_clinic_doctors(doctorId) ON DELETE CASCADE,
        currentTokenNumber INT NOT NULL,
        date DATE NOT NULL
      );`;
    console.log('Tokens table created');

    await client.sql`
      INSERT INTO quick_clinic_tokens (doctorId, currentTokenNumber, date)
      VALUES (
        (SELECT doctorId FROM quick_clinic_doctors WHERE doctorId = (SELECT id FROM quick_clinic_users WHERE email = 'veerbal1@gmail.com')),
        1,
        '12/10/2023'
      );`;
    console.log('Inserted Token details');
  } catch (error) {
    console.error('Error seeding quickclinic_tokens:', error);
    throw error;
  }
};

const main = async () => {
  const client = await db.connect();

  // await seedAdmin(client);
  // await seedDoctor(client);
  // await seedPatient(client);
  // await seedToken(client);

  await client.end();
};

main().catch((error) => {
  console.log(error);
});
