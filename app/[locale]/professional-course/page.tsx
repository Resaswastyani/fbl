import CourseSection from "@/components/CourseSection";
import { getCourseSummaries } from "@/server/courses";

export default async function Page() {
  // Kirim daftar kursus dari server: langsung tampil tanpa spinner & terbaca mesin pencari
  const courses = await getCourseSummaries().catch((error) => {
    console.error("Professional course: gagal mengambil kursus", error);
    return undefined;
  });

  return <CourseSection initialCourses={courses as any} />;
}
