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
//import { Textarea } from "../ui/textarea";
import { fi } from "zod/v4/locales";
import { isGeneratorFunction } from "util/types";
import { usePathname, useRouter } from "next/navigation";
import { commentValidation } from "@/lib/validations/echo";
//import { createEcho } from "@/lib/actions/echo.actions";
//gonnaneed create comment instead of create echo here
import { getRandomValues } from "crypto";
import { addComment, createEcho } from "@/lib/actions/echo.actions";


interface Props{
    echoId:string,
    currentUserImage:string,
    currentUserId:string
}



const Comment=({echoId,currentUserImage, currentUserId}: Props)=>{


     const router=useRouter();
        const pathname = usePathname() ;
     
         const form = useForm({
             resolver: zodResolver(commentValidation),
             defaultValues:{
                echo:'',
               
             }
         })
     
         const onSubmit=async( values: z.infer<typeof commentValidation>)=>{
             await addComment(
               echoId,
                 values.echo,
                 JSON.parse(currentUserId),
                pathname
               );
               form.reset();
              
         }

    return(
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="comment-form"
        >
        
            <FormField
                    control={form.control}
                    name="echo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3 w-full">
                            <FormLabel>
                            <Image
                            src={currentUserImage}
                            alt  = "profile image"
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                            />
                            </FormLabel>
                        <FormControl  className=" no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Input
                            type = 'text'
                            placeholder="Comment..."
                            className="no focus text-light-1 outling-none"
                            {...field}
                            />
                        </FormControl>
                       
                        
                        </FormItem>
                    )}
            />

            <Button type="submit" className="comment-form_btn">reverb</Button>
        </form>
        </Form>
    )
}
export default Comment;