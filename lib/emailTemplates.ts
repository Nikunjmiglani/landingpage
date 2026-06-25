export function welcomeEmail(name: string) {
  return `
  <div
    style="
      font-family:Arial;
      max-width:600px;
      margin:auto;
      padding:30px;
      border:1px solid #ddd;
      border-radius:10px;
    "
  >

    <h1 style="color:#ff9900;">
      Welcome to HireVexa 🚀
    </h1>

    <p>
      Hi <b>${name}</b>,
    </p>

    <p>
      Thank you for joining HireVexa.
    </p>

    <p>
      Complete your profile, upload your resume and start applying to opportunities.
    </p>

    <a
      href="http://localhost:3000/dashboard"
      style="
        display:inline-block;
        margin-top:20px;
        background:#ff9900;
        color:white;
        padding:12px 24px;
        border-radius:6px;
        text-decoration:none;
      "
    >
      Go to Dashboard
    </a>

    <p
      style="
        margin-top:40px;
        color:#666;
      "
    >
      Team HireVexa
    </p>

  </div>
  `;
}