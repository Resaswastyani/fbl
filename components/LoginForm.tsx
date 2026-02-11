// "use client";

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     const form = e.currentTarget;
//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
//     const password = (form.elements.namedItem("password") as HTMLInputElement)
//       .value;

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ REDIRECT BERDASARKAN ROLE
//       if (data.user.role === "PELANGGAN") {
//         router.push("/student/dashboard"); // Dashboard khusus student
//       } else {
//         router.push("/dashboard"); // Dashboard admin/mentor
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Terjadi kesalahan");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       {/* Back button */}
//       <button
//         className="
//           w-10 h-10 rounded-full border flex items-center justify-center
//           hover:bg-muted transition mb-2
//         "
//         onClick={() => {
//           fetch("/api/auth/me")
//             .then((r) => r.json())
//             .then((data) => {
//               if (!data?.user) {
//                 // Tidak login → redirect aman
//                 window.location.href = "/";
//               } else {
//                 // Login → back diperbolehkan
//                 window.history.back();
//               }
//             });
//         }}
//       >
//         <ArrowLeft size={18} />
//       </button>

//       <Card className="overflow-hidden">
//         <CardContent className="grid p-0 md:grid-cols-2">
//           {/* FORM */}
//           <form className="p-6 md:p-8" onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               {/* Title */}
//               <div className="flex flex-col items-center text-center">
//                 <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
//                 <p className="text-balance text-muted-foreground">
//                   Masuk untuk mulai belajar
//                 </p>
//               </div>

//               {/* Email */}
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Masukkan email Anda..."
//                   required
//                 />
//               </div>

//               {/* Password */}
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>

//                   {/* 👉 Forgot password */}
//                   <a
//                     href="/forgot-password"
//                     className="ml-auto text-sm underline-offset-2 hover:underline"
//                   >
//                     Lupa password?
//                   </a>
//                 </div>

//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="
//                       absolute right-3 top-1/2 -translate-y-1/2
//                       text-muted-foreground hover:text-foreground
//                     "
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Login Button */}
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Memproses..." : "Masuk"}
//               </Button>

//               {/* Separator */}
//               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
//                 <span className="relative z-10 bg-background px-2 text-muted-foreground">
//                   Atau
//                 </span>
//               </div>

//               {/* Google Login */}
//               <Button
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   className="h-5 w-5"
//                 >
//                   <path
//                     d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                     fill="currentColor"
//                   />
//                 </svg>
//                 Masuk dengan Google
//               </Button>

//               {/* Signup Link */}
//               <div className="text-center text-sm">
//                 Belum punya akun?{" "}
//                 <a href="/signup" className="underline underline-offset-4">
//                   Daftar
//                 </a>
//               </div>
//             </div>
//           </form>

//           {/* Right Side Image */}
//           <div className="relative hidden bg-muted md:block">
//             <img
//               src="/placeholder.svg"
//               alt="Image"
//               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Terms */}
//       <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <a href="#">Privacy Policy</a>.
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal");
        setLoading(false);
        return;
      }

      // ✅ REDIRECT BERDASARKAN ROLE
      if (data.user.role === "PELANGGAN") {
        router.push("/student/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan server. Silakan coba lagi.");
      setLoading(false);
    }
  }

  // 🔥 Handler untuk Google Login
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Back button */}
      <button
        className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition mb-2"
        onClick={() => {
          fetch("/api/auth/me")
            .then((r) => r.json())
            .then((data) => {
              if (!data?.user) {
                window.location.href = "/";
              } else {
                window.history.back();
              }
            });
        }}
      >
        <ArrowLeft size={18} />
      </button>

      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* FORM */}
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
                <p className="text-balance text-muted-foreground">
                  Masuk untuk mulai belajar
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan email Anda..."
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </Button>

              {/* Separator */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Atau
                </span>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Masuk dengan Google
              </Button>

              {/* Signup Link */}
              <div className="text-center text-sm">
                Belum punya akun?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Daftar
                </a>
              </div>
            </div>
          </form>

          {/* Right Side Image */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
