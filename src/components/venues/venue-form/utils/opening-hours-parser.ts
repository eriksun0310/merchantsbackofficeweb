/**
 * 營業時間智慧解析器
 * 支援從 Google 地圖複製的格式
 */

export interface ParsedPeriod {
  dayType: number; // 1-7 (週一=1 到 週日=7)
  openTime: string;
  closeTime: string;
}

export interface ParseError {
  line: string;
  reason: string;
}

export interface ParseResult {
  success: ParsedPeriod[];
  errors: ParseError[];
  conflictDays: number[];
  hasConflicts: boolean;
  closedDays: number[]; // 標記為休息的天
}

interface TimeRange {
  openTime: string;
  closeTime: string;
}

interface DaySection {
  header: string;
  content: string;
}

// 星期辨識模式 (dayType: 1-7, 週一=1, 週日=7)
const DAY_PATTERNS: Record<number, string[]> = {
  1: ['週一', '星期一', '周一', '禮拜一', 'monday', 'mon'],
  2: ['週二', '星期二', '周二', '禮拜二', 'tuesday', 'tue'],
  3: ['週三', '星期三', '周三', '禮拜三', 'wednesday', 'wed'],
  4: ['週四', '星期四', '周四', '禮拜四', 'thursday', 'thu'],
  5: ['週五', '星期五', '周五', '禮拜五', 'friday', 'fri'],
  6: ['週六', '星期六', '周六', '禮拜六', 'saturday', 'sat'],
  7: ['週日', '星期日', '星期天', '周日', '禮拜日', '禮拜天', 'sunday', 'sun'],
};

// 休息日關鍵字
const CLOSED_KEYWORDS = ['休息', '公休', '休館', '不營業', '未營業', '休', 'closed', 'close'];

// 時間格式正規表達式
const TIME_PATTERNS = [
  // Google 地圖格式：11:30–14:30 (使用 en dash)
  /(\d{1,2}):(\d{2})\s*[–—]\s*(\d{1,2}):(\d{2})/,
  // 一般格式：11:30-14:30 (使用 hyphen)
  /(\d{1,2}):(\d{2})\s*[-]\s*(\d{1,2}):(\d{2})/,
  // 波浪線：11:30~14:30
  /(\d{1,2}):(\d{2})\s*[~～]\s*(\d{1,2}):(\d{2})/,
  // 空格分隔：11:30 14:30
  /(\d{1,2}):(\d{2})\s+(\d{1,2}):(\d{2})/,
  // 文字分隔：11:30 to 14:30
  /(\d{1,2}):(\d{2})\s*(?:to|至|到)\s*(\d{1,2}):(\d{2})/i,
  // 中文冒號：11：30-14：30
  /(\d{1,2})：(\d{2})\s*[-–—~]\s*(\d{1,2})：(\d{2})/,
];

/**
 * 辨識星期 (回傳 1-7)
 */
function identifyDayType(text: string): number | null {
  const cleaned = text.trim().toLowerCase();

  for (const [dayType, patterns] of Object.entries(DAY_PATTERNS)) {
    for (const pattern of patterns) {
      if (cleaned.includes(pattern.toLowerCase())) {
        return parseInt(dayType);
      }
    }
  }

  return null;
}

/**
 * 檢查是否為休息日
 */
function isClosedDay(text: string): boolean {
  const cleaned = text.trim().toLowerCase();
  return CLOSED_KEYWORDS.some(keyword => cleaned.includes(keyword.toLowerCase()));
}

/**
 * 解析時間範圍
 */
function parseTimeRange(text: string): TimeRange | null {
  for (const pattern of TIME_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const openHour = match[1].padStart(2, '0');
      const openMinute = match[2];
      const closeHour = match[3].padStart(2, '0');
      const closeMinute = match[4];

      return {
        openTime: `${openHour}:${openMinute}`,
        closeTime: `${closeHour}:${closeMinute}`,
      };
    }
  }

  return null;
}

/**
 * 按星期分段
 */
function splitByDay(text: string): DaySection[] {
  const lines = text.split('\n');
  const sections: DaySection[] = [];
  let currentSection: DaySection | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 檢查是否為星期標題
    const dayType = identifyDayType(trimmed);

    if (dayType !== null) {
      // 開始新的一段
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        header: trimmed,
        content: '',
      };
    } else if (currentSection) {
      // 加入內容
      currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * 解析單一天的多個時段
 */
function parseMultiplePeriods(dayText: string, dayType: number): { periods: ParsedPeriod[]; isClosed: boolean } {
  const lines = dayText.split('\n').filter(line => line.trim());
  const periods: ParsedPeriod[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // 跳過星期標題行
    if (identifyDayType(trimmed) !== null) continue;

    // 檢查是否為休息日
    if (isClosedDay(trimmed)) {
      return { periods: [], isClosed: true };
    }

    // 解析時間
    const timeRange = parseTimeRange(trimmed);
    if (timeRange) {
      periods.push({
        dayType,
        openTime: timeRange.openTime,
        closeTime: timeRange.closeTime,
      });
    }
  }

  return { periods, isClosed: false };
}

/**
 * 主要解析函數
 */
export function parseOpeningHoursText(
  text: string,
  existingDays: number[] = []
): ParseResult {
  const result: ParseResult = {
    success: [],
    errors: [],
    conflictDays: [],
    hasConflicts: false,
    closedDays: [],
  };

  if (!text.trim()) {
    result.errors.push({
      line: '',
      reason: '請輸入營業時間文字',
    });
    return result;
  }

  // 1. 預處理：統一換行符號
  const normalized = text.replace(/\r\n/g, '\n').trim();

  // 2. 按星期分段
  const sections = splitByDay(normalized);

  if (sections.length === 0) {
    result.errors.push({
      line: text.substring(0, 50),
      reason: '無法識別任何星期資訊',
    });
    return result;
  }

  // 3. 解析每一段
  for (const section of sections) {
    const dayType = identifyDayType(section.header);

    if (dayType === null) {
      result.errors.push({
        line: section.header,
        reason: '無法識別星期',
      });
      continue;
    }

    // 檢查是否會覆蓋現有資料
    if (existingDays.includes(dayType)) {
      result.hasConflicts = true;
      if (!result.conflictDays.includes(dayType)) {
        result.conflictDays.push(dayType);
      }
    }

    // 解析時段
    const { periods, isClosed } = parseMultiplePeriods(section.content, dayType);

    if (isClosed) {
      // 標記為休息日
      if (!result.closedDays.includes(dayType)) {
        result.closedDays.push(dayType);
      }
    } else if (periods.length === 0 && section.content.trim()) {
      result.errors.push({
        line: section.content,
        reason: '無法解析時間格式',
      });
    } else if (periods.length > 0) {
      result.success.push(...periods);
    }
  }

  return result;
}

/**
 * 將解析結果轉換為表單格式
 */
export function convertToFormFormat(
  parsedPeriods: ParsedPeriod[],
  closedDays: number[],
  existingOpeningHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[]
): { dayType: number; periods: { openTime: string; closeTime: string }[] }[] {
  // 複製現有資料
  const result = existingOpeningHours.map(day => ({
    dayType: day.dayType,
    periods: [...day.periods.map(p => ({ ...p }))],
  }));

  // 按 dayType 分組解析結果
  const groupedByDay = new Map<number, { openTime: string; closeTime: string }[]>();

  for (const period of parsedPeriods) {
    if (!groupedByDay.has(period.dayType)) {
      groupedByDay.set(period.dayType, []);
    }
    groupedByDay.get(period.dayType)!.push({
      openTime: period.openTime,
      closeTime: period.closeTime,
    });
  }

  // 更新有時段的天
  for (const [dayType, periods] of groupedByDay) {
    const dayIndex = result.findIndex(d => d.dayType === dayType);
    if (dayIndex !== -1) {
      result[dayIndex].periods = periods;
    }
  }

  // 更新休息日（清空時段）
  for (const dayType of closedDays) {
    const dayIndex = result.findIndex(d => d.dayType === dayType);
    if (dayIndex !== -1) {
      result[dayIndex].periods = [];
    }
  }

  return result;
}

/**
 * 取得已解析的星期列表
 */
export function getParsedDayTypes(parsedPeriods: ParsedPeriod[], closedDays: number[]): number[] {
  const days = new Set([
    ...parsedPeriods.map(p => p.dayType),
    ...closedDays
  ]);
  return Array.from(days).sort();
}
