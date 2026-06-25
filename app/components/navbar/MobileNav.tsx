"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {
  session: any;
  loading: boolean;
};

export default function MobileNav({
  session,
  loading,
}: Props) {
  const [open, setOpen] = useState(false);

  const isAdmin =
    session?.user?.role === "ADMIN";

  return (
    <>
      {/* Mobile Header */}

      <header className="md:hidden bg-[#131921] text-white">

        <div className="flex items-center justify-between px-4 py-3">

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="HireVexa"
              className="h-9 w-9 rounded-full bg-white p-1"
            />

            <div>

              <h2 className="font-bold">
                HireVexa
              </h2>

              <p className="text-[10px] text-[#FF9900] uppercase">
                Consultancy
              </p>

            </div>

          </Link>

          <button
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

      </header>

      {/* Drawer */}

      {open && (

        <div className="md:hidden bg-[#232F3E] text-white shadow-xl">

          {/* Greeting */}

          <div className="border-b border-[#37475A] px-5 py-5">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-[#FF9900] flex items-center justify-center">

                <User
                  className="text-[#131921]"
                />

              </div>

              <div>

                {loading ? (

                  <p>
                    Loading...
                  </p>

                ) : session ? (

                  <>
                    <p className="text-xs text-gray-300">

                      {isAdmin
                        ? "Hello,"
                        : "Welcome,"}

                    </p>

                    <h3 className="font-bold">

                      {session.user.name}

                    </h3>

                  </>

                ) : (

                  <>

                    <p className="font-semibold">

                      Hello Guest

                    </p>

                    <Link
                      href="/login"
                      className="text-[#FF9900] text-sm"
                    >
                      Sign In
                    </Link>

                  </>

                )}

              </div>

            </div>

          </div>

          {/* Links */}

          <div className="flex flex-col">

            {session ? (

              <>

                <Link
                  href={
                    isAdmin
                      ? "/admin"
                      : "/dashboard"
                  }
                  className="px-5 py-4 hover:bg-[#37475A]"
                >
                  Dashboard
                </Link>

                {isAdmin ? (

                  <>

                    <Link
                      href="/admin/jobs"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Jobs
                    </Link>

                    <Link
                      href="/admin/candidates"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Candidates
                    </Link>

                    <Link
                      href="/admin/applications"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Applications
                    </Link>

                    <Link
                      href="/admin/analytics"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Analytics
                    </Link>

                  </>

                ) : (

                  <>

                    <Link
                      href="/jobs"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Jobs
                    </Link>

                    <Link
                      href="/dashboard/applications"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Applications
                    </Link>

                    <Link
                      href="/dashboard/resume"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Resume
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      className="px-5 py-4 hover:bg-[#37475A]"
                    >
                      Profile
                    </Link>

                  </>

                )}

                <button
                  onClick={() => signOut()}
                  className="text-left px-5 py-4 text-red-400 hover:bg-[#37475A]"
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  href="/login"
                  className="px-5 py-4 hover:bg-[#37475A]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-4 hover:bg-[#37475A]"
                >
                  Register
                </Link>

                <Link
                  href="/jobs"
                  className="px-5 py-4 hover:bg-[#37475A]"
                >
                  Jobs
                </Link>

                <Link
                  href="/about"
                  className="px-5 py-4 hover:bg-[#37475A]"
                >
                  About
                </Link>

              </>

            )}

          </div>

        </div>

      )}

    </>
  );
}