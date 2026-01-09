"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Lupa Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForgot} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#0a0a0f] hover:bg-[#262529]">
              Kirim Link Reset
            </Button>

            <p className="text-center text-sm text-gray-500 mt-3">
              Sudah ingat password?{" "}
              <Link href="/login" className="text-[#0a0a0f] hover:underline">
                Masuk
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
