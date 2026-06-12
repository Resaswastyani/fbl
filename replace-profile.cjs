const fs = require('fs');

let profilePath = 'app/[locale]/student/profile/page.tsx';
let profileContent = fs.readFileSync(profilePath, 'utf8');

profileContent = profileContent.replace(
    'import { useRouter } from "next/navigation";',
    'import { useRouter } from "next/navigation";\nimport { useTranslations } from "next-intl";'
);

profileContent = profileContent.replace(
    'export default function StudentProfilePage() {',
    'export default function StudentProfilePage() {\n  const t = useTranslations("StudentProfile");'
);

const replacements = [
    [/>Profil Saya</g, '>{t("myProfile")}<'],
    [/>Logout</g, '>{t("logout")}<'],
    [/"Profil berhasil diperbarui!"/g, 't("profileUpdated")'],
    [/"Gagal memperbarui profil"/g, 't("updateFailed")'],
    [/"Terjadi kesalahan saat memperbarui profil"/g, 't("updateError")'],
    [/"Password baru tidak cocok"/g, 't("passwordUnmatched")'],
    [/"Password berhasil diubah!"/g, 't("passwordChanged")'],
    [/"Gagal mengubah password"/g, 't("passwordChangeFailed")'],
    [/"Terjadi kesalahan saat mengubah password"/g, 't("passwordChangeError")'],
    [/>Admin</g, '>{t("adminRole")}<'],
    [/>Mentor</g, '>{t("mentorRole")}<'],
    [/>Pelanggan</g, '>{t("customerRole")}<'],
    [/"Gagal memuat profil"/g, 't("updateFailed")'],
    [/>Memuat profil\.\.\.</g, '>{t("loadingProfile")}<'],
    [/>Bergabung {formatDate\(user.createdAt\)}</g, '>{t("joined", { date: formatDate(user.createdAt) })}<'],
    [/>Statistik Belajar</g, '>{t("learningStats")}<'],
    [/>Total Kursus</g, '>{t("totalCourses")}<'],
    [/>Sedang Dipelajari</g, '>{t("inProgress")}<'],
    [/>Selesai</g, '>{t("completed")}<'],
    [/>Sertifikat</g, '>{t("certificates")}<'],
    [/>Informasi Profil</g, '>{t("profileInfo")}<'],
    [/>Edit</g, '>{t("edit")}<'],
    [/>Nama Lengkap</g, '>{t("fullName")}<'],
    [/"Masukkan nama lengkap"/g, 't("enterFullName")'],
    [/>Email</g, '>{t("email")}<'],
    [/>Email tidak dapat diubah</g, '>{t("emailCannotChange")}<'],
    [/>Simpan</g, '>{t("save")}<'],
    [/>Batal</g, '>{t("cancel")}<'],
    [/>Role</g, '>{t("role")}<'],
    [/>Ubah Password</g, '>{t("changePassword")}<'],
    [/>Password Saat Ini</g, '>{t("currentPassword")}<'],
    [/"Masukkan password saat ini"/g, 't("enterCurrentPassword")'],
    [/>Password Baru</g, '>{t("newPassword")}<'],
    [/"Masukkan password baru"/g, 't("enterNewPassword")'],
    [/>Konfirmasi Password Baru</g, '>{t("confirmNewPassword")}<'],
    [/"Konfirmasi password baru"/g, 't("enterConfirmPassword")'],
    [/>Aksi Cepat</g, '>{t("quickActions")}<'],
    [/>Kursus Saya</g, '>{t("myCourses")}<'],
    [/>Dashboard</g, '>{t("dashboard")}<'],
    [/>Profil</g, '>{t("profileTab")}<'],
    [/>Password</g, '>{t("passwordTab")}<']
];

for (const [search, replace] of replacements) {
    profileContent = profileContent.replace(search, replace);
}

fs.writeFileSync(profilePath, profileContent);
console.log('Profile page translations applied.');
