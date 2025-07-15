import UserCard from "@/components/cards/UserCard";
import PostEcho from "@/components/forms/PostEcho";
import EchoesTab from "@/components/shared/EchoesTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page()
{
    
    const user = await currentUser();
    if(!user)
        return null;

    const userInfo = await fetchUser(user.id); 
     if(!userInfo?.onboarded)
             {redirect('/onboarding');}

     //fetch the user
     const result = await fetchUsers({
        userId:user.id,
        pageNumber :1,
        pageSize :25,
        searchString:"",
        
     })
    return(
        <section >
                <h1 className="head-text mb-10"> search</h1>
                <div className="flex flex-col mt-14 gap-9">
                    {result.users.length===0?(
                        <p className="no-result"> no users foound</p>
                    ):(
                        <>
                        {result.users.map((person)=>(
                            <UserCard
                            key ={person.id}
                            id= {person.id}
                            name = {person.name}
                            username ={person.username}
                            imgUrl = {person.image}
                            personType = 'User'
                            />
                        ))}
                        {/* When you use .map() to render a list in React and pass key={person.id}
                         to <UserCard />, the key prop is special: React uses it internally for list 
                         rendering and reconciliation, but it is not passed as a prop to your component. */}
                        </>
                    )}

                </div>
               
        </section>
    )
}
export default Page;