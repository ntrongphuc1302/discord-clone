"use client";

import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { User } from "stream-chat";
import { LoadingIndicator } from "stream-chat-react";
import MyChat from "@/components/MyChat";

type HomeState = {
  apiKey: string;
  user: User;
  token: string;
};

export default function Home() {
  const [homeState, setHomeState] = useState<HomeState | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const { user: clerkUser } = useClerk();

  const registerUser = useCallback(async () => {
    const userId = clerkUser?.id;
    const mail = clerkUser?.primaryEmailAddress?.emailAddress;
    if (userId && mail) {
      try {
        const response = await fetch("/api/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, email: mail }),
        });
        if (!response.ok) throw new Error("Failed to register user");
        const responseBody = await response.json();
        return responseBody;
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  }, [clerkUser]);

  async function getUserToken(userId: string, userName: string) {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error("Failed to fetch token");
      const responseBody = await response.json();
      const token = responseBody.token;
      if (!token) {
        console.log("No token found");
        return;
      }
      const user: User = {
        id: userId,
        name: userName,
        image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
      };
      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      if (apiKey) {
        setHomeState({ apiKey, user, token });
      }
    } catch (error) {
      console.error("Token fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (clerkUser?.id && clerkUser?.primaryEmailAddress?.emailAddress) {
      const action = clerkUser?.publicMetadata.streamRegistered
        ? Promise.resolve()
        : registerUser();
      action.then(() => {
        getUserToken(
          clerkUser.id,
          clerkUser?.primaryEmailAddress?.emailAddress || "Unknown"
        );
      });
    }
  }, [clerkUser]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!homeState) {
    return null;
  }

  return <MyChat {...homeState} />;
}
