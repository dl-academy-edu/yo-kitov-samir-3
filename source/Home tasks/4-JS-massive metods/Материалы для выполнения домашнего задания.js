// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора
const developers = [
  {
    index: 0,
    name: "Брендан Эйх",
    work: "специалист в области информатики, программист, технический директор",
  },
  {
    index: 2,
    name: "Джеймс Гослинг",
    work: "специалист в области информационных технологий",
  },
  {
    index: 3,
    name: "Бьёрн Страуструп",
    work: "программист",
  },
];

// data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования
const data = [
  {
    name: "JavaScript",
    year: 1995,
    filenameExtensions: "js, mjs",
    influencedBy: [
      "AWK",
      "C",
      "HyperTalk",
      "Java",
      "Lua",
      "Perl",
      "Python",
      "Scheme",
      "Self",
    ],
    affectedBy: [
      "ActionScript",
      "AtScript",
      "CoffeeScript",
      "Dart",
      "JScript .NET",
      "LiveScript",
      "Objective-J",
      "Opa",
      "QML",
      "Raku",
      "TypeScript",
    ],
    developerIndex: 0,
  },
  {
    name: "Java",
    year: 1995,
    filenameExtensions: "java, class, jar, jad, jmod",
    influencedBy: [
      "C++",
      "Си",
      "Ада",
      "Simula 67",
      "Smalltalk",
      "Objective-C",
      "Object Pascal",
      "Оберон",
      "Eiffel",
      "Модула-3",
      "Mesa",
      "Симула",
      "C#",
      "UCSD Pascal",
    ],
    affectedBy: [
      "Ada 2005",
      "BeanShell",
      "C#",
      "Chapel",
      "Clojure",
      "ECMAScript",
      "Fantom",
      "Gambas",
      "Groovy",
      "Hack",
      "Haxe",
      "J#",
      "Kotlin",
      "PHP",
      "Python",
      "Scala",
      "Seed7",
      "Vala",
    ],
    developerIndex: 2,
  },
  {
    name: "C++",
    year: 1983,
    filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
    influencedBy: [
      "C++",
      "Си",
      "Ада",
      "Simula 67",
      "Smalltalk",
      "Objective-C",
      "Object Pascal",
      "Оберон",
      "Eiffel",
      "Модула-3",
      "Mesa",
      "Симула",
      "C#",
      "UCSD Pascal",
    ],
    affectedBy: ["Ada", "C", "Modula-2", "Simula"],
    developerIndex: 3,
  },
];

//////////////////////////////Код///////////////////////////////////
for (i = 0; i < developers.length; i++) {
  let affectedByText = data[i].affectedBy.slice(0, 5).toString();
  console.log(affectedByText);
}

// console.log(`${НАЗВАНИЕ ЯП} -  язык программирования выпущенный в ${ГОД ВЫПУСКА ЯП} году.\nАвтором языка стал ${АВТОР ЯП} - ${РОД ДЕЯТЕЛЬНОСТИ АВТОРА ЯП}.\nФайлы программ, написанных на ${НАЗВАНИЕ ЯП}, могут иметь расширения ${РАСШИРЕНИЯ ФАЙЛОВ}.\n${НАЗВАНИЕ ЯП} испытал влияние ${ДЛИННА СПИСКА С ЯП ОКАЗАВШИМИ ВЛИЯНИЕ} языков программирования: ${СПИСОК ЯП ОКАЗАВШИХ ВЛИЯНИЕ}.\n${НАЗВАНИЕ ЯП} повлиял на ${ЯП ИСПЫТАВШИЕ ВЛИЯНИЕ}.`)
