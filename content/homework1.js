// ============================================================
// homework1.js — HW #1 scaffolded step-by-step lessons
// Each teach slide is followed by a focused question that
// builds toward the full homework problem.
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
      title: 'Step 1: Minors',
      body: 'Given $A_1 = \\begin{bmatrix} 1 & 0 & -1 \\\\ 2 & 1 & 4 \\\\ 1 & 1 & 9 \\end{bmatrix}$.\n\nA minor $M_{ij}$ is the determinant of the $2 \\times 2$ submatrix you get by deleting row $i$ and column $j$. For example, $M_{11}$ deletes row 1 and column 1, leaving $\\begin{bmatrix} 1 & 4 \\\\ 1 & 9 \\end{bmatrix}$.',
      keyTerms: ['minor'],
      exercise: {
        prompt: 'What is the minor $M_{11}$ of $A_1$? (i.e., $\\det\\begin{bmatrix} 1 & 4 \\\\ 1 & 9 \\end{bmatrix}$)',
        choices: ['$5$', '$9$', '$4$', '$13$'],
        correctIndex: 0,
        explanation: '$M_{11} = 1 \\cdot 9 - 4 \\cdot 1 = 9 - 4 = 5$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: Cofactors',
      body: 'The cofactor $C_{ij} = (-1)^{i+j} M_{ij}$ attaches a sign using a checkerboard pattern:\n$$\\begin{bmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{bmatrix}$$\n\nSo $C_{11} = +M_{11} = 5$, $C_{12} = -M_{12}$, $C_{13} = +M_{13}$, etc.',
      keyTerms: ['cofactor'],
      exercise: {
        prompt: 'What is the cofactor $C_{13}$ of $A_1$? (Delete row 1, col 3: $\\det\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, then apply sign)',
        choices: ['$1$', '$-1$', '$3$', '$-3$'],
        correctIndex: 0,
        explanation: '$M_{13} = 2 \\cdot 1 - 1 \\cdot 1 = 1$. Sign: $(-1)^{1+3} = +1$. So $C_{13} = 1$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Cofactor Expansion',
      body: 'The determinant is computed by expanding along any row or column:\n$$\\det(A) = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$$\n\nPick a row with zeros to save work! Row 1 of $A_1$ has $a_{12} = 0$, so:\n$$\\det(A_1) = 1 \\cdot C_{11} + 0 \\cdot C_{12} + (-1) \\cdot C_{13} = 1(5) + 0 + (-1)(1) = 4$$',
      keyTerms: ['cofactor expansion'],
      exercise: {
        prompt: 'What is $\\det(A_1)$?',
        choices: ['$4$', '$6$', '$-4$', '$5$'],
        correctIndex: 0,
        explanation: '$\\det(A_1) = 1(5) - 0 + (-1)(1) = 5 - 1 = 4$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 4: The 2×2 Case',
      body: 'For a $2 \\times 2$ matrix, the determinant is just $ad - bc$:\n$$\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc$$\n\nFor $A_3 = \\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$: $\\det(A_3) = 3(3) - 4(2) = 9 - 8 = 1$.\n\nAlso: $\\det(A_2) = 3(12-5) - 2(6-0) + 1(5-0) = 21 - 12 + 5 = 14$.',
      keyTerms: [],
      exercise: {
        prompt: 'What is $\\det(A_3)$ where $A_3 = \\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$?',
        choices: ['$1$', '$-1$', '$17$', '$0$'],
        correctIndex: 0,
        explanation: '$\\det(A_3) = 3(3) - 4(2) = 9 - 8 = 1$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 5: Finding the Inverse',
      body: 'For $2 \\times 2$: swap the diagonal entries, negate the off-diagonal, divide by det:\n$$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$$\n\nFor $A_3$: $A_3^{-1} = \\frac{1}{1}\\begin{bmatrix} 3 & -4 \\\\ -2 & 3 \\end{bmatrix}$.\n\nFor $3 \\times 3$: $A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$ where adj is the transpose of the cofactor matrix.',
      keyTerms: ['adjugate'],
      exercise: {
        prompt: 'What is $A_3^{-1}$?',
        choices: [
          '$\\begin{bmatrix} 3 & -4 \\\\ -2 & 3 \\end{bmatrix}$',
          '$\\begin{bmatrix} 3 & 4 \\\\ 2 & 3 \\end{bmatrix}$',
          '$\\begin{bmatrix} -3 & 4 \\\\ 2 & -3 \\end{bmatrix}$',
          '$\\begin{bmatrix} 3 & -2 \\\\ -4 & 3 \\end{bmatrix}$'
        ],
        correctIndex: 0,
        explanation: 'Swap diagonal (3,3), negate off-diagonal (4→-4, 2→-2), divide by det=1.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'For $A_1$ with $\\det(A_1) = 4$, what is the $(1,1)$ entry of $A_1^{-1}$?',
      choices: ['$5/4$', '$1/4$', '$4$', '$5$'],
      correctIndex: 0,
      explanation: '$A_1^{-1} = \\frac{1}{4}\\text{adj}(A_1)$. The $(1,1)$ entry of adj is $C_{11} = 5$, so the answer is $5/4$.'
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
      title: 'Step 1: The Goal of Row Reduction',
      body: 'Given $A_1 = \\begin{bmatrix} 1 & -1 & -3 & 2 & -6 \\\\ 2 & 3 & -1 & 1 & 6 \\\\ 3 & 7 & 1 & 0 & 18 \\\\ 4 & 6 & -2 & 1 & 13 \\end{bmatrix}$.\n\nREF (Row Echelon Form) requires: leading 1s in a staircase pattern, zeros below each leading 1, zero rows at the bottom.',
      keyTerms: ['REF', 'leading 1'],
      exercise: {
        prompt: 'In REF, what must appear below each leading 1?',
        choices: ['All zeros', 'Any number', 'Only ones', 'The same number'],
        correctIndex: 0,
        explanation: 'REF requires all entries below each leading 1 (pivot) to be zero.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: First Elimination',
      body: 'Use the first pivot $a_{11} = 1$ to eliminate all entries below it in column 1:\n\n$R_2 \\leftarrow R_2 - 2R_1$: $[0,\\; 5,\\; 5,\\; -3,\\; 18]$\n$R_3 \\leftarrow R_3 - 3R_1$: $[0,\\; 10,\\; 10,\\; -6,\\; 36]$\n$R_4 \\leftarrow R_4 - 4R_1$: $[0,\\; 10,\\; 10,\\; -7,\\; 37]$',
      keyTerms: ['pivot', 'eliminate'],
      exercise: {
        prompt: 'After $R_2 \\leftarrow R_2 - 2R_1$, what is the entry in position $(2,2)$?',
        choices: ['$5$', '$3$', '$1$', '$-1$'],
        correctIndex: 0,
        explanation: 'Original $R_2 = [2,3,-1,1,6]$. After subtracting $2 \\times [1,-1,-3,2,-6]$: entry $(2,2) = 3 - 2(-1) = 3 + 2 = 5$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Continue to REF',
      body: 'Now eliminate below the second pivot using $R_2$:\n\n$R_3 \\leftarrow R_3 - 2R_2$: $[0,\\; 0,\\; 0,\\; 0,\\; 0]$ (zero row!)\n$R_4 \\leftarrow R_4 - 2R_2$: $[0,\\; 0,\\; 0,\\; -1,\\; 1]$\n\nSwap $R_3 \\leftrightarrow R_4$ to move the zero row down. Then scale to get leading 1s. The third pivot lands in column 4 (column 3 is skipped — no pivot there).',
      keyTerms: [],
      exercise: {
        prompt: 'After elimination, $R_3$ becomes all zeros. What does a zero row tell us?',
        choices: ['One equation was redundant (dependent on others)', 'The system has no solution', 'There are no free variables', 'The rank equals the number of rows'],
        correctIndex: 0,
        explanation: 'A zero row means one original equation was a linear combination of others — it provides no new information.'
      }
    },
    {
      type: 'example',
      title: 'Step 4: From REF to RREF',
      body: 'RREF additionally requires zeros ABOVE each pivot. Eliminate upward:\n\n$$\\text{RREF of } A_1 = \\begin{bmatrix} 1 & 0 & -2 & 0 & -1 \\\\ 0 & 1 & 1 & 0 & 3 \\\\ 0 & 0 & 0 & 1 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$\n\nPivots are in columns 1, 2, and 4. Columns 3 and 5 are free (no pivot).',
      keyTerms: ['RREF', 'free'],
      exercise: {
        prompt: 'How many pivot columns does $A_1$ have?',
        choices: ['3', '4', '2', '5'],
        correctIndex: 0,
        explanation: 'Pivots appear in columns 1, 2, and 4 — that is 3 pivot columns.'
      }
    },
    {
      type: 'axiom',
      title: 'Step 5: Rank = Number of Pivots',
      body: 'The rank of a matrix equals the number of pivots (leading 1s) in its REF or RREF.\n\nFor $A_1$: 3 pivots → rank = 3. Free variables = $n - \\text{rank} = 5 - 3 = 2$.\n\nFor $A_2$: similarly row reduce to find RREF has 3 pivots → rank$(A_2)$ = 3.',
      keyTerms: ['rank'],
      exercise: {
        prompt: 'What is rank$(A_1)$?',
        choices: ['$3$', '$4$', '$2$', '$5$'],
        correctIndex: 0,
        explanation: 'There are 3 pivots in the RREF, so rank = 3.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'How many free variables does the $4 \\times 5$ matrix $A_1$ have?',
      choices: ['$2$', '$3$', '$1$', '$0$'],
      correctIndex: 0,
      explanation: 'Free variables = n - rank = 5 - 3 = 2 (columns 3 and 5 have no pivot).'
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
      title: 'Step 1: The Three Conditions',
      body: 'A subset $S \\subseteq \\mathbb{R}^n$ is a subspace if and only if:\n\n1. $\\mathbf{0} \\in S$ (contains the zero vector)\n2. $\\mathbf{u}, \\mathbf{v} \\in S \\Rightarrow \\mathbf{u} + \\mathbf{v} \\in S$ (closed under addition)\n3. $\\mathbf{u} \\in S,\\; c \\in \\mathbb{R} \\Rightarrow c\\mathbf{u} \\in S$ (closed under scalar multiplication)\n\nAlways check condition 1 first — it is the easiest way to disprove a subspace.',
      keyTerms: ['zero vector', 'closed'],
      exercise: {
        prompt: 'Which condition is the quickest way to show a set is NOT a subspace?',
        choices: ['Check if the zero vector is in the set', 'Check closure under addition', 'Check closure under scalar multiplication', 'Check if the set is finite'],
        correctIndex: 0,
        explanation: 'If the zero vector is not in the set, it immediately fails — no further checks needed.'
      }
    },
    {
      type: 'example',
      title: 'Step 2: Testing S₁',
      body: '$S_1 = \\{(x, y) : x = 3y\\}$.\n\nZero vector: $x = 3(0) = 0$ ✓ → $(0,0) \\in S_1$.\nAddition: if $x_1 = 3y_1$ and $x_2 = 3y_2$, then $(x_1+x_2) = 3(y_1+y_2)$ ✓.\nScalar: if $x = 3y$, then $cx = 3(cy)$ ✓.\n\n$S_1$ is a subspace! It equals $\\text{span}\\{(3,1)\\}$ — a line through the origin.',
      keyTerms: [],
      exercise: {
        prompt: 'Is $S_1 = \\{(x,y) : x = 3y\\}$ a subspace?',
        choices: ['Yes — passes all three conditions', 'No — does not contain zero', 'No — not closed under addition', 'Cannot determine'],
        correctIndex: 0,
        explanation: 'S₁ contains (0,0), and is closed under addition and scalar multiplication.'
      }
    },
    {
      type: 'example',
      title: 'Step 3: Testing S₃ — The Catch',
      body: '$S_3 = \\{(x, y) : x = -3y + 1\\}$.\n\nZero vector test: plug in $x = 0, y = 0$: $0 = -3(0) + 1 = 1$. FALSE!\n\nSo $(0,0) \\notin S_3$. It fails condition 1 immediately.\n\nGeometrically, $S_3$ is a line in $\\mathbb{R}^2$ that does NOT pass through the origin (it has a constant offset of $+1$). Any set defined by a non-homogeneous equation (constant $\\neq 0$) can never be a subspace.',
      keyTerms: ['zero vector'],
      exercise: {
        prompt: 'Why is $S_3$ NOT a subspace?',
        choices: ['$(0,0) \\notin S_3$ — fails zero vector test', 'It is empty', 'It is not closed under addition', 'It contains only one point'],
        correctIndex: 0,
        explanation: 'Plugging in (0,0): 0 ≠ -3(0)+1 = 1. The zero vector is not in S₃.'
      }
    },
    {
      type: 'example',
      title: 'Step 4: Testing S₂ and S₄',
      body: '$S_2$: $x = 2y$ and $2x = 3y$ → $4y = 3y$ → $y = 0$, $x = 0$. So $S_2 = \\{(0,0)\\}$, the trivial subspace ✓.\n\n$S_4$: $x = 2y$ and $x - 2y + z = 0$ → $z = 0$. So $S_4 = \\{(2t, t, 0) : t \\in \\mathbb{R}\\} = \\text{span}\\{(2,1,0)\\}$ ✓.\n\nKey insight: if you can write a set as a span of vectors, it is automatically a subspace.',
      keyTerms: ['span'],
      exercise: {
        prompt: 'What is $S_4$ equal to?',
        choices: ['$\\text{span}\\{(2, 1, 0)\\}$', '$\\text{span}\\{(1, 2, 0)\\}$', '$\\{(0, 0, 0)\\}$', '$\\mathbb{R}^3$'],
        correctIndex: 0,
        explanation: 'From x = 2y and z = 0: every vector is (2y, y, 0) = y(2,1,0).'
      }
    }
  ],
  exercises: [
    {
      prompt: 'Which of the four sets is NOT a subspace?',
      choices: ['$S_3$ only', '$S_1$ and $S_3$', '$S_2$ and $S_4$', 'All are subspaces'],
      correctIndex: 0,
      explanation: 'Only S₃ fails — the constant +1 means it misses the origin. S₁, S₂, S₄ are all subspaces.'
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
      title: 'Step 1: What Does Independence Mean?',
      body: 'Vectors $\\{v_1, \\ldots, v_k\\}$ are linearly independent if the ONLY way to get zero is the trivial combination:\n$$c_1 v_1 + c_2 v_2 + \\cdots + c_k v_k = \\mathbf{0} \\implies c_1 = c_2 = \\cdots = c_k = 0$$\n\nIf there exists ANY nontrivial combination (some $c_i \\neq 0$) that gives zero, the vectors are dependent.',
      keyTerms: ['linearly independent', 'trivial'],
      exercise: {
        prompt: 'If $3v_1 - 2v_2 + v_3 = \\mathbf{0}$, are $\\{v_1, v_2, v_3\\}$ independent or dependent?',
        choices: ['Dependent — a nontrivial combination gives zero', 'Independent — the coefficients are not all equal', 'Cannot determine', 'Independent — there are 3 vectors'],
        correctIndex: 0,
        explanation: 'The combination 3, -2, 1 is nontrivial (not all zero), so the vectors are dependent.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: Quick Tests',
      body: 'Before doing heavy computation, check these shortcuts:\n\n- If any vector is $\\mathbf{0}$: DEPENDENT (set its coefficient to 1, rest to 0).\n- If one vector is a scalar multiple of another: DEPENDENT.\n- If more vectors than the dimension ($k > n$): DEPENDENT.\n- For $k = n$ vectors in $\\mathbb{R}^n$: check $\\det \\neq 0$.',
      keyTerms: [],
      exercise: {
        prompt: 'Which set is immediately dependent by the zero vector rule?',
        choices: ['$\\{(1,2), (0,0)\\}$', '$\\{(1,2), (3,4)\\}$', '$\\{(1,0), (0,1)\\}$', '$\\{(1,2,3), (4,5,6)\\}$'],
        correctIndex: 0,
        explanation: 'The set contains (0,0), the zero vector. So it is immediately dependent: 0·(1,2) + 1·(0,0) = 0.'
      }
    },
    {
      type: 'example',
      title: 'Step 3: The Determinant Test',
      body: 'Part (a): $\\{(1,2), (1,1)\\}$ — two vectors in $\\mathbb{R}^2$, so use the determinant:\n$$\\det\\begin{bmatrix} 1 & 1 \\\\ 2 & 1 \\end{bmatrix} = 1(1) - 1(2) = -1 \\neq 0$$\n\nIndependent! The determinant being nonzero means neither is a multiple of the other.\n\nPart (d): $\\{(1,2,3), (2,4,6)\\}$ — notice $(2,4,6) = 2(1,2,3)$. Scalar multiple → DEPENDENT.',
      keyTerms: ['determinant'],
      exercise: {
        prompt: 'Are $\\{(1,2), (1,1)\\}$ linearly independent?',
        choices: ['Yes — $\\det = -1 \\neq 0$', 'No — they are proportional', 'No — both have 2 components', 'Yes — both entries are positive'],
        correctIndex: 0,
        explanation: 'det = 1(1) - 1(2) = -1 ≠ 0, so the two vectors are linearly independent.'
      }
    },
    {
      type: 'example',
      title: 'Step 4: Too Many Vectors',
      body: 'Part (c): $\\{(1,2), (1,-2), (14,19)\\}$ — three vectors in $\\mathbb{R}^2$.\n\nSince $k = 3 > n = 2$, they MUST be dependent. You can always express one as a combination of the others.\n\nPart (f): $\\{(1,2,3), (1,0,-1), (-1,4,9)\\}$ — three vectors in $\\mathbb{R}^3$. Compute $\\det = 0$, so dependent. The relation is $-2(1,2,3) + 3(1,0,-1) + (-1,4,9) = \\mathbf{0}$.',
      keyTerms: [],
      exercise: {
        prompt: 'Can 3 vectors in $\\mathbb{R}^2$ ever be linearly independent?',
        choices: ['No — more vectors than dimension guarantees dependence', 'Yes — if they point in different directions', 'Yes — if none is zero', 'It depends on the specific vectors'],
        correctIndex: 0,
        explanation: 'In R^n, any set of more than n vectors must be linearly dependent.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'Part (e): Are $\\{(1,2,3), (1,0,-1)\\}$ linearly independent in $\\mathbb{R}^3$?',
      choices: ['Yes — neither is a scalar multiple of the other', 'No — they have 3 components each', 'No — there are only 2 vectors', 'Yes — their sum is zero'],
      correctIndex: 0,
      explanation: '(1,2,3) ≠ k(1,0,-1) for any k. Two non-proportional vectors in R³ are always independent.'
    }
  ]
},

// ==================== Q5: Independence with Parameter α ====================
{
  id: 'hw1-q5',
  name: 'Q5: Independence with Parameter $\\alpha$',
  formalText: 'For which $\\alpha$ are $u_1, u_2, u_3$ linearly independent in $\\mathbb{R}^3$?',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q5-p', text: 'Independence with alpha' }],
  explanations: [
    {
      type: 'intro',
      title: 'Step 1: Set Up the Determinant',
      body: 'For 3 vectors in $\\mathbb{R}^3$, they are independent iff $\\det \\neq 0$. Form the matrix:\n$$\\det\\begin{bmatrix} \\alpha & -1 & -1 \\\\ -1 & \\alpha & -1 \\\\ -1 & -1 & \\alpha \\end{bmatrix} \\neq 0$$\n\nWe need to compute this determinant as a polynomial in $\\alpha$ and find where it equals zero.',
      keyTerms: ['determinant test'],
      exercise: {
        prompt: 'For $n$ vectors in $\\mathbb{R}^n$, they are independent if and only if:',
        choices: ['The determinant of the matrix they form is nonzero', 'They all have different magnitudes', 'None of them is zero', 'They are pairwise orthogonal'],
        correctIndex: 0,
        explanation: 'For n vectors in R^n: independent ⟺ det ≠ 0.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: Expand the Determinant',
      body: 'Expand along row 1:\n$$\\det = \\alpha(\\alpha^2 - 1) - (-1)(-\\alpha - 1) + (-1)(1 + \\alpha)$$\n$$= \\alpha^3 - \\alpha - (\\alpha + 1) - (1 + \\alpha) = \\alpha^3 - 3\\alpha - 2$$',
      keyTerms: [],
      exercise: {
        prompt: 'What polynomial do we get for the determinant?',
        choices: ['$\\alpha^3 - 3\\alpha - 2$', '$\\alpha^3 - 2\\alpha - 1$', '$\\alpha^3 + 3\\alpha + 2$', '$\\alpha^2 - 3\\alpha - 2$'],
        correctIndex: 0,
        explanation: 'Cofactor expansion gives $\\alpha^3 - 3\\alpha - 2$.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Factor the Polynomial',
      body: 'Try $\\alpha = -1$: $(-1)^3 - 3(-1) - 2 = -1 + 3 - 2 = 0$ ✓. So $(\\alpha + 1)$ is a factor.\n\nDivide: $\\alpha^3 - 3\\alpha - 2 = (\\alpha + 1)(\\alpha^2 - \\alpha - 2) = (\\alpha + 1)(\\alpha - 2)(\\alpha + 1) = (\\alpha + 1)^2(\\alpha - 2)$.\n\nRoots: $\\alpha = -1$ (double root) and $\\alpha = 2$.',
      keyTerms: [],
      exercise: {
        prompt: 'The determinant $(\\alpha + 1)^2(\\alpha - 2) = 0$ when:',
        choices: ['$\\alpha = -1$ or $\\alpha = 2$', '$\\alpha = 1$ or $\\alpha = -2$', '$\\alpha = -1$ only', '$\\alpha = 0$ or $\\alpha = 2$'],
        correctIndex: 0,
        explanation: 'Setting each factor to zero: $\\alpha + 1 = 0 \\Rightarrow \\alpha = -1$, $\\alpha - 2 = 0 \\Rightarrow \\alpha = 2$.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'For $\\alpha = 0$, are $u_1, u_2, u_3$ linearly independent?',
      choices: ['Yes — $\\det = (0+1)^2(0-2) = -2 \\neq 0$', 'No — $\\det = 0$', 'Cannot determine', 'No — $\\alpha$ must be positive'],
      correctIndex: 0,
      explanation: 'At α = 0: det = (1)²(-2) = -2 ≠ 0, so the vectors are independent.'
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
      title: 'Step 1: What Ranks Are Possible?',
      body: '$A$ is a $2 \\times 3$ matrix. The rank can be at most $\\min(2, 3) = 2$.\n\nSince the second row $[1, 1, 1]$ is always nonzero, rank$(A) \\geq 1$.\n\nSo the only possibilities are rank = 1 or rank = 2.',
      keyTerms: ['rank'],
      exercise: {
        prompt: 'Can rank$(A)$ be 0?',
        choices: ['No — row 2 is always $[1,1,1] \\neq \\mathbf{0}$', 'Yes — when $a = b = c = 0$', 'Yes — when the rows cancel', 'No — $A$ is $2 \\times 3$'],
        correctIndex: 0,
        explanation: 'The second row [1,1,1] is never zero, so A always has at least rank 1.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: When Is Rank = 1?',
      body: 'Rank = 1 means only one independent row. Since row 2 is nonzero, row 1 must be a scalar multiple of row 2:\n$$[a, b, c] = k[1, 1, 1] = [k, k, k]$$\n\nThis means $a = b = c$. The two rows are proportional.',
      keyTerms: ['proportional'],
      exercise: {
        prompt: 'If $a = 7, b = 7, c = 7$, what is rank$(A)$?',
        choices: ['$1$ — rows are proportional', '$2$', '$3$', '$0$'],
        correctIndex: 0,
        explanation: 'Row 1 = [7,7,7] = 7·[1,1,1] = 7·Row 2. Proportional rows → rank = 1.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: When Is Rank = 2?',
      body: 'Rank = 2 means the two rows are NOT proportional — at least one entry in row 1 differs from the others.\n\nEquivalently: not all of $a, b, c$ are equal. At least one $2 \\times 2$ minor is nonzero:\n$a - b \\neq 0$, or $b - c \\neq 0$, or $a - c \\neq 0$.',
      keyTerms: [],
      exercise: {
        prompt: 'If $a = 2, b = 3, c = 2$, what is rank$(A)$?',
        choices: ['$2$ — not all values are equal', '$1$ — $a = c$', '$3$', 'Cannot determine'],
        correctIndex: 0,
        explanation: '$b = 3 \\neq a = 2$, so the rows are not proportional. Rank = 2.'
      }
    }
  ],
  exercises: []
},

// ==================== Q7: Rank, Range Space & Null Space ====================
{
  id: 'hw1-q7',
  name: 'Q7: Rank, Range & Null Space',
  formalText: 'Find the rank, range space basis, and null space basis for $A_1, A_2, A_3$.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q7-p', text: 'Range and null space' }],
  explanations: [
    {
      type: 'intro',
      title: 'Step 1: Key Definitions',
      body: 'For an $m \\times n$ matrix $A$:\n- Range (column space) = $\\{Ax : x \\in \\mathbb{R}^n\\}$ — what outputs are possible.\n- Null space = $\\{x : Ax = \\mathbf{0}\\}$ — what inputs map to zero.\n- Rank-Nullity Theorem: $\\text{rank} + \\text{nullity} = n$.',
      keyTerms: ['range', 'null space', 'rank-nullity'],
      exercise: {
        prompt: 'If a $3 \\times 4$ matrix has rank 2, what is its nullity?',
        choices: ['$2$', '$1$', '$3$', '$4$'],
        correctIndex: 0,
        explanation: 'Nullity = n - rank = 4 - 2 = 2.'
      }
    },
    {
      type: 'example',
      title: 'Step 2: Analyzing A₁',
      body: '$A_1 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ is already in REF!\n\nPivots in columns 2 and 3. Rank = 2.\n\nRange basis = pivot columns of $A_1$: $\\{(1,0,0)^T, (0,0,1)^T\\}$.\nNull space: $x_1$ is free, $x_2 = 0, x_3 = 0$ → basis $\\{(1,0,0)^T\\}$.',
      keyTerms: [],
      exercise: {
        prompt: 'What is the rank of $A_1 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$?',
        choices: ['$2$', '$1$', '$3$', '$0$'],
        correctIndex: 0,
        explanation: 'There are 2 nonzero rows with leading entries (pivots in columns 2 and 3). Rank = 2.'
      }
    },
    {
      type: 'example',
      title: 'Step 3: Analyzing A₂ (Full Rank)',
      body: '$A_2 = \\begin{bmatrix} 4 & 1 & -1 \\\\ 3 & 2 & 0 \\\\ 1 & 1 & 0 \\end{bmatrix}$. Row reduce → RREF = $I_3$.\n\nRank = 3 (full rank for a $3 \\times 3$ matrix).\n\nRange = $\\mathbb{R}^3$ (every vector is reachable).\nNull space = $\\{\\mathbf{0}\\}$ (only the trivial solution).\n\nWhen rank = $n$: null space is trivial. When rank = $m$: range is all of $\\mathbb{R}^m$.',
      keyTerms: ['full rank'],
      exercise: {
        prompt: 'If a square matrix has full rank, what is its null space?',
        choices: ['$\\{\\mathbf{0}\\}$ only', '$\\mathbb{R}^n$', 'A line through the origin', 'Empty'],
        correctIndex: 0,
        explanation: 'Full rank means rank = n, so nullity = n - n = 0. Only the zero vector is in the null space.'
      }
    },
    {
      type: 'example',
      title: 'Step 4: Analyzing A₃',
      body: '$A_3 = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & 2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$. RREF = $\\begin{bmatrix} 1 & 0 & -1 & 0 \\\\ 0 & 1 & 2 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$.\n\nPivots: cols 1, 2, 4. Rank = 3. Free variable: $x_3$.\nNull space: $x_1 = x_3, x_2 = -2x_3, x_4 = 0$ → basis $\\{(1, -2, 1, 0)^T\\}$.\nRange basis: pivot cols of original $A_3$ → $\\{(1,0,0)^T, (2,-1,0)^T, (4,2,1)^T\\}$.',
      keyTerms: ['free variable'],
      exercise: {
        prompt: 'What is a basis for the null space of $A_3$?',
        choices: ['$\\{(1, -2, 1, 0)^T\\}$', '$\\{(1, 2, 1, 0)^T\\}$', '$\\{(-1, 2, 1, 0)^T\\}$', '$\\{\\mathbf{0}\\}$'],
        correctIndex: 0,
        explanation: 'From RREF: x₁ = x₃, x₂ = -2x₃, x₄ = 0. Set x₃ = 1 → (1, -2, 1, 0).'
      }
    }
  ],
  exercises: [
    {
      prompt: 'Verify rank-nullity for $A_3$ ($3 \\times 4$): rank + nullity = ?',
      choices: ['$3 + 1 = 4 = n$ ✓', '$3 + 0 = 3$', '$2 + 2 = 4$', '$3 + 2 = 5$'],
      correctIndex: 0,
      explanation: 'Rank = 3, nullity = 1 (one free variable). 3 + 1 = 4 = number of columns. ✓'
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
      title: 'Step 1: The Approach',
      body: 'Given: $v_1 = (1,2,3,4,5)^T$, $v_2 = (-4,3,6,2,1)^T$, $v_3 = (1,0,2,1,3)^T$, $v_4 = (18,-7,-5,3,17)^T$.\n\n$V = \\text{span}\\{v_1, v_2, v_3, v_4\\}$. To find a basis, we need to identify which vectors are independent.\n\nMethod: form $A = [v_1 | v_2 | v_3 | v_4]$ ($5 \\times 4$) and row reduce. Pivot columns correspond to independent vectors.',
      keyTerms: ['span', 'basis'],
      exercise: {
        prompt: 'Why do we row reduce the matrix $[v_1 | v_2 | v_3 | v_4]$?',
        choices: ['To find which vectors are linearly independent', 'To compute the determinant', 'To find eigenvalues', 'To multiply the vectors'],
        correctIndex: 0,
        explanation: 'Row reduction reveals pivot columns (independent vectors) vs. free columns (dependent vectors).'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: Row Reduction Result',
      body: 'After row reducing $A = [v_1 | v_2 | v_3 | v_4]$, we find pivots in columns 1, 2, and 3. Column 4 has no pivot — meaning $v_4$ is a linear combination of $v_1, v_2, v_3$.\n\nRank = 3, so $\\dim(V) = 3$.\n\nA basis for $V$ is $\\{v_1, v_2, v_3\\}$. The fourth vector $v_4$ is redundant.',
      keyTerms: ['dimension'],
      exercise: {
        prompt: 'What is $\\dim(V)$?',
        choices: ['$3$', '$4$', '$5$', '$2$'],
        correctIndex: 0,
        explanation: 'There are 3 pivots in the row-reduced matrix, so dim(V) = 3.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Uniqueness of Basis',
      body: 'Is the basis $\\{v_1, v_2, v_3\\}$ the only possible basis for $V$?\n\nNo! Any 3 linearly independent vectors from $V$ form a valid basis. For example, $\\{v_1, v_2, v_4\\}$ would also work (since $v_4$ is not a combination of just $v_1$ and $v_2$).\n\nWhat IS unique is the dimension: every basis for $V$ has exactly 3 vectors.',
      keyTerms: [],
      exercise: {
        prompt: 'Is the basis for a vector space unique?',
        choices: ['No — but the number of basis vectors (dimension) is unique', 'Yes — there is only one basis', 'No — and the dimension can vary too', 'Yes — pivot columns give the unique basis'],
        correctIndex: 0,
        explanation: 'Different bases are possible, but they all have the same number of vectors (the dimension).'
      }
    }
  ],
  exercises: [
    {
      prompt: 'Why is $v_4$ not part of the basis?',
      choices: ['It is a linear combination of $v_1, v_2, v_3$', 'It has the largest entries', 'It is the zero vector', 'It has 5 components'],
      correctIndex: 0,
      explanation: 'Column 4 has no pivot in the RREF, meaning v₄ depends on the other three vectors.'
    }
  ]
},

// ==================== Q9: Row, Column & Null Spaces ====================
{
  id: 'hw1-q9',
  name: 'Q9: Row, Column & Null Spaces',
  formalText: 'For $A$ ($4 \\times 5$), find bases for the row space, column space, and null space.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q9-p', text: 'Three fundamental subspaces' }],
  explanations: [
    {
      type: 'intro',
      title: 'Step 1: Computing the RREF',
      body: '$A = \\begin{bmatrix} 1&2&5&1&0 \\\\ -1&-1&-4&1&1 \\\\ 0&-1&-1&-1&0 \\\\ 1&2&5&0&-1 \\end{bmatrix}$. Row reduce:\n\n$R_2 + R_1$, $R_4 - R_1$, $R_3 + R_2\'$, $R_4\' + R_3\'$ → RREF:\n$$\\begin{bmatrix} 1&0&3&0&1 \\\\ 0&1&1&0&-1 \\\\ 0&0&0&1&1 \\\\ 0&0&0&0&0 \\end{bmatrix}$$\n\nPivot columns: 1, 2, 4. Free columns: 3, 5.',
      keyTerms: ['RREF', 'pivot columns'],
      exercise: {
        prompt: 'Which columns are the pivot columns?',
        choices: ['Columns 1, 2, and 4', 'Columns 1, 2, and 3', 'Columns 3 and 5', 'Columns 1, 3, and 5'],
        correctIndex: 0,
        explanation: 'The leading 1s in the RREF are in columns 1, 2, and 4.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: Row Space',
      body: 'The row space basis comes from the nonzero rows of the RREF:\n\n$\\{(1,0,3,0,1),\\; (0,1,1,0,-1),\\; (0,0,0,1,1)\\}$\n\nImportant: use RREF rows (not original rows) because row operations preserve the row space but give a cleaner basis.',
      keyTerms: ['row space'],
      exercise: {
        prompt: 'Where do we read the row space basis from?',
        choices: ['Nonzero rows of the RREF', 'Columns of the RREF', 'Original rows of $A$', 'The null space'],
        correctIndex: 0,
        explanation: 'The nonzero rows of the RREF form a basis for the row space.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Column Space',
      body: 'The column space basis comes from the pivot columns of the ORIGINAL matrix $A$ (not the RREF!):\n\nPivot columns are 1, 2, 4, so the basis is:\n$\\left\\{\\begin{pmatrix}1\\\\-1\\\\0\\\\1\\end{pmatrix}, \\begin{pmatrix}2\\\\-1\\\\-1\\\\2\\end{pmatrix}, \\begin{pmatrix}1\\\\1\\\\-1\\\\0\\end{pmatrix}\\right\\}$',
      keyTerms: ['column space'],
      exercise: {
        prompt: 'For the column space basis, we use pivot columns of:',
        choices: ['The ORIGINAL matrix $A$', 'The RREF', 'The transpose $A^T$', 'Any row-equivalent matrix'],
        correctIndex: 0,
        explanation: 'RREF tells us WHICH columns are pivots, but the actual basis vectors come from the original matrix.'
      }
    },
    {
      type: 'concept',
      title: 'Step 4: Null Space',
      body: 'From RREF, express pivot variables in terms of free variables ($x_3, x_5$):\n$x_1 = -3x_3 - x_5$, $x_2 = -x_3 + x_5$, $x_4 = -x_5$.\n\nSet $x_3 = 1, x_5 = 0$: $(-3,-1,1,0,0)^T$.\nSet $x_3 = 0, x_5 = 1$: $(-1,1,0,-1,1)^T$.\n\nNull space basis: $\\{(-3,-1,1,0,0)^T, (-1,1,0,-1,1)^T\\}$. Nullity = 2.',
      keyTerms: ['null space', 'nullity'],
      exercise: {
        prompt: 'What is the nullity of $A$?',
        choices: ['$2$', '$3$', '$1$', '$0$'],
        correctIndex: 0,
        explanation: 'There are 2 free variables (columns 3 and 5), so nullity = 2. Check: rank + nullity = 3 + 2 = 5 = n.'
      }
    },
    {
      type: 'concept',
      title: 'Step 5: Solvability of Ax = b',
      body: '$Ax = b$ is solvable iff $b$ is in the column space of $A$.\n\nFor $b = (1,1,1,1)^T$: augment and row reduce. Last row becomes $[0,0,0,0,0,3]$ — contradiction! Not solvable.\n\nThe solvability condition is $b_2 + b_3 + b_4 = 0$ (the row dependency from elimination).',
      keyTerms: ['solvable'],
      exercise: {
        prompt: 'Is $Ax = b$ solvable for $b = (1,1,1,1)^T$?',
        choices: ['No — row reduction gives $0 = 3$, a contradiction', 'Yes — $A$ has rank 3', 'Yes — $b$ has 4 entries', 'No — $A$ is not square'],
        correctIndex: 0,
        explanation: 'Check: $b_2 + b_3 + b_4 = 1 + 1 + 1 = 3 \\neq 0$. The system is inconsistent.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'For which $b = (b_1, b_2, b_3, b_4)^T$ is $Ax = b$ solvable?',
      choices: ['All $b$ with $b_2 + b_3 + b_4 = 0$', 'All $b \\in \\mathbb{R}^4$', 'Only $b = \\mathbf{0}$', 'All $b$ with $b_1 = 0$'],
      correctIndex: 0,
      explanation: 'The row operations reveal a dependency: the system is consistent iff $b_2 + b_3 + b_4 = 0$.'
    }
  ]
},

// ==================== Q10: General Solution ====================
{
  id: 'hw1-q10',
  name: 'Q10: General Solution',
  formalText: 'Find the particular solution, null space, general solution, and minimum-norm solution.',
  _topicId: 'hw1',
  _backRoute: 'homework',
  atomicParts: [{ id: 'hw1-q10-p', text: 'General solution' }],
  explanations: [
    {
      type: 'intro',
      title: 'Step 1: The General Solution Formula',
      body: 'For $Ax = b$, the general solution is:\n$$x = x_p + x_h$$\nwhere $x_p$ is any one particular solution, and $x_h$ is the general solution to $Ax = \\mathbf{0}$ (the null space).\n\nGiven: $A = \\begin{bmatrix} 1&2&3&4 \\\\ 0&-1&-2&2 \\\\ 0&0&0&1 \\end{bmatrix}$, $b = \\begin{bmatrix} 3\\\\2\\\\1 \\end{bmatrix}$.',
      keyTerms: ['particular solution', 'general solution'],
      exercise: {
        prompt: 'The general solution $x = x_p + x_h$ means every solution is:',
        choices: ['One fixed solution plus any vector in the null space', 'The average of all solutions', 'The unique solution', 'The zero vector plus $b$'],
        correctIndex: 0,
        explanation: 'x_p is one particular solution, and adding any null space vector gives another valid solution.'
      }
    },
    {
      type: 'concept',
      title: 'Step 2: RREF and Free Variables',
      body: 'Row reduce $[A | b]$ to RREF:\n$$\\begin{bmatrix} 1&0&-1&0&-1 \\\\ 0&1&2&0&0 \\\\ 0&0&0&1&1 \\end{bmatrix}$$\n\nPivots: columns 1, 2, 4. Free variable: $x_3$.\nRead off: $x_1 = -1 + x_3$, $x_2 = -2x_3$, $x_4 = 1$.',
      keyTerms: ['RREF', 'free variable'],
      exercise: {
        prompt: 'How many free variables does this system have?',
        choices: ['$1$ ($x_3$ is free)', '$2$', '$0$', '$3$'],
        correctIndex: 0,
        explanation: 'Pivots in columns 1, 2, 4. Column 3 has no pivot, so x₃ is the only free variable.'
      }
    },
    {
      type: 'concept',
      title: 'Step 3: Particular Solution',
      body: 'Set all free variables to 0. With $x_3 = 0$:\n$x_1 = -1, x_2 = 0, x_3 = 0, x_4 = 1$.\n\n$$x_p = \\begin{pmatrix} -1 \\\\ 0 \\\\ 0 \\\\ 1 \\end{pmatrix}$$\n\nVerify: $Ax_p = \\begin{bmatrix} 1(−1)+2(0)+3(0)+4(1) \\\\ 0(−1)−1(0)−2(0)+2(1) \\\\ 0(−1)+0(0)+0(0)+1(1) \\end{bmatrix} = \\begin{bmatrix} 3\\\\2\\\\1 \\end{bmatrix} = b$ ✓',
      keyTerms: [],
      exercise: {
        prompt: 'What is a particular solution $x_p$?',
        choices: ['$(-1, 0, 0, 1)^T$', '$(0, 0, 0, 0)^T$', '$(1, -2, 1, 0)^T$', '$(3, 2, 1, 0)^T$'],
        correctIndex: 0,
        explanation: 'Set x₃ = 0: x₁ = -1, x₂ = 0, x₄ = 1.'
      }
    },
    {
      type: 'concept',
      title: 'Step 4: Null Space',
      body: 'For $Ax = \\mathbf{0}$: same RREF but with $b = \\mathbf{0}$.\n$x_1 = x_3, x_2 = -2x_3, x_4 = 0$.\n\nSet $x_3 = 1$: null space basis = $\\{(1, -2, 1, 0)^T\\}$.\n\nGeneral solution:\n$$x = \\begin{pmatrix}-1\\\\0\\\\0\\\\1\\end{pmatrix} + t\\begin{pmatrix}1\\\\-2\\\\1\\\\0\\end{pmatrix}, \\quad t \\in \\mathbb{R}$$',
      keyTerms: ['null space'],
      exercise: {
        prompt: 'A basis for the null space of $A$ is:',
        choices: ['$\\{(1, -2, 1, 0)^T\\}$', '$\\{(-1, 0, 0, 1)^T\\}$', '$\\{(1, 2, 1, 0)^T\\}$', '$\\{(0, 0, 0, 0)^T\\}$'],
        correctIndex: 0,
        explanation: 'From Ax = 0: x₁ = x₃, x₂ = -2x₃, x₄ = 0. Set x₃ = 1 → (1,-2,1,0).'
      }
    },
    {
      type: 'concept',
      title: 'Step 5: Minimum Norm Solution',
      body: 'Among all solutions $x = (-1+t, -2t, t, 1)^T$, find the one with smallest $\\|x\\|$.\n\n$\\|x\\|^2 = (-1+t)^2 + 4t^2 + t^2 + 1 = 6t^2 - 2t + 2$.\n\nMinimize: $\\frac{d}{dt}(6t^2 - 2t + 2) = 12t - 2 = 0 \\Rightarrow t = \\frac{1}{6}$.\n\nMinimum norm solution: $x = (-\\frac{5}{6}, -\\frac{1}{3}, \\frac{1}{6}, 1)^T$.',
      keyTerms: ['minimum norm'],
      exercise: {
        prompt: 'What value of $t$ gives the smallest norm?',
        choices: ['$t = 1/6$', '$t = 0$', '$t = 1$', '$t = -1/6$'],
        correctIndex: 0,
        explanation: 'Set derivative 12t - 2 = 0, giving t = 1/6.'
      }
    }
  ],
  exercises: [
    {
      prompt: 'Is $Ax = b$ solvable for ALL $b \\in \\mathbb{R}^3$?',
      choices: ['Yes — rank = 3 = number of rows', 'No — $A$ is not square', 'No — there are free variables', 'Only when $b = \\mathbf{0}$'],
      correctIndex: 0,
      explanation: 'When rank equals the number of rows (3 = 3), the system is consistent for every b in R³.'
    }
  ]
}

    ] // end questions array
  } // end hw1
}; // end HomeworkData
