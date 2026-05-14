import { useEffect, useState } from 'react'
import { benimIlanlarim, ilanSil } from '../api'

function Profil({ kullanici, onDetay, onCikis }) {
  const [ilanlar, setIlanlar] = useState([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [silinenId, setSilinenId] = useState(null)

  useEffect(() => {
    benimIlanlarim()
      .then(data => setIlanlar(Array.isArray(data) ? data : []))
      .finally(() => setYukleniyor(false))
  }, [])

  const sil = async (id) => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) return
    setSilinenId(id)
    await ilanSil(id)
    setIlanlar(prev => prev.filter(i => i.id !== id))
    setSilinenId(null)
  }

  return (
    <div style={styles.wrap}>

      {/* Profil kartı */}
      <div style={styles.profilKart}>
        <div style={styles.avatar}>
          {kullanici.ad[0]}{kullanici.soyad[0]}
        </div>
        <div>
          <div style={styles.ad}>{kullanici.ad} {kullanici.soyad}</div>
          <div style={styles.email}>{kullanici.email}</div>
          <div style={styles.rol}>
            {kullanici.rol === 'uye' ? '👤 Üye' : '⭐ Nakliyeci'}
          </div>
        </div>
        <button style={styles.cikisBtn} onClick={onCikis}>Çıkış yap</button>
      </div>

      {/* İlanlar */}
      <div style={styles.baslikRow}>
        <h2 style={styles.baslik}>İlanlarım</h2>
        <span style={styles.sayi}>{ilanlar.length} ilan</span>
      </div>

      {yukleniyor && <div style={styles.durum}>Yükleniyor...</div>}

      {!yukleniyor && ilanlar.length === 0 && (
        <div style={styles.bos}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>Henüz ilanınız yok</div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>İlk ilanınızı ekleyin!</div>
        </div>
      )}

      {!yukleniyor && ilanlar.map(ilan => (
        <div key={ilan.id} style={styles.ilanKart}>
          <div style={styles.ilanBaslik}>
            <div>
              <div style={styles.ilanTip}>
                {ilan.tip === 'arac' ? '🚛 Araç ilanı' : '📦 Yük ilanı'}
              </div>
              <div style={styles.ilanAd}>{ilan.arac_tipi}</div>
            </div>
            <span style={styles.aktifBadge}>Aktif</span>
          </div>

          <div style={styles.ilanRota}>
            <span style={styles.rotaSehir}>{ilan.nereden}</span>
            <span style={styles.rotaOk}> → </span>
            <span style={styles.rotaSehir}>{ilan.nereye}</span>
          </div>

          <div style={styles.ilanDetaylar}>
            <span>📅 {ilan.tarih} / {ilan.saat}</span>
            <span>⚖️ {ilan.kapasite} ton</span>
            <span>💰 ₺{Number(ilan.fiyat).toLocaleString('tr-TR')}</span>
          </div>

          <div style={styles.ilanFooter}>
            <span style={styles.ilanTarih}>
              {new Date(ilan.tarih_olusturma).toLocaleDateString('tr-TR')}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={styles.btnDetay} onClick={() => onDetay(ilan)}>
                Detay
              </button>
              <button
                style={{ ...styles.btnSil, opacity: silinenId === ilan.id ? 0.5 : 1 }}
                disabled={silinenId === ilan.id}
                onClick={() => sil(ilan.id)}
              >
                {silinenId === ilan.id ? 'Siliniyor...' : 'Sil'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  wrap: { maxWidth: '680px', margin: '24px auto', padding: '0 24px' },
  profilKart: { display: 'flex', alignItems: 'center', gap: '16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', marginBottom: '24px' },
  avatar: { width: '56px', height: '56px', borderRadius: '50%', background: '#1D9E75', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', flexShrink: 0 },
  ad: { fontSize: '18px', fontWeight: '700', color: '#111827' },
  email: { fontSize: '14px', color: '#6b7280', marginTop: '2px' },
  rol: { fontSize: '13px', color: '#1D9E75', marginTop: '4px', fontWeight: '500' },
  cikisBtn: { marginLeft: 'auto', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'transparent', fontSize: '13px', cursor: 'pointer', color: '#6b7280' },
  baslikRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  baslik: { fontSize: '18px', fontWeight: '700', color: '#111827' },
  sayi: { fontSize: '13px', color: '#6b7280', background: '#f3f4f6', padding: '4px 10px', borderRadius: '20px' },
  durum: { textAlign: 'center', padding: '48px', color: '#6b7280' },
  bos: { textAlign: 'center', padding: '64px 24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' },
  ilanKart: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '12px' },
  ilanBaslik: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  ilanTip: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' },
  ilanAd: { fontSize: '16px', fontWeight: '600', color: '#111827' },
  aktifBadge: { fontSize: '11px', padding: '3px 8px', background: '#E1F5EE', color: '#0F6E56', borderRadius: '4px', fontWeight: '500' },
  ilanRota: { fontSize: '15px', marginBottom: '10px' },
  rotaSehir: { fontWeight: '600', color: '#111827' },
  rotaOk: { color: '#9ca3af' },
  ilanDetaylar: { display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', flexWrap: 'wrap', marginBottom: '14px' },
  ilanFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f3f4f6' },
  ilanTarih: { fontSize: '12px', color: '#9ca3af' },
  btnDetay: { padding: '7px 14px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'transparent', fontSize: '13px', cursor: 'pointer', color: '#111827' },
  btnSil: { padding: '7px 14px', border: '1px solid #FCA5A5', borderRadius: '8px', background: '#FEF2F2', fontSize: '13px', cursor: 'pointer', color: '#DC2626', fontWeight: '500' },
}

export default Profil