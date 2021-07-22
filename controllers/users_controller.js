module.exports.profile = function(req, res){
    return res.end('<h1>User Profile</h1>');
}

module.exports.user = function(req, res){
    return res.end('<h1>This is User\'s main Page</h1>')
}