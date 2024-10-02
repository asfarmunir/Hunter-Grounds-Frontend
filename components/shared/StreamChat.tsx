"use client";
import { createStreamUserToken } from "@/database/actions/user.action";
import { ISessionUser } from "@/lib/types/sessionUser";
import React, { useCallback } from "react";
import { useCreateChatClient, Chat } from "stream-chat-react";

const StreamChat = ({ userData }: { userData: ISessionUser }) => {
  const streamUser = {
    id: userData.id,
    name: userData.name,
    image: userData.image,
  };

  const tokenProvider = useCallback(async () => {
    return await createStreamUserToken(userData.id);
  }, [userData.id, createStreamUserToken]);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    tokenOrProvider: tokenProvider,
    userData: streamUser,
  });

  if (!client) return <div>Loading...</div>;

  return <Chat client={client}>client is ready! lesgoo</Chat>;
};

export default StreamChat;
