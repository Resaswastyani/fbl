"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Password Baru</label>
              <Input
                type="password"
                placeholder="Masukkan password baru"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Konfirmasi Password</label>
              <Input
                type="password"
                placeholder="Ulangi password"
                className="mt-1"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#0a0a0f] hover:bg-[#262529]">
              Simpan Password Baru
            </Button>

            <p className="text-center text-sm text-gray-500 mt-3">
              Kembali ke{" "}
              <Link href="/login" className="text-[#0a0a0f] hover:underline">
                login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
