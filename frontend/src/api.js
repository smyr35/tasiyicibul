const BASE_URL = 'http://localhost:5000'

export async function getIlanlar(filtreler = {}) {
  const params = new URLSearchParams()
  if (filtreler.nereden) params.append('nereden', filtreler.nereden)
  if (filtreler.nereye) params.append('nereye', filtreler.nereye)
  if (filtreler.tip) params.append('tip', filtreler.tip)
  if (filtreler.aracTipi) params.append('aracTipi', filtreler.aracTipi)

  const res = await fetch(`${BASE_URL}/api/ilanlar?${params.toString()}`)
  return res.json()
}

export async function ilanEkle(form) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE_URL}/api/ilanlar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
  return res.json()
}
export async function kayitOl(form) {
  const res = await fetch(`${BASE_URL}/api/auth/kayit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  return res.json()
}

export async function girisYap(form) {
  const res = await fetch(`${BASE_URL}/api/auth/giris`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  return res.json()
}

export async function benimIlanlarim() {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE_URL}/api/ilanlar/benim`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function ilanSil(id) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE_URL}/api/ilanlar/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}