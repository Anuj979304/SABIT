from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pypdf import PdfReader
import requests


app = FastAPI(title="SABIT API")


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# STUDENT PROFILE
# --------------------------------------------------

class StudentProfile(BaseModel):
    name: str
    degree: str
    branch: str
    target_role: str


@app.get("/")
def home():
    return {
        "project": "SABIT",
        "message": "Skill hai? Sabit karo."
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/student")
def create_student(student: StudentProfile):
    return {
        "message": "Student profile created successfully",
        "student": student
    }


# --------------------------------------------------
# RESUME UPLOAD
# --------------------------------------------------

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return {
        "filename": file.filename,
        "resume_text": text
    }


# --------------------------------------------------
# SKILLS
# --------------------------------------------------

SKILLS = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "SQL",
    "Excel",
    "HTML",
    "CSS",
    "Machine Learning",
    "Deep Learning",
    "AWS",
    "Docker",
    "Git",
    "React",
    "FastAPI",
    "OpenCV"
]


@app.post("/analyze-skills")
async def analyze_skills(file: UploadFile = File(...)):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    text_lower = text.lower()

    # Skill aliases and related technologies
    # Skill aliases and related technologies
    skill_aliases = {

        "Python": [
            "python",
            "python programming",
            "pandas",
            "numpy"
        ],

        "Java": [
            "java",
            "core java"
        ],

        "C++": [
            "c++",
            "cpp"
        ],

        "JavaScript": [
            "javascript",
            "java script",
            "js",
            "ecmascript"
        ],

        "SQL": [
            "sql",
            "mysql",
            "postgresql",
            "postgres",
            "database",
            "database management"
        ],

        "Excel": [
            "excel",
            "microsoft excel",
            "ms excel",
            "spreadsheets",
            "spreadsheet"
        ],

        "HTML": [
            "html",
            "html5",
            "hypertext markup language"
        ],

        "CSS": [
            "css",
            "css3",
            "cascading style sheets"
        ],

        "Machine Learning": [
            "machine learning",
            "machine-learning",
            "scikit-learn",
            "sklearn",
            "regression",
            "classification",
            "clustering"
        ],

        "Deep Learning": [
            "deep learning",
            "neural network",
            "neural networks",
            "cnn",
            "convolutional neural network",
            "rnn",
            "lstm",
            "transformer",
            "pytorch",
            "tensorflow"
        ],

        "AWS": [
            "aws",
            "amazon web services",
            "ec2",
            "lambda",
            "s3",
            "dynamodb",
            "api gateway"
        ],

        "Docker": [
            "docker",
            "dockerfile",
            "containerization",
            "containerized",
            "containers"
        ],

        "Git": [
            "git",
            "github",
            "gitlab",
            "version control"
        ],

        "React": [
            "react",
            "react.js",
            "reactjs"
        ],

        "FastAPI": [
            "fastapi",
            "fast api",
            "rest api",
            "restful api"
        ],

        "OpenCV": [
            "opencv",
            "cv2",
            "computer vision",
            "image processing"
        ]
    }

    found_skills = []

    for skill, aliases in skill_aliases.items():

        for alias in aliases:

            if alias in text_lower:
                found_skills.append(skill)
                break

    return {
        "filename": file.filename,
        "skills_found": found_skills
    }


# --------------------------------------------------
# ROLE SKILLS
# --------------------------------------------------

ROLE_SKILLS = {

    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "Docker",
        "AWS"
    ],

    "Machine Learning Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "Docker",
        "AWS"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Machine Learning",
        "Deep Learning"
    ],

    "Data Analyst": [
        "Python",
        "SQL",
        "Excel",
        "Machine Learning"
    ],

    "Backend Developer": [
        "Python",
        "FastAPI",
        "SQL",
        "Docker",
        "Git"
    ],

    "Full Stack Developer": [
        "Python",
        "JavaScript",
        "SQL",
        "React",
        "FastAPI",
        "Git"
    ],

    "Frontend Developer": [
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Git"
    ],

    "DevOps Engineer": [
        "Docker",
        "AWS",
        "Git",
        "Python"
    ],

    "Cloud Engineer": [
        "AWS",
        "Docker",
        "Python",
        "Git"
    ],

    "NLP Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "SQL"
    ],

    "Computer Vision Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "OpenCV"
    ]
}


# --------------------------------------------------
# SKILL GAP
# --------------------------------------------------

@app.post("/skill-gap")
async def skill_gap(
    file: UploadFile = File(...),
    target_role: str = Form(...)
):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    text_lower = text.lower()

    # Skill aliases and related technologies
    skill_aliases = {

        "Python": [
            "python",
            "python programming",
            "pandas",
            "numpy"
        ],

        "Java": [
            "java",
            "core java"
        ],

        "C++": [
            "c++",
            "cpp"
        ],

        "JavaScript": [
            "javascript",
            "java script",
            "js",
            "ecmascript"
        ],

        "SQL": [
            "sql",
            "mysql",
            "postgresql",
            "postgres",
            "database",
            "database management"
        ],

        "Excel": [
            "excel",
            "microsoft excel",
            "ms excel",
            "spreadsheets",
            "spreadsheet"
        ],

        "HTML": [
            "html",
            "html5",
            "hypertext markup language"
        ],

        "CSS": [
            "css",
            "css3",
            "cascading style sheets"
        ],

        "Machine Learning": [
            "machine learning",
            "machine-learning",
            "scikit-learn",
            "sklearn",
            "regression",
            "classification",
            "clustering"
        ],

        "Deep Learning": [
            "deep learning",
            "neural network",
            "neural networks",
            "cnn",
            "convolutional neural network",
            "rnn",
            "lstm",
            "transformer",
            "pytorch",
            "tensorflow"
        ],

        "AWS": [
            "aws",
            "amazon web services",
            "ec2",
            "lambda",
            "s3",
            "dynamodb",
            "api gateway"
        ],

        "Docker": [
            "docker",
            "dockerfile",
            "containerization",
            "containerized",
            "containers"
        ],

        "Git": [
            "git",
            "github",
            "gitlab",
            "version control"
        ],

        "React": [
            "react",
            "react.js",
            "reactjs"
        ],

        "FastAPI": [
            "fastapi",
            "fast api",
            "rest api",
            "restful api"
        ],

        "OpenCV": [
            "opencv",
            "cv2",
            "computer vision",
            "image processing"
        ]
    }

    student_skills = []

    for skill, aliases in skill_aliases.items():

        for alias in aliases:

            if alias in text_lower:
                student_skills.append(skill)
                break

    required_skills = ROLE_SKILLS.get(
        target_role,
        []
    )

    missing_skills = [
        skill
        for skill in required_skills
        if skill not in student_skills
    ]

    return {
        "target_role": target_role,
        "student_skills": student_skills,
        "required_skills": required_skills,
        "missing_skills": missing_skills,
        "message": (
            "No major skill gaps found"
            if not missing_skills
            else "Some skills need stronger evidence"
        )
    }

# --------------------------------------------------
# MICRO PROJECTS
# --------------------------------------------------

MICRO_PROJECTS = {

    "Deep Learning": {
        "title": "Build an Image Classification API",
        "description": (
            "Build a small deep learning image classification "
            "project. Train a model on a simple image dataset, "
            "save the trained model, and create an API that "
            "accepts an image and returns a prediction."
        ),
        "duration": "2–3 hours",
        "steps": [
            "Prepare a small image dataset.",
            "Train a neural network model.",
            "Save the trained model.",
            "Create a prediction API.",
            "Add a README explaining the project.",
            "Push the complete project to GitHub."
        ],
        "evidence": [
            "Trained model",
            "Python training code",
            "Prediction API",
            "README.md",
            "requirements.txt"
        ]
    },

    "Docker": {
        "title": "Dockerize a FastAPI Application",
        "description": (
            "Build a small FastAPI application, create a Dockerfile, "
            "build the Docker image, run the application inside a "
            "container, and push the project to GitHub."
        ),
        "duration": "90–120 min",
        "steps": [
            "Create a FastAPI application.",
            "Create requirements.txt.",
            "Create a Dockerfile.",
            "Build the Docker image.",
            "Run the container locally.",
            "Test the API.",
            "Push the project to GitHub."
        ],
        "evidence": [
            "Dockerfile",
            "requirements.txt",
            "main.py",
            "README.md"
        ]
    },

    "AWS": {
        "title": "Deploy a Serverless Student API on AWS",
        "description": (
            "Build a small student API using AWS Lambda and "
            "API Gateway. Store student information in DynamoDB "
            "and document the deployment."
        ),
        "duration": "2–3 hours",
        "steps": [
            "Create a Lambda function.",
            "Create an API Gateway endpoint.",
            "Create a DynamoDB table.",
            "Connect the API to DynamoDB.",
            "Test GET and POST requests.",
            "Document the architecture.",
            "Push the project files to GitHub."
        ],
        "evidence": [
            "Lambda code",
            "API documentation",
            "DynamoDB integration",
            "README.md"
        ]
    },

    "Python": {
        "title": "Build a Python Data Processing Project",
        "description": (
            "Build a Python project that loads a dataset, "
            "cleans the data, performs useful analysis, and "
            "produces a meaningful result."
        ),
        "duration": "90–120 min",
        "steps": [
            "Choose a small dataset.",
            "Load the dataset with Python.",
            "Clean missing or incorrect values.",
            "Perform basic analysis.",
            "Generate useful results.",
            "Document the project.",
            "Push the project to GitHub."
        ],
        "evidence": [
            "Python code",
            "Dataset",
            "README.md",
            "requirements.txt"
        ]
    },

    "Machine Learning": {
        "title": "Build a Machine Learning Prediction API",
        "description": (
            "Train a machine learning model on a small dataset, "
            "save the model, and expose predictions through an API."
        ),
        "duration": "2–3 hours",
        "steps": [
            "Choose a dataset.",
            "Clean and prepare the data.",
            "Train a machine learning model.",
            "Evaluate the model.",
            "Save the trained model.",
            "Create a prediction API.",
            "Push the project to GitHub."
        ],
        "evidence": [
            "Training code",
            "Saved model",
            "Prediction API",
            "README.md",
            "requirements.txt"
        ]
    },

    "FastAPI": {
        "title": "Build a REST API with FastAPI",
        "description": (
            "Create a REST API using FastAPI with multiple "
            "endpoints, request validation, and clear API documentation."
        ),
        "duration": "90–120 min",
        "steps": [
            "Create a FastAPI application.",
            "Create GET and POST endpoints.",
            "Add request validation.",
            "Test the API with Swagger.",
            "Add a README.",
            "Push the project to GitHub."
        ],
        "evidence": [
            "main.py",
            "requirements.txt",
            "README.md",
            "API endpoints"
        ]
    },

    "Git": {
        "title": "Create a Professional GitHub Project",
        "description": (
            "Create a clean GitHub repository with meaningful "
            "commits, documentation, project structure, and a README."
        ),
        "duration": "60–90 min",
        "steps": [
            "Create a GitHub repository.",
            "Create a clean project structure.",
            "Make meaningful commits.",
            "Write a professional README.",
            "Add installation instructions.",
            "Push the complete project."
        ],
        "evidence": [
            "GitHub repository",
            "Commit history",
            "README.md",
            "Project structure"
        ]
    }
}


# --------------------------------------------------
# MICRO PROJECT API
# --------------------------------------------------

@app.get("/micro-project/{skill}")
def get_micro_project(skill: str):

    project = MICRO_PROJECTS.get(skill)

    if not project:

        return {
            "skill": skill,
            "title": f"Build a {skill} Proof Project",
            "description": (
                f"Build a practical project that demonstrates "
                f"your {skill} skill and publish the evidence on GitHub."
            ),
            "duration": "2 hours",
            "steps": [
                f"Build a practical {skill} project.",
                "Document the project.",
                "Add a README.md.",
                "Push the project to GitHub."
            ],
            "evidence": [
                "Source code",
                "README.md",
                "Project documentation"
            ]
        }

    return {
        "skill": skill,
        **project
    }


# --------------------------------------------------
# GITHUB VERIFICATION
# --------------------------------------------------
# --------------------------------------------------
# GITHUB VERIFICATION
# --------------------------------------------------

@app.get("/verify-github")
async def verify_github(repo_url: str):

    import requests
    import re

    # -----------------------------------------
    # 1. Validate GitHub URL
    # -----------------------------------------

    match = re.match(
        r"https?://github\.com/([^/]+)/([^/#]+)",
        repo_url.strip()
    )

    if not match:
        return {
            "verified": False,
            "verification": "Invalid GitHub repository URL."
        }

    owner = match.group(1)
    repo = match.group(2).replace(".git", "")

    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "SABIT"
    }

    api_base = (
        f"https://api.github.com/repos/"
        f"{owner}/{repo}"
    )

    try:

        # -----------------------------------------
        # 2. Check repository
        # -----------------------------------------

        repo_response = requests.get(
            api_base,
            headers=headers,
            timeout=10
        )

        if repo_response.status_code != 200:
            return {
                "verified": False,
                "verification":
                    "GitHub repository could not be accessed."
            }

        repo_data = repo_response.json()

        # Use the repository's actual default branch
        default_branch = repo_data.get(
            "default_branch",
            "main"
        )

        # -----------------------------------------
        # 3. Read complete repository tree
        # -----------------------------------------

        tree_url = (
            f"https://api.github.com/repos/"
            f"{owner}/{repo}/git/trees/"
            f"{default_branch}?recursive=1"
        )

        tree_response = requests.get(
            tree_url,
            headers=headers,
            timeout=10
        )

        if tree_response.status_code != 200:
            return {
                "verified": False,
                "verification":
                    "Repository found, but project files "
                    "could not be read."
            }

        tree_data = tree_response.json()

        files = []

        for item in tree_data.get("tree", []):

            if item.get("type") == "blob":

                files.append(
                    item.get("path", "")
                )

        # -----------------------------------------
        # 4. File names
        # -----------------------------------------

        file_names = [
            file.split("/")[-1].lower()
            for file in files
        ]

        # -----------------------------------------
        # 5. Technical evidence
        # -----------------------------------------

        technical_files = [
            "main.py",
            "app.py",
            "server.py",
            "api.py",
            "train.py",
            "train_model.py",
            "model.py",
            "inference.py",
            "predict.py",
            "preprocess.py",
            "pipeline.py",
            "notebook.ipynb",
            "dockerfile",
            "model.h5",
            "model.keras",
            "pytorch_model.bin"
        ]

        technical_evidence = [
            file
            for file in files
            if file.split("/")[-1].lower()
            in technical_files
        ]

        # -----------------------------------------
        # 6. Data Science / ML evidence
        # -----------------------------------------

        ml_extensions = [
            ".ipynb",
            ".py",
            ".csv",
            ".parquet"
        ]

        ml_files = [
            file
            for file in files
            if any(
                file.lower().endswith(ext)
                for ext in ml_extensions
            )
        ]

        # -----------------------------------------
        # 7. Dependency evidence
        # -----------------------------------------

        dependency_files = [
            "requirements.txt",
            "pyproject.toml",
            "environment.yml",
            "environment.yaml",
            "package.json",
            "pipfile"
        ]

        dependency_evidence = [
            file
            for file in files
            if file.split("/")[-1].lower()
            in dependency_files
        ]

        # -----------------------------------------
        # 8. README evidence
        # -----------------------------------------

        readme_evidence = [
            file
            for file in files
            if file.split("/")[-1].lower()
            in [
                "readme.md",
                "readme.txt"
            ]
        ]

        # -----------------------------------------
        # 9. Detect programming languages
        # -----------------------------------------

        languages_response = requests.get(
            f"{api_base}/languages",
            headers=headers,
            timeout=10
        )

        languages = []

        if languages_response.status_code == 200:

            languages = list(
                languages_response.json().keys()
            )

        # -----------------------------------------
        # 10. Project structure
        # -----------------------------------------

        folders = set()

        for file in files:

            parts = file.split("/")

            if len(parts) > 1:
                folders.add(parts[0])

        project_structure = sorted(
            list(folders)
        )

        # -----------------------------------------
        # 11. Commit history
        # -----------------------------------------

        commits_response = requests.get(
            f"{api_base}/commits",
            headers=headers,
            params={"per_page": 100},
            timeout=10
        )

        commit_count = 0

        if commits_response.status_code == 200:

            commits = commits_response.json()

            if isinstance(commits, list):
                commit_count = len(commits)

        # -----------------------------------------
        # 12. Evidence scoring
        # -----------------------------------------

        evidence_score = 0

        # README
        if readme_evidence:
            evidence_score += 20

        # Strong technical evidence
        if technical_evidence:
            evidence_score += 35

        # Data Science / ML files
        elif len(ml_files) >= 2:
            evidence_score += 30

        # Dependencies
        if dependency_evidence:
            evidence_score += 15

        # Programming languages
        if languages:
            evidence_score += 10

        # Project contains multiple files
        if len(files) >= 5:
            evidence_score += 5

        # Commit history
        if commit_count >= 2:
            evidence_score += 15

        evidence_score = min(
            evidence_score,
            100
        )

        # -----------------------------------------
        # 13. Verification decision
        # -----------------------------------------

        has_project_evidence = (
            len(technical_evidence) >= 1
            or len(ml_files) >= 2
        )

        verified = (
            has_project_evidence
            and evidence_score >= 60
        )

        # -----------------------------------------
        # 14. Response
        # -----------------------------------------

        return {

            "verified": verified,

            "repository":
                f"{owner}/{repo}",

            "files_found":
                len(files),

            "evidence_files":
                (
                    technical_evidence
                    + dependency_evidence
                    + readme_evidence
                ),

            "languages":
                languages,

            "project_structure":
                project_structure,

            "commit_count":
                commit_count,

            "evidence_score":
                evidence_score,

            "verification":
                (
                    "✓ Project Evidence Verified"
                    if verified
                    else
                    "Repository found, but sufficient "
                    "project evidence could not be verified."
                )
        }

    except Exception as e:

        return {

            "verified": False,

            "verification":
                "GitHub verification failed.",

            "error":
                str(e)
        }
# --------------------------------------------------
# SKILL PASSPORT
# --------------------------------------------------
def calculate_readiness(
    required_skills: list[str],
    verified_skills: list[str],
    project_completed: bool = False,
    github_verified: bool = False
):
    if not required_skills:
        return 0

    required_set = {
        skill.lower() for skill in required_skills
    }

    verified_set = {
        skill.lower() for skill in verified_skills
    }

    verified_required = (
        required_set.intersection(verified_set)
    )

    skill_score = (
        len(verified_required) /
        len(required_set)
    ) * 60

    project_score = 10 if project_completed else 0
    github_score = 5 if github_verified else 0

    readiness = round(
        skill_score +
        project_score +
        github_score
    )

    return min(readiness, 100)


class SkillPassport(BaseModel):
    student_name: str
    verified_skills: list[str]
    learning_skills: list[str]


class ReadinessRequest(BaseModel):
    required_skills: list[str]
    verified_skills: list[str]
    project_completed: bool = False
    github_verified: bool = False


@app.post("/readiness")
def calculate_readiness_score(data: ReadinessRequest):

    score = calculate_readiness(
        data.required_skills,
        data.verified_skills,
        data.project_completed,
        data.github_verified
    )

    return {
        "readiness_score": score,
        "required_skills": data.required_skills,
        "verified_skills": data.verified_skills,
        "project_completed": data.project_completed,
        "github_verified": data.github_verified
    }


@app.post("/skill-passport")
def create_skill_passport(passport: SkillPassport):

    return {
        "student_name": passport.student_name,
        "passport_status": "Active",
        "verified_skills": passport.verified_skills,
        "learning_skills": passport.learning_skills,
        "message": "Skill Passport generated successfully."
    }


# --------------------------------------------------
# JOB ANALYSIS
# --------------------------------------------------

JOB_SKILLS = [
    "Python",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Docker",
    "AWS",
    "Git",
    "FastAPI",
    "React",
    "Java"
]


@app.post("/analyze-job")
async def analyze_job(
    job_description: str
):

    found_skills = []

    for skill in JOB_SKILLS:

        if skill.lower() in job_description.lower():

            found_skills.append(skill)

    return {
        "job_description": job_description,
        "skills_required": found_skills
    }


# --------------------------------------------------
# CAREER GAP
# --------------------------------------------------

@app.post("/career-gap")
async def career_gap(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    student_skills = []

    for skill in SKILLS:

        if skill.lower() in text.lower():

            student_skills.append(skill)

    required_skills = []

    for skill in JOB_SKILLS:

        if skill.lower() in job_description.lower():

            required_skills.append(skill)

    skill_gaps = [
        skill
        for skill in required_skills
        if skill not in student_skills
    ]

    return {
        "student_skills": student_skills,
        "job_required_skills": required_skills,
        "skill_gaps": skill_gaps
    }