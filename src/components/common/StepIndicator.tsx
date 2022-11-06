import React from 'react';

const StepIndicator = ({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) => {
  return (
    <ul className='flex items-center text-xs'>
      {steps.map((step, index) => {
        return (
          <li
            key={step}
            className={`
            relative flex w-[10em] text-right
            before:block before:h-4 before:w-4 before:rounded-full  
            after:mt-2 after:block after:h-0 after:w-[9em] after:border-t-2 
            last:w-4 last:after:w-0
            ${
              index < currentStep
                ? 'text-primary-900 before:bg-primary-900 after:border-primary-900'
                : 'text-primary-900/20 before:bg-primary-900/20 after:border-primary-900/20'
            }`}
          >
            <span
              className={`absolute top-5 block ${
                index === 0
                  ? ''
                  : index === steps.length - 1
                  ? '-translate-x-[calc(100%-1rem)]'
                  : '-translate-x-[calc(50%-0.5rem)]'
              } `}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default StepIndicator;
