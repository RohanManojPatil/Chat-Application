import DashNav from '@/components/dashboard/DashNav';
import React from 'react';
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import CreateChat from '@/components/groupChat/CreateChat';
import { fetchChatGroup } from '@/fetch/groupfetch';
import GroupChatCard from '@/components/groupChat/GroupChatCard';

export default async function Dashboard() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    const groups: Array<ChatGroupType> | [] = session ? await fetchChatGroup(session?.user?.token!) : [];
    console.log("The groups are:", groups)
    return (
      <div>
        <DashNav
          name={session?.user?.name ?? 'Guest'}
          image={session?.user?.image ?? undefined}
        />
        <div className="container">
          <div className="mt-6 text-end">
            <CreateChat user={session?.user!} />
          </div>
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <div>Failed to load dashboard. Please try again later.</div>;
  }
}
