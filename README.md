# 지오로케이터 (GeoLocator)

위치와 관련된 Small Project, Utility를 모아 놓은 저장소입니다. 주소/좌표 변환, 지도 표시 등의 기능을 제공합니다.

## 기능

- 주소/좌표로 위치 확인
- 좌표 변환 및 표시
- 카카오맵 연동을 통한 지도 표시
- JSON 데이터 변환 기능

## 기술 스택

- Vue 3
- TypeScript
- Vuex 4
- Bootstrap 3.3.7
- 카카오맵 API

## 설치 및 실행

### 개발 환경 설정

```shell
# 종속성 설치
yarn install

# 개발 서버 실행
yarn serve
```

개발 서버는 기본적으로 http://localhost:8080 에서 실행됩니다.

### 빌드

```shell
# 프로덕션용 빌드
yarn build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

### 브라우저 호환성 업데이트

```shell
npx browserslist@latest --update-db
```

## URL 파라미터

애플리케이션은 URL 파라미터를 통해 초기 좌표를 설정할 수 있습니다:
```
?x=127.1234&y=37.5678
```

## 라이선스

이 프로젝트는 LICENSE 파일에 명시된 라이선스 조건에 따라 배포됩니다.