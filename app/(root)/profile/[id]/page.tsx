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
    const {id}= await params;
    if(!id)
        return null;
    const user = await currentUser();
    if(!user)
        return null;

    const userInfo = await fetchUser(id);
    
    //fetches the id of the user whose profile we clicked on
    if(!userInfo?.onboarded)
         {redirect('/onboarding');}
        return(
            <section>
                <ProfileHeader
                accountId = {userInfo.id}
                authUserId= {user.id}
                name= {userInfo.name}
                username ={userInfo.username}
                imgUrl ={userInfo.image}
                bio={userInfo.bio}

                />
                <div>
                    <Tabs className="w-full " defaultValue="echoes">
                        <TabsList className="tab">
                            {profileTabs.map((tab)=>(
                                <TabsTrigger key={tab.label} value={tab.value } className="tab">
                                    <Image
                                        src={tab.icon}
                                        alt ={tab.label}
                                        height ={24}
                                        width={24}
                                        className="object-contain"
                                    
                                    />
                                    <p className="max-sm:hidden">{tab.label}</p>

                                    {tab.label === "Echoes" && (
                                    <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                                        {userInfo.echoes.length}
                                    </p>
                                    )}
                                </TabsTrigger>
                            ))}

                        </TabsList>

                        {profileTabs.map((tab)=>(
                            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-lime-50">
                                <EchoesTab
                                    currentUserId = {user.id}
                                    accountId = {userInfo.id}
                                    accountType = "User"
                                    
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                
            </section>
        
        )
}
    
export default Page;