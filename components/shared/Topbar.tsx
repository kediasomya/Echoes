"use client";


import { SignedIn, SignOutButton, UserButton,OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/dist/client/link";
import Image from "next/image";


function Topbar() {
  return (
  <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="Logo" width={28} height={28} />

        <p className="text-heading-3-bold text-light-1 max-xs:hidden">
          Echoes
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>

            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src="/assets/logout.svg" alt="logout" height={24} width={24 } />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              baseTheme: dark,
              organizationSwitcherTrigger: "px-4 py-2"
            }
          }}
        />
      </div>
  </nav>
  


  )
}
export default Topbar;