import { BookOpen, Heart, Users, MessageSquare, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";

const foundationData = [
  {
    title: "Character Building",
    description:
      "Character and moral values shape a child's journey to success. We help every child grow into a confident, kind, and well-rounded individual.",
    icon: Heart,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Enabling Environment",
    description:
      "We value establishing a hospitable, nurturing, supportive setting that encourages a sense of community and belonging.",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Constant Communication",
    description:
      "Regularly informing parents about their children's activities fosters a sense of community beneficial to the kid, parents, and school.",
    icon: MessageSquare,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Celebrating Uniqueness",
    description:
      "Every child in our care is unique and extraordinarily blessed, and embracing that individuality is essential to helping them establish self-worth.",
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
  },
];

export default function Foundation() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/50 to-white py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/15 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-800 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <BookOpen className="w-4 h-4" />
            Building Strong Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            We Give Them the Right Foundation
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our holistic approach ensures every child develops the skills, confidence, and character
            needed for lifelong success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {foundationData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 text-center tv-shadow-soft tv-card-hover tv-rise"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
