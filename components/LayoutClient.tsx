"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import DisclaimerPreview from "./DisclaimerPreview";
import { Header } from "./Header";
import Footer from "./Footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideAnnouncement =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/dashboard" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/course/");

  // Jangan tampilkan disclaimer di halaman disclaimer dan halaman auth
  const showDisclaimer =
    pathname !== "/disclaimer" &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/forgot-password" &&
    pathname !== "/reset-password" &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/dashboard");

  // Jangan tampilkan header di halaman auth tertentu (opsional)
  const hideHeader =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/course/") ||
    pathname.startsWith("/dashboard");

  const hideFooter = pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Bar */}
      {!hideAnnouncement && <AnnouncementBar />}

      {/* Header */}
      {!hideHeader && <Header />}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Disclaimer Preview - sebelum footer */}
      {showDisclaimer && <DisclaimerPreview />}

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}
