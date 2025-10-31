export default async function handler(req, res) {
  const url = new URL(req.url);
  const ssc = parseFloat(url.searchParams.get("ssc"));
  const hsc = parseFloat(url.searchParams.get("hsc"));
  const group = url.searchParams.get("group");
  const timer = url.searchParams.get("timer");

  if (isNaN(ssc) || isNaN(hsc) || ssc < 1 || ssc > 5 || hsc < 1 || hsc > 5 || !group || !timer) {
    return res.status(400).json({ error: "Please enter valid GPA and select all options." });
  }

  const total = parseFloat((ssc + hsc).toFixed(2));

  const universities = getUniversities();

  const results = universities.map(uni => {
    const criteria = uni[group];
    if (!criteria) return null;

    if (uni.scienceOnly && group !== "বিজ্ঞান") {
      return {
        university: uni.name,
        note: "শুধুমাত্র বিজ্ঞান বিভাগের শিক্ষার্থীরা আবেদন করতে পারবে।",
        exam: uni.examDate[group] || null,
        eligible: false,
        shortNote: uni.shortNote || null,
        unit: uni.unit ? uni.unit[group] : null
      };
    }

    if (uni.firstTimerOnly && timer === "second") {
      return {
        university: uni.name,
        note: "এই বিশ্ববিদ্যালয়ে দ্বিতীয়বার আবেদন করা যাবে না।",
        exam: uni.examDate[group] || null,
        eligible: false,
        shortNote: uni.shortNote || null,
        unit: uni.unit ? uni.unit[group] : null
      };
    }

    const eligible = ssc >= criteria.minSSC && hsc >= criteria.minHSC && total >= criteria.minTotal;

    return {
      university: uni.name,
      required: criteria,
      your: { ssc, hsc, total },
      eligible,
      note: null,
      exam: uni.examDate[group],
      shortNote: uni.shortNote || null,
      unit: uni.unit ? uni.unit[group] : null
    };
  }).filter(Boolean)
    .sort((a,b) => (a.eligible === b.eligible ? 0 : a.eligible ? -1 : 1));

  res.status(200).json({ total, group, timer, results });
}

function getUniversities() {
  return [
    {
      name: "ঢাকা বিশ্ববিদ্যালয় (DU)",
      firstTimerOnly: true,
      scienceOnly: false,
      shortNote: "ন্যূনতম SSC ও HSC তে ৩.৫ থাকতে হবে এবং মোট GPA ৮.০০।",
      বিজ্ঞান: { minSSC: 3.5, minHSC: 3.5, minTotal: 8.0 },
      মানবিক: { minSSC: 3.0, minHSC: 3.0, minTotal: 7.5 },
      বাণিজ্য: { minSSC: 3.5, minHSC: 3.5, minTotal: 8.0 },
      examDate: {
        বিজ্ঞান: "2024-12-20T10:00:00",
        মানবিক: "2025-12-03T10:00:00",
        বাণিজ্য: "2025-12-06T10:00:00",
        আইবিএ: "2025-12-12T10:00:00"
      },
      unit: { বিজ্ঞান: "A ইউনিট", মানবিক: "B ইউনিট", বাণিজ্য: "C ইউনিট", আইবিএ: "D ইউনিট" }
    },
    {
      name: "রাজশাহী বিশ্ববিদ্যালয় (RU)",
      firstTimerOnly: false,
      scienceOnly: false,
      shortNote: "SSC ও HSC তে সর্বনিম্ন GPA ৩.০০ থাকতে হবে এবং মোট GPA ৭.০০।",
      বিজ্ঞান: { minSSC: 3.0, minHSC: 3.0, minTotal: 7.0 },
      মানবিক: { minSSC: 3.0, minHSC: 3.0, minTotal: 6.5 },
      বাণিজ্য: { minSSC: 3.0, minHSC: 3.0, minTotal: 6.5 },
      examDate: { মানবিক: "2026-01-17T10:00:00", বিজ্ঞান: "2026-01-19T10:00:00", বাণিজ্য: "2026-01-24T10:00:00" },
      unit: { মানবিক: "A ইউনিট", বিজ্ঞান: "C ইউনিট", বাণিজ্য: "B ইউনিট" }
    }
  ];
}
