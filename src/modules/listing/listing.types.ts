export interface createListingInput {
    title:string;
    description:string;
    price:number;
    location:string;
    hostId:string;
}

export interface updateListingInput {
    title?:string;
    description?:string;
    price?:number;
    location?:string;
}
