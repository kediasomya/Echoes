import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

async function Page(){
    const user = await currentUser();
    if(!user)
        return <div>user not found</div>
    const userInfo = await fetchUser(user.id); // fetch from your DB

    const userData = {
      id: userInfo?.id || user?.id,
      objectId: userInfo?._id?.toString(), // <-- Convert to string
      username: userInfo?.username || user?.username,
      name: userInfo?.name || user?.firstName || " ",
      bio: userInfo?.bio || " ",
      image: userInfo?.image || user?.imageUrl, // use DB image first!
    };
    
    return(
        
        <main className="flex flex-col max-w-3xl justify-start px-10 py-8 mt-auto">
            <h1 className="head-text">onboarding</h1>
            <p className="subtle-text-medium text-light-1 py-4">complete your profile to continue</p>
            <section className="bg-dark-2 text-light-2 p-4">
                <AccountProfile user={userData} btnTitle="Continue"/>   
            </section>
        </main>
    )}

export default Page;