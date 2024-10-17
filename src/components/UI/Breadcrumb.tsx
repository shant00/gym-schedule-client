"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


const Breadcrumb: React.FC = () => {

  const pathname = usePathname();
  const pathnames: string[] = pathname.split('/').filter((x: string) => x);

  return (
    <nav className="flex  text-sm text-gray-600">
      <Link href="/" className="hover:underline">Home</Link>
      {pathnames.map((value: string, index: number) => {
        const to: string = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast: boolean = index === pathnames.length - 1;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        return (
          <div key={to} className="flex items-center">
            <span className="mx-1">/</span>
            {isLast ? (
              <span>{capitalizedValue}</span>
            ) : (
              <Link href={to} className="hover:underline">
                {capitalizedValue}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
