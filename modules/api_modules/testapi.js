
function enableApi() {
  global.app.get("/testApi", function (req,res) {
    res.send("you're mom") // your*, idiot.
  }) 
}

module.exports = {enabled: true, f: enableApi};