import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

async function Page(){
    const user = await currentUser();

    const userInfo ={};
    const userData={
        id: user?.id,
        objectId: userInfo?.id,
        username: user?.username || userInfo?.username,
        name: user?.firstName || userInfo?.name || " ",
        bio:userInfo?.bio||" ",
        image : user?.imageUrl || userInfo?.image ,

        }
    
    return(
        
        <main className="flex flex-col max-w-3xl justify-start px-10 py-8 mt-auto">
            <h1 className="head-text">onboarding</h1>
            <p className="subtle-text-medium text-light-1 py-4">complete your profile to continue</p>
            <section className="bg-dark-2 text-light-2 p-4">
                <AccountProfile
                user={userData}
                btnTitle="Continue"/>   
            </section>
        </main>
    )}

export default Page;