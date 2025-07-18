import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
//import DeleteEcho from "../forms/DeleteEcho";

interface Props{
    
    id:string,
    currentUserId:string,
    parentId:string |null,
    Content:string,
    author:{
        name:string,
        image:string,
        id:string
    },
    community:{
        id:string;
        name:string;
        image:string;
    }|null ,
    createdAt:string,
    comments:{
        author:{
            image:string
        }
    }[]
    iscomment?:boolean;
    //In TypeScript, a property is
    // optional if you add a ? after its name in the interface.
}

function EchoCard({
    id,
    currentUserId,
    parentId,
    Content,
    author,
    community ,
    createdAt,
    comments ,
    iscomment
}:Props){

    return(
        
        <article className={`flex flex-col w-full rounded-xl ${iscomment?'px-0 xs:px-7':  'bg-dark-2 p-7'}`}> 
            <div className="flex justify-between items-start">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center ">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                        <Image
                            src={author.image}
                            alt="profile image"
                            fill
                            className="cursor-pointer rounded-full object-cover"
                        />
                        </Link>
                        <div className =" echoes-card_bar"/>
                        <div className =" echoes-card_bar"/>
                        
                    </div>
                    <div className =" flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                        </Link>


                        <p className="mt-2 text-small-regular text-light-2">{Content}</p>



                        <div className={`${iscomment && 'mb-10'} *:flex flex-col mt-5 gap-3`}>
                            <div className="flex gap-3.5">
                                <Image 
                                src="/assets/heart-gray.svg" 
                                alt = 'heart'
                                 className="cursor-pointer object-contain " 
                                 width={24}
                                  height={24}
                                   />
                                <Link href={`/echo/${id}`}>
                                <Image
                                 src="/assets/reply.svg"
                                  alt = 'reply' 
                                  className="cursor-pointer object-contain "
                                   width={24}
                                    height={24}
                                     />

                                </Link>
                                <Image
                                 src="/assets/repost.svg"
                                  alt = 'repost' 
                                  className="cursor-pointer object-contain "
                                  width={24} 
                                  height={24} 
                                  />
                                <Image 
                                src="/assets/share.svg" 
                                alt = 'share' 
                                className="cursor-pointer object-contain "
                                 width={24} 
                                 height={24} 
                                 />
                            </div>
                            {iscomment && comments.length>0 && (
                                <div >
                                <Link href={`/echo/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* delete thread */}
                {/* show comment logs */}

                {/* <DeleteEcho
                    echoId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={iscomment}
        /> */}
            </div> 
                
                 {!iscomment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                {comments.slice(0, 2).map((comment, index) => (
                    <Image
                    key={index}
                    src={comment.author.image}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                    />
                ))}

                <Link href={`/echo/${id}`}>
                    <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                    </p>
                </Link>
                </div>
            )}

                {!iscomment && community &&(
                    <Link href={`/communities/${community.id}`} 
                    className="mt-5 flex items-center "
                    >
                        <p className="mt-1 text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)}
                             {community && ` - ${community.name} Community`}
                        </p>

                        <Image  
                        src={community.image}
                        alt="community image"
                        height={14}
                        width={14}
                        className ="ml-1 rounded-full object-cover"
                        />
                    </Link>
                    )}
        </article>
    );

}
export default EchoCard;