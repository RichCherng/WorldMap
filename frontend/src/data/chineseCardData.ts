import { ChineseCardData } from '@/components/FlashCard/Language/ChineseCard';

/**
 * Mock data for Chinese flashcards.
 * This will be replaced by API calls in the future.
 */
export const mockChineseCardData: ChineseCardData[] = [
  {
    id: 1,
    chineseWord: '你好',
    englishWord: 'Hello',
    pinyin: 'Nǐ hǎo',
    img: 'https://i.pinimg.com/736x/82/42/75/824275fa74fdff9a946834a52e38ff6c.jpg'
  },
  {
    id: 2,
    chineseWord: '谢谢',
    englishWord: 'Thank you',
    pinyin: 'Xièxiè'
  },
  {
    id: 3,
    chineseWord: '再见',
    englishWord: 'Goodbye',
    pinyin: 'Zàijiàn'
  },
  {
    id: 4,
    chineseWord: '请',
    englishWord: 'Please',
    pinyin: 'Qǐng'
  },
  {
    id: 5,
    chineseWord: '我',
    englishWord: 'I, me',
    pinyin: 'Wǒ'
  },
  {
    id: 6,
    chineseWord: '是',
    englishWord: 'Yes/to be',
    pinyin: 'Shì'
  },
  {
    id: 7,
    chineseWord: '不',
    englishWord: 'No/not',
    pinyin: 'Bù'
  },
  {
    id: 8,
    chineseWord: '水',
    englishWord: 'Water',
    pinyin: 'Shuǐ'
  },
  {
    id: 9,
    chineseWord: '吃',
    englishWord: 'To eat',
    pinyin: 'Chī'
  },
  {
    id: 10,
    chineseWord: '喝',
    englishWord: 'To drink',
    pinyin: 'Hē'
  },
  {
    id: 11,
    chineseWord: '好',
    englishWord: 'Good',
    pinyin: 'Hǎo'
  },
  {
    id: 12,
    chineseWord: '爱',
    englishWord: 'Love',
    pinyin: 'Ài'
  },
  {
    id: 13,
    chineseWord: '家',
    englishWord: 'Home/family',
    pinyin: 'Jiā'
  },
  {
    id: 14,
    chineseWord: '朋友',
    englishWord: 'Friend',
    pinyin: 'Péngyǒu'
  },
  {
    id: 15,
    chineseWord: '学习',
    englishWord: 'To study',
    pinyin: 'Xuéxí'
  },
];

/**
 * API Response interface for Chinese card data
 * This defines the expected structure from the backend API
 */
export interface ChineseCardAPIResponse {
  success: boolean;
  data: ChineseCardData[];
  message?: string;
  error?: string;
}

/**
 * Placeholder for future API endpoint
 * Replace this with actual API call when backend is ready
 */
export const CHINESE_CARDS_API_ENDPOINT = '/api/flashcards/chinese';
