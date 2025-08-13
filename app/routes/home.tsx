import type { Route } from "./+types/home";
import Navbar from "../componenets/navbar";
import { resumes } from "constants/index";
import ResumeCard from "~/componenets/resumecard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResAnalyze" },
    {
      name: "description",
      content:
        "AI-powered resume analyzer that scores your Resume and gives tailored recommendations based on the job description you provide.",
    },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your applications and resume ratintgs</h1>
          <h2>Review Your subscription and check AI powered feedback</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume, id) => (
            <ResumeCard key={id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
