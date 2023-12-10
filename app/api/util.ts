export const createAppointment = async (client: any, data: any) => {
  const doctorData = await client.sql`
    SELECT doctorId FROM quick_clinic_doctors WHERE doctorCode = ${data.doctorId};
`;
  const doctorId = doctorData.rows[0].doctorid;
  console.log('Doctor ID: ', doctorId);

  const { rowCount } = await client.sql`
    SELECT currenttokennumber FROM quick_clinic_tokens WHERE doctorid = ${doctorId} AND date = DATE(NOW());
`;
  if (rowCount === 0) {
    await client.sql`
      INSERT INTO quick_clinic_tokens (doctorId, currentTokenNumber, date)
      VALUES (${doctorId}, 1, DATE(NOW()));
    `;
  } else {
    await client.sql`
      UPDATE quick_clinic_tokens SET currentTokenNumber = currentTokenNumber + 1 WHERE doctorId = ${doctorId} AND date = DATE(NOW());
    `;
  }
  console.log('Token number incremented successfully');
  const { rows: returnRow } = await client.sql`
    INSERT INTO quick_clinic_appointments (patientId, doctorId, date, tokenNumber, healthIssues)
    VALUES (
      ${data.patientId},
      ${doctorId},
      ${data.date},
      (SELECT currenttokennumber FROM quick_clinic_tokens WHERE doctorid = ${doctorId} AND date = DATE(NOW())),
      ${data.healthIssues}
    ) RETURNING id;`;
  console.log('Appointment created successfully', returnRow);
  const lastAppointmentId = returnRow[0].id;
  const { rows } = await client.sql`
      SELECT tokenNumber FROM quick_clinic_appointments WHERE patientId = ${data.patientId} AND doctorId = ${doctorId} AND date = ${data.date} AND id = ${lastAppointmentId};
`;
  console.log('Token number: ', rows);
  return {
    lastAppointmentId,
    tokenNumber: rows[0].tokennumber,
  };
};
