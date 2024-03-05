import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts, { status: 200 }));
  } catch (error) {
    console.log(`Error in GET /api/prompts: ${error}`);
    return new Response(null, { status: 500 });
  }
};
