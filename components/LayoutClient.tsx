"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import DisclaimerPreview from "./DisclaimerPreview";
import { Header } from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "@/components/whatsappFloat";
import WebinarPopup from "@/components/WebinarPopup";
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
    pathname.startsWith("/student/") ||
    pathname.startsWith("/course/");

  // Jangan tampilkan disclaimer di halaman disclaimer dan halaman auth
  const showDisclaimer =
    pathname !== "/disclaimer" &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/forgot-password" &&
    pathname !== "/reset-password" &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/student/") &&
    !pathname.startsWith("/dashboard");

  // Jangan tampilkan header di halaman auth tertentu (opsional)
  const hideHeader =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/course/") ||
    pathname.startsWith("/student/") ||
    pathname.startsWith("/dashboard");

  const hideWhatsApp =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  const hideFooter =
    pathname.startsWith("/dashboard") || pathname.startsWith("/student/");

  const showWebinarPopup =
    pathname !== "/login" &&
    pathname !== "/signup";

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

      {!hideWhatsApp && <WhatsAppFloat />}
      {showWebinarPopup && <WebinarPopup />}
    </div>
  );
}
