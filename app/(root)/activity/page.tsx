import UserCard from "@/components/cards/UserCard";
import PostEcho from "@/components/forms/PostEcho";
import EchoesTab from "@/components/shared/EchoesTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page()
{
    
    const user = await currentUser();
    if(!user)
        return null;

    const userInfo = await fetchUser(user.id); 
     if(!userInfo?.onboarded)
             {redirect('/onboarding');}

     //getactivity
     const activity = await getActivity(userInfo._id);
     //activity now has array of the users who have interacted with the current user

    return(
        <section >
                <h1 className="head-text mb-10"> Activity</h1>
                <section className="flex flex-col gap-5 mt-10">
                    {  activity.length > 0 ? (
                            activity.map((item) => (
                                <Link key={item._id} href={`/echo/${item.parentId}`}>
                                    <article className="activity-card">
                                        <Image
                                            src={item.author.image}
                                            alt="user image"
                                            width={20}
                                            height={20}
                                            className="rounded-full object-cover"
                                        />
                                        <p className="!text-small-regular text-light-1 ml-3">
                                            <span className="mr-1 text-primary-500">
                                                {item.author.name}
                                            </span>
                                            replied to your echo
                                        </p>
                                    </article>
                                </Link>
                              
                            ))
                        ):
                        <p className="!text-base-regular text-light-3">no activity yet</p>
                    }

                </section>
        </section>
    )
}
export default Page;