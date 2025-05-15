import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET prompt by id

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH prompt

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    // Find the prompt by id
    const existingPrompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    // Update the prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save the prompt
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
