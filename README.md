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

# Page Router

Pages 폴더 구조를 통해 page를 라우팅해줌

# 서버 사이드 렌더링

- 가장 기본적인 사전 렌더링 방식
- 요청이 들어올 때마다 사전 렌더링 진행

# ISR ( 증분 정적 재생성)

SSG 방식으로 생성된 정적페이지를 일정 시간을 기준으로 다시 정적 생성 (업데이트)

- 기존 SSG 장점: 매우 빠른 속도로 응답
- 기존 SSG 단점 개선 : 최신 데이터 반영

시간에 따라 재생성되는데 시간이 아니라 사용자의 행동에 따라 요청을 보내야 하는 경우는 on Demand ISR 방식을 적용한다

# Page Router 장점

1. 파일 시스템 기반의 간편한 페이지 라우팅 제공
2. 다양한 방식의 사전 렌더링

- SSR
  - 서버에 접속 요청을 보낼때마다 새롭게 페이지 생성
  - 항상 최신 데이터 보장, 응답속도가 느려질 수 있음
- SSG
  - 빌드 타임에 미리 정적으로 빌드
  - 빌드 완료 이후에 발생하는 접속 요청에는 빠르게 응답 가능
  - 빌드 타임 이후에는 페이지가 재생성되지 않으므로 최신 데이터 반영 x
- ISG
  - SSG + 일정 시간마다 재생성
  - on Demand 방식으로 시간마다가 아닌 사용자의 동작에 따라 즉각적으로 재생성하는 방법도 있음

# Page Router 단점

1. 페이지별 레이아우 설정이 번거롭다
2. 데이터 페칭이 컴포넌트에 집중된다
3. 불필요한 컴포넌트들도 JS 번들에 포함

- 불필요한 컴포넌트 : 상호작용하는 기능이 없어서 한번더 Hydration 할 필요없는
- FCP ~ TTI(Time to Interactive) 길이가 길어짐 -> 응답 대기 시간 길어짐
  -> Server Component : Server 측에서만 실행되는 상호작용이 없는 컴포넌트

### Server Component 등장 배경: Server Component 이전의 이야기

JS 번들 크기 커짐 -> hydration 오래 걸림 -> TTI까지 늦어짐

- 어떻게 해결?

  - 사전 렌더링 과정에서 포함될 필요없던 '상호작용이 없는 브라우저에서 hydration이 필요없는 컴포넌트' 제외하기

- 서버 컴포넌트
  - 사전렌더링 1회
- 클라이언트 컴포넌트
  - 사전렌더링 1회 + JS 번들에 묶여 hydration 과정에서 렌더링 1횐

=> 페이지의 대부분을 서버 컴포넌트로 구성할 것 권장, 클라이언트 컴포넌트는 꼭 필요한 경우에만 사용

## React Server Component 주의 사항

1. 서버 컴포넌트에서는 브라우저에서 실행될 코드가 포함되면 안된다.
   (useState,useEffect, onClick, onChange ,,)
2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.
   (사전 렌더링 시 서버에서 1회 + 브라우저에서 hydration 진행 시 렌더링 1회)
3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다. (hydration 시 서버 컴포넌트는 포함이 되지 않으므로, 브라우저에 없는 코드를 import 하게 됨)
   -> 하지만 이런 경우 NextJS는 자동으로 서버컴포넌트 -> 클라이언트 컴포넌트로 변경
   (개발 도중에 만나는 오류 방지)
4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화(문자열, Byte,,)되지 않는 Props는 전달 X

### RSC (React Server Component)

- React Server Component이 순수한 데이터
- React Server Component를 직렬화한 결과
- 함수는 직렬화가 불가능하므로 Props로 전달 X

Client Component -> JS 번들
Server Componenet -> RSC 페이로드
