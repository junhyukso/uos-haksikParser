
module.exports.forHakgwan = forHakgwan
module.exports.forAnnekan = forAnnekan
module.exports.forDorm = forAnnekan

function forHakgwan(str) {
    var corners = str.split(/(?=코너 .)/)
    var ret = []
    for (var corner of corners) {
        try {
            var cornerName = /코너 (.)/.exec(corner);
            cornerName = (cornerName && cornerName[1]);
            if (cornerName == null) continue;
            if (cornerName == 'A') {
                var a_corners = parseTypeA(corner).map(o=>{
                  return {
                      ...o,
                      corner : cornerName
                  }    
                })
                ret = ret.concat(a_corners)
            }
            else {
                var other_corner = parseTypeB(corner)
                other_corner = {
                    ...other_corner,
                    corner : cornerName
                }
                  ret.push(other_corner)
            }
        }
        catch (err) {
            ret.push({})
        }
    }
    return ret
}

function forAnnekan(str){
    return parseTypeA(str)
}


function parseTypeA(str) {
    try {
        var AMenus = str.split("brbr").filter((a) => /([가-힣]+(\([a-zA-Z !@#$%^&*\-]+\))? \d{1,3}(,\d\d\d)*원)/.test(a))
        var ret = []
        for (var A of AMenus) {
            var ss = A.split(/(\d{1,3}(,\d\d\d)*원)/)
            var name = ss[0].trim().replace(/\([a-zA-Z &.\-\_]+\)/, "")
            var price = ss[1].trim()
            ret.push({
                name: name,
                price: price
            })
        }
        return ret
    } catch{
        return []
    }
}

function parseTypeB(str) {
    try {
        var infos = str.split("brbr")
        var price;
        var name;
        for (var i in infos) {
            if (/\(\d{1,3}(,\d\d\d)*원\)/.test(infos[i])) {
                price = infos[i].slice(1, infos[i].length - 1);
                name = infos[Number(i)+1];
                break;
            }
        }
        return {
            name: name,
            price: price
        }
    }
    catch (e) {
        return {}
    }
}
