import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import Ats from "~/componenets/Ats";
import Details from "~/componenets/details";
import Summary from "~/componenets/summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "ResAnalyze | Resume Analyses" },
  {
    name: "description",
    content: "Detailed overview of your resume",
  },
]; // REMIX alternative of useState

const Resume = () => {
  const { auth, kv, fs, isLoading } = usePuterStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setresumeUrl] = useState("");
  const [feedback, setfeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    async function LoadResume() {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);

      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });

      const resumeUrl = URL.createObjectURL(pdfBlob);
      setresumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);

      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setfeedback(data.feedback);
    }

    LoadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nsv">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover top-0 h-[100vh] sticky items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="feedback-section animate-in fade-in duration-100 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume"
                  title="resume"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <Ats
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" alt="" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
