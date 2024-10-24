const baseURL  = require("../src/baseUrlFunction");

describe('Base Url test', function(){
    test('respond to /', ()=>{
        const req = {}
        const res = {text: '',
            send: function(text) { this.text = text}
        };

        baseURL(req,res);

        const expectedHost = process.env.NODE_ENV == "production" 
        ? 'https://media-library-api-hjxz.onrender.com' 
        : `http://localhost:${process.env.PORT || 3000}`;

        expect(res.text).toEqual(`To view docs, visit ${expectedHost}/api-docs`)
    })
})