const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

function formatDuration(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;

  if (minutes > 0) {
    return `${minutes} daqiqa ${rest} soniya`;
  }

  return `${rest} soniya`;
}

router.get('/', async (req, res) => {
  try {
    const results = await Result.find().sort({ timestamp: -1 }).lean();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const poseCounts = results.reduce((acc, item) => {
      acc[item.pose] = (acc[item.pose] || 0) + 1;
      return acc;
    }, {});

    const topPoseEntry = Object.entries(poseCounts).sort((a, b) => b[1] - a[1])[0];
    const todayCount = results.filter((item) => new Date(item.timestamp) >= todayStart).length;

    res.render('results', {
      title: 'Natijalar',
      active: 'results',
      results,
      stats: {
        total: results.length,
        topPose: topPoseEntry ? topPoseEntry[0] : "Hali yo'q",
        today: todayCount
      },
      poseCounts,
      formatDuration
    });
  } catch (error) {
    res.status(500).render('results', {
      title: 'Natijalar',
      active: 'results',
      results: [],
      stats: {
        total: 0,
        topPose: 'Xatolik',
        today: 0
      },
      poseCounts: {},
      formatDuration,
      error: "Natijalarni yuklashda xatolik yuz berdi."
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { pose, duration, advice, timestamp } = req.body;
    const result = await Result.create({
      pose,
      duration: Number(duration) || 0,
      advice,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });

    res.status(201).json({
      ok: true,
      message: 'Natija saqlandi.',
      result
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Natijani saqlashda xatolik yuz berdi."
    });
  }
});

module.exports = router;
