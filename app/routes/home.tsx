import type { Route } from "./+types/home";
import Navbar from "../componenets/navbar";
import { resumes } from "constants/index";
import ResumeCard from "~/componenets/resumecard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

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
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your applications and resume ratintgs</h1>
          <h2>Review Your subscription and check AI powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume, id) => (
              <ResumeCard key={id} id={id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
