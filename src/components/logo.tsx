import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 4l- tendencias.d.ts-4 4 4 4" />
      <path d="M4 14l4-4 4-4" />
      <path d="M16 12h-2a2 2 0 0 0-2 2v6" />
      <path d="M18 10l2-2" />
      <path d="M12 16H8" />
      <path d="M12 20H6" />
      <path d="M12 12H9" />
    </svg>
  );
}
// Using a simplified honey dipper icon
export function HoneyDipperIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 4l-6 6 6 6" />
      <path d="M4 18l6-6 6-6" />
      <path d="m18 12 2 2" />
      <path d="m19 5-7 7" />
      <path d="M10 14l-2 2" />
    </svg>
  );
}

// A more stylized honey dipper for the logo
export function LogoIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M20 8.15c0-3.3-2.19-4.8-4.73-4.8-2.52 0-4.72 1.5-4.72 4.8 0 3.65 2.52 4.8 4.72 4.8C17.81 12.95 20 11.8 20 8.15z"></path>
            <path d="M15.27 12.95v6.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5v-6.5"></path>
            <path d="M15.27 3.35v-1.5c0-.42-.34-.75-.75-.75h-4.04c-.41 0-.75.34-.75.75v1.5"></path>
            <path d="M11.52 16h2.5"></path>
            <path d="M10.27 19.45h5"></path>
            <path d="M4.5 12.5l3.2-3.2c.4-.4 1-.4 1.4 0l3.2 3.2c.4.4.4 1 0 1.4l-3.2 3.2c-.4.4-1 .4-1.4 0l-3.2-3.2c-.4-.4-.4-1 0-1.4z"></path>
        </svg>
    )
}

export { LogoIcon as Logo }
