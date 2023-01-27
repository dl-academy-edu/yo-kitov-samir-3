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
console.log(`Информация будет выведена через 10 секунд: `);
let i = 10;

let myPrinTextCounter = setInterval(function () {
  console.log(i + " ожидание...");
  i--;
}, 1000);
setTimeout(() => {
  clearInterval(myPrinTextCounter);
}, 10000);
setTimeout(printText, 10000);
function printText() {
  let finalText = [];
  for (i = 0; i < developers.length; i++) {
    let affectedByText = data[i].affectedBy.slice(0, 4).join(", ");
    if (data[i].affectedBy.length > 4) {
      affectedByText += " и другие языки программирования";
    }
    let findedDeveloper;
    let influencedByList = data[i].influencedBy.join(", ");
    let filenameExtensionsText = data[i].filenameExtensions
      .split(", ")
      .map(function (elem) {
        return "." + elem;
      })
      .join(", ");

    developers.forEach((element) => {
      if (element.index === data[i].developerIndex) {
        findedDeveloper = element;
      }
    });
    finalText.push(
      `${data[i].name} -  язык программирования выпущенный в ${data[i].year} году.\nАвтором языка стал ${findedDeveloper.name} - ${findedDeveloper.work}.\nФайлы программ, написанных на ${data[i].name}, могут иметь расширения ${filenameExtensionsText}.\n${data[i].name} испытал влияние ${data[i].influencedBy.length} языков программирования: ${influencedByList}.\n${data[i].name} повлиял на ${affectedByText}.`
    );
  }
  console.log(finalText.join("\n\n"));
}
