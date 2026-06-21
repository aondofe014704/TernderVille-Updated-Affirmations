import type { Metadata } from "next";
import Link from "next/link";
import { Crown, Star, Heart, Wrench, Globe, ArrowRight, Sparkles, GraduationCap, Users, Target } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tenderville School — our vision, core values, and approach to nurturing every child into a confident, compassionate, successful adult.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tenderville School",
    description: "Our vision, values, and approach to education in Lagos, Nigeria.",
    url: "/about",
  },
};

const coreValues = [
  { icon: Crown, title: "Leadership", description: "Developing influential, compassionate leaders who make a difference.", bgColor: "bg-orange-600" },
  { icon: Star, title: "Excellence", description: "Promoting high standards and continuous improvement in all pursuits.", bgColor: "bg-orange-700" },
  { icon: Heart, title: "Empathy", description: "Fostering understanding, compassion, and respect for all.", bgColor: "bg-orange-500" },
  { icon: Wrench, title: "Diligence", description: "Cultivating hard work, perseverance, and dedication to success.", bgColor: "bg-orange-800" },
  { icon: Globe, title: "Global Relevance", description: "Preparing students for success in our interconnected world.", bgColor: "bg-orange-600" },
  { icon: GraduationCap, title: "Continuous Learning", description: "Nurturing curious minds by encouraging children to keep asking questions.", bgColor: "bg-orange-700" },
];

const activities = ["Sports", "Arts", "Entrepreneurship", "STEM & Robotics", "Languages", "Music"];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl bg-orange-200/20"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl bg-orange-300/30"></div>
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="px-4 pt-16 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
                  About Tenderville
                  <br />
                  <span className="text-4xl sm:text-5xl lg:text-6xl">School</span>
                </h1>
                <p className="text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600">
                  Shaping young minds into successful adults through excellence, empathy, and innovation
                </p>
              </div>

              {/* Static success-rate badge (was animated in old code; replaced with static for SSR) */}
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-orange-100">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-1 text-gray-800">95%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision + Welcome */}
          <section className="px-4 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2 rounded-3xl p-8 border tv-glass shadow-2xl border-orange-100">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100">
                      <Heart className="w-5 h-5 text-orange-600" />
                    </div>
                    Welcome to Our Community
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    Welcome to <strong className="text-orange-600">Tenderville School</strong>! We believe in shaping young minds
                    into successful adults. Our vision is to provide a nurturing environment that fosters the growth and
                    development of children into confident, capable individuals.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    Our dedicated team of educators is passionate about creating a learning atmosphere that inspires curiosity,
                    critical thinking, and a love for lifelong learning.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    We prioritize instilling core values, empathy, and resilience to prepare students for adult challenges in a
                    safe, inclusive environment.
                  </p>
                </div>

                <div className="rounded-3xl p-8 text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20">
                      <Star className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg leading-relaxed mb-6 text-orange-50">
                    To be globally recognised as a learning environment that raises children to be successful adults.
                  </p>
                  <div className="w-full h-px mb-6 bg-white/20"></div>
                  <div className="space-y-3">
                    {["Global Recognition", "Future Success", "Adult Readiness"].map((tag) => (
                      <div key={tag} className="flex items-center gap-2 text-orange-100">
                        <div className="w-2 h-2 rounded-full bg-orange-200"></div>
                        <span className="text-sm">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="rounded-3xl p-8 sm:p-12 border mb-16 tv-glass shadow-2xl border-orange-100">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
                  <div className="w-20 h-1 rounded-full mx-auto bg-gradient-to-r from-orange-600 to-orange-700"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {coreValues.map((value) => {
                    const Icon = value.icon;
                    return (
                      <div key={value.title} className="rounded-2xl p-6 border bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${value.bgColor} shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold mb-3 text-lg text-gray-800">{value.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Learning approaches */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="rounded-3xl p-8 border-2 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-600 shadow-md">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-600">Group Learning</h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    We foster an inclusive and supportive environment where students actively engage in collaborative projects,
                    discussions, and activities.
                  </p>
                </div>

                <div className="rounded-3xl p-8 border-2 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-600 shadow-md">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-600">Individual Learning</h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    We focus on individual grooming and personal growth, providing a nurturing environment where pupils can
                    develop their unique talents.
                  </p>
                </div>
              </div>

              {/* Extracurricular */}
              <div className="rounded-3xl p-8 sm:p-12 border mb-16 tv-glass shadow-2xl border-orange-100">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Holistic Development</h2>
                  <p className="text-lg max-w-4xl mx-auto leading-relaxed text-gray-600">
                    We provide a range of extracurricular activities including sports, arts, entrepreneurship development, STEM
                    and robotics, languages, music, and Smart Chefs.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {activities.map((activity) => (
                    <div key={activity} className="rounded-2xl p-6 text-center border bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center bg-orange-100">
                        <Sparkles className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-3xl p-8 sm:p-16 text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-orange-100">
                    Join us at Tenderville School, where we dedicate ourselves to nurturing and empowering the next generation of
                    successful adults ready to make their mark on the world.
                  </p>
                  <Link
                    href="/contacts"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base bg-white text-orange-600 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
