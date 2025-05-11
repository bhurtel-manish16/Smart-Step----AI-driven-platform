import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(topic, time, level) {
  const prompt = `You are an expert AI acting as a professional instructor and curriculum designer. And make sure all the data are upto date, relavant, accurate and the link to the resources should be working. Search the web before providing the data. Website SHOULD NOT have 404 Noot found error.
Your task is to generate only strictly valid and perfectly structured JSON outputs — no extra text, comments, markdown formatting, explanations, or apologies.

Your entire output must be a single, syntactically valid JSON object adhering exactly to the following structure:

  Topic: ${topic}
  Time to Complete: ${time}
  Level of Understanding: ${level}
{
  "topic": "...",
  "time_to_complete": "...",
  "level": "...",
  "overall_goal": "...",
  "estimated_total_hours": "...",
  "weekly_plan": [
    {
      "week_number": 1,
      "topic_focus": "...",
      "learning_objectives": [
        "...",
        "..."
      ],
      "estimated_hours": "...",
      "introduction": "...",
      "key_concepts_this_week": [
        "...",
        "..."
      ],
      "key_activities": [
        {
          "activity": "...",
          "estimated_duration": "...",
          "learning_focus": "...",
          "resources": [
            {
              "type": "...",
              "title": "...",
              "url": "...",
              "description": "..."
            }
          ],
          "deliverables": "..."
        }
      ],
      "assessment": {
        "type": "...",
        "description": "...",
        "instructions": "..."
      },
      "notes_for_the_week": "..."
    },
    // ... more weeks as needed
  ],
  "overall_summary": "...",
  "potential_challenges": [
    "...",
    "..."
  ],
  "suggested_next_steps": "...",
  "generation_notes": "..."
}


Now, generate the JSON output for the following user request:
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        type: "text",
        text: prompt,
      },
    ],
  });

  console.log("Raw API Response:", response.text); // Keep logging for inspection

  try {
    const startIndex = response.text.indexOf('{');
    const endIndex = response.text.lastIndexOf('}');
    if(response.text[endIndex - 1] === ',') {
      endIndex -= 1;
    }
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      const jsonString = response.text.substring(startIndex, endIndex + 1);
      const jsonResponse = JSON.parse(jsonString);
      console.log("Parsed JSON Response:", jsonResponse); // Log the parsed JSON for inspection
      return jsonResponse;
    } else {
      console.error("Could not find valid JSON boundaries in the response.");
      console.error("Raw response text:", response.text);
      return null;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Raw response text:", response.text);
    return null;
  }
}

export async function POST(req) {
  const { topic, time, level } = await req.json();
  const aidata = await main(topic, time, level);
  return NextResponse.json({
    message: "Data received successfully",
    data: aidata,
  });
}
