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

export const b2UnitsData: SeedUnit[] = [
  // =========================================================================
  // CHƯƠNG 6: NGHỀ NGHIỆP, NƠI CÔNG SỞ & ĐÀM PHÁN (B2)
  // =========================================================================
  {
    title: "Chương 6: Nghề nghiệp, Nơi công sở & Đàm phán (B2)",
    description: "Làm chủ tiếng Anh giao tiếp công sở, phỏng vấn ứng tuyển, quản lý dự án và đàm phán hợp đồng.",
    order: 6,
    lessons: [
      {
        title: "Bài 1: Môi trường công sở & Phỏng vấn tuyển dụng",
        order: 1,
        vocab: [
          { en: "Resume", vi: "Bản sơ yếu lý lịch", example: { en: "Submit your updated resume.", vi: "Nộp bản sơ yếu lý lịch cập nhật của bạn." }, image: "/man.svg" },
          { en: "Interview", vi: "Buổi phỏng vấn", example: { en: "Prepare thoroughly for the interview.", vi: "Chuẩn bị kỹ càng cho buổi phỏng vấn." }, image: "/woman.svg" },
          { en: "Colleague", vi: "Đồng nghiệp", example: { en: "He collaborates well with his colleagues.", vi: "Anh ấy hợp tác tốt với các đồng nghiệp." }, image: "/boy.svg" },
          { en: "Promotion", vi: "Sự thăng tiến / Thăng chức", example: { en: "She received a well-deserved promotion.", vi: "Cô ấy đã được thăng chức xứng đáng." }, image: "/girl.svg" },
          { en: "Experience", vi: "Kinh nghiệm làm việc", example: { en: "Years of practical experience.", vi: "Nhiều năm kinh nghiệm thực tế." }, image: "/robot.svg" },
          { en: "Position", vi: "Vị trí công việc", example: { en: "Apply for the manager position.", vi: "Ứng tuyển vào vị trí quản lý." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Tài liệu tóm tắt học vấn và kinh nghiệm khi xin việc gọi là:", "Job application document", "Resume", "Receipt", "Ticket", undefined, { speaker: "woman", meaning: "Sơ yếu lý lịch ứng tuyển là Resume." }),
          makeListenType("Please introduce yourself and your relevant work experience.", "Xin hãy giới thiệu về bản thân và kinh nghiệm làm việc liên quan.", "man"),
          makeRealWord("candidate", true, "Từ có nghĩa: ứng viên"),
          makeRealWord("promotize", false, "Từ giả"),
          makeFillLetters("She was offe", "r", "ed", " a senior position in marketing.", "Cô ấy được mời nhận vị trí cấp cao trong ngành tiếp thị.", "girl"),
          makeBuild("Tôi sẵn sàng bắt đầu công việc ngay lập tức.", "I am ready to start working immediately", ["I", "am", "ready", "to", "start", "working", "immediately", "never", "late"], "boy"),
          makeTypeMissing("He gets along well with all of his office _____.", "colleagues", "Anh ấy hòa thuận với tất cả đồng nghiệp trong văn phòng.", "robot"),
          makeChoice("Khi nhà tuyển dụng hỏi 'What are your strengths?', bạn nên trả lời:", "Interview response", "I am organized, reliable, and adaptable.", "I like to sleep until noon.", "I have no idea.", undefined, { speaker: "mascot", meaning: "Tôi có tổ chức, đáng tin cậy và linh hoạt." }),
          makeListenType("Strong communication skills are essential for career growth.", "Kỹ năng giao tiếp tốt là điều thiết yếu cho sự phát triển sự nghiệp.", "zombie"),
          makeRealWord("qualification", true, "Từ có nghĩa: bằng cấp / trình độ chuyên môn"),
          makeRealWord("intervize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Họp hành, Thuyết trình & Báo cáo dự án",
        order: 2,
        vocab: [
          { en: "Meeting", vi: "Cuộc họp", example: { en: "Attend the weekly morning meeting.", vi: "Tham dự cuộc họp đầu tuần vào buổi sáng." }, image: "/boy.svg" },
          { en: "Deadline", vi: "Hạn chót hoàn thành", example: { en: "Meet the project deadline on time.", vi: "Kịp hạn chót dự án đúng thời gian." }, image: "/girl.svg" },
          { en: "Presentation", vi: "Bài thuyết trình", example: { en: "Deliver an engaging presentation.", vi: "Trình bày một bài thuyết trình lôi cuốn." }, image: "/man.svg" },
          { en: "Strategy", vi: "Chiến lược", example: { en: "Develop a long-term business strategy.", vi: "Xây dựng chiến lược kinh doanh dài hạn." }, image: "/woman.svg" },
          { en: "Objective", vi: "Mục tiêu cụ thể", example: { en: "Achieve the quarterly sales objectives.", vi: "Đạt được các mục tiêu doanh số quý." }, image: "/robot.svg" },
          { en: "Progress", vi: "Tiến độ công việc", example: { en: "Report on the current project progress.", vi: "Báo cáo về tiến độ dự án hiện tại." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hạn chót phải hoàn thành công việc được gọi là:", "Time limit for tasks", "Deadline", "Headline", "Outline", undefined, { speaker: "man", meaning: "Hạn chót là Deadline." }),
          makeListenType("We must submit the financial report before five o'clock.", "Chúng ta phải nộp báo cáo tài chính trước 5 giờ chiều.", "woman"),
          makeRealWord("presentation", true, "Từ có nghĩa: bài thuyết trình"),
          makeRealWord("objectifye", false, "Từ giả"),
          makeFillLetters("Our main pri", "or", "ity", " is satisfying customer expectations.", "Ưu tiên chính của chúng tôi là đáp ứng kỳ vọng khách hàng.", "boy"),
          makeBuild("Nhóm của chúng tôi đang tiến triển rất tốt.", "Our team is making very good progress", ["Our", "team", "is", "making", "very", "good", "progress", "bad", "late"], "girl"),
          makeTypeMissing("Let us schedule a follow-up _____ for tomorrow morning.", "meeting", "Hãy lên lịch một cuộc họp tiếp theo vào sáng mai.", "robot"),
          makeChoice("Từ nào đồng nghĩa với 'Goal' (mục tiêu)?", "Synonym for Goal", "Objective", "Obstacle", "Accident", undefined, { speaker: "mascot", meaning: "Objective đồng nghĩa với Goal." }),
          makeListenType("Effective teamwork ensures the success of complex projects.", "Làm việc nhóm hiệu quả đảm bảo thành công của các dự án phức tạp.", "zombie"),
          makeRealWord("collaboration", true, "Từ có nghĩa: sự hợp tác cộng tác"),
          makeRealWord("strategizey", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Giao tiếp thư điện tử & Thư từ thương mại",
        order: 3,
        vocab: [
          { en: "Attachment", vi: "Tệp đính kèm", example: { en: "Please check the attachment below.", vi: "Vui lòng kiểm tra tệp đính kèm bên dưới." }, image: "/robot.svg" },
          { en: "Inquiry", vi: "Thư yêu cầu thông tin", example: { en: "Respond promptly to client inquiries.", vi: "Phản hồi nhanh chóng các yêu cầu của khách." }, image: "/woman.svg" },
          { en: "Proposal", vi: "Bản đề xuất kế hoạch", example: { en: "Submit the partnership proposal.", vi: "Nộp bản đề xuất hợp tác." }, image: "/man.svg" },
          { en: "Formal", vi: "Trang trọng / Lịch sự", example: { en: "Use formal tone in business letters.", vi: "Dùng giọng văn trang trọng trong thư công việc." }, image: "/girl.svg" },
          { en: "Confirm", vi: "Xác nhận", example: { en: "Confirm your appointment by email.", vi: "Xác nhận lịch hẹn của bạn qua thư điện tử." }, image: "/boy.svg" },
          { en: "Sincerely", vi: "Trân trọng (kết thư)", example: { en: "Yours sincerely, John Smith.", vi: "Trân trọng, John Smith." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Cụm từ mở đầu trang trọng thường thấy trong thư điện tử thương mại:", "Formal email greeting", "Dear Mr. Johnson,", "Hey dude!", "What is up?", undefined, { speaker: "woman", meaning: "Chào hỏi trang trọng: Dear Mr. Johnson." }),
          makeListenType("Please find attached our latest product catalog and price list.", "Xin vui lòng xem tệp đính kèm gồm danh mục sản phẩm và bảng giá mới nhất.", "boy"),
          makeRealWord("attachment", true, "Từ có nghĩa: tệp đính kèm"),
          makeRealWord("proposaled", false, "Từ giả"),
          makeFillLetters("I am writing to co", "nf", "irm", " our upcoming business meeting.", "Tôi viết thư này để xác nhận cuộc họp kinh doanh sắp tới.", "man"),
          makeBuild("Vui lòng trả lời thư này sớm nhất có thể.", "Please reply to this email as soon as possible", ["Please", "reply", "to", "this", "email", "as", "soon", "as", "possible", "never"], "girl"),
          makeTypeMissing("Thank you for your prompt response to our _____.", "inquiry", "Cảm ơn bạn đã phản hồi nhanh chóng yêu cầu thông tin của chúng tôi.", "robot"),
          makeChoice("Từ kết thúc thư trang trọng và lịch thiệp nhất là:", "Formal closing", "Sincerely", "See ya", "Later", undefined, { speaker: "mascot", meaning: "Sincerely là trân trọng." }),
          makeListenType("I look forward to hearing from your company soon.", "Tôi rất mong sớm nhận được phản hồi từ quý công ty.", "zombie"),
          makeRealWord("correspondence", true, "Từ có nghĩa: thư từ trao đổi"),
          makeRealWord("confirmate", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Đàm phán hợp đồng & Thỏa thuận kinh doanh",
        order: 4,
        vocab: [
          { en: "Contract", vi: "Hợp đồng kinh tế", example: { en: "Sign the mutual agreement contract.", vi: "Ký kết hợp đồng thỏa thuận chung." }, image: "/man.svg" },
          { en: "Negotiate", vi: "Đàm phán / Thương lượng", example: { en: "Negotiate terms that satisfy both parties.", vi: "Đàm phán điều khoản thỏa mãn đôi bên." }, image: "/woman.svg" },
          { en: "Partnership", vi: "Quan hệ đối tác", example: { en: "Establish a lasting partnership.", vi: "Xây dựng mối quan hệ đối tác bền vững." }, image: "/mascot.svg" },
          { en: "Agreement", vi: "Sự đồng thuận / Thỏa thuận", example: { en: "Reach an agreement after discussions.", vi: "Đạt được sự đồng thuận sau thảo luận." }, image: "/boy.svg" },
          { en: "Client", vi: "Khách hàng / Thân chủ", example: { en: "Maintain excellent relationships with clients.", vi: "Duy trì quan hệ tốt đẹp với các khách hàng." }, image: "/girl.svg" },
          { en: "Revenue", vi: "Doanh thu", example: { en: "Increase annual company revenue.", vi: "Gia tăng doanh thu hàng năm của công ty." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Văn bản pháp lý ràng buộc quyền và nghĩa vụ giữa hai bên gọi là:", "Legal binding document", "Contract", "Postcard", "Novel", undefined, { speaker: "man", meaning: "Hợp đồng kinh tế là Contract." }),
          makeListenType("Both parties reached a mutually beneficial agreement.", "Cả hai bên đã đạt được một thỏa thuận đôi bên cùng có lợi.", "woman"),
          makeRealWord("negotiation", true, "Từ có nghĩa: cuộc đàm phán"),
          makeRealWord("partnerly", false, "Từ giả"),
          makeFillLetters("They signed a five-year co", "nt", "ract", " yesterday.", "Họ đã ký một bản hợp đồng thời hạn năm năm vào hôm qua.", "boy"),
          makeBuild("Chúng tôi cam kết cung cấp giải pháp tốt nhất.", "We are committed to providing the best solutions", ["We", "are", "committed", "to", "providing", "the", "best", "solutions", "worst"], "girl"),
          makeTypeMissing("Our goal is to build long-term _____ with our clients.", "partnerships", "Mục tiêu của chúng tôi là xây dựng mối quan hệ đối tác lâu dài với khách hàng.", "robot"),
          makeChoice("Thỏa thuận mà cả hai bên cùng hưởng lợi được gọi là:", "Mutually advantageous deal", "Win-win situation", "Zero outcome", "Total loss", undefined, { speaker: "mascot", meaning: "Thế cờ đôi bên cùng có lợi: Win-win." }),
          makeListenType("Customer satisfaction is the foundation of sustainable revenue.", "Sự hài lòng của khách hàng là nền tảng cho doanh thu bền vững.", "zombie"),
          makeRealWord("profitable", true, "Từ có nghĩa: sinh lời / có lãi"),
          makeRealWord("agreematic", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 6",
        order: 5,
        vocab: [
          { en: "Leadership", vi: "Khả năng lãnh đạo", example: { en: "Demonstrate strong leadership.", vi: "Thể hiện năng lực lãnh đạo vững vàng." }, image: "/mascot.svg" },
          { en: "Innovation", vi: "Sự đổi mới sáng tạo", example: { en: "Drive innovation in business.", vi: "Thúc đẩy đổi mới trong kinh doanh." }, image: "/robot.svg" },
          { en: "Professional", vi: "Chuyên nghiệp", example: { en: "Always maintain a professional attitude.", vi: "Luôn duy trì thái độ chuyên nghiệp." }, image: "/woman.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 6: 'Effective _____ inspires teamwork and company success.'", "Key to corporate success", "leadership", "laziness", "hesitation", undefined, { speaker: "mascot", meaning: "Năng lực lãnh đạo hiệu quả truyền cảm hứng cho tinh thần đồng đội." }),
          makeListenType("A professional attitude and clear communication build strong trust.", "Thái độ chuyên nghiệp và giao tiếp rõ ràng tạo dựng niềm tin vững chắc.", "girl"),
          makeRealWord("enterprising", true, "Từ có nghĩa: dám nghĩ dám làm"),
          makeRealWord("professionize", false, "Từ giả"),
          makeFillLetters("Continuous innovation is vital for main", "tai", "ning", " market leadership.", "Đổi mới liên tục là yếu tố sống còn để duy trì vị thế dẫn đầu thị trường.", "man"),
          makeBuild("Chúng tôi luôn hướng đến sự hoàn hảo trong công việc.", "We always strive for excellence in our work", ["We", "always", "strive", "for", "excellence", "in", "our", "work", "bad"], "boy"),
          makeTypeMissing("Reliability and honesty are core values of any _____ organization.", "professional", "Độ tin cậy và sự trung thực là giá trị cốt lõi của mọi tổ chức chuyên nghiệp.", "woman"),
          makeListenType("Successful negotiations require active listening and mutual respect.", "Đàm phán thành công đòi hỏi sự lắng nghe tích cực và tôn trọng lẫn nhau.", "robot"),
          makeRealWord("entrepreneur", true, "Từ có nghĩa: doanh nhân khởi nghiệp"),
          makeRealWord("innovatent", false, "Từ giả"),
          makeChoice("Khi xử lý bất đồng quan điểm trong công việc, bước đầu tiên là:", "Resolving team conflicts", "Listen attentively to understand their perspective", "Shout loudly", "Walk away immediately", undefined, { speaker: "zombie", meaning: "Lắng nghe chăm chú để hiểu góc nhìn của người khác." }),
          makeFillLetters("Every challenge is an oppor", "tun", "ity", " to learn and excel.", "Mỗi thử thách là một cơ hội để học hỏi và bứt phá.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 7: CÔNG NGHỆ, KỶ NGUYÊN SỐ & TRUYỀN THÔNG (B2)
  // =========================================================================
  {
    title: "Chương 7: Công nghệ, Kỷ nguyên số & Truyền thông (B2)",
    description: "Khám phá từ vựng công nghệ thông tin, an toàn không gian mạng, mạng xã hội và truyền thông số.",
    order: 7,
    lessons: [
      {
        title: "Bài 1: Thiết bị thông minh & Kết nối Internet",
        order: 1,
        vocab: [
          { en: "Device", vi: "Thiết bị điện tử", example: { en: "Connect your mobile device to Wi-Fi.", vi: "Kết nối thiết bị di động của bạn với Wi-Fi." }, image: "/robot.svg" },
          { en: "Software", vi: "Phần mềm máy tính", example: { en: "Install the latest antivirus software.", vi: "Cài đặt phần mềm diệt virus mới nhất." }, image: "/boy.svg" },
          { en: "Hardware", vi: "Phần cứng máy tính", example: { en: "Upgrade computer hardware for better speed.", vi: "Nâng cấp phần cứng máy tính để đạt tốc độ cao hơn." }, image: "/man.svg" },
          { en: "Wireless", vi: "Không dây", example: { en: "Wireless earphones are very convenient.", vi: "Tai nghe không dây rất tiện lợi." }, image: "/girl.svg" },
          { en: "Application", vi: "Ứng dụng / Phần mềm", example: { en: "Download educational applications.", vi: "Tải về các ứng dụng giáo dục." }, image: "/woman.svg" },
          { en: "Network", vi: "Mạng lưới kết nối", example: { en: "A secure high-speed network.", vi: "Một mạng lưới tốc độ cao và an toàn." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Chương trình chạy trên máy tính hoặc điện thoại được gọi là:", "Computer programs", "Software", "Hardware", "Furniture", undefined, { speaker: "robot", meaning: "Phần mềm là Software." }),
          makeListenType("Smart devices make everyday life more productive and connected.", "Các thiết bị thông minh giúp cuộc sống thường ngày năng suất và kết nối hơn.", "girl"),
          makeRealWord("connectivity", true, "Từ có nghĩa: khả năng kết nối"),
          makeRealWord("softwared", false, "Từ giả"),
          makeFillLetters("Make sure your wi", "re", "less", " router is properly configured.", "Hãy chắc chắn bộ phát không dây của bạn đã được cấu hình đúng.", "boy"),
          makeBuild("Công nghệ giúp con người kết nối trên toàn thế giới.", "Technology helps people connect around the world", ["Technology", "helps", "people", "connect", "around", "the", "world", "destroy"], "man"),
          makeTypeMissing("The mobile _____ allows you to learn foreign languages anywhere.", "application", "Ứng dụng di động cho phép bạn học ngoại ngữ ở bất kỳ đâu.", "woman"),
          makeChoice("Bộ phận vật lý hữu hình của máy tính như màn hình hay bàn phím là:", "Physical computer parts", "Hardware", "Software", "Data", undefined, { speaker: "mascot", meaning: "Phần cứng là Hardware." }),
          makeListenType("Cloud storage provides reliable backup for important files.", "Lưu trữ đám mây cung cấp giải pháp sao lưu đáng tin cậy cho các tệp quan trọng.", "zombie"),
          makeRealWord("compatible", true, "Từ có nghĩa: tương thích"),
          makeRealWord("devicely", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Mạng xã hội, Tin tức & Sáng tạo nội dung",
        order: 2,
        vocab: [
          { en: "Platform", vi: "Nền tảng kỹ thuật số", example: { en: "Publish videos on digital platforms.", vi: "Đăng tải video trên các nền tảng số." }, image: "/girl.svg" },
          { en: "Content", vi: "Nội dung truyền thông", example: { en: "Create informative and valuable content.", vi: "Tạo ra nội dung bổ ích và giá trị." }, image: "/boy.svg" },
          { en: "Algorithm", vi: "Thuật toán gợi ý", example: { en: "The recommendation algorithm analyzes user habits.", vi: "Thuật toán gợi ý phân tích thói quen người dùng." }, image: "/robot.svg" },
          { en: "Engagement", vi: "Độ tương tác", example: { en: "High user engagement on social media.", vi: "Tương tác người dùng cao trên mạng xã hội." }, image: "/man.svg" },
          { en: "Subscriber", vi: "Người đăng ký theo dõi", example: { en: "The channel gained one million subscribers.", vi: "Kênh đã đạt được một triệu người đăng ký." }, image: "/woman.svg" },
          { en: "Viral", vi: "Lan truyền chóng mặt", example: { en: "The inspirational clip went viral worldwide.", vi: "Đoạn clip truyền cảm hứng đã lan truyền khắp thế giới." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hiện tượng thông tin hoặc video lan truyền cực nhanh trên mạng gọi là:", "Rapid online spread", "Going viral", "Going quiet", "Stopping", undefined, { speaker: "boy", meaning: "Lan truyền chóng mặt: Go viral." }),
          makeListenType("Social media platforms connect millions of creative minds globally.", "Các nền tảng mạng xã hội kết nối hàng triệu tâm hồn sáng tạo trên toàn cầu.", "girl"),
          makeRealWord("influencer", true, "Từ có nghĩa: người có sức ảnh hưởng"),
          makeRealWord("algorithmous", false, "Từ giả"),
          makeFillLetters("High quality con", "te", "nt", " always attracts dedicated followers.", "Nội dung chất lượng cao luôn thu hút người theo dõi trung thành.", "woman"),
          makeBuild("Thuật toán hiển thị bài viết dựa trên sở thích của bạn.", "The algorithm displays posts based on your interests", ["The", "algorithm", "displays", "posts", "based", "on", "your", "interests", "hates"], "man"),
          makeTypeMissing("The video achieved massive audience _____ within hours.", "engagement", "Video đã đạt mức độ tương tác khán giả khổng lồ chỉ trong vài giờ.", "robot"),
          makeChoice("Một người đăng ký theo dõi kênh của bạn được gọi là:", "Channel follower", "Subscriber", "Viewer", "Guest", undefined, { speaker: "mascot", meaning: "Người theo dõi đăng ký là Subscriber." }),
          makeListenType("Critical thinking is necessary when evaluating online news sources.", "Tư duy phản biện là cần thiết khi đánh giá các nguồn tin tức trực tuyến.", "zombie"),
          makeRealWord("authentic", true, "Từ có nghĩa: chân thật / xác thực"),
          makeRealWord("platformize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: An ninh mạng & Bảo mật thông tin cá nhân",
        order: 3,
        vocab: [
          { en: "Cybersecurity", vi: "An ninh mạng", example: { en: "Invest in corporate cybersecurity measures.", vi: "Đầu tư vào các biện pháp an ninh mạng doanh nghiệp." }, image: "/robot.svg" },
          { en: "Privacy", vi: "Quyền riêng tư cá nhân", example: { en: "Protect your personal privacy online.", vi: "Bảo vệ quyền riêng tư cá nhân của bạn trên mạng." }, image: "/man.svg" },
          { en: "Password", vi: "Mật khẩu bảo mật", example: { en: "Use a complex and unique password.", vi: "Sử dụng mật khẩu phức tạp và độc nhất." }, image: "/woman.svg" },
          { en: "Firewall", vi: "Tường lửa bảo vệ", example: { en: "The firewall blocks unauthorized network access.", vi: "Tường lửa ngăn chặn truy cập mạng trái phép." }, image: "/boy.svg" },
          { en: "Phishing", vi: "Tấn công lừa đảo qua mạng", example: { en: "Beware of fraudulent phishing emails.", vi: "Cảnh giác với các thư điện tử lừa đảo giả mạo." }, image: "/girl.svg" },
          { en: "Encryption", vi: "Mã hóa dữ liệu", example: { en: "End-to-end encryption keeps messages safe.", vi: "Mã hóa đầu cuối giúp tin nhắn an toàn." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Biện pháp cơ bản nhất để bảo vệ tài khoản cá nhân là:", "Account protection", "Using strong and unique passwords", "Sharing passwords with strangers", "Writing passwords publicly", undefined, { speaker: "robot", meaning: "Dùng mật khẩu mạnh và duy nhất." }),
          makeListenType("Never share your sensitive verification codes with anyone.", "Không bao giờ chia sẻ mã xác thực nhạy cảm của bạn cho bất kỳ ai.", "man"),
          makeRealWord("encryption", true, "Từ có nghĩa: mã hóa dữ liệu"),
          makeRealWord("phishous", false, "Từ giả"),
          makeFillLetters("Enabling two-factor au", "the", "ntication", " dramatically improves security.", "Bật xác thực hai yếu tố cải thiện đáng kể mức độ bảo mật.", "woman"),
          makeBuild("Hãy cảnh giác trước các liên kết đáng ngờ trên mạng.", "Be vigilant against suspicious links on the internet", ["Be", "vigilant", "against", "suspicious", "links", "on", "the", "internet", "trust"], "boy"),
          makeTypeMissing("Keep your operating system updated to defend against cyber _____.", "threats", "Cập nhật hệ điều hành thường xuyên để phòng vệ trước các mối đe dọa không gian mạng.", "girl"),
          makeChoice("Hình thức lừa đảo gửi email giả mạo để lấy cắp mật khẩu gọi là:", "Fraudulent credential theft", "Phishing", "Surfing", "Gaming", undefined, { speaker: "mascot", meaning: "Tấn công lừa đảo là Phishing." }),
          makeListenType("Data privacy is a fundamental right in the modern digital age.", "Quyền riêng tư dữ liệu là quyền cơ bản trong kỷ nguyên số hiện đại.", "zombie"),
          makeRealWord("vulnerability", true, "Từ có nghĩa: lỗ hổng bảo mật"),
          makeRealWord("firewalled", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Trí tuệ nhân tạo & Tự động hóa tương lai",
        order: 4,
        vocab: [
          { en: "Artificial Intelligence", vi: "Trí tuệ nhân tạo", example: { en: "Artificial intelligence transforms healthcare.", vi: "Trí tuệ nhân tạo đang biến đổi ngành y tế." }, image: "/robot.svg" },
          { en: "Automation", vi: "Sự tự động hóa", example: { en: "Factory automation increases productivity.", vi: "Tự động hóa nhà máy gia tăng năng suất." }, image: "/boy.svg" },
          { en: "Machine learning", vi: "Học máy", example: { en: "Machine learning models identify complex patterns.", vi: "Các mô hình học máy nhận diện những mẫu hình phức tạp." }, image: "/girl.svg" },
          { en: "Efficiency", vi: "Hiệu suất / Tính hiệu quả", example: { en: "Improve energy efficiency in buildings.", vi: "Nâng cao hiệu suất năng lượng trong các tòa nhà." }, image: "/man.svg" },
          { en: "Future", vi: "Tương lai", example: { en: "Shape the technological future.", vi: "Định hình tương lai công nghệ." }, image: "/woman.svg" },
          { en: "Transform", vi: "Chuyển đổi toàn diện", example: { en: "Digital tools transform how we learn.", vi: "Các công cụ số biến đổi hoàn toàn cách chúng ta học." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Thuật ngữ viết tắt AI là của cụm từ nào?", "What does AI stand for?", "Artificial Intelligence", "Automatic Internet", "Applied Information", undefined, { speaker: "robot", meaning: "AI là viết tắt của Artificial Intelligence." }),
          makeListenType("Artificial intelligence enhances human capabilities in problem solving.", "Trí tuệ nhân tạo nâng cao năng lực giải quyết vấn đề của con người.", "girl"),
          makeRealWord("automation", true, "Từ có nghĩa: tự động hóa"),
          makeRealWord("intelligize", false, "Từ giả"),
          makeFillLetters("Machine learning models re", "qu", "ire", " massive datasets for training.", "Các mô hình học máy đòi hỏi tập dữ liệu khổng lồ để huấn luyện.", "boy"),
          makeBuild("Công nghệ mới mang lại nhiều cơ hội phát triển.", "New technologies bring many opportunities for development", ["New", "technologies", "bring", "many", "opportunities", "for", "development", "bad"], "man"),
          makeTypeMissing("Automation optimizes repetitive tasks and improves operational _____.", "efficiency", "Tự động hóa tối ưu hóa các tác vụ lặp lại và nâng cao hiệu quả vận hành.", "woman"),
          makeChoice("Mục tiêu của công nghệ tự động hóa là:", "Purpose of automation", "Reduce human error and increase productivity", "Cause more problems", "Slow down processes", undefined, { speaker: "mascot", meaning: "Giảm sai sót và tăng năng suất lao động." }),
          makeListenType("Ethical considerations are paramount when designing autonomous systems.", "Các cân nhắc về đạo đức là tối quan trọng khi thiết kế hệ thống tự hành.", "zombie"),
          makeRealWord("algorithm", true, "Từ có nghĩa: thuật toán"),
          makeRealWord("efficience", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 7",
        order: 5,
        vocab: [
          { en: "Digital", vi: "Kỹ thuật số", example: { en: "Thrive in the digital era.", vi: "Phát triển thịnh vượng trong kỷ nguyên số." }, image: "/robot.svg" },
          { en: "Revolution", vi: "Cuộc cách mạng", example: { en: "The industrial revolution changed society.", vi: "Cuộc cách mạng công nghiệp đã thay đổi xã hội." }, image: "/man.svg" },
          { en: "Empower", vi: "Trao quyền / Nâng cao năng lực", example: { en: "Education empowers future generations.", vi: "Giáo dục trao quyền cho các thế hệ tương lai." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 7: 'Technological tools _____ individuals to learn and create freely.'", "Impact of technology", "empower", "disable", "destroy", undefined, { speaker: "mascot", meaning: "Công nghệ trao quyền (empower) cho cá nhân học tập và sáng tạo." }),
          makeListenType("The digital revolution continues to reshape global industries and daily life.", "Cuộc cách mạng kỹ thuật số tiếp tục định hình lại các ngành công nghiệp và đời sống.", "girl"),
          makeRealWord("cybersecurity", true, "Từ có nghĩa: an ninh mạng"),
          makeRealWord("digitallize", false, "Từ giả"),
          makeFillLetters("Data encryption ens", "ur", "es", " safe communication across networks.", "Mã hóa dữ liệu đảm bảo liên lạc an toàn trên các mạng lưới.", "boy"),
          makeBuild("Hãy sử dụng công nghệ một cách thông minh và có trách nhiệm.", "Use technology intelligently and responsibly for the greater good", ["Use", "technology", "intelligently", "and", "responsibly", "for", "the", "greater", "good", "bad"], "man"),
          makeTypeMissing("Digital literacy is a vital skill in the twenty-first _____.", "century", "Hiểu biết công nghệ số là kỹ năng sống còn trong thế kỷ hai mươi mốt.", "woman"),
          makeListenType("Continuous learning enables us to keep pace with rapid innovations.", "Việc học tập không ngừng giúp chúng ta bắt kịp những đổi mới nhanh chóng.", "robot"),
          makeRealWord("transformation", true, "Từ có nghĩa: sự chuyển đổi"),
          makeRealWord("revolutional", false, "Từ giả"),
          makeChoice("Thái độ tích cực nhất với công nghệ mới là:", "Best mindset for new tech", "Learn continuously and adapt responsibly", "Reject everything", "Ignore safety", undefined, { speaker: "zombie", meaning: "Học tập không ngừng và thích nghi có trách nhiệm." }),
          makeFillLetters("Knowledge is the master k", "e", "y", " to unlocking technological potential.", "Tri thức là chiếc chìa khóa vạn năng mở khóa tiềm năng công nghệ.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 8: MÔI TRƯỜNG, BIẾN ĐỔI KHÍ HẬU & BỀN VỮNG (B2)
  // =========================================================================
  {
    title: "Chương 8: Môi trường, Biến đổi khí hậu & Bền vững (B2)",
    description: "Nắm vững vốn từ vựng sinh thái học, bảo vệ động thực vật, năng lượng tái tạo và lối sống xanh.",
    order: 8,
    lessons: [
      {
        title: "Bài 1: Thiên nhiên, Rừng nhiệt đới & Hệ sinh thái",
        order: 1,
        vocab: [
          { en: "Ecosystem", vi: "Hệ sinh thái", example: { en: "Coral reefs are fragile ecosystems.", vi: "Rạn san hô là những hệ sinh thái mong manh." }, image: "/mascot.svg" },
          { en: "Biodiversity", vi: "Đa dạng sinh học", example: { en: "Tropical rainforests have rich biodiversity.", vi: "Rừng mưa nhiệt đới có độ đa dạng sinh học phong phú." }, image: "/girl.svg" },
          { en: "Habitat", vi: "Môi trường sống tự nhiên", example: { en: "Protect natural habitats of rare species.", vi: "Bảo vệ môi trường sống tự nhiên của các loài hiếm." }, image: "/boy.svg" },
          { en: "Conservation", vi: "Công tác bảo tồn", example: { en: "Wildlife conservation requires global effort.", vi: "Bảo tồn động vật hoang dã cần nỗ lực toàn cầu." }, image: "/man.svg" },
          { en: "Extinction", vi: "Sự tuyệt chủng", example: { en: "Prevent endangered animals from extinction.", vi: "Ngăn chặn các loài động vật nguy cấp khỏi tuyệt chủng." }, image: "/woman.svg" },
          { en: "Species", vi: "Loài sinh vật", example: { en: "Thousands of endemic plant species.", vi: "Hàng ngàn loài thực vật đặc hữu." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Nơi sinh sống tự nhiên của động thực vật hoang dã được gọi là:", "Natural living environment", "Habitat", "Factory", "Highway", undefined, { speaker: "girl", meaning: "Môi trường sống tự nhiên là Habitat." }),
          makeListenType("Tropical rainforests generate a significant portion of oxygen on Earth.", "Các khu rừng mưa nhiệt đới tạo ra một phần oxy đáng kể trên Trái Đất.", "boy"),
          makeRealWord("biodiversity", true, "Từ có nghĩa: đa dạng sinh học"),
          makeRealWord("ecosystemed", false, "Từ giả"),
          makeFillLetters("Human activities can thr", "ea", "ten", " delicate natural habitats.", "Hoạt động của con người có thể đe dọa các môi trường sống tự nhiên nhạy cảm.", "man"),
          makeBuild("Chúng ta cần bảo vệ động vật hoang dã nguy cấp.", "We must protect endangered wildlife from extinction", ["We", "must", "protect", "endangered", "wildlife", "from", "extinction", "destroy"], "woman"),
          makeTypeMissing("Preserving rich _____ ensures stability and balance in nature.", "biodiversity", "Bảo tồn sự đa dạng sinh học phong phú đảm bảo ổn định và cân bằng tự nhiên.", "robot"),
          makeChoice("Hành động bảo tồn rừng và thiên nhiên nhằm mục đích gì?", "Aim of conservation", "Maintain ecological balance for future generations", "Cut down all trees", "Build concrete cities", undefined, { speaker: "mascot", meaning: "Duy trì cân bằng sinh thái cho các thế hệ tương lai." }),
          makeListenType("National parks preserve pristine landscapes and magnificent wildlife.", "Các vườn quốc gia bảo tồn cảnh quan nguyên sơ và thế giới hoang dã tráng lệ.", "zombie"),
          makeRealWord("endangered", true, "Từ có nghĩa: có nguy cơ tuyệt chủng"),
          makeRealWord("conservatize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Ô nhiễm môi trường & Rác thải nhựa",
        order: 2,
        vocab: [
          { en: "Pollution", vi: "Sự ô nhiễm", example: { en: "Air pollution harms respiratory health.", vi: "Ô nhiễm không khí gây hại cho đường hô hấp." }, image: "/man.svg" },
          { en: "Emission", vi: "Khí thải công nghiệp", example: { en: "Reduce greenhouse gas emissions.", vi: "Cắt giảm lượng khí thải nhà kính." }, image: "/boy.svg" },
          { en: "Recyclable", vi: "Có thể tái chế", example: { en: "Separate recyclable materials from trash.", vi: "Phân loại vật liệu có thể tái chế khỏi rác thải." }, image: "/girl.svg" },
          { en: "Decompose", vi: "Phân hủy sinh học", example: { en: "Plastic bags take centuries to decompose.", vi: "Túi nilon mất nhiều thế kỷ để phân hủy." }, image: "/robot.svg" },
          { en: "Contaminate", vi: "Làm ô nhiễm / Đầu độc nguồn nước", example: { en: "Industrial waste contaminates rivers.", vi: "Chất thải công nghiệp làm ô nhiễm nguồn nước sông." }, image: "/woman.svg" },
          { en: "Single-use", vi: "Dùng một lần", example: { en: "Ban single-use plastic straws and cups.", vi: "Cấm các loại ống hút và cốc nhựa dùng một lần." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vật dụng nào sau đây mất hàng trăm năm mới phân hủy được?", "Slow to decompose", "Plastic bag", "Banana peel", "Paper napkin", undefined, { speaker: "man", meaning: "Túi nilon (Plastic bag) mất hàng trăm năm mới phân hủy." }),
          makeListenType("Reducing plastic consumption protects marine life and clean oceans.", "Giảm tiêu thụ đồ nhựa giúp bảo vệ sinh vật biển và làm sạch đại dương.", "woman"),
          makeRealWord("contamination", true, "Từ có nghĩa: sự làm ô nhiễm"),
          makeRealWord("pollutive", false, "Từ giả"),
          makeFillLetters("Many cities are wo", "rk", "ing", " hard to cut down carbon emissions.", "Nhiều thành phố đang nỗ lực cắt giảm lượng khí thải carbon.", "boy"),
          makeBuild("Chúng ta nên phân loại rác trước khi vứt.", "We should separate garbage before throwing it away", ["We", "should", "separate", "garbage", "before", "throwing", "it", "away", "never"], "girl"),
          makeTypeMissing("Industrial facilities must filter toxic gases before _____ them.", "releasing", "Các cơ sở công nghiệp phải lọc khí độc trước khi thải chúng ra môi trường.", "robot"),
          makeChoice("Giải pháp nào sau đây là thân thiện với môi trường nhất?", "Eco-friendly choice", "Using reusable cloth bags for shopping", "Throwing trash into rivers", "Burning plastic waste", undefined, { speaker: "mascot", meaning: "Dùng túi vải tái sử dụng khi đi mua sắm." }),
          makeListenType("Microplastics have been detected in remote ocean trenches.", "Hạt vi nhựa đã được phát hiện ở cả những rãnh đại dương xa xôi nhất.", "zombie"),
          makeRealWord("degradable", true, "Từ có nghĩa: có thể phân hủy"),
          makeRealWord("recycledly", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Năng lượng tái tạo & Năng lượng xanh",
        order: 3,
        vocab: [
          { en: "Renewable", vi: "Tái tạo được", example: { en: "Switch to renewable energy sources.", vi: "Chuyển sang các nguồn năng lượng tái tạo." }, image: "/robot.svg" },
          { en: "Solar energy", vi: "Năng lượng mặt trời", example: { en: "Install rooftop solar energy panels.", vi: "Lắp đặt các tấm pin năng lượng mặt trời trên mái." }, image: "/girl.svg" },
          { en: "Wind turbine", vi: "Tua-bin gió", example: { en: "Wind turbines generate clean electricity.", vi: "Các tua-bin gió tạo ra điện năng sạch." }, image: "/man.svg" },
          { en: "Sustainable", vi: "Bền vững lâu dài", example: { en: "Build sustainable communities.", vi: "Xây dựng các cộng đồng bền vững." }, image: "/woman.svg" },
          { en: "Fossil fuel", vi: "Nhiên liệu hóa thạch", example: { en: "Coal and oil are finite fossil fuels.", vi: "Than đá và dầu mỏ là các nhiên liệu hóa thạch hữu hạn." }, image: "/boy.svg" },
          { en: "Transition", vi: "Quá trình chuyển đổi", example: { en: "The transition toward green energy.", vi: "Quá trình chuyển đổi sang năng lượng xanh." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Nguồn năng lượng nào sau đây là năng lượng tái tạo?", "Renewable energy source", "Solar and wind energy", "Coal", "Petroleum", undefined, { speaker: "robot", meaning: "Năng lượng mặt trời và gió là năng lượng tái tạo." }),
          makeListenType("Solar panels harvest sunlight to produce sustainable electricity.", "Các tấm pin mặt trời thu nạp ánh sáng để sản xuất điện năng bền vững.", "boy"),
          makeRealWord("sustainable", true, "Từ có nghĩa: bền vững"),
          makeRealWord("renewablous", false, "Từ giả"),
          makeFillLetters("Wind power is a cl", "e", "an", " and inexhaustible energy source.", "Năng lượng gió là một nguồn năng lượng sạch và vô tận.", "girl"),
          makeBuild("Nhiên liệu hóa thạch gây ra ô nhiễm không khí nặng nề.", "Fossil fuels cause severe air pollution and smog", ["Fossil", "fuels", "cause", "severe", "air", "pollution", "and", "smog", "clean"], "man"),
          makeTypeMissing("Countries are investing heavily in _____ energy infrastructure.", "renewable", "Các quốc gia đang đầu tư mạnh mẽ vào hạ tầng năng lượng tái tạo.", "woman"),
          makeChoice("Ưu điểm lớn nhất của năng lượng mặt trời và gió là:", "Major benefit of green energy", "They do not produce harmful carbon emissions", "They run out quickly", "They are very dirty", undefined, { speaker: "mascot", meaning: "Chúng không phát thải khí carbon gây hại." }),
          makeListenType("Hydropower and geothermal energy also play vital roles.", "Thủy điện và địa nhiệt cũng đóng những vai trò tối quan trọng.", "zombie"),
          makeRealWord("efficiency", true, "Từ có nghĩa: hiệu suất năng lượng"),
          makeRealWord("turbinize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Biến đổi khí hậu & Trách nhiệm toàn cầu",
        order: 4,
        vocab: [
          { en: "Climate change", vi: "Biến đổi khí hậu", example: { en: "Combat the global impact of climate change.", vi: "Đấu tranh chống lại tác động toàn cầu của biến đổi khí hậu." }, image: "/mascot.svg" },
          { en: "Global warming", vi: "Sự nóng lên toàn cầu", example: { en: "Global warming melts polar ice caps.", vi: "Sự nóng lên toàn cầu làm tan các chỏm băng ở cực." }, image: "/man.svg" },
          { en: "Carbon footprint", vi: "Dấu chân carbon", example: { en: "Reduce your individual carbon footprint.", vi: "Cắt giảm dấu chân carbon cá nhân của bạn." }, image: "/woman.svg" },
          { en: "Drought", vi: "Hạn hán", example: { en: "Prolonged drought affects agriculture.", vi: "Hạn hán kéo dài làm ảnh hưởng tới nông nghiệp." }, image: "/boy.svg" },
          { en: "Sea level", vi: "Mực nước biển", example: { en: "Rising sea levels threaten coastal areas.", vi: "Mực nước biển dâng đe dọa các vùng duyên hải." }, image: "/girl.svg" },
          { en: "Initiative", vi: "Sáng kiến hành động", example: { en: "Join local tree planting initiatives.", vi: "Tham gia các sáng kiến trồng cây tại địa phương." }, image: "/robot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hiện tượng nhiệt độ Trái Đất tăng dần theo thời gian gọi là:", "Rising Earth temperature", "Global warming", "Ice age", "Local breeze", undefined, { speaker: "man", meaning: "Nóng lên toàn cầu là Global warming." }),
          makeListenType("Rising global temperatures result in more frequent extreme weather events.", "Nhiệt độ toàn cầu tăng dẫn đến các hiện tượng thời tiết cực đoan thường xuyên hơn.", "woman"),
          makeRealWord("footprint", true, "Từ có nghĩa: dấu chân / lượng phát thải"),
          makeRealWord("droughtish", false, "Từ giả"),
          makeFillLetters("Planting native trees hel", "p", "s", " absorb atmospheric carbon dioxide.", "Trồng cây bản địa giúp hấp thụ khí carbon dioxide trong khí quyển.", "boy"),
          makeBuild("Bảo vệ hành tinh là trách nhiệm chung của nhân loại.", "Protecting the planet is a shared responsibility of humanity", ["Protecting", "the", "planet", "is", "a", "shared", "responsibility", "of", "humanity"], "girl"),
          makeTypeMissing("Melting glaciers contribute directly to rising _____ levels.", "sea", "Băng tan đóng góp trực tiếp vào việc làm mực nước biển dâng cao.", "robot"),
          makeChoice("Mỗi cá nhân có thể làm gì để giảm dấu chân carbon?", "How to reduce carbon footprint", "Save electricity and use public transit", "Waste water", "Leave lights on all day", undefined, { speaker: "mascot", meaning: "Tiết kiệm điện và sử dụng phương tiện công cộng." }),
          makeListenType("Collective small actions lead to massive positive environmental impact.", "Những hành động nhỏ gộp lại tạo nên tác động môi trường tích cực to lớn.", "zombie"),
          makeRealWord("sustainable", true, "Từ có nghĩa: mang tính bền vững"),
          makeRealWord("climatical", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 8",
        order: 5,
        vocab: [
          { en: "Stewardship", vi: "Tinh thần gìn giữ bảo bọc", example: { en: "Environmental stewardship for the planet.", vi: "Tinh thần gìn giữ môi trường cho hành tinh." }, image: "/mascot.svg" },
          { en: "Harmony", vi: "Sự hài hòa với thiên nhiên", example: { en: "Live in harmony with the environment.", vi: "Sống hài hòa với môi trường tự nhiên." }, image: "/girl.svg" },
          { en: "Preserve", vi: "Bảo tồn nguyên vẹn", example: { en: "Preserve nature for our children.", vi: "Bảo tồn thiên nhiên cho con em chúng ta." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 8: 'Living in _____ with nature ensures a prosperous and healthy future.'", "Relationship with nature", "harmony", "conflict", "destruction", undefined, { speaker: "mascot", meaning: "Sống hài hòa (harmony) với tự nhiên." }),
          makeListenType("Clean air, abundant water and lush forests are precious gifts to treasure.", "Không khí trong lành, nguồn nước dồi dào và rừng xanh tốt là món quà quý giá.", "girl"),
          makeRealWord("preservation", true, "Từ có nghĩa: sự bảo tồn gìn giữ"),
          makeRealWord("stewardize", false, "Từ giả"),
          makeFillLetters("Every citizen has a d", "u", "ty", " to protect our fragile environment.", "Mỗi công dân đều có nghĩa vụ bảo vệ môi trường mong manh của chúng ta.", "boy"),
          makeBuild("Hành động vì màu xanh hôm nay cho tương lai ngày mai.", "Act for a green today and a brighter tomorrow", ["Act", "for", "a", "green", "today", "and", "a", "brighter", "tomorrow", "destroy"], "man"),
          makeTypeMissing("Sustainable living is not a trend, but a moral _____.", "necessity", "Lối sống bền vững không phải là trào lưu, mà là một sự tất yếu đạo đức.", "woman"),
          makeListenType("Together we can reverse environmental damage through wise choices.", "Cùng nhau chúng ta có thể đảo ngược thiệt hại môi trường bằng những lựa chọn sáng suốt.", "robot"),
          makeRealWord("restoration", true, "Từ có nghĩa: sự phục hồi sinh thái"),
          makeRealWord("harmonizey", false, "Từ giả"),
          makeChoice("Thông điệp cốt lõi của Chương 8 về môi trường là:", "Core message of Chapter 8", "Respect nature, conserve resources, and build a sustainable world", "Consume as much as possible", "Ignore pollution", undefined, { speaker: "zombie", meaning: "Tôn trọng thiên nhiên, bảo tồn tài nguyên và kiến tạo thế giới bền vững." }),
          makeFillLetters("The Earth does not belong to us; we be", "lo", "ng", " to the Earth.", "Trái Đất không thuộc về chúng ta; chính chúng ta thuộc về Trái Đất.", "mascot")
        ),
      },
    ],
  },
];

