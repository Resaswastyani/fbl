"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useCart } from "@/app/context/cart-context";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
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

export default function StudentProfilePage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<EnrollmentStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    certificates: 0,
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Fetch user data
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

      setUser(authData.user);
      setFormData((prev) => ({
        ...prev,
        name: authData.user.name || "",
        email: authData.user.email || "",
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
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

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
        setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
        setIsEditing(false);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Gagal memperbarui profil",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat memperbarui profil",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Password baru tidak cocok" });
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
        setMessage({ type: "success", text: "Password berhasil diubah!" });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setMessage({
          type: "error",
          text: data.error || "Gagal mengubah password",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat mengubah password",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearCart();
    document.cookie =
      "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
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
        return <Badge className="bg-red-100 text-red-700">Admin</Badge>;
      case "MENTOR":
        return <Badge className="bg-purple-100 text-purple-700">Mentor</Badge>;
      default:
        return (
          <Badge className="bg-[#156d95]/10 text-[#156d95]">Pelanggan</Badge>
        );
    }
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
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#156d95] text-white flex items-center justify-center text-3xl font-bold mx-auto">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 mb-3">{user.email}</p>
                {getRoleBadge(user.role)}

                <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Bergabung {formatDate(user.createdAt)}
                  </div>
                </div>
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

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-600">Sertifikat</span>
                  </div>
                  <span className="font-bold text-lg">
                    {stats.certificates}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Profile */}
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
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium capitalize">
                          {user.role.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Ubah Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Password Saat Ini</Label>
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
                      placeholder="Masukkan password baru"
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
                      placeholder="Konfirmasi password baru"
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
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
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
          </div>
        </div>
      </main>
    </div>
  );
}
