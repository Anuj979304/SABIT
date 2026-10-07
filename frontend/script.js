const API_BASE_URL = "https://sabit-301w.onrender.com";

const analyzeButton = document.querySelector(".primary-button");

if (analyzeButton) {

    analyzeButton.addEventListener("click", function () {

        const panel = document.createElement("div");

        panel.style.position = "fixed";
        panel.style.top = "0";
        panel.style.left = "0";
        panel.style.width = "100%";
        panel.style.height = "100vh";
        panel.style.overflowY = "auto";
        panel.style.background = "rgba(0, 0, 0, 0.7)";
        panel.style.display = "flex";
        panel.style.alignItems = "flex-start";
        panel.style.justifyContent = "center";
        panel.style.padding = "40px 0";
        panel.style.boxSizing = "border-box";
        panel.style.zIndex = "9999";

        panel.innerHTML = `
            <div style="
                background:white;
                width:90%;
                max-width:500px;
                padding:30px;
                border-radius:16px;
                position:relative;
                box-sizing:border-box;
            ">

                <button
                    id="closePanel"
                    type="button"
                    style="
                        position:absolute;
                        right:15px;
                        top:10px;
                        border:none;
                        background:none;
                        font-size:28px;
                        cursor:pointer;
                    "
                >×</button>

                <div style="
                    font-size:12px;
                    font-weight:bold;
                    letter-spacing:2px;
                    margin-bottom:12px;
                ">
                    SABIT ANALYSIS
                </div>

                <h2>Let's prove your skills.</h2>

                <p style="
                    color:#666;
                    line-height:1.5;
                ">
                    Enter your name, upload your resume and choose your target role.
                </p>

                <label style="
                    display:block;
                    margin-top:25px;
                    margin-bottom:8px;
                    font-weight:bold;
                ">
                    Your Name
                </label>

                <input
                    type="text"
                    id="studentName"
                    placeholder="Enter your name"
                    style="
                        width:100%;
                        padding:12px;
                        border:1px solid #ccc;
                        box-sizing:border-box;
                    "
                >

                <label style="
                    display:block;
                    margin-top:25px;
                    margin-bottom:8px;
                    font-weight:bold;
                ">
                    Resume PDF
                </label>

                <input
                    type="file"
                    id="resumeFile"
                    accept=".pdf"
                    style="width:100%;"
                >

                <label style="
                    display:block;
                    margin-top:25px;
                    margin-bottom:8px;
                    font-weight:bold;
                ">
                    Target Role
                </label>

                <select
                    id="targetRole"
                    style="
                        width:100%;
                        padding:12px;
                        border:1px solid #ccc;
                        border-radius:8px;
                        box-sizing:border-box;
                    "
                >

                    <option value="">
                        Select target role
                    </option>

                    <option value="AI Engineer">
                        AI Engineer
                    </option>

                    <option value="Machine Learning Engineer">
                        Machine Learning Engineer
                    </option>

                    <option value="Data Scientist">
                        Data Scientist
                    </option>

                    <option value="Data Analyst">
                        Data Analyst
                    </option>

                    <option value="Backend Developer">
                        Backend Developer
                    </option>

                    <option value="Full Stack Developer">
                        Full Stack Developer
                    </option>

                    <option value="Frontend Developer">
                        Frontend Developer
                    </option>

                    <option value="DevOps Engineer">
                        DevOps Engineer
                    </option>

                    <option value="Cloud Engineer">
                        Cloud Engineer
                    </option>

                    <option value="NLP Engineer">
                        NLP Engineer
                    </option>

                    <option value="Computer Vision Engineer">
                        Computer Vision Engineer
                    </option>

                </select>

                <button
                    id="startAnalysis"
                    type="button"
                    style="
                        width:100%;
                        margin-top:25px;
                        padding:14px;
                        background:#111;
                        color:white;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    Analyze Resume →
                </button>

                <div
                    id="analysisMessage"
                    style="margin-top:20px;"
                ></div>

            </div>
        `;

        document.body.appendChild(panel);

        const closePanel =
            document.getElementById("closePanel");

        closePanel.addEventListener("click", function () {
            panel.remove();
        });

        const startAnalysisButton =
            document.getElementById("startAnalysis");

        startAnalysisButton.addEventListener(
            "click",
            async function () {

                const fileInput =
                    document.getElementById("resumeFile");

                const nameInput =
                    document.getElementById("studentName");

                const roleInput =
                    document.getElementById("targetRole");

                const message =
                    document.getElementById("analysisMessage");

                const file =
                    fileInput.files[0];

                const studentName =
                    nameInput.value.trim();

                const role =
                    roleInput.value;

                /* =========================
                   VALIDATION
                ========================= */

                if (!studentName) {

                    message.innerHTML = `
                        <p style="color:#b42318;">
                            Please enter your name.
                        </p>
                    `;

                    return;
                }

                if (!file) {

                    message.innerHTML = `
                        <p style="color:#b42318;">
                            Please upload your resume.
                        </p>
                    `;

                    return;
                }

                if (
                    file.type !== "application/pdf" &&
                    !file.name.toLowerCase().endsWith(".pdf")
                ) {

                    message.innerHTML = `
                        <p style="color:#b42318;">
                            Please upload a PDF resume.
                        </p>
                    `;

                    return;
                }

                if (!role) {

                    message.innerHTML = `
                        <p style="color:#b42318;">
                            Please select your target role.
                        </p>
                    `;

                    return;
                }

                /* =========================
                   UPDATE PROFILE NAME
                ========================= */

                const profileName =
                    document.getElementById("profileName");

                const passportName =
                    document.getElementById("passportName");

                if (profileName) {
                    profileName.textContent =
                        studentName.toUpperCase();
                }

                if (passportName) {
                    passportName.textContent =
                        studentName.toUpperCase();
                }

                /* =========================
                   FORM DATA
                ========================= */

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                formData.append(
                    "target_role",
                    role
                );

                message.innerHTML = `
                    <p style="color:#555;">
                        SABIT is analyzing your resume...
                    </p>
                `;

                startAnalysisButton.disabled = true;

                startAnalysisButton.textContent =
                    "Analyzing...";

                try {

                    /* =========================
                       SKILL GAP API
                    ========================= */

                    const response =
                        await fetch(
                            `${API_BASE_URL}/skill-gap`,
                            {
                                method:"POST",
                                body:formData
                            }
                        );

                    const result =
                        await response.json();

                    if (!response.ok) {

                        throw new Error(
                            result.detail ||
                            "Analysis failed."
                        );
                    }

                    const foundSkills =
                        result.student_skills || [];

                    const requiredSkills =
                        result.required_skills || [];

                    const skillGaps =
                        result.missing_skills || [];

                    const readinessScore =
                        requiredSkills.length > 0
                            ? Math.round(
                                (
                                    (
                                        requiredSkills.length -
                                        skillGaps.length
                                    ) /
                                    requiredSkills.length
                                ) * 100
                            )
                            : 0;

                    /* =========================
                       PROOF PROJECT CARD
                    ========================= */

                    let proofProject = "";

                    if (skillGaps.length > 0) {

                        proofProject = `
                            <div
                                id="proofLabCard"
                                style="
                                    margin-top:20px;
                                    padding:18px;
                                    background:#111;
                                    color:white;
                                    border-radius:12px;
                                "
                            >

                                <div style="
                                    font-size:11px;
                                    letter-spacing:1.5px;
                                    color:#aaa;
                                    margin-bottom:8px;
                                ">
                                    PROOF LAB
                                </div>

                                <h3 style="
                                    margin:0 0 8px 0;
                                ">
                                    Prove your ${skillGaps[0]} skill
                                </h3>

                                <p style="
                                    color:#ccc;
                                    line-height:1.5;
                                ">
                                    Build a practical project to create
                                    real evidence for this skill.
                                </p>

                                <button
                                    id="openProofLab"
                                    type="button"
                                    style="
                                        padding:10px 16px;
                                        border:none;
                                        border-radius:8px;
                                        background:white;
                                        color:#111;
                                        cursor:pointer;
                                        font-weight:bold;
                                    "
                                >
                                    Start Proof Project →
                                </button>

                            </div>
                        `;
                    }

                    /* =========================
                       ANALYSIS RESULT
                    ========================= */

                    message.innerHTML = `

                        <div style="
                            margin-top:20px;
                            padding:24px;
                            background:#f7f7f4;
                            border:1px solid #e5e5e5;
                            border-radius:16px;
                        ">

                            <div style="
                                font-size:11px;
                                font-weight:bold;
                                letter-spacing:1.5px;
                                color:#777;
                                margin-bottom:8px;
                            ">
                                SABIT READINESS ANALYSIS
                            </div>

                            <h3 style="
                                margin:0 0 20px 0;
                            ">
                                ${result.target_role}
                            </h3>

                            <div style="
                                display:flex;
                                justify-content:space-between;
                                align-items:center;
                                margin-bottom:20px;
                            ">

                                <span style="color:#666;">
                                    Current readiness
                                </span>

                                <strong
                                    id="readinessScoreDisplay"
                                    style="font-size:24px;"
                                >
                                    ${readinessScore}%
                                </strong>

                            </div>

                            <div style="
                                height:8px;
                                background:#e5e5e5;
                                border-radius:10px;
                                overflow:hidden;
                                margin-bottom:24px;
                            ">

                                <div
                                    id="readinessProgress"
                                    style="
                                        width:${readinessScore}%;
                                        height:100%;
                                        background:#111;
                                        border-radius:10px;
                                    "
                                ></div>

                            </div>

                            <div style="margin-bottom:20px;">

                                <strong>
                                    Skills found
                                </strong>

                                <p style="
                                    color:#333;
                                    line-height:1.6;
                                ">
                                    ${
                                        foundSkills.length
                                            ? foundSkills.join(" · ")
                                            : "No matching skills found"
                                    }
                                </p>

                            </div>

                            <div style="margin-bottom:20px;">

                                <strong>
                                    Skills to prove
                                </strong>

                                <p style="
                                    color:#b45309;
                                    line-height:1.6;
                                ">
                                    ${
                                        skillGaps.length
                                            ? skillGaps.join(" · ")
                                            : "No major skill gaps found"
                                    }
                                </p>

                            </div>

                            <div style="
                                padding:16px;
                                background:white;
                                border:1px solid #e5e5e5;
                                border-radius:12px;
                            ">

                                <strong>
                                    SABIT recommendation
                                </strong>

                                <p style="
                                    margin-bottom:0;
                                    color:#555;
                                    line-height:1.6;
                                ">
                                    ${
                                        skillGaps.length
                                            ? `Build a practical project to prove your ${skillGaps[0]} skill.`
                                            : "Your resume currently covers the main skills for this role."
                                    }
                                </p>

                            </div>

                        </div>

                        ${proofProject}

                        <div style="
                            margin-top:16px;
                            padding:20px;
                            background:white;
                            border:1px solid #ddd;
                            border-radius:12px;
                        ">

                            <div style="
                                font-size:11px;
                                font-weight:bold;
                                letter-spacing:1.5px;
                                color:#777;
                                margin-bottom:8px;
                            ">
                                EVIDENCE SUBMISSION
                            </div>

                            <h3 style="margin-top:0;">
                                Prove it on GitHub
                            </h3>

                            <p style="
                                color:#555;
                                line-height:1.6;
                            ">
                                Submit your project repository so SABIT
                                can check your evidence.
                            </p>

                            <input
                                id="githubRepoUrl"
                                type="text"
                                placeholder="https://github.com/username/repository"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #ccc;
                                    border-radius:8px;
                                    box-sizing:border-box;
                                "
                            >

                            <button
                                id="verifyGithub"
                                type="button"
                                style="
                                    width:100%;
                                    margin-top:12px;
                                    padding:13px;
                                    background:#111;
                                    color:white;
                                    border:none;
                                    border-radius:8px;
                                    cursor:pointer;
                                    font-weight:bold;
                                "
                            >
                                Verify GitHub Project →
                            </button>

                            <div
                                id="githubResult"
                                style="margin-top:12px;"
                            ></div>

                        </div>
                    `;

                    /* =================================
                       PROOF LAB
                    ================================= */

                    const proofButton =
                        document.getElementById(
                            "openProofLab"
                        );

                    if (proofButton) {

                        proofButton.addEventListener(
                            "click",
                            async function () {

                                const skill =
                                    skillGaps[0];

                                if (!skill) {
                                    return;
                                }

                                proofButton.disabled =
                                    true;

                                proofButton.textContent =
                                    "Loading proof project...";

                                try {

                                    const projectResponse =
                                        await fetch(
                                            `${API_BASE_URL}/micro-project/${encodeURIComponent(skill)}`
                                        );

                                    const project =
                                        await projectResponse.json();

                                    if (!projectResponse.ok) {

                                        throw new Error(
                                            project.detail ||
                                            "Unable to load project."
                                        );
                                    }

                                    proofButton.textContent =
                                        "Project Loaded ✓";

                                    const oldTask =
                                        document.getElementById(
                                            "proofTask"
                                        );

                                    if (oldTask) {
                                        oldTask.remove();
                                    }

                                    const proofTask =
                                        document.createElement(
                                            "div"
                                        );

                                    proofTask.id =
                                        "proofTask";

                                    proofTask.style.cssText = `
                                        margin-top:16px;
                                        padding:18px;
                                        background:#ffffff;
                                        color:#111111;
                                        border:1px solid #dddddd;
                                        border-radius:10px;
                                    `;

                                    proofTask.innerHTML = `
                                        <div style="
                                            font-size:11px;
                                            font-weight:bold;
                                            letter-spacing:1.5px;
                                            color:#777;
                                            margin-bottom:8px;
                                        ">
                                            YOUR PROOF TASK
                                        </div>

                                        <h3 style="
                                            margin:0 0 10px 0;
                                        ">
                                            ${project.title || "Proof Project"}
                                        </h3>

                                        <p style="
                                            margin:0;
                                            color:#555;
                                            line-height:1.6;
                                        ">
                                            ${
                                                project.description ||
                                                "Complete this project to prove your skill."
                                            }
                                        </p>
                                    `;

                                    const proofCard =
                                        document.getElementById(
                                            "proofLabCard"
                                        );

                                    if (proofCard) {

                                        proofCard.appendChild(
                                            proofTask
                                        );
                                    }

                                } catch (error) {

                                    console.error(
                                        "Proof project error:",
                                        error
                                    );

                                    proofButton.disabled =
                                        false;

                                    proofButton.textContent =
                                        "Start Proof Project →";
                                }
                            }
                        );
                    }

                    /* =================================
                       GITHUB VERIFICATION
                    ================================= */

                    const verifyGithubButton =
                        document.getElementById(
                            "verifyGithub"
                        );

                    if (verifyGithubButton) {

                        verifyGithubButton.addEventListener(
                            "click",
                            async function () {

                                const repoInput =
                                    document.getElementById(
                                        "githubRepoUrl"
                                    );

                                const githubResult =
                                    document.getElementById(
                                        "githubResult"
                                    );

                                const repoUrl =
                                    repoInput.value.trim();

                                if (!repoUrl) {

                                    githubResult.innerHTML = `
                                        <p style="color:#b42318;">
                                            Please enter your GitHub repository URL.
                                        </p>
                                    `;

                                    return;
                                }

                                verifyGithubButton.disabled =
                                    true;

                                verifyGithubButton.textContent =
                                    "Checking repository...";

                                githubResult.innerHTML = `
                                    <p style="color:#555;">
                                        Checking your GitHub repository...
                                    </p>
                                `;

                                try {

                                    const response =
                                        await fetch(
                                            `${API_BASE_URL}/verify-github?repo_url=${encodeURIComponent(repoUrl)}`
                                        );

                                    const githubData =
                                        await response.json();

                                    if (!response.ok) {

                                        throw new Error(
                                            githubData.detail ||
                                            "GitHub verification failed."
                                        );
                                    }

                                    /* =========================
                                       VERIFIED
                                    ========================= */

if (
    githubData.verified === true ||
    Number(githubData.evidence_score) >= 60
) {
                                        githubResult.innerHTML = `

                                            <div style="
                                                padding:16px;
                                                background:#f0fdf4;
                                                border:1px solid #bbf7d0;
                                                border-radius:10px;
                                                color:#166534;
                                            ">

                                                <strong style="
                                                    font-size:16px;
                                                ">
                                                    ✓ Project Evidence Verified
                                                </strong>

                                                <p style="
                                                    margin-top:8px;
                                                    margin-bottom:14px;
                                                ">
                                                    SABIT verified evidence from your GitHub repository.
                                                </p>

                                                <div style="
                                                    display:grid;
                                                    gap:8px;
                                                    font-size:13px;
                                                    color:#374151;
                                                ">

                                                    <div>
                                                        <strong>
                                                            Evidence quality:
                                                        </strong>

                                                        ${githubData.evidence_score || 0}/100
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Languages:
                                                        </strong>

                                                        ${
                                                            githubData.languages &&
                                                            githubData.languages.length
                                                                ? githubData.languages.join(", ")
                                                                : "Not detected"
                                                        }
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Commits checked:
                                                        </strong>

                                                        ${githubData.commit_count || 0}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Source-code evidence:
                                                        </strong>

                                                        ${
                                                            githubData.evidence_files &&
                                                            githubData.evidence_files.length
                                                                ? githubData.evidence_files
                                                                    .filter(
                                                                        file =>
                                                                            file.endsWith(".py")
                                                                    )
                                                                    .join(", ") ||
                                                                    "Python implementation detected"
                                                                : "Python implementation detected"
                                                        }
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Dependency evidence:
                                                        </strong>

                                                        ${
                                                            githubData.evidence_files &&
                                                            githubData.evidence_files.includes(
                                                                "requirements.txt"
                                                            )
                                                                ? "requirements.txt"
                                                                : "None"
                                                        }
                                                    </div>

                                                </div>

                                            </div>
                                        `;

                                        verifyGithubButton.textContent =
                                            "GitHub Verified ✓";

                                        /* =========================
                                           READINESS UPDATE
                                        ========================= */

                                        const readinessDisplay =
                                            document.getElementById(
                                                "readinessScoreDisplay"
                                            );

                                        const readinessProgress =
                                            document.getElementById(
                                                "readinessProgress"
                                            );

                                        if (readinessDisplay) {

                                            try {

                                                const verifiedSkills =
                                                    requiredSkills.filter(
                                                        skill =>
                                                            !skillGaps.includes(
                                                                skill
                                                            )
                                                    );

                                                const readinessResponse =
                                                    await fetch(
                                                        `${API_BASE_URL}/readiness`,
                                                        {
                                                            method:"POST",

                                                            headers:{
                                                                "Content-Type":
                                                                    "application/json"
                                                            },

                                                            body:
                                                                JSON.stringify({
                                                                    required_skills:
                                                                        requiredSkills,

                                                                    verified_skills:
                                                                        verifiedSkills,

                                                                    project_completed:
                                                                        true,

                                                                    github_verified:
                                                                        true
                                                                })
                                                        }
                                                    );

                                                const readinessData =
                                                    await readinessResponse.json();

                                                if (!readinessResponse.ok) {

                                                    throw new Error(
                                                        readinessData.detail ||
                                                        "Could not calculate readiness score."
                                                    );
                                                }

                                                const verifiedScore =
                                                    readinessData.readiness_score;

                                                readinessDisplay.textContent =
                                                    `${verifiedScore}%`;

                                                if (readinessProgress) {

                                                    readinessProgress.style.width =
                                                        `${verifiedScore}%`;
                                                }

                                                const oldMessage =
                                                    document.getElementById(
                                                        "readinessUpdateMessage"
                                                    );

                                                if (oldMessage) {
                                                    oldMessage.remove();
                                                }

                                                const scoreMessage =
                                                    document.createElement(
                                                        "div"
                                                    );

                                                scoreMessage.id =
                                                    "readinessUpdateMessage";

                                                scoreMessage.style.cssText = `
                                                    margin-top:8px;
                                                    font-size:13px;
                                                    color:#166534;
                                                    font-weight:600;
                                                `;

                                                scoreMessage.textContent =
                                                    "Readiness updated · GitHub evidence verified";

                                                readinessDisplay
                                                    .parentElement
                                                    .appendChild(
                                                        scoreMessage
                                                    );

                                            } catch (error) {

                                                console.error(
                                                    "Readiness calculation error:",
                                                    error
                                                );
                                            }
                                        }

                                        /* =========================
                                           SKILL PASSPORT
                                        ========================= */

                                        const passportButton =
                                            document.createElement(
                                                "button"
                                            );

                                        passportButton.type =
                                            "button";

                                        passportButton.textContent =
                                            "Add to Skill Passport →";

                                        passportButton.style.cssText = `
                                            margin-top:12px;
                                            padding:10px 16px;
                                            border:none;
                                            border-radius:8px;
                                            background:#111827;
                                            color:white;
                                            cursor:pointer;
                                            font-weight:600;
                                        `;

                                        githubResult.appendChild(
                                            passportButton
                                        );

                                        passportButton.addEventListener(
                                            "click",
                                            async function () {

                                                passportButton.disabled =
                                                    true;

                                                passportButton.textContent =
                                                    "Adding to Passport...";

                                                try {

                                                    const skillToVerify =
                                                        skillGaps[0] ||
                                                        "Deep Learning";

                                                    const passportResponse =
                                                        await fetch(
                                                            `${API_BASE_URL}/skill-passport`,
                                                            {
                                                                method:"POST",

                                                                headers:{
                                                                    "Content-Type":
                                                                        "application/json"
                                                                },

                                                                body:
                                                                    JSON.stringify({
                                                                        student_name:
                                                                            studentName,

                                                                        verified_skills:
                                                                            [
                                                                                skillToVerify
                                                                            ],

                                                                        learning_skills:
                                                                            []
                                                                    })
                                                            }
                                                        );

                                                    const passportData =
                                                        await passportResponse.json();

                                                    if (!passportResponse.ok) {

                                                        throw new Error(
                                                            passportData.detail ||
                                                            "Could not create Skill Passport."
                                                        );
                                                    }

                                                    passportButton.textContent =
                                                        "✓ Added to Skill Passport";

                                                    passportButton.style.background =
                                                        "#166534";

                                                    const passportSkills =
                                                        document.getElementById(
                                                            "passportSkills"
                                                        );

                                                    if (passportSkills) {

                                                        const existingSkills =
                                                            Array.from(
                                                                passportSkills.querySelectorAll(
                                                                    ".passport-skill span"
                                                                )
                                                            ).map(
                                                                skill =>
                                                                    skill.textContent
                                                                        .trim()
                                                                        .toLowerCase()
                                                            );

                                                        if (
                                                            !existingSkills.includes(
                                                                skillToVerify.toLowerCase()
                                                            )
                                                        ) {

                                                            const newSkill =
                                                                document.createElement(
                                                                    "div"
                                                                );

                                                            newSkill.className =
                                                                "passport-skill";

                                                            newSkill.innerHTML = `
                                                                <span>
                                                                    ${skillToVerify}
                                                                </span>

                                                                <b>
                                                                    VERIFIED ✓
                                                                </b>
                                                            `;

                                                            passportSkills.appendChild(
                                                                newSkill
                                                            );
                                                        }
                                                    }

                                                } catch (error) {

                                                    console.error(
                                                        "Passport error:",
                                                        error
                                                    );

                                                    passportButton.disabled =
                                                        false;

                                                    passportButton.textContent =
                                                        "Add to Skill Passport →";

                                                    alert(
                                                        error.message
                                                    );
                                                }
                                            }
                                        );

                                    } else {

                                        githubResult.innerHTML = `

                                            <div style="
                                                padding:14px;
                                                background:#fff7ed;
                                                border:1px solid #fed7aa;
                                                border-radius:10px;
                                                color:#9a3412;
                                            ">

                                                <strong>
                                                    Evidence not verified
                                                </strong>

                                                <p style="
                                                    margin-bottom:0;
                                                ">
                                                    ${
                                                        githubData.message ||
                                                        "GitHub repository evidence could not be verified."
                                                    }
                                                </p>

                                            </div>
                                        `;
                                    }

                                } catch (error) {

                                    console.error(
                                        "GitHub verification error:",
                                        error
                                    );

                                    githubResult.innerHTML = `
                                        <p style="
                                            color:#b42318;
                                            line-height:1.5;
                                        ">
                                            ${error.message}
                                        </p>
                                    `;

                                } finally {

                                    verifyGithubButton.disabled =
                                        false;

                                    if (
                                        verifyGithubButton.textContent !==
                                        "GitHub Verified ✓"
                                    ) {

                                        verifyGithubButton.textContent =
                                            "Verify GitHub Project →";
                                    }
                                }
                            }
                        );
                    }

                } catch (error) {

                    console.error(
                        "Analysis error:",
                        error
                    );

                    message.innerHTML = `
                        <p style="
                            color:#b42318;
                            line-height:1.5;
                        ">
                            ${error.message}
                        </p>
                    `;

                } finally {

                    startAnalysisButton.disabled =
                        false;

                    startAnalysisButton.textContent =
                        "Analyze Resume →";
                }

            }
        );

    });

}