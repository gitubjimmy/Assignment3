# Waffle17.5_TestServer

WaffleStudio17.5 Rookies Final Assignment Test Server

> 와플 스튜디오 Rookies 마지막 과제를 위한 TestServer입니다
> 테스트 서버는 Express.js. Postgresql, Typeorm을 이용하여 구현되어 .

## 로컬 환경에 서버 구축하기

**1. 적절한 위치에 위 저장소를 git clone 해줍니다.**

```shell
git clone https://github.com/sckimynwa/Waffle17.5_TestServer.git
```

**2. 프로젝트에 필요한 모듈을 설치합니다. 루트폴더 `/Waffle17.5_TestServer` 에서 실행해주세요**

```shell
> npm install
```

**3. postgresql을 설치합니다.**

- Ubuntu(Linux)
  - [Install postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04) 참고
- Mac terminal
  ```shell
  > brew install postgresql
  > postgres --version # version이 출력되면 설치 정상 완료된 것.
  ```
- 다운받을 때에 username과 port를 잘 유의하여 지정해주시기 바랍니다.
- port의 경우 기본 속성은 `5432`번을 사용합니다.

**4. database를 생성해 줍니다.**

- backend 서버가 데이터를 저장할 database를 만들어 봅시다.
- postgresql이 정상적으로 설치된 상태에서 터미널에 psql를 치면 '#'로 시작하는 콘솔창이 열립니다. 이 콘솔창 위에 CREATE DATABASE waffle이라고 입력해 줍니다.
- 로컬에 생성된 후에 '#'로 시작하는 콘솔창이 유지된 상태에서 \list를 입력하면 생성된 모든 데이터베이스의 목록을 확인할 수 있습니다.
- \q를 입력하면 psql의 콘솔창을 종료하게 됩니다.

```shell
> psql
CREATE DATABASE waffle;   # can be anything, but waffle recommended
\list                     # printing database list
\q                        # exit psql console
```

**5. express server와 postgresql을 연결해줍니다.**

- clone받은 경로로 들어가 ormconfig.json파일을 찾고, 3에서 설정해준 `port`와 `username`, `password`, `database`를 입력합니다.

```json
// /ormconfig.json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your user name",
  "password": "your password",
  "database": "waffle",
  "entities": ["src/entity/*.js"],
  "logging": true,
  "synchronize": true
}
```

**6. 모든 설정이 끝났습니다.**

- 이제 다시 Waffle17.5_TestServer 디렉토리로 돌아가서 콘솔창에 `tsc`를 입력해줍니다. (typescript파일을 javascript로 컴파일해주는 명령어)
- 그 후 콘솔창에 `node src/app.js`를 입력해 줍니다.
- 데이터 베이스의 기본 쿼리들 `SELECT * FROM ....` 이 나오면 성공한 것입니다.

```shell
# in Waffle17.5_TestServer
> tsc
> node src/app.js
...
```

> https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md 참고
> Insomnia, Postman등의 서비스를 통해 localhost:3000/users등의 주소로 get이나 post명령을 요청하게 되면 정상적인 응답이 되돌아 올 것입니다.

## REST API Specification

| URL        | method   | request                           | response     | description            |
| ---------- | -------- | --------------------------------- | ------------ | ---------------------- |
| /users     | `GET`    | .                                 | list of user | Get list of users      |
| /users     | `POST`   | `{ name: String, major: String }` | user         | Add user               |
| /users/:id | `GET`    | .                                 | user         | Get user by id         |
| /users/:id | `PUT`    | `{ name: String, major: String }` | user         | Edit user info by id   |
| /users/:id | `DELETE` | .                                 | `{ ..., "affected": 1 }`            | Delete user info by id |
> HttpError code는 convention과 같습니다.
