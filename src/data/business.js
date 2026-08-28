// Central place for business details. Values come from .env (see .env.example).
// Falls back to placeholder values so the site still runs without a .env file.

export const business = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'Dapur Nenek Rajib',
  tagline: 'Rasa Lezat, Dibuat dengan Hati',
  subtitle: 'Nikmati masakan rumahan favoritmu dengan berbagai pilihan menu.',
  address: import.meta.env.VITE_BUSINESS_ADDRESS || 'Jl. Anggrek, Kp. Tegalwaru Ciampea Bogor, Jawa Barat',
  hours: import.meta.env.VITE_BUSINESS_HOURS || 'Setiap hari, 09.00 - 20.00',
  instagram: import.meta.env.VITE_BUSINESS_INSTAGRAM || '@dapurnenekrajib',
  waNumber: import.meta.env.VITE_WA_NUMBER || '6281234567890',
  danaNumber: import.meta.env.VITE_DANA_NUMBER || '0812-3456-7890',
  danaName: import.meta.env.VITE_DANA_NAME || 'Dapur Nenek Rajib',
  dpPercent: 50,
};
