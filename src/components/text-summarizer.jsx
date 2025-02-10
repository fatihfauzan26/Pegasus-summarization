import React, { useState, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";

const HUGGINGFACE_KEY = import.meta.env.VITE_HUGGINGFACE_KEY;

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(20);

    if (inputWordCount < 50) {
      alert('Teks yang anda masukkan kurang dari 50 kata!');
      setIsLoading(false);
      setProgress(0);
      return;
    }

    try {
      setProgress(50);
      const result = await hf.summarization({
        model: "fatihfauzan26/PEGASUS_mini",
        inputs: inputText,
        parameters: {
          min_length: 100,
          max_length: 300,
        },
      });
      setProgress(80);
      setSummary(result.summary_text);
    } catch (error) {
      console.error("Error:", error);
      setSummary("Terjadi kesalahan server. Coba beberapa saat lagi.");
    }

    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 500);
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
            {isLoading && (
              <div className="mt-4">
                <Progress value={progress} />
                <p className="text-center mt-2 text-sm text-gray-600">{progress}%</p>
              </div>
            )}
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
            <Textarea
              value={summary || ""}
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
            Jumlah kata setelah peringkasan: <span className="border rounded text-blue-500 p-1">{summaryWordCount}</span>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default TextSummarizer;
