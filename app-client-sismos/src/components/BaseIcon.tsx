import  { ReactNode } from 'react';

type Props = {
  path: string;
  w?: string;
  h?: string;
  size?: string | number | null;
  className?: string;
  children?: ReactNode;
};

export default function BaseIcon({
  path,
  w = 'w-6',
  h = 'h-6',
  size = null,
  className = '',
  children,
}: Props) {
  const iconSize = size ?? 16;

  return (
    <span
      className={`inline-flex justify-center items-center ${w} ${h} ${className}`}
    >
      <svg
        className="inline-block"
        height={iconSize}
        viewBox="0 0 24 24"
        width={iconSize}
      >
        <path d={path} fill="currentColor" />
      </svg>
      {children}
    </span>
  );
}
