import * as z from "zod";

export const echoValidation = z.object({
    echo: z.string().nonempty().max(100).min(3,{message:"minimun 3 characters"}),
    accountId: z.string(),
})

export const commentValidation = z.object({
    echo: z.string().nonempty().max(100).min(3,{message:"minimun 3 characters"}),
    
})