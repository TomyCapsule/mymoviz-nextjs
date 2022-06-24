import dbConnect from "../../lib/dbconnect";
import Movie from "../../models/Movie";

export default async function handler(req,res){
    const {method} = req;
    await dbConnect();

    switch(method){
        case 'GET':
            try{
                let wishlist = await Movie.find();
                res.status(200).json({result: true, wishlist})
            } catch(error) {
                res.status(400).json({result: false})
            }
            break;
        case 'POST':
            try{
                let newMovie = new Movie({
                    name:req.body.name,
                    img: req.body.img
                });
                await newMovie.save();
                res.status(200).json({result: true})
            } catch(error) {
                res.status(400).json({result: false})
            }
            break;
        case 'DELETE':
            await Movie.deleteOne({name: req.body.name})
            break;
        default:
            res.status(400).json({result: false})
            break;
    }
}