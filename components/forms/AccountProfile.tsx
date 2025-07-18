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
import { userValidation } from "@/lib/validations/user";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { fi } from "zod/v4/locales";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { isGeneratorFunction } from "util/types";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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



function AccountProfile({user,btnTitle}:Props 
  //{user,btntitile , of type interface props}
) 
{

   const[files,setFiles] = useState<File[]>([])
   const { startUpload } = useUploadThing("media");   
   const router=useRouter();
   const pathname = usePathname() ;
    
    const handleImage=(e:ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void)=>{
      e.preventDefault();

      const fileReader = new FileReader();
      if(e.target.files && e.target.files.length>0)
      {
        const file = e.target.files[0];

        setFiles(Array.from(e.target.files));
        if(!file.type.includes('image')) return;

        fileReader.onload = async(event)=>{
          const imageDataUrl = event.target?.result?.toString() ||"" ;
          fieldChange(imageDataUrl);
        }

        fileReader.readAsDataURL(file);
      }
     }

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues:{
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || ""    
        }
    })

  const onSubmit= async(values: z.infer<typeof userValidation>) => {

      const blob = values.profile_photo;

      const hasImageChanged = isBase64Image(blob);
      // If the image is a base64 string, it means it has been changed ,and if ot , then its  aurl ,ie ,  unchanged previous image

      if (hasImageChanged) {
        const imgRes = await startUpload(files)

        if(imgRes  && imgRes[0] &&  imgRes[0].ufsUrl)
        {
          values.profile_photo = imgRes[0].ufsUrl;
        }
        
      }

      await updateUser({
         userId: user.id,
        username:values.username,
        name:values.name,
        bio:values.bio,
        image:values.profile_photo,
        path:pathname
        } );
        //passing these as object rather than a parameter ,
        //because , this way , the order of the paramertes
        //doesnt affect the correct assigning

        //now we can pass values in any order

        if(pathname === '/profile/edit')
          router.back();
        else
          router.push('/');
     
    }

    return(
         <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-10 justify-start"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                    {field.value?
                        <Image
                        src={field.value}
                        alt="Profile Photo"
                        width={96}
                        height={96}
                        priority
                        className="w-full h-full rounded-full object-cover"
                        />:
                        <Image
                        src={"./assets/profile.svg"}
                        alt= "Profile Photo"
                        width={24}
                        height={24}
                        
                        className="w-full h-full object-cover"
                        />
                    }
                   
                </FormLabel>
              <FormControl className=" flex-1 text-base-semibold text-gray-200">
                <Input 
                type = "file"
                accept="image/*"
                placeholder="Upload a profile photo"
                className =" account-form_image-input"
                onChange={(e) => {handleImage(e,field.onChange)}}
                />
              </FormControl>
              <FormMessage/>
              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                    Name
                </FormLabel>
               <FormControl >
                <Input 
                type="text"
               className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
              <FormMessage/>
              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                    Username
                </FormLabel>
               <FormControl>
                <Input 
                type="text"
               className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
              <FormMessage/>
              
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                    Bio
                </FormLabel>
               <FormControl >
                <Textarea
                rows={4}
                       className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
             <FormMessage/>
              
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
    )
}
export default AccountProfile;