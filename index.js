var bigParser = require('./parser/bigParser')
var smallParser = require('./parser/smallParser')
var axios = require('axios');0

const hakgwanLink = "https://www.uos.ac.kr/food/placeList.do"
const annekanLink = "https://www.uos.ac.kr/food/placeList.do?rstcde=030"
const dormLink = "https://www.uos.ac.kr/food/placeList.do?rstcde=050"


//bigParser.parse(annekanLink,smallParser.forAnnekan)
//bigParser.parse(dormLink,smallParser.forDorm)

exports.handler = async (event) => {
    var {type} = event;
    if(type == 'student'){
        var haksiks = await bigParser.parse(hakgwanLink,smallParser.forHakgwan)
        return haksiks
    }
    else if(type == 'annekan'){
        var haksiks = await bigParser.parse(annekanLink,smallParser.forAnnekan)
        return haksiks
    }else if(type == 'dormitory'){
        var haksiks = await bigParser.parse(dormLink,smallParser.forDorm)
        return haksiks
    }else{
        return("Unsupported type")
    }
};
