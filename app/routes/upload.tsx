import { prepareInstructions } from "constants";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/componenets/fileuploader";
import Navbar from "~/componenets/navbar";
import { convertPdfToImage } from "~/lib/pdftoimage";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setisProcessing] = useState(false);
  const [statusText, setstatusText] = useState("");
  const [file, setfile] = useState<File | null>(null);

  const handleAnalyze = async ({
    CompanyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    CompanyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setisProcessing(true);
    setstatusText("Uploading the file...");

    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) return setstatusText("Error : Failed to upload file");

    setstatusText("Converting to image ...");

    const imageFile = await convertPdfToImage(file);

    if (!imageFile.file) return setstatusText("Failed to convert pdf to image");

    setstatusText("Uploading the image...");

    const uploadedImage = await fs.upload([imageFile.file]);

    if (!uploadedImage) return setstatusText("Error: Failed to upload image");

    setstatusText("Preparing data...");

    const uuid = generateUUID();

    const data = {
      id: uuid,
      resumePath: uploadedImage.path,
      CompanyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume${uuid}`, JSON.stringify(data));

    setstatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) return setstatusText("Error : Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resum${uuid}`, JSON.stringify(data));

    setstatusText("Analysis complete , redirecting...");
    console.log(data);
  };

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) {
      return;
    } else {
      const formData = new FormData(form);
      const CompanyName = formData.get("company-name") as string;
      const jobTitle = formData.get("job-title") as string;
      const jobDescription = formData.get("job-description") as string;

      if (!file) return;

      handleAnalyze({ CompanyName, jobTitle, jobDescription, file });
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
                onSubmit={handlesubmit}
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
