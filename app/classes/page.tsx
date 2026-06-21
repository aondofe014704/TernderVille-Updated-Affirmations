import type { Metadata } from "next";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Our Classes",
  description:
    "From infancy to primary education, Tenderville School offers age-appropriate learning at every stage: Infant Room, Toddler Group, Pre-School 1 & 2, Lower Primary, Upper Primary.",
  alternates: { canonical: "/classes" },
};

interface ClassInfo {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  keyFeatures: string[];
  color: string;
  image: string;
}

const classes: ClassInfo[] = [
  {
    id: "infant-room",
    name: "Infant Room",
    ageRange: "",
    description:
      "At Tenderville School’s Infant Room, we understand the importance of the early years in shaping a child’s foundation for learning and development. Our caring caregivers provide a loving and enriching space where infants can thrive.",
    keyFeatures: ["Experienced and caring caregivers", "Stimulating learning environment", "Individualized developmental approach", "Safe and nurturing space", "Milestone tracking and support"],
    color: "from-pink-500 to-rose-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538971/_DSC5090_w1r957.jpg",
  },
  {
    id: "toddler-group",
    name: "Toddler Group",
    ageRange: "2 to 3 years",
    description:
      "The Toddler Group provides a nurturing and stimulating environment where children can thrive, grow, and explore the world around them, with focus on independence and age-appropriate learning.",
    keyFeatures: ["Independence building activities", "Social-emotional development focus", "Age-appropriate learning experiences", "Exploration and discovery time", "Foundation for lifelong learning"],
    color: "from-purple-500 to-violet-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1755850362/preschool_bokskb.jpg",
  },
  {
    id: "pre-school-1",
    name: "Pre-School 1",
    ageRange: "3 to 4 years",
    description:
      "Pre-School 1 offers a nurturing environment for children to explore, learn, and grow. We emphasize holistic development, social-emotional skills, language, and play-based learning.",
    keyFeatures: ["Holistic development approach", "Language and communication skills", "Play-based learning methodology", "Parent-teacher collaboration", "Curiosity and independence building"],
    color: "from-blue-500 to-cyan-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539001/_DSC4845_e8efz6.jpg",
  },
  {
    id: "pre-school-2",
    name: "Pre-School 2",
    ageRange: "4 to 5 years",
    description:
      "Pre-School 2 emphasizes academic readiness, independent learning, social-emotional development, critical thinking, and multidisciplinary learning to prepare children for primary school.",
    keyFeatures: ["Academic readiness preparation", "Independent learning skills", "Critical thinking development", "Multidisciplinary curriculum", "Primary school preparation"],
    color: "from-green-500 to-emerald-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1755850362/toddller_sgxsma.jpg",
  },
  {
    id: "lower-primary",
    name: "Lower Primary",
    ageRange: "Year 1 to 3",
    description:
      "Lower Primary promotes critical thinking and problem-solving skills through inquiry-based learning, real-world problem-solving, and collaboration, empowering students to become lifelong learners.",
    keyFeatures: ["Critical thinking and problem-solving", "Inquiry-based learning approach", "Real-world problem-solving", "Collaborative learning environment", "Character development focus"],
    color: "from-yellow-500 to-amber-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538965/_DSC4896_kx83m4.jpg",
  },
  {
    id: "upper-primary",
    name: "Upper Primary",
    ageRange: "Year 4 to 6",
    description:
      "In Upper Primary we strive for academic excellence, holistic development, collaboration, critical thinking, and leadership. We prepare students for the challenges of their future educational journey.",
    keyFeatures: ["Academic excellence focus", "Leadership development", "Rigorous curriculum delivery", "Personal growth encouragement", "Future-ready preparation"],
    color: "from-orange-500 to-red-600",
    image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538932/_DSC4908_gooit2.jpg",
  },
];

export default function ClassesPage() {
  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Classes</h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From infancy to primary education, we provide age-appropriate learning experiences that nurture growth, curiosity,
                and academic excellence at every stage.
              </p>
            </div>
          </section>

          <section className="px-4 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((c) => (
                  <article key={c.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
                    <div className="relative h-48 sm:h-56">
                      <Image src={c.image} alt={c.name} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-30`}></div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{c.name}</h2>
                      {c.ageRange && <p className="text-sm text-orange-600 font-medium mb-3">{c.ageRange}</p>}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.description}</p>
                      <ul className="space-y-2">
                        {c.keyFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
