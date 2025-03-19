  Evangadi Forum - Q&A System
A full-stack question-and-answer platform similar to Stack Overflow, allowing verified users to post and answer questions.

🚀 Tech Stack

            Frontend: React.js, modular css
            Backend: Node.js, Express.js
            Database: MySQL, ...
            Version Control: Git & GitHub


📌 Features (MVP for 2 Weeks)

          ✅ User authentication (Login, Signup)
          ✅ Ask and answer questions
          ✅ Display a list of questions
          ✅ Upvote/downvote answers
          ✅ Basic profile management

📁 Project Structure

        /evangadi-forum
        │── backend/      # Express.js API & server
        │── frontend/     # React.js UI
        │── database/     # MySQL schema & queries
        │── docs/         # Documentation & API specs
        │── .github/      # GitHub workflows & CI/CD
        │── README.md     # Project documentation

👥 Team & Responsibilities
Frontend Team

      ✅Fedlu, Destaw: Header with Responsiveness
      ✅Gedi: Homepage UI (List of questions), Ask Questions Page
      ✅Henok,Dawit: Login/SignUp UI with Responsiveness 
      ✅Nehemiah: Footer with responsiveness
      ✅Sami: Question & Answer Page
      
 Backend Team
 
      ✅Hana, Henok: User Authentication (Sign up, Login, Logout, JWT Implementation)
      ✅Girum: Question API (CRUD Operations, List Questions by Latest, Get Question Details))
      ✅Gedi: Security & Rate Limiting (Unique Email & Username, Password Hashing, API Protection)
      ✅Sami: Answer API (Post Answer, Retrieve Answers, Associate Answers with Users & Questions)
      
 Database Team
 
      ✅Hana, Henok: Database schema design
      ✅Sami, Gedi, Girum: Optimize Queries (Indexes, Foreign Keys, Data Integrity, Performance Improvements)
      ✅Sami, Gedi, Girum: Code reviews, CI/CD, GitHub workflows
      

📜 Contribution Guidelines
 Clone the Repository
 
       git clone https://github.com/YOUR_GITHUB_USERNAME/evangadi-forum.git
       cd evangadi-forum
 Create a Feature Branch
 
      git checkout -b feature/your-feature-name
 Commit & Push Changes
 
      git add .
      git commit -m "feat: added new feature"
      git push origin feature/your-feature-name
 Create a Pull Request (PR)
 
      Submit a PR to dev branch.
      At least one reviewer must approve before merging.
🚀 Project Setup

Backend Setup

    cd backend
    npm install
    npm run dev

Frontend Setup

    cd frontend
    npm install
    npm start

📅 2-Week Timeline
Week 1

    ✅ Set up GitHub repository & CI/CD
    ✅ Implement authentication (Signup, Login, JWT)
    ✅ Develop database schema & API endpoints
    ✅ Build homepage UI with questions list

Week 2

    ✅ Implement posting & answering questions
    ✅ Implement voting system (upvote/downvote)
    ✅ Develop profile page
    ✅ Testing, bug fixes, deployment

