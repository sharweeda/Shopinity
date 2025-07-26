# 🧿 React Dashboard App

دا مشروع بسيط معمول بـ React فيه:

- Dashboard ديناميكية
- صفحة تسجيل دخول
- سليدر تلقائي
- تصنيفات ومنتجات من Fake Store API
- فلترة وبحث في المنتجات
- Context API لإدارة الحالة
- Loading Spinner لواجهة المستخدم
- Validation باستخدام Formik + Yup

---

## 🛠️ الأدوات والتقنيات

- **React JS** ⚛️
- **React Router DOM** – للتنقل بين الصفحات
- **Tailwind CSS** – لتنسيق الواجهة
- **React Slick** – لعمل Slider تلقائي
- **Formik + Yup** – لإدارة النماذج والتحقق من صحة البيانات
- **React Loader Spinner** – لإظهار اللودينج
- **Fake Store API** – لجلب بيانات المنتجات
- **Context API** – لتخزين بيانات المستخدم والمنتجات

---

## ⚙️ طريقة التشغيل

```bash
npm install
npm run dev




src/
│
├── components/             # مكونات الواجهة
│   ├── Header.jsx          # الهيدر / شريط التنقل
│   ├── ProductCard.jsx     # كارت المنتج
│   ├── Slider.jsx          # السلايدر الرئيسي
│   ├── Login.jsx           # صفحة تسجيل الدخول (لو موجودة كمكون)
│   └── Dashboard.jsx       # صفحة الداشبورد (لو موجودة كمكون)
│
├── context/                # إدارة الحالة باستخدام Context API
│   └── AuthContext.jsx     # سياق المصادقة (Authentication Context)
│
├── pages/                  # الصفحات الكاملة (لو موجودة)
│   └── (Pages like Home.jsx, Products.jsx, إلخ)
│
├── App.jsx                 # المكون الرئيسي للتطبيق
└── main.jsx                # نقطة الدخول للتطبيق (Entry Point)

