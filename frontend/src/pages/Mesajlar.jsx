import { useEffect, useState } from 'react'
import { gelenMesajlar, gidenMesajlar } from '../api'

function Mesajlar() {
  const [tab, setTab] = useState('gelen')
  const [mesajlar, setMesajlar] = useState([])
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    yukle(tab)
  }, [tab])

  const yukle = async (t) => {
    setYukleniyor(true)
    try {
      const data = t === 'gelen' ? await gelenMesajlar() : await gidenMesajlar()
      setMesajlar(Array.isArray(data) ? data : [])
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div style={styles.wrap}>
      <h2 style={styles.baslik}>Mesajlarım</h2>

      <div style={styles.tabGroup}>
        <button
          style={{ ...styles.tab, ...(tab === 'gelen' ? styles.tabAktif : {}) }}
          onClick={() => setTab('gelen')}
        >
          📥 Gelen
        </button>
        <button
          style={{ ...styles.tab, ...(tab === 'giden' ? styles.tabAktif : {}) }}
          onClick={() => setTab('giden')}
        >
          📤 Giden
        </button>
      </div>

      {yukleniyor && <div style={styles.durum}>Yükleniyor...</div>}

      {!yukleniyor && mesajlar.length === 0 && (
        <div style={styles.bos}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>
            {tab === 'gelen' ? '📭' : '📮'}
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
            {tab === 'gelen' ? 'Gelen mesaj yok' : 'Gönderilen mesaj yok'}
          </div>
        </div>
      )}

      {!yukleniyor && mesajlar.map(m => (
        <div key={m.id} style={{
          ...styles.mesajKart,
          borderLeft: !m.okundu && tab === 'gelen' ? '3px solid #1D9E75' : '3px solid transparent',
        }}>
          <div style={styles.mesajBaslik}>
            <div>
              <div style={styles.kimden}>
                {tab === 'gelen'
                  ? `${m.gonderen_ad} ${m.gonderen_soyad}`
                  : `${m.alici_ad} ${m.alici_soyad}`
                }
              </div>
              <div style={styles.ilanBilgi}>
                {m.nereden} → {m.nereye} · {m.arac_tipi}
              </div>
            </div>
            <div style={styles.tarih}>
              {new Date(m.tarih).toLocaleDateString('tr-TR', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>
          <div style={styles.mesajMetin}>{m.mesaj}</div>
          {!m.okundu && tab === 'gelen' && (
            <span style={styles.yeniBadge}>Yeni</span>
          )}
        </div>
      ))}
    </div>
  )
}

const styles = {
  wrap: { maxWidth: '680px', margin: '24px auto', padding: '0 24px' },
  baslik: { fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '20px' },
  tabGroup: { display: 'flex', background: '#f3f4f6', borderRadius: '10px', padding: '4px', marginBottom: '20px' },
  tab: { flex: 1, padding: '9px', border: 'none', borderRadius: '8px', background: 'transparent', fontSize: '14px', cursor: 'pointer', color: '#6b7280' },
  tabAktif: { background: '#fff', color: '#111827', fontWeight: '600', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  durum: { textAlign: 'center', padding: '48px', color: '#6b7280' },
  bos: { textAlign: 'center', padding: '64px 24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' },
  mesajKart: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', marginBottom: '10px', position: 'relative' },
  mesajBaslik: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  kimden: { fontSize: '15px', fontWeight: '600', color: '#111827' },
  ilanBilgi: { fontSize: '12px', color: '#6b7280', marginTop: '3px' },
  tarih: { fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' },
  mesajMetin: { fontSize: '14px', color: '#374151', lineHeight: '1.6' },
  yeniBadge: { position: 'absolute', top: '12px', right: '12px', fontSize: '11px', padding: '2px 8px', background: '#E1F5EE', color: '#0F6E56', borderRadius: '10px', fontWeight: '600' },
}

export default Mesajlar