import { useEffect, useState } from 'react'
import IlanKarti from './IlanKarti'
import Filtre from './Filtre'
import { getIlanlar } from '../api'

const BOŞ_FİLTRE = { nereden: '', nereye: '', tip: '', aracTipi: '' }

function IlanListesi({ onDetay }) {
  const [ilanlar, setIlanlar] = useState([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [filtreler, setFiltreler] = useState(BOŞ_FİLTRE)

  const yukle = async (f) => {
    setYukleniyor(true)
    try {
      const data = await getIlanlar(f)
      setIlanlar(data)
    } finally {
      setYukleniyor(false)
    }
  }

  useEffect(() => { yukle(filtreler) }, [])

  const filtreGuncelle = (yeni) => {
    setFiltreler(yeni)
    yukle(yeni)
  }

  const filtreTemizle = () => {
    setFiltreler(BOŞ_FİLTRE)
    yukle(BOŞ_FİLTRE)
  }

  return (
    <div>
      <Filtre
        filtreler={filtreler}
        onChange={filtreGuncelle}
        onTemizle={filtreTemizle}
      />
      <div style={styles.wrapper}>
        <div style={styles.header}>
          {yukleniyor
            ? <span style={styles.sonuc}>Aranıyor...</span>
            : <span style={styles.sonuc}>{ilanlar.length} ilan bulundu</span>
          }
        </div>
        {yukleniyor && <div style={styles.durum}>Yükleniyor...</div>}
        {!yukleniyor && ilanlar.length === 0 && (
          <div style={styles.bos}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>İlan bulunamadı</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Farklı filtreler deneyin</div>
          </div>
        )}
        {!yukleniyor && ilanlar.map(ilan => (
          <IlanKarti key={ilan.id} ilan={ilan} onDetay={onDetay} />
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: { maxWidth: '720px', margin: '24px auto', padding: '0 24px' },
  header: { marginBottom: '16px' },
  sonuc: { fontSize: '14px', color: '#6b7280' },
  durum: { textAlign: 'center', padding: '48px', color: '#6b7280', fontSize: '14px' },
  bos: { textAlign: 'center', padding: '64px 24px', color: '#6b7280' },
}

export default IlanListesi