import React from "react";
import { FaGithub } from "react-icons/fa";

const FooterSign = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-3 gap-2">
        <p>
          <i>Created by @TusharGanotra</i>
        </p>
        <a href="https://github.com/0xtusharganotra/ResAnalyze">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default FooterSign;
