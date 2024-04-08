import connectDB from "../../lib/db";
import KreuzwortModel from "../../models/KreuzwortModel";

const ONE_HOUR = 3600; // Sekunden

// In-Memory-Cache
let cachedEntry = null;
let lastUpdated = null;

export default async function handler(req, res) {
  const shouldUpdateCache = !cachedEntry || Date.now() - lastUpdated > ONE_HOUR;

  if (shouldUpdateCache) {
    await connectDB();
    cachedEntry = await KreuzwortModel.aggregate([{ $sample: { size: 1 } }]);
    lastUpdated = Date.now();
  }

  // Sende die Antwort mit dem zufälligen Eintrag als JSON zurück
  res.setHeader("Cache-Control", `max-age=${ONE_HOUR}`);
  res.status(200).json({ kreuzwort: cachedEntry });
}
