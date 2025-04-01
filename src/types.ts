export interface MealInfo {
  ATPT_OFCDC_SC_CODE: string;  // 시도교육청코드
  ATPT_OFCDC_SC_NM: string;    // 시도교육청명
  SD_SCHUL_CODE: string;       // 행정표준코드
  SCHUL_NM: string;            // 학교명
  MMEAL_SC_CODE: string;       // 식사코드
  MMEAL_SC_NM: string;         // 식사명
  MLSV_YMD: string;            // 급식일자
  MLSV_FGR: string;            // 급식인원수
  DDISH_NM: string;            // 요리명
  ORPLC_INFO: string;          // 원산지정보
  CAL_INFO: string;            // 칼로리정보
  NTR_INFO: string;            // 영양정보
}

export interface NeisResponse {
  mealServiceDietInfo: [{
    head: [{
      list_total_count: number;
    }];
    row: MealInfo[];
  }];
} 