import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    // @TODO
    app.get('/filteredimage', async(req: Request, res: Response) => {
        let {image_url} = req.query;
        if(!image_url){
            return res.status(400).send(`Invalid url or no url`): //throws 400 error in case there is no url or invalid url
        }
        // To download the image, send to the client and delete file from server
        filterImageFromURL(image_url).then(filteredpath => {
            res.status(200).sendFile(filteredpath, () => {deletedLocalFiles)[filteredpath]};} );
        })
        
    });

    // END @TODO1

    // Root Endpoint
    // Displays a simple message to the user
    app.get('/', async (req, res) => {
        res.send('try GET /filteredimage?image={{}}')
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`)
        console.log(`press CTRL+C to stop server`)
    });
})();
