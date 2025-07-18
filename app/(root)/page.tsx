
import EchoCard from "@/components/cards/EchoCard";
import { fetchPosts } from "@/lib/actions/echo.actions";
import { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server"; 

export default async function home() {
  const result = await fetchPosts(1,10)
  const user = await currentUser();
  return (
    <header>
      <h1 className="head-text text-left">home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length===0 ? (
          <p className="no-result">no posts to show , create new posts</p>
        ) : (
          <>
            {/* echoCrds ka map banake jitne fetch kiye hai ek baar me , here 30 , to show  in a page , each as a separate echoCard */}
            {result.posts.map((post) => {
              console.log("POST COMMUNITY:", post.community);
              return (
                <EchoCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  Content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              );
            })}
          </>
        )}
      </section>
    </header>
  );
}
