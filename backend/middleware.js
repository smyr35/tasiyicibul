const jwt = require('jsonwebtoken')

function tokenKontrol(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ hata: 'Token gerekli' })
  }

  try {
    const kullanici = jwt.verify(token, process.env.JWT_SECRET)
    req.kullanici = kullanici
    next()
  } catch {
    res.status(403).json({ hata: 'Geçersiz token' })
  }
}

module.exports = tokenKontrol