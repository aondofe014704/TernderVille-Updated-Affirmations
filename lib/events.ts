/**
 * Static events registry.
 * 
 * Each event has:
 * - id: unique slug for URL (e.g., /events/spring-term-2025)
 * - title: event card title
 * - excerpt: short preview text shown on card
 * - banner: path to banner image in /public/assets/
 * - content: full HTML content shown on detail page
 * - date: publish/event date (for sorting and display)
 */

export interface Event {
  id: string;
  title: string;
  excerpt: string;
  banner: string;
  content: string;
  date: string; // ISO date string
}

export const EVENTS: Event[] = [
  {
    id: "spring-term-excellence-2025",
    title: "Celebrating Excellence, Growth, and Team Spirit",
    excerpt:
      "As we conclude another remarkable half term, we reflect on achievements, memorable experiences, and milestones that shaped our learning journey.",
    banner: "/assets/events.jpeg",
    date: "2025-03-15",
    content: `
      <p>As we conclude another remarkable half term, we are delighted to reflect on the achievements, memorable experiences, and milestones that have shaped our learning journey.</p>

      <p>This half term has been a true testament to the values that define Tenderville School—excellence, character, action, and service. Our students have demonstrated outstanding commitment to academic success, embracing every opportunity to learn, grow, and excel in their various pursuits.</p>

      <p>One of the highlights of the term was our vibrant <strong>Inter-House Sports Competition</strong>, where students showcased exceptional talent, discipline, resilience, and sportsmanship. Beyond the excitement of competition, the event fostered teamwork, friendship, and healthy participation, creating lasting memories for everyone involved.</p>

      <p>As we look ahead to the Summer Term, we remain committed to providing a stimulating and supportive environment where every child can thrive academically, socially, and personally. We are excited about the opportunities, challenges, and accomplishments that lie ahead.</p>

      <p>We extend our heartfelt appreciation to our parents and guardians for their unwavering support, partnership, and trust. Your encouragement continues to play a vital role in the success of our students and the growth of our school community.</p>

      <p>Together, we celebrate the progress made, the lessons learned, and the victories achieved. Together, we move forward with confidence, purpose, and determination.</p>

      <p>At Tenderville School, we are not just educating students—we are nurturing future leaders, innovators, and responsible citizens.</p>

      <p><strong>Here's to a successful and inspiring Summer Term ahead!</strong></p>
    `,
  },
];
