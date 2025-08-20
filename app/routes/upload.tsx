import React, { useState, type FormEvent } from "react";
import FileUploader from "~/componenets/fileuploader";
import Navbar from "~/componenets/navbar";

const Upload = () => {
  const [isProcessing, setisProcessing] = useState(false);
  const [statusText, setstatusText] = useState("");
  const [file, setfile] = useState<File | null>(null);

  const handlsesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) {
      return;
    } else {
      const formData = new FormData(form);
      const CompanyNamy = formData.get("company-name");
      const JobTitle = formData.get("job-title");
      const jobDescription = formData.get("job-description");

      console.log({
        message: { CompanyNamy, JobTitle, jobDescription, file },
      });
    }
  };

  function handleFileSelct(file: File | null) {
    setfile(file);
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>
            AI Powered <i>Resume</i> Analyzer Engine
          </h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>{" "}
              <img src="\images\resume-scan.gif" className="w-full" alt="" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <>
              <form
                id="upload-form"
                onSubmit={handlsesubmit}
                className="flex flex-col gap-4 mt-8"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Description</label>
                  <textarea
                    rows={5}
                    name="job-description"
                    id="job-description"
                    placeholder="Job Description"
                  ></textarea>
                </div>
                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <div className="w-full">
                    <FileUploader onFileSelect={handleFileSelct} />
                  </div>
                </div>
                <button className="primary-button" type="submit">
                  Upload & Analyze
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
