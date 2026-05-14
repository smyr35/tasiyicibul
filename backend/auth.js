const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./db')

// Kayıt ol
router.post('/kayit', async (req, res) => {
  const { ad, soyad, email, sifre, telefon } = req.body

  if (!ad || !soyad || !email || !sifre) {
    return res.status(400).json({ hata: 'Tüm alanları doldurun' })
  }

  try {
    // Email daha önce kayıtlı mı?
    const mevcut = await db.query('SELECT id FROM kullanicilar WHERE email = $1', [email])
    if (mevcut.rows.length > 0) {
      return res.status(400).json({ hata: 'Bu email zaten kayıtlı' })
    }

    // Şifreyi şifrele
    const sifreHash = await bcrypt.hash(sifre, 10)

    // Kaydet
    const sonuc = await db.query(
      `INSERT INTO kullanicilar (ad, soyad, email, sifre, telefon)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, ad, soyad, email, rol`,
      [ad, soyad, email, sifreHash, telefon]
    )

    const kullanici = sonuc.rows[0]

    // Token oluştur
    const token = jwt.sign(
      { id: kullanici.id, email: kullanici.email, rol: kullanici.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, kullanici })
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// Giriş yap
router.post('/giris', async (req, res) => {
  const { email, sifre } = req.body

  if (!email || !sifre) {
    return res.status(400).json({ hata: 'Email ve şifre gerekli' })
  }

  try {
    // Kullanıcıyı bul
    const sonuc = await db.query('SELECT * FROM kullanicilar WHERE email = $1', [email])
    if (sonuc.rows.length === 0) {
      return res.status(401).json({ hata: 'Email veya şifre hatalı' })
    }

    const kullanici = sonuc.rows[0]

    // Şifre doğru mu?
    const dogru = await bcrypt.compare(sifre, kullanici.sifre)
    if (!dogru) {
      return res.status(401).json({ hata: 'Email veya şifre hatalı' })
    }

    // Token oluştur
    const token = jwt.sign(
      { id: kullanici.id, email: kullanici.email, rol: kullanici.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      kullanici: {
        id: kullanici.id,
        ad: kullanici.ad,
        soyad: kullanici.soyad,
        email: kullanici.email,
        rol: kullanici.rol,
      }
    })
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

module.exports = router