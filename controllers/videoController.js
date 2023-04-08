import { Videos } from '../Models/videoData.js'

export const postVideo= async(req, resp)=> {
    try
    {const {title, url, song, description} = await req.body
        // console.log(result)

    const created = await Videos.create({
        title,
        url,
        user: req.user,
        song,
        description
    })
    resp.status(201).json({
        success: true,
        created
    })}catch(e){
        resp.status(400).send("Something went wrong")
    }
}


export const viewVideo = async (req, resp) => {
    try{
        let result = await Videos.find({});
        resp.status(200).json({
            success: true,
            result
        })
    }catch(err){
        resp.status(500).send("Something went wrong")
    }

}