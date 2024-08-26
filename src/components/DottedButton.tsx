import React from "preact/compat";

const DottedButton = ({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={` ${className} rounded-2xl bg-black  min-w-52  border-dashed border-white  px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:bg-slate-900 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none`}
    >
      {children}
    </button>
  );
};

export default DottedButton;
