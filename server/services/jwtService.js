const jwt = require("jsonwebtoken")

class JWTService {
  
  generateToken(payload){
    const secret = process.env.JWT_SECRET || 'Secret'
    const token = jwt.sign(
      payload,
       secret,
       {
         expiresIn: '24h'
       })

    return token
  }

  verifyToken(token){
    const secret = process.env.JWT_SECRET || 'Secret'
    const res = jwt.verify(token, secret)

    return res;
  }
}

module.exports = new JWTService();