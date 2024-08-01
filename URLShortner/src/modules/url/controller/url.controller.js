import shortid from "shortid";
import urlModel from "../../../../DB/models/url.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";




// Endpoint to create a shortened URL
export const makeUrl = asyncHandler(async (req, res, next) => {
    const { originalUrl } = req.body; // Extract the originalUrl from request body

    // Validate if originalUrl exists in the request body
    if (!originalUrl) {
        return res.status(400).json('Invalid URL'); // Return 400 status with error message if originalUrl is missing
    }

    // Check if the originalUrl already exists in the database
    let url = await urlModel.findOne({ originalUrl });

    if (url) {
        // If originalUrl is found, return the existing shortUrl
        return res.status(201).json({ message: "Done", url: url.shortUrl });
    } else {
        // If originalUrl is not found, generate a new shortUrl and create a new document in the database
        const shortUrl = shortid.generate(); // Generate a shortId
        url = await urlModel.create({
            originalUrl,
            shortUrl
        });
        return res.status(201).json({ message: "Done", url }); // Return success message with created url document
    }
});

// Endpoint to retrieve a shortId based on shortUrl
export const getShortId = asyncHandler(async (req, res, next) => {
    const { url } = req.body; // Extract the shortUrl from request body

    // Find the document in the database based on shortUrl
    const getShortId = await urlModel.findOne({ shortUrl: url });

    if (!getShortId) {
        // If shortUrl is not found, return a message indicating it was not found
        return res.status(404).json({ message: "Short URL not found" });
    }

    // If shortUrl is found, return success message with the retrieved document
    return res.json({ message: "Done", getShortId });
});



  