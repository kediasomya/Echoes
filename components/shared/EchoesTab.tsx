import { fetchEchoById, fetchUserPosts } from "@/lib/actions/echo.actions";
import { redirect } from "next/navigation";
import EchoCard from "../cards/EchoCard";

interface Props{
    currentUserId :string,
    accountId:string,
    accountType:string
}

const EchoesTab =async({currentUserId,accountId,accountType}:Props) =>{
   //need to fetch the posts related to the user or the specific community
   //todo:fetchthreads

   let fetched = await fetchUserPosts(accountId)
   if(!fetched)
    redirect('/');

   
    return(
        <section className="flex flex-col mt-9 gap-10">
            {fetched.echoes.map((echo:any)=>(
            <EchoCard
                key = {echo._id.toString()}
                id = {echo._id.toString()}
                currentUserId = {currentUserId}
                parentId = {echo.parentId}
                Content = {echo.text}
                author= {accountType==='User'?
                    {
                        name:fetched.name ,image:fetched.image , id:fetched.id
                    }:{
                        name:echo.author.name ,image:echo.author.image , id: echo.author.id
                    }
                }
                community = {echo.commmunity}//todo 
                createdAt = {echo.createdAt}
                comments = {echo.children}
            />
            ))}
        </section>
    )
}
export default EchoesTab;