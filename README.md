# NoteSpace 🌌 - Personal Blogging & Note-taking Platform

NoteSpace คือโปรเจกต์ Full-stack Web Application ที่ออกแบบมาเพื่อเป็นเครื่องมือจดบันทึกและเขียนบล็อกส่วนตัว โดยเน้น **Minimalist UI** ในสไตล์ **Notion** เพื่อให้ผู้ใช้งานโฟกัสกับการเขียนเนื้อหาได้อย่างเต็มที่ โปรเจกต์นี้จัดทำขึ้นเพื่อแสดงทักษะการออกแบบระบบและการพัฒนา Web Application แบบครบวงจรสำหรับใช้ประกอบ Resume ในการสมัครงาน

## 🚀 Key Technologies

### Frontend
- **VueJS:** เน้นประสิทธิภาพการแสดงผลแบบ Component-based
- **CSS (Notion Style):** เน้นความสะอาดตา, White space, และดีไซน์ที่เน้นความสบายตา
- **Responsive Design:** รองรับการใช้งานผ่าน Desktop และ Mobile

### Backend & Database
- **Node.js & Express:** ระบบ API ที่แยก Layer การทำงานชัดเจน
- **MySQL:** การจัดเก็บข้อมูลโน้ตและผู้ใช้งานด้วยระบบ Relationship Database
- **JWT (JSON Web Token):** มาตรฐานการยืนยันตัวตนที่ปลอดภัย

### Tools & Deployment
- **Docker:** จัดการสภาพแวดล้อมการพัฒนาด้วย Container
- **Thunder Client:** สำหรับการทดสอบและ Debug API
- **Render / Vercel:** สำหรับการ Deploy ขึ้น Cloud

---

## 🗺️ Project Roadmap

| Phase | Tasks | Status |
| :--- | :--- | :--- |
| **1. Foundation** | Setup Project, Database Modeling, Docker Setup | ✅ |
| **2. Auth System** | API Auth, JWT Implementation, Middleware | ✅ |
| **3. Note Core** | CRUD Features (Create, Read, Update, Delete) | ✅ |
| **4. UI/UX** | Notion-Style Design, Dashboard, Home Page | ✅ |
| **5. Polish & Deploy**| Deployment, Testing, Performance Tuning | ✅ |

---

## 🎯 Project Features

### สำหรับผู้ใช้ทั่วไป
- **Authentication:** สมัครสมาชิก, Login และ Logout ด้วยความปลอดภัยสูง
- **Blog Experience:** อ่านบล็อกผ่านหน้า Home และหน้า Note Detail ที่อ่านง่าย
- **Dashboard:** จัดการโน้ตส่วนตัว (Create/Edit/Delete) ได้ในหน้าเดียว

### สำหรับระบบจัดการโน้ต
- **Categorization:** แบ่งหมวดหมู่โน้ตเพื่อความเป็นระเบียบ
- **Search Engine:** ค้นหาโน้ตย้อนหลังได้อย่างรวดเร็ว

---

## 🛠️ Getting Started

1. **Clone the repository:**
   `git clone [URL ของนาย]`

2. **Backend Setup:**
   - เข้าโฟลเดอร์ `backend`
   - สร้างไฟล์ `.env` ตามไฟล์ `.env.example`
   - รัน `npm install` และ `npm run dev`

3. **Frontend Setup:**
   - เข้าโฟลเดอร์ `frontend`
   - รัน `npm install` และ `npm run dev`

## 🐳 Docker Setup
โปรเจกต์นี้ใช้ Docker ในการรันฐานข้อมูล MySQL เพื่อให้การพัฒนาเป็นมาตรฐานเดียวกัน:

1. ติดตั้ง [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 🤝 Contact
- **Developer:** นาย ภัทรกร นลินเบญจพรรณ
- **LinkedIn:** https://www.linkedin.com/in/phattarakorn-nalinbenchaphan-1aa630401/
