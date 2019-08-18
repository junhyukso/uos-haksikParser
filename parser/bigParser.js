var axios = require('axios');
var beautify =  require('json-beautify')

module.exports.parse = async (link,parseFunc) => {
    var { data } = await axios.get(link);
    var table = data.split('id="week"')[1]
    table = table.replace(/[\n\r\t]/g,'')
    table = table.replace(/<br\/?>/g,'brbr')
    var trs = table.match(/<\s*tr[^>]*>(.*?)<\s*\/\s*tr>/g)
    var haksiks = [];
    for(var i in trs){
        if( i == trs.length - 1){break;}
        var tr = trs[i];
        var pos = Math.floor(i/3) //date
        var bfd = i % 3 //breakfast,lunch,dinner

        var tds = tr.match(/<\s*td[^>]*>(.*?)<\s*\/\s*td>/g)
        if(bfd == 0 ){ //bf
            var ths = tr.match(/<\s*th[^>]*>(.*?)<\s*\/\s*th>/g)
            var date = ths[0].replace(/(<([^>]+)>)/ig,'')
            var content = tds[0].replace(/(<([^>]+)>)/ig,'')
            haksiks[pos] = {
                date : date,
                breakfast : parseFunc(content)
            }
        }
        else if(bfd == 1){ //lunch
            var content = tds[0].replace(/(<([^>]+)>)/ig,'')
            haksiks[pos] = {
                ...haksiks[pos],
                lunch : parseFunc(content)
            }
        }
        else{ //dinner
            var content = tds[0].replace(/(<([^>]+)>)/ig,'')
            haksiks[pos] = {
                ...haksiks[pos],
                dinner : parseFunc(content)
            }
        }
    }
    return haksiks
}