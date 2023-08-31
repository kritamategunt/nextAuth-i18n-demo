import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from 'next-auth/providers/github'
import AzureADProvider from "next-auth/providers/azure-ad";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile){
                console.log(profile)
                return{
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Gunt", password: "nextauth",role: "manager" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        AzureADProvider({
            clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
            clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
            tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
            authorization: {
              params: {
                scope:
                  "User.Read openid email profile offline_access", //offline_access, User.Read
              },
            },
            /**
           * User.Read: อนุญาตให้แอปพลิเคชันอ่านข้อมูลพื้นฐานของผู้ใช้ เช่น ชื่อ นามสกุล เป็นต้น
            openid: ทำให้ Azure AD ส่งค่า OpenID Connect ID Token กลับมาหลังจากการรับรองตัวตนสำเร็จ ซึ่งมีข้อมูลเกี่ยวกับผู้ใช้และข้อมูลอื่น ๆ ซึ่งผู้ใช้สามารถใช้เพื่อรับรู้ถึงตัวตนของตนเอง
            email: อนุญาตให้แอปพลิเคชันเข้าถึงที่อยู่อีเมลของผู้ใช้
            profile: อนุญาตให้แอปพลิเคชันเข้าถึงข้อมูลโปรไฟล์พื้นฐานของผู้ใช้ เช่น รูปประจำตัว สถานะ และข้อมูลที่เกี่ยวข้อง
            offline_access: อนุญาตให้แอปพลิเคชันสามารถขอ Refresh Token เพื่อใช้ในการขอ Access Token ใหม่หลังจาก Access Token ปัจจุบันหมดอายุ ซึ่งช่วยให้แอปพลิเคชันสามารถยืนยันตัวตนผู้ใช้เพื่อเข้าถึงทรัพยากรโดยไม่ต้องให้ผู้ใช้เข้าระบบใหม่ทุกครั้ง
           */
          }),
    ],
    
    callbacks:{
        //Ref: https://authjs.dev/guides/basics/role-based-access-control
        async jwt({token,user}){
            if(user) token.role = user.role
            return token
        },
        //If you want to use the role in client component
        async session({session,token}){
            if(session?.user) session.user.role = token.role
            return session
        }

    }
}