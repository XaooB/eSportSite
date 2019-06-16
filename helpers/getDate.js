module.exports = function getDay() {
  const dateObj = new Date();
  const day = dateObj.getDay();

  const daysArr = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota"
  ];

  return daysArr[day] + ", " + dateObj.toLocaleDateString();
};
