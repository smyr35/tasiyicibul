const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./db')
const authRouter = require('./auth')

const app = express()
const PORT = process.env.PORT || 5000
const tokenKontrol = require('./middleware')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.json({ mesaj: 'TaşıyıcıBul backend çalışıyor! 🚛' })
})

app.get('/api/ilanlar', async (req, res) => {
  const { nereden, nereye, tip, aracTipi } = req.query
  try {
    let sorgu = 'SELECT * FROM ilanlar WHERE 1=1'
    const params = []
    let i = 1

    if (nereden) {
      sorgu += ` AND nereden ILIKE $${i++}`
      params.push(`%${nereden}%`)
    }
    if (nereye) {
      sorgu += ` AND nereye ILIKE $${i++}`
      params.push(`%${nereye}%`)
    }
    if (tip) {
      sorgu += ` AND tip = $${i++}`
      params.push(tip)
    }
    if (aracTipi) {
      sorgu += ` AND arac_tipi ILIKE $${i++}`
      params.push(`%${aracTipi}%`)
    }

    sorgu += ' ORDER BY tarih_olusturma DESC'
    const sonuc = await db.query(sorgu, params)
    res.json(sonuc.rows)
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

app.post('/api/ilanlar', tokenKontrol, async (req, res) => {
  const { tip, aracTipi, nereden, nereye, tarih, saat, kapasite, fiyat, telefon, aciklama } = req.body
  try {
    const sonuc = await db.query(
      `INSERT INTO ilanlar 
        (tip, arac_tipi, nereden, nereye, tarih, saat, kapasite, fiyat, telefon, aciklama, kullanici_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [tip, aracTipi, nereden, nereye, tarih, saat, kapasite, fiyat, telefon, aciklama, req.kullanici.id]
    )
    res.status(201).json(sonuc.rows[0])
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// Kullanıcının kendi ilanlarını getir
app.get('/api/ilanlar/benim', tokenKontrol, async (req, res) => {
  try {
    const sonuc = await db.query(
      'SELECT * FROM ilanlar WHERE kullanici_id = $1 ORDER BY tarih_olusturma DESC',
      [req.kullanici.id]
    )
    res.json(sonuc.rows)
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

// İlan sil
app.delete('/api/ilanlar/:id', tokenKontrol, async (req, res) => {
  try {
    const sonuc = await db.query(
      'DELETE FROM ilanlar WHERE id = $1 AND kullanici_id = $2 RETURNING id',
      [req.params.id, req.kullanici.id]
    )
    if (sonuc.rows.length === 0) {
      return res.status(404).json({ hata: 'İlan bulunamadı veya yetkiniz yok' })
    }
    res.json({ mesaj: 'İlan silindi' })
  } catch (err) {
    res.status(500).json({ hata: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`)
})