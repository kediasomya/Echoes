interface Props{
    currentUserId :string,
    accountId:string,
    accountType:string
}

const EchoesTab =async({currentUserId,accountId,accountType}:Props) =>{
    return(
        <div>Echoes Tab</div>
    )
}
export default EchoesTab;