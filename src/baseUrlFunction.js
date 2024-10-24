function baseURL(req, res){
    const host = process.env.NODE_ENV == "production" ? 'https://media-library-api-hjxz.onrender.com' : `http://localhost:${process.env.PORT || 3000}`;
    res.send(`To view docs, visit ${host}/api-docs`);

}

module.exports = baseURL