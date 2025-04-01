# Korean School Meal MCP Server

This MCP (Model Context Protocol) server provides access to Korean school meal information using the NEIS Open API.

## Features

- Get meal information for any school in Korea
- Support for specific date queries
- Includes nutritional information and origin of ingredients
- Built with TypeScript and MCP SDK

## Tools

### get-meal-info

Retrieves meal information for a specific school and date.

Parameters:
- `atptCode` (string): Education office code
- `schulCode` (string): School code
- `date` (string, optional): Date in YYYYMMDD format (defaults to today)

Example response:
```
[서울고등학교 - 중식]
날짜: 20240402
메뉴: 쌀밥, 미역국, 김치
칼로리: 800kcal
영양정보: 단백질 30g, 지방 15g
원산지: 쌀(국내산), 미역(국내산)
```

## Prompts

### meal-help

Provides guidance on how to use the meal information service.

## Installation

```bash
npm install
npm run build
npm start
```

## Environment Variables

- `TRANSPORT`: Set to 'ws' for WebSocket transport (used by Smithery), defaults to STDIO

## License

MIT License

## Contributing

Issues and pull requests are welcome! 