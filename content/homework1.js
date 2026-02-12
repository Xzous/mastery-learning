// ============================================================
// homework1.js — HW #1 step-by-step lessons (10 questions)
// ============================================================
window.HomeworkData = {
  'hw1': {
    id: 'hw1',
    name: 'Homework #1',
    dueDate: 'February 16, 2026',
    courseId: 'linear-algebra',
    questions: [

// ==================== Q1: Determinants & Inverses ====================
{
  id: 'hw1-q1',
  name: 'Q1: Determinants & Inverses',
  formalText: 'Find the determinant and the inverse of matrices $A_1$, $A_2$, and $A_3$ by hand.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q1-p', text: 'Determinants and inverses' }],
  explanations: [
    {
      type: 'intro',
      title: 'Problem Overview',
      body: 'We need to find the determinant and inverse of three matrices by hand:\n\n$A_1 = \\begin{bmatrix} 1 & 0 & -1 \\\\ 2 & 1 & 4 \\\\ 1 & 1 & 9 \\end{bmatrix}$, $A_2 = \\begin{bmatrix} 3 & 2 & 1 \\\\ 1 & 2 & 1 \\\\ 0 & 5 & 6 \\end{bmatrix}$, $A_3 = \\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$.\n\nThe key tools are cofactor expansion for determinants and the adjugate formula for inverses.',
      keyTerms: ['cofactor expansion', 'adjugate']
    },
    {
      type: 'concept',
      title: 'Cofactor Expansion (Row 1)',
      body: 'For a $3 \\times 3$ matrix, expand along row 1:\n\n$$\\det(A) = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$$\n\nwhere $C_{ij} = (-1)^{i+j} M_{ij}$ is the cofactor, and $M_{ij}$ is the minor — the determinant of the $2 \\times 2$ submatrix obtained by deleting row $i$ and column $j$. Choose a row or column with zeros to simplify the computation.',
      keyTerms: ['cofactor', 'minor']
    },
    {
      type: 'example',
      title: 'Computing det(A₁)',
      body: 'Expand $A_1$ along row 1 (which has a zero in position (1,2)):\n\n$$\\det(A_1) = 1 \\cdot \\det\\begin{bmatrix} 1 & 4 \\\\ 1 & 9 \\end{bmatrix} - 0 + (-1) \\cdot \\det\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$$\n\n$$= 1(9 - 4) - 0 + (-1)(2 - 1) = 5 - 1 = 4$$\n\nSimilarly: $\\det(A_2) = 3(12-5) - 2(6-0) + 1(5-0) = 21 - 12 + 5 = 14$.\n\nFor $2 \\times 2$: $\\det(A_3) = 3 \\cdot 3 - 4 \\cdot 2 = 1$.',
      keyTerms: []
    },
    {
      type: 'concept',
      title: 'Finding the Inverse',
      body: 'The inverse formula is $A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$, where $\\text{adj}(A)$ is the transpose of the cofactor matrix.\n\nFor $A_1$, compute all 9 cofactors to get:\n$$\\text{adj}(A_1) = \\begin{bmatrix} 5 & -1 & 1 \\\\ -14 & 10 & -6 \\\\ 1 & -1 & 1 \\end{bmatrix}, \\quad A_1^{-1} = \\frac{1}{4}\\begin{bmatrix} 5 & -1 & 1 \\\\ -14 & 10 & -6 \\\\ 1 & -1 & 1 \\end{bmatrix}$$\n\nFor $2 \\times 2$: $A_3^{-1} = \\frac{1}{1}\\begin{bmatrix} 3 & -4 \\\\ -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 3 & -4 \\\\ -2 & 3 \\end{bmatrix}$.',
      keyTerms: ['adjugate', 'cofactor matrix']
    }
  ],
  exercises: [
    {
      prompt: 'What is $\\det(A_1)$ where $A_1 = \\begin{bmatrix} 1 & 0 & -1 \\\\ 2 & 1 & 4 \\\\ 1 & 1 & 9 \\end{bmatrix}$?',
      choices: ['4', '6', '-4', '2'],
      correctIndex: 0,
      explanation: 'Expanding along row 1: 1(9-4) - 0 + (-1)(2-1) = 5 - 1 = 4.'
    },
    {
      prompt: 'What is $\\det(A_3)$ where $A_3 = \\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$?',
      choices: ['1', '-1', '17', '0'],
      correctIndex: 0,
      explanation: 'For a 2×2 matrix: det = ad - bc = 3(3) - 4(2) = 9 - 8 = 1.'
    },
    {
      prompt: 'The inverse formula $A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$ requires which condition?',
      choices: ['$\\det(A) \\neq 0$', '$A$ is symmetric', '$A$ has all positive entries', '$A$ is upper triangular'],
      correctIndex: 0,
      explanation: 'The inverse exists only when det(A) ≠ 0 (the matrix is nonsingular).'
    },
    {
      prompt: 'What is $A_3^{-1}$ where $A_3 = \\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$?',
      choices: [
        '$\\begin{bmatrix} 3 & -4 \\\\ -2 & 3 \\end{bmatrix}$',
        '$\\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$',
        '$\\begin{bmatrix} -3 & 4 \\\\ 2 & -3 \\end{bmatrix}$',
        '$\\begin{bmatrix} 3 & -2 \\\\ -4 & 3 \\end{bmatrix}$'
      ],
      correctIndex: 0,
      explanation: 'For 2×2: swap diagonal, negate off-diagonal, divide by det = 1.'
    }
  ]
},

// ==================== Q2: REF, RREF & Rank ====================
{
  id: 'hw1-q2',
  name: 'Q2: REF, RREF & Rank',
  formalText: 'Reduce $A_1$ and $A_2$ to REF and RREF. Compute their ranks.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q2-p', text: 'REF RREF Rank' }],
  explanations: [
    {
      type: 'intro',
      title: 'Problem Overview',
      body: 'Given:\n$A_1 = \\begin{bmatrix} 1 & -1 & -3 & 2 & -6 \\\\ 2 & 3 & -1 & 1 & 6 \\\\ 3 & 7 & 1 & 0 & 18 \\\\ 4 & 6 & -2 & 1 & 13 \\end{bmatrix}$\n\nWe will row reduce to REF, then RREF, and determine the rank (number of pivot positions).',
      keyTerms: ['REF', 'RREF', 'rank']
    },
    {
      type: 'concept',
      title: 'Row Reduction of A₁ to REF',
      body: 'Start with $A_1$. Use $a_{11} = 1$ as the first pivot.\n\n$R_2 \\leftarrow R_2 - 2R_1$: $[0, 5, 5, -3, 18]$\n$R_3 \\leftarrow R_3 - 3R_1$: $[0, 10, 10, -6, 36]$\n$R_4 \\leftarrow R_4 - 4R_1$: $[0, 10, 10, -7, 37]$\n\nThen $R_3 \\leftarrow R_3 - 2R_2$: $[0, 0, 0, 0, 0]$ and $R_4 \\leftarrow R_4 - 2R_2$: $[0, 0, 0, -1, 1]$.\n\nSwap $R_3 \\leftrightarrow R_4$ and scale to get leading 1s.',
      keyTerms: ['pivot', 'leading 1']
    },
    {
      type: 'example',
      title: 'REF and RREF of A₁',
      body: 'REF of $A_1$:\n$$\\begin{bmatrix} 1 & -1 & -3 & 2 & -6 \\\\ 0 & 1 & 1 & -3/5 & 18/5 \\\\ 0 & 0 & 0 & 1 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$\n\nEliminate upward to get RREF:\n$$\\begin{bmatrix} 1 & 0 & -2 & 0 & -1 \\\\ 0 & 1 & 1 & 0 & 3 \\\\ 0 & 0 & 0 & 1 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$\n\nPivot columns: 1, 2, 4. Rank = 3. Free variables: $x_3$, $x_5$.',
      keyTerms: ['pivot columns', 'free variables']
    },
    {
      type: 'concept',
      title: 'A₂ Result and Rank Summary',
      body: 'For $A_2 = \\begin{bmatrix} -1 & 2 & -7 & 4 & 1 \\\\ 3 & 1 & 0 & 0 & 2 \\\\ 6 & 1 & 3 & -2 & 3 \\end{bmatrix}$, the same process yields RREF:\n$$\\begin{bmatrix} 1 & 0 & 1 & 0 & 1 \\\\ 0 & 1 & -3 & 0 & -1 \\\\ 0 & 0 & 0 & 1 & 1 \\end{bmatrix}$$\n\nPivot columns: 1, 2, 4. Rank = 3.\n\nKey fact: rank = number of nonzero rows in REF = number of pivots.',
      keyTerms: ['rank']
    }
  ],
  exercises: [
    {
      prompt: 'What is the rank of $A_1$ (the $4 \\times 5$ matrix)?',
      choices: ['3', '4', '2', '5'],
      correctIndex: 0,
      explanation: 'After row reduction, there are 3 pivots (in columns 1, 2, and 4), so rank = 3.'
    },
    {
      prompt: 'How many free variables does $A_1$ have?',
      choices: ['2', '1', '3', '0'],
      correctIndex: 0,
      explanation: 'Free variables = n - rank = 5 - 3 = 2 (columns 3 and 5 are free).'
    },
    {
      prompt: 'In the RREF of $A_1$, which columns are pivot columns?',
      choices: ['Columns 1, 2, and 4', 'Columns 1, 2, and 3', 'Columns 1, 3, and 5', 'Columns 2, 3, and 4'],
      correctIndex: 0,
      explanation: 'The leading 1s appear in columns 1, 2, and 4 of the RREF.'
    }
  ]
},

// ==================== Q3: Subspaces ====================
{
  id: 'hw1-q3',
  name: 'Q3: Subspace Test',
  formalText: 'Determine which subsets $S_1, S_2, S_3, S_4$ are subspaces of $\\mathbb{R}^2$ or $\\mathbb{R}^3$.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q3-p', text: 'Subspaces' }],
  explanations: [
    {
      type: 'intro',
      title: 'The Subspace Test',
      body: 'A subset $S$ of $\\mathbb{R}^n$ is a subspace if and only if:\n\n1. The zero vector $\\mathbf{0} \\in S$\n2. Closed under addition: $\\mathbf{u}, \\mathbf{v} \\in S \\Rightarrow \\mathbf{u} + \\mathbf{v} \\in S$\n3. Closed under scalar multiplication: $\\mathbf{u} \\in S, c \\in \\mathbb{R} \\Rightarrow c\\mathbf{u} \\in S$\n\nIf any condition fails, it is NOT a subspace.',
      keyTerms: ['zero vector', 'closed under addition', 'closed under scalar multiplication']
    },
    {
      type: 'example',
      title: 'S₁ and S₂ — Both Subspaces',
      body: '$S_1 = \\{(x, y) : x = 3y\\}$: Setting $y = 0$ gives $(0,0) \\in S_1$. If $x_1 = 3y_1$ and $x_2 = 3y_2$, then $x_1+x_2 = 3(y_1+y_2)$. Scalar closure is similar. $S_1 = \\text{span}\\{(3,1)\\}$ — a line through the origin. Subspace!\n\n$S_2 = \\{(x,y) : x = 2y \\text{ and } 2x = 3y\\}$: From $x = 2y$ and $2x = 3y$: $4y = 3y \\Rightarrow y = 0$, so $x = 0$. Thus $S_2 = \\{(0,0)\\}$, the trivial subspace.',
      keyTerms: []
    },
    {
      type: 'example',
      title: 'S₃ — NOT a Subspace',
      body: '$S_3 = \\{(x, y) : x = -3y + 1\\}$.\n\nCheck the zero vector: when $x = 0, y = 0$: $0 = -3(0) + 1 = 1$. This is false! So $(0,0) \\notin S_3$.\n\nSince $S_3$ does not contain the zero vector, it fails the first condition and is NOT a subspace.\n\nGeometrically, $S_3$ is a line that does not pass through the origin (it has a $y$-intercept of $1/3$).',
      keyTerms: ['zero vector']
    },
    {
      type: 'example',
      title: 'S₄ — Subspace of R³',
      body: '$S_4 = \\{(x, y, z) : x = 2y \\text{ and } x - 2y + z = 0\\}$.\n\nSubstitute $x = 2y$ into the second equation: $2y - 2y + z = 0 \\Rightarrow z = 0$.\n\nSo $S_4 = \\{(2y, y, 0) : y \\in \\mathbb{R}\\} = \\text{span}\\{(2, 1, 0)\\}$.\n\nThis is the span of a single vector — automatically a subspace of $\\mathbb{R}^3$. It is a line through the origin in 3D space.',
      keyTerms: ['span']
    }
  ],
  exercises: [
    {
      prompt: 'Which of the four sets is NOT a subspace?',
      choices: ['$S_3$ only', '$S_1$ and $S_3$', '$S_2$ and $S_4$', 'All are subspaces'],
      correctIndex: 0,
      explanation: 'S₃ fails the zero vector test: x = -3(0) + 1 = 1 ≠ 0.'
    },
    {
      prompt: 'Why is $S_3 = \\{(x,y) : x = -3y + 1\\}$ not a subspace?',
      choices: [
        'It does not contain the zero vector',
        'It is not closed under addition',
        'It is infinite',
        'It is not a subset of $\\mathbb{R}^2$'
      ],
      correctIndex: 0,
      explanation: 'Setting x = 0, y = 0: 0 ≠ -3(0)+1 = 1. The zero vector is not in S₃.'
    },
    {
      prompt: 'What is $S_4$ equal to?',
      choices: [
        '$\\text{span}\\{(2, 1, 0)\\}$',
        '$\\text{span}\\{(1, 2, 0)\\}$',
        '$\\text{span}\\{(2, 1, 0), (0, 0, 1)\\}$',
        '$\\{(0, 0, 0)\\}$'
      ],
      correctIndex: 0,
      explanation: 'From x = 2y and z = 0, every vector has the form (2y, y, 0) = y(2, 1, 0).'
    }
  ]
},

// ==================== Q4: Linear Independence ====================
{
  id: 'hw1-q4',
  name: 'Q4: Linear Independence',
  formalText: 'Check whether each set of vectors is linearly independent. If dependent, find a nontrivial linear combination equal to zero.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q4-p', text: 'Linear independence' }],
  explanations: [
    {
      type: 'intro',
      title: 'Linear Independence Review',
      body: 'Vectors $\\{v_1, \\ldots, v_k\\}$ are linearly independent if the only solution to $c_1 v_1 + \\cdots + c_k v_k = \\mathbf{0}$ is the trivial solution $c_1 = \\cdots = c_k = 0$.\n\nKey shortcuts:\n- If any vector is $\\mathbf{0}$, the set is dependent.\n- If one vector is a scalar multiple of another, the set is dependent.\n- If $k > n$ (more vectors than the dimension of $\\mathbb{R}^n$), the set is dependent.\n- For $k = n$ vectors in $\\mathbb{R}^n$: independent $\\Leftrightarrow$ $\\det \\neq 0$.',
      keyTerms: ['linearly independent', 'trivial solution']
    },
    {
      type: 'example',
      title: 'Parts (a), (b), (c)',
      body: '(a) $\\{(1,2), (1,1)\\}$ in $\\mathbb{R}^2$: $\\det\\begin{bmatrix} 1 & 1 \\\\ 2 & 1 \\end{bmatrix} = 1 - 2 = -1 \\neq 0$. Independent!\n\n(b) $\\{(1,2), (0,0)\\}$: Contains the zero vector $\\Rightarrow$ dependent. Nontrivial combo: $0 \\cdot (1,2) + 1 \\cdot (0,0) = \\mathbf{0}$.\n\n(c) $\\{(1,2), (1,-2), (14,19)\\}$: Three vectors in $\\mathbb{R}^2$ — must be dependent (more vectors than dimension). To find the relation, solve the system and get: $-47(1,2) - 9(1,-2) + 4(14,19) = \\mathbf{0}$.',
      keyTerms: []
    },
    {
      type: 'example',
      title: 'Parts (d), (e), (f)',
      body: '(d) $\\{(1,2,3), (2,4,6)\\}$: $(2,4,6) = 2(1,2,3)$ — one is a scalar multiple, so dependent. Nontrivial combo: $2(1,2,3) - 1(2,4,6) = \\mathbf{0}$.\n\n(e) $\\{(1,2,3), (1,0,-1)\\}$: Neither is a multiple of the other. Two vectors in $\\mathbb{R}^3$ with no proportionality $\\Rightarrow$ independent.\n\n(f) $\\{(1,2,3), (1,0,-1), (-1,4,9)\\}$: Form the matrix, compute $\\det = 0$. The dependency relation is: $-2(1,2,3) + 3(1,0,-1) + 1(-1,4,9) = \\mathbf{0}$.',
      keyTerms: []
    }
  ],
  exercises: [
    {
      prompt: 'Are $\\{(1,2), (1,1)\\}$ linearly independent in $\\mathbb{R}^2$?',
      choices: ['Yes — determinant is $-1 \\neq 0$', 'No — they are proportional', 'Yes — they are orthogonal', 'No — they are both in $\\mathbb{R}^2$'],
      correctIndex: 0,
      explanation: 'det = 1(1) - 1(2) = -1 ≠ 0, so they are linearly independent.'
    },
    {
      prompt: 'Why are 3 vectors in $\\mathbb{R}^2$ always linearly dependent?',
      choices: [
        'More vectors than the dimension of the space',
        'They must all be parallel',
        'The zero vector is always included',
        'Their determinant is undefined'
      ],
      correctIndex: 0,
      explanation: 'In R^n, any set of more than n vectors must be linearly dependent.'
    },
    {
      prompt: 'Which set is linearly INDEPENDENT?',
      choices: [
        '$\\{(1,2,3), (1,0,-1)\\}$',
        '$\\{(1,2,3), (2,4,6)\\}$',
        '$\\{(1,2), (0,0)\\}$',
        '$\\{(1,2,3), (1,0,-1), (-1,4,9)\\}$'
      ],
      correctIndex: 0,
      explanation: 'The vectors (1,2,3) and (1,0,-1) are not proportional, and 2 vectors in R³ that aren\'t proportional are always independent.'
    }
  ]
},

// ==================== Q5: Independence with Parameter α ====================
{
  id: 'hw1-q5',
  name: 'Q5: Independence with Parameter \\(\\alpha\\)',
  formalText: 'For which $\\alpha$ are $u_1 = (\\alpha, -1, -1)^T$, $u_2 = (-1, \\alpha, 0)^T$, $u_3 = (-1, -1, \\alpha)^T$ independent in $\\mathbb{R}^3$?',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q5-p', text: 'Independence with alpha' }],
  explanations: [
    {
      type: 'intro',
      title: 'Strategy: Determinant Test',
      body: 'Three vectors in $\\mathbb{R}^3$ are linearly independent if and only if the determinant of the matrix formed by placing them as columns is nonzero.\n\nWe need: $\\det\\begin{bmatrix} \\alpha & -1 & -1 \\\\ -1 & \\alpha & -1 \\\\ -1 & -1 & \\alpha \\end{bmatrix} \\neq 0$.\n\nCompute this determinant as a function of $\\alpha$, then find the values where it equals zero.',
      keyTerms: ['determinant test']
    },
    {
      type: 'concept',
      title: 'Computing the Determinant',
      body: 'Expand along row 1:\n$$\\det = \\alpha(\\alpha^2 - 1) - (-1)(-\\alpha - 1) + (-1)(1 + \\alpha)$$\n$$= \\alpha(\\alpha^2 - 1) - (\\alpha + 1) - (1 + \\alpha)$$\n$$= \\alpha^3 - \\alpha - 2\\alpha - 2 = \\alpha^3 - 3\\alpha - 2$$',
      keyTerms: []
    },
    {
      type: 'concept',
      title: 'Factoring the Polynomial',
      body: 'We need to factor $\\alpha^3 - 3\\alpha - 2 = 0$.\n\nTry $\\alpha = -1$: $(-1)^3 - 3(-1) - 2 = -1 + 3 - 2 = 0$. So $(\\alpha + 1)$ is a factor.\n\nPolynomial division: $\\alpha^3 - 3\\alpha - 2 = (\\alpha + 1)(\\alpha^2 - \\alpha - 2) = (\\alpha + 1)(\\alpha - 2)(\\alpha + 1) = (\\alpha + 1)^2(\\alpha - 2)$.\n\nSo the determinant is zero when $\\alpha = -1$ or $\\alpha = 2$.',
      keyTerms: []
    },
    {
      type: 'axiom',
      title: 'Conclusion',
      body: 'The vectors $u_1, u_2, u_3$ are linearly independent for all real $\\alpha$ EXCEPT $\\alpha = -1$ and $\\alpha = 2$.\n\nAt these values, the determinant equals zero, meaning the vectors become linearly dependent.',
      keyTerms: []
    }
  ],
  exercises: [
    {
      prompt: 'What is $\\det\\begin{bmatrix} \\alpha & -1 & -1 \\\\ -1 & \\alpha & -1 \\\\ -1 & -1 & \\alpha \\end{bmatrix}$?',
      choices: ['$(\\alpha + 1)^2(\\alpha - 2)$', '$\\alpha^3 - 2\\alpha - 1$', '$(\\alpha - 1)^2(\\alpha + 2)$', '$\\alpha^3 + 3\\alpha + 2$'],
      correctIndex: 0,
      explanation: 'The determinant factors as (α+1)²(α-2).'
    },
    {
      prompt: 'For $\\alpha = -1$, are the vectors linearly independent?',
      choices: ['No', 'Yes', 'Only if the vectors are in $\\mathbb{R}^2$', 'Cannot be determined'],
      correctIndex: 0,
      explanation: 'At α = -1, the determinant is 0, so the vectors are linearly dependent.'
    },
    {
      prompt: 'For $\\alpha = 0$, are the vectors linearly independent?',
      choices: ['Yes — $\\det = (1)^2(-2) = -2 \\neq 0$', 'No — $\\det = 0$', 'Yes — all entries are integers', 'No — the matrix is singular'],
      correctIndex: 0,
      explanation: 'At α = 0: det = (0+1)²(0-2) = 1·(-2) = -2 ≠ 0, so they are independent.'
    }
  ]
},

// ==================== Q6: Rank Conditions ====================
{
  id: 'hw1-q6',
  name: 'Q6: Rank Conditions',
  formalText: 'Find conditions on $a, b, c$ such that $A = \\begin{bmatrix} a & b & c \\\\ 1 & 1 & 1 \\end{bmatrix}$ has rank 1 or rank 2.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q6-p', text: 'Rank conditions' }],
  explanations: [
    {
      type: 'intro',
      title: 'Analyzing the Matrix',
      body: 'We have $A = \\begin{bmatrix} a & b & c \\\\ 1 & 1 & 1 \\end{bmatrix}$, a $2 \\times 3$ matrix.\n\nSince $A$ has 2 rows and the second row $[1, 1, 1]$ is always nonzero, we know $\\text{rank}(A) \\geq 1$. The maximum possible rank is $\\min(2, 3) = 2$.\n\nSo rank is either 1 or 2.',
      keyTerms: ['rank']
    },
    {
      type: 'concept',
      title: 'Rank = 1: Rows Must Be Proportional',
      body: 'For rank = 1, both rows must be proportional (scalar multiples). Since row 2 is $[1, 1, 1]$, row 1 must be $k[1, 1, 1] = [k, k, k]$ for some scalar $k$.\n\nThis means $a = b = c$.\n\nExample: If $a = b = c = 5$, then $A = \\begin{bmatrix} 5 & 5 & 5 \\\\ 1 & 1 & 1 \\end{bmatrix}$ and $R_1 = 5R_2$, so rank = 1.',
      keyTerms: ['proportional']
    },
    {
      type: 'concept',
      title: 'Rank = 2: Rows Are Not Proportional',
      body: 'For rank = 2, the two rows must be linearly independent. This happens when row 1 is NOT a scalar multiple of $[1, 1, 1]$.\n\nEquivalently, not all of $a, b, c$ are equal. At least one of the $2 \\times 2$ minors must be nonzero:\n$$a - b \\neq 0 \\quad \\text{or} \\quad b - c \\neq 0 \\quad \\text{or} \\quad a - c \\neq 0$$\n\nIn short: rank = 2 when $a, b, c$ are not all equal.',
      keyTerms: ['linearly independent']
    }
  ],
  exercises: [
    {
      prompt: 'When is rank$(A)$ = 1?',
      choices: ['$a = b = c$', '$a + b + c = 0$', '$a = 1, b = 1, c = 1$', '$abc = 0$'],
      correctIndex: 0,
      explanation: 'Rank = 1 when the rows are proportional, which requires a = b = c.'
    },
    {
      prompt: 'If $a = 2, b = 3, c = 2$, what is rank$(A)$?',
      choices: ['2', '1', '3', '0'],
      correctIndex: 0,
      explanation: 'Since b = 3 ≠ a = 2, the values are not all equal, so rank = 2.'
    },
    {
      prompt: 'Can rank$(A)$ ever be 0?',
      choices: ['No — row 2 is always nonzero', 'Yes — when $a = b = c = 0$', 'Yes — when the rows cancel', 'No — rank is always 2'],
      correctIndex: 0,
      explanation: 'The second row [1,1,1] is always nonzero, so rank ≥ 1.'
    }
  ]
},

// ==================== Q7: Rank, Range Space & Null Space ====================
{
  id: 'hw1-q7',
  name: 'Q7: Rank, Range & Null Space',
  formalText: 'Find the rank, a basis of the range space, and a basis of the null space for $A_1, A_2, A_3$.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q7-p', text: 'Range and null space' }],
  explanations: [
    {
      type: 'intro',
      title: 'Key Definitions',
      body: 'For a matrix $A$ ($m \\times n$):\n- Range space (column space) = $\\{Ax : x \\in \\mathbb{R}^n\\}$ = span of columns of $A$.\n- Null space = $\\{x : Ax = \\mathbf{0}\\}$.\n- Rank = dim(range) = number of pivots.\n- Nullity = dim(null space) = number of free variables.\n- Rank-Nullity Theorem: rank + nullity = $n$.',
      keyTerms: ['range space', 'null space', 'rank-nullity']
    },
    {
      type: 'example',
      title: 'A₁ Analysis',
      body: '$A_1 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ is already in REF.\n\nPivots in columns 2 and 3. Rank = 2.\n\nRange basis: columns 2 and 3 of $A_1$ = $\\{(1,0,0)^T, (0,0,1)^T\\}$.\n\nNull space: $x_1$ is free, $x_2 = 0$, $x_3 = 0$. Basis = $\\{(1,0,0)^T\\}$.\n\nDimensions: range = 2, null = 1. Check: 2 + 1 = 3 = $n$.',
      keyTerms: []
    },
    {
      type: 'example',
      title: 'A₂ Analysis',
      body: '$A_2 = \\begin{bmatrix} 4 & 1 & -1 \\\\ 3 & 2 & 0 \\\\ 1 & 1 & 0 \\end{bmatrix}$. Row reduce:\n\nSwap $R_1 \\leftrightarrow R_3$, then eliminate: RREF = $\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$.\n\nRank = 3 (full rank). Range = $\\mathbb{R}^3$. Null space = $\\{\\mathbf{0}\\}$ (trivial).',
      keyTerms: ['full rank']
    },
    {
      type: 'example',
      title: 'A₃ Analysis',
      body: '$A_3 = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & 2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$. RREF:\n$$\\begin{bmatrix} 1 & 0 & -1 & 0 \\\\ 0 & 1 & 2 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$\n\nPivots in columns 1, 2, 4. Rank = 3. Free variable: $x_3$.\n\nNull space: $x_1 = x_3$, $x_2 = -2x_3$, $x_4 = 0$. Basis = $\\{(1, -2, 1, 0)^T\\}$.\n\nRange basis: pivot columns of original $A_3$ = $\\{(1,0,0)^T, (2,-1,0)^T, (4,2,1)^T\\}$.',
      keyTerms: ['free variable']
    }
  ],
  exercises: [
    {
      prompt: 'What is the rank of $A_1 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$?',
      choices: ['2', '1', '3', '0'],
      correctIndex: 0,
      explanation: 'Pivots appear in columns 2 and 3 (rows 1 and 3 are nonzero with leading entries). Rank = 2.'
    },
    {
      prompt: 'What is the dimension of the null space of $A_2$ (the full-rank $3 \\times 3$ matrix)?',
      choices: ['0', '1', '2', '3'],
      correctIndex: 0,
      explanation: 'A₂ has rank 3 and n = 3 columns, so nullity = 3 - 3 = 0. Only the zero vector.'
    },
    {
      prompt: 'A basis for the null space of $A_3$ is:',
      choices: ['$\\{(1, -2, 1, 0)^T\\}$', '$\\{(1, 2, 1, 0)^T\\}$', '$\\{(-1, 2, 1, 0)^T\\}$', '$\\{(0, 0, 0, 0)^T\\}$'],
      correctIndex: 0,
      explanation: 'From RREF: x₁ = x₃, x₂ = -2x₃, x₃ free, x₄ = 0. Setting x₃ = 1 gives (1,-2,1,0).'
    }
  ]
},

// ==================== Q8: Basis & Dimension ====================
{
  id: 'hw1-q8',
  name: 'Q8: Basis & Dimension',
  formalText: 'Determine the basis and dimension of $V = \\text{span}\\{v_1, v_2, v_3, v_4\\}$.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q8-p', text: 'Basis and dimension' }],
  explanations: [
    {
      type: 'intro',
      title: 'Problem Setup',
      body: 'Given four vectors in $\\mathbb{R}^5$:\n$v_1 = (1,2,3,4,5)^T$, $v_2 = (-4,3,6,2,1)^T$, $v_3 = (1,0,2,1,3)^T$, $v_4 = (18,-7,-5,3,17)^T$.\n\n$V$ is the span of these vectors. To find a basis and dimension, stack them as columns and row reduce to find which vectors are linearly independent.',
      keyTerms: ['span', 'basis', 'dimension']
    },
    {
      type: 'concept',
      title: 'Method: Column Reduction',
      body: 'Form $A = [v_1 \\mid v_2 \\mid v_3 \\mid v_4]$ (a $5 \\times 4$ matrix) and row reduce.\n\nThe pivot columns of $A$ tell us which original vectors form a basis.\n\nAfter row reduction, we find pivots in columns 1, 2, and 3. Column 4 ($v_4$) does not have a pivot — it is a linear combination of the first three.\n\nSo $\\text{rank}(A) = 3$ and $\\dim(V) = 3$.',
      keyTerms: ['pivot columns']
    },
    {
      type: 'axiom',
      title: 'Result',
      body: 'A basis for $V$ is $\\{v_1, v_2, v_3\\}$ and $\\dim(V) = 3$.\n\n$v_4$ is dependent on the others: it can be written as a linear combination $v_4 = c_1 v_1 + c_2 v_2 + c_3 v_3$.\n\nIs the basis unique? No — any 3 independent vectors from $V$ form a basis. For example, $\\{v_1, v_2, v_4\\}$ would also work (since $v_4$ is not a multiple of $v_1$ or $v_2$).\n\nPart (d): $v = (32,-6,11,17,50)^T$ — check if $Ax = v$ is consistent. If yes, $v \\in V$.',
      keyTerms: []
    }
  ],
  exercises: [
    {
      prompt: 'What is $\\dim(V)$?',
      choices: ['3', '4', '5', '2'],
      correctIndex: 0,
      explanation: 'Row reduction of [v₁|v₂|v₃|v₄] gives 3 pivots, so dim(V) = 3.'
    },
    {
      prompt: 'Is the basis $\\{v_1, v_2, v_3\\}$ the only possible basis for $V$?',
      choices: ['No — any 3 independent vectors from $V$ work', 'Yes — it is unique', 'No — but it must include $v_1$', 'Yes — because $v_4$ is dependent'],
      correctIndex: 0,
      explanation: 'A basis is not unique. Any set of dim(V) = 3 linearly independent vectors spanning V is a basis.'
    },
    {
      prompt: 'Why is $v_4$ not in the basis?',
      choices: [
        'It is a linear combination of $v_1, v_2, v_3$',
        'It has the largest entries',
        'It is the zero vector',
        'It is orthogonal to the others'
      ],
      correctIndex: 0,
      explanation: 'Row reduction shows column 4 has no pivot — v₄ depends on v₁, v₂, v₃.'
    }
  ]
},

// ==================== Q9: Row, Column & Null Spaces ====================
{
  id: 'hw1-q9',
  name: 'Q9: Row, Column & Null Spaces',
  formalText: 'For $A = \\begin{bmatrix} 1&2&5&1&0 \\\\ -1&-1&-4&1&1 \\\\ 0&-1&-1&-1&0 \\\\ 1&2&5&0&-1 \\end{bmatrix}$, find bases for the row space, column space, and null space.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q9-p', text: 'Three fundamental subspaces' }],
  explanations: [
    {
      type: 'intro',
      title: 'RREF Computation',
      body: 'Row reduce $A$:\n$R_2 \\leftarrow R_2 + R_1$: $[0,1,1,2,1]$\n$R_4 \\leftarrow R_4 - R_1$: $[0,0,0,-1,-1]$\n$R_3 \\leftarrow R_3 + R_2$: $[0,0,0,1,1]$\n$R_4 \\leftarrow R_4 + R_3$: $[0,0,0,0,0]$\n\nThen eliminate upward to get RREF:\n$$\\begin{bmatrix} 1&0&3&0&1 \\\\ 0&1&1&0&-1 \\\\ 0&0&0&1&1 \\\\ 0&0&0&0&0 \\end{bmatrix}$$\n\nPivot columns: 1, 2, 4. Rank = 3.',
      keyTerms: ['RREF', 'pivot columns']
    },
    {
      type: 'concept',
      title: 'Row Space & Column Space',
      body: 'Row space basis = nonzero rows of RREF:\n$\\{(1,0,3,0,1),\\; (0,1,1,0,-1),\\; (0,0,0,1,1)\\}$\n\nColumn space basis = pivot columns of the ORIGINAL matrix $A$ (columns 1, 2, 4):\n$\\left\\{\\begin{pmatrix}1\\\\-1\\\\0\\\\1\\end{pmatrix}, \\begin{pmatrix}2\\\\-1\\\\-1\\\\2\\end{pmatrix}, \\begin{pmatrix}1\\\\1\\\\-1\\\\0\\end{pmatrix}\\right\\}$\n\nBoth have dimension 3 (rank = dim(row space) = dim(column space)).',
      keyTerms: ['row space', 'column space']
    },
    {
      type: 'concept',
      title: 'Null Space',
      body: 'From RREF, free variables are $x_3$ and $x_5$:\n$$x_1 = -3x_3 - x_5, \\quad x_2 = -x_3 + x_5, \\quad x_4 = -x_5$$\n\nSet $x_3 = 1, x_5 = 0$: $(-3, -1, 1, 0, 0)^T$\nSet $x_3 = 0, x_5 = 1$: $(-1, 1, 0, -1, 1)^T$\n\nNull space basis: $\\{(-3,-1,1,0,0)^T,\\; (-1,1,0,-1,1)^T\\}$.\n\nNullity = 2. Check: rank + nullity = 3 + 2 = 5 = $n$.',
      keyTerms: ['null space', 'nullity']
    },
    {
      type: 'concept',
      title: 'Solvability of Ax = b',
      body: 'Part (e): $b = (1,1,1,1)^T$. Augment $[A|b]$ and row reduce. The last row becomes $[0,0,0,0,0,3]$ — inconsistent! So $Ax = b$ has no solution.\n\nPart (f): $b = (1,-1,-1,2)^T$. Row reduction gives a consistent system with solutions $x = (-2,2,0,-1,0)^T + x_3(-3,-1,1,0,0)^T + x_5(-1,1,0,-1,1)^T$.\n\nPart (g): $Ax = b$ is solvable if and only if $b_2 + b_3 + b_4 = 0$ (the row dependency condition on $b$).',
      keyTerms: ['consistent', 'solvability']
    }
  ],
  exercises: [
    {
      prompt: 'What is the rank of $A$?',
      choices: ['3', '2', '4', '5'],
      correctIndex: 0,
      explanation: 'RREF has 3 nonzero rows (pivots in columns 1, 2, 4), so rank = 3.'
    },
    {
      prompt: 'What is the nullity of $A$?',
      choices: ['2', '3', '1', '0'],
      correctIndex: 0,
      explanation: 'Nullity = n - rank = 5 - 3 = 2 (free variables x₃ and x₅).'
    },
    {
      prompt: 'Is $Ax = b$ solvable for $b = (1, 1, 1, 1)^T$?',
      choices: ['No — the augmented system is inconsistent', 'Yes — $A$ has rank 3', 'Yes — $b$ is in $\\mathbb{R}^4$', 'No — $A$ is not square'],
      correctIndex: 0,
      explanation: 'Row reduction of [A|b] produces [0,0,0,0,0,3] — a contradiction 0 = 3.'
    },
    {
      prompt: 'For which $b$ is $Ax = b$ solvable?',
      choices: ['All $b$ with $b_2 + b_3 + b_4 = 0$', 'All $b \\in \\mathbb{R}^4$', 'Only $b = \\mathbf{0}$', 'All $b$ with $b_1 + b_4 = 0$'],
      correctIndex: 0,
      explanation: 'The row operations reveal the dependency: solvable iff b₂ + b₃ + b₄ = 0.'
    }
  ]
},

// ==================== Q10: General Solution ====================
{
  id: 'hw1-q10',
  name: 'Q10: General Solution',
  formalText: 'Find the particular solution, null space, general solution, and minimum-norm solution of $Ax = b$.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q10-p', text: 'General solution' }],
  explanations: [
    {
      type: 'intro',
      title: 'Problem Setup',
      body: 'Given $A = \\begin{bmatrix} 1&2&3&4 \\\\ 0&-1&-2&2 \\\\ 0&0&0&1 \\end{bmatrix}$, $b = \\begin{bmatrix} 3\\\\2\\\\1 \\end{bmatrix}$.\n\nSolve $Ax = b$. The general solution has the form:\n$$x = x_p + x_h$$\nwhere $x_p$ is a particular solution and $x_h$ is any vector in the null space of $A$.',
      keyTerms: ['particular solution', 'null space', 'general solution']
    },
    {
      type: 'concept',
      title: 'RREF of Augmented Matrix',
      body: 'Row reduce $[A \\mid b]$:\n$$\\begin{bmatrix} 1&2&3&4&3 \\\\ 0&-1&-2&2&2 \\\\ 0&0&0&1&1 \\end{bmatrix}$$\n\n$R_2 \\leftarrow -R_2$, then eliminate upward:\n$$\\text{RREF} = \\begin{bmatrix} 1&0&-1&0&-1 \\\\ 0&1&2&0&0 \\\\ 0&0&0&1&1 \\end{bmatrix}$$\n\nPivots in columns 1, 2, 4. Free variable: $x_3$.',
      keyTerms: ['RREF', 'free variable']
    },
    {
      type: 'example',
      title: 'Particular & General Solution',
      body: 'From RREF: $x_1 = -1 + x_3$, $x_2 = -2x_3$, $x_3$ free, $x_4 = 1$.\n\nParticular solution (set $x_3 = 0$): $x_p = (-1, 0, 0, 1)^T$.\n\nNull space ($Ax = 0$): $x_1 = x_3$, $x_2 = -2x_3$, $x_4 = 0$.\nBasis: $\\{(1, -2, 1, 0)^T\\}$.\n\nGeneral solution:\n$$x = \\begin{pmatrix}-1\\\\0\\\\0\\\\1\\end{pmatrix} + t\\begin{pmatrix}1\\\\-2\\\\1\\\\0\\end{pmatrix}, \\quad t \\in \\mathbb{R}$$',
      keyTerms: []
    },
    {
      type: 'concept',
      title: 'Minimum Norm Solution',
      body: 'To find the solution with smallest Euclidean norm, minimize $\\|x\\|^2 = (-1+t)^2 + (-2t)^2 + t^2 + 1^2$:\n$$= (-1+t)^2 + 4t^2 + t^2 + 1 = 6t^2 - 2t + 2$$\n\nTake derivative and set to zero: $12t - 2 = 0 \\Rightarrow t = \\frac{1}{6}$.\n\nMinimum norm solution: $x = \\left(-\\frac{5}{6}, -\\frac{1}{3}, \\frac{1}{6}, 1\\right)^T$.\n\nPart (e): Since rank$(A) = 3$ = number of rows, $Ax = b$ is solvable for ALL $b \\in \\mathbb{R}^3$.',
      keyTerms: ['minimum norm', 'Euclidean norm']
    }
  ],
  exercises: [
    {
      prompt: 'What is a particular solution to $Ax = b$?',
      choices: ['$(-1, 0, 0, 1)^T$', '$(0, 0, 0, 0)^T$', '$(1, -2, 1, 0)^T$', '$(3, 2, 1, 0)^T$'],
      correctIndex: 0,
      explanation: 'Set the free variable x₃ = 0. Then x₁ = -1, x₂ = 0, x₄ = 1.'
    },
    {
      prompt: 'A basis for the null space of $A$ is:',
      choices: ['$\\{(1, -2, 1, 0)^T\\}$', '$\\{(-1, 0, 0, 1)^T\\}$', '$\\{(1, 2, 1, 0)^T\\}$', '$\\{(0, 0, 0, 0)^T\\}$'],
      correctIndex: 0,
      explanation: 'From RREF of Ax = 0: x₁ = x₃, x₂ = -2x₃, x₄ = 0. Set x₃ = 1.'
    },
    {
      prompt: 'Is $Ax = b$ solvable for every $b \\in \\mathbb{R}^3$?',
      choices: ['Yes — rank = 3 = number of rows', 'No — $A$ is not square', 'No — $A$ has a free variable', 'Only when $b = 0$'],
      correctIndex: 0,
      explanation: 'When rank = m (number of rows), the system is consistent for all b in R^m.'
    },
    {
      prompt: 'What value of $t$ gives the minimum norm solution?',
      choices: ['$t = 1/6$', '$t = 0$', '$t = 1$', '$t = -1/6$'],
      correctIndex: 0,
      explanation: 'Minimize 6t² - 2t + 2: derivative = 12t - 2 = 0, so t = 1/6.'
    }
  ]
}

    ] // end questions array
  } // end hw1
}; // end HomeworkData
