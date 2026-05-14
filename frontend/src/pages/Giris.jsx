import { useState } from 'react'
import { girisYap, kayitOl } from '../api'

function Giris({ onGiris }) {
  const [mod, setMod] = useState('giris') // 'giris' veya 'kayit'
  const [form, setForm] = useState({ ad: '', soyad: '', email: '', sifre: '', telefon: '' })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const guncelle = (alan, deger) => setForm(f => ({ ...f, [alan]: deger }))

  const gonder = async () => {
    setHata('')
    setYukleniyor(true)
    try {
      const sonuc = mod === 'giris'
        ? await girisYap({ email: form.email, sifre: form.sifre })
        : await kayitOl(form)

      if (sonuc.hata) {
        setHata(sonuc.hata)
      } else {
        localStorage.setItem('token', sonuc.token)
        localStorage.setItem('kullanici', JSON.stringify(sonuc.kullanici))
        onGiris(sonuc.kullanici)
      }
    } catch (err) {
      setHata('Bir hata oluştu, tekrar deneyin')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logo}>🚛 TaşıyıcıBul</div>

        {/* Tab */}
        <div style={styles.tabGroup}>
          <button
            style={{ ...styles.tab, ...(mod === 'giris' ? styles.tabAktif : {}) }}
            onClick={() => { setMod('giris'); setHata('') }}
          >Giriş yap</button>
          <button
            style={{ ...styles.tab, ...(mod === 'kayit' ? styles.tabAktif : {}) }}
            onClick={() => { setMod('kayit'); setHata('') }}
          >Kayıt ol</button>
        </div>

        {/* Kayıt alanları */}
        {mod === 'kayit' && (
          <>
            <div style={styles.row2}>
              <div>
                <label style={styles.label}>Ad</label>
                <input style={styles.input} placeholder="Ahmet" value={form.ad} onChange={e => guncelle('ad', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Soyad</label>
                <input style={styles.input} placeholder="Yılmaz" value={form.soyad} onChange={e => guncelle('soyad', e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={styles.label}>Telefon</label>
              <input style={styles.input} placeholder="0532 xxx xx xx" value={form.telefon} onChange={e => guncelle('telefon', e.target.value)} />
            </div>
          </>
        )}

        {/* Ortak alanlar */}
        <div style={{ marginTop: '12px' }}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" placeholder="ornek@email.com" value={form.email} onChange={e => guncelle('email', e.target.value)} />
        </div>
        <div style={{ marginTop: '12px' }}>
          <label style={styles.label}>Şifre</label>
          <input style={styles.input} type="password" placeholder="••••••••" value={form.sifre} onChange={e => guncelle('sifre', e.target.value)} />
        </div>

        {/* Hata */}
        {hata && <div style={styles.hata}>⚠️ {hata}</div>}

        {/* Buton */}
        <button
          style={{ ...styles.btn, opacity: yukleniyor ? 0.6 : 1 }}
          onClick={gonder}
          disabled={yukleniyor}
        >
          {yukleniyor ? 'Lütfen bekleyin...' : mod === 'giris' ? 'Giriş yap' : 'Kayıt ol'}
        </button>

        <p style={styles.altYazi}>
          {mod === 'giris' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}
          <span style={styles.link} onClick={() => { setMod(mod === 'giris' ? 'kayit' : 'giris'); setHata('') }}>
            {mod === 'giris' ? ' Kayıt ol' : ' Giriş yap'}
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  wrap: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#f9fafb' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px' },
  logo: { fontSize: '22px', fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: '24px' },
  tabGroup: { display: 'flex', background: '#f3f4f6', borderRadius: '10px', padding: '4px', marginBottom: '24px' },
  tab: { flex: 1, padding: '8px', border: 'none', borderRadius: '8px', background: 'transparent', fontSize: '14px', cursor: 'pointer', color: '#6b7280' },
  tabAktif: { background: '#fff', color: '#111827', fontWeight: '600', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  label: { display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#111827', outline: 'none', boxSizing: 'border-box' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  hata: { marginTop: '12px', padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', fontSize: '13px', color: '#DC2626' },
  btn: { width: '100%', marginTop: '20px', padding: '12px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  altYazi: { textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#6b7280' },
  link: { color: '#1D9E75', cursor: 'pointer', fontWeight: '500' },
}

export default Giris