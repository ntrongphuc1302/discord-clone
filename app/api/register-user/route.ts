import { clerkClient } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  if (!apiKey) {
    return new Response(null, { status: 500, statusText: "API Key not found" });
  }
  const serverClient = StreamChat.getInstance(
    apiKey,
    process.env.STREAM_SECRET
  );
  const body = await request.json();
  console.log("[/api/register-user] body:", body);

  const userId = body?.userId;
  const mail = body?.email;

  if (!userId || !mail) {
    return new Response(null, {
      status: 400,
      statusText: "Missing user ID or email",
    });
  }

  const user = await serverClient.upsertUser({
    id: userId,
    role: "user",
    name: mail,
    imageUrl: `https://getstream.io/random_png/?id=${userId}&name=${mail}`,
  });

  const params = {
    publicMetadata: {
      streamRegistered: true,
    },
  };

  const updatedUser = await clerkClient.users.updateUser(userId, params);

  console.log("[/api/register-user] user:", updatedUser);

  const response = {
    userId: userId,
    userName: mail,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
