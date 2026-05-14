function Navbar({ kullanici, onYeniIlan, onGiris, onCikis, onLogo, onProfil }) {
  return (
    <nav style={styles.nav}>
      <div style={{ ...styles.logo, cursor: 'pointer' }} onClick={onLogo}>
        🚛 TaşıyıcıBul
      </div>
      <div style={styles.links}>
        {kullanici ? (
          <>
            <span style={{ ...styles.hosgeldin, cursor: 'pointer' }} onClick={onProfil}>
              👤 {kullanici.ad}
            </span>
            <button style={styles.btnOutline} onClick={onCikis}>Çıkış yap</button>
            <button style={styles.btnPrimary} onClick={onYeniIlan}>+ İlan ver</button>
          </>
        ) : (
          <>
            <button style={styles.btnOutline} onClick={onGiris}>Giriş yap</button>
            <button style={styles.btnPrimary} onClick={onGiris}>Ücretsiz kaydol</button>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' },
  logo: { fontSize: '20px', fontWeight: '600', color: '#111827' },
  links: { display: 'flex', alignItems: 'center', gap: '10px' },
  hosgeldin: { fontSize: '14px', color: '#1D9E75', fontWeight: '500' },
  btnOutline: { padding: '8px 18px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'transparent', fontSize: '14px', cursor: 'pointer' },
  btnPrimary: { padding: '8px 18px', border: 'none', borderRadius: '8px', background: '#1D9E75', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
}

export default Navbar