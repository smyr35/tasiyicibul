import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IlanListesi from './components/IlanListesi'
import YeniIlan from './pages/YeniIlan'
import Giris from './pages/Giris'
import IlanDetay from './pages/IlanDetay'
import Profil from './pages/Profil'

function App() {
  const [sayfa, setSayfa] = useState('anasayfa')
  const [kullanici, setKullanici] = useState(null)
  const [seciliIlan, setSeciliIlan] = useState(null)

  useEffect(() => {
    const k = localStorage.getItem('kullanici')
    if (k) setKullanici(JSON.parse(k))
  }, [])

  const girisYapildi = (k) => {
    setKullanici(k)
    setSayfa('anasayfa')
  }

  const cikisYap = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('kullanici')
    setKullanici(null)
    setSayfa('anasayfa')
  }

  const ilanDetayAc = (ilan) => {
    setSeciliIlan(ilan)
    setSayfa('detay')
  }

  return (
    <div>
      <Navbar
        kullanici={kullanici}
        onYeniIlan={() => kullanici ? setSayfa('yeniilan') : setSayfa('giris')}
        onGiris={() => setSayfa('giris')}
        onCikis={cikisYap}
        onLogo={() => setSayfa('anasayfa')}
        onProfil={() => setSayfa('profil')}
      />
      {sayfa === 'anasayfa' && (
        <>
          <Hero />
          <IlanListesi onDetay={ilanDetayAc} />
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <button
              onClick={() => kullanici ? setSayfa('yeniilan') : setSayfa('giris')}
              style={{ padding: '12px 32px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
            >
              + Yeni İlan Oluştur
            </button>
          </div>
        </>
      )}
      {sayfa === 'yeniilan' && <YeniIlan onGeriDon={() => setSayfa('anasayfa')} />}
      {sayfa === 'giris' && <Giris onGiris={girisYapildi} />}
      {sayfa === 'detay' && <IlanDetay ilan={seciliIlan} onGeri={() => setSayfa('anasayfa')} />}
      {sayfa === 'profil' && (
        <Profil
          kullanici={kullanici}
          onDetay={ilanDetayAc}
          onCikis={cikisYap}
        />
      )}
    </div>
  )
}

export default App