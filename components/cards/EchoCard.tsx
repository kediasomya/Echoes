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


const EchoCard=({
    
    id,
    currentUserId,
    parentId,
    Content,
    author,
    community ,
    createdAt,
    comments 
}:Props)=>{

    return(
        <article>
            <h2 className="text-small-regular text-light-2">
                {Content}
            </h2>
        </article>
    )

}
export default EchoCard;