export default function handler(req, res) {
  // Liste von Zahlen
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Zufällige Indexnummer auswählen
  const randomIndex = Math.floor(Math.random() * numbers.length);

  // Zufällige Zahl aus der Liste auswählen
  const randomNumber = numbers[randomIndex];

  // Senden der zufälligen Zahl als JSON-Antwort
  res.status(200).json({ randomNumber });
}
