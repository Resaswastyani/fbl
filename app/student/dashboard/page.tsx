"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ShoppingCart,
  BookOpen,
  Star,
  CheckCircle,
  LogOut,
  Menu,
  X as CloseIcon,
  GraduationCap,
} from "lucide-react";
import CourseSection from "@/components/CourseSection";
import { useCart } from "@/app/context/cart-context";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const { items: cartItems, clearCart, refreshAuth } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [certificateCount, setCertificateCount] = useState(0);

  // Check authentication dan fetch data
  const initDashboard = useCallback(async () => {
    try {
      const authRes = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
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

      if (authData.user.role !== "PELANGGAN") {
        router.push("/dashboard");
        return;
      }

      // Fetch enrolled courses
      const coursesRes = await fetch("/api/enrollments", {
        credentials: "include",
      });

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setEnrolledCourses(coursesData.courses || []);
        setCertificateCount(coursesData.certificateCount || 0);
      }
    } catch (error) {
      console.error("Initialization error:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  // Listen untuk auth changes dari komponen lain
  useEffect(() => {
    const handleAuthChange = () => {
      console.log("Auth change detected in Dashboard");
      initDashboard();
    };

    const handleLogout = () => {
      console.log("Logout detected in Dashboard");
      setUser(null);
      router.push("/login");
    };

    window.addEventListener("app-auth-change", handleAuthChange);
    window.addEventListener("app-logout", handleLogout);

    return () => {
      window.removeEventListener("app-auth-change", handleAuthChange);
      window.removeEventListener("app-logout", handleLogout);
    };
  }, [initDashboard, router]);

  // Handle logout dengan broadcast ke komponen lain
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

      // Broadcast logout event
      localStorage.setItem("logout-event", Date.now().toString());
      localStorage.removeItem("logout-event");

      // Custom event untuk same-tab
      window.dispatchEvent(new Event("app-logout"));

      // Refresh cart context
      await refreshAuth();

      router.push("/login");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatPrice = (price: string | number) => {
    const priceStr = typeof price === "number" ? price.toString() : price;
    if (priceStr === "Free") return "Free";
    const numeric = priceStr.replace(/[^0-9]/g, "");
    return numeric
      ? `Rp ${parseInt(numeric).toLocaleString("id-ID")}`
      : priceStr;
  };

  const handleViewCart = () => {
    if (cartItems.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    router.push("/student/cart");
  };

  const handleContinueLearning = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const formatLastAccessed = (date: string) => {
    if (!date) return "Belum diakses";
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hari ini";
    if (days === 1) return "Kemarin";
    if (days < 7) return `${days} hari yang lalu`;
    return d.toLocaleDateString("id-ID");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#156d95] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        {isSidebarOpen ? (
          <CloseIcon className="h-6 w-6 text-[#156d95]" />
        ) : (
          <Menu className="h-6 w-6 text-[#156d95]" />
        )}
      </button>

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 flex flex-col
        `}
      >
        <div className="p-6 border-b shrink-0 flex justify-center">
          <Image
            src="/logo-fbl.png"
            alt="EduTrade Logo"
            width={128}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium hover:bg-[#156d95]/10"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push("/student/dashboard");
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium hover:bg-[#156d95]/10"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push("/student/my-courses");
                }}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Kursus Saya
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium hover:bg-[#156d95]/10 relative"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push("/student/cart");
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Keranjang
                {cartItems.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium hover:bg-[#156d95]/10"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push("/student/profile");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profil
              </Button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t shrink-0">
          <div className="flex items-center justify-between p-3 bg-[#156d95]/5 rounded-lg">
            <div className="flex items-center min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#156d95] text-white flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 mt-12 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Halo, {user.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Selamat datang di dashboard Pembelajaran Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Kursus Saya</p>
                    <p className="text-2xl font-bold mt-1">
                      {enrolledCourses.length}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-[#156d95]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Dalam Keranjang</p>
                    <p className="text-2xl font-bold mt-1">
                      {cartItems.length}
                    </p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-[#156d95]" />
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Sertifikat</p>
                    <p className="text-2xl font-bold mt-1">
                      {certificateCount}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-[#156d95] rounded-full flex items-center justify-center text-white font-bold">
                    {certificateCount}
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Kursus Saya</h2>
              <Button
                variant="outline"
                onClick={() => router.push("/student/courses")}
              >
                Jelajahi Kursus
              </Button>
            </div>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-md transition-shadow cursor-pointer border-[#156d95]/20"
                    onClick={() => handleContinueLearning(course.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-[#156d95]/10 text-[#156d95]"
                        >
                          Aktif
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg mb-2 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description || "Tidak ada deskripsi"}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-[#156d95]">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#156d95] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>
                            {course.lessonsCompleted} dari {course.totalLessons}{" "}
                            lesson
                          </span>
                        </div>
                        <span className="bg-[#156d95]/10 text-[#156d95] px-2 py-1 rounded text-xs">
                          {formatLastAccessed(course.lastAccessed)}
                        </span>
                      </div>

                      <Button
                        className="w-full bg-[#156d95] hover:bg-[#0d476e] text-white"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLearning(course.id);
                        }}
                      >
                        Lanjutkan Belajar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-4xl mb-4">🎓</div>
                <p className="text-gray-500 mb-4 text-lg">
                  Anda belum memiliki kursus
                </p>
                <p className="text-gray-400 mb-6">
                  Mulai perjalanan belajar Anda dengan membeli kursus pertama
                </p>
                <Button
                  onClick={() => router.push("/student/courses")}
                  size="lg"
                  className="bg-[#156d95] hover:bg-[#0d476e]"
                >
                  Jelajahi Kursus
                </Button>
              </div>
            )}

            <div className="md:hidden mt-6 text-center">
              <Button
                onClick={() => router.push("/student/courses")}
                className="bg-[#156d95] hover:bg-[#0d476e]"
              >
                Jelajahi Kursus
              </Button>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Keranjang Belanja
              </h2>
              {cartItems.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleViewCart}
                  className="flex items-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Lihat Semua ({cartItems.length})
                </Button>
              )}
            </div>

            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.slice(0, 3).map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          {item.isBundle && item.courseNames && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600 font-medium mb-1">
                                Termasuk {item.courseNames.length} kursus:
                              </p>
                              <ul className="text-xs text-gray-500 space-y-1 max-h-24 overflow-y-auto pr-2">
                                {item.courseNames.map(
                                  (name: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <span className="text-[#156d95] mr-1">
                                        •
                                      </span>
                                      <span>{name}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                          <p className="text-gray-600 mt-1 text-sm">
                            {item.isBundle ? "Paket Bundle" : "Kursus Tunggal"}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                          <span className="font-bold text-lg text-[#156d95] sm:mb-2">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-center text-gray-500 text-sm">
                    Dan {cartItems.length - 3} item lainnya...
                  </p>
                )}
                <Button
                  className="w-full mt-6 bg-[#156d95] hover:bg-[#0d476e] text-white py-6 text-lg"
                  size="lg"
                  onClick={handleViewCart}
                >
                  Lanjutkan ke Checkout
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-4xl mb-4">🛒</div>
                <p className="text-gray-500 mb-4 text-lg">
                  Keranjang belanja Anda kosong
                </p>
                <p className="text-gray-400 mb-6">
                  Temukan kursus yang menarik dan tambahkan ke keranjang
                </p>
                <Button
                  onClick={() => router.push("/student/courses")}
                  size="lg"
                  className="bg-[#156d95] hover:bg-[#0d476e]"
                >
                  Tambah Kursus ke Keranjang
                </Button>
              </div>
            )}
          </section>

          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Kursus Populer
              </h2>
              <Button
                variant="outline"
                onClick={() => router.push("/student/courses")}
              >
                Lihat Semua
              </Button>
            </div>
            <CourseSection />
          </section>
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
