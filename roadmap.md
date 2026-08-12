# 🗺️ خريطة مشروع: RR ENGLISH (نسخة Supabase)
**وصف المشروع:** منصة تعليمية للغة الإنجليزية مع نظام النقط (Gamification) ومساعد ذكي (Gemini AI).
**التقنيات الأساسية:** React, Tailwind CSS, Supabase (PostgreSQL, Auth, Edge Functions)

---

## 1. هيكلة قاعدة البيانات (Database Schema)
هادو هما الجداول الأساسية لي خاص تكريي فـ PostgreSQL:

### أ. جدول `profiles` (بيانات الطلاب)
* `id` (UUID, Primary Key) - مرتبط بـ auth.users
* `full_name` (Text)
* `role` (Text) - القيمة الافتراضية 'free'، وممكن تكون 'premium' أو 'admin'
* `points` (Integer) - القيمة الافتراضية 0
* `created_at` (Timestamp)

### ب. جدول `courses` (الكورسات)
* `id` (UUID, Primary Key)
* `title` (Text) - مثلا: كورس المبتدئين A1
* `description` (Text)
* `level` (Text)

### ج. جدول `lessons` (الدروس)
* `id` (UUID, Primary Key)
* `course_id` (UUID, Foreign Key) - مرتبط بجدول courses
* `title` (Text)
* `content_url` (Text) - رابط الفيديو أو المحتوى
* `is_premium` (Boolean) - واش الدرس مدفوع ولا فابور

### د. جدول `user_progress` (تتبع التقدم - Bridge Table)
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key) - مرتبط بجدول profiles
* `lesson_id` (UUID, Foreign Key) - مرتبط بجدول lessons
* `completed_at` (Timestamp)

### هـ. جدول `ai_chats` (محادثات المساعد الذكي)
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key) - مرتبط بجدول profiles
* `prompt` (Text) - سؤال الطالب
* `response` (Text) - جواب Gemini
* `created_at` (Timestamp)

---

## 2. نظام الحماية وعزل البيانات (RLS Policies)
تفعيل Row Level Security ضروري فكل جدول لحماية المنصة:

* **جدول `profiles`:** المستعمل يقرا ويعدل غير السطر ديالو (`auth.uid() = id`).
* **جدول `lessons`:** * قراءة للجميع إذا كان `is_premium = false`.
  * قراءة للمشتركين فقط إذا كان المستعمل عندو `role = premium`.
* **جدول `user_progress`:** المستعمل يقدر يدير INSERT و SELECT غير للبيانات ديالو (`auth.uid() = user_id`).
* **صلاحيات المشرف (Admin):** إضافة سياسة كتعطي الحق الكامل (ALL) لأي مستعمل عندو `role = admin` فكاع الجداول.

> **⚠️ ملاحظة أمنية (Edge Functions):** > الساروت ديال Gemini API ممنوع يبان فـ الكود ديال React. خاصو يتخبى فـ Supabase Edge Functions باش تفادى السرقة ديال الـ Quota ديالك.

---

## 3. هيكلة واجهات المستخدم (Frontend Routes)

### المنطقة العامة (Public)
* `/` - الصفحة الرئيسية (Landing Page).
* `/login` - تسجيل الدخول.
* `/register` - إنشاء حساب جديد.

### منطقة الطالب (Student Dashboard)
* `/dashboard` - لوحة تحكم الطالب (عرض النقط، والدروس المكتملة عبر JOIN مع `user_progress`).
* `/courses` - قائمة الكورسات المتاحة.
* `/lesson/:id` - صفحة الدرس. (زر "أكملت الدرس" يقوم بإضافة سطر في `user_progress` وزيادة نقط في `profiles`).
* `/ai-tutor` - واجهة الدردشة مع المساعد الذكي.

### منطقة المشرف (Admin Dashboard)
* `/admin` - إحصائيات عامة للمنصة.
* `/admin/users` - إدارة الطلاب وترقيتهم إلى Premium.
* `/admin/lessons` - واجهة (CRUD) لإضافة، تعديل، وحذف الدروس.

---

## 4. خطة التنفيذ خطوة بخطوة (Workflow)
1. **تجهيز السيرفر:** إنشاء مشروع Supabase، إعداد الجداول، وربط Foreign Keys.
2. **تفعيل الحماية:** كتابة سياسات RLS واختبارها.
3. **المصادقة:** دمج Supabase Auth مع React وإنشاء جدول `profiles` تلقائياً عبر Database Trigger.
4. **تطوير الواجهات:** بناء منطقة الطالب وربطها بقراءة الدروس وحفظ التقدم.
5. **لوحة التحكم:** بناء واجهة المشرف لإدارة المحتوى.
6. **الذكاء الاصطناعي:** برمجة Edge Function للاتصال بـ Gemini API وربطها بواجهة `/ai-tutor`.

---

## 💡 برومبت مساعد (للاستعمال مع أدوات الذكاء الاصطناعي)
"أنا كنطور منصة RR ENGLISH لتعلم اللغة الإنجليزية باستعمال React, Tailwind CSS, و Supabase.
عندي جدول فالداتابيز سميتو [اسم الجدول] وفيه هاد الأعمدة: [حط الأعمدة].
بغيتك تكتب ليا Component كيدير [شرح المهمة]. 
ركز على Best Practices ديال Supabase، استعمل `supabase-js`، وتأكد من توافق الكود مع سياسات RLS."