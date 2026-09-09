import { getStoreData } from '../services/store.js';

export const getStudentAnalytics = async (req, res, next) => {
  try {
    const store = getStoreData();
    const profile = store.studentProfile;

    // Build performance matrix & stats
    const topicPerformance = [
      { topic: "Arrays", count: 45, label: "45 solved (92% acc)" },
      { topic: "Strings", count: 38, label: "38 solved (88% acc)" },
      { topic: "Trees", count: 28, label: "28 solved (75% acc)" },
      { topic: "Graphs", count: 19, label: "19 solved (68% acc)" },
      { topic: "DP", count: 12, label: "12 solved (42% acc)" }
    ];

    const accuracyTrends = [
      { week: "Week 1", value: 75 },
      { week: "Week 2", value: 80 },
      { week: "Week 3", value: 84 },
      { week: "Week 4", value: 88.5 }
    ];

    const difficultyBreakdown = {
      easy: { solved: 82, total: 90, percent: 91 },
      medium: { solved: 48, total: 110, percent: 43.6 },
      hard: { solved: 12, total: 50, percent: 24 }
    };

    return res.json({
      success: true,
      profile,
      topicPerformance,
      accuracyTrends,
      difficultyBreakdown
    });
  } catch (error) {
    next(error);
  }
};
