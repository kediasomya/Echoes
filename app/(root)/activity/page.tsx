import PostEcho from "@/components/forms/PostEcho";
import EchoesTab from "@/components/shared/EchoesTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({params}:{params:{id:string}})
{
    const user = await fetchUser(params.id);
    if(!user) redirect("/");

    return(
        <section >
                <h1 className="head-text mb-10"> activity
                
                </h1>
        </section>
    )
}
export default Page;