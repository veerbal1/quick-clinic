// After mobile verification, this component will be rendered. This component will be responsible for
// 1. Creating a new patient record in the database if not exists

import ExistingAppointMents from './appointments';

// 2. Creating a new appointment record in the database
function PostMobileVerification({ mobileNumber }: { mobileNumber: string }) {
  return (
    <div className="">
      <ExistingAppointMents />
    </div>
  );
}

export default PostMobileVerification;
