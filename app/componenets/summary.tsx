import React from "react";
import ScoreGauge from "./scoreGauge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-lg">{title}</p>
        </div>
        <p className="text-lg">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-3 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-grey-500">
            This score is calculated based on the variables listed below
          </p>
        </div>
      </div>
      <Category
        title="Tone & Style"
        score={feedback.toneAndStyle.score ? feedback.toneAndStyle.score : 0}
      />
      <Category
        title="Content"
        score={feedback.content.score ? feedback.content.score : 0}
      />
      <Category
        title="Structure"
        score={feedback.structure.score ? feedback.structure.score : 0}
      />
      <Category
        title="Skills"
        score={feedback.skills.score ? feedback.skills.score : 0}
      />
    </div>
  );
};

export default Summary;
