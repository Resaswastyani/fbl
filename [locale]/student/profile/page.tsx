// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Calendar,
//   Shield,
//   BookOpen,
//   Award,
//   Loader2,
//   Save,
//   Edit3,
//   Camera,
// } from "lucide-react";
// import { useCart } from "@/app/context/cart-context";

// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   _count?: {
//     enrollments: number;
//     orders: number;
//   };
// }

// interface EnrollmentStats {
//   total: number;
//   completed: number;
//   inProgress: number;
//   certificates: number;
// }

// export default function StudentProfilePage() {
//   const router = useRouter();
//   const { clearCart } = useCart();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [stats, setStats] = useState<EnrollmentStats>({
//     total: 0,
//     completed: 0,
//     inProgress: 0,
//     certificates: 0,
//   });

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);

//       // Fetch user data
//       const authRes = await fetch("/api/auth/me", {
//         credentials: "include",
//       });

//       if (authRes.status === 401) {
//         router.push("/login");
//         return;
//       }

//       const authData = await authRes.json();
//       if (!authData?.user) {
//         router.push("/login");
//         return;
//       }

//       setUser(authData.user);
//       setFormData((prev) => ({
//         ...prev,
//         name: authData.user.name || "",
//         email: authData.user.email || "",
//       }));

//       // Fetch enrollment stats
//       const enrollRes = await fetch("/api/enrollments", {
//         credentials: "include",
//       });

//       if (enrollRes.ok) {
//         const enrollData = await enrollRes.json();
//         const courses = enrollData.courses || [];

//         setStats({
//           total: courses.length,
//           completed: courses.filter((c: any) => c.progress === 100).length,
//           inProgress: courses.filter(
//             (c: any) => c.progress > 0 && c.progress < 100,
//           ).length,
//           certificates: courses.filter((c: any) => c.progress === 100).length,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage(null);

//     try {
//       const res = await fetch("/api/auth/update-profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           name: formData.name,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUser((prev) => (prev ? { ...prev, name: formData.name } : null));
//         setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
//         setIsEditing(false);
//       } else {
//         setMessage({
//           type: "error",
//           text: data.error || "Gagal memperbarui profil",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setMessage({
//         type: "error",
//         text: "Terjadi kesalahan saat memperbarui profil",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage(null);

//     if (formData.newPassword !== formData.confirmPassword) {
//       setMessage({ type: "error", text: "Password baru tidak cocok" });
//       setSaving(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/change-password", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           currentPassword: formData.currentPassword,
//           newPassword: formData.newPassword,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: "success", text: "Password berhasil diubah!" });
//         setFormData((prev) => ({
//           ...prev,
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         }));
//       } else {
//         setMessage({
//           type: "error",
//           text: data.error || "Gagal mengubah password",
//         });
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       setMessage({
//         type: "error",
//         text: "Terjadi kesalahan saat mengubah password",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     clearCart();
//     document.cookie =
//       "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//     router.push("/login");
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const getRoleBadge = (role: string) => {
//     switch (role) {
//       case "ADMIN":
//         return <Badge className="bg-red-100 text-red-700">Admin</Badge>;
//       case "MENTOR":
//         return <Badge className="bg-purple-100 text-purple-700">Mentor</Badge>;
//       default:
//         return (
//           <Badge className="bg-[#156d95]/10 text-[#156d95]">Pelanggan</Badge>
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-12 w-12 text-[#156d95] mx-auto" />
//           <p className="mt-4 text-gray-600">Memuat profil...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => router.push("/student/dashboard")}
//                 className="mr-4"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//               <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
//             </div>
//             <Button
//               variant="outline"
//               onClick={handleLogout}
//               className="text-red-600 border-red-200 hover:bg-red-50"
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Alert Message */}
//         {message && (
//           <div
//             className={`mb-6 p-4 rounded-lg ${
//               message.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Info */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Profile Card */}
//             <Card>
//               <CardContent className="p-6 text-center">
//                 <div className="relative inline-block mb-4">
//                   <div className="w-24 h-24 rounded-full bg-[#156d95] text-white flex items-center justify-center text-3xl font-bold mx-auto">
//                     {user.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                   <button className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
//                     <Camera className="h-4 w-4 text-gray-600" />
//                   </button>
//                 </div>

//                 <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
//                 <p className="text-gray-500 mb-3">{user.email}</p>
//                 {getRoleBadge(user.role)}

//                 <div className="mt-4 pt-4 border-t text-sm text-gray-500">
//                   <div className="flex items-center justify-center gap-2">
//                     <Calendar className="h-4 w-4" />
//                     Bergabung {formatDate(user.createdAt)}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Stats Card */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Statistik Belajar</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-[#156d95]/10 rounded-lg">
//                       <BookOpen className="h-5 w-5 text-[#156d95]" />
//                     </div>
//                     <span className="text-gray-600">Total Kursus</span>
//                   </div>
//                   <span className="font-bold text-lg">{stats.total}</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-yellow-100 rounded-lg">
//                       <Loader2 className="h-5 w-5 text-yellow-600" />
//                     </div>
//                     <span className="text-gray-600">Sedang Dipelajari</span>
//                   </div>
//                   <span className="font-bold text-lg">{stats.inProgress}</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <Award className="h-5 w-5 text-green-600" />
//                     </div>
//                     <span className="text-gray-600">Selesai</span>
//                   </div>
//                   <span className="font-bold text-lg">{stats.completed}</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <Shield className="h-5 w-5 text-purple-600" />
//                     </div>
//                     <span className="text-gray-600">Sertifikat</span>
//                   </div>
//                   <span className="font-bold text-lg">
//                     {stats.certificates}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Edit Forms */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Edit Profile */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Informasi Profil
//                 </CardTitle>
//                 {!isEditing && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center gap-2"
//                   >
//                     <Edit3 className="h-4 w-4" />
//                     Edit
//                   </Button>
//                 )}
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <form onSubmit={handleUpdateProfile} className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Nama Lengkap</Label>
//                       <Input
//                         id="name"
//                         value={formData.name}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             name: e.target.value,
//                           }))
//                         }
//                         placeholder="Masukkan nama lengkap"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={formData.email}
//                         disabled
//                         className="bg-gray-100"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">
//                         Email tidak dapat diubah
//                       </p>
//                     </div>

//                     <div className="flex gap-3 pt-2">
//                       <Button
//                         type="submit"
//                         className="bg-[#156d95] hover:bg-[#0d476e]"
//                         disabled={saving}
//                       >
//                         {saving ? (
//                           <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                         ) : (
//                           <Save className="h-4 w-4 mr-2" />
//                         )}
//                         Simpan
//                       </Button>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => {
//                           setIsEditing(false);
//                           setFormData((prev) => ({
//                             ...prev,
//                             name: user.name || "",
//                           }));
//                         }}
//                       >
//                         Batal
//                       </Button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                       <User className="h-5 w-5 text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Nama Lengkap</p>
//                         <p className="font-medium">{user.name}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Email</p>
//                         <p className="font-medium">{user.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                       <Shield className="h-5 w-5 text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Role</p>
//                         <p className="font-medium capitalize">
//                           {user.role.toLowerCase()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Change Password */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Shield className="h-5 w-5" />
//                   Ubah Password
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleChangePassword} className="space-y-4">
//                   <div>
//                     <Label htmlFor="currentPassword">Password Saat Ini</Label>
//                     <Input
//                       id="currentPassword"
//                       type="password"
//                       value={formData.currentPassword}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           currentPassword: e.target.value,
//                         }))
//                       }
//                       placeholder="Masukkan password saat ini"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="newPassword">Password Baru</Label>
//                     <Input
//                       id="newPassword"
//                       type="password"
//                       value={formData.newPassword}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           newPassword: e.target.value,
//                         }))
//                       }
//                       placeholder="Masukkan password baru"
//                       required
//                       minLength={6}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="confirmPassword">
//                       Konfirmasi Password Baru
//                     </Label>
//                     <Input
//                       id="confirmPassword"
//                       type="password"
//                       value={formData.confirmPassword}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           confirmPassword: e.target.value,
//                         }))
//                       }
//                       placeholder="Konfirmasi password baru"
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="bg-[#156d95] hover:bg-[#0d476e]"
//                     disabled={saving}
//                   >
//                     {saving ? (
//                       <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                     ) : (
//                       <Save className="h-4 w-4 mr-2" />
//                     )}
//                     Ubah Password
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Quick Actions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Aksi Cepat</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Button
//                     variant="outline"
//                     onClick={() => router.push("/student/my-courses")}
//                     className="justify-start"
//                   >
//                     <BookOpen className="h-4 w-4 mr-2" />
//                     Kursus Saya
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => router.push("/student/dashboard")}
//                     className="justify-start"
//                   >
//                     <User className="h-4 w-4 mr-2" />
//                     Dashboard
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  BookOpen,
  Award,
  Loader2,
  Save,
  Edit3,
  Camera,
  Key,
  AlertCircle,
  CheckCircle,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import { useCart } from "@/[locale]/context/cart-context";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
  isGoogleUser: boolean;
  providers: string[];
  _count?: {
    enrollments: number;
    orders: number;
  };
}

interface EnrollmentStats {
  total: number;
  completed: number;
  inProgress: number;
  certificates: number;
}

interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  confirmNewPassword: string;
}

interface Message {
  type: "success" | "error";
  text: string;
}

export default function StudentProfilePage() {
  const router = useRouter();
  const { clearCart } = useCart();

  // State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "security"
  >("profile");

  const [stats, setStats] = useState<EnrollmentStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    certificates: 0,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    confirmNewPassword: "",
  });

  const [message, setMessage] = useState<Message | null>(null);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Fetch User Data
      const authRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (authRes.status === 401) {
        router.push("/login");
        return;
      }

      const authData = await authRes.json();
      if (!authData?.user) {
        router.push("/login");
        return;
      }

      const userData: UserProfile = authData.user;
      setUser(userData);
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));

      // Fetch enrollment stats
      const enrollRes = await fetch("/api/enrollments", {
        credentials: "include",
      });

      if (enrollRes.ok) {
        const enrollData = await enrollRes.json();
        const courses = enrollData.courses || [];

        setStats({
          total: courses.length,
          completed: courses.filter((c: any) => c.progress === 100).length,
          inProgress: courses.filter(
            (c: any) => c.progress > 0 && c.progress < 100,
          ).length,
          certificates: courses.filter((c: any) => c.progress === 100).length,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      showMessage("error", "Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, name: formData.name } : null));
        showMessage("success", "Profil berhasil diperbarui!");
        setIsEditing(false);
      } else {
        showMessage("error", data.error || "Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("error", "Terjadi kesalahan saat memperbarui profil");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (formData.newPassword !== formData.confirmPassword) {
      showMessage("error", "Password baru tidak cocok");
      setSaving(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      showMessage("error", "Password baru minimal 6 karakter");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("success", "Password berhasil diubah!");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        showMessage("error", data.error || "Gagal mengubah password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showMessage("error", "Terjadi kesalahan saat mengubah password");
    } finally {
      setSaving(false);
    }
  };

  // Handler untuk Google user menambahkan password
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      showMessage("error", "Password tidak cocok");
      setSaving(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      showMessage("error", "Password minimal 6 karakter");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/set-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage(
          "success",
          "Password berhasil ditambahkan! Anda sekarang bisa login dengan email dan password.",
        );
        setUser((prev) => (prev ? { ...prev, isGoogleUser: false } : null));
        setFormData((prev) => ({
          ...prev,
          newPassword: "",
          confirmNewPassword: "",
        }));
        setActiveTab("profile");
      } else {
        showMessage("error", data.error || "Gagal menambahkan password");
      }
    } catch (error) {
      console.error("Error setting password:", error);
      showMessage("error", "Terjadi kesalahan saat menambahkan password");
    } finally {
      setSaving(false);
    }
  };

  // Handler untuk unlink Google account
  const handleUnlinkGoogle = async () => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus koneksi Google? Anda harus memiliki password untuk login.",
      )
    ) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/unlink-google", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("success", "Koneksi Google berhasil dihapus");
        setUser((prev) =>
          prev
            ? {
                ...prev,
                providers: prev.providers.filter((p) => p !== "google"),
              }
            : null,
        );
      } else {
        showMessage("error", data.error || "Gagal menghapus koneksi Google");
      }
    } catch (error) {
      console.error("Error unlinking Google:", error);
      showMessage("error", "Terjadi kesalahan saat menghapus koneksi");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearCart();
      document.cookie =
        "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push("/login");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Admin
          </Badge>
        );
      case "MENTOR":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Mentor
          </Badge>
        );
      default:
        return (
          <Badge className="bg-[#156d95]/10 text-[#156d95] hover:bg-[#156d95]/10">
            Pelanggan
          </Badge>
        );
    }
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#156d95] mx-auto" />
          <p className="mt-4 text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/student/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Message*/}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile-info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#156d95] text-white flex items-center justify-center text-3xl font-bold mx-auto overflow-hidden">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition shadow-sm">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 mb-3">{user.email}</p>

                <div className="flex items-center justify-center gap-2 mb-3">
                  {getRoleBadge(user.role)}
                </div>

                {/* Google Badge*/}
                {user.isGoogleUser && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm mb-3">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google Account
                  </div>
                )}

                <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Bergabung {formatDate(user.createdAt)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === "profile"
                        ? "bg-[#156d95]/10 text-[#156d95] font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    Informasi Profil
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === "password"
                        ? "bg-[#156d95]/10 text-[#156d95] font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Key className="h-5 w-5" />
                    {user.isGoogleUser ? "Tambah Password" : "Ubah Password"}
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === "security"
                        ? "bg-[#156d95]/10 text-[#156d95] font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Shield className="h-5 w-5" />
                    Keamanan & Koneksi
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistik Belajar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#156d95]/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-[#156d95]" />
                    </div>
                    <span className="text-gray-600">Total Kursus</span>
                  </div>
                  <span className="font-bold text-lg">{stats.total}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Loader2 className="h-5 w-5 text-yellow-600" />
                    </div>
                    <span className="text-gray-600">Sedang Dipelajari</span>
                  </div>
                  <span className="font-bold text-lg">{stats.inProgress}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-600">Selesai</span>
                  </div>
                  <span className="font-bold text-lg">{stats.completed}</span>
                </div>

                {/* <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-600">Sertifikat</span>
                  </div>
                  <span className="font-bold text-lg">
                    {stats.certificates}
                  </span>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informasi Profil
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Email tidak dapat diubah
                        </p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          className="bg-[#156d95] hover:bg-[#0d476e]"
                          disabled={saving}
                        >
                          {saving ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Simpan
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData((prev) => ({
                              ...prev,
                              name: user.name || "",
                            }));
                          }}
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Nama Lengkap</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="font-medium capitalize">
                            {user.role.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      {user.isGoogleUser && (
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <svg
                            className="h-5 w-5 text-blue-600 mt-0.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          <div>
                            <p className="font-medium text-blue-900">
                              Akun Google.
                            </p>
                            <p className="text-sm text-blue-700">
                              Akun ini terhubung dengan Google. Anda dapat
                              menambahkan password untuk login dengan email dan
                              password.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab: Password */}
            {activeTab === "password" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    {user.isGoogleUser ? "Tambahkan Password" : "Ubah Password"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.isGoogleUser ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900">
                              Akun Google Terdeteksi
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              Akun Anda saat ini hanya dapat login menggunakan
                              Google. Tambahkan password untuk mengaktifkan
                              login dengan email dan password.
                            </p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSetPassword} className="space-y-4">
                        <div>
                          <Label htmlFor="newGooglePassword">
                            Password Baru
                          </Label>
                          <Input
                            id="newGooglePassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                            placeholder="Minimal 6 karakter"
                            required
                            minLength={6}
                          />
                        </div>

                        <div>
                          <Label htmlFor="confirmGooglePassword">
                            Konfirmasi Password
                          </Label>
                          <Input
                            id="confirmGooglePassword"
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                confirmNewPassword: e.target.value,
                              }))
                            }
                            placeholder="Ulangi password"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="bg-[#156d95] hover:bg-[#0d476e]"
                          disabled={saving}
                        >
                          {saving ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Tambahkan Password
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">
                          Password Saat Ini
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          placeholder="Masukkan password saat ini"
                          required
                        />
                      </div>

                      <Separator />

                      <div>
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Minimal 6 karakter"
                          required
                          minLength={6}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">
                          Konfirmasi Password Baru
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Ulangi password baru"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-[#156d95] hover:bg-[#0d476e]"
                        disabled={saving}
                      >
                        {saving ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Ubah Password
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab: Security */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Connected Accounts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      Akun Terhubung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Google Connection */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white border rounded-lg">
                          <svg className="h-6 w-6" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-500">
                            {user.providers?.includes("google")
                              ? "Terhubung"
                              : "Tidak terhubung"}
                          </p>
                        </div>
                      </div>
                      {user.providers?.includes("google") ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleUnlinkGoogle}
                          disabled={user.isGoogleUser || saving}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = "/api/auth/google")
                          }
                        >
                          Hubungkan
                        </Button>
                      )}
                    </div>

                    {user.isGoogleUser && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-900">
                              Tidak Dapat Menghapus Google
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Anda harus menambahkan password terlebih dahulu
                              sebelum dapat menghapus koneksi Google.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Zona Berbahaya
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/50">
                      <div>
                        <p className="font-medium text-gray-900">
                          Logout dari Semua Perangkat
                        </p>
                        <p className="text-sm text-gray-500">
                          Keluar dari semua sesi aktif
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Actions - Only show on profile tab */}
            {activeTab === "profile" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/student/my-courses")}
                      className="justify-start"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Kursus Saya
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/student/dashboard")}
                      className="justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Import LogOut icon
import { LogOut } from "lucide-react";
