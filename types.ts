
export enum Language {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  HT = 'ht'
}

export interface LegalSection {
  title: string;
  content: string;
  list?: string[];
}

export interface LegalPageContent {
  title: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export interface InstitutionalEmailData {
  status: 'NONE' | 'PENDING' | 'APPROVED' | 'ACTIVE' | 'REJECTED';
  email: string;
  tempPassword?: string;
  requestedAt?: string;
  approvedAt?: string;
}

export interface StoredCertificate {
  certId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  issueDate: string;
  pdfBase64: string;
  status: 'valid' | 'invalid';
  signature?: string;
  signedBy?: string;
  signedAt?: string;
}

export interface AttendanceData {
  courseCode: string;
  startDate: string;
  endDate: string;
  days: string[];
  records: Record<string, Record<string, boolean>>; // studentCode -> { date: present }
}

export interface TranslationDictionary {
  meta: { title: string; description: string; };
  nav: {
    home: string;
    courses: string;
    tools: string;
    videos: string;
    about: string;
    contact: string;
    login: string;
    dashboard: string;
    faq: string;
    shop: string;
    subscribe: string;
  };
  hero: { headline: string; subtext: string; btn_start: string; btn_explore: string; };
  home_sections: {
    about_school: {
      title: string;
      subtitle: string;
      desc: string;
      points: string[];
      cta: string;
    };
    popular_courses: string;
    premium_tools: {
        title: string;
        desc: string;
        btn: string;
    };
    about_founder: {
        title: string;
        content: string[];
    };
    testimonials: {
        title: string;
        items: { name: string; role: string; text: string }[];
    };
  };
  courses_page: {
    title: string;
    subtitle: string;
    free_courses: string;
    premium_courses: string;
    start_quiz: string;
    watch_now: string;
  };
  shop_page: {
    title: string;
    subtitle: string;
    btn_buy: string;
  };
  auth: {
    login_title: string;
    register_title: string;
    email: string;
    password: string;
    name: string;
    btn_login: string;
    btn_register: string;
    have_account: string;
    no_account: string;
    logout: string;
    select_course: string;
    course_placeholder: string;
    course_options?: { value: string; label: string }[];
  };
  dashboard: {
    welcome: string;
    my_id: string;
    generate_id: string;
    progress: string;
    notes: string;
    save_notes: string;
    dark_mode: string;
    upload_photo: string;
    email_request: string;
    enrolled_course: string;
    my_quizzes: string;
  };
  id_card: {
    title: string;
    download_pdf: string;
    front: string;
    back: string;
    course_label: string;
    level_label: string;
  };
  email_request: {
    title: string;
    status_pending: string;
    status_approved: string;
    status_active: string;
    form_reason: string;
    btn_request: string;
    btn_change_pw: string;
    congrats_title: string;
    congrats_desc: string;
    email_label: string;
    password_label: string;
    note: string;
  };
  appointment: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
    submit: string;
    calendar_btn: string;
    success: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form_title: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: {
    desc: string;
    links: string;
    contact: string;
    copyright: string;
  };
  privacy: LegalPageContent;
  terms: LegalPageContent;
  copyright: LegalPageContent;
  subscription: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      course: string;
      select_placeholder: string;
      message: string;
      submit_btn: string;
      success_msg: string;
    };
    courses_labels: {
      info: string;
      web: string;
      canva: string;
      radio: string;
    };
    why_us: {
      title: string;
      items: { title: string; desc: string }[];
    };
    contact_box: {
      title: string;
      whatsapp: string;
      email: string;
    };
  };
  verification: {
    title: string;
    subtitle: string;
    valid_title: string;
    invalid_title: string;
    label_student: string;
    label_course: string;
    label_date: string;
    label_id: string;
    label_status: string;
    status_valid: string;
    status_invalid: string;
    loading: string;
    search_placeholder: string;
    search_btn: string;
  };
  quiz_generator: {
    title: string;
    subtitle: string;
    btn_mcq: string;
    btn_tf: string;
    generating: string;
    error: string;
  };
  student_portal: {
    academic_status: string;
    academic_program: string;
    my_courses: string;
    assessments: string;
    digital_services: string;
    online_payments: string;
    enrolled_subjects: string;
    pending_subjects: string;
    grades: string;
    schedule: string;
    account_status: string;
    withdrawal: string;
    performance_analytics: string;
    certificates_available: string;
    info_guide: string;
    change_access_code: string;
    institutional_email: string;
    online_assistance: string;
    accident_insurance: string;
    coming_soon: string;
    active: string;
    payment_method: string;
    online_payments_bullet1: string;
    online_payments_bullet2: string;
    payment_disclaimer: string;
  };
}

export interface User {
  id?: number | string;
  email: string;
  name: string;
  photo?: string; // base64
  idNumber: string;
  accessCode?: string;
  joinedDate: string;
  courses: string[];
  course?: string;
  courseCode?: string;
  role?: 'student' | 'professor' | 'admin';
  access?: boolean;
  editableName?: boolean;
  notes: string;
  quizScores: Record<string, number>;
  lastActiveCourse?: string; // ID of the last course interacted with
  emailRequest?: InstitutionalEmailData;
  createdAt?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CourseData {
  id: string;
  title: string;
  type: 'video' | 'playlist';
  src: string; // YouTube ID or Playlist ID
  description: string;
  questions: QuizQuestion[];
  isExternal?: boolean;
}

export interface QuizHistoryItem {
  lesson_id: string;
  course_title: string;
  score: number;
  total: number;
  date: string;
  type: 'MCQ' | 'TrueFalse' | 'Static';
}
