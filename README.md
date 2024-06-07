# 구현과제 3. Searzh

## Deployment

[✨ not-woowacourse.te6.in/search](https://not-woowacourse.te6.in/search)

## 자신의 코드에서 강조할 부분

- 제목, 대체 제목, 저작권자 중 어디서 match가 발생하여 검색되었는지에 따라 그룹을 나누어 검색 결과를 보여주도록 했습니다.
  - RTK Query에서 그룹을 나눈(transform) 후 data로 넘길지, 아니면 그대로 data로 받은 뒤 렌더링하기 직전 그룹화할지 고민했습니다.
  - 둘 중 무엇을 택하든 클라이언트에서 일어나는 동작이라 성능상 큰 차이는 없을 것이라고 생각하지만 검색 결과를 match 필드가 아닌 다른 기준으로도 가공할 가능성이 열려 있다면 후자가 더 나을 것 같다고 생각했습니다.
- 서치 파라미터로 debounce된 검색어와 보여지고 있는 영화의 id를 관리합니다.
  - 이 부분을 직접 구현하다가 비슷한 작업을 반복하는 느낌이 들어서 [nuqs](https://github.com/47ng/nuqs)라는 라이브러리를 처음으로 써 보았는데 꽤 마음에 들었습니다. 또 쓸 것 같습니다.
- [Homebrew](https://brew.sh/) 웹사이트의 검색 막대에 있는 단축키 indicator가 커맨드 키, K 키를 누를 때마다 반응하는 게 귀여워서 따라해 봤습니다. `<ShortcutIndicator />`로 원하는 아무 곳에나 넣을 수 있습니다.
- 다크 모드 지원 됩니다.

## 자신의 코드에서 부족한 부분

- 검색어와 관련하여 실제 input value, debounce된 value, 서치 파라미터의 query 세 개의 상태(마지막 것도 상태라고 봐야겠죠)가 걸려 있는데, 더 개선해볼 수 있는 방법이 있는지 궁금합니다.
- 탭 키로는 검색 결과를 오고갈 수 있지만 위아래 방향키는 아직 구현을 못(안?) 했습니다.

## 기타 코드를 이해하는데 도움을 주는 내용

- [redux-persist](https://github.com/rt2zz/redux-persist) 마지막 업데이트가 4년 전인 거 보고 [redux-remember](https://github.com/zewish/redux-remember) 써 밨습니다.
  - 4년 전 마지막 업데이트된 것의 대체재로 들고 온 게 별 57개 달린...?

## 느낀 점

- 생각보다 다양한 문제를 마주쳐서 재밌었습니다.
  - macOS에서 meta(command) 키와 다른 키를 함께 눌렀다 뗄 때 meta 키의 keyup 이벤트는 fire되지 않습니다. (대부분의 브라우저에서 그런 것 같습니다.)
  - flex item(`display: flex`인 parent의 child)는 기본적으로 자신의 child 크기보다 작아지지 않습니다.
    - [`min-[width/height]: 0`을 두어 해결했습니다.](https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size)
- redux 자체가 어떤 점이 좋은지는 아직 잘 모르겠습니다. redux-toolkit은 좋은 것 같습니다. (특히 `createApi()`로 만든 endpoint들이 hook으로 생성된다는 점)
- 좋은 세션 열어 주셔서 많이 배워 갑니다. 감사합니다.
