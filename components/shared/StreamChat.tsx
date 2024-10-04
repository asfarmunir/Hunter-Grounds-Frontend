"use client";
import {
  createNewStreamUser,
  createStreamUserToken,
} from "@/database/actions/user.action";
import { ISessionUser } from "@/lib/types/sessionUser";

import React, { use, useCallback, useEffect, useState } from "react";
import type {
  User,
  ChannelSort,
  ChannelFilters,
  ChannelOptions,
  Channel as StreamChannel,
} from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useSearchParams } from "next/navigation";

import "stream-chat-react/dist/css/v2/index.css";
// import "./layout.css";

const Chats = ({ userData }: { userData: ISessionUser }) => {
  const [channel, setChannel] = useState<StreamChannel>();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
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

  const createChannel = async () => {
    if (!client) return;
    const response = await client.queryUsers({
      id: { $in: ["66f46e6c4ec7d951720cc09b"] },
    });
    if (response.users.length === 0) {
      const newUser = await createNewStreamUser(
        "66f46e6c4ec7d951720cc09b",
        "test",
        "https://getstream.io/random_png/?name=test"
      );
    }
    const newChannel = client.channel("messaging", "he232", {
      image: "https://getstream.io/random_png/?name=react",
      name: "test2232",
      members: ["66f414368b1494d49d97e75f", "66f46e6c4ec7d951720cc09b"],
    });

    await newChannel.watch();
  };
  useEffect(() => {
    if (userId) {
      createChannel();
    }
  }, [client]);

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: "messaging",
    // members: { $in: [userData.id] },
  };
  const options: ChannelOptions = {
    limit: 10,
  };

  if (!client) return <div>Loading...</div>;

  const CustomListItem = (props: any) => {
    const { children } = props;
    return (
      <div className="str-chat__channel-list-messenger str-chat__channel-list-messenger-react rounded-lg p-5  ">
        <h3 className="text-2xl font-bold mb-3">Messages</h3>
        <div
          className="str-chat__channel-list-messenger__main str-chat__channel-list-messenger-react__main"
          role="listbox"
        >
          {children}
        </div>
      </div>
    );
  };
  return (
    <div className=" p-4 md:p-8 md:pr-16 w-full flex flex-col md:flex-row justify-center gap-12 ">
      <Chat client={client} theme="str-chat__theme-dark ">
        <ChannelList
          filters={filters}
          sort={sort}
          options={options}
          List={CustomListItem}
        />
        {/* <Channel channel={channel}> */}
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default Chats;
