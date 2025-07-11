"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { fi } from "zod/v4/locales";
import { isGeneratorFunction } from "util/types";
import { usePathname, useRouter } from "next/navigation";
import { echoValidation } from "@/lib/validations/echo";

interface Props{

    user:{
    id:string;
    objectId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
};
btnTitle : string; 
}



function PostEcho({userId}: {userId :string})
{

//    const[files,setFiles] = useState<File[]>([])
//    const { startUpload } = useUploadThing("media");   
   const router=useRouter();
   const pathname = usePathname() ;

    const form = useForm({
        resolver: zodResolver(echoValidation),
        defaultValues:{
           echo:'',
           accountId :userId   ,
        }
    })

    const onSubmit=async()=>{
        await createEcho();
    }

     return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="mt-10 flex flex-col gap-10 justify-start"
        >
        
            <FormField
                    control={form.control}
                    name="echo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col  gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                        <FormControl  className=" no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea 
                            rows={15}
                        
                            {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                        
                        </FormItem>
                    )}
            />

            <Button type="submit" className="bg-primary-500">Post thread</Button>
        </form>
        </Form>
    )
}
export default PostEcho  