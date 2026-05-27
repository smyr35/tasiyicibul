import { useState } from 'react'
import MesajGonder from '../components/MesajGonder'
import { useEffect } from 'react'

function IlanDetay({ ilan, onGeri, kullanici, onGiris }) {
  const [mesajAcik, setMesajAcik] = useState(false)
  useEffect(() => {
    if (!kullanici) {
      onGiris()
    }
  }, [kullanici])
  if (!ilan) return null

  return (
    <div style={styles.wrap}>
      <button style={styles.geri} onClick={onGeri}>← Geri dön</button>

      <div style={styles.card}>
        {/* Başlık */}
        <div style={styles.header}>
          <div>
            <div style={styles.tip}>
              {ilan.tip === 'arac' ? '🚛 Araç ilanı' : '📦 Yük ilanı'}
            </div>
            <h1 style={styles.baslik}>
              {ilan.arac_tipi || ilan.aracTipi}
            </h1>
          </div>
          <span style={styles.badge}>Aktif</span>
        </div>

        {/* Rota */}
        <div style={styles.rotaKart}>
          <div style={styles.rotaItem}>
            <div style={styles.rotaLabel}>Çıkış</div>
            <div style={styles.rotaSehir}>{ilan.nereden}</div>
          </div>
          <div style={styles.rotaOrta}>
            <div style={styles.rotaCizgi} />
            <span style={{ fontSize: '28px' }}>🚛</span>
            <div style={styles.rotaCizgi} />
          </div>
          <div style={styles.rotaItem}>
            <div style={styles.rotaLabel}>Varış</div>
            <div style={styles.rotaSehir}>{ilan.nereye}</div>
          </div>
        </div>

        {/* Detaylar */}
        <div style={styles.detayGrid}>
          <div style={styles.detayKart}>
            <div style={styles.detayIcon}>📅</div>
            <div style={styles.detayLabel}>Tarih & Saat</div>
            <div style={styles.detayDeger}>{ilan.tarih}</div>
            <div style={styles.detayAlt}>{ilan.saat}</div>
          </div>
          <div style={styles.detayKart}>
            <div style={styles.detayIcon}>⚖️</div>
            <div style={styles.detayLabel}>Kapasite</div>
            <div style={styles.detayDeger}>{ilan.kapasite} ton</div>
          </div>
          <div style={styles.detayKart}>
            <div style={styles.detayIcon}>💰</div>
            <div style={styles.detayLabel}>Fiyat</div>
            <div style={styles.detayDeger}>
              ₺{Number(ilan.fiyat).toLocaleString('tr-TR')}
            </div>
            <div style={styles.detayAlt}>/ sefer</div>
          </div>
          <div style={styles.detayKart}>
            <div style={styles.detayIcon}>🚚</div>
            <div style={styles.detayLabel}>Araç tipi</div>
            <div style={styles.detayDeger}>{ilan.arac_tipi || ilan.aracTipi}</div>
          </div>
        </div>

        {/* Açıklama */}
        {ilan.aciklama && (
          <div style={styles.aciklamaKart}>
            <div style={styles.aciklamaBaslik}>📝 Açıklama</div>
            <p style={styles.aciklamaMetin}>{ilan.aciklama}</p>
          </div>
        )}

        {/* İletişim */}
        <div style={styles.iletisimKart}>
          <div style={styles.iletisimBaslik}>📞 İletişim</div>
          <div style={styles.iletisimRow}>
            <div>
              <div style={styles.iletisimLabel}>Telefon</div>
              <div style={styles.iletisimDeger}>{ilan.telefon}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={`tel:${ilan.telefon}`} style={styles.btnAra}>
                📞 Hemen ara
              </a>
              {kullanici && kullanici.id !== ilan.kullanici_id && (
                <button style={styles.btnMesaj} onClick={() => setMesajAcik(true)}>
                  ✉️ Mesaj gönder
                </button>
              )}
            </div>
          </div>
        </div>

        {/* İlan tarihi */}
        <div style={styles.altBilgi}>
          İlan tarihi: {new Date(ilan.tarih_olusturma).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </div>
      </div>

      {/* Mesaj modalı */}
      {mesajAcik && (
        <MesajGonder
          ilan={ilan}
          kullanici={kullanici}
          onKapat={() => setMesajAcik(false)}
        />
      )}
    </div>
  )
}

const styles = {
  wrap: { maxWidth: '680px', margin: '24px auto', padding: '0 24px' },
  geri: { background: 'none', border: 'none', fontSize: '14px', color: '#1D9E75', cursor: 'pointer', fontWeight: '500', marginBottom: '16px', padding: 0 },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 24px 0' },
  tip: { fontSize: '13px', color: '#6b7280', marginBottom: '6px' },
  baslik: { fontSize: '22px', fontWeight: '700', color: '#111827' },
  badge: { fontSize: '12px', padding: '4px 12px', borderRadius: '20px', background: '#E1F5EE', color: '#0F6E56', fontWeight: '500' },
  rotaKart: { display: 'flex', alignItems: 'center', gap: '16px', margin: '24px', padding: '20px', background: '#f9fafb', borderRadius: '12px' },
  rotaItem: { flex: 1, textAlign: 'center' },
  rotaLabel: { fontSize: '12px', color: '#6b7280', marginBottom: '6px' },
  rotaSehir: { fontSize: '22px', fontWeight: '700', color: '#111827' },
  rotaOrta: { display: 'flex', alignItems: 'center', gap: '8px', flex: 2 },
  rotaCizgi: { flex: 1, height: '1px', background: '#d1d5db' },
  detayGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', padding: '0 24px 24px' },
  detayKart: { background: '#f9fafb', borderRadius: '10px', padding: '16px', textAlign: 'center' },
  detayIcon: { fontSize: '20px', marginBottom: '8px' },
  detayLabel: { fontSize: '11px', color: '#6b7280', marginBottom: '4px' },
  detayDeger: { fontSize: '16px', fontWeight: '700', color: '#111827' },
  detayAlt: { fontSize: '12px', color: '#9ca3af', marginTop: '2px' },
  aciklamaKart: { margin: '0 24px 24px', padding: '16px', background: '#f9fafb', borderRadius: '10px' },
  aciklamaBaslik: { fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' },
  aciklamaMetin: { fontSize: '14px', color: '#6b7280', lineHeight: '1.6' },
  iletisimKart: { margin: '0 24px 24px', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px' },
  iletisimBaslik: { fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' },
  iletisimRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  iletisimLabel: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' },
  iletisimDeger: { fontSize: '18px', fontWeight: '600', color: '#111827' },
  btnAra: { padding: '10px 24px', background: '#1D9E75', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' },
  btnMesaj: { padding: '10px 20px', background: '#fff', border: '1px solid #1D9E75', color: '#1D9E75', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  altBilgi: { padding: '16px 24px', borderTop: '1px solid #f3f4f6', fontSize: '12px', color: '#9ca3af' },
}

export default IlanDetay