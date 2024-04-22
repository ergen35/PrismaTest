import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();



async function main() {
    // const users = await prisma.user.findMany();

    // const user = await addUser({
    //     email: "a@a.com",
    //     name: "Eric",
    //     role: 'USER',
    // })

    const eric = await prisma.user.findFirst({
        where: {
            email: "ienoverse@gmail.com"
        },
        select: {
            id: true,
            name: true,
            posts: {
                select: {
                    title: true,
                    author: {
                        select: {
                            name: true
                        }
                    },
                    createdAt: true,
                    published: true
                }
            },
        },
    })

    if (eric) {
        console.log(eric.name)

        // const post = await prisma.post.create({
        //     data: {
        //         title: "Hello World",
        //         // author: {
        //         //     connect: {
        //         //         id: eric.id
        //         //     }
        //         // },
        //         authorId: eric.id,
        //         createdAt: new Date(),
        //         published: false,
        //     }
        // })

        console.log(eric.posts);
    }
}

async function addUser(user: Partial<User> & { email: string }) {
    return await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            role: user.role
        }
    });

}

main().then(() => {
    prisma.$disconnect();
})
    .catch(() => {
        console.error("An error occured");
        prisma.$disconnect();
        process.exit(1);
    })


