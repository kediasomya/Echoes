"use client";

import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface props{
    
    id:string
    name :string
    username :string
    imgUrl :string
    personType :string
}
                        {/* When you use .map() to render a list in React and pass key={person.id}
                         to <UserCard />, the key prop is special: React uses it internally for list 
                         rendering and reconciliation, but it is not passed as a prop to your component.
                         thus , key is not accepted here, or put in props , key is a saved keyword */}

const UserCard=({id,name ,username , imgUrl ,personType}:props )=>{

    const router = useRouter();
    return(
        <article className="user-card ">
            <div className="user-card_avata r">
                <Image
                src={imgUrl}
                alt="logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
                />
            </div>

            <div className="flex-1 text-ellipsis justify-start">
                <h4 className="text-base1-semibold text-light-1">{name}</h4>
                <p className="text-medium text-gray-1">@{username}</p>
            </div>

            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>View</Button>
        </article>
    ) 
}
export default UserCard;
