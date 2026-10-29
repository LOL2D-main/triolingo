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

export const c1UnitsData: SeedUnit[] = [
  // =========================================================================
  // CHƯƠNG 9: TƯ DUY PHẢN BIỆN, HỌC THUẬT & PHƯƠNG PHÁP NGHIÊN CỨU (C1)
  // =========================================================================
  {
    title: "Chương 9: Tư duy phản biện, Học thuật & Nghiên cứu (C1)",
    description: "Nâng cao năng lực tư duy phản biện, phương pháp luận nghiên cứu khoa học, thẩm định chéo và hùng biện học thuật.",
    order: 9,
    lessons: [
      {
        title: "Bài 1: Giả thuyết, Bằng chứng & Phản biện khoa học",
        order: 1,
        vocab: [
          { en: "Hypothesis", vi: "Giả thuyết khoa học", example: { en: "Formulate a testable scientific hypothesis.", vi: "Đưa ra một giả thuyết khoa học có thể kiểm chứng được." }, image: "/man.svg" },
          { en: "Empirical", vi: "Mang tính thực nghiệm", example: { en: "Gather empirical evidence through observation.", vi: "Thu thập bằng chứng thực nghiệm qua quan sát." }, image: "/woman.svg" },
          { en: "Critique", vi: "Bài phê bình / Phản biện", example: { en: "Provide a constructive intellectual critique.", vi: "Đưa ra lời phản biện mang tính xây dựng tri thức." }, image: "/boy.svg" },
          { en: "Premise", vi: "Tiền đề lập luận", example: { en: "The argument rests on a flawed premise.", vi: "Lập luận này dựa trên một tiền đề có thiếu sót." }, image: "/girl.svg" },
          { en: "Deductive", vi: "Mang tính diễn dịch", example: { en: "Deductive reasoning leads to valid conclusions.", vi: "Lập luận diễn dịch dẫn đến những kết luận xác đáng." }, image: "/robot.svg" },
          { en: "Assertion", vi: "Sự khẳng định / Quả quyết", example: { en: "Support your assertions with verified data.", vi: "Bảo vệ các khẳng định của bạn bằng dữ liệu đã kiểm chứng." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Nhận định cần được kiểm chứng bằng thực nghiệm trong nghiên cứu khoa học gọi là:", "Scientific assumption to test", "Hypothesis", "Superstition", "Gossip", undefined, { speaker: "man", meaning: "Giả thuyết khoa học là Hypothesis." }),
          makeListenType("Empirical evidence forms the cornerstone of rigorous scientific inquiry.", "Bằng chứng thực nghiệm tạo nên nền tảng của quá trình nghiên cứu khoa học chuẩn mực.", "woman"),
          makeRealWord("hypothesis", true, "Từ có nghĩa: giả thuyết"),
          makeRealWord("empiricize", false, "Từ giả"),
          makeFillLetters("Researchers must cr", "it", "ique", " existing assumptions before publishing.", "Các nhà nghiên cứu phải phản biện các giả định hiện hữu trước khi công bố.", "boy"),
          makeBuild("Lập luận vững chắc phải dựa trên tiền đề đúng đắn.", "A sound argument must be grounded in valid premises", ["A", "sound", "argument", "must", "be", "grounded", "in", "valid", "premises", "false"], "girl"),
          makeTypeMissing("Deductive reasoning moves from general theories to specific _____.", "observations", "Lập luận diễn dịch đi từ lý thuyết tổng quát đến những quan sát cụ thể.", "robot"),
          makeChoice("Từ nào mô tả bằng chứng rút ra từ thực tế quan sát và thí nghiệm?", "Based on observation", "Empirical", "Mythological", "Fictional", undefined, { speaker: "mascot", meaning: "Dựa trên thực nghiệm là Empirical." }),
          makeListenType("Critical thinking requires questioning dogma and evaluating source credibility.", "Tư duy phản biện đòi hỏi việc hoài nghi giáo điều và thẩm định độ tin cậy của nguồn.", "zombie"),
          makeRealWord("rationality", true, "Từ có nghĩa: tính duy lý / hợp lý"),
          makeRealWord("deductious", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Phương pháp luận & Phân tích định lượng",
        order: 2,
        vocab: [
          { en: "Methodology", vi: "Hệ phương pháp luận", example: { en: "Explain the research methodology clearly.", vi: "Giải thích hệ phương pháp luận nghiên cứu một cách rõ ràng." }, image: "/robot.svg" },
          { en: "Quantitative", vi: "Mang tính định lượng", example: { en: "Quantitative analysis uses statistical data.", vi: "Phân tích định lượng sử dụng dữ liệu thống kê." }, image: "/girl.svg" },
          { en: "Qualitative", vi: "Mang tính định tính", example: { en: "Qualitative research explores human experiences.", vi: "Nghiên cứu định tính khám phá những trải nghiệm của con người." }, image: "/boy.svg" },
          { en: "Correlation", vi: "Mối tương quan", example: { en: "Correlation does not necessarily imply causation.", vi: "Tương quan không nhất thiết hàm ý có quan hệ nhân quả." }, image: "/man.svg" },
          { en: "Variable", vi: "Biến số nghiên cứu", example: { en: "Isolate independent and dependent variables.", vi: "Tách bạch biến số độc lập và biến số phụ thuộc." }, image: "/woman.svg" },
          { en: "Validity", vi: "Độ chuẩn xác / Tính hiệu lực", example: { en: "Ensure the internal validity of the experiment.", vi: "Đảm bảo tính hiệu lực nội tại của thí nghiệm." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Quy tắc vàng trong thống kê học: 'Correlation does not imply _____.'", "Famous statistical rule", "Causation", "Calculation", "Observation", undefined, { speaker: "robot", meaning: "Tương quan không đồng nghĩa với quan hệ nhân quả (Causation)." }),
          makeListenType("A robust research methodology minimizes systemic bias and experimental error.", "Một phương pháp luận vững vàng sẽ giảm thiểu sai số hệ thống và sai số thí nghiệm.", "girl"),
          makeRealWord("quantitative", true, "Từ có nghĩa: mang tính định lượng"),
          makeRealWord("methodologize", false, "Từ giả"),
          makeFillLetters("Statistical si", "gn", "ificance", " confirms that the pattern is not random.", "Ý nghĩa thống kê xác nhận rằng mẫu hình này không phải do ngẫu nhiên.", "man"),
          makeBuild("Phương pháp định tính giúp hiểu sâu hơn về hành vi con người.", "Qualitative methods provide deeper insights into human behavior", ["Qualitative", "methods", "provide", "deeper", "insights", "into", "human", "behavior", "destroy"], "woman"),
          makeTypeMissing("The researcher carefully controlled every external _____ in the trial.", "variable", "Nhà nghiên cứu đã kiểm soát cẩn thận từng biến số ngoại lai trong thử nghiệm.", "boy"),
          makeChoice("Phương pháp nghiên cứu dựa trên các con số và phép đo toán học gọi là:", "Research using numbers", "Quantitative research", "Poetic research", "Casual conversation", undefined, { speaker: "mascot", meaning: "Nghiên cứu định lượng là Quantitative research." }),
          makeListenType("Replicability is essential for confirming the validity of scientific findings.", "Khả năng tái lập là điều thiết yếu để xác nhận độ chuẩn xác của các phát hiện khoa học.", "zombie"),
          makeRealWord("statistical", true, "Từ có nghĩa: mang tính thống kê"),
          makeRealWord("validitate", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Trích dẫn học thuật, Đạo đức & Thẩm định chéo",
        order: 3,
        vocab: [
          { en: "Peer-review", vi: "Thẩm định chéo bởi chuyên gia", example: { en: "Publish papers in peer-reviewed journals.", vi: "Xuất bản bài báo trên các tạp chí có thẩm định chéo." }, image: "/woman.svg" },
          { en: "Plagiarism", vi: "Hành vi đạo văn", example: { en: "Plagiarism violates academic honesty codes.", vi: "Đạo văn vi phạm quy tắc liêm chính học thuật." }, image: "/man.svg" },
          { en: "Citation", vi: "Trích dẫn nguồn tư liệu", example: { en: "Include accurate bibliographic citations.", vi: "Bổ sung các trích dẫn thư mục chính xác." }, image: "/boy.svg" },
          { en: "Integrity", vi: "Sự liêm chính / Trung thực", example: { en: "Uphold scientific and scholarly integrity.", vi: "Đề cao sự liêm chính trong khoa học và học thuật." }, image: "/girl.svg" },
          { en: "Disseminate", vi: "Phổ biến rộng rãi tri thức", example: { en: "Disseminate groundbreaking research globally.", vi: "Phổ biến rộng rãi nghiên cứu đột phá ra toàn cầu." }, image: "/robot.svg" },
          { en: "Rigorous", vi: "Nghiêm ngặt / Khắt khe", example: { en: "Apply rigorous standards to data analysis.", vi: "Áp dụng các tiêu chuẩn nghiêm ngặt vào phân tích dữ liệu." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hành vi sao chép công trình của người khác mà không dẫn nguồn gọi là:", "Uncredited copying", "Plagiarism", "Citation", "Publication", undefined, { speaker: "woman", meaning: "Đạo văn là Plagiarism." }),
          makeListenType("Academic integrity requires transparent methodologies and proper citations.", "Liêm chính học thuật đòi hỏi phương pháp minh bạch và trích dẫn chuẩn mực.", "man"),
          makeRealWord("plagiarism", true, "Từ có nghĩa: đạo văn"),
          makeRealWord("integritive", false, "Từ giả"),
          makeFillLetters("Manuscripts undergo ri", "go", "rous", " evaluation during peer review.", "Bản thảo trải qua sự đánh giá khắt khe trong quá trình thẩm định chéo.", "boy"),
          makeBuild("Trích dẫn nguồn tư liệu đầy đủ tôn trọng quyền tác giả.", "Accurate citations demonstrate respect for original intellectual property", ["Accurate", "citations", "demonstrate", "respect", "for", "original", "intellectual", "property"], "girl"),
          makeTypeMissing("Scholars publish their discoveries in peer-reviewed _____.", "journals", "Các học giả xuất bản phát hiện của mình trên các tạp chí chuyên ngành có bình duyệt.", "robot"),
          makeChoice("Quy trình chuyên gia cùng ngành phản biện bài báo trước khi in gọi là:", "Expert evaluation before publication", "Peer review", "Proofreading", "Self-editing", undefined, { speaker: "mascot", meaning: "Thẩm định chéo là Peer review." }),
          makeListenType("Open access initiatives help disseminate scientific knowledge to everyone.", "Các sáng kiến truy cập mở giúp phổ biến tri thức khoa học đến mọi người.", "zombie"),
          makeRealWord("scholarly", true, "Từ có nghĩa: mang tính học thuật"),
          makeRealWord("disseminatous", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Hùng biện, Thuyết phục & Tranh luận tri thức",
        order: 4,
        vocab: [
          { en: "Rhetoric", vi: "Nghệ thuật tu từ / Hùng biện", example: { en: "Master the classic art of persuasive rhetoric.", vi: "Làm chủ nghệ thuật tu từ thuyết phục cổ điển." }, image: "/man.svg" },
          { en: "Fallacy", vi: "Ngụy biện logic", example: { en: "Identify cognitive fallacies in the debate.", vi: "Nhận diện những ngụy biện nhận thức trong tranh luận." }, image: "/woman.svg" },
          { en: "Discourse", vi: "Diễn ngôn tri thức", example: { en: "Engage in constructive public discourse.", vi: "Tham gia vào diễn ngôn công chúng mang tính xây dựng." }, image: "/boy.svg" },
          { en: "Rebuttal", vi: "Lời bác bỏ lập luận đối phương", example: { en: "Deliver a compelling and factual rebuttal.", vi: "Đưa ra lời bác bỏ thuyết phục và đầy đủ dẫn chứng." }, image: "/girl.svg" },
          { en: "Coherent", vi: "Mạch lạc / Chặt chẽ", example: { en: "Formulate a coherent and logical argument.", vi: "Xây dựng lập luận mạch lạc và chặt chẽ." }, image: "/robot.svg" },
          { en: "Persuasion", vi: "Sức thuyết phục", example: { en: "The power of reasoned intellectual persuasion.", vi: "Sức mạnh của sự thuyết phục bằng lý lẽ thấu đáo." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Một lập luận sai lầm về mặt logic nhưng nghe có vẻ hợp lý gọi là:", "Flawed logical reasoning", "Fallacy", "Theory", "Fact", undefined, { speaker: "man", meaning: "Ngụy biện logic là Fallacy." }),
          makeListenType("An effective rebuttal dismantles false premises with compelling facts.", "Một lời bác bỏ hiệu quả sẽ đập tan tiền đề sai bằng những sự thật thuyết phục.", "woman"),
          makeRealWord("rhetoric", true, "Từ có nghĩa: nghệ thuật tu từ / hùng biện"),
          makeRealWord("fallacious", true, "Từ có nghĩa: ngụy biện"),
          makeFillLetters("Constructive dis", "co", "urse", " elevates the quality of democratic debate.", "Diễn ngôn xây dựng nâng cao chất lượng của các cuộc tranh luận dân chủ.", "boy"),
          makeBuild("Lập luận chặt chẽ giúp bảo vệ quan điểm vững vàng.", "A coherent argument strengthens your intellectual position", ["A", "coherent", "argument", "strengthens", "your", "intellectual", "position", "weakens"], "girl"),
          makeTypeMissing("Avoid the ad hominem _____ by focusing on the argument itself.", "fallacy", "Tránh ngụy biện công kích cá nhân bằng cách tập trung vào chính lập luận.", "robot"),
          makeChoice("Ba yếu tố kinh điển của nghệ thuật hùng biện Aristotle là:", "Aristotelian rhetoric triad", "Ethos, Pathos, and Logos", "Money, Power, and Fame", "Speed, Sound, and Light", undefined, { speaker: "mascot", meaning: "Đạo đức (Ethos), Cảm xúc (Pathos), và Logic (Logos)." }),
          makeListenType("Intellectual humility enables debaters to listen and refine their ideas.", "Sự khiêm nhường trí tuệ cho phép người tranh biện biết lắng nghe và hoàn thiện ý tưởng.", "zombie"),
          makeRealWord("persuasive", true, "Từ có nghĩa: có tính thuyết phục"),
          makeRealWord("rebuttalize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 9",
        order: 5,
        vocab: [
          { en: "Erudite", vi: "Uyên bác / Học rộng", example: { en: "An erudite scholar in ancient philosophy.", vi: "Một học giả uyên bác về triết học cổ đại." }, image: "/mascot.svg" },
          { en: "Epistemology", vi: "Nhận thức luận", example: { en: "Epistemology investigates the nature of knowledge.", vi: "Nhận thức luận nghiên cứu bản chất của tri thức." }, image: "/robot.svg" },
          { en: "Paradigm", vi: "Mô thức tư duy / Hệ hình", example: { en: "A major paradigm shift in modern science.", vi: "Một bước chuyển dịch hệ hình lớn trong khoa học hiện đại." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 9: 'A profound shift in foundational scientific thinking is a _____ shift.'", "Transformation in scientific thought", "paradigm", "random", "minor", undefined, { speaker: "mascot", meaning: "Chuyển dịch hệ hình tư duy là Paradigm shift." }),
          makeListenType("Rigorous critical thinking liberates the human intellect from prejudice.", "Tư duy phản biện chuẩn mực giải phóng trí tuệ con người khỏi định kiến.", "girl"),
          makeRealWord("epistemology", true, "Từ có nghĩa: nhận thức luận"),
          makeRealWord("eruditious", false, "Từ giả"),
          makeFillLetters("True wisdom begins with re", "co", "gnizing", " the limits of one's knowledge.", "Sự thông thái thực sự bắt đầu bằng việc nhận thức được giới hạn của tri thức bản thân.", "boy"),
          makeBuild("Tri thức chân chính được tôi luyện qua hoài nghi khoa học.", "Genuine knowledge is forged through scientific skepticism", ["Genuine", "knowledge", "is", "forged", "through", "scientific", "skepticism", "ignorance"], "man"),
          makeTypeMissing("The field of _____ examines how we acquire justified true belief.", "epistemology", "Nhận thức luận (epistemology) khảo sát cách thức chúng ta tiếp nhận niềm tin chân lý.", "woman"),
          makeListenType("Evidence-based reasoning remains the most reliable guide to reality.", "Lập luận dựa trên bằng chứng vẫn là kim chỉ nam đáng tin cậy nhất dẫn lối đến thực tại.", "robot"),
          makeRealWord("methodological", true, "Từ có nghĩa: thuộc về phương pháp luận"),
          makeRealWord("paradigmous", false, "Từ giả"),
          makeChoice("Mục đích cao nhất của việc rèn luyện tư duy phản biện cấp độ C1 là:", "Ultimate goal of C1 critical thinking", "Seek truth objectively and reason with intellectual clarity", "Win every argument at any cost", "Criticize others endlessly", undefined, { speaker: "zombie", meaning: "Tìm kiếm chân lý khách quan và lập luận với sự sáng suốt trí tuệ." }),
          makeFillLetters("Reason and inquiry are the pillars of hum", "a", "n", " progress.", "Lý tính và sự tìm tòi là những trụ cột của sự tiến bộ nhân loại.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 10: KINH TẾ HỌC VĨ MÔ, TÀI CHÍNH & ĐẦU TƯ TOÀN CẦU (C1)
  // =========================================================================
  {
    title: "Chương 10: Kinh tế vĩ mô & Tài chính toàn cầu (C1)",
    description: "Thấu hiểu các cơ chế kinh tế vĩ mô, chính sách tiền tệ, thị trường vốn quốc tế và quản trị rủi ro tài chính.",
    order: 10,
    lessons: [
      {
        title: "Bài 1: Lạm phát, Lãi suất & Chính sách tiền tệ",
        order: 1,
        vocab: [
          { en: "Inflation", vi: "Lạm phát kinh tế", example: { en: "Central banks raise interest rates to curb inflation.", vi: "Các ngân hàng trung ương tăng lãi suất để kiềm chế lạm phát." }, image: "/man.svg" },
          { en: "Monetary policy", vi: "Chính sách tiền tệ", example: { en: "Tight monetary policy controls money supply.", vi: "Chính sách tiền tệ thắt chặt kiểm soát lượng cung tiền." }, image: "/woman.svg" },
          { en: "Liquidity", vi: "Tính thanh khoản", example: { en: "Ensure sufficient liquidity in banking systems.", vi: "Đảm bảo tính thanh khoản đầy đủ trong hệ thống ngân hàng." }, image: "/boy.svg" },
          { en: "Interest rate", vi: "Mức lãi suất", example: { en: "Fluctuations in benchmark interest rates.", vi: "Những biến động ở mức lãi suất chuẩn." }, image: "/girl.svg" },
          { en: "Stagflation", vi: "Lạm phát đình đốn", example: { en: "Stagflation combines slow growth and high inflation.", vi: "Lạm phát đình đốn kết hợp tăng trưởng chậm và lạm phát cao." }, image: "/robot.svg" },
          { en: "Purchasing power", vi: "Sức mua của đồng tiền", example: { en: "Inflation erodes consumer purchasing power.", vi: "Lạm phát làm xói mòn sức mua của người tiêu dùng." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Khi giá cả hàng hóa leo thang làm suy giảm sức mua của đồng tiền, đó là:", "Erosion of purchasing power", "Inflation", "Deflation", "Stagnation", undefined, { speaker: "man", meaning: "Lạm phát là Inflation." }),
          makeListenType("Central banks adjust benchmark interest rates to balance inflation and growth.", "Các ngân hàng trung ương điều chỉnh lãi suất chuẩn để cân bằng lạm phát và tăng trưởng.", "woman"),
          makeRealWord("liquidity", true, "Từ có nghĩa: tính thanh khoản"),
          makeRealWord("inflatious", false, "Từ giả"),
          makeFillLetters("Monetary pol", "i", "cy", " dictates the circulation of capital in economies.", "Chính sách tiền tệ chi phối sự lưu thông vốn trong nền kinh tế.", "boy"),
          makeBuild("Lãi suất tăng cao làm hạ nhiệt thị trường vay nợ.", "Higher interest rates cool down borrowing in the market", ["Higher", "interest", "rates", "cool", "down", "borrowing", "in", "the", "market", "boost"], "girl"),
          makeTypeMissing("High inflation diminishes the real _____ of household wages.", "purchasing power", "Lạm phát cao làm suy giảm sức mua thực tế của tiền lương hộ gia đình.", "robot"),
          makeChoice("Tình trạng kinh tế vừa có tăng trưởng trì trệ vừa lạm phát cao gọi là:", "Slow growth plus high inflation", "Stagflation", "Prosperity", "Boom", undefined, { speaker: "mascot", meaning: "Lạm phát đình đốn là Stagflation." }),
          makeListenType("Sufficient market liquidity prevents sudden systemic crises in banking.", "Tính thanh khoản thị trường dồi dào ngăn chặn các cuộc khủng hoảng mang tính hệ thống.", "zombie"),
          makeRealWord("macroeconomic", true, "Từ có nghĩa: thuộc về kinh tế vĩ mô"),
          makeRealWord("stagflationary", true, "Từ có nghĩa: mang tính đình lạm")
        ),
      },
      {
        title: "Bài 2: Thị trường vốn, Chứng khoán & Đầu tư",
        order: 2,
        vocab: [
          { en: "Portfolio", vi: "Danh mục đầu tư", example: { en: "Diversify your investment portfolio across asset classes.", vi: "Đa dạng hóa danh mục đầu tư qua các nhóm tài sản." }, image: "/girl.svg" },
          { en: "Dividend", vi: "Cổ tức chi trả", example: { en: "Shareholders receive quarterly dividend payouts.", vi: "Cổ đông nhận các đợt chi trả cổ tức hàng quý." }, image: "/boy.svg" },
          { en: "Equity", vi: "Vốn chủ sở hữu / Cổ phần", example: { en: "Private equity funds invest in promising startups.", vi: "Các quỹ đầu tư tư nhân đầu tư vào các công ty khởi nghiệp triển vọng." }, image: "/man.svg" },
          { en: "Diversification", vi: "Sự đa dạng hóa rủi ro", example: { en: "Diversification mitigates unexpected portfolio losses.", vi: "Đa dạng hóa giúp giảm thiểu tổn thất bất ngờ trong danh mục." }, image: "/woman.svg" },
          { en: "Yield", vi: "Lợi suất đầu tư", example: { en: "Government bonds offer stable long-term yield.", vi: "Trái phiếu chính phủ mang lại lợi suất dài hạn ổn định." }, image: "/robot.svg" },
          { en: "Volatility", vi: "Độ biến động thị trường", example: { en: "Market volatility creates both risks and opportunities.", vi: "Biến động thị trường tạo ra cả rủi ro lẫn cơ hội." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Chiến lược phân bổ vốn vào nhiều tài sản khác nhau để giảm rủi ro là:", "Risk mitigation by spreading capital", "Diversification", "Speculation", "Gambling", undefined, { speaker: "girl", meaning: "Đa dạng hóa đầu tư là Diversification." }),
          makeListenType("A well-balanced portfolio hedges against market volatility and economic shocks.", "Một danh mục cân bằng tốt phòng ngừa biến động thị trường và các cú sốc kinh tế.", "boy"),
          makeRealWord("volatility", true, "Từ có nghĩa: độ biến động"),
          makeRealWord("portfoliate", false, "Từ giả"),
          makeFillLetters("Companies distribute div", "id", "ends", " from accumulated net profits.", "Các công ty phân phối cổ tức từ lợi nhuận ròng tích lũy.", "man"),
          makeBuild("Đầu tư thông minh đòi hỏi sự kiên nhẫn và kỷ luật.", "Intelligent investing requires extensive research, patience, and discipline", ["Intelligent", "investing", "requires", "extensive", "research", "patience", "and", "discipline"], "woman"),
          makeTypeMissing("Bond investors closely monitor the treasury _____ curve.", "yield", "Các nhà đầu tư trái phiếu theo dõi sát sao đường cong lợi suất kho bạc.", "robot"),
          makeChoice("Phần lợi nhuận công ty chia cho các cổ đông được gọi là:", "Corporate profit distribution", "Dividend", "Fine", "Debt", undefined, { speaker: "mascot", meaning: "Cổ tức là Dividend." }),
          makeListenType("Long-term compound interest produces remarkable exponential capital growth.", "Lãi suất kép dài hạn mang lại sự tăng trưởng vốn theo cấp số nhân đáng kinh ngạc.", "zombie"),
          makeRealWord("shareholder", true, "Từ có nghĩa: cổ đông"),
          makeRealWord("diversificate", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Thương mại quốc tế & Chuỗi cung ứng",
        order: 3,
        vocab: [
          { en: "Tariff", vi: "Thuế quan xuất nhập khẩu", example: { en: "Impose protective tariffs on foreign imports.", vi: "Áp đặt thuế quan bảo hộ lên hàng nhập khẩu nước ngoài." }, image: "/robot.svg" },
          { en: "Globalization", vi: "Toàn cầu hóa", example: { en: "Economic globalization links distant markets.", vi: "Toàn cầu hóa kinh tế liên kết các thị trường xa xôi." }, image: "/man.svg" },
          { en: "Supply chain", vi: "Chuỗi cung ứng", example: { en: "Optimize supply chain efficiency and resilience.", vi: "Tối ưu hóa hiệu quả và khả năng chống chịu của chuỗi cung ứng." }, image: "/woman.svg" },
          { en: "Trade deficit", vi: "Thâm hụt thương mại", example: { en: "A persistent trade deficit impacts domestic currency.", vi: "Thâm hụt thương mại dai dẳng tác động đến đồng nội tệ." }, image: "/boy.svg" },
          { en: "Comparative advantage", vi: "Lợi thế so sánh", example: { en: "Nations specialize based on comparative advantage.", vi: "Các quốc gia chuyên môn hóa dựa trên lợi thế so sánh." }, image: "/girl.svg" },
          { en: "Logistics", vi: "Ngành hậu cần / Tiếp vận", example: { en: "Modern logistics streamline international shipping.", vi: "Hậu cần hiện đại tinh giản hoạt động vận tải quốc tế." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Lý thuyết kinh tế của David Ricardo giải thích tại sao thương mại đem lại lợi ích cho các nước:", "Foundational trade theory", "Comparative advantage", "Absolute monopoly", "Trade barrier", undefined, { speaker: "robot", meaning: "Lợi thế so sánh là Comparative advantage." }),
          makeListenType("Resilient global supply chains are crucial for seamless international commerce.", "Các chuỗi cung ứng toàn cầu kiên cường có ý nghĩa sống còn cho thương mại thông suốt.", "man"),
          makeRealWord("globalization", true, "Từ có nghĩa: toàn cầu hóa"),
          makeRealWord("tariffic", false, "Từ giả"),
          makeFillLetters("Bilateral trade agr", "ee", "ments", " eliminate unnecessary regulatory barriers.", "Các hiệp định thương mại song phương xóa bỏ những rào cản pháp lý không cần thiết.", "woman"),
          makeBuild("Thuế quan ảnh hưởng trực tiếp đến giá bán của hàng nhập khẩu.", "Tariffs directly impact consumer prices of imported goods", ["Tariffs", "directly", "impact", "consumer", "prices", "of", "imported", "goods", "free"], "boy"),
          makeTypeMissing("A country imports more than it exports when running a trade _____.", "deficit", "Một quốc gia nhập siêu nhiều hơn xuất khẩu khi bị thâm hụt thương mại.", "girl"),
          makeChoice("Thuế áp lên hàng hóa vận chuyển qua biên giới quốc tế gọi là:", "Tax on imported goods", "Tariff", "Salary", "Bonus", undefined, { speaker: "mascot", meaning: "Thuế quan nhập khẩu là Tariff." }),
          makeListenType("Digital logistics platforms track cargo movements with real-time precision.", "Các nền tảng hậu cần số theo dõi hành trình hàng hóa với độ chuẩn xác theo thời gian thực.", "zombie"),
          makeRealWord("merchandise", true, "Từ có nghĩa: hàng hóa thương phẩm"),
          makeRealWord("logistian", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Khủng hoảng tài chính & Quản trị rủi ro",
        order: 4,
        vocab: [
          { en: "Recession", vi: "Suy thoái kinh tế", example: { en: "Economic recession dampens consumer spending.", vi: "Suy thoái kinh tế kìm hãm chi tiêu tiêu dùng." }, image: "/man.svg" },
          { en: "Fiscal stimulus", vi: "Gói kích thích tài khóa", example: { en: "Governments deploy fiscal stimulus packages.", vi: "Chính phủ triển khai các gói kích thích tài khóa." }, image: "/woman.svg" },
          { en: "Insolvency", vi: "Tình trạng mất khả năng thanh toán", example: { en: "Overleveraged firms face severe insolvency risk.", vi: "Các công ty dùng đòn bẩy quá mức đối mặt nguy cơ mất thanh khoản." }, image: "/boy.svg" },
          { en: "Resilience", vi: "Khả năng phục hồi kiên cường", example: { en: "Build economic resilience against sudden shocks.", vi: "Xây dựng khả năng phục hồi kinh tế trước các cú sốc bất ngờ." }, image: "/girl.svg" },
          { en: "Austerity", vi: "Chính sách thắt lưng buộc bụng", example: { en: "Austerity measures reduce national budget deficits.", vi: "Các biện pháp thắt lưng buộc bụng giúp giảm thâm hụt ngân sách." }, image: "/robot.svg" },
          { en: "Recovery", vi: "Sự phục hồi kinh tế", example: { en: "Signs of steady economic recovery emerge.", vi: "Những dấu hiệu phục hồi kinh tế vững chắc bắt đầu xuất hiện." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Thời kỳ kinh tế suy giảm liên tiếp trong hai quý trở lên gọi là:", "Two quarters of negative GDP", "Recession", "Hyperinflation", "Economic miracle", undefined, { speaker: "man", meaning: "Suy thoái kinh tế là Recession." }),
          makeListenType("Prudent regulatory frameworks prevent excessive speculation and systemic failure.", "Khung pháp lý thận trọng ngăn chặn đầu cơ quá mức và sự đổ vỡ mang tính hệ thống.", "woman"),
          makeRealWord("resilience", true, "Từ có nghĩa: khả năng phục hồi"),
          makeRealWord("recessionary", true, "Từ có nghĩa: thuộc về suy thoái"),
          makeFillLetters("Governments launch fis", "c", "al", " stimulus to invigorate sluggish demand.", "Chính phủ tung gói kích thích tài khóa để vực dậy tổng cầu suy yếu.", "boy"),
          makeBuild("Quản trị rủi ro là yếu tố sống còn cho mọi thể chế tài chính.", "Risk management is essential for the survival of financial institutions", ["Risk", "management", "is", "essential", "for", "the", "survival", "of", "financial", "institutions"], "girl"),
          makeTypeMissing("Excessive corporate debt leads directly to bankruptcy and _____.", "insolvency", "Nợ doanh nghiệp quá mức dẫn thẳng tới phá sản và mất khả năng thanh toán.", "robot"),
          makeChoice("Biện pháp cắt giảm chi tiêu công để giảm nợ quốc gia gọi là:", "Public spending cuts", "Austerity measures", "Stimulus bonus", "Free subsidies", undefined, { speaker: "mascot", meaning: "Chính sách thắt lưng buộc bụng là Austerity measures." }),
          makeListenType("Sustainable economic recovery requires innovation, productivity and trust.", "Sự phục hồi kinh tế bền vững đòi hỏi đổi mới sáng tạo, năng suất và niềm tin.", "zombie"),
          makeRealWord("prudential", true, "Từ có nghĩa: cẩn trọng / thận trọng"),
          makeRealWord("stimulize", false, "Từ giả")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 10",
        order: 5,
        vocab: [
          { en: "Equilibrium", vi: "Trạng thái cân bằng kinh tế", example: { en: "Market forces establish price equilibrium.", vi: "Các lực lượng thị trường thiết lập thế cân bằng giá cả." }, image: "/mascot.svg" },
          { en: "Prosperity", vi: "Sự thịnh vượng kinh tế", example: { en: "Sound economic policies foster widespread prosperity.", vi: "Chính sách kinh tế đúng đắn nuôi dưỡng sự thịnh vượng rộng khắp." }, image: "/robot.svg" },
          { en: "Sovereign", vi: "Chủ quyền quốc gia / Công nợ quốc gia", example: { en: "Manage sovereign debt responsibly.", vi: "Quản lý nợ công quốc gia một cách có trách nhiệm." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 10: 'When supply equals demand, markets achieve price _____.'", "Supply equals demand", "equilibrium", "chaos", "deficit", undefined, { speaker: "mascot", meaning: "Cung bằng cầu đạt trạng thái cân bằng: Equilibrium." }),
          makeListenType("Financial literacy empowers citizens to make sound investments and build wealth.", "Hiểu biết tài chính giúp người dân đầu tư khôn ngoan và gây dựng sự thịnh vượng.", "girl"),
          makeRealWord("macroeconomics", true, "Từ có nghĩa: kinh tế học vĩ mô"),
          makeRealWord("equilibrize", false, "Từ giả"),
          makeFillLetters("Responsible fiscal stewardship ensures long-term nat", "ion", "al", " prosperity.", "Quản trị tài khóa có trách nhiệm đảm bảo sự thịnh vượng quốc gia lâu dài.", "boy"),
          makeBuild("Kinh tế học vĩ mô nghiên cứu các chỉ số tổng thể của quốc gia.", "Macroeconomics examines the aggregate behavior of national economies", ["Macroeconomics", "examines", "the", "aggregate", "behavior", "of", "national", "economies", "micro"], "man"),
          makeTypeMissing("A strong, stable financial architecture protects societies against systemic _____.", "crises", "Một cấu trúc tài chính vững chắc bảo vệ xã hội trước những cuộc khủng hoảng hệ thống.", "woman"),
          makeListenType("True economic progress creates inclusive opportunities for all members of society.", "Tiến bộ kinh tế đích thực tạo ra cơ hội hòa nhập cho mọi thành viên trong xã hội.", "robot"),
          makeRealWord("sovereignty", true, "Từ có nghĩa: chủ quyền"),
          makeRealWord("prosperous", true, "Từ có nghĩa: thịnh vượng phồn vinh"),
          makeChoice("Bài học quan trọng nhất từ thị trường tài chính toàn cầu là:", "Core takeaway from global markets", "Manage risk prudently, diversify assets, and think long-term", "Put all money in one stock", "Ignore interest rates", undefined, { speaker: "zombie", meaning: "Quản trị rủi ro cẩn trọng, đa dạng hóa tài sản và tư duy dài hạn." }),
          makeFillLetters("Wisdom and foresight are the greatest in", "ve", "stments", " in any economy.", "Sự thông thái và tầm nhìn xa là những khoản đầu tư vĩ đại nhất trong bất kỳ nền kinh tế nào.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 11: KHOA HỌC DỮ LIỆU, TRÍ TUỆ NHÂN TẠO & TƯƠNG LAI CÔNG NGHỆ (C1)
  // =========================================================================
  {
    title: "Chương 11: Dữ liệu lớn, Trí tuệ nhân tạo & Đột phá (C1)",
    description: "Khám phá chiều sâu của khoa học dữ liệu, mô hình học sâu, đạo đức công nghệ và những bước chuyển dịch văn minh tương lai.",
    order: 11,
    lessons: [
      {
        title: "Bài 1: Dữ liệu lớn & Khai phá dữ liệu thông minh",
        order: 1,
        vocab: [
          { en: "Big data", vi: "Dữ liệu lớn", example: { en: "Analyze big data for customer behavioral patterns.", vi: "Phân tích dữ liệu lớn để tìm mẫu hình hành vi khách hàng." }, image: "/robot.svg" },
          { en: "Predictive", vi: "Mang tính dự đoán", example: { en: "Predictive algorithms forecast market trends.", vi: "Thuật toán dự đoán dự báo các xu hướng thị trường." }, image: "/boy.svg" },
          { en: "Mining", vi: "Khai phá (dữ liệu)", example: { en: "Data mining extracts hidden valuable insights.", vi: "Khai phá dữ liệu trích xuất các hiểu biết giá trị tiềm ẩn." }, image: "/girl.svg" },
          { en: "Analytics", vi: "Khoa học phân tích dữ liệu", example: { en: "Advanced analytics improve strategic decisions.", vi: "Khoa học phân tích nâng cao cải thiện các quyết định chiến lược." }, image: "/man.svg" },
          { en: "Correlation", vi: "Tương quan số liệu", example: { en: "Identify statistical correlations across databases.", vi: "Nhận diện những tương quan thống kê xuyên suốt các cơ sở dữ liệu." }, image: "/woman.svg" },
          { en: "Volume", vi: "Dung lượng dữ liệu khổng lồ", example: { en: "Handling the immense volume of real-time streaming data.", vi: "Xử lý dung lượng khổng lồ của dữ liệu luồng theo thời gian thực." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Quá trình tìm kiếm các quy luật và tri thức tiềm ẩn trong tập dữ liệu lớn gọi là:", "Extracting patterns from data", "Data mining", "Data deleting", "Data printing", undefined, { speaker: "robot", meaning: "Khai phá dữ liệu là Data mining." }),
          makeListenType("Big data analytics unlock unprecedented predictive capabilities across industries.", "Phân tích dữ liệu lớn mở ra những năng lực dự đoán chưa từng có cho mọi ngành nghề.", "girl"),
          makeRealWord("predictive", true, "Từ có nghĩa: mang tính dự đoán"),
          makeRealWord("minificate", false, "Từ giả"),
          makeFillLetters("Data engineers cleans", "e", " and structure raw datasets for analysis.", "Các kỹ sư dữ liệu làm sạch và cấu trúc hóa tập dữ liệu thô phục vụ phân tích.", "boy"),
          makeBuild("Dữ liệu là nguồn tài nguyên vô giá của kỷ nguyên số.", "Data is the most valuable resource of the digital age", ["Data", "is", "the", "most", "valuable", "resource", "of", "the", "digital", "age"], "man"),
          makeTypeMissing("The model uses historical data to build accurate _____ forecasts.", "predictive", "Mô hình dùng dữ liệu lịch sử để xây dựng các dự báo mang tính tiên tri chuẩn xác.", "woman"),
          makeChoice("Đặc trưng cơ bản của Big Data thường được mô tả qua mô hình:", "Characteristics of Big Data", "Volume, Velocity, and Variety", "Slow, Small, and Simple", "Pen, Paper, and Book", undefined, { speaker: "mascot", meaning: "Dung lượng (Volume), Tốc độ (Velocity), và Đa dạng (Variety)." }),
          makeListenType("Actionable insights transform raw information into strategic competitive advantages.", "Hiểu biết hành động chuyển đổi thông tin thô thành lợi thế cạnh tranh chiến lược.", "zombie"),
          makeRealWord("computational", true, "Từ có nghĩa: mang tính tính toán"),
          makeRealWord("analyticized", false, "Từ giả")
        ),
      },
      {
        title: "Bài 2: Mạng nơ-ron nhân tạo & Học sâu",
        order: 2,
        vocab: [
          { en: "Neural network", vi: "Mạng nơ-ron nhân tạo", example: { en: "Artificial neural networks mimic brain architecture.", vi: "Mạng nơ-ron nhân tạo mô phỏng kiến trúc não bộ." }, image: "/robot.svg" },
          { en: "Deep learning", vi: "Học sâu", example: { en: "Deep learning achieves breakthroughs in vision.", vi: "Học sâu đạt được những đột phá trong thị giác máy tính." }, image: "/man.svg" },
          { en: "Parameter", vi: "Tham số mô hình", example: { en: "Large models train on billions of parameters.", vi: "Các mô hình lớn được huấn luyện trên hàng tỷ tham số." }, image: "/woman.svg" },
          { en: "Supervised", vi: "Có giám sát (gán nhãn)", example: { en: "Supervised learning relies on labeled training data.", vi: "Học có giám sát dựa vào dữ liệu huấn luyện đã gán nhãn." }, image: "/boy.svg" },
          { en: "Unsupervised", vi: "Không giám sát (tự tìm mẫu)", example: { en: "Unsupervised algorithms discover clusters naturally.", vi: "Thuật toán không giám sát tự nhiên khám phá các cụm dữ liệu." }, image: "/girl.svg" },
          { en: "Optimization", vi: "Sự tối ưu hóa thuật toán", example: { en: "Gradient descent guides mathematical optimization.", vi: "Thuật toán hạ độ dốc định hướng sự tối ưu hóa toán học." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Cấu trúc tính toán lấy cảm hứng từ các tế bào thần kinh sinh học là:", "Brain-inspired computing", "Neural network", "Steam engine", "Abacus", undefined, { speaker: "robot", meaning: "Mạng nơ-ron là Neural network." }),
          makeListenType("Deep neural networks learn hierarchical representations directly from complex data.", "Mạng nơ-ron sâu học các biểu diễn thứ bậc trực tiếp từ dữ liệu phức tạp.", "man"),
          makeRealWord("optimization", true, "Từ có nghĩa: sự tối ưu hóa"),
          makeRealWord("neuralized", false, "Từ giả"),
          makeFillLetters("Backpropagation calculates gr", "ad", "ients", " to optimize model weights.", "Lan truyền ngược tính toán độ dốc để tối ưu hóa trọng số mô hình.", "woman"),
          makeBuild("Học sâu mở ra những bước tiến vượt bậc trong xử lý ngôn ngữ.", "Deep learning enables major breakthroughs in natural language processing", ["Deep", "learning", "enables", "major", "breakthroughs", "in", "natural", "language", "processing"], "boy"),
          makeTypeMissing("Training neural networks requires substantial graphic _____ units.", "processing", "Huấn luyện mạng nơ-ron đòi hỏi các bộ xử lý đồ họa (GPU) mạnh mẽ.", "girl"),
          makeChoice("Phương pháp học máy sử dụng dữ liệu đã gán nhãn sẵn gọi là:", "Learning with labeled data", "Supervised learning", "Random guessing", "Zero learning", undefined, { speaker: "mascot", meaning: "Học có giám sát là Supervised learning." }),
          makeListenType("Computer vision enables autonomous vehicles to interpret their dynamic environment.", "Thị giác máy tính cho phép xe tự hành diễn giải môi trường biến đổi xung quanh.", "zombie"),
          makeRealWord("architecture", true, "Từ có nghĩa: kiến trúc hệ thống"),
          makeRealWord("parameterize", true, "Từ có nghĩa: tham số hóa")
        ),
      },
      {
        title: "Bài 3: Đạo đức công nghệ & Quản trị AI có trách nhiệm",
        order: 3,
        vocab: [
          { en: "Algorithmic bias", vi: "Thiên kiến thuật toán", example: { en: "Audit models to eradicate algorithmic bias.", vi: "Kiểm toán mô hình để loại trừ thiên kiến thuật toán." }, image: "/woman.svg" },
          { en: "Transparency", vi: "Tính minh bạch", example: { en: "Demand algorithmic transparency in decision systems.", vi: "Đòi hỏi tính minh bạch thuật toán trong các hệ thống ra quyết định." }, image: "/man.svg" },
          { en: "Accountability", vi: "Trách nhiệm giải trình", example: { en: "Clear lines of human accountability are vital.", vi: "Xác định rõ ràng trách nhiệm giải trình của con người là điều cốt tử." }, image: "/robot.svg" },
          { en: "Governance", vi: "Công tác quản trị", example: { en: "Establish robust global AI governance frameworks.", vi: "Thiết lập các khung quản trị trí tuệ nhân tạo toàn cầu vững chắc." }, image: "/boy.svg" },
          { en: "Surveillance", vi: "Sự giám sát đại chúng", example: { en: "Limit invasive mass digital surveillance.", vi: "Hạn chế sự giám sát kỹ thuật số xâm lấn đại chúng." }, image: "/girl.svg" },
          { en: "Ethical", vi: "Mang tính đạo đức", example: { en: "Align artificial agents with ethical human values.", vi: "Căn chỉnh các tác tử nhân tạo phù hợp với giá trị đạo đức con người." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hiện tượng thuật toán thiên vị hoặc phân biệt đối xử do dữ liệu huấn luyện gọi là:", "Unfair machine discrimination", "Algorithmic bias", "Perfect fairness", "Clean code", undefined, { speaker: "woman", meaning: "Thiên kiến thuật toán là Algorithmic bias." }),
          makeListenType("Explainable artificial intelligence allows humans to understand automated decisions.", "Trí tuệ nhân tạo có thể giải thích cho phép con người hiểu được các quyết định tự động.", "man"),
          makeRealWord("accountability", true, "Từ có nghĩa: trách nhiệm giải trình"),
          makeRealWord("ethicize", false, "Từ giả"),
          makeFillLetters("Regulatory fra", "me", "works", " protect consumer privacy against invasive technologies.", "Các khung pháp lý bảo vệ quyền riêng tư người dùng trước công nghệ xâm phạm.", "robot"),
          makeBuild("Trí tuệ nhân tạo phải phục vụ lợi ích chung của nhân loại.", "Artificial intelligence must serve the collective benefit of all humanity", ["Artificial", "intelligence", "must", "serve", "the", "collective", "benefit", "of", "all", "humanity"], "boy"),
          makeTypeMissing("Developers must uphold high _____ standards when releasing powerful models.", "ethical", "Các nhà phát triển phải giữ vững những tiêu chuẩn đạo đức cao khi phát hành mô hình mạnh mẽ.", "girl"),
          makeChoice("Yêu cầu hệ thống AI phải có thể giải thích được lý do đưa ra quyết định gọi là:", "Ability to explain decisions", "Transparency and explainability", "Total secrecy", "Black box mystery", undefined, { speaker: "mascot", meaning: "Tính minh bạch và khả năng giải thích." }),
          makeListenType("Human oversight ensures safety and ethical alignment in autonomous agents.", "Sự giám sát của con người đảm bảo tính an toàn và căn chỉnh đạo đức trong các tác tử tự hành.", "zombie"),
          makeRealWord("governance", true, "Từ có nghĩa: quản trị"),
          makeRealWord("surveillant", true, "Từ có nghĩa: người giám sát")
        ),
      },
      {
        title: "Bài 4: Điểm kỳ dị & Tương lai văn minh nhân loại",
        order: 4,
        vocab: [
          { en: "Singularity", vi: "Điểm kỳ dị công nghệ", example: { en: "The technological singularity marks superintelligence.", vi: "Điểm kỳ dị công nghệ đánh dấu sự xuất hiện của siêu trí tuệ." }, image: "/robot.svg" },
          { en: "Superintelligence", vi: "Siêu trí tuệ nhân tạo", example: { en: "Superintelligence surpassing human intellect.", vi: "Siêu trí tuệ vượt qua năng lực trí óc của con người." }, image: "/man.svg" },
          { en: "Existential risk", vi: "Rủi ro tồn vong", example: { en: "Mitigate existential risks confronting civilization.", vi: "Giảm thiểu các rủi ro tồn vong đe dọa nền văn minh." }, image: "/woman.svg" },
          { en: "Paradigm shift", vi: "Bước chuyển dịch mô thức", example: { en: "Quantum computing triggers a new paradigm shift.", vi: "Điện toán lượng tử khởi phát một bước chuyển dịch mô thức mới." }, image: "/boy.svg" },
          { en: "Symbiosis", vi: "Mối quan hệ cộng sinh", example: { en: "A harmonious symbiosis between humans and machines.", vi: "Mối quan hệ cộng sinh hài hòa giữa con người và máy móc." }, image: "/girl.svg" },
          { en: "Evolution", vi: "Sự tiến hóa văn minh", example: { en: "The next stage in conscious technological evolution.", vi: "Giai đoạn tiếp theo trong quá trình tiến hóa công nghệ có ý thức." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Thời điểm giả thuyết khi trí tuệ máy móc vượt xa trí tuệ nhân loại gọi là:", "Point of machine superintelligence", "Technological singularity", "Stone age", "Power outage", undefined, { speaker: "robot", meaning: "Điểm kỳ dị công nghệ là Technological singularity." }),
          makeListenType("The future of humanity will be defined by how wisely we govern superintelligence.", "Tương lai của nhân loại sẽ được định hình bởi cách chúng ta quản trị siêu trí tuệ khôn ngoan đến đâu.", "man"),
          makeRealWord("superintelligence", true, "Từ có nghĩa: siêu trí tuệ"),
          makeRealWord("singularian", true, "Từ có nghĩa: người theo thuyết điểm kỳ dị"),
          makeFillLetters("Quantum processors promise expo", "ne", "ntial", " leaps in computational speed.", "Bộ xử lý lượng tử hứa hẹn những bước nhảy vọt theo cấp số nhân về tốc độ tính toán.", "woman"),
          makeBuild("Công nghệ và con người cần cùng phát triển trong sự hài hòa.", "Humans and technology must coevolve in sustainable and meaningful harmony", ["Humans", "and", "technology", "must", "coevolve", "in", "sustainable", "and", "meaningful", "harmony"], "boy"),
          makeTypeMissing("Safeguarding against _____ risk requires proactive international cooperation.", "existential", "Bảo vệ nhân loại trước rủi ro tồn vong (existential risk) đòi hỏi hợp tác quốc tế chủ động.", "girl"),
          makeChoice("Mối quan hệ đôi bên cùng tồn tại và hỗ trợ nhau phát triển gọi là:", "Mutually beneficial coexistence", "Symbiosis", "Parasitism", "Extinction", undefined, { speaker: "mascot", meaning: "Cộng sinh là Symbiosis." }),
          makeListenType("Scientific inquiry expands our understanding of consciousness and the cosmos.", "Tìm tòi khoa học mở rộng hiểu biết của chúng ta về ý thức và vũ trụ bao la.", "zombie"),
          makeRealWord("consciousness", true, "Từ có nghĩa: ý thức"),
          makeRealWord("evolutionary", true, "Từ có nghĩa: mang tính tiến hóa")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 11",
        order: 5,
        vocab: [
          { en: "Transcendence", vi: "Sự vượt ngưỡng / Siêu việt", example: { en: "Intellectual transcendence through scientific discovery.", vi: "Sự vượt ngưỡng trí tuệ thông qua phát hiện khoa học." }, image: "/mascot.svg" },
          { en: "Foresight", vi: "Tầm nhìn xa trông rộng", example: { en: "Strategic foresight anticipates technological disruption.", vi: "Tầm nhìn chiến lược lường trước những xáo trộn công nghệ." }, image: "/robot.svg" },
          { en: "Enlightenment", vi: "Sự khai sáng tri thức", example: { en: "Digital tools usher in a modern enlightenment.", vi: "Các công cụ số mở ra một thời kỳ khai sáng hiện đại." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 11: 'Strategic _____ enables societies to harness technology for progress.'", "Anticipating future change", "foresight", "blindness", "ignorance", undefined, { speaker: "mascot", meaning: "Tầm nhìn chiến lược (foresight) giúp xã hội làm chủ công nghệ." }),
          makeListenType("Technology is an amplifier of human intent; our values determine the outcome.", "Công nghệ là chiếc gương phóng đại ý đồ con người; giá trị sống của ta quyết định kết quả.", "girl"),
          makeRealWord("transcendence", true, "Từ có nghĩa: sự siêu việt / vượt ngưỡng"),
          makeRealWord("enlightenist", false, "Từ giả"),
          makeFillLetters("Responsible stewardship is the true mark of an ad", "van", "ced", " civilization.", "Sự quản trị có trách nhiệm là dấu ấn đích thực của một nền văn minh tiên tiến.", "boy"),
          makeBuild("Trí tuệ nhân tạo sẽ là người bạn đồng hành vĩ đại của con người.", "Artificial intelligence will serve as an extraordinary companion to human potential", ["Artificial", "intelligence", "will", "serve", "as", "an", "extraordinary", "companion", "to", "human", "potential"], "man"),
          makeTypeMissing("The integration of ethics into AI architecture ensures long-term human _____.", "flourishing", "Việc tích hợp đạo đức vào kiến trúc AI đảm bảo sự hưng thịnh lâu dài của nhân loại.", "woman"),
          makeListenType("A brighter future belongs to those who innovate with empathy and wisdom.", "Một tương lai xán lạn thuộc về những ai biết đổi mới với lòng trắc ẩn và sự thông thái.", "robot"),
          makeRealWord("symbiotic", true, "Từ có nghĩa: mang tính cộng sinh"),
          makeRealWord("foresighted", true, "Từ có nghĩa: biết lo xa"),
          makeChoice("Mệnh đề cốt lõi của Chương 11 về công nghệ tương lai là:", "Core vision of Chapter 11", "Harness AI with ethical vigilance, human empathy, and visionary wisdom", "Abandon all computers", "Let machines control human destiny", undefined, { speaker: "zombie", meaning: "Làm chủ AI với cảnh giác đạo đức, lòng trắc ẩn và tầm nhìn thông thái." }),
          makeFillLetters("Curiosity and empathy light the path to the dig", "it", "al", " horizon.", "Tính hiếu kỳ và lòng trắc ẩn thắp sáng con đường tiến đến chân trời số.", "mascot")
        ),
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 12: TÂM LÝ HỌC, HÀNH VI CON NGƯỜI & LÃNH ĐẠO TỔ CHỨC (C1)
  // =========================================================================
  {
    title: "Chương 12: Tâm lý học hành vi & Lãnh đạo (C1)",
    description: "Giải mã thiên kiến nhận thức, trí tuệ cảm xúc, động lực nhóm và nghệ thuật lãnh đạo truyền cảm hứng.",
    order: 12,
    lessons: [
      {
        title: "Bài 1: Thiên kiến nhận thức & Ra quyết định",
        order: 1,
        vocab: [
          { en: "Cognitive bias", vi: "Thiên kiến nhận thức", example: { en: "Overcome confirmation bias when evaluating data.", vi: "Vượt qua thiên kiến xác nhận khi đánh giá dữ liệu." }, image: "/man.svg" },
          { en: "Heuristic", vi: "Lối tắt tư duy", example: { en: "Mental heuristics save time but may introduce errors.", vi: "Lối tắt tư duy tiết kiệm thời gian nhưng có thể dẫn đến sai số." }, image: "/woman.svg" },
          { en: "Perception", vi: "Sự tri giác / Nhận thức", example: { en: "Individual perception shapes reality.", vi: "Sự tri giác của từng cá nhân định hình thực tại của họ." }, image: "/boy.svg" },
          { en: "Rationality", vi: "Tính duy lý", example: { en: "Bounded rationality limits optimal decision making.", vi: "Tính duy lý có giới hạn làm hạn chế việc ra quyết định tối ưu." }, image: "/girl.svg" },
          { en: "Intuition", vi: "Trực giác", example: { en: "Combine analytical rigor with seasoned intuition.", vi: "Kết hợp tính chặt chẽ trong phân tích với trực giác dạn dày." }, image: "/robot.svg" },
          { en: "Judgment", vi: "Sự phán đoán / Đánh giá", example: { en: "Sound judgment is the hallmark of great leaders.", vi: "Phán đoán sáng suốt là dấu ấn của các nhà lãnh đạo vĩ đại." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Xu hướng chỉ tìm kiếm thông tin củng cố niềm tin có sẵn của mình gọi là:", "Seeking confirming evidence only", "Confirmation bias", "Objective reasoning", "Open-mindedness", undefined, { speaker: "man", meaning: "Thiên kiến xác nhận là Confirmation bias." }),
          makeListenType("Cognitive biases distort objective perception and lead to flawed decision making.", "Các thiên kiến nhận thức bóp méo tri giác khách quan và dẫn tới quyết định sai sót.", "woman"),
          makeRealWord("heuristic", true, "Từ có nghĩa: phương pháp lối tắt tư duy"),
          makeRealWord("perceptual", true, "Từ có nghĩa: thuộc về tri giác"),
          makeFillLetters("Mental heuristics help us nav", "ig", "ate", " complex environments swiftly.", "Lối tắt tư duy giúp chúng ta điều hướng các môi trường phức tạp một cách mau lẹ.", "boy"),
          makeBuild("Sự tự nhận thức giúp giải phóng tâm trí khỏi định kiến.", "Self-awareness frees the human mind from subconscious biases", ["Self-awareness", "frees", "the", "human", "mind", "from", "subconscious", "biases", "enslaves"], "girl"),
          makeTypeMissing("The theory of bounded _____ demonstrates that human logic has natural limits.", "rationality", "Lý thuyết duy lý hữu hạn (bounded rationality) chỉ ra logic con người có giới hạn tự nhiên.", "robot"),
          makeChoice("Khả năng nhận biết những quy luật ẩn giấu mà không cần suy luận logic gọi là:", "Inner knowing without conscious reasoning", "Intuition", "Calculation", "Memorization", undefined, { speaker: "mascot", meaning: "Trực giác là Intuition." }),
          makeListenType("Deliberate reflection mitigates the impulsive errors of emotional thinking.", "Sự suy ngẫm thận trọng giúp giảm thiểu những sai sót bốc đồng của tư duy cảm tính.", "zombie"),
          makeRealWord("irrationality", true, "Từ có nghĩa: tính phi lý"),
          makeRealWord("cognitivism", true, "Từ có nghĩa: thuyết nhận thức")
        ),
      },
      {
        title: "Bài 2: Trí tuệ cảm xúc & Động lực nội tại",
        order: 2,
        vocab: [
          { en: "Emotional intelligence", vi: "Trí tuệ cảm xúc (EQ)", example: { en: "High emotional intelligence fosters interpersonal harmony.", vi: "Trí tuệ cảm xúc cao thúc đẩy sự hòa hợp trong quan hệ." }, image: "/girl.svg" },
          { en: "Empathy", vi: "Lòng thấu cảm", example: { en: "Practice deep empathy by walking in others' shoes.", vi: "Rèn luyện lòng thấu cảm bằng việc đặt mình vào vị trí người khác." }, image: "/boy.svg" },
          { en: "Intrinsic motivation", vi: "Động lực nội tại", example: { en: "Intrinsic motivation yields enduring creative passion.", vi: "Động lực nội tại mang lại đam mê sáng tạo bền bỉ." }, image: "/man.svg" },
          { en: "Resilience", vi: "Sức bật tinh thần", example: { en: "Psychological resilience transforms adversity into growth.", vi: "Sức bật tâm lý biến nghịch cảnh thành sự trưởng thành." }, image: "/woman.svg" },
          { en: "Self-regulation", vi: "Khả năng tự điều chỉnh cảm xúc", example: { en: "Self-regulation calms reactive anger.", vi: "Tự điều chỉnh giúp xoa dịu những cơn giận mang tính phản xạ." }, image: "/robot.svg" },
          { en: "Mindfulness", vi: "Sự tỉnh thức / Chánh niệm", example: { en: "Mindfulness enhances concentration and peace.", vi: "Sự tỉnh thức nâng cao khả năng tập trung và bình yên nội tâm." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Động lực xuất phát từ chính niềm vui và đam mê bên trong được gọi là:", "Internal drive and curiosity", "Intrinsic motivation", "External punishment", "Bribe", undefined, { speaker: "girl", meaning: "Động lực nội tại là Intrinsic motivation." }),
          makeListenType("Empathy is the bedrock of profound human connection and collaborative success.", "Lòng thấu cảm là nền tảng của sự gắn kết con người sâu sắc và thành công hợp tác.", "boy"),
          makeRealWord("empathy", true, "Từ có nghĩa: lòng thấu cảm"),
          makeRealWord("resiliently", true, "Từ có nghĩa: một cách kiên cường"),
          makeFillLetters("Self-regulation enables pro", "fe", "ssionals", " to remain composed under intense pressure.", "Khả năng tự điều chỉnh giúp các chuyên gia giữ bình tĩnh dưới áp lực cao.", "man"),
          makeBuild("Trí tuệ cảm xúc là chìa khóa để thấu hiểu người khác.", "Emotional intelligence is the essential key to understanding human hearts", ["Emotional", "intelligence", "is", "the", "essential", "key", "to", "understanding", "human", "hearts"], "woman"),
          makeTypeMissing("Psychological _____ enables individuals to bounce back after failure.", "resilience", "Sức bật tâm lý (resilience) cho phép các cá nhân gượng dậy sau thất bại.", "robot"),
          makeChoice("Khả năng thấu cảm cảm xúc và góc nhìn của người khác gọi là:", "Feeling what others feel", "Empathy", "Apathy", "Hostility", undefined, { speaker: "mascot", meaning: "Lòng thấu cảm là Empathy." }),
          makeListenType("Cultivating mindfulness reduces anxiety and clarifies strategic priorities.", "Nuôi dưỡng sự tỉnh thức giúp giảm âu lo và làm sáng rõ các ưu tiên chiến lược.", "zombie"),
          makeRealWord("compassionate", true, "Từ có nghĩa: giàu lòng trắc ẩn"),
          makeRealWord("intrinse", false, "Từ giả")
        ),
      },
      {
        title: "Bài 3: Động lực học nhóm & Tâm lý học đám đông",
        order: 3,
        vocab: [
          { en: "Group dynamics", vi: "Động lực học nhóm", example: { en: "Understand complex group dynamics in organizations.", vi: "Thấu hiểu động lực học nhóm phức tạp trong tổ chức." }, image: "/man.svg" },
          { en: "Conformity", vi: "Tâm lý bầy đàn / Sự phục tùng số đông", example: { en: "Social conformity suppresses divergent novel ideas.", vi: "Tâm lý phục tùng số đông kìm hãm những ý tưởng đổi mới khác biệt." }, image: "/woman.svg" },
          { en: "Cohesion", vi: "Sự gắn kết đồng đội", example: { en: "Build trust to strengthen team cohesion.", vi: "Xây dựng niềm tin để củng cố sự gắn kết trong nhóm." }, image: "/boy.svg" },
          { en: "Polarization", vi: "Hiện tượng phân cực quan điểm", example: { en: "Unchecked echo chambers worsen social polarization.", vi: "Các buồng vang thông tin không kiểm soát làm trầm trọng hóa sự phân cực." }, image: "/girl.svg" },
          { en: "Synergy", vi: "Sức mạnh cộng hưởng", example: { en: "Cross-disciplinary teams generate powerful synergy.", vi: "Các nhóm liên ngành tạo ra sức mạnh cộng hưởng to lớn." }, image: "/robot.svg" },
          { en: "Consensus", vi: "Sự đồng thuận chung", example: { en: "Reach an authentic consensus through open dialogue.", vi: "Đạt được sự đồng thuận thực chất qua đối thoại cởi mở." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Hiện tượng mọi người thuận theo ý kiến số đông dù trong lòng nghi ngờ gọi là:", "Yielding to group pressure", "Conformity", "Independence", "Rebellion", undefined, { speaker: "man", meaning: "Sự phục tùng số đông là Conformity." }),
          makeListenType("High team cohesion combined with psychological safety fosters ground-breaking creativity.", "Sự gắn kết nhóm cao kết hợp với an toàn tâm lý thúc đẩy sức sáng tạo đột phá.", "woman"),
          makeRealWord("cohesion", true, "Từ có nghĩa: sự gắn kết"),
          makeRealWord("synergistic", true, "Từ có nghĩa: mang tính cộng hưởng"),
          makeFillLetters("Group polarization pushes mo", "de", "rate", " opinions toward extreme extremes.", "Phân cực nhóm đẩy những quan điểm ôn hòa về các thái cực cực đoan.", "boy"),
          makeBuild("Sức mạnh cộng hưởng giúp nhóm đạt kết quả vượt bậc.", "Team synergy produces results that far exceed individual efforts", ["Team", "synergy", "produces", "results", "that", "far", "exceed", "individual", "efforts"], "girl"),
          makeTypeMissing("Reaching a genuine _____ requires patient listening and mutual concession.", "consensus", "Đạt được một sự đồng thuận (consensus) thực chất đòi hỏi sự lắng nghe kiên nhẫn.", "robot"),
          makeChoice("Khái niệm khi cả nhóm làm việc hiệu quả hơn tổng các cá nhân cộng lại là:", "Whole is greater than sum of parts", "Synergy", "Division", "Conflict", undefined, { speaker: "mascot", meaning: "Sức mạnh cộng hưởng là Synergy." }),
          makeListenType("Divergent viewpoints challenge groupthink and lead to superior strategic decisions.", "Những góc nhìn đa chiều thách thức tư duy tập thể và dẫn đến quyết định chiến lược vượt trội.", "zombie"),
          makeRealWord("polarization", true, "Từ có nghĩa: sự phân cực"),
          makeRealWord("conformative", false, "Từ giả")
        ),
      },
      {
        title: "Bài 4: Nghệ thuật lãnh đạo & Văn hóa tổ chức",
        order: 4,
        vocab: [
          { en: "Transformational", vi: "Mang tính chuyển đổi đột phá", example: { en: "Transformational leaders inspire noble visions.", vi: "Lãnh đạo chuyển đổi truyền cảm hứng cho những tầm nhìn cao đẹp." }, image: "/woman.svg" },
          { en: "Mentorship", vi: "Sự hướng dẫn / Khai vấn", example: { en: "Invest in mentorship to cultivate emerging talent.", vi: "Đầu tư vào cố vấn để ươm mầm những tài năng mới nổi." }, image: "/man.svg" },
          { en: "Organizational culture", vi: "Văn hóa tổ chức", example: { en: "A positive organizational culture attracts top performers.", vi: "Văn hóa tổ chức tích cực thu hút những người giỏi nhất." }, image: "/robot.svg" },
          { en: "Delegation", vi: "Nghệ thuật giao quyền", example: { en: "Effective delegation empowers team members.", vi: "Giao quyền hiệu quả trao quyền tự chủ cho thành viên trong nhóm." }, image: "/boy.svg" },
          { en: "Accountability", vi: "Tinh thần chịu trách nhiệm", example: { en: "Instill mutual accountability across departments.", vi: "Thấm nhuần tinh thần cùng chịu trách nhiệm qua các phòng ban." }, image: "/girl.svg" },
          { en: "Visionary", vi: "Có tầm nhìn xa trông rộng", example: { en: "Visionary leadership charts unmapped paths to success.", vi: "Lãnh đạo có tầm nhìn vạch ra con đường chưa ai đi tới thành công." }, image: "/mascot.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Phong cách lãnh đạo truyền cảm hứng và biến đổi tổ chức toàn diện gọi là:", "Inspiring total organizational change", "Transformational leadership", "Micromanagement", "Absenteeism", undefined, { speaker: "woman", meaning: "Lãnh đạo chuyển đổi là Transformational leadership." }),
          makeListenType("Great leaders do not create followers; they nurture and empower new leaders.", "Những nhà lãnh đạo vĩ đại không tạo ra người phục tùng; họ nuôi dưỡng và trao quyền cho lãnh đạo mới.", "man"),
          makeRealWord("visionary", true, "Từ có nghĩa: người có tầm nhìn xa"),
          makeRealWord("delegative", true, "Từ có nghĩa: mang tính giao phó"),
          makeFillLetters("A thriving organ", "iz", "ational", " culture celebrates continuous learning.", "Văn hóa tổ chức phát đạt luôn tôn vinh tinh thần học hỏi không ngừng.", "boy"),
          makeBuild("Người lãnh đạo xuất sắc luôn dẫn đầu bằng tấm gương đạo đức.", "Exemplary leaders always guide their teams through ethical integrity", ["Exemplary", "leaders", "always", "guide", "their", "teams", "through", "ethical", "integrity"], "girl"),
          makeTypeMissing("Effective _____ allows leaders to focus on core strategic priorities.", "delegation", "Nghệ thuật giao quyền (delegation) hiệu quả giúp lãnh đạo tập trung vào ưu tiên chiến lược.", "robot"),
          makeChoice("Hành vi kiểm soát tiểu tiết vụn vặt làm thui chột tính chủ động của nhân viên gọi là:", "Excessive unhealthy control", "Micromanagement", "Empowerment", "Trust", undefined, { speaker: "mascot", meaning: "Quản lý vi mô là Micromanagement." }),
          makeListenType("Trust and psychological safety are the bedrock of innovative organizational cultures.", "Niềm tin và an toàn tâm lý là nền móng cho văn hóa tổ chức đổi mới sáng tạo.", "zombie"),
          makeRealWord("mentorship", true, "Từ có nghĩa: công tác cố vấn hướng dẫn"),
          makeRealWord("transformational", true, "Từ có nghĩa: mang tính chuyển đổi")
        ),
      },
      {
        title: "Bài 5: ÔN TẬP VƯƠNG MIỆN - CHƯƠNG 12",
        order: 5,
        vocab: [
          { en: "Eudaimonia", vi: "Hạnh phúc đích thực / Sự đơm hoa viên mãn", example: { en: "Aristotle described eudaimonia as human flourishing.", vi: "Aristotle mô tả eudaimonia là sự nở hoa viên mãn của đời người." }, image: "/mascot.svg" },
          { en: "Authenticity", vi: "Tính chân thực / Bản sắc đích thực", example: { en: "Authenticity is the foundation of genuine leadership.", vi: "Tính chân thực là nền móng của năng lực lãnh đạo đích thực." }, image: "/girl.svg" },
          { en: "Self-actualization", vi: "Sự hiện thực hóa tiềm năng cao nhất", example: { en: "Reach self-actualization through lifelong mastery.", vi: "Đạt tới sự viên mãn tiềm năng qua sự tinh thông cả đời." }, image: "/man.svg" },
        ],
        challenges: packChallenges(
          makeChoice("Vương miện Chương 12: 'The highest human psychological need in Maslow's hierarchy is _____.'", "Top of Maslow pyramid", "Self-actualization", "Food and water", "Social status", undefined, { speaker: "mascot", meaning: "Đỉnh cao tháp Maslow: Hiện thực hóa tiềm năng bản thân (Self-actualization)." }),
          makeListenType("Leading with empathy, authenticity, and clear vision elevates humanity to greatness.", "Lãnh đạo bằng lòng thấu cảm, tính chân thực và tầm nhìn sáng rõ nâng tầm nhân loại.", "girl"),
          makeRealWord("authenticity", true, "Từ có nghĩa: tính chân thực"),
          makeRealWord("eudaimonic", true, "Từ có nghĩa: mang lại hạnh phúc đích thực"),
          makeFillLetters("True leadership is measured by the gr", "ow", "th", " of those we serve.", "Năng lực lãnh đạo đích thực được đo lường bằng sự trưởng thành của những người ta phụng sự.", "boy"),
          makeBuild("Sự hiểu biết sâu sắc về tâm lý con người là sức mạnh tối thượng.", "Deep understanding of human psychology provides extraordinary strategic power", ["Deep", "understanding", "of", "human", "psychology", "provides", "extraordinary", "strategic", "power"], "man"),
          makeTypeMissing("The ultimate aspiration of leadership is collective _____ and flourishing.", "well-being", "Khát vọng tối hậu của năng lực lãnh đạo là phúc lợi chung và sự hưng thịnh của tập thể.", "woman"),
          makeListenType("When individuals find purpose, collective achievement knows no boundaries.", "Khi mỗi cá nhân tìm thấy lẽ sống, thành tựu của tập thể sẽ không còn bất kỳ giới hạn nào.", "robot"),
          makeRealWord("flourishing", true, "Từ có nghĩa: sự đơm hoa / hưng thịnh"),
          makeRealWord("actualizator", false, "Từ giả"),
          makeChoice("Đạo lý căn bản nhất của tâm lý học hành vi và lãnh đạo C1 là:", "Highest insight of Chapter 12", "Master yourself, understand others deeply, and inspire collective excellence", "Manipulate people secretly", "Isolate yourself from society", undefined, { speaker: "zombie", meaning: "Làm chủ chính mình, thấu hiểu người khác sâu sắc và khơi gợi sự xuất sắc chung." }),
          makeFillLetters("Know thyself, and you sh", "a", "ll", " understand the universe.", "Hãy thấu hiểu chính mình, và bạn sẽ thấu hiểu cả vũ trụ.", "mascot")
        ),
      },
    ],
  },
];

