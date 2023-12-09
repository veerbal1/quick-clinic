import { Button } from '@/components/ui/button';
import { getDoctorDetails } from '@/lib/db-queries';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';
import VerifyDoctorButton from './_components/verify-doctor-btn';
import RejectDoctorButton from './_components/reject-doctor-btn';

async function DoctorDetails({
  params,
}: {
  params: {
    doctorId: string;
  };
}) {
  const { doctorId } = params;
  if (!doctorId) return notFound();
  const { status, data } = await getDoctorDetails(doctorId);
  if (status === 'failed') return notFound();
  return (
    <div className="bg-white rounded px-4 pb-10 md:px-0">
      <h1 className="text-lg font-bold mb-4 text-muted-foreground">
        Doctor Details
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-green-600">
          Dr. {data?.name}
          <span className="text-sm text-muted-foreground font-normal">
            {data?.gender === 'male' ? '(He/Him)' : '(She/Her)'}
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">{data?.qualifications}</p>
        <hr />
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="left">
            <p className="leading-7 text-sm text-justify">{data?.bio}</p>
          </div>
          <div className="right flex flex-col gap-2">
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Specializations
              </h1>
              <p className="leading-7 text-sm">{data?.specialization}</p>
            </div>
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Qualifications
              </h1>
              <p className="leading-7 text-sm">{data?.qualifications}</p>
            </div>
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Experience (Years)
              </h1>
              <p className="leading-7 text-sm">{data?.experience}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">
              Verification Status
            </h1>
            <p className="leading-7 text-sm">
              <span
                className={cn(
                  'flex items-center justify-start',
                  data?.verifiedstatus === 'pending' && 'text-yellow-600',
                  data?.verifiedstatus === 'rejected' && 'text-red-600',
                  data?.verifiedstatus === 'verified' && 'text-green-600'
                )}
              >
                <CheckIcon className="mr-2" />
                {data?.verifiedstatus === 'pending' && 'Pending'}
                {data?.verifiedstatus === 'rejected' && 'Rejected'}
                {data?.verifiedstatus === 'verified' && 'Verified'}
              </span>
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">
              Unique ID
            </h1>
            <p className="leading-7 text-sm">{data?.doctorcode}</p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">Rating</h1>
            <p className="leading-7 text-sm">{data?.rating}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">Contact</h1>
            <p className="leading-2 text-sm">
              <a href={`tel:+91${data?.contactnumber}`}>
                +91 {data?.contactnumber}
              </a>
            </p>
            <p className="leading-2 text-sm">
              <a href={`mailto:${data?.email}`}>{data?.email}</a>
            </p>
            <p className="leading-2 text-sm">{data?.location}</p>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-end">
          {data?.verifiedstatus === 'verified' && (
            <RejectDoctorButton id={data?.id as string} />
          )}
          {data?.verifiedstatus === 'rejected' && (
            <VerifyDoctorButton id={data?.id as string} />
          )}
          {data?.verifiedstatus === 'pending' && (
            <>
              <RejectDoctorButton id={data?.id as string} />
              <VerifyDoctorButton id={data?.id as string} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
