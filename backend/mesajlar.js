const express = require('express')
const router = express.Router()
const db = require('./db')
const tokenKontrol = require('./middleware')

// Mesaj gönder
router.post('/', tokenKontrol, async (req, res) => {
  const { ilan_id, alici_id, mesaj } = req.body
  if (!ilan_id || !alici_id || !mesaj) {
    return res.status(400).json({ hata: 'Tüm alanlar gerekli' })
  }
  try {
    // Daha önce mesaj gönderilmiş mi?
    const mevcutMesaj = await db.query(
      'SELECT id FROM mesajlar WHERE ilan_id = $1 AND gonderen_id = $2',
      [ilan_id, req.kullanici.id]
    )
    if (mevcutMesaj.rows.length > 0) {
      return res.status(400).json({ hata: 'Bu ilana zaten mesaj göndermişsiniz' })
    }

    const sonuc = await db.query(
      `INSERT INTO mesajlar (ilan_id, gonderen_id, alici_id, mesaj)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [ilan_id, req.kullanici.id, alici_id, mesaj]
    )
    res.status(201).json(sonuc.rows[0])
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// Gelen mesajları getir
router.get('/gelen', tokenKontrol, async (req, res) => {
  try {
    const sonuc = await db.query(
      `SELECT m.*, 
        k.ad as gonderen_ad, k.soyad as gonderen_soyad,
        i.nereden, i.nereye, i.arac_tipi
       FROM mesajlar m
       JOIN kullanicilar k ON m.gonderen_id = k.id
       JOIN ilanlar i ON m.ilan_id = i.id
       WHERE m.alici_id = $1
       ORDER BY m.tarih DESC`,
      [req.kullanici.id]
    )
    res.json(sonuc.rows)
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// Gönderilen mesajları getir
router.get('/giden', tokenKontrol, async (req, res) => {
  try {
    const sonuc = await db.query(
      `SELECT m.*,
        k.ad as alici_ad, k.soyad as alici_soyad,
        i.nereden, i.nereye, i.arac_tipi
       FROM mesajlar m
       JOIN kullanicilar k ON m.alici_id = k.id
       JOIN ilanlar i ON m.ilan_id = i.id
       WHERE m.gonderen_id = $1
       ORDER BY m.tarih DESC`,
      [req.kullanici.id]
    )
    res.json(sonuc.rows)
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// Mesajı okundu yap
router.patch('/:id/okundu', tokenKontrol, async (req, res) => {
  try {
    await db.query(
      'UPDATE mesajlar SET okundu = TRUE WHERE id = $1 AND alici_id = $2',
      [req.params.id, req.kullanici.id]
    )
    res.json({ mesaj: 'Okundu olarak işaretlendi' })
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

module.exports = router