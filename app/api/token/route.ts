import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const apiSecret = process.env.STREAM_SECRET;

  if (!apiKey || !apiSecret) {
    return new Response("API key or secret is missing", { status: 500 });
  }

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error("[/api/token] Error parsing request body:", error);
    return new Response("Invalid JSON in request body", { status: 400 });
  }

  console.log("[/api/token] body:", body);

  const userId = body?.userId;
  if (!userId) {
    return new Response("User ID is missing", { status: 400 });
  }

  const token = serverClient.createToken(userId);

  const response = {
    userId: userId,
    token: token,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
