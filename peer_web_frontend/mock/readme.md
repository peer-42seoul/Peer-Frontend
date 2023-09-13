## 1.bash start.sh 로 실행시키면 됩니다.

## 2.db.json 설정 예시

객체의 key값으로 리소스 경로를 설정해줄 수 있습니다.

## 3. 예시 블로그

https://poiemaweb.com/json-server

```json
{
  "message_userzero": [
    {
      "id": 1,
      "nickname": "userzero",
      "content": "예시1",
      "messageTime": [2023, 9, 6, 17, 16, 51, 131412000],
      "messageType": "SEND"
    },
    {
      "id": 2,
      "nickname": "userzero",
      "content": "예시2",
      "messageTime": [2023, 9, 6, 17, 16, 51, 144650000],
      "messageType": "SEND"
    }
  ],
  "message_list": [
    {
      "nickname": "userzero",
      "profileImage": "example.jpg"
    },
    {
      "nickname": "userone",
      "profileImage": "exampl22e.jpg"
    }
  ]
}
```
