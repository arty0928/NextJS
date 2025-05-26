# NextJS

💡Let's study about NextJS

### 사전 렌더링

브라우저의 요청에 사전에 렌더링이 완료된 HTML을 응답하는 렌더링 방식
Client Side Rendering의 단점을 보완

#### CSR

클라이언트인 웹 브라우저에서 직접 화면을 렌더링하는 방식

- 페이지 이동이 매우 빠르고 쾌적하다 <br>
  (초기에 모든 컴포넌트를 다 가져오므로)

- 초기 접속 속도가 느리다<br>
  (FCP : First Contentful Paint 초기 접속 속도) 가 느림

#### 사전 렌더링 등장

리액트의 CSR 방식을 보완

- JS 실행(실행) : JS코드를 html 코드로 변경
  <br>
- 화면에 렌더링 : html 코드를 브라우저가 화면에 그려내는 작업

빠른 FCP 달성(React 단점 해소) + 빠른 페이지 이동 (React 장점 승계)
