const Music = require('../database/musicSchema')

const getAll = async (req, res) => {
    try{
        const songs = await Music.find().exec()
        res.status(200).json(songs)

    }catch(err){
        return res.status(500).json({
            message: "Failed to load music collection",
            error: err.message
        })
    }
}

const getSingle = async  (req, res) => {
    try{
        const song = await Music.findById(req.params.id)
        if(!song) {
            return res.status(404).json({
            message: "Song not found",
        })
    }else{
        res.status(200).json(song)
    }
    }catch(err){
        return res.status(500).json({
            message: "Failed to load music collection",
            error: err.message
        })
    }
}
const addMusic = async (req, res) => {
const { artist, album, song, genre, explicit } = req.body;

    if (!artist || !album || !song || !genre) {
        return res.status(400).json({
            message: "All fields are required: artist, album, song, genre"
        });
    }

    const newMusic = new Music({
        artist,
        album,
        song,
        genre,
        explicit: explicit || false 
    });

    try {
        await newMusic.save();
        return res.status(201).json({
            message: "Music added successfully",
            musicId: newMusic._id
            });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to add music",
            error: err.message
        });
    }
}
const updateMusic = async (req, res) => {
    const { artist, album, song, genre, explicit } = req.body;

    if (!artist && !album && !song && !genre && explicit === undefined) {
        return res.status(400).json({
            message: "At least one field is required for update"
        });
    }

    const updateData = {
        ...(artist && { artist }),
        ...(album && { album }),
        ...(song && { song }),
        ...(genre && { genre }),
        ...(explicit !== undefined && { explicit }) 
    };

    try {
        const updatedMusic = await Music.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedMusic) {
            return res.status(404).json({
                message: "Music not found",
            });
        }

        res.status(200).json({
            message: 'Music updated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update music",
            error: err.message
        });
    }
}
const deleteMusic =  async (req, res) => {
    try{
        const deletedMusic = await Music.findByIdAndDelete(req.params.id)
        if(!deletedMusic) {
            return res.status(404).json({
                message: "Music not found"
            })
        } else{
            res.status(200).json({
                message: "Music deleted successfully",
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Failed to delete music",
            error: err.message
        })
    }
}

module.exports = {
    getAll,
    getSingle,
    addMusic,
    updateMusic,
    deleteMusic
}