import React, { ReactNode } from 'react';

const BlockWithImage = ({
  children,
  mobileReverse = false,
}: {
  children: ReactNode;
  mobileReverse?: boolean;
}) => {
  return (
    <div
      className={`${
        mobileReverse ? 'flex-col-reverse' : 'flex-col'
      } col-start-2 flex items-center gap-2 py-4 pb-10 sm:flex-row sm:gap-8 sm:pb-4 [&_h2]:mb-4  [&_h2]:text-slate-500 [&_h2_span]:text-primary-700`}
    >
      {children}
    </div>
  );
};

export default BlockWithImage;
