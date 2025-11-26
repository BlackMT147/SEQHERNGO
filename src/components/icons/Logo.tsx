import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className={cn(props.className)}
  >
    <path d="M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    <path d="M12 2a10 10 0 0 0-4.472 18.156" />
    <path d="M12 2a10 10 0 0 1 4.472 18.156" />
    <path d="M2 12a10 10 0 0 1 15.528-8.32" />
    <path d="M22 12a10 10 0 0 0-15.528-8.32" />
  </svg>
);

export default Logo;
