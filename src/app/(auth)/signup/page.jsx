import SignUpForm from '@/components/SignUpForm';
import React, { Suspense } from 'react';

const SignUpPage = () => {
    return (
       <Suspense fallback={<div>Loading signup...</div>}>
      <SignUpForm />
    </Suspense>
    );
};

export default SignUpPage;