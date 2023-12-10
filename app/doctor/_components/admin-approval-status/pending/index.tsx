function PendingStatus({ doctorName }: { doctorName: string }) {
  return (
    <div className="flex justify-center px-6">
      <div className="max-w-2xl mx-auto mt-4">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-left">
          Dear Dr. {doctorName}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          Thank you for registering with QuickClinic! We're thrilled to have you
          on board as a valued member of our medical community.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          Your registration is currently pending verification by our team. Our
          commitment to maintaining the highest standards of professionalism and
          trustworthiness is a top priority.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
          Next Steps:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-justify">
          <li>
            <b>Verification Process: </b> Our admin team will carefully review
            your credentials and qualifications. This may take up to 1-2
            business days.
          </li>
          <li>
            <b>Stay Informed:</b> You will receive a notification once your
            verification is complete. In the meantime, feel free to check the
            status on your dashboard.
          </li>
          <li>
            <b>Additional Information:</b> If our team requires any additional
            information or clarification, we'll reach out to you promptly.
          </li>
        </ul>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          We appreciate your patience as we ensure the integrity of our medical
          community. Once verified, you'll have full access to your dashboard,
          including appointment management and patient interactions.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
          Thank you for choosing QuickClinic. We look forward to having you as
          an active member of our platform.
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

export default PendingStatus;
