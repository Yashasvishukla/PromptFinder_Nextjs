import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();
  try {
    await connectToDB();

    // Create a new prompt
    const newPrompt = new Prompt({
      prompt: prompt,
      tag: tag,
      creator: userId
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500
    });
  }
};
