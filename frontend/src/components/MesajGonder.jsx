import { useState } from 'react'
import { mesajGonder } from '../api'

function MesajGonder({ ilan, kullanici, onKapat }) {
  const [mesaj, setMesaj] = useState('')
  const [gonderildi, setGonderildi] = useState(false)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')

  const gonder = async () => {
    if (!mesaj.trim()) {
      setHata('Mesaj boş gönderilemez.')
      return
    }

    if (kullanici && ilan.kullanici_id === kullanici.id) {
      setHata('Kendi ilanınıza mesaj gönderemezsiniz.')
      return
    }

    setYukleniyor(true)
    setHata('')
    try {
      const sonuc = await mesajGonder({
        ilan_id: ilan.id,
        alici_id: ilan.kullanici_id,
        mesaj: mesaj.trim(),
      })
      if (sonuc.hata) {
        setHata(sonuc.hata)
      } else {
        setGonderildi(true)
      }
    } catch {
      setHata('Mesaj gönderilemedi, tekrar deneyin')
    } finally {
      setYukleniyor(false)
    }
  }

  if (gonderildi) {
    return (
      <div style={styles.overlay} onClick={onKapat}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={styles.basariIcon}>✓</div>
          <h3 style={styles.baslik}>Mesajınız gönderildi!</h3>
          <p style={styles.altBaslik}>İlan sahibi en kısa sürede size dönecektir.</p>
          <button style={styles.btnKapat} onClick={onKapat}>Kapat</button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.overlay} onClick={onKapat}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalBaslik}>
          <h3 style={styles.baslik}>Mesaj Gönder</h3>
          <button style={styles.btnX} onClick={onKapat}>✕</button>
        </div>

        <div style={styles.ilanBilgi}>
          <span style={styles.ilanRota}>
            {ilan.nereden} → {ilan.nereye}
          </span>
          <span style={styles.ilanTip}>{ilan.arac_tipi}</span>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={styles.label}>Mesajınız</label>
          <textarea
            style={styles.textarea}
            placeholder="Merhaba, ilanınızla ilgili bilgi almak istiyorum..."
            value={mesaj}
            onChange={e => setMesaj(e.target.value)}
            rows={5}
            maxLength={500}
          />
          <div style={styles.karakterSayac}>
            {mesaj.length} / 500 karakter
          </div>
        </div>

        {hata && <div style={styles.hata}>⚠️ {hata}</div>}

        <div style={styles.footer}>
          <button style={styles.btnIptal} onClick={onKapat}>İptal</button>
          <button
            style={{ ...styles.btnGonder, opacity: mesaj.trim() && !yukleniyor ? 1 : 0.4 }}
            disabled={!mesaj.trim() || yukleniyor}
            onClick={gonder}
          >
            {yukleniyor ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' },
  modal: { background: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' },
  modalBaslik: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  baslik: { fontSize: '18px', fontWeight: '700', color: '#111827' },
  btnX: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#6b7280' },
  ilanBilgi: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9fafb', borderRadius: '8px' },
  ilanRota: { fontSize: '14px', fontWeight: '600', color: '#111827' },
  ilanTip: { fontSize: '12px', color: '#6b7280' },
  label: { display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' },
  textarea: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#111827', outline: 'none', resize: 'vertical', boxSizing: 'border-box' },
  karakterSayac: { fontSize: '12px', color: '#9ca3af', textAlign: 'righ