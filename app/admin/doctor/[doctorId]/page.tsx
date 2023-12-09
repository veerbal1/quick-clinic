import { Button } from '@/components/ui/button';
import { CheckIcon } from '@radix-ui/react-icons';

function DoctorDetails() {
  return (
    <div className="bg-white rounded px-4 md:px-0">
      <h1 className="text-lg font-bold mb-4 text-muted-foreground">
        Doctor Details
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-green-600">
          Dr. Veerbal Singh{' '}
          <span className="text-sm text-muted-foreground font-normal">
            (He/Him)
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          MBBS, MD - General Medicine, DM - Cardiology
        </p>
        <hr />
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="left">
            <p className="leading-7 text-sm text-justify">
              Experience over 10 years in the field of Cardiology and Internal
              Medicine with special interest in Interventional Cardiology. Have
              been trained in the field of Cardiology at the prestigious Escorts
              Heart Institute and Research Centre, New Delhi. Have been trained
              in the field of Internal Medicine at the prestigious Post Graduate
              Institute of Medical Education and Research, Chandigarh
            </p>
          </div>
          <div className="right flex flex-col gap-2">
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Specializations
              </h1>
              <p className="leading-7 text-sm">
                Cardiologist, Interventional Cardiologist, Internal Medicine
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Qualifications
              </h1>
              <p className="leading-7 text-sm">
                MBBS, MD - General Medicine, DM - Cardiology
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold text-muted-foreground">
                Experience (Years)
              </h1>
              <p className="leading-7 text-sm">10</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">
              Verification Status
            </h1>
            <p className="leading-7 text-sm">
              <span className="text-green-600 flex items-center justify-start">
                <CheckIcon className="mr-2" /> Verified
              </span>
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">
              Unique ID
            </h1>
            <p className="leading-7 text-sm">D123456</p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">Rating</h1>
            <p className="leading-7 text-sm">4.5</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <div>
            <h1 className="text-lg font-bold text-muted-foreground">Contact</h1>
            <p className="leading-2 text-sm">
              <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
            <p className="leading-2 text-sm">
              <a href="mailto:veerbal@gmail.com">veerbal1@gmail.com</a>
            </p>
            <p className="leading-2 text-sm">
              <a href="https://www.google.com/maps/place/Chandigarh">
                Sector 16, Chandigarh
              </a>
            </p>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-end">
          <Button variant="destructive">Reject</Button>
          <Button variant="default" className="ml-2">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
