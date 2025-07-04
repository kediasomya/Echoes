"use client";

import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              className={`leftsidebar_link ${isActive ? "bg-purple-500" : ""} `}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="flex text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-10">
        <SignedIn>
          <SignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
            <div className="flex cursor-pointer">
              <Image src="/assets/logout.svg" alt="logout" height={24} width={24} />
              <p className="gap-4 px-4 text-light-1 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
export default LeftSidebar;