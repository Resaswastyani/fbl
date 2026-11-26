// // "use client";

// // import { useState } from "react";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Eye, EyeOff, ArrowLeft } from "lucide-react";
// // import Image from "next/image";
// // import { useRouter } from "next/navigation";

// // export default function SignupForm({
// //   className,
// //   ...props
// // }: React.ComponentProps<"div">) {
// //   const router = useRouter();

// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [password2, setPassword2] = useState("");

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showPassword2, setShowPassword2] = useState(false);

// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);

// //     // 🔒 Check password match
// //     if (password !== password2) {
// //       setError("Password dan konfirmasi password tidak sama.");
// //       return;
// //     }

// //     if (password.length < 6) {
// //       setError("Password minimal 6 karakter.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name,
// //           email,
// //           password,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.error || "Signup gagal");
// //         setLoading(false);
// //         return;
// //       }

// //       // Auto login setelah signup
// //       const loginRes = await fetch("/api/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       if (loginRes.ok) {
// //         const loginData = await loginRes.json();

// //         // Redirect berdasarkan role
// //         if (loginData.user.role === "PELANGGAN") {
// //           router.push("/student/dashboard");
// //         } else {
// //           router.push("/dashboard");
// //         }
// //         router.refresh();
// //       } else {
// //         router.push("/login?success=account_created");
// //       }
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //       setError("Terjadi kesalahan server. Silakan coba lagi.");
// //       setLoading(false);
// //     }
// //   };

// //   // 🔥 Handler untuk Google Signup
// //   const handleGoogleSignup = () => {
// //     window.location.href = "/api/auth/google";
// //   };

// //   return (
// //     <div className={cn("flex flex-col gap-6", className)} {...props}>
// //       {/* Back Button */}
// //       <button
// //         className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition mb-2"
// //         onClick={() => window.history.back()}
// //       >
// //         <ArrowLeft size={18} />
// //       </button>

// //       <Card className="overflow-hidden">
// //         <CardContent className="grid p-0 md:grid-cols-2 min-h-[520px]">
// //           {/* FORM */}
// //           <form className="p-6 md:p-8" onSubmit={handleSignup}>
// //             <div className="flex flex-col gap-6">
// //               {/* Title */}
// //               <div className="flex flex-col items-center text-center">
// //                 <h1 className="text-2xl font-bold">Buat Akun</h1>
// //                 <p className="text-balance text-muted-foreground">
// //                   Mulai Belajar Forex Sekarang
// //                 </p>
// //               </div>

// //               {/* Error Message */}
// //               {error && (
// //                 <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
// //                   {error}
// //                 </div>
// //               )}

// //               {/* Name */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="name">Nama</Label>
// //                 <Input
// //                   id="name"
// //                   placeholder="Nama lengkap"
// //                   required
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   disabled={loading}
// //                 />
// //               </div>

// //               {/* Email */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="email">Email</Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   placeholder="emailanda@example.com"
// //                   required
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   disabled={loading}
// //                 />
// //               </div>

// //               {/* Password */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="password">Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     type={showPassword ? "text" : "password"}
// //                     required
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     disabled={loading}
// //                     minLength={6}
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

// //               {/* Confirm Password */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="password2">Confirm Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password2"
// //                     type={showPassword2 ? "text" : "password"}
// //                     required
// //                     value={password2}
// //                     onChange={(e) => setPassword2(e.target.value)}
// //                     disabled={loading}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword2(!showPassword2)}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
// //                   >
// //                     {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Signup Button */}
// //               <Button type="submit" className="w-full" disabled={loading}>
// //                 {loading ? "Memproses..." : "Buat Akun"}
// //               </Button>

// //               {/* Separator */}
// //               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
// //                 <span className="relative z-10 bg-background px-2 text-muted-foreground">
// //                   Atau
// //                 </span>
// //               </div>

// //               {/* Google Signup */}
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 className="w-full flex items-center justify-center gap-2"
// //                 onClick={handleGoogleSignup}
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
// //                 Daftar dengan Google
// //               </Button>

// //               {/* Login Link */}
// //               <div className="text-center text-sm">
// //                 Sudah punya Akun?{" "}
// //                 <a href="/login" className="underline underline-offset-4">
// //                   Masuk
// //                 </a>
// //               </div>
// //             </div>
// //           </form>

// //           {/* Right Image */}
// //           <div className="relative hidden md:flex justify-center items-center bg-gray-50">
// //             <div className="p-4 w-full flex justify-center">
// //               <Image
// //                 src="/signup-form.svg"
// //                 alt="Poster"
// //                 width={380}
// //                 height={506}
// //                 className="object-contain rounded-xl"
// //               />
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Terms */}
// //       <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
// //         By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
// //         <a href="#">Privacy Policy</a>.
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
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);

//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // 🔒 Check password match
//     if (password !== password2) {
//       setError("Password dan konfirmasi password tidak sama.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password minimal 6 karakter.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Signup gagal");
//         setLoading(false);
//         return;
//       }

//       // Jika berhasil link akun Google
//       if (data.message?.includes("Google")) {
//         setSuccess(data.message);
//         setLoading(false);
//         return;
//       }

//       // Auto login setelah signup
//       const loginRes = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (loginRes.ok) {
//         const loginData = await loginRes.json();

//         // Redirect berdasarkan role
//         if (loginData.user.role === "PELANGGAN") {
//           router.push("/student/dashboard");
//         } else {
//           router.push("/dashboard");
//         }
//         router.refresh();
//       } else {
//         router.push("/login?success=account_created");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Terjadi kesalahan server. Silakan coba lagi.");
//       setLoading(false);
//     }
//   };

//   // 🔥 Handler untuk Google Signup
//   const handleGoogleSignup = () => {
//     // Simpan guest cart sebelum redirect ke Google
//     const guestCart = localStorage.getItem("guest-cart");
//     if (guestCart) {
//       sessionStorage.setItem("pending-cart-sync", "true");
//     }

//     window.location.href = "/api/auth/google";
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       {/* Back Button */}
//       <button
//         className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition mb-2"
//         onClick={() => window.history.back()}
//       >
//         <ArrowLeft size={18} />
//       </button>

//       <Card className="overflow-hidden">
//         <CardContent className="grid p-0 md:grid-cols-2 min-h-[520px]">
//           {/* FORM */}
//           <form className="p-6 md:p-8" onSubmit={handleSignup}>
//             <div className="flex flex-col gap-6">
//               {/* Title */}
//               <div className="flex flex-col items-center text-center">
//                 <h1 className="text-2xl font-bold">Buat Akun</h1>
//                 <p className="text-balance text-muted-foreground">
//                   Mulai Belajar Forex Sekarang
//                 </p>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
//                   {error}
//                 </div>
//               )}

//               {/* Success Message */}
//               {success && (
//                 <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg">
//                   {success}
//                   <div className="mt-2">
//                     <a
//                       href="/login"
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       Klik di sini untuk login →
//                     </a>
//                   </div>
//                 </div>
//               )}

//               {/* Name */}
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Nama</Label>
//                 <Input
//                   id="name"
//                   placeholder="Nama lengkap"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               {/* Email */}
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="emailanda@example.com"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               {/* Password */}
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={loading}
//                     minLength={6}
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

//               {/* Confirm Password */}
//               <div className="grid gap-2">
//                 <Label htmlFor="password2">Confirm Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password2"
//                     type={showPassword2 ? "text" : "password"}
//                     required
//                     value={password2}
//                     onChange={(e) => setPassword2(e.target.value)}
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword2(!showPassword2)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Signup Button */}
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Memproses..." : "Buat Akun"}
//               </Button>

//               {/* Separator */}
//               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
//                 <span className="relative z-10 bg-background px-2 text-muted-foreground">
//                   Atau
//                 </span>
//               </div>

//               {/* Google Signup */}
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2"
//                 onClick={handleGoogleSignup}
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
//                 Daftar dengan Google
//               </Button>

//               {/* Login Link */}
//               <div className="text-center text-sm">
//                 Sudah punya Akun?{" "}
//                 <a href="/login" className="underline underline-offset-4">
//                   Masuk
//                 </a>
//               </div>
//             </div>
//           </form>

//           {/* Right Image */}
//           <div className="relative hidden md:flex justify-center items-center bg-gray-50">
//             <div className="p-4 w-full flex justify-center">
//               <Image
//                 src="/signup-form.svg"
//                 alt="Poster"
//                 width={380}
//                 height={506}
//                 className="object-contain rounded-xl"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Terms */}
//       <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
//         By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
//         <a href="#">Privacy Policy</a>.
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
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

export default function SignupForm() {
  const t = useTranslations("Signup");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== password2) {
      setError(t("passwordMismatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("signupFailed"));
        setLoading(false);
        return;
      }

      if (data.message?.includes("Google")) {
        setSuccess(data.message);
        setLoading(false);
        return;
      }

      const loginRes = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();

        if (loginData.user.role === "PELANGGAN") {
          router.push("/student/dashboard");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      } else {
        router.push("/login?success=account_created");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(t("serverError"));
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      sessionStorage.setItem("pending-cart-sync", "true");
    }

    window.location.href = "/api/auth/google";
  };

  const passwordField = (
    id: string,
    label: string,
    value: string,
    setValue: (v: string) => void,
    shown: boolean,
    setShown: (v: boolean) => void,
    autoComplete: string,
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className={authLabel}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type={shown ? "text" : "password"}
          autoComplete={autoComplete}
          required
          minLength={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          className={`${authInput} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShown(!shown)}
          aria-label={shown ? "Sembunyikan password" : "Tampilkan password"}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          {shown ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <AuthShell image="/signup-form.svg" imageAlt={t("signupImageAlt")}>
      <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-900 dark:text-white">
        {t("createAccount")}
      </h1>
      <p className="mt-1.5 text-[15px] text-slate-500 dark:text-gray-400">{t("startLearningForex")}</p>

      <form className="mt-8 space-y-5" onSubmit={handleSignup}>
        {error && (
          <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              {success}
              <div className="mt-1.5">
                <Link href="/login" className={authLink}>{t("clickHereToLogin")}</Link>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="name" className={authLabel}>{t("name")}</label>
          <input
            id="name"
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className={authInput}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className={authLabel}>{t("email")}</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={authInput}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {passwordField("password", t("password"), password, setPassword, showPassword, setShowPassword, "new-password")}
          {passwordField("password2", t("confirmPassword"), password2, setPassword2, showPassword2, setShowPassword2, "new-password")}
        </div>

        <button type="submit" className={authPrimaryButton} disabled={loading}>
          {loading ? t("processing") : t("createAccount")}
        </button>

        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          {t("or")}
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <button type="button" className={authSecondaryButton} onClick={handleGoogleSignup} disabled={loading}>
          <GoogleIcon />
          {t("registerWithGoogle")}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
        {t("haveAccount")}{" "}
        <Link href="/login" className={authLink}>
          {t("login")}
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
