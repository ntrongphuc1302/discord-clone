import { DiscordServer } from "@/models/DiscordServer";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CreateServerForm from "./CreateServerForm";

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
            server.id === activeServer?.id ? "selected-item" : ""
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
            <span
              key={server.id}
              className={`rounded-icon bg-[#2b2d31] w-[50px] flex items-center justify-center text-sm hover:bg-[#5865f2] ${
                server.id === activeServer?.id ? "selected-server-icon" : ""
              } `}
            >
              {server.name.charAt(0)}
            </span>
          )}
        </button>
      ))}
      <Link
        href={`/?createServer=true`}
        className="flex items-center justify-center rounded-icon bg-[#2b2d31] p-2 my-2 text-2xl font-light h-12 w-12 text-green-500 hover:bg-green-500 hover:text-white hover:border-radius-1.25 transition-all duration-200"
      >
        <span className="inline-block">+</span>
      </Link>
      <CreateServerForm />
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
