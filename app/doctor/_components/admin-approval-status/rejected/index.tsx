function RejectedStatus({ doctorName }: { doctorName: string }) {
  return (
    <div className="flex justify-center px-12">
      <div className="max-w-2xl mx-auto mt-4">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-left">
          Dear Dr. {doctorName}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          We regret to inform you that your registration with QuickClinic has
          been rejected. We appreciate your interest, and we understand that
          this decision may be disappointing.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
          Rejection Details:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-justify">
          <li>
            <b>Reason for Rejection: </b> Unfortunately, your submitted
            qualifications do not meet our required standards for medical
            practitioners.
          </li>
          <li>
            <b>Next Steps:</b> If you believe this decision is in error or you
            have additional information to provide, please contact our support
            team at support@quickclinic.com.
          </li>
        </ul>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          Thank you for considering QuickClinic. We wish you the best in your
          future endeavors.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-left">
          Best Regards,
          <br />
          <b>The QuickClinic Team</b>
        </p>
      </div>
    </div>
  );
}

export default RejectedStatus;
