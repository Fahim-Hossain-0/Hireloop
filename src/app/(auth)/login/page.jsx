import LogInForm from '@/components/LogInForm';
import React, { Suspense } from 'react';

const LogInPage = () => {
    return (
         <Suspense fallback={<div>Loading login...</div>}>
      <LogInForm />
    </Suspense>
    );
};

export default LogInPage;