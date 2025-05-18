
# [프로젝트 이름]

## 프로젝트 소개

이 프로젝트는 React로 개발된 웹 애플리케이션이며, Docker를 이용하여 빌드 및 배포가 가능하도록 구성되어 있습니다.

## 필수 요구사항

이 프로젝트를 실행하기 위해서는 다음 소프트웨어가 시스템에 설치되어 있어야 합니다.

*   **Git**: 소스 코드를 클론하기 위해 필요합니다.
*   **Docker**: Docker 이미지를 빌드하고 컨테이너를 실행하기 위해 필요합니다. (Docker 설치 시 Node.js 환경이 함께 준비됩니다.)

### 1. 리포지토리 클론

먼저 Git 명령어를 사용하여 이 프로젝트 리포지토리를 클론합니다.

```bash
git clone https://github.com/turtleneck-saver/Frontend.git
cd Frontend
```

### 2. Docker 이미지 빌드

프로젝트 루트 디렉터리 (`Dockerfile`이 있는 곳)에서 다음 명령어를 실행하여 Docker 이미지를 빌드합니다.

```bash
docker build -t Frontend .
```

### 3. Docker 컨테이너 실행

이미지 빌드가 완료되면, 다음 명령어를 사용하여 Docker 컨테이너를 실행합니다.

```bash
docker run -d \
  --name Frontend \
  -v ${PWD}:/app \
  Frontend
```


### 4. 애플리케이션 접속

vscode에서 도커 컨테이너 설치 후 컨테이너 버튼을 누르면 도커 이미지들이 나옵니다. 이후 attach vscoed 누르시면 됩니다.
