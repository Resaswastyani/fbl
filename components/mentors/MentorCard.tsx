// components/mentors/MentorCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import type { Mentor } from "@/types/mentors";

interface MentorCardProps {
  mentor: Mentor;
  index: number;
}

export default function MentorCard({ mentor, index }: MentorCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-[#156d95]/20"
        >
          {/* ✅ GUNAKAN NEXT IMAGE */}
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0} // Priority untuk gambar pertama
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111A4A]/90 via-transparent to-transparent" />

          {/* Experience Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#156d95]" />
              <span className="text-sm font-semibold text-[#111A4A]">
                {mentor.experience}
              </span>
            </div>
          </div>

          {/* Name & Role Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {mentor.name}
            </h3>
            <p className="text-[#7dd3fc] font-medium">{mentor.role}</p>
          </div>
        </motion.div>

        {/* Decorative Element */}
        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-[#156d95]/20 to-[#111A4A]/20 rounded-2xl" />
      </div>

      {/* Content Section */}
      <div className={`${!isEven ? "lg:order-1" : ""}`}>
        {/* Bio */}
        <p
          className="text-gray-600 leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          {mentor.bio}
        </p>

        {/* Specialization */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#111A4A] uppercase tracking-wide mb-3">
            Spesialisasi
          </h4>
          <div className="flex flex-wrap gap-2">
            {mentor.specialization.map((spec, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-[#156d95]/10 to-[#111A4A]/10 text-[#156d95] px-3 py-1.5 rounded-lg text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#111A4A] uppercase tracking-wide mb-3">
            Pencapaian
          </h4>
          <ul className="space-y-2">
            {mentor.achievements.slice(0, 3).map((achievement, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-[#156d95] rounded-full mt-2 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {mentor.certifications.map((cert, idx) => (
              <span
                key={idx}
                className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {mentor.socialMedia.instagram && (
            <a
              href={mentor.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-100 transition"
            >
              <Instagram size={18} />
            </a>
          )}
          {mentor.socialMedia.linkedin && (
            <a
              href={mentor.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
            >
              <Linkedin size={18} />
            </a>
          )}
          {mentor.socialMedia.twitter && (
            <a
              href={mentor.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center hover:bg-sky-100 transition"
            >
              <Twitter size={18} />
            </a>
          )}
          {mentor.socialMedia.youtube && (
            <a
              href={mentor.socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition"
            >
              <Youtube size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
