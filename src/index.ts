import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getMealInfo, formatMealInfo } from "./utils.js";

const server = new McpServer({
  name: "school-meal-bot",
  version: "1.0.0",
  description: "Korean school meal information service using NEIS Open API"
});

// 급식 정보 조회 도구
server.tool(
  "get-meal-info",
  {
    atptCode: z.string().describe("시도교육청코드"),
    schulCode: z.string().describe("학교행정표준코드"),
    date: z.string().optional().describe("조회할 날짜 (YYYYMMDD 형식)")
  },
  async ({ atptCode, schulCode, date }) => {
    try {
      const meals = await getMealInfo(atptCode, schulCode, date);
      
      if (meals.length === 0) {
        return {
          content: [{ 
            type: "text", 
            text: "해당 날짜의 급식 정보가 없습니다." 
          }]
        };
      }

      const formattedMeals = meals.map(formatMealInfo).join("\n\n");
      return {
        content: [{ 
          type: "text", 
          text: formattedMeals 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: "급식 정보를 가져오는 중 오류가 발생했습니다." 
        }],
        isError: true
      };
    }
  }
);

// 도움말 프롬프트
server.prompt(
  "meal-help",
  {},
  () => ({
    messages: [{
      role: "assistant",
      content: {
        type: "text",
        text: `학교 급식 정보 조회 방법:

1. 시도교육청코드와 학교행정표준코드가 필요합니다.
2. 날짜는 YYYYMMDD 형식으로 입력해주세요. (예: 20240402)
3. 날짜를 입력하지 않으면 오늘 날짜의 급식 정보를 조회합니다.

예시:
get-meal-info 도구를 사용하여 급식 정보를 조회할 수 있습니다.`
      }
    }]
  })
);

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport); 