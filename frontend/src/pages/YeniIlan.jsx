import { useState } from 'react'
import SehirSecici from '../components/SehirSecici'
import { ilanEkle } from '../api'

const adimlar = ['İlan tipi', 'Rota & tarih', 'Detaylar', 'Özet & yayınla']

function YeniIlan({ onGeriDon }) {
  const [adim, setAdim] = useState(0)
  const [tarihHatasi, setTarihHatasi] = useState('')
  const [form, setForm] = useState({
    tip: '',
    aracTipi: '',
    nereden: '',
    nereye: '',
    tarih: '',
    saat: '',
    kapasite: '',
    fiyat: '',
    telefon: '',
    aciklama: '',
  })

  const guncelle = (alan, deger) => setForm(f => ({ ...f, [alan]: deger }))

  const tarihKontrol = () => {
    const secilen = new Date(`${form.tarih}T${form.saat}`)
    const simdi = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))
    if (secilen <= simdi) {
      setTarihHatasi('Geçmiş bir tarih ve saat seçtiniz. Lütfen ileriki bir zaman seçin.')
      return
    }
    setTarihHatasi('')
    setAdim(2)
  }

  const yayinla = async () => {
    try {
      await ilanEkle(form)
      setAdim(4)
    } catch (err) {
      alert('İlan kaydedilemedi, backend çalışıyor mu?')
    }
  }

  return (
    <div style={styles.wrap}>

      {/* Adım göstergesi */}
      <div style={styles.adimlar}>
        {adimlar.map((a, i) => (
          <div key={i} style={styles.adimItem}>
            <div style={{
              ...styles.adimDaire,
              background: i < adim ? '#E1F5EE' : i === adim ? '#1D9E75' : '#f3f4f6',
              color: i < adim ? '#0F6E56' : i === adim ? '#fff' : '#9ca3af',
              border: i < adim ? '1px solid #5DCAA5' : i === adim ? 'none' : '1px solid #e5e7eb',
            }}>
              {i < adim ? '✓' : i + 1}
            </div>
            <span style={{
              ...styles.adimLabel,
              color: i === adim ? '#1D9E75' : '#9ca3af',
              fontWeight: i === adim ? '600' : '400',
            }}>{a}</span>
          </div>
        ))}
      </div>

      {/* Adım 1 — İlan tipi */}
      {adim === 0 && (
        <div style={styles.card}>
          <h2 style={styles.baslik}>Ne ilanı vermek istiyorsunuz?</h2>
          <p style={styles.altBaslik}>Uygun ilan tipini seçin</p>
          <div style={styles.tipGrid}>
            {['arac', 'yuk'].map(t => (
              <div
                key={t}
                style={{
                  ...styles.tipKart,
                  border: form.tip === t ? '2px solid #1D9E75' : '1px solid #e5e7eb',
                  background: form.tip === t ? '#E1F5EE' : '#fff',
                }}
                onClick={() => guncelle('tip', t)}
              >
                <div style={{ fontSize: '28px' }}>{t === 'arac' ? '🚛' : '📦'}</div>
                <div style={styles.tipAd}>{t === 'arac' ? 'Araç ilanı' : 'Yük ilanı'}</div>
                <div style={styles.tipAcik}>
                  {t === 'arac' ? 'Boş aracınız var, yük arıyorsunuz' : 'Taşıtmak istediğiniz yük var'}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px' }}>
            <label style={styles.label}>Araç tipi</label>
            <select style={styles.input} value={form.aracTipi} onChange={e => guncelle('aracTipi', e.target.value)}>
              <option value="">Seçin...</option>
              <option>Tır (13.6m)</option>
              <option>Kamyon</option>
              <option>Konteyner 20'</option>
              <option>Konteyner 40'</option>
              <option>Frigorifik</option>
              <option>Açık kasa</option>
              <option>Lowbed</option>
            </select>
          </div>
          <div style={styles.footer}>
            <button style={styles.btnGeri} onClick={onGeriDon}>İptal</button>
            <button
              style={{ ...styles.btnIleri, opacity: form.tip && form.aracTipi ? 1 : 0.4 }}
              disabled={!form.tip || !form.aracTipi}
              onClick={() => setAdim(1)}
            >Devam et</button>
          </div>
        </div>
      )}

      {/* Adım 2 — Rota & tarih */}
      {adim === 1 && (
        <div style={styles.card}>
          <h2 style={styles.baslik}>Rota ve tarih bilgileri</h2>
          <p style={styles.altBaslik}>Nereden nereye, ne zaman?</p>
          <div style={styles.row2}>
            <div>
              <label style={styles.label}>Çıkış şehri</label>
              <SehirSecici
                placeholder="Şehir seçin..."
                value={form.nereden}
                onChange={v => guncelle('nereden', v)}
              />
            </div>
            <div>
              <label style={styles.label}>Varış şehri</label>
              <SehirSecici
                placeholder="Şehir seçin..."
                value={form.nereye}
                onChange={v => guncelle('nereye', v)}
              />
            </div>
          </div>
          <div style={styles.row2}>
            <div style={{ marginTop: '14px' }}>
              <label style={styles.label}>Çıkış tarihi</label>
              <input
                style={styles.input}
                type="date"
                value={form.tarih}
                onChange={e => guncelle('tarih', e.target.value)}
              />
            </div>
            <div style={{ marginTop: '14px' }}>
              <label style={styles.label}>Çıkış saati</label>
              <input
                style={styles.input}
                type="time"
                value={form.saat}
                onChange={e => guncelle('saat', e.target.value)}
              />
            </div>
          </div>

          {tarihHatasi && (
            <div style={styles.uyari}>⚠️ {tarihHatasi}</div>
          )}

          <div style={styles.footer}>
            <button style={styles.btnGeri} onClick={() => setAdim(0)}>Geri</button>
            <button
              style={{ ...styles.btnIleri, opacity: form.nereden && form.nereye && form.tarih && form.saat ? 1 : 0.4 }}
              disabled={!form.nereden || !form.nereye || !form.tarih || !form.saat}
              onClick={tarihKontrol}
            >Devam et</button>
          </div>
        </div>
      )}

      {/* Adım 3 — Detaylar */}
      {adim === 2 && (
        <div style={styles.card}>
          <h2 style={styles.baslik}>Yük / araç detayları</h2>
          <p style={styles.altBaslik}>Kapasite ve fiyat bilgilerini girin</p>
          <div style={styles.row2}>
            <div>
              <label style={styles.label}>Kapasite (ton)</label>
              <input
                style={styles.input}
                type="number"
                placeholder="24"
                value={form.kapasite}
                onChange={e => guncelle('kapasite', e.target.value)}
              />
            </div>
            <div>
              <label style={styles.label}>Fiyat (₺)</label>
              <input
                style={styles.input}
                type="number"
                placeholder="18500"
                value={form.fiyat}
                onChange={e => guncelle('fiyat', e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={styles.label}>İletişim telefonu</label>
            <input
              style={styles.input}
              type="tel"
              placeholder="0532 xxx xx xx"
              value={form.telefon}
              onChange={e => guncelle('telefon', e.target.value)}
            />
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={styles.label}>Ek açıklama (opsiyonel)</label>
            <textarea
              style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
              placeholder="Yük hakkında ek bilgi..."
              value={form.aciklama}
              onChange={e => guncelle('aciklama', e.target.value)}
            />
          </div>
          <div style={styles.footer}>
            <button style={styles.btnGeri} onClick={() => setAdim(1)}>Geri</button>
            <button
              style={{ ...styles.btnIleri, opacity: form.kapasite && form.fiyat && form.telefon ? 1 : 0.4 }}
              disabled={!form.kapasite || !form.fiyat || !form.telefon}
              onClick={() => setAdim(3)}
            >Özeti gör</button>
          </div>
        </div>
      )}

      {/* Adım 4 — Özet */}
      {adim === 3 && (
        <div style={styles.card}>
          <h2 style={styles.baslik}>İlanınızı kontrol edin</h2>
          <p style={styles.altBaslik}>Yayınlamadan önce bilgileri doğrulayın</p>
          {[
            ['İlan tipi', form.tip === 'arac' ? 'Araç ilanı' : 'Yük ilanı'],
            ['Araç tipi', form.aracTipi],
            ['Güzergah', `${form.nereden} → ${form.nereye}`],
            ['Tarih & saat', `${form.tarih} / ${form.saat}`],
            ['Kapasite', `${form.kapasite} ton`],
            ['Fiyat', `₺${Number(form.fiyat).toLocaleString('tr-TR')}`],
            ['Telefon', form.telefon],
            ['Açıklama', form.aciklama || '—'],
          ].map(([label, val]) => (
            <div key={label} style={styles.ozetSatir}>
              <span style={styles.ozetLabel}>{label}</span>
              <span style={styles.ozetVal}>{val}</span>
            </div>
          ))}
          <div style={styles.bilgi}>
            İlanınız yayınlandıktan sonra 30 gün aktif kalır. Dilediğiniz zaman düzenleyebilir veya kaldırabilirsiniz.
          </div>
          <div style={styles.footer}>
            <button style={styles.btnGeri} onClick={() => setAdim(2)}>Geri</button>
            <button style={styles.btnIleri} onClick={yayinla}>İlanı yayınla 🚀</button>
          </div>
        </div>
      )}

      {/* Başarı ekranı */}
      {adim === 4 && (
        <div style={{ ...styles.card, textAlign: 'center', padding: '48px 32px' }}>
          <div style={styles.basariIcon}>✓</div>
          <h2 style={{ ...styles.baslik, marginBottom: '10px' }}>İlanınız yayınlandı!</h2>
          <p style={{ color: '#6b7280', marginBottom: '28px' }}>
            Nakliyeciler sizi görebilir ve iletişime geçebilir.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button style={styles.btnGeri} onClick={onGeriDon}>Ana sayfaya dön</button>
            <button style={styles.btnIleri} onClick={() => {
              setAdim(0)
              setTarihHatasi('')
              setForm({ tip: '', aracTipi: '', nereden: '', nereye: '', tarih: '', saat: '', kapasite: '', fiyat: '', telefon: '', aciklama: '' })
            }}>
              Yeni ilan ekle
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

const styles = {
  wrap: { maxWidth: '560px', margin: '32px auto', padding: '0 20px' },
  adimlar: { display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '28px' },
  adimItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 },
  adimDaire: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' },
  adimLabel: { fontSize: '11px', textAlign: 'center' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' },
  baslik: { fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' },
  altBaslik: { fontSize: '14px', color: '#6b7280', marginBottom: '20px' },
  tipGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  tipKart: { borderRadius: '10px', padding: '20px', cursor: 'pointer', transition: 'all .15s' },
  tipAd: { fontSize: '15px', fontWeight: '600', color: '#111827', marginTop: '10px' },
  tipAcik: { fontSize: '12px', color: '#6b7280', marginTop: '4px' },
  label: { display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#111827', outline: 'none' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' },
  btnGeri: { padding: '9px 20px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'transparent', fontSize: '14px', cursor: 'pointer', color: '#6b7280' },
  btnIleri: { padding: '9px 24px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  ozetSatir: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' },
  ozetLabel: { color: '#6b7280' },
  ozetVal: { color: '#111827', fontWeight: '500', textAlign: 'right', maxWidth: '60%' },
  uyari: { marginTop: '12px', padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', fontSize: '13px', color: '#92400E' },
  bilgi: { marginTop: '16px', padding: '12px 14px', background: '#f9fafb', borderRadius: '8px', fontSize: '13px', color: '#6b7280' },
  basariIcon: { width: '56px', height: '56px', borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#0F6E56', margin: '0 auto 16px', fontWeight: '700' },
}

export default YeniIlan