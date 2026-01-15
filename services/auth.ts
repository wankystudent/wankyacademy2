
import { User, AttendanceData } from '../types';

const OFFICIAL_INF_STUDENTS = [
  { id:1, name:"Bertony Pompee", accessCode:"WA-INF-2025-0001", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:2, name:"Bonhomme Semexant", accessCode:"WA-INF-2025-0002", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:3, name:"Cherline Dieudone", accessCode:"WA-INF-2025-0003", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:4, name:"Darenky Ciceus", accessCode:"WA-INF-2025-0004", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:5, name:"Emirlens Lliome Est", accessCode:"WA-INF-2025-0005", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:6, name:"Germinal Wichiglaine", accessCode:"WA-INF-2025-0006", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:7, name:"Jude Lormestoire", accessCode:"WA-INF-2025-0007", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:8, name:"Kerline Dieudone", accessCode:"WA-INF-2025-0008", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:9, name:"Nahima Dieudonne", accessCode:"WA-INF-2025-0009", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:10, name:"Philippe Ciceus", accessCode:"WA-INF-2025-0010", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:11, name:"Sophanie Altidor", accessCode:"WA-INF-2025-0011", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:12, name:"Tinor Jesulien", accessCode:"WA-INF-2025-0012", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false },
  { id:13, name:"Evelyne Dormeus", accessCode:"WA-INF-2025-0013", course:"Informatique", courseCode:"INF-001", role:"student", access:true, createdAt:"2025-01-01", editableName: false }
];

const COURSE_CONFIGS = [
  { course: "Informatique", courseCode: "INF-001", prefix: "WA-INF-2025-" },
  { course: "Canva Mastery", courseCode: "CAN-001", prefix: "WA-CAN-2025-" },
  { course: "WordPress de A à Z", courseCode: "WP-001", prefix: "WA-WP-2025-" },
  { course: "Création de Radio en Ligne", courseCode: "RAD-001", prefix: "WA-RAD-2025-" },
  { course: "Master Réseaux Sociaux", courseCode: "SOC-001", prefix: "WA-SOC-2025-" },
  { course: "Sublimation", courseCode: "SUB-001", prefix: "WA-SUB-2025-" },
  { course: "Tableaux Personnalisés", courseCode: "TAB-001", prefix: "WA-TAB-2025-" }
];

const ATTENDANCE_DATES_INF = [
  "2025-12-06", "2025-12-13", "2025-12-20", "2025-12-27",
  "2026-01-03", "2026-01-10", "2026-01-17", "2026-01-24", "2026-01-31",
  "2026-02-07", "2026-02-14", "2026-02-21", "2026-02-28",
  "2026-03-07", "2026-03-14", "2026-03-21", "2026-03-28",
  "2026-04-04", "2026-04-11", "2026-04-18", "2026-04-25"
];

export const initDatabase = () => {
  try {
    const rawDb = localStorage.getItem("WA_DATABASE");
    let db: any[] = rawDb ? JSON.parse(rawDb) : [];
    let updated = false;

    // 1. Ensure Professor exists
    if (!db.find(u => u.accessCode === "WA-PROF-2025-0001")) {
      db.push({ id: 1000, name: "Wanky Massenat", accessCode: "WA-PROF-2025-0001", role: "professor", access: true, editableName: false });
      updated = true;
    }

    // 2. Ensure Admin exists
    if (!db.find(u => u.accessCode === "WA-ADM-2025-0001")) {
      db.push({ id: 999, name: "Admin Academy", accessCode: "WA-ADM-2025-0001", role: "admin", access: true, editableName: false });
      updated = true;
    }

    // 3. Add Official INF students if missing
    OFFICIAL_INF_STUDENTS.forEach(student => {
      if (!db.find(u => u.accessCode === student.accessCode)) {
        db.push(student);
        updated = true;
      }
    });

    // 4. Generate 100 codes for each course
    COURSE_CONFIGS.forEach(config => {
      for (let i = 1; i <= 100; i++) {
        const code = `${config.prefix}${String(i).padStart(4, "0")}`;
        
        if (!db.find(u => u.accessCode === code)) {
          db.push({
            id: db.length + 1,
            name: `Student ${code}`,
            accessCode: code,
            course: config.course,
            courseCode: config.courseCode,
            role: "student",
            access: true,
            editableName: true,
            createdAt: "2025-01-01"
          });
          updated = true;
        }
      }
    });

    if (updated) {
      localStorage.setItem("WA_DATABASE", JSON.stringify(db));
      console.log("✅ WA_DATABASE synchronized with all courses (700+ codes)");
    }

    // 5. Init Attendance Data
    const rawAtt = localStorage.getItem("WA_ATTENDANCE_INF");
    if (!rawAtt) {
      const att: AttendanceData = {
        courseCode: "INF-001",
        startDate: "2025-12-06",
        endDate: "2026-04-25",
        days: ATTENDANCE_DATES_INF,
        records: {}
      };
      localStorage.setItem("WA_ATTENDANCE_INF", JSON.stringify(att));
    }
  } catch (e) {
    console.error("Failed to init database", e);
  }
};

export const loginWithCode = (code: string) => {
  try {
    const rawDb = localStorage.getItem("WA_DATABASE");
    const db: any[] = rawDb ? JSON.parse(rawDb) : [];
    const user = db.find(u => u.accessCode === code.toUpperCase().trim() && u.access);

    if (user) {
      const appUser: User = {
          ...user,
          email: user.email || `${user.accessCode.toLowerCase()}@wankyacademy.com`,
          idNumber: user.accessCode,
          joinedDate: user.createdAt || new Date().toISOString(),
          courses: user.course ? [user.course] : [],
          notes: user.notes || '',
          quizScores: user.quizScores || {}
      };
      
      localStorage.setItem("WA_SESSION", JSON.stringify(appUser));
      localStorage.setItem("wa_logged_user", JSON.stringify(appUser));
      return { success: true, user: appUser };
    }
  } catch (e) {
    console.error("Login with code error", e);
  }
  return { success: false, message: "Accès refusé" };
};

export const getSession = (): User | null => {
    try {
      const session = localStorage.getItem("WA_SESSION");
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
};

export const verifyAccessCode = (code: string) => {
  try {
    const rawDb = localStorage.getItem("WA_DATABASE");
    const db: any[] = rawDb ? JSON.parse(rawDb) : [];
    const user = db.find(u => u.accessCode === code.toUpperCase().trim());

    if (user) {
      return {
        valid: true,
        name: user.name,
        role: user.role,
        course: user.course,
        access: user.access
      };
    }
  } catch (e) {}
  return { valid: false };
};
