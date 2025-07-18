"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  return(
    <div className="bottombar">
      <div className= "bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              className={`bottombar_link ${isActive ? "bg-purple-500" : ""} `}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="subtle-text-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            
               
              
            </Link>
            
          );
        })}

      </div>
    </div>
  )
}
export default Bottombar;