import Link from 'next/link';
import React from 'react';

const StepIndicator = ({
  currentStep,
  steps,
  id,
}: {
  currentStep: number;
  steps: { text: string; href: string }[];
  id: string;
}) => {
  return (
    <ul className='flex list-none items-center text-xs'>
      {steps.map((step, index) => {
        return (
          <li
            key={step.text}
            className={`
            relative flex-1 text-right
            before:block before:h-4 before:w-4 before:rounded-full  
            after:-mt-2 after:block after:h-0 after:w-[100%] after:border-t-2 
            last:flex-grow-0 last:after:w-0
            ${
              index < currentStep
                ? 'text-primary-900 before:bg-primary-900 after:border-primary-900 dark:text-primary-500 dark:before:bg-primary-500 dark:after:border-primary-500'
                : 'text-slate-400 before:bg-slate-300 after:border-slate-300 dark:text-primary-700/40 dark:before:bg-primary-700/40 dark:after:border-primary-700/40'
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
              {index < currentStep - 1 ? (
                <Link href={step.href.replace('[id]', id)}>{step.text}</Link>
              ) : index == currentStep - 1 ? (
                <span className='font-bold'>{step.text}</span>
              ) : (
                step.text
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default StepIndicator;
