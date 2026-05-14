import SehirSecici from './SehirSecici'

function Filtre({ filtreler, onChange, onTemizle }) {
  const guncelle = (alan, deger) => onChange({ ...filtreler, [alan]: deger })

  return (
    <div style={styles.wrap}>
      <div style={styles.icerik}>
        <div style={styles.grup}>
          <label style={styles.label}>Çıkış şehri</label>
          <SehirSecici
            placeholder="Tümü"
            value={filtreler.nereden}
            onChange={v => guncelle('nereden', v)}
          />
        </div>
        <div style={styles.grup}>
          <label style={styles.label}>Varış şehri</label>
          <SehirSecici
            placeholder="Tümü"
            value={filtreler.nereye}
            onChange={v => guncelle('nereye', v)}
          />
        </div>
        <div style={styles.grup}>
          <label style={styles.label}>İlan tipi</label>
          <select
            style={styles.select}
            value={filtreler.tip}
            onChange={e => guncelle('tip', e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="arac">Araç ilanı</option>
            <option value="yuk">Yük ilanı</option>
          </select>
        </div>
        <div style={styles.grup}>
          <label style={styles.label}>Araç tipi</label>
          <select
            style={styles.select}
            value={filtreler.aracTipi}
            onChange={e => guncelle('aracTipi', e.target.value)}
          >
            <option value="">Tümü</option>
            <option>Tır (13.6m)</option>
            <option>Kamyon</option>
            <option>Konteyner 20'</option>
            <option>Konteyner 40'</option>
            <option>Frigorifik</option>
            <option>Açık kasa</option>
            <option>Lowbed</option>
          </select>
        </div>
        <div style={styles.btnWrap}>
          <label style={{ ...styles.label, visibility: 'hidden' }}>x</label>
          <button style={styles.btnTemizle} onClick={onTemizle}>
            Temizle
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 32px',
  },
  icerik: {
    maxWidth: '960px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
    gap: '12px',
    alignItems: 'end',
  },
  grup: { display: 'flex', flexDirection: 'column' },
  btnWrap: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '12px', color: '#6b7280', marginBottom: '6px' },
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    background: '#fff',
    cursor: 'pointer',
    height: '42px',
  },
  btnTemizle: {
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    background: 'transparent',
    fontSize: '13px',
    color: '#6b7280',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    height: '42px',
  },
}

export default Filtre