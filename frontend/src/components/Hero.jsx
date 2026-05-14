function Hero() {
  return (
    <div style={styles.hero}>
      <h1 style={styles.title}>Yükünüz için doğru aracı bulun</h1>
      <p style={styles.subtitle}>
        Türkiye genelinde binlerce kamyon ve tır sahibiyle anında bağlantı kurun
      </p>
      <div style={styles.searchBox}>
        <input style={styles.input} type="text" placeholder="Nereden? (örn. İstanbul)" />
        <input style={styles.input} type="text" placeholder="Nereye? (örn. Ankara)" />
        <select style={styles.input}>
          <option>Tüm yük tipleri</option>
          <option>Konteyner</option>
          <option>Büyük eşya</option>
          <option>Palet</option>
          <option>Araba</option>
        </select>
        <button style={styles.btn}>İlan ara</button>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    padding: '56px 32px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  searchBox: {
    display: 'flex',
    gap: '8px',
    maxWidth: '700px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    flex: '1',
    minWidth: '160px',
  },
  btn: {
    padding: '10px 24px',
    background: '#1D9E75',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default Hero