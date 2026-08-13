export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  country: string;
  locale: string;
}

export const WORLD_LANGUAGES: LanguageOption[] = [
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', flag: '🇺🇸' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
];

export const WORLD_CURRENCIES: CurrencyOption[] = [
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', locale: 'id-ID' },
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', locale: 'en-GB' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', locale: 'ja-JP' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', locale: 'en-SG' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', locale: 'en-AU' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', locale: 'en-CA' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', locale: 'zh-CN' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', locale: 'ko-KR' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', locale: 'ms-MY' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', locale: 'th-TH' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', locale: 'hi-IN' },
  { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal', country: 'Saudi Arabia', locale: 'ar-SA' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', locale: 'ar-AE' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland', locale: 'de-CH' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', locale: 'pt-BR' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', locale: 'en-PH' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', locale: 'vi-VN' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', country: 'Mexico', locale: 'es-MX' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', locale: 'tr-TR' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', locale: 'sv-SE' },
];
