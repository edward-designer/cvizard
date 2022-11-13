const JobNew = ({
  label,
  aria,
  clickHandler,
}: {
  label: string;
  aria: string;
  clickHandler: () => void;
}) => {
  return (
    <div
      aria-label={aria}
      tabIndex={0}
      className='flex cursor-pointer flex-col place-content-center items-center bg-slate-500/10 p-14 text-slate-500 transition-all 
      focus:scale-[1.05] focus:bg-primary-500/10 focus:text-primary-900 focus:shadow-lg
      hover:scale-[1.05] hover:bg-primary-500/10 hover:text-primary-900 hover:shadow-lg'
      onClick={clickHandler}
    >
      <svg
        viewBox='0 0 200 200'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-h-40'
      >
        <circle
          cx='100'
          cy='100'
          r='100'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <path
          d='M49.4883 99.6246H99.7073M149.926 99.6246H99.7073M99.7073 99.6246V43.9092V154.044'
          stroke='currentColor'
          strokeWidth='1.2514'
          strokeLinecap='round'
        />
      </svg>

      <div className='mt-4'>{label}</div>
    </div>
  );
};

export default JobNew;
