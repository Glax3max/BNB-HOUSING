import express from "express";
import cors from "cors";

import userRoutes from "./modules/user";
import listingRoute from "./modules/listing/listing.routes";

const app = express();

/*---------------Middile ware ----------------*/
app.use(cors());
app.use(express.json());

/*---------------Health Check ---------------------*/
app.get("/health", (req:express.Request,res:express.Response) => {
    res.status(200).json({status:"ok"});
})

/*---------------routes ---------------------*/

app.use("/api/listings",listingRoute);
app.use("/api/users",userRoutes);

/*---------------Global Error handling---------------------*/
app.use((err:any , _req:express.Request,res:express.Response,_next:express.NextFunction) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        message:err.message || "Internal Server Error",
    });
});

export default app;