import connectDB from "../../lib/db";
import KreuzwortModel from "../../models/KreuzwortModel";

export default async function handler(req, res) {
  await connectDB();

  try {
    const randomEntry = await KreuzwortModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    // Sende die Antwort mit dem zufälligen Eintrag als JSON zurück
    res.status(200).json({ kreuzwort: randomEntry });
  } catch (error) {
    // Handle Fehler, falls welche auftreten
    console.error("Error fetching random question:", error);
    res.status(500).json({ error: "Error fetching random question" });
  }
}
