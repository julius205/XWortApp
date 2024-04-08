// Importiere die erforderlichen Module
import connectDB from "../../lib/db";
import KreuzwortModel from "../../models/KreuzwortModel";

// Definiere die API-Routen-Funktion
export default async function handler(req, res) {
  // Stelle eine Verbindung zur Datenbank her
  await connectDB();

  try {
    // Finde alle Einträge in der Datenbank
    const allEntries = await KreuzwortModel.find();

    // Generiere einen zufälligen Index
    const randomIndex = Math.floor(Math.random() * allEntries.length);

    // Wähle den Eintrag basierend auf dem zufälligen Index aus
    const randomEntry = allEntries[randomIndex];

    // Sende die Antwort mit dem zufälligen Eintrag als JSON zurück
    res.status(200).json({ kreuzwort: randomEntry });
  } catch (error) {
    // Handle Fehler, falls welche auftreten
    console.error("Error fetching random question:", error);
    res.status(500).json({ error: "Error fetching random question" });
  }
}
