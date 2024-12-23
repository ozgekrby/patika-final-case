import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline/index.js'

export const CURRENCIES = ['TRY', 'USD', 'EUR', 'GBP']

export const SITE_NAVIGATION = {
  categories: [
    {
      name: 'Kadın',
      featured: [
        { name: 'Uyku', href: '/kategori/kadin' },
        { name: 'Mayo', href: '/kategori/kadin' },
        { name: 'İç Giyim', href: '/kategori/kadin' },
      ],
      collection: [
        { name: 'Hepsi', href: '/kategori/kadin' },
        { name: 'Temel', href: '/kategori/kadin' },
        { name: 'Yeni Gelenler', href: '/kategori/kadin' },
        { name: 'İndirim', href: '/kategori/kadin' },
      ],
      categories: [
        { name: 'Tişörtler', href: '/kategori/kadin' },
        { name: 'Şapkalar', href: '/kategori/kadin' },
        { name: 'Alt Giyim', href: '/kategori/kadin' },
        { name: 'İç Giyim', href: '/kategori/kadin' },
        { name: 'Aksesuarlar', href: '/kategori/kadin' },
      ],
      brands: [
        { name: 'LC Waikiki', href: '/kategori/kadin' },
        { name: 'Koton', href: '/kategori/kadin' },
        { name: 'Mavi', href: '/kategori/kadin' },
        { name: 'DeFacto', href: '/kategori/kadin' },
        { name: 'Penti', href: '/kategori/kadin' },
      ],
    },
    {
      name: 'Erkek',
      featured: [
        { name: 'Günlük', href: '/kategori/erkek' },
        { name: 'Boxer', href: '/kategori/erkek' },
        { name: 'Dış Giyim', href: '/kategori/erkek' },
      ],
      collection: [
        { name: 'Hepsi', href: '/kategori/erkek' },
        { name: 'Temel', href: '/kategori/erkek' },
        { name: 'Yeni Gelenler', href: '/kategori/erkek' },
        { name: 'İndirim', href: '/kategori/erkek' },
      ],
      categories: [
        { name: 'Sanat Tişörtleri', href: '/kategori/erkek' },
        { name: 'Pantolon', href: '/kategori/erkek' },
        { name: 'Aksesuarlar', href: '/kategori/erkek' },
        { name: 'Boxer', href: '/kategori/erkek' },
        { name: 'Temel Tişörtler', href: '/kategori/erkek' },
      ],
      brands: [
        { name: 'LC Waikiki', href: '/kategori/erkek' },
        { name: 'Koton', href: '/kategori/erkek' },
        { name: 'Mavi', href: '/kategori/erkek' },
        { name: 'DeFacto', href: '/kategori/erkek' },
        { name: 'Penti', href: '/kategori/erkek' },
      ],
    },
  ],
  pages: [
    { name: 'Hakkımızda', href: '/' },
    { name: 'Destek', href: '/' },
  ],
}

export const SORT_OPTIONS = [
  { name: 'En düşük fiyat', href: '/kategori/kadin', current: false },
  { name: 'En yüksek fiyat', href: '/kategori/kadin', current: false },
]

export const SUB_CATEGORIES = [
    { name: 'Tişörtler', href: '/kategori/kadin' },
    { name: 'Şapkalar', href: '/kategori/kadin' },
    { name: 'Alt Giyim', href: '/kategori/kadin' },
    { name: 'İç Giyim', href: '/kategori/kadin' },
    { name: 'Aksesuarlar', href: '/kategori/kadin' },
];

export const CATEGORY_FILTERS = [
  {
    id: 'color',
    name: 'Renk',
    options: [
      { value: 'white', label: 'Beyaz', checked: true },
      { value: 'beige', label: 'Bej', checked: false },
      { value: 'blue', label: 'Mavi', checked: false },
      { value: 'brown', label: 'Kahveregi', checked: false },
      { value: 'green', label: 'Yeşil', checked: false },
      { value: 'purple', label: 'Mor', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Beden',
    options: [
      { value: '2l', label: '2L', checked: true },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: false },
    ],
  },
]

export const PRODUCT_REVIEWS = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Yeterince iyi şeyler söyleyemem",
      rating: 5,
      content: `
        <p>Genel alışveriş deneyiminden gerçekten memnun kaldım. Siparişimde küçük, el yazısıyla yazılmış kişisel bir not bile vardı, bu beni çok mutlu etti!</p>
        <p>Ürün kalitesi harika, beklediğimden daha iyi görünüyor ve hissediliyor. Harika şeyler! Bu mağazayı arkadaşlarıma memnuniyetle tavsiye ederim. Ve şimdi düşündüğümde... Aslında birçok kez tavsiye ettim!</p>
      `,
      author: 'Müzeyyen Senar',
      date: '18 Temmuz 1961',
      datetime: '1961-07-18',
    },
  ],
}

export const PRODUCT_POLICIES = [
  { name: 'Uluslararası teslimat', icon: GlobeAmericasIcon, description: 'Siparişinizi 2 yıl içinde alın' },
  { name: 'Sadakat ödülleri', icon: CurrencyDollarIcon, description: 'Başka tişörtlere bakmayın' },
]