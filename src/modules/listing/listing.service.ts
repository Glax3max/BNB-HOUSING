import * as listingRepo from "./listing.repository";
import { createListingInput,updateListingInput } from "./listing.types";

// creating a new list in the DB
export const createListing = async (data:createListingInput) => {
    return listingRepo.createListing(data);
}


// Getting all the listing from the DB

export const getAllListings = async () => {
    return listingRepo.findAllListings();
}

// Updating a listing by ID

export const updateListing = async (listingId:string,hostId:string,data:updateListingInput)=> {
    const listing = await listingRepo.findListById(listingId);

    if(!listing) {
        throw new Error("Listing not found")
    }

    if(listing.hostId !== hostId) {
        throw new Error("unauthorized: not the listing owner");
    }

    return listingRepo.updateListings(listingId,data)
}

export const deleteListing = async (listingId:string,hostId:string) => {
    const listing = await listingRepo.findListById(listingId);

    if(!listing) {
        throw new Error("Listing not found");
    }

    if(listing.hostId !== hostId) {
        throw new Error("Unauthorized: not the listing owner")
    }

    return listingRepo.deleteListing(listingId);
}
