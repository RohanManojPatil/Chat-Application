import { getServerSession } from "next-auth/next"
import { Account, AuthOptions, ISODateString } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";
export interface CustomSession {
    user?:CustomUser;
    expires:ISODateString
}

export interface CustomUser{
    id?:string|null;
    name?:string|null;
    email?:string|null;
    image?:string|null;
    provider?:string|null;
    token?:string|null
}
export const authOptions:AuthOptions = {
    pages : {
        signIn : "/"
    },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID!,
          clientSecret: process.env.GOOGLE_SECRET!,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
      ],

      callbacks: {
        async signIn({user, account}:{user:CustomUser, account : Account|null}){
            console.log("The account is", account);
            const payload = {
              email : user.email,
              name : user.name,
              oauth_id:account?.providerAccountId,
              provider : account?.provider,
              image : user?.image
            }

            const {data} = await axios.post(LOGIN_URL, payload)
            user.id = data?.user?.id.toString()
            user.token = data?.user?.token
            user.provider = data?.user?.provider
            return true;
        },
        async session({ session, token} : {session:CustomSession, token:JWT}) {
            session.user = token.user as CustomUser
            return session
        },
        async jwt({ token, user}) {
            if(user){
                token.user = user
            }

            return token
        }
      }
}