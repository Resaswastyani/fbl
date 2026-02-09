// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// import {
//   Home,
//   BookOpen,
//   BarChart3,
//   User,
//   LogOut,
//   Layers,
//   ChevronDown,
//   Newspaper,
// } from "lucide-react";

// interface SidebarProps {
//   activeMenu: string;
//   setActiveMenu: (menu: string) => void;
//   sidebarOpen: boolean;
//   onCollapseChange: () => void;
//   ordersCount: number;
//   customersCount: number;
//   servicesCount: number;
//   outletsCount: number;
//   inventoryCount: number;
//   lowStockCount: number;
//   onLogout?: () => void; // opsional karena kita buat default handler

//   // data user
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   } | null;
// }

// export default function Sidebar({
//   activeMenu,
//   setActiveMenu,
//   sidebarOpen,
//   onCollapseChange,
//   ordersCount,
//   customersCount,
//   servicesCount,
//   outletsCount,
//   inventoryCount,
//   lowStockCount,
//   onLogout,
//   user,
// }: SidebarProps) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [confirmLogout, setConfirmLogout] = useState(false);

//   const menu = [
//     { name: "Dashboard", href: "/dashboard", icon: Home },
//     { name: "Kelas Forex", href: "/dashboard/kelas", icon: BookOpen },
//     { name: "Analisa Pasar", href: "/dashboard/analisa", icon: BarChart3 },
//     { name: "Materi Premium", href: "/dashboard/premium", icon: Layers },
//     { name: "Artikel", href: "/dashboard/article-management", icon: Newspaper },
//     { name: "Profil", href: "/dashboard/profil", icon: User },
//   ];

//   // default logout handler jika prop onLogout tidak diberikan
//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/auth/logout", { method: "POST" });
//       if (res.ok) {
//         // redirect ke halaman login
//         router.push("/login");
//       } else {
//         console.error("Logout gagal:", await res.json());
//       }
//     } catch (err) {
//       console.error("Error saat logout:", err);
//     }
//   };

//   return (
//     <>
//       <aside
//         className={cn(
//           "hidden md:flex flex-col w-64 bg-white border-r h-screen fixed left-0 top-0 py-6 px-4 transition-all z-0 md:z-40",
//           sidebarOpen ? "translate-x-0" : "-translate-x-64",
//         )}
//       >
//         {/* Logo */}
//         <button className="flex items-center mb-6">
//           <img
//             src="/logo-fbl.png"
//             alt="Forex Logo"
//             className="w-25 h-auto object-contain hover:opacity-90 transition"
//           />
//         </button>

//         {/* Menu */}
//         <nav className="flex flex-col gap-1">
//           {menu.map((item) => {
//             const Icon = item.icon;
//             const active = pathname === item.href;

//             return (
//               <button
//                 key={item.href}
//                 onClick={() => setActiveMenu(item.href)}
//                 className={cn(
//                   "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition text-left",
//                   activeMenu === item.href
//                     ? "bg-[#5100fd] text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100",
//                 )}
//               >
//                 <Icon size={18} />
//                 {item.name}
//               </button>
//             );
//           })}
//         </nav>

//         {/* === USER BOX (dropdown trigger) === */}
//         <div className="mt-auto">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="w-full bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg flex items-center justify-between shadow-sm"
//           >
//             <div className="flex items-center gap-3">
//               {/* Avatar */}
//               {user?.image ? (
//                 <img
//                   src={user.image}
//                   className="w-10 h-10 rounded-full object-cover"
//                   alt="avatar"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-[#5100fd] text-white flex items-center justify-center font-bold">
//                   {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
//                 </div>
//               )}

//               <div className="flex flex-col text-left">
//                 <span className="text-sm font-semibold text-gray-800">
//                   {user?.name ?? "User"}
//                 </span>
//                 <span className="text-xs text-gray-500">{user?.email}</span>
//               </div>
//             </div>

//             <ChevronDown
//               size={18}
//               className={cn(
//                 "transition",
//                 dropdownOpen ? "rotate-180" : "rotate-0",
//               )}
//             />
//           </button>

//           {/* === DROPDOWN MENU === */}
//           {dropdownOpen && (
//             <div className="mt-2 bg-white border rounded-lg shadow-md overflow-hidden animate-fadeIn">
//               <button
//                 onClick={() => setConfirmLogout(true)}
//                 className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
//               >
//                 <LogOut size={18} />
//                 Keluar
//               </button>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* === POPUP KONFIRMASI LOGOUT === */}
//       {confirmLogout && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
//             <h3 className="text-lg font-semibold mb-2">Konfirmasi Keluar</h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Apakah kamu yakin ingin keluar?
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setConfirmLogout(false)}
//                 className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
//               >
//                 Batal
//               </button>

//               <button
//                 onClick={() => {
//                   setConfirmLogout(false);
//                   if (onLogout) {
//                     onLogout(); // gunakan prop jika ada
//                   } else {
//                     handleLogout(); // default
//                   }
//                 }}
//                 className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Keluar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// SideBar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Home,
  BookOpen,
  BarChart3,
  User,
  LogOut,
  Layers,
  ChevronDown,
  Newspaper,
} from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  sidebarOpen: boolean;
  onCollapseChange: () => void;
  ordersCount: number;
  customersCount: number;
  servicesCount: number;
  outletsCount: number;
  inventoryCount: number;
  lowStockCount: number;
  onLogout?: () => void;
  onNavigate?: (menu: string) => void; // ✅ TAMBAHAN: untuk navigasi internal
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function Sidebar({
  activeMenu,
  setActiveMenu,
  sidebarOpen,
  onCollapseChange,
  ordersCount,
  customersCount,
  servicesCount,
  outletsCount,
  inventoryCount,
  lowStockCount,
  onLogout,
  onNavigate, // ✅ TAMBAHAN
  user,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  // ✅ UPDATE: Menu dengan key yang sesuai dengan ForexDashboardLMS
  const menu = [
    { name: "Dashboard", key: "dashboard", href: "/dashboard", icon: Home },
    {
      name: "Kelas Forex",
      key: "courses",
      href: "/dashboard/kelas",
      icon: BookOpen,
    },
    {
      name: "Analisa Pasar",
      key: "analysis",
      href: "/dashboard/analisa",
      icon: BarChart3,
    },
    {
      name: "Materi Premium",
      key: "premium",
      href: "/dashboard/premium",
      icon: Layers,
    },
    {
      name: "Artikel",
      key: "articles",
      href: "/dashboard/articles",
      icon: Newspaper,
    }, // ✅ samakan dengan ForexDashboardLMS
    { name: "Profil", key: "profile", href: "/dashboard/profil", icon: User },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout gagal:", await res.json());
      }
    } catch (err) {
      console.error("Error saat logout:", err);
    }
  };

  const handleMenuClick = (item: (typeof menu)[0]) => {
    // ✅ Jika ada onNavigate prop, gunakan itu (untuk ForexDashboardLMS)
    if (onNavigate) {
      onNavigate(item.key);
      setActiveMenu(item.key);
    } else {
      // Fallback ke router biasa
      router.push(item.href);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex flex-col w-64 bg-white border-r h-screen fixed left-0 top-0 py-6 px-4 transition-all z-0 md:z-40",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
        )}
      >
        {/* Logo */}
        <button className="flex items-center mb-6">
          <img
            src="/logo-fbl.png"
            alt="Forex Logo"
            className="w-25 h-auto object-contain hover:opacity-90 transition"
          />
        </button>

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.key;

            return (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition text-left w-full",
                  isActive
                    ? "bg-[#5100fd] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* USER BOX */}
        <div className="mt-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              {user?.image ? (
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#5100fd] text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </div>
              )}

              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-800">
                  {user?.name ?? "User"}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>

            <ChevronDown
              size={18}
              className={cn(
                "transition",
                dropdownOpen ? "rotate-180" : "rotate-0",
              )}
            />
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="mt-2 bg-white border rounded-lg shadow-md overflow-hidden animate-fadeIn">
              <button
                onClick={() => setConfirmLogout(true)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
              >
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* POPUP KONFIRMASI LOGOUT */}
      {confirmLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Keluar</h3>
            <p className="text-sm text-gray-600 mb-6">
              Apakah kamu yakin ingin keluar?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  setConfirmLogout(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    handleLogout();
                  }
                }}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
