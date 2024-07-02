const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const artical_schema = new Schema({
    title: String, 
    body: String,
    number_of_likes : Number 
});

const artical = mongoose.model("Articale", artical_schema);

module.exports = artical;