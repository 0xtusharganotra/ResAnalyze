import type { Route } from "./+types/home";
import Navbar from "../componenets/navbar";
import { resumes } from "constants/index";
import ResumeCard from "~/componenets/resumecard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import FooterSign from "~/componenets/FooterSign";

export function meta({}: Route.MetaArgs) {
  // for SE0 - meta title , meta description
  return [
    { title: "ResAnalyze | AI Resume Analyzer & Job Matching Tool" },
    {
      name: "description",
      content:
        "ResAnalyze is an AI-powered resume analyzer that scores your resume, provides ATS insights, and gives tailored recommendations based on the job description you provide.",
    },
    {
      name: "keywords",
      content:
        "resume analyzer, AI resume analysis, job matching tool, resume scoring, ATS resume checker, career tool, job description matching, ResAnalyze",
    },
    // Open Graph (for Facebook, LinkedIn, etc.)
    { property: "og:title", content: "ResAnalyze | AI Resume Analyzer" },
    {
      property: "og:description",
      content:
        "Boost your job applications with AI. Analyze your resume, check ATS compatibility, and optimize it for your target job using ResAnalyze.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://yourdomain.com" }, // Replace with your domain
    { property: "og:image", content: "https://yourdomain.com/preview.png" }, // Replace with a preview image

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "ResAnalyze | AI Resume Analyzer" },
    {
      name: "twitter:description",
      content:
        "AI-powered resume analyzer that scores your resume and optimizes it for ATS & job descriptions.",
    },
    { name: "twitter:image", content: "https://yourdomain.com/preview.png" },
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
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1 className="pb-2">
            AI-Powered Resume Analyzer to Land Your <i>Dream Job</i>
          </h1>
          <p className="text-lg">
            <i>
              {" "}
              Get ATS-friendly insights, resume scores, and personalized
              recommendations tailored to your job description.
            </i>
          </p>
        </div>
        <div className=" p-5 mx-5 md:flex justify-center hidden backdrop: ">
          <img
            src="/images/resume-analyze-preview.png"
            className="rounded-2xl shadow-xl"
            alt=""
          />
        </div>

        <div className="sm:flex hidden mt-8 mb-7 ">
          <h1 className="!text-4xl">Recently Scanned Resume</h1>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume, id) => (
              <ResumeCard key={id} id={id} resume={resume} />
            ))}
          </div>
        )}
      </section>
      <FooterSign />
    </main>
  );
}
