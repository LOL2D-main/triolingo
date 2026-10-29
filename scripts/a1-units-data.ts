import type { SeedUnit } from "./a1-curriculum";
import {
  makeBuild,
  makeChoice,
  makeFillLetters,
  makeListenType,
  makeRealWord,
  makeTypeMissing,
  packChallenges,
} from "./a1-curriculum";
import { b1UnitsData } from "./curriculum-b1";
import { b2UnitsData } from "./curriculum-b2";
import { c1UnitsData } from "./curriculum-c1";
import { c2UnitsData } from "./curriculum-c2";

const baseUnitsData: SeedUnit[] = [
  // =========================================================================
  // CHƯƠNG 1: GIAO TIẾP & CHÀO HỎI CĂN BẢN
  // =========================================================================
  {
    title: "Chương 1: Chào hỏi, Bản thân & Làm quen",
    description: "Học cách chào hỏi, giới thiệu tên tuổi, quốc tịch và làm quen bạn bè mới.",
    order: 1,
    lessons: [
      {
        title: "Bài 1: Lời chào & Tạm biệt cơ bản",
        order: 1,
        vocab: [
          { en: "Hello", vi: "Xin chào", example: { en: "Hello! Nice to meet you.", vi: "Xin chào! Rất vui được gặp bạn." }, image: "/mascot.svg" },
          { en: "Good morning", vi: "Chào buổi sáng", example: { en: "Good morning, teacher!", vi: "Chào buổi sáng cô giáo!" }, image: "/girl.svg" },
          { en: "Good afternoon", vi: "Chào buổi chiều", example: { en: "Good afternoon, my friends.", vi: "Chào buổi chiều các bạn tôi." }, image: "/boy.svg" },
          { en: "Goodbye", vi: "Tạm biệt", example: { en: "Goodbye, see you tomorrow!", vi: "Tạm biệt, hẹn gặp lại ngày mai!" }, image: "/man.svg" },
          { en: "Please", vi: "Làm ơn / Xin vui lòng", example: { en: "Help me, please.", vi: "Làm ơn hãy giúp tôi." }, image: "/woman.svg" },
          { en: "Thank you", vi: "Cảm ơn bạn", example: { en: "Thank you very much!", vi: "Cảm ơn bạn rất nhiều!" }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Dịch câu: 'Xin chào, tôi là học viên mới.'", "Hello, I am a new student.", "Hello, I am a new student.", "Goodbye, I am a teacher.", "Good night, my friend.", undefined, { speaker: "mascot", meaning: "Xin chào, tôi là học viên mới." }),
          makeListenType("Good morning, have a nice day.", "Chào buổi sáng, chúc một ngày tốt lành.", "girl"),
          makeRealWord("thinking", true, "Từ có nghĩa: suy nghĩ"),
          makeRealWord("watel", false, "Từ giả trong đề DET (từ thật là water)"),
          makeFillLetters("I want to say thank ", "y", "ou", " for your help.", "Cảm ơn bạn vì đã giúp đỡ.", "boy"),
          makeBuild("Tạm biệt, hẹn gặp lại bạn.", "Goodbye see you again", ["Goodbye", "see", "you", "again", "hello", "thanks"], "man"),
          makeChoice("Khi ai đó giúp bạn, bạn sẽ nói gì?", "Thank you very much!", "Thank you very much!", "Goodbye forever!", "Good night!", undefined, { speaker: "woman", meaning: "Cảm ơn bạn rất nhiều!" }),
          makeTypeMissing("Please _____ the door for me.", "open", "Làm ơn mở cửa giúp tôi.", "robot"),
          makeListenType("Nice to meet you here.", "Rất vui được gặp bạn ở đây.", "zombie"),
          makeRealWord("bookstore", true, "Từ có nghĩa: hiệu sách"),
          makeRealWord("letress", false, "Từ giả trong đề DET (bắt chước waitress/letter)"),
          makeFillLetters("Good ", "morn", "ing", ", how are you today?", "Chào buổi sáng, hôm nay bạn thế nào?", "girl")
        ),
      },
      {
        title: "Bài 2: Tên gọi, Quốc gia & Nơi xuất thân",
        order: 2,
        vocab: [
          { en: "Name", vi: "Tên gọi", example: { en: "My name is John.", vi: "Tên tôi là John." }, image: "/boy.svg" },
          { en: "From", vi: "Đến từ", example: { en: "Where are you from?", vi: "Bạn đến từ đâu?" }, image: "/man.svg" },
          { en: "Country", vi: "Đất nước / Quốc gia", example: { en: "Vietnam is a beautiful country.", vi: "Việt Nam là một đất nước tươi đẹp." }, image: "/mascot.svg" },
          { en: "Vietnam", vi: "Việt Nam", example: { en: "I live in Vietnam.", vi: "Tôi sống ở Việt Nam." }, image: "/girl.svg" },
          { en: "English", vi: "Tiếng Anh / Người Anh", example: { en: "I learn English every day.", vi: "Tôi học tiếng Anh mỗi ngày." }, image: "/robot.svg" },
          { en: "City", vi: "Thành phố", example: { en: "Hanoi is a big city.", vi: "Hà Nội là một thành phố lớn." }, image: "/woman.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Dịch câu: 'What is your name?'", "What is your name?", "Bạn tên là gì?", "Bạn bao nhiêu tuổi?", "Bạn sống ở đâu?", undefined, { speaker: "boy", meaning: "Bạn tên là gì?" }),
          makeListenType("Where do you come from?", "Bạn đến từ nơi nào?", "man"),
          makeRealWord("answered", true, "Từ có nghĩa: đã trả lời"),
          makeRealWord("anshing", false, "Từ giả trong đề thi DET"),
          makeFillLetters("I come from Viet", "n", "am", " and I love my country.", "Tôi đến từ Việt Nam và yêu đất nước mình.", "girl"),
          makeBuild("Tên của tôi là Alex.", "My name is Alex", ["My", "name", "is", "Alex", "your", "are"], "boy"),
          makeTypeMissing("I am _____ Vietnam.", "from", "Tôi đến từ Việt Nam.", "woman"),
          makeChoice("Chọn từ điền vào chỗ trống: 'She lives in a large _____.'", "She lives in a large city.", "city", "water", "name", undefined, { speaker: "robot", meaning: "Cô ấy sống ở một thành phố lớn." }),
          makeListenType("I am learning English online.", "Tôi đang học tiếng Anh trực tuyến.", "mascot"),
          makeRealWord("fourteen", true, "Từ có nghĩa: số 14"),
          makeRealWord("thesed", false, "Từ giả trong đề thi DET"),
          makeBuild("Bạn đến từ đâu?", "Where are you from", ["Where", "are", "you", "from", "what", "is"], "zombie")
        ),
      },
      {
        title: "Bài 3: Số đếm căn bản & Tuổi tác",
        order: 3,
        vocab: [
          { en: "Number", vi: "Con số / Số đếm", example: { en: "What is your lucky number?", vi: "Con số may mắn của bạn là gì?" }, image: "/mascot.svg" },
          { en: "One", vi: "Số 1", example: { en: "I have one brother.", vi: "Tôi có một người anh trai." }, image: "/boy.svg" },
          { en: "Ten", vi: "Số 10", example: { en: "Count from one to ten.", vi: "Đếm từ một đến mười." }, image: "/girl.svg" },
          { en: "Twenty", vi: "Số 20", example: { en: "He is twenty years old.", vi: "Anh ấy hai mươi tuổi." }, image: "/man.svg" },
          { en: "Years old", vi: "Tuổi", example: { en: "I am eighteen years old.", vi: "Tôi mười tám tuổi." }, image: "/woman.svg" },
          { en: "Birthday", vi: "Ngày sinh nhật", example: { en: "Happy birthday to you!", vi: "Chúc mừng sinh nhật bạn!" }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Phép tính: 'Five plus seven equals _____.'", "Five plus seven equals twelve.", "twelve", "fifteen", "twenty", undefined, { speaker: "robot", meaning: "5 cộng 7 bằng 12." }),
          makeListenType("I am twenty years old.", "Tôi hai mươi tuổi.", "woman"),
          makeRealWord("birthday", true, "Từ có nghĩa: ngày sinh nhật"),
          makeRealWord("watteen", false, "Từ giả trong đề thi DET"),
          makeFillLetters("Today is my eighte", "en", "th", " birthday party.", "Hôm nay là sinh nhật thứ 18 của tôi.", "girl"),
          makeBuild("Tôi có hai người bạn tốt.", "I have two good friends", ["I", "have", "two", "good", "friends", "one", "three"], "boy"),
          makeTypeMissing("How _____ are you? - I am ten.", "old", "Bạn bao nhiêu tuổi? - Tôi 10 tuổi.", "man"),
          makeChoice("Từ 'twenty' tương ứng với số nào?", "Twenty", "20", "12", "2", undefined, { speaker: "mascot", meaning: "Twenty là số 20." }),
          makeRealWord("nineteen", true, "Từ có nghĩa: số 19"),
          makeRealWord("dresson", false, "Từ giả trong đề thi DET"),
          makeListenType("We have ten students in class.", "Chúng tôi có mười học sinh trong lớp.", "zombie")
        ),
      },
      {
        title: "Bài 4: Đại từ nhân xưng & Động từ To Be",
        order: 4,
        vocab: [
          { en: "I / You", vi: "Tôi / Bạn", example: { en: "I am ready, and you are too.", vi: "Tôi đã sẵn sàng, và bạn cũng vậy." }, image: "/boy.svg" },
          { en: "He / She", vi: "Anh ấy / Cô ấy", example: { en: "He is a student and she is a doctor.", vi: "Anh ấy là học sinh và cô ấy là bác sĩ." }, image: "/girl.svg" },
          { en: "We / They", vi: "Chúng tôi / Họ", example: { en: "We are good friends.", vi: "Chúng tôi là bạn tốt của nhau." }, image: "/man.svg" },
          { en: "Student", vi: "Học sinh / Sinh viên", example: { en: "She is a hard-working student.", vi: "Cô ấy là một học sinh chăm chỉ." }, image: "/woman.svg" },
          { en: "Teacher", vi: "Giáo viên", example: { en: "My teacher is very kind.", vi: "Giáo viên của tôi rất tốt bụng." }, image: "/mascot.svg" },
          { en: "Friend", vi: "Người bạn", example: { en: "A friend in need is a friend indeed.", vi: "Bạn trong hoạn nạn mới là bạn thật sự." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Điền từ đúng: 'They _____ friendly people.'", "They are friendly people.", "are", "is", "am", undefined, { speaker: "man", meaning: "Họ là những người thân thiện." }),
          makeListenType("She is a great English teacher.", "Cô ấy là một giáo viên tiếng Anh tuyệt vời.", "girl"),
          makeRealWord("collective", true, "Từ có nghĩa: tập thể"),
          makeRealWord("bilgation", false, "Từ giả trong đề thi DET"),
          makeFillLetters("We are stud", "en", "ts", " at a language school.", "Chúng tôi là học sinh tại một trường ngoại ngữ.", "boy"),
          makeBuild("Họ là những người bạn tốt của tôi.", "They are my good friends", ["They", "are", "my", "good", "friends", "he", "is"], "woman"),
          makeTypeMissing("I _____ very happy to meet you.", "am", "Tôi rất vui được gặp bạn.", "mascot"),
          makeChoice("Chọn đại từ thích hợp: '_____ is my elder brother.'", "He is my elder brother.", "He", "She", "They", undefined, { speaker: "robot", meaning: "Anh ấy là anh trai của tôi." }),
          makeListenType("We are ready for the lesson.", "Chúng tôi đã sẵn sàng cho bài học.", "zombie"),
          makeRealWord("waiting", true, "Từ có nghĩa: đang chờ đợi"),
          makeRealWord("somether", false, "Từ giả trong đề thi DET")
        ),
      },
      {
        title: "Bài 5: Cảm xúc, Hỏi thăm & Tâm trạng",
        order: 5,
        vocab: [
          { en: "Happy", vi: "Vui vẻ / Hạnh phúc", example: { en: "I am very happy today.", vi: "Hôm nay tôi rất vui vẻ." }, image: "/girl.svg" },
          { en: "Sad", vi: "Buồn bã", example: { en: "Why are you sad?", vi: "Tại sao bạn lại buồn?" }, image: "/boy.svg" },
          { en: "Tired", vi: "Mệt mỏi", example: { en: "I am tired after working.", vi: "Tôi mệt sau khi làm việc." }, image: "/zombie.svg" },
          { en: "Fine", vi: "Khỏe / Tốt", example: { en: "I am fine, thank you.", vi: "Tôi khỏe, cảm ơn bạn." }, image: "/woman.svg" },
          { en: "Great", vi: "Tuyệt vời", example: { en: "That is a great idea!", vi: "Đó là một ý kiến tuyệt vời!" }, image: "/mascot.svg" },
          { en: "Busy", vi: "Bận rộn", example: { en: "My father is very busy.", vi: "Bố tôi rất bận rộn." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hỏi thăm sức khỏe: 'How are you today?' - 'I am _____.'", "I am fine, thank you.", "fine, thank you", "badly, sorry", "goodbye now", undefined, { speaker: "girl", meaning: "Tôi khỏe, cảm ơn bạn." }),
          makeListenType("I feel happy and energetic today.", "Hôm nay tôi cảm thấy vui vẻ và tràn đầy năng lượng.", "boy"),
          makeRealWord("holiday", true, "Từ có nghĩa: kỳ nghỉ"),
          makeRealWord("monket", false, "Từ giả trong đề thi DET"),
          makeFillLetters("He is very ti", "r", "ed", " after a long walk.", "Anh ấy rất mệt sau một quãng đi bộ dài.", "zombie"),
          makeBuild("Hôm nay tôi cảm thấy rất tuyệt vời.", "I feel great today", ["I", "feel", "great", "today", "am", "sad"], "man"),
          makeTypeMissing("Why are you _____? - Because I lost my key.", "sad", "Tại sao bạn buồn? - Vì tôi làm mất chìa khóa.", "woman"),
          makeChoice("Từ nào mang nghĩa trái ngược với 'happy'?", "Opposite of happy", "sad", "great", "fine", undefined, { speaker: "robot", meaning: "Trái ngược với happy (vui) là sad (buồn)." }),
          makeListenType("She is busy with her homework.", "Cô ấy đang bận làm bài tập về nhà.", "mascot"),
          makeRealWord("party", true, "Từ có nghĩa: bữa tiệc"),
          makeRealWord("okend", false, "Từ giả trong đề thi DET")
        ),
      },
      {
        title: "Bài 6: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 1",
        order: 6,
        vocab: [
          { en: "Review", vi: "Ôn tập tổng hợp", example: { en: "Let's review Chapter 1.", vi: "Hãy cùng ôn tập lại Chương 1." }, image: "/mascot.svg" },
          { en: "Success", vi: "Thành công", example: { en: "Practice brings success.", vi: "Luyện tập đem lại thành công." }, image: "/man.svg" },
          { en: "Mastery", vi: "Sự thành thạo", example: { en: "Achieve language mastery.", vi: "Đạt tới sự thành thạo ngôn ngữ." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Thử thách Vương miện: 'Hello, my name is Lan and I _____ from Vietnam.'", "I am from Vietnam.", "am", "is", "are", undefined, { speaker: "mascot", meaning: "Tôi đến từ Việt Nam." }),
          makeListenType("Good morning! Nice to meet you all.", "Chào buổi sáng! Rất vui được gặp tất cả các bạn.", "girl"),
          makeRealWord("bookcase", true, "Từ có nghĩa: giá sách (DET Question)"),
          makeRealWord("birts", false, "Từ giả trong đề thi DET"),
          makeFillLetters("They are v", "er", "y", " happy to see you.", "Họ rất vui mừng khi nhìn thấy bạn.", "boy"),
          makeBuild("Tôi mười lăm tuổi và tôi là học sinh.", "I am fifteen years old and a student", ["I", "am", "fifteen", "years", "old", "and", "a", "student", "they", "is"], "woman"),
          makeTypeMissing("Where _____ you from? - I am from Hanoi.", "are", "Bạn đến từ đâu? - Tôi đến từ Hà Nội.", "man"),
          makeListenType("Thank you very much for your kind help.", "Cảm ơn bạn rất nhiều vì sự giúp đỡ tốt bụng.", "robot"),
          makeRealWord("younger", true, "Từ có nghĩa: trẻ hơn"),
          makeRealWord("diresser", false, "Từ giả trong đề thi DET"),
          makeChoice("Dịch câu: 'Họ là những người bạn tốt nhất của tôi.'", "They are my best friends.", "They are my best friends.", "He is my best friend.", "We are teacher friends.", undefined, { speaker: "zombie", meaning: "Họ là những người bạn tốt nhất của tôi." }),
          makeFillLetters("Goodbye and h", "a", "ve", " a wonderful weekend!", "Tạm biệt và chúc một cuối tuần tuyệt vời!", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 2: GIA ĐÌNH & TỔ ẤM (FAMILY & HOME)
  // =========================================================================
  {
    title: "Chương 2: Gia đình, Tổ ấm & Đồ vật",
    description: "Khám phá từ vựng về người thân, các phòng trong nhà và những đồ dùng thân thuộc.",
    order: 2,
    lessons: [
      {
        title: "Bài 1: Các thành viên trong gia đình",
        order: 1,
        vocab: [
          { en: "Family", vi: "Gia đình", example: { en: "I love my family.", vi: "Tôi yêu gia đình tôi." }, image: "/mascot.svg" },
          { en: "Father", vi: "Người cha / Bố", example: { en: "My father is an engineer.", vi: "Bố tôi là kỹ sư." }, image: "/man.svg" },
          { en: "Mother", vi: "Người mẹ", example: { en: "My mother cooks very well.", vi: "Mẹ tôi nấu ăn rất ngon." }, image: "/woman.svg" },
          { en: "Brother", vi: "Anh trai / Em trai", example: { en: "I play football with my brother.", vi: "Tôi đá bóng cùng em trai." }, image: "/boy.svg" },
          { en: "Sister", vi: "Chị gái / Em gái", example: { en: "My sister reads books every night.", vi: "Chị gái tôi đọc sách mỗi đêm." }, image: "/girl.svg" },
          { en: "Baby", vi: "Em bé sơ sinh", example: { en: "The baby is sleeping peacefully.", vi: "Em bé đang ngủ rất ngoan." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Dịch câu: 'Gia đình tôi có bốn người.'", "My family has four people.", "My family has four people.", "My house has four rooms.", "My friends are four people.", undefined, { speaker: "girl", meaning: "Gia đình tôi có bốn người." }),
          makeListenType("My mother is a kind doctor.", "Mẹ tôi là một bác sĩ tốt bụng.", "boy"),
          makeRealWord("children", true, "Từ có nghĩa: những đứa trẻ"),
          makeRealWord("fathert", false, "Từ giả"),
          makeFillLetters("My bro", "th", "er", " likes playing guitar.", "Anh trai tôi thích chơi đàn ghi-ta.", "man"),
          makeBuild("Tôi yêu bố mẹ của tôi rất nhiều.", "I love my parents very much", ["I", "love", "my", "parents", "very", "much", "she", "he"], "woman"),
          makeTypeMissing("She is my younger _____.", "sister", "Cô ấy là em gái của tôi.", "mascot"),
          makeChoice("Ai là mẹ của cha hoặc mẹ bạn?", "Who is your mother's mother?", "Grandmother", "Sister", "Aunt", undefined, { speaker: "robot", meaning: "Bà ngoại / Bà nội là grandmother." }),
          makeListenType("We eat dinner with our family every day.", "Chúng tôi ăn tối cùng gia đình mỗi ngày.", "zombie"),
          makeRealWord("parents", true, "Từ có nghĩa: cha mẹ"),
          makeRealWord("brothes", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Các căn phòng trong ngôi nhà",
        order: 2,
        vocab: [
          { en: "House", vi: "Ngôi nhà", example: { en: "This is my warm house.", vi: "Đây là ngôi nhà ấm cúng của tôi." }, image: "/mascot.svg" },
          { en: "Living room", vi: "Phòng khách", example: { en: "We watch TV in the living room.", vi: "Chúng tôi xem TV ở phòng khách." }, image: "/man.svg" },
          { en: "Bedroom", vi: "Phòng ngủ", example: { en: "My bedroom has a large bed.", vi: "Phòng ngủ của tôi có chiếc giường lớn." }, image: "/woman.svg" },
          { en: "Kitchen", vi: "Nhà bếp", example: { en: "Mom is cooking in the kitchen.", vi: "Mẹ đang nấu ăn trong bếp." }, image: "/girl.svg" },
          { en: "Bathroom", vi: "Nhà tắm / Phòng vệ sinh", example: { en: "Wash your hands in the bathroom.", vi: "Hãy rửa tay trong phòng tắm." }, image: "/boy.svg" },
          { en: "Garden", vi: "Khu vườn", example: { en: "There are red flowers in the garden.", vi: "Có những bông hoa đỏ trong vườn." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Bạn ngủ ở căn phòng nào?", "Where do you sleep?", "In the bedroom", "In the kitchen", "In the bathroom", undefined, { speaker: "boy", meaning: "Ngủ ở phòng ngủ (bedroom)." }),
          makeListenType("There is a small garden behind the house.", "Có một khu vườn nhỏ phía sau ngôi nhà.", "girl"),
          makeRealWord("kitchen", true, "Từ có nghĩa: nhà bếp"),
          makeRealWord("roomin", false, "Từ giả"),
          makeFillLetters("We sit and talk in the liv", "i", "ng", " room.", "Chúng tôi ngồi trò chuyện ở phòng khách.", "man"),
          makeBuild("Ngôi nhà của tôi có ba phòng ngủ.", "My house has three bedrooms", ["My", "house", "has", "three", "bedrooms", "in", "is"], "woman"),
          makeTypeMissing("Mom is preparing breakfast in the _____.", "kitchen", "Mẹ đang chuẩn bị bữa sáng trong bếp.", "robot"),
          makeChoice("Nơi để tắm rửa và rửa mặt gọi là gì?", "Room for washing", "Bathroom", "Garden", "Kitchen", undefined, { speaker: "mascot", meaning: "Nhà tắm là bathroom." }),
          makeListenType("The flowers in our garden are beautiful.", "Những bông hoa trong vườn nhà chúng tôi rất đẹp.", "zombie"),
          makeRealWord("window", true, "Từ có nghĩa: cửa sổ"),
          makeRealWord("housen", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Đồ đạc & Vật dụng trong nhà",
        order: 3,
        vocab: [
          { en: "Table", vi: "Cái bàn", example: { en: "The book is on the table.", vi: "Quyển sách ở trên bàn." }, image: "/mascot.svg" },
          { en: "Chair", vi: "Cái ghế", example: { en: "Please sit down on this chair.", vi: "Làm ơn ngồi xuống chiếc ghế này." }, image: "/man.svg" },
          { en: "Bed", vi: "Chiếc giường", example: { en: "The bed is soft and comfortable.", vi: "Chiếc giường mềm và êm ái." }, image: "/girl.svg" },
          { en: "Door", vi: "Cửa ra vào", example: { en: "Close the door when you leave.", vi: "Hãy đóng cửa khi bạn rời đi." }, image: "/boy.svg" },
          { en: "Window", vi: "Cửa sổ", example: { en: "Open the window for fresh air.", vi: "Mở cửa sổ để đón không khí trong lành." }, image: "/woman.svg" },
          { en: "Key", vi: "Chìa khóa", example: { en: "Here is the key to my room.", vi: "Đây là chìa khóa phòng tôi." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Dịch câu: 'Hãy mở cửa sổ ra.'", "Please open the window.", "Please open the window.", "Please close the door.", "Please clean the table.", undefined, { speaker: "woman", meaning: "Làm ơn hãy mở cửa sổ." }),
          makeListenType("I put my key on the desk.", "Tôi để chìa khóa ở trên bàn học.", "man"),
          makeRealWord("table", true, "Từ có nghĩa: cái bàn (DET Question)"),
          makeRealWord("chairen", false, "Từ giả"),
          makeFillLetters("Please cl", "o", "se", " the door, it is cold outside.", "Làm ơn đóng cửa lại, bên ngoài lạnh lắm.", "boy"),
          makeBuild("Chiếc chìa khóa ở trên bàn.", "The key is on the table", ["The", "key", "is", "on", "the", "table", "under", "in"], "girl"),
          makeTypeMissing("Sit down on the _____ and read your book.", "chair", "Ngồi xuống ghế và đọc sách đi.", "robot"),
          makeChoice("Đồ vật nào dùng để nằm ngủ?", "What do you sleep on?", "Bed", "Table", "Door", undefined, { speaker: "zombie", meaning: "Nằm ngủ trên giường (bed)." }),
          makeListenType("Open the door and come in.", "Mở cửa ra và vào đây nào.", "mascot"),
          makeRealWord("door", true, "Từ có nghĩa: cửa ra vào"),
          makeRealWord("keyer", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Vị trí & Giới từ không gian",
        order: 4,
        vocab: [
          { en: "In", vi: "Ở bên trong", example: { en: "The pen is in my bag.", vi: "Cây bút ở trong cặp của tôi." }, image: "/boy.svg" },
          { en: "On", vi: "Ở bên trên mặt", example: { en: "The cup is on the desk.", vi: "Cái tách ở trên bàn." }, image: "/girl.svg" },
          { en: "Under", vi: "Ở phía dưới", example: { en: "The cat is sleeping under the bed.", vi: "Con mèo đang ngủ dưới gầm giường." }, image: "/man.svg" },
          { en: "Next to", vi: "Ở bên cạnh", example: { en: "The lamp is next to the sofa.", vi: "Chiếc đèn ở cạnh ghế sofa." }, image: "/woman.svg" },
          { en: "Behind", vi: "Ở đằng sau", example: { en: "The garden is behind our house.", vi: "Khu vườn ở phía sau nhà chúng tôi." }, image: "/mascot.svg" },
          { en: "In front of", vi: "Ở phía trước", example: { en: "A car is parked in front of the gate.", vi: "Một chiếc xe đang đậu trước cổng." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Dịch câu: 'Con mèo đang ngủ dưới chiếc ghế.'", "The cat is sleeping under the chair.", "The cat is sleeping under the chair.", "The cat is on the table.", "The dog is in the garden.", undefined, { speaker: "girl", meaning: "Con mèo đang ngủ dưới ghế." }),
          makeListenType("The book is on the desk.", "Quyển sách nằm ở trên bàn làm việc.", "boy"),
          makeRealWord("behind", true, "Từ có nghĩa: đằng sau"),
          makeRealWord("underin", false, "Từ giả"),
          makeFillLetters("My bag is un", "d", "er", " the wooden table.", "Cặp của tôi ở dưới chiếc bàn gỗ.", "man"),
          makeBuild("Chiếc bút mực ở bên trong cặp sách.", "The pen is in the bag", ["The", "pen", "is", "in", "the", "bag", "on", "under"], "woman"),
          makeTypeMissing("There is a tree in _____ of my house.", "front", "Có một cái cây ở trước cửa nhà tôi.", "robot"),
          makeChoice("Chọn giới từ đúng: 'The picture hangs _____ the wall.'", "The picture hangs on the wall.", "on", "in", "under", undefined, { speaker: "mascot", meaning: "Bức tranh treo trên tường (on the wall)." }),
          makeListenType("He sits next to his best friend.", "Anh ấy ngồi cạnh người bạn thân nhất của mình.", "zombie"),
          makeRealWord("desk", true, "Từ có nghĩa: bàn học/làm việc"),
          makeRealWord("nearten", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: Thú cưng & Động vật nuôi thân thiện",
        order: 5,
        vocab: [
          { en: "Pet", vi: "Thú cưng", example: { en: "Do you have any pets?", vi: "Bạn có nuôi thú cưng nào không?" }, image: "/mascot.svg" },
          { en: "Dog", vi: "Con chó", example: { en: "Dogs are man's best friend.", vi: "Chó là người bạn tốt nhất của con người." }, image: "/boy.svg" },
          { en: "Cat", vi: "Con mèo", example: { en: "My cat likes drinking milk.", vi: "Con mèo của tôi thích uống sữa." }, image: "/girl.svg" },
          { en: "Bird", vi: "Con chim", example: { en: "A little bird is singing on the tree.", vi: "Một chú chim nhỏ đang hót trên cây." }, image: "/man.svg" },
          { en: "Fish", vi: "Con cá", example: { en: "We have gold fish in the tank.", vi: "Chúng tôi nuôi cá vàng trong bể." }, image: "/woman.svg" },
          { en: "Cute", vi: "Dễ thương / Đáng yêu", example: { en: "The puppy is so cute!", vi: "Chú cún con thật đáng yêu!" }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Loài động vật nào được gọi là 'man's best friend'?", "Man's best friend", "Dog", "Fish", "Bird", undefined, { speaker: "boy", meaning: "Chó là bạn thân thiết nhất của con người (theo DET reading)." }),
          makeListenType("I have a small cat at home.", "Tôi nuôi một chú mèo nhỏ ở nhà.", "girl"),
          makeRealWord("puppy", true, "Từ có nghĩa: chú cún con"),
          makeRealWord("doggen", false, "Từ giả"),
          makeFillLetters("The little b", "i", "rd", " is singing in the garden.", "Chú chim nhỏ đang hót trong vườn.", "man"),
          makeBuild("Con chó của tôi rất thông minh và dễ thương.", "My dog is smart and cute", ["My", "dog", "is", "smart", "and", "cute", "cat", "fish"], "woman"),
          makeTypeMissing("The cat drinks _____ every morning.", "milk", "Con mèo uống sữa mỗi sáng.", "robot"),
          makeChoice("Động vật nào biết bơi dưới nước?", "Which animal swims in water?", "Fish", "Dog", "Bird", undefined, { speaker: "zombie", meaning: "Cá (fish) bơi dưới nước." }),
          makeListenType("Dogs come in all shapes and sizes.", "Chó có đủ mọi hình dáng và kích cỡ.", "mascot"),
          makeRealWord("animal", true, "Từ có nghĩa: động vật"),
          makeRealWord("caten", false, "Từ giả")
        ),
      },
      {
        title: "Bài 6: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 2",
        order: 6,
        vocab: [
          { en: "Review", vi: "Ôn tập tổng kết", example: { en: "Crown review of Chapter 2.", vi: "Ôn tập vương miện Chương 2." }, image: "/mascot.svg" },
          { en: "Home", vi: "Tổ ấm gia đình", example: { en: "Home sweet home.", vi: "Không đâu bằng nhà mình." }, image: "/woman.svg" },
          { en: "Companion", vi: "Bạn đồng hành", example: { en: "A loyal companion.", vi: "Một người bạn đồng hành trung thành." }, image: "/boy.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chapter 2: 'My father and mother are my _____.'", "My father and mother are my parents.", "parents", "brothers", "sisters", undefined, { speaker: "mascot", meaning: "Bố và mẹ là cha mẹ (parents)." }),
          makeListenType("There are four rooms in my house.", "Có bốn căn phòng trong ngôi nhà của tôi.", "girl"),
          makeRealWord("bedroom", true, "Từ có nghĩa: phòng ngủ"),
          makeRealWord("kitchey", false, "Từ giả"),
          makeFillLetters("The cat is sle", "ep", "ing", " under the wooden table.", "Con mèo đang ngủ dưới gầm bàn gỗ.", "boy"),
          makeBuild("Chúng tôi ngồi nói chuyện ở trong phòng khách.", "We sit and talk in the living room", ["We", "sit", "and", "talk", "in", "the", "living", "room", "on", "bed"], "man"),
          makeTypeMissing("Please close the _____ before going out.", "door", "Làm ơn đóng cửa lại trước khi ra ngoài.", "woman"),
          makeListenType("Dogs have earned the title of man's best friend.", "Loài chó xứng đáng với danh hiệu bạn thân của con người.", "robot"),
          makeRealWord("garden", true, "Từ có nghĩa: khu vườn"),
          makeRealWord("flowert", false, "Từ giả"),
          makeChoice("Căn phòng dùng để nấu thức ăn gọi là:", "Where we cook meals", "Kitchen", "Bedroom", "Bathroom", undefined, { speaker: "zombie", meaning: "Nhà bếp là kitchen." }),
          makeFillLetters("I love spending ti", "m", "e", " with my family at home.", "Tôi thích dành thời gian bên gia đình ở nhà.", "mascot")
        ),
      },
    ],
  },
];

export const allUnitsData: SeedUnit[] = [
  ...baseUnitsData,
  ...b1UnitsData,
  ...b2UnitsData,
  ...c1UnitsData,
  ...c2UnitsData,
];

export const a1UnitsData = allUnitsData;
