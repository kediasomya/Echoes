import EchoCard from "@/components/cards/EchoCard";
import Comment from "@/components/forms/Comment";
import { fetchEchoById } from "@/lib/actions/echo.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
//this page is to show the details of a post  , thus taked in the id of the echo as a parameter
//making folder named[id] maked it known as a dynamic thing , 
//and thus with each diff id , it passes it on the params(a next js keyword)
const Page= async( {params}:{params:{id:string}})=>{

    const {id} = await params;
    if(!id) return null;
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');
    
    const echo = await fetchEchoById(id);
    if (!echo) {
        return <div>Echo not found</div>;
      }
    return(
    <section className="relative">

        {/* //showing the main echo */}
        <div>
            <EchoCard
            key = {echo._id.toString()}
            id = {echo._id.toString()}
            currentUserId = {user?.id || ""}
            parentId = {echo.parentId}
            Content = {echo.text}
            author= {echo.author}
            community = {echo.community}
            createdAt = {echo.createdAt}
            comments = {echo.children}
        />
        </div>


        {/* //Converted MongoDB ObjectIds to strings before passing them as props to client components
        // (EchoCard and Comment) in your app/(root)/echo/[id]/page.tsx file.
        //Why this matters:
        //Next.js only allows plain objects and primitives (like strings) to be passed from server to 
        //client components.
        //MongoDB ObjectIds are not plain objects—passing them directly causes runtime errors */}


        {/* showing the comment area */}
        <div className="mt-7">
            <Comment
                echoId = {echo._id.toString()}
                currentUserImage = {userInfo.image}
                currentUserId = {JSON.stringify(userInfo._id)}

                //these all will act as the parameters passed int o the comment funtion
            />

        </div>

        <div className="mt-10 flex flex-col gap-3">
            {
                echo.children.map((childItem:any )=>(
                    <EchoCard
                        key = {childItem._id.toString()}
                        id = {childItem._id.toString()}
                        currentUserId = {childItem?.id || ""}
                        parentId = {childItem.parentId}
                        Content = {childItem.text}
                        author= {childItem.author}
                        community = {childItem.community}
                        createdAt = {childItem.createdAt}
                        comments = {childItem.children}
                        iscomment
                    />
                    
                ))
            }

        </div>
    </section>
    )
}
export default Page;