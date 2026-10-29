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

export const c2UnitsData: SeedUnit[] = [
  // =========================================================================
  // CHƯƠNG 13: TINH HOA VĂN HỌC, NGÔN NGỮ HỌC & NGHỆ THUẬT BIỂU ĐẠT (C2)
  // =========================================================================
  {
    title: "Chương 13: Văn học, Ngôn ngữ học & Biểu đạt (C2)",
    description: "Chạm tới đỉnh cao ngôn ngữ học, nghệ thuật tu từ, thi pháp học và văn phong kinh điển của các bậc thầy ngôn từ.",
    order: 13,
    lessons: [
      {
        title: "Bài 1: Cú pháp học, Ngữ nghĩa & Nguồn gốc từ vựng",
        order: 1,
        vocab: [
          { en: "Etymology", vi: "Từ nguyên học", example: { en: "Etymology traces the ancient origins of words.", vi: "Từ nguyên học truy dấu cội nguồn cổ xưa của từ vựng." }, image: "/man.svg" },
          { en: "Syntax", vi: "Cú pháp học", example: { en: "Syntax dictates word order in complex sentences.", vi: "Cú pháp học chi phối trật tự từ trong các câu phức hợp." }, image: "/woman.svg" },
          { en: "Semantics", vi: "Ngữ nghĩa học", example: { en: "Semantics analyzes subtle shades of meaning.", vi: "Ngữ nghĩa học phân tích những sắc thái nghĩa tinh tế." }, image: "/boy.svg" },
          { en: "Pragmatics", vi: "Ngữ dụng học", example: { en: "Pragmatics interprets language in social context.", vi: "Ngữ dụng học diễn giải ngôn ngữ trong ngữ cảnh xã hội." }, image: "/girl.svg" },
          { en: "Morphology", vi: "Hình thái học", example: { en: "Morphology studies internal word structure.", vi: "Hình thái học nghiên cứu cấu trúc bên trong của từ." }, image: "/robot.svg" },
          { en: "Phonology", vi: "Ngữ âm học", example: { en: "Phonology examines systematic sound patterns.", vi: "Ngữ âm học khảo sát các hệ thống âm thanh có quy luật." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Ngành nghiên cứu lịch sử nguồn gốc và sự biến đổi của từ ngữ là:", "Study of word origins", "Etymology", "Entomology", "Ecology", undefined, { speaker: "man", meaning: "Từ nguyên học là Etymology." }),
          makeListenType("Etymology reveals how ancient civilizations shaped our contemporary vocabulary.", "Từ nguyên học hé lộ cách các nền văn minh cổ đại đã định hình vốn từ vựng hiện đại của chúng ta.", "woman"),
          makeRealWord("etymology", true, "Từ có nghĩa: từ nguyên học"),
          makeRealWord("syntactical", true, "Từ có nghĩa: thuộc về cú pháp"),
          makeFillLetters("Pragmatics considers the speaker's in", "te", "ntion", " beyond literal vocabulary.", "Ngữ dụng học xem xét ý định của người nói vượt ra ngoài câu chữ nghĩa đen.", "boy"),
          makeBuild("Cú pháp học nghiên cứu trật tự cấu thành câu trong ngôn ngữ.", "Syntax studies the principles by which sentences are constructed", ["Syntax", "studies", "the", "principles", "by", "which", "sentences", "are", "constructed", "destroyed"], "girl"),
          makeTypeMissing("The study of linguistic meaning and interpretation is known as _____.", "semantics", "Ngành nghiên cứu ý nghĩa và diễn giải ngôn ngữ được gọi là ngữ nghĩa học (semantics).", "robot"),
          makeChoice("Ngành ngôn ngữ học nghiên cứu cách ngôn từ hoạt động trong ngữ cảnh giao tiếp thực tế là:", "Language in real context", "Pragmatics", "Arithmetic", "Geology", undefined, { speaker: "mascot", meaning: "Ngữ dụng học là Pragmatics." }),
          makeListenType("Linguistic nuance allows writers to convey profound aesthetic dimensions.", "Sắc thái ngôn ngữ tinh tế cho phép nhà văn truyền tải những chiều kích thẩm mỹ sâu xa.", "zombie"),
          makeRealWord("morphological", true, "Từ có nghĩa: thuộc về hình thái học"),
          makeRealWord("pragmatical", true, "Từ có nghĩa: mang tính ngữ dụng")
        ),
      },
      {
        title: "Bài 2: Biện pháp tu từ, Ẩn dụ & Thi pháp học",
        order: 2,
        vocab: [
          { en: "Metaphor", vi: "Phép ẩn dụ nghệ thuật", example: { en: "Life is a journey is a universal metaphor.", vi: "Cuộc đời là một chuyến hành trình là phép ẩn dụ phổ quát." }, image: "/woman.svg" },
          { en: "Allegory", vi: "Truyện ngụ ngôn / Biểu tượng ám chỉ", example: { en: "Animal Farm is a famous political allegory.", vi: "Trại súc vật là một câu chuyện ngụ ngôn chính trị nổi tiếng." }, image: "/man.svg" },
          { en: "Juxtaposition", vi: "Phép đặt cạnh nhau để tương phản", example: { en: "The juxtaposition of extreme wealth and poverty.", vi: "Sự đặt cạnh nhau tương phản giữa giàu sang và nghèo khó." }, image: "/girl.svg" },
          { en: "Irony", vi: "Nghệ thuật châm biếm mỉa mai", example: { en: "Dramatic irony enriches the tragic plot.", vi: "Nghịch lý kịch tính làm phong phú cốt truyện bi kịch." }, image: "/boy.svg" },
          { en: "Poetics", vi: "Thi pháp học", example: { en: "Aristotle's Poetics established literary criticism.", vi: "Tác phẩm Thi pháp học của Aristotle đặt nền móng cho phê bình văn học." }, image: "/robot.svg" },
          { en: "Hyperbole", vi: "Phép ngoa dụ / Phóng đại", example: { en: "Poets use hyperbole to heighten emotional intensity.", vi: "Các nhà thơ dùng ngoa dụ để đẩy cao cường độ cảm xúc." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Biện pháp nghệ thuật so sánh ngầm hai sự vật mà không dùng từ 'như' gọi là:", "Implicit poetic comparison", "Metaphor", "Simile", "Literal fact", undefined, { speaker: "woman", meaning: "Phép ẩn dụ là Metaphor." }),
          makeListenType("Juxtaposition of light and darkness accentuates moral ambiguity in the novel.", "Sự đặt cạnh nhau của ánh sáng và bóng tối làm nổi bật sự mơ hồ về đạo đức trong cuốn tiểu thuyết.", "man"),
          makeRealWord("juxtaposition", true, "Từ có nghĩa: phép tương phản đặt cạnh nhau"),
          makeRealWord("allegorical", true, "Từ có nghĩa: mang tính ngụ ngôn biểu tượng"),
          makeFillLetters("Dramatic ir", "o", "ny", " creates palpable tension between audience and stage.", "Nghịch lý kịch tính tạo ra sự căng thẳng rõ rệt giữa khán giả và sân khấu kịch.", "girl"),
          makeBuild("Tác phẩm ngụ ngôn truyền tải những bài học triết lý sâu sắc.", "An allegory conveys profound philosophical insights beneath simple stories", ["An", "allegory", "conveys", "profound", "philosophical", "insights", "beneath", "simple", "stories"], "boy"),
          makeTypeMissing("The author employs deliberate _____ to emphasize the speaker's despair.", "hyperbole", "Tác giả sử dụng phép ngoa dụ (hyperbole) có chủ ý để nhấn mạnh nỗi tuyệt vọng của nhân vật.", "robot"),
          makeChoice("Tác phẩm văn học mang tầng nghĩa biểu tượng ẩn dụ sâu sắc cho thực tế chính trị là:", "Story with deeper symbolic meaning", "Allegory", "Grocery list", "Manual", undefined, { speaker: "mascot", meaning: "Ngụ ngôn biểu tượng là Allegory." }),
          makeListenType("Mastery of rhetorical devices elevates prose into timeless poetic art.", "Làm chủ các biện pháp tu từ nâng tầm văn xuôi thành nghệ thuật thi ca vượt thời gian.", "zombie"),
          makeRealWord("metaphorical", true, "Từ có nghĩa: mang tính ẩn dụ"),
          makeRealWord("hyperbolize", true, "Từ có nghĩa: phóng đại / ngoa dụ")
        ),
      },
      {
        title: "Bài 3: Tinh hoa Văn học kinh điển thế giới",
        order: 3,
        vocab: [
          { en: "Masterpiece", vi: "Kiệt tác bất hủ", example: { en: "Shakespeare created enduring literary masterpieces.", vi: "Shakespeare đã sáng tác nên những kiệt tác văn chương bất hủ." }, image: "/man.svg" },
          { en: "Catharsis", vi: "Sự thanh lọc tâm hồn", example: { en: "Tragedy induces emotional and spiritual catharsis.", vi: "Bi kịch mang lại sự thanh lọc cảm xúc và tâm hồn." }, image: "/woman.svg" },
          { en: "Soliloquy", vi: "Độc thoại nội tâm sân khấu", example: { en: "Hamlet's soliloquy contemplates existence and death.", vi: "Độc thoại của Hamlet suy ngẫm về sự tồn tại và cái chết." }, image: "/boy.svg" },
          { en: "Protagonist", vi: "Nhân vật chính diện", example: { en: "The protagonist confronts harrowing existential dilemmas.", vi: "Nhân vật chính diện đối mặt với những nan đề tồn vong nghiệt ngã." }, image: "/girl.svg" },
          { en: "Archetype", vi: "Hình mẫu nguyên khởi", example: { en: "The hero's journey is a primordial archetype.", vi: "Hành trình người anh hùng là một hình mẫu nguyên khởi nguyên thủy." }, image: "/robot.svg" },
          { en: "Narrative", vi: "Nghệ thuật dẫn chuyện", example: { en: "Nonlinear narrative techniques captivate readers.", vi: "Kỹ thuật dẫn chuyện phi tuyến tính lôi cuốn người đọc." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Cảm giác thanh thản, gột rửa tâm hồn sau khi xem một tác phẩm bi kịch gọi là:", "Aristotelian emotional purging", "Catharsis", "Boredom", "Apathy", undefined, { speaker: "man", meaning: "Sự thanh lọc tâm hồn là Catharsis." }),
          makeListenType("Classic literature explores the eternal triumphs and tragedies of the human condition.", "Văn học kinh điển khám phá những vinh quang và bi kịch muôn thuở của thân phận con người.", "woman"),
          makeRealWord("catharsis", true, "Từ có nghĩa: sự thanh lọc tâm hồn"),
          makeRealWord("protagonist", true, "Từ có nghĩa: nhân vật chính"),
          makeFillLetters("The hero's quest reflects a universal arc", "he", "type", " deeply embedded in culture.", "Sứ mệnh người anh hùng phản ánh một hình mẫu nguyên khởi ăn sâu vào văn hóa.", "boy"),
          makeBuild("Đoạn độc thoại nội tâm bộc lộ những xung đột giằng xé nhất.", "The dramatic soliloquy unveils the character's most turbulent inner conflicts", ["The", "dramatic", "soliloquy", "unveils", "the", "character's", "most", "turbulent", "inner", "conflicts"], "girl"),
          makeTypeMissing("The tragic _____ is brought low by their own fatal flaw, or hamartia.", "protagonist", "Nhân vật chính bi kịch bị hạ bệ bởi chính gót chân Asin hay sai lầm định mệnh của họ.", "robot"),
          makeChoice("Đoạn nhân vật một mình trên sân khấu nói to suy nghĩ trong lòng gọi là:", "Speaking thoughts alone on stage", "Soliloquy", "Dialogue", "Silence", undefined, { speaker: "mascot", meaning: "Độc thoại nội tâm là Soliloquy." }),
          makeListenType("Enduring literary works resonate across cultural boundaries and centuries.", "Những tác phẩm văn chương bất hủ luôn ngân vang qua mọi ranh giới văn hóa và thế kỷ.", "zombie"),
          makeRealWord("archetypal", true, "Từ có nghĩa: thuộc về hình mẫu nguyên khởi"),
          makeRealWord("soliloquize", true, "Từ có nghĩa: độc thoại")
        ),
      },
      {
        title: "Bài 4: Phong cách học & Nghệ thuật bút chiến đỉnh cao",
        order: 4,
        vocab: [
          { en: "Eloquence", vi: "Tài hùng biện lưu loát", example: { en: "His speeches possessed mesmerizing poetic eloquence.", vi: "Các bài diễn văn của ông mang tài hùng biện thi ca đầy mê hoặc." }, image: "/woman.svg" },
          { en: "Nuance", vi: "Sắc thái tinh tế", example: { en: "Capture the finest nuances of philosophical thought.", vi: "Nắm bắt những sắc thái tinh vi nhất của tư tưởng triết học." }, image: "/man.svg" },
          { en: "Polemic", vi: "Bút chiến / Tranh luận bút chiến", example: { en: "A passionate polemic against social injustice.", vi: "Một bài bút chiến nảy lửa chống lại bất công xã hội." }, image: "/robot.svg" },
          { en: "Epigram", vi: "Câu danh ngôn súc tích sắc sảo", example: { en: "Oscar Wilde was famed for brilliant epigrams.", vi: "Oscar Wilde nổi tiếng với những câu danh ngôn sắc sảo." }, image: "/boy.svg" },
          { en: "Stylistics", vi: "Phong cách học", example: { en: "Stylistics analyzes tone, cadence, and diction.", vi: "Phong cách học phân tích giọng điệu, nhịp điệu và việc dùng từ." }, image: "/girl.svg" },
          { en: "Sublime", vi: "Cái cao cả / Tuyệt mỹ siêu phàm", example: { en: "The sublime beauty of romantic landscape poetry.", vi: "Vẻ đẹp tuyệt mỹ siêu phàm của thi ca cảnh sắc lãng mạn." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Năng lực diễn đạt tư tưởng trôi chảy, giàu sức truyền cảm và tao nhã gọi là:", "Fluent, persuasive and elegant speech", "Eloquence", "Muttering", "Silence", undefined, { speaker: "woman", meaning: "Tài hùng biện lưu loát là Eloquence." }),
          makeListenType("Masterful prose balances precision, aesthetic cadence, and conceptual depth.", "Văn xuôi bậc thầy cân bằng giữa tính chuẩn xác, nhịp điệu thẩm mỹ và chiều sâu khái niệm.", "man"),
          makeRealWord("eloquence", true, "Từ có nghĩa: tài hùng biện"),
          makeRealWord("epigrammatic", true, "Từ có nghĩa: súc tích / ngắn gọn sắc sảo"),
          makeFillLetters("True mastery of language resides in commanding the finest nua", "nc", "es", ".", "Sự tinh thông ngôn ngữ đích thực nằm ở việc làm chủ những sắc thái vi tế nhất.", "boy"),
          makeBuild("Bài bút chiến sắc sảo vạch trần những giáo điều lỗi thời.", "A brilliant polemic dismantles outdated dogmas with uncompromising intellectual rigor", ["A", "brilliant", "polemic", "dismantles", "outdated", "dogmas", "with", "uncompromising", "intellectual", "rigor"], "girl"),
          makeTypeMissing("An _____ is a concise, witty statement expressing a paradoxical truth.", "epigram", "Một câu danh ngôn (epigram) là phát biểu ngắn gọn, hóm hỉnh diễn đạt chân lý nghịch lý.", "robot"),
          makeChoice("Khái niệm triết học mô tả vẻ đẹp vượt trội khiến tâm hồn rung động choáng ngợp là:", "Grandeur beyond comparison", "The sublime", "The mundane", "The average", undefined, { speaker: "mascot", meaning: "Cái cao cả siêu phàm là The sublime." }),
          makeListenType("Language is the most sophisticated instrument of human consciousness and spirit.", "Ngôn ngữ là nhạc cụ tinh vi nhất của ý thức và tâm hồn con người.", "zombie"),
          makeRealWord("polemical", true, "Từ có nghĩa: mang tính bút chiến"),
          makeRealWord("stylistic", true, "Từ có nghĩa: thuộc về phong cách nghệ thuật")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 13",
        order: 5,
        vocab: [
          { en: "Inimitable", vi: "Độc nhất vô nhị / Không thể bắt chước", example: { en: "An inimitable literary voice and style.", vi: "Một giọng văn và phong cách độc nhất vô nhị không thể sao chép." }, image: "/mascot.svg" },
          { en: "Quintessence", vi: "Tinh hoa cô đọng", example: { en: "The quintessence of poetic craftsmanship.", vi: "Tinh hoa cô đọng của nghệ thuật thi ca." }, image: "/robot.svg" },
          { en: "Immortal", vi: "Bất tử / Sống mãi với thời gian", example: { en: "Immortal verses echoing across millennia.", vi: "Những vần thơ bất tử ngân vang qua hàng thiên niên kỷ." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 13: 'The purest, most concentrated essence of an art form is its _____.'", "Most concentrated essence", "quintessence", "imitation", "ruin", undefined, { speaker: "mascot", meaning: "Tinh hoa cô đọng là Quintessence." }),
          makeListenType("Literature gives immortal voice to the silent yearnings and wonders of the soul.", "Văn học trao tiếng nói bất tử cho những khát vọng và sự kinh ngạc thầm kín của tâm hồn.", "girl"),
          makeRealWord("quintessence", true, "Từ có nghĩa: tinh hoa cốt tủy"),
          makeRealWord("inimitable", true, "Từ có nghĩa: độc nhất không thể bắt chước"),
          makeFillLetters("Great writing immortal", "iz", "es", " moments of transient beauty forever.", "Trang viết vĩ đại bất tử hóa những khoảnh khắc đẹp thoáng qua mãi mãi.", "boy"),
          makeBuild("Ngôn từ có sức mạnh lay động hàng triệu trái tim nhân loại.", "Words possess the extraordinary power to move millions of human souls", ["Words", "possess", "the", "extraordinary", "power", "to", "move", "millions", "of", "human", "souls"], "man"),
          makeTypeMissing("A truly great author possesses an _____ voice that defies easy imitation.", "inimitable", "Một tác gia thực sự vĩ đại sở hữu giọng văn độc nhất vô nhị (inimitable) không thể sao chép.", "woman"),
          makeListenType("To master a language at the C2 level is to dance upon the peaks of human thought.", "Làm chủ một ngôn ngữ ở trình độ C2 là khiêu vũ trên những đỉnh cao của tư tưởng nhân loại.", "robot"),
          makeRealWord("linguistics", true, "Từ có nghĩa: ngôn ngữ học"),
          makeRealWord("craftsmanship", true, "Từ có nghĩa: sự tài hoa / tay nghề bậc thầy"),
          makeChoice("Giá trị tối cao của văn học đối với nền văn minh nhân loại là:", "Supreme value of literature", "Preserve human wisdom, foster universal empathy, and elevate the soul", "Sell books quickly", "Fill empty shelves", undefined, { speaker: "zombie", meaning: "Lưu giữ sự thông thái, nuôi dưỡng lòng thấu cảm phổ quát và nâng tầm tâm hồn." }),
          makeFillLetters("Language is the living mem", "or", "y", " of human civilization.", "Ngôn ngữ là ký ức sống động của cả nền văn minh nhân loại.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 14: NGOẠI GIAO QUỐC TẾ & VƯƠNG MIỆN TỐI CAO C2 (CROWN CAPSTONE)
  // =========================================================================
  {
    title: "Chương 14: Ngoại giao quốc tế & Vương miện C2 (C2)",
    description: "Đại thử thách tốt nghiệp trình độ C2: nghệ thuật ngoại giao đa phương, đàm phán hòa bình và trật tự thế giới.",
    order: 14,
    lessons: [
      {
        title: "Bài 1: Địa chính trị toàn cầu & Ngoại giao đa phương",
        order: 1,
        vocab: [
          { en: "Geopolitics", vi: "Địa chính trị", example: { en: "Geopolitics shapes international trade corridors.", vi: "Địa chính trị định hình các hành lang thương mại quốc tế." }, image: "/man.svg" },
          { en: "Multilateral", vi: "Đa phương", example: { en: "Strengthen multilateral alliances across continents.", vi: "Củng cố các liên minh đa phương xuyên lục địa." }, image: "/woman.svg" },
          { en: "Sovereignty", vi: "Chủ quyền quốc gia thiêng liêng", example: { en: "Respect the territorial sovereignty of nations.", vi: "Tôn trọng chủ quyền lãnh thổ của các quốc gia." }, image: "/boy.svg" },
          { en: "Diplomacy", vi: "Ngoại giao", example: { en: "Prevent conflicts through quiet bilateral diplomacy.", vi: "Ngăn chặn xung đột thông qua ngoại giao song phương hòa giải." }, image: "/girl.svg" },
          { en: "Treaty", vi: "Hiệp ước quốc tế", example: { en: "Ratify the nuclear non-proliferation treaty.", vi: "Phê chuẩn hiệp ước bất phổ biến vũ khí hạt nhân." }, image: "/robot.svg" },
          { en: "Alliance", vi: "Liên minh đồng minh", example: { en: "Forge enduring strategic alliances.", vi: "Xây dựng các liên minh chiến lược bền vững." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Quyền tối cao và độc lập tự quyết của một quốc gia trong lãnh thổ gọi là:", "Supreme authority over territory", "Sovereignty", "Dependency", "Subjugation", undefined, { speaker: "man", meaning: "Chủ quyền quốc gia là Sovereignty." }),
          makeListenType("Multilateral diplomacy remains the most effective instrument for international peace.", "Ngoại giao đa phương vẫn là công cụ hiệu quả nhất cho hòa bình quốc tế.", "woman"),
          makeRealWord("geopolitics", true, "Từ có nghĩa: địa chính trị"),
          makeRealWord("multilateralism", true, "Từ có nghĩa: chủ nghĩa đa phương"),
          makeFillLetters("Nations sign mut", "u", "al", " defense treaties to deter external aggression.", "Các quốc gia ký kết hiệp ước phòng thủ chung để ngăn chặn ngoại xâm.", "boy"),
          makeBuild("Tôn trọng chủ quyền và toàn vẹn lãnh thổ là nguyên tắc cơ bản.", "Respect for national sovereignty and territorial integrity is a fundamental principle", ["Respect", "for", "national", "sovereignty", "and", "territorial", "integrity", "is", "a", "fundamental", "principle"], "girl"),
          makeTypeMissing("Diplomats negotiate international _____ to formalize peace agreements.", "treaties", "Các nhà ngoại giao đàm phán hiệp ước quốc tế (treaties) để chính thức hóa hòa bình.", "robot"),
          makeChoice("Mối quan hệ hợp tác chính trị và quân sự giữa các quốc gia là:", "Formal strategic partnership", "Alliance", "Hostility", "Rivalry", undefined, { speaker: "mascot", meaning: "Liên minh đồng minh là Alliance." }),
          makeListenType("Constructive statecraft balances national interest with global harmony.", "Nghệ thuật trị quốc sáng suốt cân bằng lợi ích dân tộc với sự hòa hợp toàn cầu.", "zombie"),
          makeRealWord("diplomatic", true, "Từ có nghĩa: thuộc về ngoại giao"),
          makeRealWord("sovereignly", true, "Từ có nghĩa: một cách có chủ quyền")
        ),
      },
      {
        title: "Bài 2: Đàm phán cấp nhà nước & Giải quyết xung đột",
        order: 2,
        vocab: [
          { en: "Mediation", vi: "Sự trung gian hòa giải", example: { en: "International mediation resolved the border crisis.", vi: "Hòa giải trung gian quốc tế đã giải quyết cuộc khủng hoảng biên giới." }, image: "/woman.svg" },
          { en: "Concession", vi: "Sự nhượng bộ chiến lược", example: { en: "Make mutual concessions to finalize agreements.", vi: "Đưa ra nhượng bộ lẫn nhau để hoàn tất thỏa thuận." }, image: "/man.svg" },
          { en: "Protocol", vi: "Nghi thức ngoại giao / Nghị định thư", example: { en: "Follow strict diplomatic protocol during state visits.", vi: "Tuân thủ nghi thức ngoại giao nghiêm ngặt trong chuyến thăm cấp nhà nước." }, image: "/robot.svg" },
          { en: "Compromise", vi: "Thỏa hiệp mang tính xây dựng", example: { en: "A fair compromise averts military confrontation.", vi: "Một thỏa hiệp công bằng ngăn ngừa xung đột quân sự." }, image: "/boy.svg" },
          { en: "Resolution", vi: "Nghị quyết hòa bình", example: { en: "Adopt the United Nations Security Council resolution.", vi: "Thông qua nghị quyết của Hội đồng Bảo an Liên Hợp Quốc." }, image: "/girl.svg" },
          { en: "Armistice", vi: "Hiệp định đình chiến", example: { en: "Sign a formal armistice ending hostilities.", vi: "Ký kết hiệp định đình chiến chính thức chấm dứt giao tranh." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hành động của bên thứ ba đứng ra dàn xếp tranh chấp giữa hai quốc gia là:", "Third-party conflict resolution", "Mediation", "Invasion", "Blockade", undefined, { speaker: "woman", meaning: "Hòa giải trung gian là Mediation." }),
          makeListenType("Diplomatic compromise does not signify weakness; it is the pinnacle of strategic wisdom.", "Thỏa hiệp ngoại giao không biểu hiện sự yếu hèn; đó là đỉnh cao của sự khôn ngoan chiến lược.", "man"),
          makeRealWord("armistice", true, "Từ có nghĩa: hiệp định đình chiến"),
          makeRealWord("conciliatory", true, "Từ có nghĩa: mang tính hòa giải"),
          makeFillLetters("Envoys worked tire", "le", "ssly", " to broker an immediate and lasting ceasefire.", "Các đặc phái viên nỗ lực không mệt mỏi để dàn xếp thỏa thuận ngừng bắn ngay lập tức.", "boy"),
          makeBuild("Hòa bình bền vững đòi hỏi sự chân thành và nhượng bộ lẫn nhau.", "Lasting peace requires genuine sincerity and mutual strategic concessions", ["Lasting", "peace", "requires", "genuine", "sincerity", "and", "mutual", "strategic", "concessions"], "girl"),
          makeTypeMissing("The United Nations Security Council unanimously adopted the peace _____.", "resolution", "Hội đồng Bảo an Liên Hợp Quốc nhất trí thông qua nghị quyết (resolution) hòa bình.", "robot"),
          makeChoice("Hiệp ước thỏa thuận ngừng mọi hành động quân sự thù địch gọi là:", "Agreement to end hostilities", "Armistice", "Declaration of war", "Sanction", undefined, { speaker: "mascot", meaning: "Hiệp định đình chiến là Armistice." }),
          makeListenType("Patience and strategic empathy are indispensable virtues in high-stakes negotiations.", "Kiên nhẫn và thấu cảm chiến lược là những phẩm chất không thể thiếu trong đàm phán quan trọng.", "zombie"),
          makeRealWord("protocol", true, "Từ có nghĩa: nghi thức ngoại giao"),
          makeRealWord("mediator", true, "Từ có nghĩa: người hòa giải")
        ),
      },
      {
        title: "Bài 3: Luật pháp quốc tế & Hiến chương Liên Hợp Quốc",
        order: 3,
        vocab: [
          { en: "Jurisdiction", vi: "Thẩm quyền tài phán", example: { en: "The International Court of Justice has global jurisdiction.", vi: "Tòa án Công lý Quốc tế có thẩm quyền tài phán toàn cầu." }, image: "/man.svg" },
          { en: "Charter", vi: "Hiến chương thành lập", example: { en: "Uphold the principles of the United Nations Charter.", vi: "Thượng tôn các nguyên tắc của Hiến chương Liên Hợp Quốc." }, image: "/woman.svg" },
          { en: "Sanction", vi: "Biện pháp trừng phạt kinh tế", example: { en: "Impose economic sanctions against treaty violators.", vi: "Áp đặt trừng phạt kinh tế chống lại những kẻ vi phạm hiệp ước." }, image: "/boy.svg" },
          { en: "Ratification", vi: "Sự phê chuẩn văn kiện", example: { en: "Parliamentary ratification makes the treaty law.", vi: "Sự phê chuẩn của quốc hội biến hiệp ước thành luật." }, image: "/girl.svg" },
          { en: "Extradition", vi: "Sự dẫn độ tội phạm", example: { en: "Sign a bilateral extradition treaty.", vi: "Ký kết hiệp ước dẫn độ song phương." }, image: "/robot.svg" },
          { en: "Jurisprudence", vi: "Khoa học luật pháp / Án lệ học", example: { en: "International human rights jurisprudence.", vi: "Khoa học luật pháp quốc tế về quyền con người." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Văn kiện nền tảng quy định mục tiêu và nguyên tắc hoạt động của Liên Hợp Quốc là:", "Foundational UN legal document", "The United Nations Charter", "The Magna Carta", "The Commercial Code", undefined, { speaker: "man", meaning: "Hiến chương Liên Hợp Quốc là UN Charter." }),
          makeListenType("International law establishes civilized norms for peaceful coexistence among nations.", "Luật pháp quốc tế thiết lập những chuẩn mực văn minh cho sự cùng chung sống hòa bình giữa các dân tộc.", "woman"),
          makeRealWord("jurisprudence", true, "Từ có nghĩa: khoa học luật pháp"),
          makeRealWord("ratification", true, "Từ có nghĩa: sự phê chuẩn"),
          makeFillLetters("Economic san", "ct", "ions", " deter unlawful aggression without armed conflict.", "Các biện pháp trừng phạt kinh tế ngăn chặn xâm lược trái phép mà không cần xung đột vũ trang.", "boy"),
          makeBuild("Tòa án quốc tế bảo vệ công lý và thượng tôn pháp luật.", "The international court upholds justice and the global rule of law", ["The", "international", "court", "upholds", "justice", "and", "the", "global", "rule", "of", "law"], "girl"),
          makeTypeMissing("The treaty enters into force upon official _____ by member states.", "ratification", "Hiệp ước có hiệu lực thi hành ngay sau sự phê chuẩn (ratification) chính thức của các nước.", "robot"),
          makeChoice("Quyền hợp pháp của một cơ quan tư pháp để xét xử một vụ việc gọi là:", "Legal power to judge cases", "Jurisdiction", "Insubordination", "Anarchy", undefined, { speaker: "mascot", meaning: "Thẩm quyền tài phán là Jurisdiction." }),
          makeListenType("The universal declaration of human rights affirms the inherent dignity of all people.", "Tuyên ngôn quốc tế về nhân quyền khẳng định phẩm giá vốn có của mọi con người.", "zombie"),
          makeRealWord("jurisdiction", true, "Từ có nghĩa: thẩm quyền tài phán"),
          makeRealWord("extradite", true, "Từ có nghĩa: dẫn độ")
        ),
      },
      {
        title: "Bài 4: Trật tự thế giới & Tầm nhìn tương lai nhân loại",
        order: 4,
        vocab: [
          { en: "Multipolar", vi: "Trật tự đa cực", example: { en: "A multipolar world with diverse power centers.", vi: "Một thế giới đa cực với nhiều trung tâm quyền lực đa dạng." }, image: "/robot.svg" },
          { en: "Hegemony", vi: "Sự bá quyền thống trị", example: { en: "Reject imperialist hegemony and coercion.", vi: "Bác bỏ sự bá quyền và cưỡng ép kiểu đế quốc." }, image: "/man.svg" },
          { en: "Peacebuilding", vi: "Công cuộc kiến tạo hòa bình", example: { en: "Invest in post-conflict peacebuilding initiatives.", vi: "Đầu tư vào các sáng kiến kiến tạo hòa bình hậu xung đột." }, image: "/woman.svg" },
          { en: "Stewardship", vi: "Trách nhiệm quản trị toàn cầu", example: { en: "Global stewardship of common planetary resources.", vi: "Trách nhiệm quản trị toàn cầu đối với tài nguyên chung của hành tinh." }, image: "/girl.svg" },
          { en: "Interdependence", vi: "Sự phụ thuộc gắn kết lẫn nhau", example: { en: "Economic interdependence discourages major wars.", vi: "Sự phụ thuộc gắn kết kinh tế lẫn nhau ngăn ngừa chiến tranh lớn." }, image: "/boy.svg" },
          { en: "Solidarity", vi: "Tinh thần đoàn kết quốc tế", example: { en: "Foster international solidarity in times of crisis.", vi: "Nuôi dưỡng tinh thần đoàn kết quốc tế trong các thời kỳ khủng hoảng." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Trật tự thế giới trong đó quyền lực được chia sẻ giữa nhiều quốc gia lớn gọi là:", "World with multiple power centers", "Multipolar world order", "Unipolar hegemony", "Monarchy", undefined, { speaker: "robot", meaning: "Trật tự thế giới đa cực là Multipolar world." }),
          makeListenType("Global challenges like climate change demand unprecedented international solidarity.", "Những thách thức toàn cầu như biến đổi khí hậu đòi hỏi tinh thần đoàn kết quốc tế chưa từng có.", "man"),
          makeRealWord("interdependence", true, "Từ có nghĩa: sự phụ thuộc lẫn nhau"),
          makeRealWord("hegemonic", true, "Từ có nghĩa: mang tính bá quyền"),
          makeFillLetters("Sustainable peacebuilding ad", "dr", "esses", " the root causes of civil strife.", "Kiến tạo hòa bình bền vững giải quyết tận gốc rễ những nguyên nhân gây nội chiến.", "woman"),
          makeBuild("Tương lai chung của Trái Đất thuộc về toàn thể nhân loại.", "The collective future of our planet belongs to all of humanity", ["The", "collective", "future", "of", "our", "planet", "belongs", "to", "all", "of", "humanity"], "boy"),
          makeTypeMissing("Deep economic _____ makes armed conflict mutually catastrophic for all nations.", "interdependence", "Sự phụ thuộc lẫn nhau sâu sắc về kinh tế khiến xung đột vũ trang trở thành thảm họa cho tất cả.", "girl"),
          makeChoice("Thái độ đúng đắn nhất đối với các thách thức sinh tồn toàn cầu là:", "Response to global existential threats", "Global cooperation and collective stewardship", "Isolationism", "Aggression", undefined, { speaker: "mascot", meaning: "Hợp tác toàn cầu và trách nhiệm quản trị chung." }),
          makeListenType("True security arises not from weapons, but from justice, cooperation and mutual trust.", "An ninh thực sự không đến từ vũ khí, mà đến từ công lý, hợp tác và niềm tin lẫn nhau.", "zombie"),
          makeRealWord("multipolarity", true, "Từ có nghĩa: tính đa cực"),
          makeRealWord("solidarity", true, "Từ có nghĩa: tình đoàn kết")
        ),
      },
      {
        title: "Bài 5: ĐẠI THỬ THÁCH VƯƠNG MIỆN TỐI CAO C2 (CROWN CAPSTONE)",
        order: 5,
        vocab: [
          { en: "Mastery", vi: "Sự làm chủ tuyệt đỉnh", example: { en: "Celebrate the ultimate mastery of the English language.", vi: "Tôn vinh sự làm chủ tuyệt đỉnh ngôn ngữ tiếng Anh." }, image: "/mascot.svg" },
          { en: "Culmination", vi: "Đỉnh cao kết tinh", example: { en: "The culmination of years of dedicated scholarship.", vi: "Đỉnh cao kết tinh của nhiều năm học thuật bền bỉ." }, image: "/robot.svg" },
          { en: "Polymath", vi: "Bậc học giả thông tuệ vạn vật", example: { en: "A modern polymath commanding art and science.", vi: "Một học giả thông tuệ làm chủ cả nghệ thuật và khoa học." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("VƯƠNG MIỆN TỐI CAO C2: 'How do you say: Tôi đã chinh phục đỉnh cao C2 và làm chủ hoàn toàn tiếng Anh'?", "Ultimate C2 graduation statement", "I have attained C2 mastery and unlocked the infinite potential of language!", "I cannot speak English.", "I am still a beginner.", undefined, { speaker: "mascot", meaning: "Tôi đã đạt đỉnh cao C2 và mở khóa tiềm năng vô hạn của ngôn ngữ!" }),
          makeListenType("Congratulations! You have conquered all fourteen chapters of TrioLingo English mastery.", "Chúc mừng! Bạn đã chinh phục toàn bộ mười bốn chương trình độ tiếng Anh xuất sắc của TrioLingo.", "girl"),
          makeRealWord("polymath", true, "Từ có nghĩa: nhà thông thái uyên bác mọi ngành"),
          makeRealWord("culmination", true, "Từ có nghĩa: đỉnh cao kết tinh"),
          makeFillLetters("Every great intellectual journey cul", "mi", "nates", " in wisdom and humility.", "Mọi hành trình trí tuệ vĩ đại đều kết tinh trong sự thông thái và khiêm nhường.", "boy"),
          makeBuild("Bạn đã hoàn thành xuất sắc toàn bộ khóa học tiếng Anh.", "You have successfully achieved the highest level of English excellence", ["You", "have", "successfully", "achieved", "the", "highest", "level", "of", "English", "excellence"], "man"),
          makeTypeMissing("Lifelong learning transforms a student into an erudite _____.", "polymath", "Học tập suốt đời biến một học sinh thành một bậc học giả thông tuệ (polymath).", "woman"),
          makeListenType("Mastery of language is the supreme passport to global leadership and enduring wisdom.", "Làm chủ ngôn ngữ là tấm hộ chiếu tối thượng dẫn tới năng lực lãnh đạo toàn cầu và sự thông thái.", "robot"),
          makeRealWord("statesmanship", true, "Từ có nghĩa: tài năng trị quốc và ngoại giao"),
          makeRealWord("unflinching", true, "Từ có nghĩa: kiên định không chùn bước"),
          makeChoice("Tâm thế của một người làm chủ ngôn ngữ ở cấp độ C2 là:", "The true mindset of a C2 master", "Lifelong humility, unquenchable curiosity, and dedication to uplifting others", "Arrogance and bragging", "Stopping learning forever", undefined, { speaker: "zombie", meaning: "Khiêm nhường trọn đời, không ngừng hiếu kỳ và cống hiến nâng tầm người khác." }),
          makeFillLetters("Wear your C2 crown with pr", "i", "de", " and illuminate the world!", "Hãy đội chiếc vương miện C2 với niềm tự hào và thắp sáng thế giới!", "mascot")
        ),
      },
    ],
  },
];

