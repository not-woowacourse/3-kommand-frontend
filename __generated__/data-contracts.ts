/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateTodoDto {
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
}

export interface CreateTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface ReadTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface UpdateTodoDto {
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title?: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone?: boolean;
}

export interface UpdateTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface CreateClientDto {
  /**
   * 클라이언트 이름
   * @example "Yongjun Park"
   */
  name: string;
}

export interface CreateClientResponseDto {
  /**
   * 클라이언트 ID
   * @example 1
   */
  id: number;
  /**
   * 클라이언트 이름
   * @example "Yongjun Park"
   */
  name: string;
}

export interface QuestionParam {
  /**
   * 질문 키
   * @example "childhoodDream"
   */
  key: string;
  /**
   * 질문 타입 (text, integer, double, boolean, email, tel, url, color, date, datetime, json)
   * @example "text"
   */
  type?: string;
  /**
   * 질문 타입의 배열 여부
   * @example false
   */
  isArray?: boolean;
  /**
   * 질문 선택 여부
   * @example false
   */
  isOptional?: boolean;
}

export interface CreateSchemaDto {
  /**
   * 스키마 슬러그
   * @example "umore-2024"
   */
  slug: string;
  /**
   * 질문 목록
   * @example [{"key":"age","type":"integer"},{"key":"gender"},{"key":"mbti"},{"key":"childhoodDream"},{"key":"mostImportantValue","isArray":true},{"key":"lifeSatisfaction","type":"integer"},{"key":"email","type":"email","isOptional":true}]
   */
  questions: QuestionParam;
}

export interface CreateSchemaResponseDto {
  /**
   * 스키마 ID
   * @example 1
   */
  id: number;
  /**
   * 스키마 슬러그
   * @example "umore-2024"
   */
  slug: string;
}

export interface Question {
  /**
   * 질문 ID
   * @example 1
   */
  id: number;
  /**
   * 질문 키
   * @example "childhoodDream"
   */
  key: string;
  /**
   * 질문 타입 (text, integer, double, boolean, email, tel, url, color, date, datetime, json)
   * @example "text"
   */
  type?: string;
  /**
   * 질문 타입의 배열 여부
   * @example false
   */
  isArray?: boolean;
  /**
   * 질문 선택 여부
   * @example false
   */
  isOptional?: boolean;
}

export interface ReadSchemaResponseDto {
  /**
   * 스키마 ID
   * @example 1
   */
  id: number;
  /**
   * 스키마 슬러그
   * @example "umore-2024"
   */
  slug: string;
  questions: Question[];
}

export interface CreateFormDto {
  /**
   * 폼 데이터
   * @example {"age":23,"gender":"male","mbti":"ISTJ","childhoodDream":"유튜버","mostImportantValue":["family","etc"],"lifeSatisfaction":6,"email":"yopark.dev@naver.com"}
   */
  data: object;
}

export interface CreateFormResponseDto {
  /**
   * 폼 ID
   * @example 1
   */
  id: number;
  /**
   * 폼 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
}

export interface AnswerWithQuestion {
  /**
   * 답변 ID
   * @example 1
   */
  id: number;
  /**
   * 답변 값 (문자열)
   * @example "Yongjun Park"
   */
  stringValue?: string;
  /**
   * 답변 값 (정수)
   * @example 123
   */
  integerValue?: number;
  /**
   * 답변 값 (실수)
   * @example 123.45
   */
  doubleValue?: number;
  /**
   * 답변 값 (불리언)
   * @example true
   */
  booleanValue?: boolean;
  /**
   * 답변 값 (날짜)
   * @format date-time
   * @example "2021-07-01"
   */
  dateValue?: string;
  question: Question;
}

export interface ReadFormResponseDto {
  /**
   * 폼 ID
   * @example 1
   */
  id: number;
  /**
   * 폼 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  answers: AnswerWithQuestion[];
}

export interface BatchDeleteFormDto {
  /**
   * 삭제할 폼 ID 배열
   * @example [1,2,3]
   */
  ids: number[];
}

export interface MatchedFields {
  /**
   * title 매칭 여부
   * @example false
   */
  title: boolean;
  /** alternativeTitle 매칭 여부 */
  alternativeTitle: boolean;
  /** rights 매칭 여부 */
  rights: boolean;
}

export interface SearchMovieResponseDto {
  /**
   * 영화 ID
   * @example 1
   */
  id: number;
  /**
   * 영화 제목
   * @example "기생충"
   */
  title: string;
  /**
   * 대체 제목
   * @example "PARASITE"
   */
  alternativeTitle?: string;
  /**
   * UCI 코드
   * @example "G706+KOBIS04-MV.list.0020183782"
   */
  uci: string;
  /**
   * 상세 정보 URL
   * @example "http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovieList.do?sMovName=기생충&dtTp=movie&dtCd=20183782"
   */
  url: string;
  /**
   * 생성 년도
   * @example 2019
   */
  year?: number;
  /**
   * 제작 지역
   * @example "한국,미국"
   */
  region?: string;
  /**
   * 카테고리
   * @example "드라마,코미디"
   */
  category?: string;
  /**
   * 권리 주체
   * @example "봉준호"
   */
  rights?: string;
  matchedFields: MatchedFields;
}

export interface ReadMovieResponseDto {
  /**
   * 영화 ID
   * @example 1
   */
  id: number;
  /**
   * 영화 제목
   * @example "기생충"
   */
  title: string;
  /**
   * 대체 제목
   * @example "PARASITE"
   */
  alternativeTitle?: string;
  /**
   * UCI 코드
   * @example "G706+KOBIS04-MV.list.0020183782"
   */
  uci: string;
  /**
   * 상세 정보 URL
   * @example "http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovieList.do?sMovName=기생충&dtTp=movie&dtCd=20183782"
   */
  url: string;
  /**
   * 생성 년도
   * @example 2019
   */
  year?: number;
  /**
   * 제작 지역
   * @example "한국,미국"
   */
  region?: string;
  /**
   * 카테고리
   * @example "드라마,코미디"
   */
  category?: string;
  /**
   * 권리 주체
   * @example "봉준호"
   */
  rights?: string;
}

export type AppControllerGetHelloData = any;

export type TodosControllerCreateData = CreateTodoResponseDto;

export type TodosControllerFindAllData = ReadTodoResponseDto[];

export type TodosControllerFindOneData = ReadTodoResponseDto;

export type TodosControllerUpdateData = UpdateTodoResponseDto;

export type TodosControllerRemoveData = any;

export type ClientsControllerCreateData = CreateClientResponseDto;

export type SchemasControllerCreateData = CreateSchemaResponseDto;

export type SchemasControllerFindOneData = ReadSchemaResponseDto;

export type FormsControllerCreateData = CreateFormResponseDto;

export type FormsControllerFindAllData = ReadFormResponseDto[];

export type FormsControllerFindOneByIdData = ReadFormResponseDto;

export type FormsControllerRemoveData = any;

export type FormsControllerBatchRemoveData = any;

export interface MoviesControllerSearchParams {
  /** 검색어 */
  query: string;
  /** 검색 개수 제한 (기본값 10개) */
  limit?: number;
}

export type MoviesControllerSearchData = SearchMovieResponseDto[];

export type MoviesControllerFindOneData = ReadMovieResponseDto;
