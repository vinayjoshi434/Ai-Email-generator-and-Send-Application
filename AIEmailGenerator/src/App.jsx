import { useState } from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("AI Generated Email");

  const handlegenerate = async () => {
    console.log("handlegenerate hit");

    try {
      const res = await axios.post("http://localhost:5000/api/generateemail", {
        prompt,
      });

      console.log(res);

      setGeneratedEmail(res?.data?.content);
      toast.success("Email Generated");
      setPrompt("");
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  const handlesend = async () => {
    console.log("handlesend hit");
    try {
      const send = await axios.post("http://localhost:5000/api/send", {
        to,
        subject,
        body: generatedEmail,
      });
      toast.success("Email sent!");
      setGeneratedEmail("");
      setSubject("");
      setTo("");
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  return (
    <>
      <div>
        <div className="space-y-8">
          <div className="text-center m-6 space-y-4">
            <h1 className="text-amber-700 font-sans text-4xl">
              AI Email Generator
            </h1>
            <p className="text-red-950 font-serif">
              This full-stack web application allows users to generate
              professional, AI-written emails using the Groq API (LLaMA 3 model)
              and send them directly via email using Nodemailer.The project
              demonstrates strong backend integration, AI API usage, and email
              automation capabilities.
            </p>
          </div>
          <div className=" flex gap-2 justify-center items-center ">
            <div className="flex w-lg gap-3 items-center shadow-lg shadow-indigo-500/50  px-10 rounded-full py-3">
              <label htmlFor="promptinput" className="text-xl">
                Prompt :
              </label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter Prompt here..."
                className="outline-none p-2 bg-gray-300 rounded-lg w-86"
              />
            </div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ height: "35px" }}
              onClick={handlegenerate}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
      <div className=" m-10 p-2 border border-amber-600">
        <div className="flex justify-center gap-4 ">
          <div>
            <label htmlFor="">To {<SendIcon />} </label>
            <input
              type="text"
              className="w-72 px-2 outline-2 outline-blue-700"
              placeholder="Enter Reciepient Email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Subject: </label>
            <input
              type="text"
              className="w-72 px-2 outline-2 outline-blue-700"
              placeholder="Set Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div>
          <textarea
            className="border-blue-700 m-10 outline-2 p-4"
            rows="10"
            value={generatedEmail}
            onChange={(e) => setGeneratedEmail(e.target.value)}
            style={{ width: "90%", marginTop: 10 }}
          />
          <Button
            className="mx-10"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ height: "35px" }}
            onClick={handlesend}
          >
            send
          </Button>
        </div>
      </div>
      {/* ✅ ToastContainer at root level */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
