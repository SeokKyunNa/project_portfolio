import pymysql
from werkzeug.security import generate_password_hash

conn = pymysql.connect(host='localhost', user='root', password='root', db='elice_portfolio', charset='utf8')

cursor = conn.cursor()

sql = "INSERT INTO edu_status (code, status) VALUES (%s, %s)"

# edu_status
cursor.execute(sql, (1, "재학중"))
cursor.execute(sql, (2, "고등학교졸업"))
cursor.execute(sql, (3, "학사졸업"))
cursor.execute(sql, (4, "석사졸업"))
cursor.execute(sql, (5, "박사졸업"))

# users
password = generate_password_hash("qwerasdf")
sql = "INSERT INTO users (id, password, name) values (%s, %s, %s)"
cursor.execute(sql, ("engsk1211@gmail.com", password, "나석균"))

# profiles
sql = "INSERT INTO profiles (id, user_id, image, introduction) VALUES (%s, %s, %s, %s)"
cursor.execute(sql, (1, "engsk1211@gmail.com", "img/default.png", "안녕하세요. 잘 부탁드립니다."))

# awards
sql = "INSERT INTO awards (id, user_id, award, details) VALUES (%s, %s, %s, %s)"
cursor.execute(sql, (1, "engsk1211@gmail.com", "밥상", "잘 먹었습니다."))

# certificates
sql = "INSERT INTO certificates (id, user_id, name, issued_by, acquisition_date) VALUES (%s, %s, %s, %s, %s)"
cursor.execute(sql, (1, "engsk1211@gmail.com", "정보처리기사", "한국산업인력공단", "2021-01-01"))

# educations
sql = "INSERT INTO educations (id, user_id, name, major, edu_status) VALUES (%s, %s, %s, %s, %s)"
cursor.execute(sql, (1, "engsk1211@gmail.com", "엘리스대학교", "컴퓨터공학과", 3))

# projects
sql = "INSERT INTO projects (id, user_id, title, content, start_date, end_date) VALUES (%s, %s, %s, %s, %s, %s)"
cursor.execute(sql, (1, "engsk1211@gmail.com", "엘리스 웹 프로젝트", "flask, react를 활용한 웹 프로젝트", "2021-08-16", "2021-08-27"))

conn.commit()
conn.close()
