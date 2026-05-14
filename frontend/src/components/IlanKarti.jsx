function IlanKarti({ ilan, onDetay }) {
  const isim = ilan.isim || ilan.telefon?.slice(-4) || '??'

  return (
    <div style={styles.card} onClick={() => onDetay(ilan)}>
      <div style={styles.header}>
        <div>
          <div style={styles.userRow}>
            <div style={styles.avatar}>{isim[0]?.toUpperCase()}</div>
            <span style={styles.username}>{isim}</span>
            <span style={styles.stars}>★★★★★</span>
          </div>
          <div style={styles.title}>
            {ilan.tip === 'arac' ? 'Araç ilanı' : 'Yük ilanı'} — {ilan.arac_tipi || ilan.aracTipi}
          </div>
          <div style={styles.subtitle}>Kapasite: {ilan.kapasite} ton</div>
        </div>
        <span style={{ ...styles.badge, background: '#E1F5EE', color: '#0F6E56' }}>
          Aktif
        </span>
      </div>

      <div style={styles.rota}>
        <span style={styles.sehir}>{ilan.nereden}</span>
        <div style={styles.rotaCizgi}>
          <div style={styles.cizgi} />
          <span>🚛</span>
          <div style={styles.cizgi} />
        </div>
        <span style={styles.sehir}>{ilan.nereye}</span>
      </div>

      <div style={styles.detaylar}>
        <span>📅 {ilan.tarih} {ilan.saat && `/ ${ilan.saat}`}</span>
        <span>⚖️ {ilan.kapasite} ton</span>
        <span>📞 {ilan.telefon}</span>
      </div>

      {ilan.aciklama && (
        <div style={styles.aciklama}>{ilan.aciklama}</div>
      )}

      <div style={styles.footer}>
        <div style={styles.fiyat}>
          ₺{Number(ilan.fiyat).toLocaleString('tr-TR')}
          <span style={styles.fiyatAlt}> / sefer</span>
        </div>
        <div style={styles.detayLink}>Detayları gör →</div>
      </div>
    </div>
  )
}

const styles = {
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '14px', cursor: 'pointer', transition: 'box-shadow .15s, border-color .15s' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  userRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  avatar: { width: '28px', height: '28px', borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' },
  username: { fontSize: '13px', color: '#6b7280' },
  stars: { fontSize: '12px', color: '#EF9F27' },
  title: { fontSize: '16px', fontWeight: '600', color: '#111827' },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '2px' },
  badge: { fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '500', whiteSpace: 'nowrap' },
  rota: { display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0' },
  sehir: { fontSize: '15px', fontWeight: '600', color: '#111827' },
  rotaCizgi: { flex: 1, display: 'flex', alignItems: 'center', gap: '6px' },
  cizgi: { flex: 1, height: '1px', background: '#e5e7eb' },
  detaylar: { display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', flexWrap: 'wrap' },
  aciklama: { marginTop: '10px', fontSize: '13px', color: '#6b7280', fontStyle: 'italic' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #e5e7eb' },
  fiyat: { fontSize: '18px', fontWeight: '700', color: '#111827' },
  fiyatAlt: { fontSize: '13px', fontWeight: '400', color: '#6b7280' },
  detayLink: { fontSize: '13px', color: '#1D9E75', fontWeight: '500' },
}

export default IlanKarti