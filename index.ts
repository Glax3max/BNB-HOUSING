import {prisma} from "./lib/prisma"

async function main() {
    const user = await prisma.user.create({
        data:{
            id:"1",
            email:"abhishekspps825406@gmail.com",
            password:"12345",
            role:"HOST",
            listings:{
                create:{ 
                id:"11",
                title:"car in the garage",
                description:"this is a car garage",
                price:232,
                location:"Noida",
            },
        },
        },
    include:{
        listings:true
    },
    })

    console.log('Created user',user);

    const allUsers = await prisma.user.findMany({
        include:{
            listings:true,
        }
    })

    console.log("All user",JSON.stringify(allUsers,null,2))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

