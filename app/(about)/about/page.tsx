import Link from "next/link";
import AboutCoverSection from "../../components/About/AboutCoverSection";
import SkillsSection from "../../components/About/SkillsSection";

export const metadata = {
  title: "About Me",
  description: `Here are some details about my self.`,
};

export default function AboutPage() {
  return (
    <div>
      <AboutCoverSection />
      <SkillsSection />
      <h2 className="mt-8 font-semibold text-lg md:text-2xl self-start mx-5 xs:mx-10 sm:mx-12 md:mx-16 lg:mx-20 text-dark dark:text-light dark:font-normal">
        Have a project in mind? Reach out to me 📞 from{" "}
        <Link
          href="/contact"
          className="!underline underline-offset-2 text-blue-500"
        >
          here
        </Link>{" "}
        and let's make it happen.
      </h2>
    </div>
  );
}
