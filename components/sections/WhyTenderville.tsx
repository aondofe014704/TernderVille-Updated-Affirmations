import { BookOpen, Users, UserCheck } from "lucide-react";
import Container from "@/components/layout/Container";

const data = [
  {
    title: "Group Learning",
    description:
      "Tenderville School believes in the power of collaboration and recognizes the immense value of group learning experiences, fostering teamwork and social skills.",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Individual Grooming",
    description:
      "We believe in each child's holistic development, including fostering personal growth and individual grooming, to build confidence and self-awareness.",
    icon: UserCheck,
    color: "from-green-500 to-green-600",
  },
];

export default function WhyTenderville() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-800 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <BookOpen className="w-4 h-4" />
            A Place to Thrive
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            There is a Place for Your Child
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Tenderville, we nurture a growth mindset. We encourage students to embrace challenges,
            learn from failures, and persevere — equipping them to adapt, innovate, and thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 text-center tv-shadow-soft tv-card-hover tv-rise"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
