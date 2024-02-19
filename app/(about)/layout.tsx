import { InsightRoll } from "../components/About/insight-roll";

const insights = [
  "20+ Projects Completed",
  "3+ Years of Freelancing",
  "99% Client Satisfaction",
  "20K+ Subscribers",
  "Authored In-Depth Course on Educative",
  "Contributed as a Technical Course Reviewer 📝",
  "Recipient of the Hackernoon Noonies Award 🏆",
];

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      <div className="mx-10 sm:mx-10">{children}</div>
    </main>
  );
}
