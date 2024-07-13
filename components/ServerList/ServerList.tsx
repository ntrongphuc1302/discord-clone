import { DiscordServer } from "@/models/DiscordServer";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useState } from "react";

export default function ServerList(): JSX.Element {
  const [activeServer, setActiveServer] = useState<DiscordServer | undefined>();
  const servers: DiscordServer[] = [
    {
      id: "1",
      name: "Test Server 1",
      image:
        "https://images-ext-1.discordapp.net/external/qZ96EQSLYskJq666D6qk4orOX6PpfLfa7nxpJAd2TTo/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1087407984591765555/a_3532a16f727013220a1698ff38d5ce3a.gif?width=468&height=468",
    },
    {
      id: "2",

      name: "Test Server 2",

      image:
        "https://i.pinimg.com/originals/0f/8f/c7/0f8fc7cd84dd73bf3b04a4833273a854.jpg",
    },
    {
      id: "3",
      name: "Test Server 3",
      image: "",
    },
  ];

  return (
    <div className="bg-dark-gray h-full flex flex-col items-center">
      {servers.map((server) => (
        <button
          key={server.id}
          className={`p-0.5 sidebar-icon ${
            server.id === activeServer?.id ? "selected-icon" : ""
          }`}
          onClick={() => setActiveServer(server)}
        >
          {server.image && checkIfUrl(server.image) ? (
            <Image
              className="rounded-icon"
              src={server.image}
              width={50}
              height={50}
              alt="Server Icon"
            />
          ) : (
            <span className="rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm">
              {server.name.charAt(0)}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  function checkIfUrl(path: string): Boolean {
    try {
      const _ = new URL(path);
      return true;
    } catch (_) {
      return false;
    }
  }
}
