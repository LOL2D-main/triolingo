/**
 * Tu dien tra cuu nhanh tieng Anh - tieng Viet cho cap do A1 & DET.
 * Khi nguoi dung cham/bam vao bat ky tu tieng Anh nao trong cau,
 * he thong se tra nghia va hien thi popover tooltip tuc thi!
 */

export const A1_DICTIONARY: Record<string, string> = {
  // Dai tu & To Be
  i: "tôi",
  you: "bạn / các bạn",
  he: "anh ấy / cậu ấy",
  she: "cô ấy / chị ấy",
  it: "nó (đồ vật/con vật)",
  we: "chúng tôi / chúng ta",
  they: "họ / chúng nó",
  am: "là / thì / ở (đi với I)",
  is: "là / thì / ở (số ít)",
  are: "là / thì / ở (số nhiều)",
  was: "đã là / đã ở (quá khứ)",
  were: "đã là / đã ở (quá khứ)",
  be: "thì / là / ở",
  my: "của tôi",
  your: "của bạn",
  his: "của anh ấy",
  her: "của cô ấy",
  its: "của nó",
  our: "của chúng tôi",
  their: "của họ",
  this: "đây / cái này",
  that: "đó / cái kia",
  these: "những cái này",
  those: "những cái kia",

  // Chao hoi & Giao tiep
  hello: "xin chào",
  hi: "chào bạn",
  good: "tốt / đẹp / hay",
  morning: "buổi sáng",
  afternoon: "buổi chiều",
  evening: "buổi tối",
  night: "đêm / buổi tối",
  bye: "tạm biệt",
  goodbye: "tạm biệt",
  please: "xin vui lòng / làm ơn",
  thank: "cảm ơn",
  thanks: "cảm ơn nhiều",
  welcome: "chào mừng / không có chi",
  yes: "vâng / có / đúng",
  no: "không / không phải",
  not: "không",
  sorry: "xin lỗi",
  fine: "khỏe / tốt",

  // So dem & Thoi gian
  one: "số 1",
  two: "số 2",
  three: "số 3",
  four: "số 4",
  five: "số 5",
  six: "số 6",
  seven: "số 7",
  eight: "số 8",
  nine: "số 9",
  ten: "số 10",
  eleven: "số 11",
  twelve: "số 12",
  thirteen: "số 13",
  fourteen: "số 14",
  fifteen: "số 15",
  sixteen: "số 16",
  seventeen: "số 17",
  eighteen: "số 18",
  nineteen: "số 19",
  twenty: "số 20",
  thirty: "số 30",
  forty: "số 40",
  fifty: "số 50",
  hundred: "trăm (100)",
  thousand: "nghìn (1.000)",
  day: "ngày",
  week: "tuần",
  month: "tháng",
  year: "năm",
  today: "hôm nay",
  tomorrow: "ngày mai",
  yesterday: "hôm qua",
  time: "thời gian / giờ",
  now: "bây giờ",
  clock: "đồng hồ",
  hour: "giờ / tiếng đồng hồ",
  minute: "phút",

  // Con nguoi & Gia dinh
  man: "người đàn ông",
  men: "những người đàn ông",
  woman: "người phụ nữ",
  women: "những người phụ nữ",
  boy: "cậu bé / bé trai",
  girl: "cô bé / bé gái",
  child: "đứa trẻ",
  children: "trẻ em",
  baby: "em bé sơ sinh",
  family: "gia đình",
  father: "bố / cha",
  dad: "bố / ba",
  mother: "mẹ / má",
  mom: "mẹ / mẹ hiền",
  parent: "phụ huynh / cha mẹ",
  parents: "cha mẹ",
  brother: "anh trai / em trai",
  sister: "chị gái / em gái",
  son: "con trai",
  daughter: "con gái",
  friend: "người bạn",
  friends: "những người bạn",
  person: "người / một người",
  people: "mọi người / người ta",
  name: "tên gọi",
  age: "tuổi tác",
  old: "già / tuổi (years old)",
  young: "trẻ trung",

  // Nghe nghiep & Truong hoc
  student: "học sinh / sinh viên",
  teacher: "giáo viên / thầy cô",
  doctor: "bác sĩ",
  nurse: "y tá / điều dưỡng",
  engineer: "kỹ sư",
  driver: "tài xế / người lái xe",
  worker: "công nhân / người lao động",
  school: "trường học",
  class: "lớp học",
  classroom: "phòng học",
  book: "quyển sách",
  pen: "bút mực",
  pencil: "bút chì",
  paper: "tờ giấy",
  desk: "bàn học / bàn làm việc",
  chair: "cái ghế",
  bag: "cặp sách / túi xách",
  lesson: "bài học",
  learn: "học tập / tiếp thu",
  study: "học tập / nghiên cứu",
  read: "đọc",
  write: "viết",
  speak: "nói",
  listen: "lắng nghe",

  // Nha cua & Do vat
  house: "ngôi nhà",
  home: "nhà / tổ ấm",
  room: "căn phòng",
  door: "cánh cửa ra vào",
  window: "cửa sổ",
  table: "cái bàn",
  bed: "chiếc giường",
  kitchen: "nhà bếp",
  bathroom: "nhà tắm",
  bedroom: "phòng ngủ",
  living: "sống / sinh sống",
  phone: "điện thoại",
  computer: "máy vi tính",
  water: "nước uống",
  cup: "cái tách / cái cốc",
  bottle: "cái chai",
  key: "chìa khóa",
  car: "xe ô tô",
  bus: "xe buýt",
  bike: "xe đạp",
  bicycle: "xe đạp",
  train: "tàu hỏa / xe lửa",
  plane: "máy bay",

  // An uong
  food: "thức ăn / đồ ăn",
  drink: "đồ uống / uống",
  eat: "ăn",
  bread: "bánh mì",
  rice: "cơm / gạo",
  noodle: "mì / bún / phở",
  meat: "thịt",
  beef: "thịt bò",
  chicken: "thịt gà / con gà",
  pork: "thịt heo / lợn",
  fish: "cá / con cá",
  egg: "trứng",
  milk: "sữa tươi",
  tea: "trà / chè",
  coffee: "cà phê",
  apple: "quả táo",
  banana: "quả chuối",
  orange: "quả cam / màu cam",
  fruit: "trái cây / hoa quả",
  vegetable: "rau củ",
  breakfast: "bữa sáng",
  lunch: "bữa trưa",
  dinner: "bữa tối",
  hungry: "đói bụng",
  thirsty: "khát nước",
  delicious: "ngon miệng",

  // Tinh tu & Mau sac
  big: "to lớn",
  small: "nhỏ bé",
  hot: "nóng bức",
  cold: "lạnh lẽo",
  happy: "vui vẻ / hạnh phúc",
  sad: "buồn bã",
  new: "mới",
  red: "màu đỏ",
  blue: "màu xanh da trời",
  green: "màu xanh lá cây",
  yellow: "màu vàng",
  black: "màu đen",
  white: "màu trắng",
  color: "màu sắc",
  beautiful: "xinh đẹp / tuyệt vời",
  nice: "tốt / đẹp / dễ thương",
  clean: "sạch sẽ",
  fast: "nhanh",
  slow: "chậm chạp",
  tired: "mệt mỏi",
  busy: "bận rộn",
  easy: "dễ dàng",
  difficult: "khó khăn",

  // Dong tu thong dung
  go: "đi",
  come: "đến / lại đây",
  see: "nhìn thấy",
  look: "nhìn / ngắm",
  watch: "xem / theo dõi",
  like: "thích",
  love: "yêu thích",
  have: "có / sở hữu",
  has: "có (ngôi thứ 3 số ít)",
  do: "làm",
  does: "làm (số ít)",
  make: "làm / chế tạo",
  take: "cầm / lấy / đưa",
  give: "cho / tặng",
  get: "nhận được / lấy",
  want: "muốn",
  need: "cần",
  live: "sinh sống",
  work: "làm việc / công việc",
  open: "mở ra",
  close: "đóng lại",
  sleep: "ngủ",
  wake: "thức dậy",
  run: "chạy",
  walk: "đi bộ",
  play: "chơi / đánh đàn / chơi thể thao",
  help: "giúp đỡ",
  stop: "dừng lại",
  can: "có thể",
  cannot: "không thể",
  must: "phải",

  // Gioi tu & Lien tu
  in: "ở trong",
  on: "ở trên",
  at: "ở tại",
  from: "từ đâu đến",
  to: "đến / tới",
  with: "cùng với",
  for: "cho / dành cho",
  about: "về / khoảng",
  and: "và",
  or: "hoặc / hay là",
  but: "nhưng",
  because: "bởi vì",
  so: "vì vậy / do đó",
  here: "ở đây",
  there: "ở đó / đằng kia",
  where: "ở đâu",
  what: "cái gì",
  who: "ai",
  when: "khi nào",
  why: "tại sao",
  how: "như thế nào / bằng cách nào",
  much: "nhiều",
  many: "nhiều (đếm được)",
  very: "rất",
  too: "quá / cũng vậy",
  also: "cũng",
};

/**
 * Tra nghia cua mot tu tieng Anh (tu dong xu ly so nhieu, chia dong tu s/es/ing/ed).
 */
export function lookupWord(rawWord: string): string | null {
  if (!rawWord) return null;
  // Xoa dau cau
  const clean = rawWord
    .toLowerCase()
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
  if (!clean) return null;

  // 1. Tra truc tiep
  if (A1_DICTIONARY[clean]) return A1_DICTIONARY[clean];

  // 2. Tra dang bo so nhieu -s / -es
  if (clean.endsWith("s") && clean.length > 3) {
    const single = clean.slice(0, -1);
    if (A1_DICTIONARY[single]) return A1_DICTIONARY[single];
    if (clean.endsWith("es")) {
      const singleEs = clean.slice(0, -2);
      if (A1_DICTIONARY[singleEs]) return A1_DICTIONARY[singleEs];
    }
  }

  // 3. Tra dang -ing
  if (clean.endsWith("ing") && clean.length > 5) {
    const base = clean.slice(0, -3);
    if (A1_DICTIONARY[base]) return A1_DICTIONARY[base];
    if (A1_DICTIONARY[base + "e"]) return A1_DICTIONARY[base + "e"];
  }

  // 4. Tra dang -ed
  if (clean.endsWith("ed") && clean.length > 4) {
    const base = clean.slice(0, -2);
    if (A1_DICTIONARY[base]) return A1_DICTIONARY[base];
    if (A1_DICTIONARY[base + "d"]) return A1_DICTIONARY[base + "d"];
  }

  return null;
}
