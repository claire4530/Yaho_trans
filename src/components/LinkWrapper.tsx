import Link from "next/link";

interface LinkWrapperProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkWrapper({ href, children, className }: LinkWrapperProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

