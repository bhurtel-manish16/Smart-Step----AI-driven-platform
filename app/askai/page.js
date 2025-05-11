"use client";
import React, { useState } from "react";
import SideBar from "@/component/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AiResponse from "@/component/AiResponse";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [aiResponseData, setAiResponseData] = useState(null);
  const [displayAiresponse, setdisplayAiresponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    topic: "",
    time: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_data_to_send = formData;
    setFormData({
      topic: "",
      time: "",
      level: "",
    });
  
    setIsLoading(true);           // Start loading
    setdisplayAiresponse(true);   // Open modal immediately
  
    try {
      const response = await fetch("/api/processAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form_data_to_send),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setAiResponseData(data.data);   // Set server data
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);          // Done loading, either success or error
    }
  };
  

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 to-black">
      {displayAiresponse && (
        <AiResponse
          onClose={() => setdisplayAiresponse(false)}
          isLoading={isLoading}
          responseData={aiResponseData}
        />
      )}

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex justify-center overflow-y-auto pt-24 px-4">
        <div className="w-full max-w-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
              Personalize Your Learning Journey 🚀
            </h1>
            <p className="text-white/70 text-center mb-6">
              Tell us what you want to learn, and we'll create a plan just for
              you!
            </p>

            {/* Topic */}
            <label className="text-sm font-semibold text-white mb-1 block">
              What do you want to learn?
            </label>
            <input
              onChange={handleChange}
              value={formData.topic}
              type="text"
              name="topic"
              className="w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 mb-4"
              placeholder="Search for a topic..."
              required
            />

            {/* Time */}
            <label className="text-sm font-semibold text-white mb-1 block">
              How much time can you dedicate?
            </label>
            <input
              onChange={handleChange}
              value={formData.time}
              type="text"
              name="time"
              className="w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 mb-4"
              placeholder="Enter time in weeks..."
              required
            />

            {/* Level */}
            <label className="text-sm font-semibold text-white mb-2 block">
              Your current level
            </label>
            <div className="flex flex-col gap-3">
              {[
                "Beginner - I'm just starting out",
                "Intermediate - I know the basics",
                "Advanced - I'm looking for mastery",
              ].map((labelText, idx) => {
                const value = labelText.split(" ")[0].toLowerCase(); // beginner, intermediate, advanced
                return (
                  <label
                    key={idx}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border ${
                      formData.level === value
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/20 hover:border-purple-400"
                    } transition duration-300`}
                  >
                    <input
                      onChange={handleChange}
                      type="radio"
                      name="level"
                      value={value}
                      checked={formData.level === value}
                      className="form-radio text-purple-500 mr-3 h-5 w-5"
                      required
                    />
                    <span className="text-white">{labelText}</span>
                  </label>
                );
              })}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-semibold rounded-lg px-4 py-3 w-full transition duration-300"
            >
              Get My Personalized Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
