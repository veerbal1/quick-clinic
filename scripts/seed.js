const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const TABLE_PREFIX = 'quick_clinic';

const seedAdmin = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const tableName = `${TABLE_PREFIX}_users`;
    await client.sql`
        DROP TABLE IF EXISTS quick_clinic_users;
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

const main = async () => {
  const client = await db.connect();

  await seedAdmin(client);

  await client.end();
};

main().catch((error) => {
  console.log(error);
});
