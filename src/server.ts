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
    app.get('/filteredimage', async (req, res) => {

        let { image_url } = req.query;

        if (!image_url) {
            return res.status(400).send(`Invalid request. image_url is required to process the image`);
        }

        try {
            const filteredpath = await filterImageFromURL(image_url)

            await res.status(200).sendFile(filteredpath, {}, (err) => {
                if (err) {
                    return res.status(422).send(`Not able to process image`)
                }
                deleteLocalFiles([filteredpath])
            })
        } catch (err) {
            res.status(422).send(`Not able to process image. Make sure the image path url is correct`)
        }
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