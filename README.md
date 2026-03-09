# PrepForge

PrepForge is a comprehensive platform designed to assist job seekers in mastering the interview process. Leveraging Google Gemini AI, the application provides personalized coaching, resume optimization, and efficient application tracking.

## Core Features

### AI-Driven Interview Preparation
- **Tailored Question Generation**: Analysis of candidate resumes against specific job descriptions to generate relevant technical and behavioral questions.
- **Interviewer Perspective**: Insights into the purpose behind specific questions to help candidates formulate strategic responses.
- **Reference Answers**: Detailed guidance on optimal approaches and key points for each identified question.

### Strategic Analysis
- **Profile Match Scoring**: Quantitative evaluation of candidate alignment with specific roles (0-100%).
- **Skill Gap Identification**: Analysis of missing competencies with categorized severity levels (Low, Medium, High).
- **Curated Preparation Roadmap**: A structured 5-day plan designed to address identified gaps and optimize performance.

### Professional Asset Optimization
- **Automated Resume Generation**: Creation of ATS-optimized, professionally formatted PDF resumes tailored to specific job requirements.
- **STAR Framework Evaluation**: AI-powered feedback on behavioral responses based on the Situation, Task, Action, and Result methodology.

### Application Management
- **Kanban Board Integration**: Drag-and-drop interface for managing the end-to-end application lifecycle.
- **Status Tracking**: Management of applications through stages including Applied, Interviewing, Offer, and Rejected.

## Technology Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Vanilla SCSS leveraging Glassmorphism design principles
- **Navigation**: React Router 7
- **Icons**: Lucide React
- **State Management**: React Context API
- **Interaction**: @dnd-kit for workspace management

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **AI Integration**: Google Gemini AI (Flash 2.5 and 3)
- **Authentication**: JWT with HttpOnly Cookies and Bcrypt
- **Process Automation**: Puppeteer (PDF generation) and Multer (file handling)

## Getting Started

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/interview-prep-ai.git
   cd interview-prep-ai
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

