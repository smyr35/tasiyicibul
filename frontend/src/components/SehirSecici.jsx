import { useState, useRef, useEffect } from 'react'

const SEHIRLER = [
  'İstanbul', 'Ankara', 'İzmir',
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya',
  'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın',
  'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
  'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
  'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay',
  'Iğdır', 'Isparta', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars',
  'Kastamonu', 'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin',
  'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
  'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop',
  'Şırnak', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli',
  'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak',
]

function SehirSecici({ placeholder, value, onChange }) {
  const [acik, setAcik] = useState(false)
  const [arama, setArama] = useState('')
  const ref = useRef()

  useEffect(() => {
    function dışaTıkla(e) {
      if (ref.current && !ref.current.contains(e.target)) setAcik(false)
    }
    document.addEventListener('mousedown', dışaTıkla)
    return () => document.removeEventListener('mousedown', dışaTıkla)
  }, [])

  const filtrelenmis = SEHIRLER.filter(s =>
    s.toLowerCase().includes(arama.toLowerCase())
  )

  const sec = (sehir) => {
    onChange(sehir)
    setAcik(false)
    setArama('')
  }

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div
        style={styles.secici}
        onClick={() => setAcik(a => !a)}
      >
        <span style={{ color: value ? '#111827' : '#9ca3af', flex: 1 }}>
          {value || placeholder}
        </span>
        <span style={{ color: '#9ca3af', fontSize: '12px' }}>{acik ? '▲' : '▼'}</span>
      </div>

      {acik && (
        <div style={styles.dropdown}>
          <div style={styles.aramaWrap}>
            <span style={styles.aramaIcon}>🔍</span>
            <input
              autoFocus
              style={styles.aramaInput}
              placeholder="Şehir ara..."
              value={arama}
              onChange={e => setArama(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div style={styles.liste}>
            {filtrelenmis.length === 0 && (
              <div style={styles.bulunamadi}>Şehir bulunamadı</div>
            )}
            {filtrelenmis.map(sehir => (
              <div
                key={sehir}
                style={{
                  ...styles.item,
                  background: value === sehir ? '#E1F5EE' : 'transparent',
                  color: value === sehir ? '#0F6E56' : '#111827',
                  fontWeight: value === sehir ? '600' : '400',
                }}
                onClick={() => sec(sehir)}
              >
                {value === sehir && <span style={{ marginRight: '6px' }}>✓</span>}
                {sehir}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  secici: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    background: '#fff',
    userSelect: 'none',
    height: '42px',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    minWidth: '220px',
    width: 'max-content',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    zIndex: 100,
    overflow: 'hidden',
  },
  aramaWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    borderBottom: '1px solid #f3f4f6',
  },
  aramaIcon: { fontSize: '14px' },
  aramaInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#111827',
    background: 'transparent',
  },
  liste: {
    maxHeight: '220px',
    overflowY: 'auto',
  },
  item: {
    padding: '10px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background .1s',
  },
  bulunamadi: {
    padding: '16px',
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center',
  },
}

export default SehirSecici