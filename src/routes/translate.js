const express = require("express")
const router = express.Router();
const api = "AIzaSyBHt947aSFRXbo1wgQGxmam9iRB7wHNkco";
const googleTranslate = require('google-translate')(api);


//Google Translate Documentation!
// var text = 'I am using google translator to convert this text to spanish'
// console.log("English :>",text);

// googleTranslate.translate(text,'hi', function(err, translation) {
//     console.log(translation)
//   console.log("Spanish :>",translation);
// });			

// googleTranslate.getSupportedLanguages((err, languageCodes)=>{
//     console.log(languageCodes)
// })


//Route for translating data
router.get("/translated", (req, res) => {
    if (!req.query.inputstring) {
      res.send({
        error: "Please provide some input text"
      });
    } else {
      const inputstring = req.query.inputstring;
      const source_lan = req.query.source_lan;
      const res_lan = req.query.res_lan;
  
      googleTranslate.translate(
        inputstring,
        source_lan,
        res_lan,
        (err, translation) => {
          if (err) {
            return err;
          } else {
            return res.send(translation);
          }
        }
      );
    }
  });

  module.exports = router