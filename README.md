# 구현과제 3. Searzh

> 이 과제는 [구글 검색](https://www.google.com)을 모티브로 제작되었습니다.

## 유의사항

**읽기 좋은 코드**에 집중해주세요.

- 기능의 정상 동작 여부
- 작성하는 코드의 퀄리티
- Git 관리 수준
- PR, 코드 리뷰 방식

최소 기능 구현만 만족하면 **자유롭게 커스텀**이 가능합니다.

- 디자인 커스텀 가능 (@shadcn/ui 안 써도 됨)
- 폴더 구조 커스텀 가능
- 코드 컨벤션 커스텀 가능
- 의존성 설치 및 삭제 가능

**README 작성**은 필수입니다.

- 자신의 코드에서 강조할 부분
- 자신의 코드에서 부족한 부분
- 기타 코드를 이해하는데 도움을 주는 내용

Fork & PR 등 과제 진행과 관련된 내용은,  
 [우테코 따라잡기 노션 - 구현과제 진행 관련 유의사항](https://yopark.notion.site/08c99780759944118452d77b6927775a) 문서를 참고해주세요.

배포 이후 **배포 주소**를 말씀해주시면 해당 주소를 CORS에 추가하도록 하겠습니다.

## API

API 주소 : https://not-woowacourse-api.yopark.dev

자세한 내용은 [Swagger](https://not-woowacourse-api.yopark.dev/api-docs)를 참고해주세요.

이번 과제에서 사용할 API는 **0.x(공통), 3.x(Searzh)** 입니다.

> 이걸 만든 사람은 백엔드 개발자가 아닙니다. 사용해보시고 오류나 빈틈이 있으면 채널톡 부탁드립니다 😭

## 구현해야 할 기능

> Searzh 시연 링크 : https://not-woowacourse-3-searzh-frontend-for-example.vercel.app  
> Searzh 시연 레포 : https://github.com/yoopark/not-woowacourse-3-searzh-frontend-for-example

**영화 검색** 기능을 제작해야 합니다.

검색 바

- 검색 내용이 변경될 때마다 검색 내용이 포함된 _검색 키워드_ 목록을 서버로부터 받아 보여줘야 합니다.
- 특정 검색 키워드를 클릭하면 상세 페이지로 이동해야 합니다.
- 아무 것도 입력하지 않았을 때에는 _최근 검색어_ 목록을 보여줘야 합니다.
- 특정 최근 검색어를 삭제할 수 있어야 합니다.
- 검색 키워드 목록에 최근 검색어가 포함되어 있는 경우 상단에 모아서 보여주어야 합니다.

상세 페이지

- 유저 접속 시 해당 키워드를 최근 검색어에 추가합니다.
- 최근 검색어 정보는 서버로 보내지 않고 로컬 스토리지에 저장하는 방식으로 관리합니다.

> Searzh 데이터의 가공 과정이 궁금하다면, [3-searzh-data](https://github.com/not-woowacourse/3-searzh-data) 레포지토리를 참고해주세요 👍

## 기술 스택 관련 제한사항

- Redux, RTK Query, Redux-Persist를 충실히 사용해주세요.
- Redux를 제외한 전역 상태관리 라이브러리를 사용하지 말아주세요.
- React Query를 사용하지 말아주세요.
- @shadcn/ui의 [Command 컴포넌트](https://ui.shadcn.com/docs/components/command)를 사용하셔도 무방합니다.
