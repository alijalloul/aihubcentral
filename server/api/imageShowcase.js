import path from "path";
import fs from "fs";

import dalleImageSchema from "../schemas/dalleImagesDB.js";


export const getImages = async (req, res) => {
    const images = await dalleImageSchema.find();

    images.map(image => {
        const imagePath = path.join("./images/dalle_images", image.generatedImage);

        var base64Data;
        if(fs.existsSync(imagePath)){
            base64Data = fs.readFileSync(imagePath, { encoding: 'base64' });
        }else {
            base64Data = fs.readFileSync('./images/notfound.jpeg').toString("base64");
        }



        image.generatedImage = "data:image/png;base64," + base64Data;  
    })
    
    res.json(images);
}

export const postImage = async (req, res) => {
    const image = req.body;

    const base64Image = image.generatedImage;

    // Extract image type and base64 data
    const fileExtension = base64Image.split(';')[0].split('/')[1];
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    
    const filename = `image-${Date.now()}.${fileExtension}`;
    fs.writeFileSync(path.join("./images/dalle_images", filename), buffer);

    image.generatedImage = filename;    

    console.log(image);

    const newImage = new dalleImageSchema(image);

    try {
        await newImage.save();

        res.status(200).json({message: "image submitted successfully!"});
    } catch (error) {
        res.status(409).json({message: error});
    }
  
}

