"use client";

export default function CourseSection() {
  const materials = [
    {
      title: "Foundations",
      content:
        "Pelajari dasar-dasar penting sebelum masuk materi lanjutan. Termasuk mindset, toolset, dan struktur kerja.",
      image: "/images/course-foundations.png",
      price: "Free",
    },
    {
      title: "Deep Dive",
      content:
        "Masuk ke penjelasan konsep lanjut: framework, struktur data, arsitektur, dan best practices.",
      image: "/images/course-deepdive.png",
      price: "$49",
    },
    {
      title: "Implementation",
      content:
        "Penerapan materi dalam project nyata. Kamu membangun real-world case secara langsung.",
      image: "/images/course-implementation.png",
      price: "$79",
    },
    {
      title: "Optimization",
      content:
        "Optimasi aplikasi, automation, scaling, dan teknik meningkatkan kualitas produk.",
      image: "/images/course-optimization.png",
      price: "$99",
    },
  ];

  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 px-6 lg:px-8">

        {/* LEFT — Heading (LG sticky, MOBILE normal) */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <h2
            className="text-[36px] lg:text-[42px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: "400",
            }}
          >
            Our <span className="text-[#156d95]">Courses</span>
          </h2>

          <p className="text-gray-600 mt-4 text-base lg:text-lg">
            Semua materi disusun bertahap dari fundamental hingga advanced level.
          </p>
        </div>

        {/* RIGHT — Cards / Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {materials.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4 grow">
                  {item.content}
                </p>

                {/* PRICE + CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {item.price}
                  </span>

                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition">
                    Enroll Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
