

-- 회원 정보 --
CREATE TABLE IF NOT EXISTS `USERS`(
    `ID`          VARCHAR(20),              -- 회원 ID
    `PASSWORD`    VARCHAR(255) NOT NULL,    -- Password
    `NAME`        VARCHAR(20) NOT NULL,     -- 회원 이름
    PRIMARY KEY(`ID`)
);

-- 프로필 --
CREATE TABLE IF NOT EXISTS `PROFILES`(
    `ID`              INT AUTO_INCREMENT,       -- 프로필 ID
    `USER_ID`         VARCHAR(20) NOT NULL,     -- 회원 ID (USERS.ID 외래키)
    `IMAGE`           VARCHAR(255),             -- 프로필 사진
    `INTRODUCTION`   VARCHAR(255),             -- 한 줄 소개
    `EDU_NAME`        VARCHAR(255),             -- 학교 이름
    `MAJOR`           VARCHAR(100),             -- 전공
    `EDU_STATUS`      VARCHAR(2),              -- 재학 상태
    PRIMARY KEY(`ID`),
    FOREIGN KEY(USER_ID) REFERENCES USERS(`ID`) ON DELETE CASCADE
);

-- 수상 내역 --
CREATE TABLE IF NOT EXISTS `AWARDS`(
    `ID`          INT AUTO_INCREMENT,       -- 수상 내역 ID
    `USER_ID`     VARCHAR(20) NOT NULL,     -- 회원 ID (USERS.ID 외래키)
    `AWARD`       VARCHAR(255),             -- 수상 내역
    `DETAILS`     TEXT,                     -- 수상 상세 내역
    PRIMARY KEY(`ID`),
    FOREIGN KEY(`USER_ID`) REFERENCES USERS(`ID`) ON DELETE CASCADE
);

-- 프로젝트 --
CREATE TABLE IF NOT EXISTS `PROJECTS`(
    `ID`          INT AUTO_INCREMENT,       -- 포트폴리오 ID
    `USER_ID`     VARCHAR(20) NOT NULL,     -- 회원 ID (USERS.ID 외래키)
    `TITLE`       VARCHAR(255),             -- 제목
    `CONTENT`     TEXT,                     -- 내용
    `START_DATE`  DATE,                     -- 시작 일
    `END_DATE`    DATE,                     -- 종료 일
    PRIMARY KEY(`ID`),
    FOREIGN KEY(`USER_ID`) REFERENCES USERS(`ID`) ON DELETE CASCADE
);

-- 자격증 --
CREATE TABLE IF NOT EXISTS `CERTIFICATES`(
    `ID`          INT AUTO_INCREMENT,       -- 자격증 ID
    `USER_ID`     VARCHAR(20) NOT NULL,     -- 회원 ID (USERS.ID 외래키)
    `NAME`        VARCHAR(255),             -- 자격증 이름
    `ISSUED_BY`   VARCHAR(255),             -- 발급처
    PRIMARY KEY(`ID`),
    FOREIGN KEY(`USER_ID`) REFERENCES USERS(`ID`) ON DELETE CASCADE
);