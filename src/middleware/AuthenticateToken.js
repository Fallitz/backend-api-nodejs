const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {  
    const authHeader = req.headers['access-token']; 
    if (!authHeader){ 
      return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });  
    }
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, function(err, token){
      if (err) {return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });}
      req.tokenData = token;
      next()
    });
  }