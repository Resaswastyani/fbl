// // "use client";

// // import { useState } from "react";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Eye, EyeOff, ArrowLeft } from "lucide-react";
// // import { useRouter } from "next/navigation";

// // export function LoginForm({
// //   className,
// //   ...props
// // }: React.ComponentProps<"div">) {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const router = useRouter();

// //   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     const form = e.currentTarget;
// //     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
// //     const password = (form.elements.namedItem("password") as HTMLInputElement)
// //       .value;

// //     try {
// //       const res = await fetch("/api/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.error || "Login gagal");
// //         setLoading(false);
// //         return;
// //       }

// //       // ✅ REDIRECT BERDASARKAN ROLE
// //       if (data.user.role === "PELANGGAN") {
// //         router.push("/student/dashboard");
// //       } else {
// //         router.push("/dashboard");
// //       }
// //       router.refresh();
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setError("Terjadi kesalahan server. Silakan coba lagi.");
// //       setLoading(false);
// //     }
// //   }

// //   // 🔥 Handler untuk Google Login
// //   const handleGoogleLogin = () => {
// //     window.location.href = "/api/auth/google";
// //   };

// //   return (
// //     <div className={cn("flex flex-col gap-6", className)} {...props}>
// //       {/* Back button */}
// //       <button
// //         className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition mb-2"
// //         onClick={() => {
// //           fetch("/api/auth/me")
// //             .then((r) => r.json())
// //             .then((data) => {
// //               if (!data?.user) {
// //                 window.location.href = "/";
// //               } else {
// //                 window.history.back();
// //               }
// //             });
// //         }}
// //       >
// //         <ArrowLeft size={18} />
// //       </button>

// //       <Card className="overflow-hidden">
// //         <CardContent className="grid p-0 md:grid-cols-2">
// //           {/* FORM */}
// //           <form className="p-6 md:p-8" onSubmit={handleSubmit}>
// //             <div className="flex flex-col gap-6">
// //               {/* Title */}
// //               <div className="flex flex-col items-center text-center">
// //                 <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
// //                 <p className="text-balance text-muted-foreground">
// //                   Masuk untuk mulai belajar
// //                 </p>
// //               </div>

// //               {/* Error Message */}
// //               {error && (
// //                 <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
// //                   {error}
// //                 </div>
// //               )}

// //               {/* Email */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="email">Email</Label>
// //                 <Input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   placeholder="Masukkan email Anda..."
// //                   required
// //                   disabled={loading}
// //                 />
// //               </div>

// //               {/* Password */}
// //               <div className="grid gap-2">
// //                 <div className="flex items-center">
// //                   <Label htmlFor="password">Password</Label>
// //                   <a
// //                     href="/forgot-password"
// //                     className="ml-auto text-sm underline-offset-2 hover:underline"
// //                   >
// //                     Lupa password?
// //                   </a>
// //                 </div>

// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type={showPassword ? "text" : "password"}
// //                     required
// //                     disabled={loading}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
// //                   >
// //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Login Button */}
// //               <Button type="submit" className="w-full" disabled={loading}>
// //                 {loading ? "Memproses..." : "Masuk"}
// //               </Button>

// //               {/* Separator */}
// //               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
// //                 <span className="relative z-10 bg-background px-2 text-muted-foreground">
// //                   Atau
// //                 </span>
// //               </div>

// //               {/* Google Login */}
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 className="w-full flex items-center justify-center gap-2"
// //                 onClick={handleGoogleLogin}
// //                 disabled={loading}
// //               >
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   className="h-5 w-5"
// //                 >
// //                   <path
// //                     d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
// //                     fill="currentColor"
// //                   />
// //                 </svg>
// //                 Masuk dengan Google
// //               </Button>

// //               {/* Signup Link */}
// //               <div className="text-center text-sm">
// //                 Belum punya akun?{" "}
// //                 <a href="/signup" className="underline underline-offset-4">
// //                   Daftar
// //                 </a>
// //               </div>
// //             </div>
// //           </form>

// //           {/* Right Side Image */}
// //           <div className="relative hidden bg-muted md:block">
// //             <img
// //               src="/placeholder.svg"
// //               alt="Image"
// //               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
// //             />
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Terms */}
// //       <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
// //         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
// //         and <a href="#">Privacy Policy</a>.
// //       </div>
// //     </div>
// //   );
// // }

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
//   const [error, setError] = useState<string | null>(null);
//   const [isGoogleUser, setIsGoogleUser] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setIsGoogleUser(false);

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
//         setError(data.error || "Login gagal");
//         if (data.isGoogleUser) {
//           setIsGoogleUser(true);
//         }
//         setLoading(false);
//         return;
//       }

//       // ✅ REDIRECT BERDASARKAN ROLE
//       if (data.user.role === "PELANGGAN") {
//         router.push("/student/dashboard");
//       } else {
//         router.push("/dashboard");
//       }
//       router.refresh();
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Terjadi kesalahan server. Silakan coba lagi.");
//       setLoading(false);
//     }
//   }

//   // 🔥 Handler untuk Google Login
//   const handleGoogleLogin = () => {
//     // Simpan guest cart sebelum redirect ke Google
//     const guestCart = localStorage.getItem("guest-cart");
//     if (guestCart) {
//       // Simpan ke temporary storage untuk di-sync setelah login
//       sessionStorage.setItem("pending-cart-sync", "true");
//     }

//     window.location.href = "/api/auth/google";
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       {/* Back button */}
//       <button
//         className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition mb-2"
//         onClick={() => {
//           fetch("/api/auth/me")
//             .then((r) => r.json())
//             .then((data) => {
//               if (!data?.user) {
//                 window.location.href = "/";
//               } else {
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

//               {/* Error Message */}
//               {error && (
//                 <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
//                   {error}
//                 </div>
//               )}

//               {/* Google User Hint */}
//               {isGoogleUser && (
//                 <div className="p-3 text-sm text-blue-600 bg-blue-50 rounded-lg">
//                   💡 <strong>Tips:</strong> Akun ini terdaftar dengan Google.
//                   Anda bisa login menggunakan tombol "Masuk dengan Google" di
//                   bawah, atau daftar ulang dengan password yang sama untuk
//                   mengaktifkan login manual.
//                 </div>
//               )}

//               {/* Email */}
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Masukkan email Anda..."
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               {/* Password */}
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
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
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
//                 type="button"
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2"
//                 onClick={handleGoogleLogin}
//                 disabled={loading}
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
//               src="/login-fbl.png"
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
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, Info } from "lucide-react";
import AuthShell, {
  GoogleIcon,
  authInput,
  authLabel,
  authLink,
  authPrimaryButton,
  authSecondaryButton,
} from "@/components/auth/AuthShell";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function LoginForm() {
  const t = useTranslations("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsGoogleUser(false);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("loginFailed"));
        if (data.isGoogleUser) {
          setIsGoogleUser(true);
        }
        setLoading(false);
        return;
      }

      if (data.user.role === "PELANGGAN") {
        router.push("/student/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      setError(t("serverError"));
      setLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      sessionStorage.setItem("pending-cart-sync", "true");
    }
    window.location.href = "/api/auth/google";
  };

  return (
    <AuthShell image="/login-fbl.png" imageAlt={t("loginImageAlt")}>
      <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-900 dark:text-white">
        {t("welcomeBack")}
      </h1>
      <p className="mt-1.5 text-[15px] text-slate-500 dark:text-gray-400">{t("loginToLearn")}</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {isGoogleUser && (
          <div className="flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-3 text-sm text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>{t("tips")}:</strong> {t("googleAccountHint")}
            </span>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="email" className={authLabel}>{t("email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            required
            disabled={loading}
            className={authInput}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={authLabel}>{t("password")}</label>
            <Link href="/forgot-password" className={`text-sm ${authLink}`}>
              {t("forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={loading}
              className={`${authInput} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className={authPrimaryButton} disabled={loading}>
          {loading ? t("processing") : t("login")}
        </button>

        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          {t("or")}
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <button type="button" className={authSecondaryButton} onClick={handleGoogleLogin} disabled={loading}>
          <GoogleIcon />
          {t("loginWithGoogle")}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
        {t("noAccount")}{" "}
        <Link href="/signup" className={authLink}>
          {t("register")}
        </Link>
      </p>

      <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
        {t("termsText")}{" "}
        <a href="#" className="underline underline-offset-2 hover:text-slate-600">{t("termsOfService")}</a>{" "}
        {t("and")}{" "}
        <a href="#" className="underline underline-offset-2 hover:text-slate-600">{t("privacyPolicy")}</a>.
      </p>
    </AuthShell>
  );
}
