"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  // console.log(chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* New Chat */}
        <NewChat />

        {/* <div className="hidden sm:inline">
          <ModelSelection />
        </div> */}

        <div className="flex flex-col space-y-2 my-2">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}
          {/* Map through the chat rows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <div className="flex flex-col items-center" onClick={() => signOut()}>
          <img
            src={session.user?.image!}
            alt="profile pic"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          />
          <div className="text-white cursor-pointer">Logout</div>
        </div>
      )}
      {/* we use img here instead of Image cos the image might not be from a trusted url, it might be from a google url, and next js will freak out cosits not whitelisted in next.config.js */}
    </div>
  );
}

export default SideBar;
