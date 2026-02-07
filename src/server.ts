import app from "./app";
import http from "http";

const PORT = process.env.PORT || 4000;

/*------------------------HTTP Server-------------------------*/
const server = http.createServer(app);

/*------------------------Start Server-------------------------*/

server.listen(PORT,()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})

/*------------------------Graceful shutdown-------------------------*/

const shutdown = () => {
    console.log("Shutting down server...");

    server.close(()=> {
        console.log("Server closed");
        process.exit(0);
    });
};

process.on("SIGINT",shutdown);
process.on("SIGTERM",shutdown);