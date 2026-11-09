// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   typescript: {
// //     ignoreBuildErrors: true,
// //   },
// //   images: {
// //     unoptimized: true,
// //   },
// // }

// // export default nextConfig

// import createNextIntlPlugin from "next-intl/plugin";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// };

// const withNextIntl = createNextIntlPlugin("./i18n/i18n.ts");

// export default withNextIntl(nextConfig);

import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  async redirects() {
    return [
      // URL dari website lama (PHP), mis. /news-detail.php?id=1, masih dikunjungi & terindeks.
      // Tanpa ini halaman tersebut menampilkan homepage (konten duplikat).
      {
        source: "/:file(.+\\.php)",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/i18n.ts");
export default withNextIntl(nextConfig);
