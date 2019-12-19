var fs = require('fs');
var user = 'user.json';
var team = 'team.json';
var guardian = 'guardian.json';

var db = {
    loginCheck: function(callback){
        fs.readFile(user, 'utf-8', function(err, userlist){
            if (err){
                callback(err);
            } else {
                callback(JSON.parse(userlist));
            }
        });
    },

    getJson: function(filename, callback){
        var file = filename + ".json";
        fs.readFile(file, 'utf-8', function(err, data){
            if(err){
                callback(err);
            } else {
                callback(JSON.parse(data));
            }
        });
    },

    save: function(data, filename, callback){
        var file = filename + ".json"
        fs.writeFile(file, JSON.stringify(data), callback);
    },

    editGuardian: function(username, G1data, G2data, callback){
        db.getJson("guardian", function(Glist){
            var nowHP = 0;
            for(var i = 0;i < Glist.length; i++){
                if(Glist[i].name == G1data.name){
                    nowHP = Glist[i].HP - G1data.HP;
                    if(nowHP <= 0){
                        Glist[i].count ++;
                        Glist[i].HP = 20 + Glist[i].count*5;
                    } else {
                        Glist[i].HP = nowHP;
                    }
                } else if (Glist[i].name == G2data.name){
                    nowHP = Glist[i].HP - G1data.HP;
                    if(nowHP <= 0){
                        Glist[i].count ++;
                        Glist[i].HP = 20 + Glist[i].count*5;
                    } else {
                        Glist[i].HP = nowHP;
                    }
                }
            }
            db.save(Glist, "guardian", callback);
        });
    },

    editTeam: function(T1data, T2data, callback){
        db.getJson("team", function(Tlist){
            var nowScore = 0;
            for(var i = 0;i < Tlist.length; i++){
                if(Tlist[i].number == T1data.number){
                    nowScore = Tlist[i].score + parseInt(T1data.score, 10);
                    Tlist[i].score = nowScore;
                } else if (Tlist[i].name == T2data.name){
                    nowScore = Tlist[i].score + parseInt(T2data.score, 10);
                    Tlist[i].score = nowScore;
                }
            }
            db.save(Tlist, "team", callback);
        })
    }
}

module.exports = db;