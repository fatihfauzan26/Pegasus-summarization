import React, { useState, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Textarea } from "./ui/textarea";

const HUGGINGFACE_KEY = import.meta.env.VITE_HUGGINGFACE_KEY;

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputWordCount, setInputWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);

  const hf = new HfInference(HUGGINGFACE_KEY);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  useEffect(() => {
    setInputWordCount(countWords(inputText));
  }, [inputText]);

  useEffect(() => {
    setSummaryWordCount(countWords(summary));
  }, [summary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputWordCount < 50) {
      alert('Teks yang anda masukkan kurang dari 50 kata!')
      setIsLoading(false)
      return
    }

    try {
      const result = await hf.summarization({
        model: "fatihfauzan26/PEGASUS_mini",
        inputs: inputText,
        parameters: {
          min_length: 100,
          max_length: 300,
        //   temperature: 1.1,
        //   top_k: 900,
        //   top_p: 0.95,
        //   repetition_penalty: 2.1
        },
      });
      setSummary(result.summary_text);
    } catch (error) {
      console.error("Error:", error);
      setSummary("Terjadi kesalahan server. Coba beberapa saat lagi.");
    }

    setIsLoading(false);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[700px] max-w-2xl rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-6">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Masukkan teks"
              className={`flex-grow p-4 mb-4 border rounded resize-none`}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText}
              className="px-4 py-10 bg-black-90 text-white rounded hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </form>
          <div className="mt-5 text text-black-500">
          Jumlah kata sebelum peringkasan: <span className="border border-solid border-gray-950 rounded text-red-500 p-1">{inputWordCount}</span> 
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-6">
          <div className="flex-grow p-2 border rounded overflow-auto mb-4">
            {/* {summary ? summary : "Hasil summarization."} */}
            <Textarea
              value={summary || ""} // Jika summary null/undefined, gunakan string kosong
              placeholder={!summary ? "Hasil summarization." : ""}
              className={`flex-grow p-4 mb-4 border rounded resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={!summary}
            className="px-4 py-10 bg-black-90 text-white rounded hover:bg-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => {
              setSummary("");
              setInputText("");
            }}
          >
            Hapus teks
          </button>
          <div className="mt-5 text text-black-500">
            Jumlah kata setelah peringkasan: <span className = "border rounded text-blue-500 p-1"> {summaryWordCount}</span>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default TextSummarizer;
