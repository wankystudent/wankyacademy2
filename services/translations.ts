
import { Language, TranslationDictionary, LegalPageContent } from '../types';

const commonLegal = {
    privacy: {
        title: "Privacy Policy",
        effectiveDate: "Effective: November 10, 2025",
        sections: [
            { title: "1. Introduction", content: "Welcome to Wanky Academy, operated by Wanky Massenat. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website, shop, or learning platform." },
            { title: "2. Information We Collect", content: "We collect personal and non-personal information, including:", list: ["Name, email address, and contact details", "Payment information when purchasing courses or tools", "Account login details (for registered users)", "Browser data, cookies, and IP address (for analytics and security)"] },
            { title: "3. How We Use Your Information", content: "Your information is used to:", list: ["Provide access to our courses and premium tools", "Process orders and payments", "Send updates, newsletters, or promotions", "Improve our website and learning experience", "Ensure compliance with our Terms of Service"] },
            { title: "4. Cookies", content: "We use cookies to enhance user experience, remember preferences, and analyze traffic. You can disable cookies in your browser settings, but some features may not work properly." },
            { title: "5. Sharing of Information", content: "We do not sell or rent your personal information. We may share limited data with trusted third parties (e.g., payment processors, email services) only to deliver our services securely." },
            { title: "6. Data Security", content: "We use SSL encryption and other security measures to protect your personal data. However, no online transmission is 100% secure. You share information at your own risk." },
            { title: "7. Your Rights", content: "You have the right to:", list: ["Access or request deletion of your personal data", "Update or correct inaccurate information", "Opt-out of marketing emails at any time", "To exercise your rights, contact us at: support@wankyacademy.com"] },
            { title: "8. Children’s Privacy", content: "Our services are intended for users aged 16 and older. We do not knowingly collect personal data from minors." },
            { title: "9. Updates to This Policy", content: "We may update this Privacy Policy periodically. Changes will be posted on this page with a new effective date." },
            { title: "10. Contact", content: "For questions or concerns, please contact: support@wankyacademy.com" }
        ]
    },
    terms: {
        title: "Terms of Service",
        effectiveDate: "Effective: November 10, 2025",
        sections: [
            { title: " acceptance of Terms", content: "By accessing or using Wanky Academy’s website, shop, or courses, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services." },
            { title: "2. Description of Service", content: "Wanky Academy provides online courses, digital tools, and educational resources through wankyacademy.com, shop.wankyacademy.com, and kou.wankyacademy.com." },
            { title: "3. User Accounts", content: "To access some services, you must create an account. You are responsible for keeping your login information secure and for all activity under your account." },
            { title: "4. Payments and Refunds", content: "All payments must be made in full at the time of purchase. Due to the digital nature of our products and courses, all sales are final and non-refundable, except in cases of double billing or technical error." },
            { title: "5. Intellectual Property", content: "All content, including videos, texts, graphics, and course materials, is the property of Wanky Academy and protected by copyright law. You may not reproduce, distribute, or resell our content without written permission." },
            { title: "6. User Conduct", content: "Users agree not to:", list: ["Share course login credentials", "Distribute unauthorized copies of materials", "Engage in fraudulent, abusive, or illegal behavior"] },
            { title: "7. Third-Party Links", content: "Our website may contain links to external sites. We are not responsible for the content or privacy practices of those websites." },
            { title: "8. Limitation of Liability", content: "Wanky Academy and its affiliates are not liable for any damages resulting from the use or inability to use our services, including data loss, technical issues, or third-party actions." },
            { title: "9. Termination", content: "We may suspend or terminate user access for violating these Terms or engaging in suspicious activity." },
            { title: "10. Modifications", content: "We reserve the right to modify these Terms at any time. Continued use of our services after updates means you accept the new Terms." },
            { title: "11. Contact", content: "If you have questions about these Terms, contact us at: support@wankyacademy.com" }
        ]
    }
};

const copyrightContent: LegalPageContent = {
    title: "Copyright & Fair Use",
    effectiveDate: "Date d'effet : 10 Novembre 2025",
    sections: [
        {
            title: "1. Introduction",
            content: "Wanky Academy est une plateforme éducative en ligne dédiée à l'apprentissage numérique, la technologie et le développement des compétences professionnelles. Certains matériels d'apprentissage, y compris des vidéos, peuvent provenir de sources externes et sont utilisés strictement à des fins éducatives."
        },
        {
            title: "2. Avis de Droits d'Auteur (Copyright)",
            content: "Toutes les marques, logos, vidéos, images et contenus appartiennent à leurs propriétaires respectifs. Wanky Academy :\n• Ne revendique pas la propriété des vidéos YouTube externes.\n• Ne revend pas de contenu externe.\n• Ne modifie pas les matériels originaux protégés par le droit d'auteur."
        },
        {
            title: "3. Politique d'Usage Loyal (Fair Use)",
            content: "Conformément aux principes du Fair Use (Usage Loyal), Wanky Academy peut intégrer ou référencer du contenu tiers à des fins telles que l'éducation, la formation, le commentaire et l'explication, ou les activités d'apprentissage non commerciales. Ces matériels sont utilisés pour améliorer la compréhension et soutenir les résultats d'apprentissage."
        },
        {
            title: "4. Avertissement Vidéo Externe",
            content: "Pour les vidéos n'appartenant pas à Wanky Academy, l'avertissement suivant est affiché afin d'assurer la transparence et le respect des créateurs de contenu :",
            list: ["⚠️ Cette vidéo provient d’une source externe. Wanky Academy n’est pas le propriétaire du contenu. La vidéo est utilisée uniquement à des fins éducatives."]
        },
        {
            title: "5. Contenu Officiel Wanky Academy",
            content: "Le contenu créé et publié par Wanky Academy (y compris les cours officiels et playlists) est entièrement détenu par Wanky Academy et protégé par les lois sur le droit d'auteur. Exemple de contenu officiel : « Kreye sit ak WordPress & kreye yon shop », Playlist : « Kreye sit ak WordPress »."
        },
        {
            title: "6. Demandes et Signalements",
            content: "Si vous êtes propriétaire de contenu et pensez qu'un matériel utilisé sur Wanky Academy enfreint vos droits d'auteur, veuillez nous contacter immédiatement à contact@wankyacademy.com. Après vérification, le contenu sera examiné et retiré si nécessaire."
        },
        {
            title: "7. Acceptation",
            content: "En utilisant Wanky Academy, les utilisateurs reconnaissent et acceptent cette Politique de Droits d'auteur et d'Usage Équitable."
        }
    ]
};

const en: TranslationDictionary = {
  meta: { title: "Wanky Academy", description: "Learn Digital Skills" },
  nav: { home: "Home", courses: "Courses", tools: "Tools", videos: "Videos", about: "Founder", contact: "Contact", login: "Student Portal", dashboard: "Dashboard", faq: "FAQ", shop: "Shop", subscribe: "Enroll" },
  hero: { headline: "Learn. Create. Succeed — Join Wanky Academy Today!", subtext: "Master WordPress, Canva, and modern digital skills to grow your brand or business.", btn_start: "Start Course", btn_explore: "View Tools" },
  home_sections: {
    about_school: {
      title: "Learn Digital Skills That Change Your Future",
      subtitle: "Wanky Academy is an online school dedicated to teaching WordPress, Canva, and digital tools in a practical and accessible way.",
      desc: "Our mission is to empower students, entrepreneurs, and professionals with real-world digital skills through structured courses, hands-on learning, and guided coaching.",
      points: [
        "Practical WordPress training (sites & eCommerce)",
        "Canva mastery for design & branding",
        "Beginner-friendly, step-by-step approach",
        "Certificates with online verification"
      ],
      cta: "Start Learning Now"
    },
    popular_courses: "Popular Courses",
    premium_tools: { title: "Premium Tools", desc: "Get access to the best digital tools to scale your business.", btn: "Visit Shop" },
    about_founder: {
        title: "About the Founder",
        content: [
            "Wanky Massenat is a visionary entrepreneur, educator, and 5th-year medical student driven by a deep passion for technology, education, and social impact. With a unique background that bridges medicine and digital innovation, he is committed to empowering individuals through practical knowledge and accessible learning.",
            "He is the founder of Wanky Academy, an online education platform dedicated to helping students and professionals master essential digital skills such as Informatics, WordPress, Canva, and online business tools. Through Wanky Academy, thousands of learners gain the confidence and competence needed to succeed in today’s digital world.",
            "Wanky is also the founder of EstudiaMedTech, a specialized educational platform designed to support medical students and graduates in preparing for national and international medical residency exams, including ENURM, ENARM (Mexico), Chile, and Brazil. His work in medical education reflects his belief that high-quality academic resources should be reliable, practical, and accessible to all.",
            "At the heart of all his projects is a clear mission: To make digital and academic education accessible, practical, and inspiring for everyone—regardless of background or location.",
            "Through continuous innovation, mentorship, and community-driven learning, Wanky Massenat continues to build platforms that transform knowledge into opportunity and help learners turn their potential into real-world success."
        ]
    },
    testimonials: {
        title: "What Our Students Say",
        items: [
            { name: "Sarah L.", role: "Web Designer", text: "Wanky Academy completely transformed how I use WordPress. The courses are practical and easy to follow!" },
            { name: "Jean M.", role: "Entrepreneur", text: "The Canva Mastery course helped me create stunning visuals for my business without hiring a designer." },
            { name: "David K.", role: "Student", text: "High quality education. Wanky Massenat is an excellent instructor who truly cares about student success." }
        ]
    }
  },
  courses_page: { title: "Our Courses", subtitle: "Free and Premium content to boost your career", free_courses: "Free Courses", premium_courses: "Premium Courses", start_quiz: "Take Quiz", watch_now: "Watch Now" },
  shop_page: {
    title: "Premium Tools",
    subtitle: "Professional digital tools to scale your business.",
    btn_buy: "Buy Now"
  },
  auth: { login_title: "Student Login", register_title: "Register New Account", email: "Email Address", password: "Password", name: "Full Name", btn_login: "Login", btn_register: "Register", have_account: "Already have an account? Login", no_account: "No account? Register", logout: "Logout", select_course: "Select Course", course_placeholder: "Choose a course...", course_options: [] },
  dashboard: { welcome: "Welcome back,", my_id: "My Student ID", generate_id: "Generate ID Card", progress: "My Progress", notes: "My Notes", save_notes: "Save Notes", dark_mode: "Dark Mode", upload_photo: "Upload Photo", email_request: "Institutional Email", enrolled_course: "Enrolled Course", my_quizzes: "My Quizzes" },
  id_card: { title: "Student ID Card", download_pdf: "Download PDF", front: "Front", back: "Back", course_label: "Course", level_label: "Level" },
  email_request: {
    title: "Institutional Email Request",
    status_pending: "Approval Pending",
    status_approved: "Approved",
    status_active: "Active",
    form_reason: "Reason for request (Optional)",
    btn_request: "Request Email",
    btn_change_pw: "Change Password",
    congrats_title: "Congratulations! Your email is ready.",
    congrats_desc: "Your institutional email has been approved. Please use the temporary password below to log in for the first time.",
    email_label: "Institutional Email",
    password_label: "Temporary Password",
    note: "Please change your password immediately after logging in."
  },
  appointment: { title: "Book an Appointment", subtitle: "Schedule a coaching session with Wanky Massenat", name: "Full Name", email: "Email", phone: "Phone (Optional)", service: "Service", date: "Date & Time", message: "Message", submit: "Confirm Booking", calendar_btn: "Add to Google Calendar", success: "Booking request sent!" },
  contact: { title: "Contact Us", subtitle: "We are here to help.", form_title: "Send a Message" },
  faq: { title: "Frequently Asked Questions", items: [
      { q: "How do I access my student portal?", a: "You access the portal by entering your unique access code provided by Wanky Academy. No password is required." },
      { q: "Do I need an account or email to log in?", a: "No. Access is based only on your student access code." },
      { q: "What should I do if my access code does not work?", a: "Check that the code is correct. If the issue continues, contact administration via WhatsApp or Web3Forms." },
      { q: "Can I change my displayed name on the portal?", a: "Yes. Students can modify their displayed name from their profile (if allowed)." },
      { q: "What courses are available at Wanky Academy?", a: "Informatics, Canva, WordPress, Online Radio Creation, Social Media, Sublimation, and Customized Boards." },
      { q: "What does a course code (e.g., INF-001) mean?", a: "Each code identifies a specific course for access, quizzes, ID cards, and certificates." },
      { q: "How do quizzes work?", a: "Quizzes evaluate your knowledge at the end of modules and are required to obtain certificates." },
      { q: "What is the minimum score to receive a certificate?", a: "You must score at least 70% on the final quiz." },
      { q: "Why is my certificate locked?", a: "Certificates remain locked if the minimum score of 70% is not reached." },
      { q: "Can I retake a quiz?", a: "Yes, depending on course rules, you may retake quizzes to improve your score." },
      { q: "How do I download my certificate?", a: "Once unlocked, certificates can be downloaded as PDF from your dashboard." },
      { q: "How can I verify a certificate or student code?", a: "Use the verify.html page and enter the corresponding code." },
      { q: "Can I generate a student ID card?", a: "Yes. Every student can generate and download an official digital ID card." },
      { q: "Can I upload a profile photo?", a: "Yes. You can upload an image (PNG, JPG) or use an image link." },
      { q: "Does the portal work offline?", a: "Yes. The system works offline using browser LocalStorage." },
      { q: "Where is my data stored?", a: "Data is stored locally in your browser using LocalStorage." },
      { q: "Do all course videos belong to Wanky Academy?", a: "No. Some videos come from external sources and are used for educational purposes (Fair Use)." },
      { q: "What payment methods are available?", a: "Online payments via PayPal and Stripe (links available in the portal)." },
      { q: "Can I request an institutional email?", a: "Yes. You may request a @wankyacademy.com email via Web3Forms." },
      { q: "How can I contact Wanky Academy support?", a: "Via WhatsApp, official email, or the contact form on the website." }
  ] },
  footer: { desc: "Empowering the next generation of digital creators.", links: "Quick Links", contact: "Contact", copyright: "© 2025 Wanky Academy." },
  privacy: commonLegal.privacy, terms: commonLegal.terms, copyright: copyrightContent,
  subscription: {
    title: "Course Enrollment",
    subtitle: "Take the first step towards your digital future.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number (Optional)",
      course: "Course",
      select_placeholder: "Select a course",
      message: "Message / Details (Optional)",
      submit_btn: "Enroll Now",
      success_msg: "Registration successful! Check your email."
    },
    courses_labels: {
      info: "Computer Science (Informatique)",
      web: "Webmaster",
      canva: "Canva Mastery",
      radio: "Online Radio Creation"
    },
    why_us: {
      title: "Why Choose Wanky Academy?",
      items: [
        { title: "Practical Training", desc: "Learn by doing with real-world projects." },
        { title: "Expert Instructors", desc: "Guided by professionals in the field." },
        { title: "Accessible", desc: "Learn from anywhere, at your own pace." },
        { title: "Certificates", desc: "Earn a certificate upon completion." }
      ]
    },
    contact_box: {
      title: "Quick Contact",
      whatsapp: "WhatsApp",
      email: "Email"
    }
  },
  verification: {
    title: "Certificate Verification",
    subtitle: "Verify the authenticity of a Wanky Academy certificate.",
    valid_title: "Valid Certificate",
    invalid_title: "Invalid Certificate",
    label_student: "Student Name",
    label_course: "Course",
    label_date: "Issue Date",
    label_id: "Certificate ID",
    label_status: "Status",
    status_valid: "VERIFIED",
    status_invalid: "NOT FOUND",
    loading: "Verifying...",
    search_placeholder: "Enter Certificate ID",
    search_btn: "Verify"
  },
  quiz_generator: {
    title: "Quiz After Class",
    subtitle: "Test your knowledge with an AI-generated quiz",
    btn_mcq: "Generate 20 MCQ Quiz",
    btn_tf: "Generate 20 True/False",
    generating: "Generating your quiz...",
    error: "Failed to generate quiz. Please try again."
  },
  student_portal: {
    academic_status: "Academic Status",
    academic_program: "Academic Program",
    my_courses: "My Courses",
    assessments: "Assessments",
    digital_services: "Digital Services",
    online_payments: "Online Payments",
    enrolled_subjects: "Enrolled subjects",
    pending_subjects: "Pending subjects",
    grades: "Grades",
    schedule: "Schedule",
    account_status: "Account status",
    withdrawal: "Course withdrawal",
    performance_analytics: "Performance analytics",
    certificates_available: "Certificates available",
    info_guide: "Information guide",
    change_access_code: "Change access code",
    institutional_email: "Institutional email",
    online_assistance: "Online assistance",
    accident_insurance: "Personal accident insurance",
    coming_soon: "Coming soon",
    active: "Active",
    payment_method: "Payment Method",
    online_payments_bullet1: "Pay tuition or digital services securely",
    online_payments_bullet2: "Payments are processed externally",
    payment_disclaimer: "Payments are processed securely by third-party providers (PayPal / Stripe). Wanky Academy does not store payment information."
  }
};

const fr: TranslationDictionary = {
  ...en,
  faq: { title: "Foire Aux Questions", items: [
      { q: "Comment accéder à mon portail étudiant ?", a: "Accédez au portail en entrant votre code d’accès unique fourni par Wanky Academy. Aucun mot de passe n’est requis." },
      { q: "Ai-je besoin d'un compte ou d'un email pour me connecter ?", a: "Non. L'accès est basé uniquement sur votre code d'accès étudiant." },
      { q: "Que faire si mon code d'accès ne fonctionne pas ?", a: "Vérifiez que le code est correct. Si le problème persiste, contactez l'administration via WhatsApp ou Web3Forms." },
      { q: "Puis-je changer mon nom affiché sur le portail ?", a: "Oui. Les étudiants peuvent modifier leur nom affiché depuis leur profil (si autorisé)." },
      { q: "Quels cours sont disponibles à Wanky Academy ?", a: "Informatique, Canva, WordPress, Création de Radio en Ligne, Réseaux Sociaux, Sublimation et Tableaux Personnalisés." },
      { q: "Que signifie un code de cours (ex: INF-001) ?", a: "Chaque code identifie un cours spécifique pour l'accès, les quiz, les cartes d'identité et les certificats." },
      { q: "Comment fonctionnent les quiz ?", a: "Les quiz évaluent vos connaissances à la fin des modules et sont nécessaires pour obtenir les certificats." },
      { q: "Quelle est la note minimale pour obtenir un certificat ?", a: "Vous devez obtenir au moins 70 % au quiz final." },
      { q: "Pourquoi mon certificat est-il verrouillé ?", a: "Les certificats restent verrouillés si la note minimale de 70 % n'est pas atteinte." },
      { q: "Puis-je repasser un quiz ?", a: "Oui, selon les règles du cours, vous pouvez repasser les quiz pour améliorer votre score." },
      { q: "Comment télécharger mon certificat ?", a: "Une fois déverrouillés, les certificats peuvent être téléchargés en PDF depuis votre tableau de bord." },
      { q: "Comment vérifier un certificat ou un code étudiant ?", a: "Utilisez la page verify.html et entrez le code correspondant." },
      { q: "Puis-je générer une carte d'identité d'étudiant ?", a: "Oui. Chaque étudiant peut générer et télécharger une carte d'identité numérique officielle." },
      { q: "Puis-je télécharger une photo de profil ?", a: "Oui. Vous pouvez télécharger une image (PNG, JPG) ou utiliser un lien d'image." },
      { q: "Le portail fonctionne-t-il hors-ligne ?", a: "Oui. Le système fonctionne hors-ligne en utilisant le LocalStorage du navigateur." },
      { q: "Où mes données sont-elles stockées ?", a: "Les données sont stockées localement dans votre navigateur via LocalStorage." },
      { q: "Toutes les vidéos de cours appartiennent-elles à Wanky Academy ?", a: "Non. Certaines vidéos proviennent de sources externes et sont utilisées à des fins éducatives (Fair Use)." },
      { q: "Quelles sont les méthodes de paiement disponibles ?", a: "Paiements en ligne via PayPal et Stripe (liens disponibles dans le portail)." },
      { q: "Puis-je demander un email institutionnel ?", a: "Oui. Vous pouvez demander un email @wankyacademy.com via Web3Forms." },
      { q: "Comment contacter le support de Wanky Academy ?", a: "Via WhatsApp, email officiel ou le formulaire de contact sur le site." }
  ] },
  student_portal: {
    academic_status: "État Académique",
    academic_program: "Pensum Académique",
    my_courses: "Mes Cours",
    assessments: "Évaluations",
    digital_services: "Services Numériques",
    online_payments: "Paiements en Ligne",
    enrolled_subjects: "Matières inscrites",
    pending_subjects: "Matières en attente",
    grades: "Notes",
    schedule: "Horaires",
    account_status: "État du compte",
    withdrawal: "Retrait de cours",
    performance_analytics: "Analyse des performances",
    certificates_available: "Certificats disponibles",
    info_guide: "Guide d'information",
    change_access_code: "Changer le code d'accès",
    institutional_email: "Email institutionnel",
    online_assistance: "Assistance en ligne",
    accident_insurance: "Assurance accident personnel",
    coming_soon: "À venir",
    active: "Actif",
    payment_method: "Méthode de paiement",
    online_payments_bullet1: "Payez vos cours ou services numériques en toute sécurité",
    online_payments_bullet2: "Les paiements sont traités à l'externe",
    payment_disclaimer: "Les paiements sont traités en toute sécurité par des tiers (PayPal / Stripe). Wanky Academy ne stocke aucune information de paiement."
  }
};

const es: TranslationDictionary = {
  meta: { title: "Wanky Academy", description: "Aprende Habilidades Digitales" },
  nav: { home: "Inicio", courses: "Cursos", tools: "Herramientas", videos: "Videos", about: "Fundador", contact: "Contacto", login: "Portal Estudiante", dashboard: "Panel", faq: "FAQ", shop: "Tienda", subscribe: "Inscribirse" },
  hero: { headline: "Aprende. Crea. Triunfa — ¡Únete a Wanky Academy!", subtext: "Domina WordPress, Canva y habilidades digitales para hacer crecer tu marca o negocio.", btn_start: "Empezar Curso", btn_explore: "Herramientas" },
  home_sections: {
    about_school: {
      title: "Aprende habilidades digitales que cambian tu futuro",
      subtitle: "Wanky Academy is an online school dedicated to teaching WordPress, Canva y herramientas digitales de manera práctica y accesible.",
      desc: "Nuestra misión es empoderar a estudiantes, emprendedores y profesionales con habilidades digitales del mundo real a través de cursos estructurados, aprendizaje práctico y coaching guiado.",
      points: [
        "Entrenamiento práctico de WordPress (sitios y comercio electrónico)",
        "Dominio de Canva para diseño y branding",
        "Enfoque paso a paso para principiantes",
        "Certificados con verificación en línea"
      ],
      cta: "Empieza a aprender ahora"
    },
    popular_courses: "Cursos Populares",
    premium_tools: { title: "Herramientas Premium", desc: "Accede a las mejores herramientas digitales para escalar tu negocio.", btn: "Visitar Tienda" },
    about_founder: {
        title: "Sobre el Fundador",
        content: [
            "Wanky Massenat es un emprendedor visionario, educador y estudiante de medicina de 5º año impulsado por una profunda pasión por la tecnología, la educación y el impacto social. Con una formación única que une la medicina y la innovación digital, está comprometido a empoderar a las personas a través del conocimiento práctico y el aprendizaje accesible.",
            "Es el fundador de Wanky Academy, una plataforma de educación en línea dedicada a ayudar a estudiantes y profesionales a dominar habilidades digitales esenciales como Informática, WordPress, Canva y herramientas de negocios en línea. A través de Wanky Academy, miles de alumnos obtienen la confianza y la competencia necesarias para tener éxito en el mundo digital de hoy.",
            "Wanky es también el fundador de EstudiaMedTech, una plataforma educativa especializada diseñada para apoyar a estudiantes de medicina y graduates en la preparación de exámenes de residencia médica nacionales e internacionales, incluyendo ENURM, ENARM (México), Chile y Brasil. Su trabajo en educación médica refleja su creencia de que los recursos académicos de alta calidad deben ser confiables, prácticos y accesibles para todos.",
            "En el corazón de todos sus proyectos hay una misión clara: hacer que la educación digital y académica sea accesible, práctica e inspiradora para todos, independientemente de su origen o ubicación.",
            "A través de la innovación continua, la mentoría y el aprendizaje impulsado por la comunidad, Wanky Massenat continúa construyendo plataformas que transforman el conocimiento en oportunidad y ayudan a los alumnos a convertir su potencial en éxito en el mundo real."
        ]
    },
    testimonials: {
        title: "Lo que dicen nuestros estudiantes",
        items: [
            { name: "Sarah L.", role: "Diseñadora Web", text: "Wanky Academy transformó completamente cómo uso WordPress. ¡Los cursos son prácticos y fáciles de seguir!" },
            { name: "Juan M.", role: "Emprendedor", text: "El curso de Canva Mastery me ayudó a crear visuales increíbles para mi negocio sin contratar a un diseñador." },
            { name: "David K.", role: "Estudiante", text: "Educación de alta calidad. Wanky Massenat is un excelente instructor que realmente se preocupa por el éxito de los estudiantes." }
        ]
    }
  },
  courses_page: { title: "Nuestros Cursos", subtitle: "Contenido gratuito y premium", free_courses: "Cursos Gratuitos", premium_courses: "Cursos Premium", start_quiz: "Tomar Prueba", watch_now: "Ver Ahora" },
  shop_page: {
    title: "Herramientas Premium",
    subtitle: "Herramientas digitales profesionales para escalar tu negocio.",
    btn_buy: "Comprar"
  },
  auth: { login_title: "Acceso Estudiantes", register_title: "Registrarse", email: "Correo", password: "Contraseña", name: "Nombre Completo", btn_login: "Entrar", btn_register: "Registrar", have_account: "¿Tienes cuenta? Entra", no_account: "¿No tienes cuenta? Regístrate", logout: "Salir", select_course: "Seleccionar Curso", course_placeholder: "Elige un curso...", course_options: [] },
  dashboard: { welcome: "Bienvenido,", my_id: "Mi Carnet", generate_id: "Generar Carnet", progress: "Mi Progreso", notes: "Mis Notas", save_notes: "Guardar", dark_mode: "Modo Oscuro", upload_photo: "Subir Foto", email_request: "Email Institucional", enrolled_course: "Curso Inscrito", my_quizzes: "Mis Pruebas" },
  id_card: { title: "Carnet de Estudiante", download_pdf: "Descargar PDF", front: "Frente", back: "Dorso", course_label: "Curso", level_label: "Nivel" },
  email_request: {
    title: "Solicitud de Email Institucional",
    status_pending: "Aprobación Pendiente",
    status_approved: "Aprobado",
    status_active: "Activo",
    form_reason: "Motivo de la solicitud (Opcional)",
    btn_request: "Solicitar Email",
    btn_change_pw: "Cambiar Contraseña",
    congrats_title: "¡Felicidades! Tu email está listo.",
    congrats_desc: "Tu email institucional ha sido aprobado. Usa la contraseña temporal a continuación para acceder por primera vez.",
    email_label: "Email Institucional",
    password_label: "Contraseña Temporal",
    note: "Por favor cambia tu contraseña inmediatamente después de entrar."
  },
  appointment: { title: "Reservar Cita", subtitle: "Agenda una sesión de coaching", name: "Nombre", email: "Correo", phone: "Teléfono", service: "Servicio", date: "Fecha y Hora", message: "Mensaje", submit: "Confirmar", calendar_btn: "Google Calendar", success: "¡Solicitud enviada!" },
  contact: { title: "Contáctanos", subtitle: "Estamos aquí para ayudar.", form_title: "Enviar Mensaje" },
  faq: { title: "Preguntas Frecuentes", items: [
      { q: "¿Cómo accedo a mi portal estudiantil?", a: "Accede ingresando tu código de acceso único proporcionado por Wanky Academy. No necesitas contraseña." },
      { q: "¿Necesito crear una cuenta o usar un correo electrónico?", a: "No. El acceso se realiza únicamente con tu código estudiantil." },
      { q: "¿Qué hago si mi código no funciona?", a: "Verifica que el código sea correcto. Si el problema continúa, contacta a la administración por WhatsApp o Web3Forms." },
      { q: "¿Puedo modificar mi nombre en el portal?", a: "Sí. El estudiante puede cambiar su nombre visible desde su perfil (si está permitido)." },
      { q: "¿Qué cursos ofrece Wanky Academy?", a: "Informática, Canva, WordPress, Creación de Radio en Línea, Redes Sociales, Sublimación y Tableros Personalizados." },
      { q: "¿Qué significa el código de un curso (ej. INF-001)?", a: "Identifica un curso específico para acceso, quizzes, carnet e identificación y certificados." },
      { q: "¿Cómo funcionan los quizzes?", a: "Los quizzes evalúan tus conocimientos al final de cada módulo y son obligatorios para obtener certificados." },
      { q: "¿Cuál es la nota mínima para obtener un certificado?", a: "Debes obtener al menos 70% en el quiz final." },
      { q: "¿Por qué mi certificado está bloqueado?", a: "El certificado se bloquea si no alcanzas el mínimo de 70%." },
      { q: "¿Puedo repetir un quiz?", a: "Sí, según las reglas del curso, puedes repetirlo para mejorar tu calificación." },
      { q: "¿Cómo descargo mi certificado?", a: "Una vez desbloqueado, puedes descargarlo en PDF desde tu tablero." },
      { q: "¿Cómo verifico un certificado o código estudiantil?", a: "Utiliza la página verify.html e ingresa el código correspondiente." },
      { q: "¿Puedo generar un carnet estudiantil?", a: "Sí. Cada estudiante puede generar y descargar su carnet digital oficial." },
      { q: "¿Puedo agregar una foto de perfil?", a: "Sí. Puedes subir una imagen (PNG, JPG) o usar un enlace de imagen." },
      { q: "¿El portal funciona sin Internet?", a: "Sí. Funciona sin conexión usando LocalStorage del navegador." },
      { q: "¿Dónde se almacenan mis datos?", a: "Los datos se guardan localmente en tu navegador mediante LocalStorage." },
      { q: "¿Todos los videos son propiedad de Wanky Academy?", a: "No. Algunos videos provienen de fuentes externas y se usan con fines educativos (Fair Use)." },
      { q: "¿Qué métodos de pago están disponibles?", a: "Pagos en línea mediante PayPal y Stripe (enlaces en el portal)." },
      { q: "¿Puedo solicitar un correo institucional?", a: "Sí. Puedes solicitar un correo @wankyacademy.com vía Web3Forms." },
      { q: "¿Cómo contacto al soporte de Wanky Academy?", a: "Por WhatsApp, correo oficial o formulario de contacto del sitio web." }
  ] },
  footer: { desc: "Empoderando a la próxima generación.", links: "Enlaces", contact: "Contacto", copyright: "© 2025 Wanky Academy." },
  privacy: commonLegal.privacy, terms: commonLegal.terms, copyright: copyrightContent,
  subscription: {
    title: "Inscripción al Curso",
    subtitle: "Da el primer paso hacia tu futuro digital.",
    form: {
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono (Opcional)",
      course: "Curso a inscribirse",
      select_placeholder: "Selecciona un curso",
      message: "Mensaje / Details (Opcional)",
      submit_btn: "Suscribirse ahora",
      success_msg: "¡Inscripción exitosa! Revisa tu correo."
    },
    courses_labels: {
      info: "Informática",
      web: "Webmaster",
      canva: "Canva Mastery",
      radio: "Création de radio en ligne"
    },
    why_us: {
      title: "¿Por qué elegir Wanky Academy?",
      items: [
        { title: "Formación Práctica", desc: "Aprende haciendo con proyectos reales." },
        { title: "Profesores Expertos", desc: "Guiado por profesionales en el campo." },
        { title: "Accesible", desc: "Aprende desde cualquier lugar, a tu ritmo." },
        { title: "Certificados", desc: "Obtén un certificado al finalizar." }
      ]
    },
    contact_box: {
      title: "Contacto Rápido",
      whatsapp: "WhatsApp",
      email: "Email"
    }
  },
  verification: {
    title: "Verificación de Certificado",
    subtitle: "Verifica la autenticidad de un certificado de Wanky Academy.",
    valid_title: "Certificado Válido",
    invalid_title: "Certificado Inválido",
    label_student: "Nombre del estudiante",
    label_course: "Curso",
    label_date: "Fecha de emisión",
    label_id: "ID de Certificado",
    label_status: "Estado",
    status_valid: "VERIFICADO",
    status_invalid: "NO ENCONTRADO",
    loading: "Verificando...",
    search_placeholder: "Ingresa el ID del certificado",
    search_btn: "Verificar"
  },
  quiz_generator: {
    title: "Prueba después de clase",
    subtitle: "Pon a prueba tus conocimientos con un cuestionario generado por IA",
    btn_mcq: "Generar 20 Preguntas (Opción Múltiple)",
    btn_tf: "Generar 20 Verdadero/Falso",
    generating: "Generando cuestionario...",
    error: "Error al generar el cuestionario. Intenta de nuevo."
  },
  student_portal: {
    academic_status: "Estado Académico",
    academic_program: "Pensum Académico",
    my_courses: "Mis Cursos",
    assessments: "Evaluaciones",
    digital_services: "Servicios Digitales",
    online_payments: "Pagos en línea",
    enrolled_subjects: "Asignaturas inscritas",
    pending_subjects: "Asignaturas pendientes",
    grades: "Calificaciones",
    schedule: "Horarios",
    account_status: "Estado de cuenta",
    withdrawal: "Retiro de asignaturas",
    performance_analytics: "Resultados y desempeño",
    certificates_available: "Certificados disponibles",
    info_guide: "Guía de información",
    change_access_code: "Cambiar código de acceso",
    institutional_email: "Correo institucional",
    online_assistance: "Asistencia en línea",
    accident_insurance: "Seguro de accidentes personales",
    coming_soon: "Próximamente",
    active: "Activo",
    payment_method: "Método de pago",
    online_payments_bullet1: "Paga tu matrícula o servicios digitales de forma segura",
    online_payments_bullet2: "Los pagos se procesan externamente",
    payment_disclaimer: "Los pagos son procesados de forma segura por terceros (PayPal / Stripe). Wanky Academy no almacena información de pago."
  }
};

const ht: TranslationDictionary = {
  ...en,
  student_portal: {
    academic_status: "Estati Akademik",
    academic_program: "Pwogram Akademik",
    my_courses: "Kou Mwen Yo",
    assessments: "Evalyasyon",
    digital_services: "Sèvis Dijital",
    online_payments: "Peman sou Entènèt",
    enrolled_subjects: "Sijè enskri",
    pending_subjects: "Sijè annatant",
    grades: "Nòt",
    schedule: "Orè",
    account_status: "Estati kont",
    withdrawal: "Retrè kou",
    performance_analytics: "Analiz pèfòmans",
    certificates_available: "Sètifika disponib",
    info_guide: "Gid enfòmasyon",
    change_access_code: "Chanje kòd aksè",
    institutional_email: "Imèl enstitisyonèl",
    online_assistance: "Asistans sou entènèt",
    accident_insurance: "Asirans aksidan pèsonèl",
    coming_soon: "Byento",
    active: "Aktif",
    payment_method: "Metòd Peman",
    online_payments_bullet1: "Peye pou kou oswa sèvis dijital yo an sekirite",
    online_payments_bullet2: "Peman yo fèt deyò platfòm lan",
    payment_disclaimer: "Peman yo fèt an sekirite pa konpayi twazyèm pati (PayPal / Stripe). Wanky Academy pa sere enfòmasyon peman ou yo."
  }
};

export const translations: Record<Language, TranslationDictionary> = {
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.ES]: es,
  [Language.HT]: ht
};

export const getLocalizedUrl = (url: string, lang: Language): string => {
  if (lang === Language.EN) return url;
  if (url.startsWith('http')) return url;
  return `/${lang}${url.startsWith('/') ? url : '/' + url}`;
};
