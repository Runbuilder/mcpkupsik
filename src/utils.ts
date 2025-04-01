import fetch from 'node-fetch';
import dayjs from 'dayjs';
import type { NeisResponse, MealInfo } from './types';

export async function getMealInfo(
  atptCode: string,
  schulCode: string,
  date?: string
): Promise<MealInfo[]> {
  const targetDate = date || dayjs().format('YYYYMMDD');
  
  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${atptCode}&sd_schul_code=${schulCode}&mlsv_ymd=${targetDate}`;
  
  const response = await fetch(url);
  const data = await response.json() as NeisResponse;
  
  if (!data.mealServiceDietInfo) {
    return [];
  }
  
  return data.mealServiceDietInfo[0].row;
}

export function formatMealInfo(meal: MealInfo): string {
  return `
[${meal.SCHUL_NM} - ${meal.MMEAL_SC_NM}]
날짜: ${meal.MLSV_YMD}
메뉴: ${meal.DDISH_NM}
칼로리: ${meal.CAL_INFO}
영양정보: ${meal.NTR_INFO}
원산지: ${meal.ORPLC_INFO}
`.trim();
} 