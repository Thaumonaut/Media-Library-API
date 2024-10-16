# Media-Library-API
Group final project for CSE 341

To get started run `npm install` to install all the dependencies. Then run `npm run dev` to start the development environment.

## Database Schema
### Movie:
-	_id : ObjectId
-	Title: String
-	Release date: Date
-	Description: String
-	Director: String
-	Studio: String
-	Cast: String[]
-	Genre: String
-	Rating: Number
-	Duration: Number
-	Rating: string
### Book:
-	_id: ObjectId
-	Title: string
-	Author: string
-	Publisher: string
-	Description: string
-	Release Date: date
-	Length: number
-	ISBN: string
### Music
-	_id: ObjectId
-	Artist: String
-	Album: string
-	Songs: string[]
-	Explicit: bool
### Games:
-	_id: ObjectId
-	Title: string
-	Developer: string
-	Publisher: string
-	Platform: string
-	Rating: string
-	Genre: string
-	Description: string
