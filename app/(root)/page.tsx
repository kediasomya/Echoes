
import EchoCard from "@/components/cards/EchoCard";
import { fetchPosts } from "@/lib/actions/echo.actions";
import { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server"; 


export default async function home() {

  const result = await fetchPosts(1,30)
  const user = await currentUser();
  console.log('heyyyyyyyyyy')
  console.log(result);
  return (
    <header>
      <h1 className="head-text text-left">home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length===0?(
          <p className="no-result">no posts to show , create new posts</p>
        ):(
          <>
          {result.posts.map((post)=>(
            <EchoCard
              key = {post._id}
              id = {post._id}
              currentUserId = {user?.id || ""}
              parentId = {post.parentId}
              Content = {post.text}
              author= {post.author}
              community = {post.commmunity}
              createdAt = {post.createdAt}
              comments = {post.children}
            />
          ))}
          </>
        )}

      </section>
    </header>
  );
}
