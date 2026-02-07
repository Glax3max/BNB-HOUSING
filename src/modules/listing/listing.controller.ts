import {Request,Response} from "express";
import * as listingService from "./listing.service"

export const create = async (req:Request,res:Response) => {
    const listing = await listingService.createListing({
        ...req.body,
        hostId:req.user.hostId
    });

    res.json(listing);
}

export const getAll = async (req:Request,res:Response) => {
    const listing = await listingService.getAllListings();
    res.json(listing);
}

export const update = async (req:Request,res:Response) => {
    const updated = await listingService.updateListing(
        req.params.id,
        req.user.userId,
        req.body
    );

    res.json(updated)
}

export const remove = async (req:Request,res:Response) => {
    await listingService.deleteListing(
        req.params.id,
        req.user.userId
    );

    res.json({success:true});
};

