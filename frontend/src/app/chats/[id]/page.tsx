import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/chatsFetch';
import { fetchChatGroup, fetchChatUsers } from '@/fetch/groupfetch';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function chat({params} : {params : {id: string}}) {
  if(params.id.length !== 36)
  {
      return notFound()
  }
  const group:ChatGroupType | null = await fetchChatGroup(params.id)
  const chats:Array<MessageType> | [] = await fetchChats(params.id)
  if(group === null)
  {
      return notFound()
  }

  const users:Array<GroupChatUserType> | [] = await fetchChatUsers(params.id)
  return (
    <div>
        <h1>Hello I am chat</h1>
        <ChatBase users={users} group={group} oldMessages={chats}/>
    </div>
  )
}
