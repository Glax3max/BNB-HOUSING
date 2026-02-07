import {prisma} from "../../../lib/prisma" ;
import { createListingInput,updateListingInput } from "./listing.types";

export const createListing = (data:createListingInput) => {
    return prisma.listing.create({data});
}

export const findListById = (id:string) => {
    return prisma.listing.findUnique({where:{id}})
}

export const findAllListings = () => {
    return prisma.listing.findMany({
        include:{
            host: {
                select:{id:true,email:true},
            }
        },
    });
}


export const updateListings = (id:string,data:updateListingInput) => {
    return prisma.listing.update({
        where:{id},
        data,
    })
}

export const deleteListing = (id:string) => {
    return prisma.listing.delete({where:{id}});
};