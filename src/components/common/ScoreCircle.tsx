import React from 'react';

const ScoreCircle = ({
  score,
  name,
}: {
  score: number | undefined;
  name: string;
}) => {
  return (
    <svg
      className={`flex-1 ${
        Number.isInteger(score)
          ? '[&_#percentage]:fill-slate-600 [&_#percentage]:dark:fill-primary-700'
          : 'text-transparent [&_#percentage]:fill-slate-300 [&_#percentage]:dark:fill-slate-600'
      } max-w-[8em] [&_tspan]:fill-slate-500 [&_tspan]:text-[3px] [&_tspan]:tracking-tighter 
      [&_#percentage]:text-[12px] [&_#percentage]:font-light [&_#percentage]:tracking-tighter [&_*]:transition-all
      [&_*]:duration-1000 [&_#circle-base]:stroke-slate-300 [&_#circle-base]:dark:stroke-slate-700 [&_#circle]:animate-circleZeroToScore`}
      viewBox='0 0 36 36'
    >
      <defs>
        <filter id='inset-shadow'>
          <feGaussianBlur stdDeviation='1' />
          <feComposite operator='atop' in2='SourceGraphic' />
        </filter>
      </defs>
      <path
        id='circle-base'
        filter='url(#inset-shadow)'
        d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
        fill='transparent'
        strokeWidth='2'
      ></path>
      <path
        id='circle'
        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
        strokeLinecap='round'
        strokeWidth='2'
        stroke='currentColor'
        fill='transparent'
        strokeDasharray={`${Number.isInteger(score) ? score : 0} 100`}
      ></path>
      <text textAnchor='middle' x='18' y='8'>
        <tspan id='name' x='18' dy='1.4em'>
          {name}
        </tspan>
        <tspan id='percentage' x='18' dy='0.9em'>
          {Number.isInteger(score) ? score : '--'}
        </tspan>
        <tspan id='percentageMark'>%</tspan>
      </text>
    </svg>
  );
};

export default ScoreCircle;
