import { useState } from "react";
import Text from "./Text";

const Report = ({ appointmentId }) => {
  const [isWritingReport, setIsWritingReport] = useState(false);
  const [isReportEmpty, setIsReportEmpty] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [reportText, setReportText] = useState("");

  const handleDiagnoseClick = () => {
    setIsWritingReport(true);
  };

  const handleReportChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSaveClick = () => {
    const trimmedReport = reportText.trim();
    if (trimmedReport === "") {
      setReportText("");
      setIsReportEmpty(true);
    } else {
      setIsConfirmationVisible(true);
    }
  };

  const handleConfirmationYes = () => {
    const body = {
      appointmentID: appointmentId,
      report: reportText.trim(),
    };

    fetch("http://localhost:8080/healthily/api/appointment/generateReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Report Submitted");
          setIsReportSubmitted(true);
          setIsConfirmationVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmationNo = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <>
      {isReportSubmitted ? (
        <>
          <div className="flex items-start gap-3">
            <div className="text-lg font-medium text-[#605BFF] w-[150px] shrink-0">
              Report
            </div>
            <div className="w-full h-[200px] overflow-y-auto">
              <div className="text-lg font-medium text-slate-500">
                : {reportText}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!isWritingReport && (
            <div>
              <button
                className="bg-[#605BFF] px-6 py-2 rounded-md text-white"
                onClick={handleDiagnoseClick}
              >
                Diagnose
              </button>
            </div>
          )}
          {isWritingReport && (
            <>
              <div className="flex items-start">
                <Text label="Report" />
                <div className="w-full h-[150px] overflow-y-auto">
                  <textarea
                    id="report"
                    className="text-lg font-medium text-slate-500 focus:outline-none px-2 w-full"
                    rows={5}
                    placeholder={
                      isReportEmpty
                        ? "Please enter report prescription"
                        : "Write Prescription"
                    }
                    value={reportText}
                    onChange={handleReportChange}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center">
                <button
                  onClick={handleSaveClick}
                  className="bg-[#605BFF] px-8 py-2 rounded-md text-white"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </>
      )}
      {isConfirmationVisible && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#7f7f7f80]">
            <div className="flex flex-col items-center justify-center gap-6 p-4 border rounded-md bg-[#efeeff]">
              <div className="text-xl font-medium text-slate-500">
                Are sure to save report?
              </div>
              <div className="flex gap-4 w-full">
                <button
                  className="w-full px-4 py-1 bg-[#605BFF] rounded-md text-lg font-medium text-white"
                  onClick={handleConfirmationYes}
                >
                  Yes
                </button>
                <button
                  className="w-full px-4 py-1 bg-[#605BFF] rounded-md text-lg font-medium text-white"
                  onClick={handleConfirmationNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Report;
