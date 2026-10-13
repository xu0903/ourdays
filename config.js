/* =====================================================================
   客製化設定檔：每位客人只需要改這個檔案。index.html 不用動。
   - 日期格式一律 YYYY-MM-DD
   - 照片放在 photos/ 資料夾，album 項目填 photo: "photos/01.jpg"
     沒填 photo 的項目會顯示內建插畫（scene：cafe | sunset | mountain | cake | movie | snow）
   - 改完請執行：python scripts/check.py
   ===================================================================== */
window.CONFIG = {
  title: "我們的日子",                  // 瀏覽器分頁與 iPhone 主畫面名稱；要改的話，manifest.json 的 name 也一起改（安卓用）
  couple: { a: "小晴", b: "阿哲" },
  startDate: "2023-02-14",             // 在一起的第 1 天
  heroNote: "從第一天到現在，謝謝你一直都在。",
  theme: "#E26D5C",                    // 主色（#RRGGBB），按鈕、愛心、寵物圍巾都會跟著變
  bg: "#FBF4EC",                       // 背景色（淺色）。客人也可以在網頁的「設定」裡換 7 種主題或自訂
  couplePhoto: "photos/couple.jpg",    // 首頁大頭貼（正方形）。App 圖示用 scripts/photo_tool.py icons 產生
  albumFrame: "polaroid",              // 相簿預設相框：plain 簡約 | polaroid 拍立得 | washi 和紙膠帶 | film 底片 | cream 奶油
                                       //   stamp 郵票 | magazine 雜誌 | booth 人生四格 | arch 拱窗 | gingham 格紋 | datestamp 日期印
  showCredit: true,                    // 交付給客人時改成 false
  creditText: "示範版・晨利數位工作室",
  demoControls: true,                  // 示範用控制列；交付時改成 false

  // animal: "shiba" | "cat" | "bunny"
  pet: { name: "麻糬", animal: "shiba" },
  petLines: [
    "今天也要一起好好吃飯喔。",
    "你們兩個在一起的樣子，我最喜歡了。",
    "我會一直在這裡等你們。",
    "摸摸我，我會開心一整天。",
    "你們今天有互相說謝謝嗎？"
  ],

  // type: birthday | anniversary | other；repeat: yearly | once
  dates: [
    { label: "小晴的生日", date: "1999-07-21", type: "birthday",    repeat: "yearly" },
    { label: "阿哲的生日", date: "1998-11-03", type: "birthday",    repeat: "yearly" },
    { label: "在一起紀念日", date: "2023-02-14", type: "anniversary", repeat: "yearly" },
    { label: "第一次一起旅行", date: "2023-08-12", type: "other",     repeat: "once" }
  ],

  // 生日信：unlockDate 當天（含）之後才能打開；之前首頁只顯示鎖著的信封與倒數。
  // 內容換行用 \n。注意：這是驚喜設計不是加密，懂網頁的人仍可從 config.js 讀到內容。
  letters: [
    { to: "小晴", from: "阿哲", title: "給小晴的生日信", unlockDate: "2027-07-21",
      text: "生日快樂。\n\n這封信寫好的時候，離你生日還有好久，我一直很想提前告訴你。\n謝謝你願意跟我一起過每一個普通的日子。\n\n今年也請多指教。" }
  ],

  // 雲端相簿（雙方同步）：交付時用 python scripts/cloud_admin.py create --config 這個檔案 自動填入
  // 示範用 { demo: true }：不連網，配對碼 DEMO-1314，修改只留在畫面上
  cloud: { demo: true },

  album: [
    { date: "2023-02-14", title: "第一次約會", text: "那天風很大，你一直在整理頭髮，我一直在偷看你。", photo: "photos/01.jpg" },
    { date: "2023-02-14", title: "換我擺姿勢", text: "你說輪到我了，結果我只會靠著欄杆比讚。", photo: "photos/02.jpg" },
    { date: "2023-04-02", title: "點太多的晚餐", text: "兩個人點了四道菜，最後打包了一半回家。", photo: "photos/03.jpg" },
    { date: "2023-06-18", title: "那朵雲像小狗", text: "你指著天空說像小狗，我看了很久，只看到你。", photo: "photos/04.jpg" },
    { date: "2023-06-18", title: "一起等夕陽", text: "太陽下山前，我們都沒有說話，但一點也不尷尬。", photo: "photos/05.jpg" },
    { date: "2023-11-03", title: "愛心鏡子", text: "你說這面鏡子一定要拍，結果我們拍了三十張。", photo: "photos/06.jpg" },
    { date: "2024-01-20", title: "巨大的朋友", text: "它比想像中大好多，你笑到手機都拿不穩。", photo: "photos/07.jpg" },
    { date: "2024-05-11", title: "週末的咖啡廳", text: "你看雜誌，我看你。", photo: "photos/08.jpg" },
    { date: "2024-08-24", title: "一起追夕陽", text: "你說下次要來看日出，我記下來了。", photo: "photos/09.jpg" },
    { date: "2024-12-25", title: "散步到很晚", text: "路燈亮起來的時候，才發現已經走了好遠。", photo: "photos/10.jpg" }
  ],

  // answer 是正確選項的索引，從 0 開始
  quiz: [
    { q: "我們第一次約會去的是哪裡？", options: ["電影院", "咖啡店", "夜市"], answer: 1 },
    { q: "誰比較常忘記帶鑰匙？", options: ["小晴", "阿哲", "兩個都會"], answer: 2 },
    { q: "一起看的第一部電影是？", options: ["跨年那一場", "下雨那天那一場", "忘記了"], answer: 0 },
    { q: "我最喜歡你的哪個小動作？", options: ["皺鼻子笑", "偷偷牽手", "睡前說晚安"], answer: 0 }
  ],
  quizResult: [
    { min: 0, text: "沒關係，答案之後慢慢告訴你。" },
    { min: 2, text: "還不錯，看來有好好記得。" },
    { min: 4, text: "全部答對！你們太了解彼此了。" }
  ]
};
