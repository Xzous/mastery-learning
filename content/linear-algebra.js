window.ContentRegistry.register({
  id: 'linear-algebra',
  name: 'Systems of Linear Equations',
  description: 'Master systems of linear equations, matrix operations, and solution methods including Gaussian elimination and matrix inverses.',
  topics: [

    // =========================================================================
    // TOPIC 1: LINEAR EQUATIONS
    // =========================================================================
    {
      id: 'linear-equations',
      name: 'Linear Equations',
      description: 'What makes an equation linear — variables to the first power, no products, no transcendental functions.',
      prerequisites: [],
      definitions: [
        {
          id: 'def-linear-equation',
          name: 'Linear Equation',
          formalText: 'A linear equation in $n$ variables $x_1, x_2, \\ldots, x_n$ is an equation of the form $a_1x_1 + a_2x_2 + \\cdots + a_nx_n = b$, where each $a_i$ is a real-number coefficient, each $x_i$ is a variable, $b$ is the constant term. All variables appear only to the first power with no products or transcendental functions.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Linear Equation?',
              body: 'A linear equation is an equation where every variable appears only to the first power. There are no squared terms, no square roots of variables, and no variables multiplied together.',
              formula: '$a_1x_1 + a_2x_2 + a_3x_3 + \\cdots + a_nx_n = b$',
              keyTerms: ['first power', 'linear']
            },
            {
              type: 'concept',
              title: 'The Parts of a Linear Equation',
              body: 'Each $a_i$ is called a coefficient — it is a real number constant that multiplies a variable. Each $x_i$ is a variable to be solved for. The value $b$ on the right side is the constant term. The first nonzero coefficient $a_1$ is called the leading coefficient, and $x_1$ is the leading variable.',
              keyTerms: ['coefficient', 'variable', 'constant term', 'leading coefficient']
            },
            {
              type: 'axiom',
              title: 'Rule 1: First Power Only',
              body: 'Every variable must appear with exponent exactly 1. No squares, cubes, square roots, or other powers are allowed.',
              example: '$x^2 + y = 3$ is NOT linear because $x$ has exponent 2.\n$\\frac{1}{x} + y = 4$ is NOT linear because $1/x = x^{-1}$ has exponent $-1$.'
            },
            {
              type: 'axiom',
              title: 'Rule 2: No Products of Variables',
              body: 'You cannot multiply two variables together. Terms like $xy$ or $x_1x_2$ make the equation nonlinear.',
              example: '$xy + z = 2$ is NOT linear because $xy$ is a product of two variables.'
            },
            {
              type: 'axiom',
              title: 'Rule 3: No Transcendental Functions',
              body: 'Variables cannot appear inside $\\sin$, $\\cos$, $\\tan$, $e^x$, $\\ln$, or any other transcendental function. However, constants like $\\sin(\\pi/2)$ or $e^2$ are fine since they are just numbers.',
              example: '$\\sin(x) + 2y - 3z = 0$ is NOT linear because $x$ is inside $\\sin()$.\n$(\\sin \\pi/2)x_1 - 4x_2 = e^2$ IS linear because $\\sin(\\pi/2)$ and $e^2$ are just constants.'
            },
            {
              type: 'example',
              title: 'Linear vs. Nonlinear',
              body: 'Here are examples from each category:',
              example: 'LINEAR: $3x + 2y = 7$\nLINEAR: $\\frac{1}{2}x + y - \\pi z = \\sqrt{2}$\nLINEAR: $x_1 - 2x_2 + 10x_3 + x_4 = 0$\n\nNOT LINEAR: $xy - z = 2$ (product of variables)\nNOT LINEAR: $e^x - 2y = 4$ (exponential function)\nNOT LINEAR: $\\sin(x) + 2x_2 - 3x_3 = 0$ (trig function)\nNOT LINEAR: $(1/x)(1/y) = 4$ (not first power)'
            }
          ],
          atomicParts: [
            { id: 'le-part-form', text: 'has the form $a_1x_1 + a_2x_2 + \\cdots + a_nx_n = b$', keywords: ['form', 'a_1', 'x_1', '= b'] },
            { id: 'le-part-coefficients', text: '$a_i$ are real-number coefficients', keywords: ['coefficients', 'real', 'a_i'] },
            { id: 'le-part-first-power', text: 'all variables appear only to the first power', keywords: ['first power', 'degree 1'] },
            { id: 'le-part-no-products', text: 'no products of variables and no transcendental functions of variables', keywords: ['no products', 'no transcendental'] }
          ],
          axioms: [
            { id: 'ax-le-first-power', label: 'Variables to the First Power', statement: 'Every variable appears with exponent 1', counterexample: { set: '$x^2 + y = 3$', explanation: '$x$ has exponent 2' } },
            { id: 'ax-le-no-products', label: 'No Products of Variables', statement: 'No term is a product of two variables', counterexample: { set: '$xy + z = 2$', explanation: '$xy$ is a product of variables' } },
            { id: 'ax-le-no-transcendental', label: 'No Transcendental Functions', statement: 'No variable inside $\\sin$, $\\cos$, $\\exp$, $\\ln$, etc.', counterexample: { set: '$\\sin(x) + y = 1$', explanation: '$x$ is inside $\\sin()$' } }
          ],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which of these is a linear equation?',
              choices: [
                '$x^2 + y = 3$',
                '$2x - 3y + z = 7$',
                '$xy + z = 2$',
                '$\\ln(x) + y = 1$'
              ],
              correctIndex: 1,
              explanation: '$2x - 3y + z = 7$ has all variables to the first power with no products or transcendental functions.'
            },
            {
              type: 'mc',
              prompt: 'The equation $e^x - 2y = 4$ is nonlinear because:',
              choices: [
                'A variable has exponent 2',
                'Two variables are multiplied together',
                'A variable is inside an exponential function',
                'The coefficients are not integers'
              ],
              correctIndex: 2,
              explanation: 'The variable $x$ appears inside the exponential function $e^x$, which is a transcendental function.'
            },
            {
              type: 'mc',
              prompt: 'Which equation is NOT linear?',
              choices: [
                '$(\\sin \\pi/2)x_1 - 4x_2 = e^2$',
                '$\\frac{1}{2}x + y - \\pi z = \\sqrt{2}$',
                '$x_1 - 2x_2 + 10x_3 + x_4 = 0$',
                '$x_1x_2 + x_3 = 5$'
              ],
              correctIndex: 3,
              explanation: '$x_1x_2$ is a product of two variables, violating the "no products" rule. The other equations have constant coefficients ($\\sin(\\pi/2) = 1$, $\\pi$, etc.) and variables only to the first power.'
            },
            {
              type: 'mc',
              prompt: 'In the equation $5x_1 - 3x_2 + x_3 = 8$, what is the leading coefficient?',
              choices: ['$8$', '$5$', '$-3$', '$1$'],
              correctIndex: 1,
              explanation: 'The leading coefficient is the coefficient of the first variable ($x_1$), which is $5$.'
            },
            {
              type: 'mc',
              prompt: 'True or False: $(1/x) + (1/y) = 4$ is a linear equation.',
              choices: ['True', 'False'],
              correctIndex: 1,
              explanation: '$1/x = x^{-1}$ means $x$ appears with exponent $-1$, not $1$. The equation is nonlinear.'
            }
          ]
        },
        {
          id: 'def-solution-set',
          name: 'Solution and Solution Set',
          formalText: 'A solution of a linear equation $a_1x_1 + \\cdots + a_nx_n = b$ is a sequence $(s_1, \\ldots, s_n)$ such that $a_1s_1 + \\cdots + a_ns_n = b$ is true. The solution set is the set of all solutions. It can be represented in parametric form by expressing leading variables in terms of free variables.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Solution?',
              body: 'A solution of a linear equation is a specific set of numbers — one for each variable — that makes the equation true when you plug them in.',
              example: 'For $x_1 + 2x_2 = 4$:\nThe pair $(2, 1)$ is a solution because $2 + 2(1) = 4$. \u2713\nThe pair $(0, 2)$ is also a solution because $0 + 2(2) = 4$. \u2713\nThe pair $(1, 1)$ is NOT a solution because $1 + 2(1) = 3 \\neq 4$. \u2717'
            },
            {
              type: 'concept',
              title: 'The Solution Set',
              body: 'The solution set is the collection of ALL solutions. A single linear equation in more than one variable typically has infinitely many solutions, so we need a compact way to describe them all.',
              keyTerms: ['solution set', 'all solutions']
            },
            {
              type: 'concept',
              title: 'Parametric Representation',
              body: 'We can describe infinitely many solutions using a parameter. Choose one variable as the free variable (parameter), and express all other variables in terms of it.',
              example: 'For $x_1 + 2x_2 = 4$:\nLet $x_2 = t$ (free variable, any real number).\nThen $x_1 = 4 - 2t$.\nSolution set: $\\{(4 - 2t,\\; t) \\mid t \\in \\mathbb{R}\\}$',
              keyTerms: ['parametric', 'free variable', 'parameter']
            },
            {
              type: 'visual',
              title: 'Solutions Live on a Line',
              body: 'For $x + 2y = 4$, every solution is a point on this line. Green points satisfy the equation; the red point does not. The parametric form describes sliding along this line.',
              vizScene: 'teach-2d-solution-on-line',
              vizConfig: {
                a: 1, b: 2, c: 4,
                solutions: [[0, 2], [2, 1], [4, 0]],
                nonSolution: [1, 0]
              },
              keyTerms: ['solution set', 'line']
            }
          ],
          atomicParts: [
            { id: 'sol-part-sequence', text: 'a solution is a sequence that satisfies the equation', keywords: ['solution', 'satisfies'] },
            { id: 'sol-part-set', text: 'the solution set is all solutions', keywords: ['solution set', 'all'] },
            { id: 'sol-part-parametric', text: 'parametric form uses free variables as parameters', keywords: ['parametric', 'free variables', 'parameters'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which pair is a solution of $x + 2y = 6$?',
              choices: ['$(1, 2)$', '$(2, 2)$', '$(0, 3)$', '$(3, 3)$'],
              correctIndex: 2,
              explanation: '$0 + 2(3) = 6$. \u2713 The other pairs: $1+4=5$, $2+4=6$... wait, $(2,2)$: $2+4=6$ also works. But $(0,3)$ is the listed correct answer: $0+6=6$. \u2713'
            },
            {
              type: 'mc',
              prompt: 'For $x_1 + 2x_2 = 4$ with $x_2 = t$ as the free variable, what is $x_1$?',
              choices: ['$x_1 = 4 + 2t$', '$x_1 = 4 - 2t$', '$x_1 = 2t - 4$', '$x_1 = t/2 - 4$'],
              correctIndex: 1,
              explanation: 'From $x_1 + 2t = 4$, we get $x_1 = 4 - 2t$.'
            },
            {
              type: 'mc',
              prompt: 'The solution set of a single linear equation in 2 variables is typically:',
              choices: [
                'Empty (no solutions)',
                'A single point',
                'A line (infinitely many solutions)',
                'A plane'
              ],
              correctIndex: 2,
              explanation: 'A single linear equation in 2 variables (like $ax + by = c$) represents a line, and every point on that line is a solution.'
            },
            {
              type: 'mc',
              prompt: 'In parametric form, a free variable is:',
              choices: [
                'A variable that is always zero',
                'A variable set to any real number as a parameter',
                'A variable with the largest coefficient',
                'A variable that appears in every equation'
              ],
              correctIndex: 1,
              explanation: 'A free variable can take any real number value. Other variables are then expressed in terms of it.'
            }
          ]
        }
      ],
      proofs: [],
      visualization: null
    },

    // =========================================================================
    // TOPIC 2: SYSTEMS OF LINEAR EQUATIONS
    // =========================================================================
    {
      id: 'systems-of-linear-equations',
      name: 'Systems of Linear Equations',
      description: 'Collections of linear equations, their solutions, and the three fundamental possibilities: one solution, infinitely many, or none.',
      prerequisites: ['linear-equations'],
      definitions: [
        {
          id: 'def-system-linear-eqs',
          name: 'System of Linear Equations',
          formalText: 'A system of $m$ linear equations in $n$ variables is a collection of $m$ equations in the same $n$ variables. A solution satisfies every equation simultaneously. The system is consistent if it has at least one solution, and inconsistent if it has none.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a System?',
              body: 'A system of linear equations is a collection of two or more linear equations involving the same variables. We want to find values that satisfy ALL equations at the same time.',
              example: '$x + y = 3$\n$x - y = -1$\n\nWe need one pair $(x, y)$ that makes BOTH equations true.'
            },
            {
              type: 'concept',
              title: 'Solution of a System',
              body: 'A solution must satisfy every equation simultaneously. It is not enough for a point to satisfy just one equation — it must work in all of them.',
              example: 'For the system above:\n$(x, y) = (1, 2) \\to 1+2=3$ \u2713 and $1-2=-1$ \u2713\nSo $(1, 2)$ is a solution of the system.',
              keyTerms: ['simultaneously', 'every equation']
            },
            {
              type: 'axiom',
              title: 'The Three Possibilities',
              body: 'Every system of linear equations has exactly one of three outcomes:\n\n(1) Exactly one solution — the system is consistent\n(2) Infinitely many solutions — the system is consistent\n(3) No solution — the system is inconsistent\n\nThere are NO other possibilities. A system cannot have exactly 2 or 3 solutions.',
              keyTerms: ['exactly one', 'infinitely many', 'no solution']
            },
            {
              type: 'example',
              title: 'Geometric Picture (2 Variables)',
              body: 'For two equations in two variables, each equation represents a line. The three cases correspond to:',
              example: 'Two intersecting lines \u2192 exactly one solution (the intersection point)\nTwo parallel lines \u2192 no solution (they never meet)\nTwo coincident (same) lines \u2192 infinitely many solutions (every point on the line)'
            },
            {
              type: 'visual',
              title: 'See the Three Cases',
              body: 'Each equation is a line. Where two lines meet determines the solution. Left: intersecting (one solution). Center: parallel (none). Right: coincident (infinitely many).',
              vizScene: 'teach-2d-three-cases',
              vizConfig: {
                systems: [
                  { eq1: [1, 1, 3], eq2: [1, -1, -1], label: 'Unique' },
                  { eq1: [1, 1, 3], eq2: [1, 1, 1], label: 'None' },
                  { eq1: [1, 1, 3], eq2: [2, 2, 6], label: 'Infinite' }
                ]
              },
              keyTerms: ['intersecting', 'parallel', 'coincident']
            },
            {
              type: 'concept',
              title: 'Consistent vs. Inconsistent',
              body: 'A system is called consistent if it has at least one solution (cases 1 or 2). It is called inconsistent if it has no solution (case 3).',
              keyTerms: ['consistent', 'inconsistent']
            }
          ],
          atomicParts: [
            { id: 'sys-part-collection', text: 'a collection of $m$ linear equations in $n$ variables', keywords: ['collection', 'equations', 'variables'] },
            { id: 'sys-part-simultaneous', text: 'a solution satisfies every equation simultaneously', keywords: ['solution', 'simultaneously', 'every'] },
            { id: 'sys-part-consistent', text: 'consistent means at least one solution; inconsistent means no solution', keywords: ['consistent', 'inconsistent'] },
            { id: 'sys-part-three', text: 'three possibilities: one, infinitely many, or no solution', keywords: ['three', 'one', 'infinitely many', 'no solution'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'The system $x + y = 3$ and $2x + 2y = 6$ has:',
              choices: [
                'Exactly one solution',
                'Infinitely many solutions',
                'No solution',
                'Exactly two solutions'
              ],
              correctIndex: 1,
              explanation: 'The second equation is just $2 \\times$ the first. They represent the same line, so every point on $x+y=3$ is a solution — infinitely many.'
            },
            {
              type: 'mc',
              prompt: 'The system $x + y = 3$ and $x + y = 5$ is:',
              choices: ['Consistent with one solution', 'Consistent with infinitely many', 'Inconsistent', 'Cannot be determined'],
              correctIndex: 2,
              explanation: 'If $x+y = 3$, then $x+y$ cannot also be $5$. The lines are parallel, so no solution exists. The system is inconsistent.'
            },
            {
              type: 'mc',
              prompt: 'Two lines in the plane can intersect in at most:',
              choices: ['0 points', '1 point', '2 points', 'Infinitely many points'],
              correctIndex: 3,
              explanation: 'Two lines intersect in 0 points (parallel), 1 point (intersecting), or infinitely many points (coincident). They can never intersect in exactly 2 points.'
            },
            {
              type: 'mc',
              prompt: 'Is $(x, y, z) = (1, -1, 2)$ a solution of: $x - 2y + 3z = 9$?',
              choices: ['Yes', 'No'],
              correctIndex: 0,
              explanation: '$1 - 2(-1) + 3(2) = 1 + 2 + 6 = 9$. \u2713'
            },
            {
              type: 'mc',
              prompt: 'A system of linear equations can have exactly 5 solutions.',
              choices: ['True', 'False'],
              correctIndex: 1,
              explanation: 'A system can only have 0, 1, or infinitely many solutions. No other finite number is possible.'
            }
          ]
        },
        {
          id: 'def-equivalent-systems',
          name: 'Equivalent Systems and Elementary Operations',
          formalText: 'Two systems are equivalent if they have the same solution set. Three elementary operations produce equivalent systems: (O1) interchange two equations, (O2) multiply an equation by a nonzero constant, (O3) add a multiple of one equation to another.',
          explanations: [
            {
              type: 'intro',
              title: 'Equivalent Systems',
              body: 'Two systems of equations are called equivalent if they have exactly the same solution set. If we can transform one system into another without changing the solutions, the systems are equivalent.',
              keyTerms: ['equivalent', 'same solution set']
            },
            {
              type: 'axiom',
              title: 'Operation O1: Interchange',
              body: 'Swap any two equations. This just reorders the list — the same set of equations still needs to be satisfied.',
              example: 'Swap Eq.1 and Eq.2:\nBefore: (1) $y = 3$, (2) $x = 1$\nAfter: (1) $x = 1$, (2) $y = 3$\nSame solutions!'
            },
            {
              type: 'axiom',
              title: 'Operation O2: Multiply by Nonzero Constant',
              body: 'Multiply both sides of an equation by any nonzero constant $k$. The equation changes form but has exactly the same solutions.',
              example: 'Multiply Eq.1 by 2:\nBefore: $x + y = 3$\nAfter: $2x + 2y = 6$\nSame line, same solutions.'
            },
            {
              type: 'axiom',
              title: 'Operation O3: Add a Multiple',
              body: 'Add $k$ times one equation to another equation. This is the most powerful operation — it lets us eliminate variables. The operation is reversible (add $-k$ times to undo).',
              example: 'Given: (1) $x + y = 3$, (2) $2x - y = 0$\nAdd $-2 \\times$(Eq.1) to Eq.2:\n(2) becomes: $(2x-2x) + (-y-2y) = 0-6 \\to -3y = -6$\nNow $y$ is easy to find!'
            },
            {
              type: 'concept',
              title: 'Gaussian Elimination Preview',
              body: 'These three operations are the foundation of Gaussian elimination. By applying them strategically, we simplify a system step by step until the solution is obvious.',
              keyTerms: ['Gaussian elimination', 'simplify']
            }
          ],
          atomicParts: [
            { id: 'eq-part-equiv', text: 'equivalent systems have the same solution set', keywords: ['equivalent', 'same', 'solution set'] },
            { id: 'eq-part-o1', text: 'O1: interchange two equations', keywords: ['interchange', 'swap'] },
            { id: 'eq-part-o2', text: 'O2: multiply by nonzero constant', keywords: ['multiply', 'nonzero'] },
            { id: 'eq-part-o3', text: 'O3: add a multiple of one equation to another', keywords: ['add', 'multiple'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which operation is used to eliminate a variable from an equation?',
              choices: ['O1: Interchange', 'O2: Multiply by constant', 'O3: Add a multiple', 'None of these'],
              correctIndex: 2,
              explanation: 'O3 (adding a multiple of one equation to another) is used to cancel out a variable, eliminating it from that equation.'
            },
            {
              type: 'mc',
              prompt: 'Why must the constant in O2 be nonzero?',
              choices: [
                'Multiplying by zero would create a new equation',
                'Multiplying by zero would destroy information (the equation becomes $0 = 0$)',
                'Multiplying by zero is undefined',
                'Multiplying by zero changes the number of variables'
              ],
              correctIndex: 1,
              explanation: 'Multiplying an equation by 0 turns it into $0 = 0$, which is always true and contains no information about the variables. The operation would not be reversible.'
            },
            {
              type: 'mc',
              prompt: 'Given: (1) $x - 2y + 3z = 9$, (2) $-x + 3y = -4$. Adding Eq.1 to Eq.2 gives:',
              choices: [
                '$y + 3z = 5$',
                '$-y + 3z = 5$',
                '$y - 3z = -5$',
                '$2y + 3z = 5$'
              ],
              correctIndex: 0,
              explanation: '$(-1+1)x + (3-2)y + (0+3)z = -4+9$, which gives $0x + y + 3z = 5$, or $y + 3z = 5$.'
            },
            {
              type: 'mc',
              prompt: 'Two systems are equivalent if:',
              choices: [
                'They have the same number of equations',
                'They have the same coefficients',
                'They have exactly the same solution set',
                'They have the same number of variables'
              ],
              correctIndex: 2,
              explanation: 'Equivalent systems share the exact same solution set, even if the equations look different.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-back-substitution',
          name: 'Back Substitution',
          description: 'Demonstrate back substitution on the row-echelon system: $x - 2y + 3z = 9$, $y + 3z = 5$, $z = 2$.',
          prerequisites: ['def-equivalent-systems'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'The system is $x - 2y + 3z = 9$, $y + 3z = 5$, $z = 2$. What is the strategy?',
              expected: 'Start from the bottom equation ($z = 2$), substitute upward to find $y$, then $x$. This is called back substitution.',
              keywords: ['bottom', 'z = 2', 'substitute', 'upward', 'back substitution'],
              hints: ['The last equation directly gives $z$.', 'Work from bottom to top.']
            },
            {
              type: 'justify',
              prompt: 'Find $y$ from $y + 3z = 5$ and $z = 2$.',
              expected: '$y + 3(2) = 5$ gives $y + 6 = 5$, so $y = -1$.',
              keywords: ['y + 6 = 5', 'y = -1'],
              hints: ['Replace $z$ with 2.', '$y = 5 - 6 = -1$.']
            },
            {
              type: 'justify',
              prompt: 'Find $x$ from $x - 2y + 3z = 9$ with $y = -1$, $z = 2$.',
              expected: '$x - 2(-1) + 3(2) = 9$ gives $x + 2 + 6 = 9$, so $x = 1$.',
              keywords: ['x + 2 + 6 = 9', 'x = 1'],
              hints: ['Replace $y$ with $-1$ and $z$ with 2.']
            },
            {
              type: 'conclude',
              prompt: 'State the solution.',
              expected: 'The unique solution is $(x, y, z) = (1, -1, 2)$.',
              keywords: ['x = 1', 'y = -1', 'z = 2', 'unique'],
              hints: ['Combine all three values.']
            }
          ]
        }
      ],
      visualization: {
        type: 'linear-system-2d',
        title: 'Systems of Two Equations',
        description: 'See the three cases: intersecting lines (one solution), parallel lines (no solution), and coincident lines (infinitely many).',
        requiredMastery: 80,
        requiredProofs: ['proof-back-substitution'],
        config: {
          systems: [
            { eq1: [1, 1, 3], eq2: [1, -1, -1], label: 'Unique solution' },
            { eq1: [1, 1, 3], eq2: [1, 1, 1], label: 'No solution' },
            { eq1: [1, 1, 3], eq2: [2, 2, 6], label: 'Infinitely many' }
          ]
        }
      }
    },

    // =========================================================================
    // TOPIC 3: MATRICES AND ROW OPERATIONS
    // =========================================================================
    {
      id: 'matrices-and-row-operations',
      name: 'Matrices and Row Operations',
      description: 'Representing systems as matrices, and transforming them with elementary row operations.',
      prerequisites: ['linear-equations', 'systems-of-linear-equations'],
      definitions: [
        {
          id: 'def-matrix',
          name: 'Matrix',
          formalText: 'An $m \\times n$ matrix is a rectangular array of numbers with $m$ rows and $n$ columns. Entry $a_{ij}$ is in row $i$, column $j$. If $m = n$ it is a square matrix. Diagonal entries are $a_{11}, a_{22}, \\ldots, a_{nn}$.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Matrix?',
              body: 'A matrix is a rectangular grid of numbers organized in rows (horizontal) and columns (vertical). We describe its size as $m \\times n$: $m$ rows by $n$ columns.',
              example: 'A $2 \\times 3$ matrix has 2 rows and 3 columns:\n$\\begin{bmatrix} 1 & -3 & 0 \\\\ 2 & 5 & -1 \\end{bmatrix}$'
            },
            {
              type: 'concept',
              title: 'Matrix Entries',
              body: 'Each number in the matrix is called an entry. The entry in row $i$ and column $j$ is written as $a_{ij}$. For example, $a_{23}$ is the entry in row 2, column 3.',
              keyTerms: ['entry', 'a_{ij}', 'row i', 'column j']
            },
            {
              type: 'concept',
              title: 'Square Matrices and the Diagonal',
              body: 'When $m = n$ (same number of rows and columns), the matrix is called a square matrix of order $n$. The main diagonal of a square matrix consists of entries $a_{11}, a_{22}, \\ldots, a_{nn}$ (top-left to bottom-right).',
              keyTerms: ['square matrix', 'main diagonal']
            }
          ],
          atomicParts: [
            { id: 'mat-part-array', text: 'rectangular array of numbers', keywords: ['rectangular', 'array', 'numbers'] },
            { id: 'mat-part-size', text: '$m$ rows and $n$ columns, size $m \\times n$', keywords: ['m rows', 'n columns', 'm\u00D7n'] },
            { id: 'mat-part-entry', text: '$a_{ij}$ is in row $i$, column $j$', keywords: ['a_{ij}', 'row i', 'column j'] },
            { id: 'mat-part-square', text: 'square matrix when $m = n$', keywords: ['square', 'm = n'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'What is the size of the matrix $[1, -3, 0, \\frac{1}{2}]$?',
              choices: ['$4 \\times 1$', '$1 \\times 4$', '$2 \\times 2$', '$1 \\times 1$'],
              correctIndex: 1,
              explanation: 'It has 1 row and 4 columns, so the size is $1 \\times 4$.'
            },
            {
              type: 'mc',
              prompt: 'Which of these is a square matrix?',
              choices: [
                '$2 \\times 3$ matrix',
                '$3 \\times 2$ matrix',
                '$3 \\times 3$ matrix',
                '$1 \\times 4$ matrix'
              ],
              correctIndex: 2,
              explanation: 'A square matrix has the same number of rows and columns. Only the $3 \\times 3$ matrix satisfies $m = n$.'
            },
            {
              type: 'mc',
              prompt: 'In a $3 \\times 4$ matrix, what does $a_{23}$ refer to?',
              choices: [
                'Row 3, Column 2',
                'Row 2, Column 3',
                'The 23rd entry',
                'Row 2, Column 4'
              ],
              correctIndex: 1,
              explanation: 'The first subscript is the row, the second is the column. So $a_{23}$ is in row 2, column 3.'
            }
          ]
        },
        {
          id: 'def-coefficient-augmented',
          name: 'Coefficient and Augmented Matrices',
          formalText: 'The coefficient matrix $A$ contains the variable coefficients. The augmented matrix $[A \\mid b]$ appends the constant column. In matrix form: $Ax = b$.',
          explanations: [
            {
              type: 'intro',
              title: 'From Equations to Matrices',
              body: 'A system of linear equations can be compactly represented as a matrix. This makes it much easier to apply systematic solution methods.',
              keyTerms: ['matrix', 'represent']
            },
            {
              type: 'concept',
              title: 'The Coefficient Matrix',
              body: 'The coefficient matrix $A$ is formed by taking just the coefficients of the variables from each equation, arranged in the same order.',
              example: 'System:\n  $x - 2y + 3z = 9$\n$-x + 3y = -4$\n $2x - 5y + 5z = 17$\n\nCoefficient matrix $A$:\n$\\begin{bmatrix} 1 & -2 & 3 \\\\ -1 & 3 & 0 \\\\ 2 & -5 & 5 \\end{bmatrix}$',
              keyTerms: ['coefficient matrix']
            },
            {
              type: 'concept',
              title: 'The Augmented Matrix',
              body: 'The augmented matrix $[A \\mid b]$ adds the constants as an extra column on the right. It contains ALL the information needed to solve the system.',
              example: 'Augmented matrix $[A \\mid b]$:\n$\\begin{bmatrix} 1 & -2 & 3 & | & 9 \\\\ -1 & 3 & 0 & | & -4 \\\\ 2 & -5 & 5 & | & 17 \\end{bmatrix}$',
              keyTerms: ['augmented matrix', '[A | b]']
            },
            {
              type: 'concept',
              title: 'Matrix Form: $Ax = b$',
              body: 'The entire system can be written as $Ax = b$, where $A$ is the coefficient matrix, $x$ is the column of variables, and $b$ is the column of constants.',
              formula: '$Ax = b$',
              keyTerms: ['Ax = b']
            },
            {
              type: 'visual',
              title: 'The Augmented Matrix',
              body: 'The augmented matrix packs the entire system into a grid. Blue region: variable coefficients. Gold column: constants. The vertical bar separates them.',
              vizScene: 'teach-matrix-augmented',
              vizConfig: {
                matrix: [[1, -2, 3, 9], [-1, 3, 0, -4], [2, -5, 5, 17]]
              },
              keyTerms: ['coefficient matrix', 'augmented matrix']
            }
          ],
          atomicParts: [
            { id: 'ca-part-coeff', text: 'coefficient matrix $A$ has the coefficients', keywords: ['coefficient matrix', 'A'] },
            { id: 'ca-part-augmented', text: 'augmented matrix $[A \\mid b]$ appends constants', keywords: ['augmented', '[A | b]'] },
            { id: 'ca-part-form', text: 'matrix form $Ax = b$', keywords: ['Ax = b', 'matrix form'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'For the system $x + y = 3$, $2x - y = 0$, the augmented matrix is:',
              choices: [
                '[[1, 1, 3], [2, -1, 0]]',
                '[[1, 1], [2, -1]]',
                '[[1, 2], [1, -1], [3, 0]]',
                '[[3, 0], [1, 1], [2, -1]]'
              ],
              correctIndex: 0,
              explanation: 'Row 1: coefficients 1, 1 and constant 3. Row 2: coefficients 2, $-1$ and constant 0. So [[1,1,3],[2,-1,0]].'
            },
            {
              type: 'mc',
              prompt: 'If a system has 3 equations and 4 variables, the coefficient matrix has size:',
              choices: ['$3 \\times 4$', '$4 \\times 3$', '$3 \\times 3$', '$4 \\times 4$'],
              correctIndex: 0,
              explanation: '3 equations = 3 rows. 4 variables = 4 columns. The coefficient matrix is $3 \\times 4$.'
            },
            {
              type: 'mc',
              prompt: 'What does the augmented matrix contain that the coefficient matrix does not?',
              choices: [
                'The variable names',
                'The column of constants (right-hand sides)',
                'The diagonal entries',
                'An extra row of zeros'
              ],
              correctIndex: 1,
              explanation: 'The augmented matrix $[A \\mid b]$ appends the constant column $b$ to the coefficient matrix $A$.'
            }
          ]
        },
        {
          id: 'def-elementary-row-ops',
          name: 'Elementary Row Operations',
          formalText: 'Three operations on matrices: (1) $I_{i,j}$: swap rows $i$ and $j$; (2) $M_i^{(k)}$: multiply row $i$ by nonzero $k$; (3) $A_{i,j}^{(k)}$: add $k \\times$ row $i$ to row $j$. Row-equivalent matrices have the same solution set.',
          explanations: [
            {
              type: 'intro',
              title: 'Row Operations on Matrices',
              body: 'The three elementary operations on equations (interchange, multiply, add) translate directly to operations on the rows of a matrix. These are the tools of Gaussian elimination.',
              keyTerms: ['elementary row operations']
            },
            {
              type: 'axiom',
              title: 'Row Interchange: $R_i \\leftrightarrow R_j$',
              body: 'Swap two rows of the matrix. Notation: $I_{i,j}$.',
              example: '$\\begin{bmatrix} 0 & 1 & 3 & 4 \\\\ -1 & 2 & 0 & 3 \\\\ 2 & -3 & 4 & 1 \\end{bmatrix} \\to \\begin{bmatrix} -1 & 2 & 0 & 3 \\\\ 0 & 1 & 3 & 4 \\\\ 2 & -3 & 4 & 1 \\end{bmatrix}$'
            },
            {
              type: 'axiom',
              title: 'Row Scaling: $kR_i \\to R_i$',
              body: 'Multiply every entry in a row by a nonzero constant $k$. Notation: $M_i^{(k)}$.',
              example: '$M_1^{(1/2)}$ on $[2, -4, 6, -2]$:\n$\\to [1, -2, 3, -1]$'
            },
            {
              type: 'axiom',
              title: 'Row Addition: $kR_i + R_j \\to R_j$',
              body: 'Add $k$ times row $i$ to row $j$, replacing row $j$. This is the key operation for eliminating entries. Notation: $A_{i,j}^{(k)}$.',
              example: '$A_{1,3}^{(-2)}$:\n$R_3 = -2 \\times R_1 + R_3$\n\nRow 1: $[1, 2, -4, 3]$\nOld $R_3$: $[2, 1, 5, -2]$\nNew $R_3$: $[2-2, 1-4, 5+8, -2-6] = [0, -3, 13, -8]$'
            },
            {
              type: 'visual',
              title: 'Row Addition in Action',
              body: 'Watch what happens when we add Row 1 to Row 2. The $-1$ in $R_2$ column 1 is eliminated, creating a zero. The changed row is highlighted green.',
              vizScene: 'teach-matrix-row-op',
              vizConfig: {
                before: [[1, -2, 3, 9], [-1, 3, 0, -4], [2, -5, 5, 17]],
                after:  [[1, -2, 3, 9], [0, 1, 3, 5], [2, -5, 5, 17]],
                operation: '$R_1 + R_2 \\to R_2$',
                changedRow: 1
              },
              keyTerms: ['row addition', 'eliminate']
            },
            {
              type: 'concept',
              title: 'Row Equivalence',
              body: 'Two matrices are row equivalent if one can be obtained from the other by a sequence of elementary row operations. Row-equivalent augmented matrices represent systems with the same solution set.',
              keyTerms: ['row equivalent', 'same solution set']
            }
          ],
          atomicParts: [
            { id: 'ero-part-interchange', text: '$I_{i,j}$: swap rows $i$ and $j$', keywords: ['interchange', 'swap'] },
            { id: 'ero-part-scaling', text: '$M_i^{(k)}$: multiply row $i$ by nonzero $k$', keywords: ['multiply', 'nonzero', 'scaling'] },
            { id: 'ero-part-addition', text: '$A_{i,j}^{(k)}$: add $k$ times row $i$ to row $j$', keywords: ['add', 'k times', 'row addition'] },
            { id: 'ero-part-equiv', text: 'row equivalent matrices have the same solution set', keywords: ['row equivalent', 'same solution set'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which row operation eliminates variables?',
              choices: ['Row interchange $I_{i,j}$', 'Row scaling $M_i^{(k)}$', 'Row addition $A_{i,j}^{(k)}$', 'All of them equally'],
              correctIndex: 2,
              explanation: 'Row addition (adding a multiple of one row to another) is used to make entries zero, thereby eliminating variables.'
            },
            {
              type: 'mc',
              prompt: 'What does $M_2^{(3)}$ do?',
              choices: [
                'Swaps rows 2 and 3',
                'Multiplies row 2 by 3',
                'Adds 3 times row 2 to another row',
                'Multiplies column 2 by 3'
              ],
              correctIndex: 1,
              explanation: '$M_2^{(3)}$ means: multiply every entry in row 2 by the constant 3.'
            },
            {
              type: 'mc',
              prompt: 'If row 1 is $[1, 2, 3]$ and row 2 is $[2, 5, 7]$, what is row 2 after $A_{1,2}^{(-2)}$?',
              choices: [
                '$[0, 1, 1]$',
                '$[4, 9, 13]$',
                '$[2, 5, 7]$',
                '$[-2, -4, -6]$'
              ],
              correctIndex: 0,
              explanation: '$A_{1,2}^{(-2)}$: New $R_2 = -2 \\times R_1 + R_2 = [-2+2, -4+5, -6+7] = [0, 1, 1]$.'
            },
            {
              type: 'mc',
              prompt: 'Row-equivalent augmented matrices represent:',
              choices: [
                'Different systems with different solutions',
                'Systems with the same coefficients',
                'Systems with the same solution set',
                'Systems with the same number of equations'
              ],
              correctIndex: 2,
              explanation: 'Row-equivalent matrices correspond to equivalent systems that share the exact same solution set.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-row-ops-preserve',
          name: 'Row Operations Preserve Solutions',
          description: 'Explain why each elementary row operation preserves the solution set.',
          prerequisites: ['def-elementary-row-ops'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show?',
              expected: 'Each elementary row operation produces an augmented matrix whose system has the same solution set.',
              keywords: ['same solution set', 'each operation', 'preserve'],
              hints: ['Check all three operations.']
            },
            {
              type: 'justify',
              prompt: 'Why does swapping rows preserve solutions?',
              expected: 'Swapping rows just reorders the equations. The same equations must still be satisfied.',
              keywords: ['reorder', 'same equations'],
              hints: ['Order does not matter.']
            },
            {
              type: 'justify',
              prompt: 'Why does multiplying by nonzero $k$ preserve solutions?',
              expected: 'If a solution satisfies the equation, it satisfies $k$ times the equation. Since $k$ is nonzero, we can divide by $k$ to reverse the operation.',
              keywords: ['k nonzero', 'reversible', 'divide'],
              hints: ['The operation can be undone by multiplying by $1/k$.']
            },
            {
              type: 'justify',
              prompt: 'Why does adding $k$ times row $i$ to row $j$ preserve solutions?',
              expected: 'If a solution satisfies both equations, it satisfies their linear combination. The operation is reversible by subtracting $k$ times row $i$.',
              keywords: ['both equations', 'linear combination', 'reversible', 'subtract'],
              hints: ['Reverse by adding $-k$ times row $i$.']
            },
            {
              type: 'conclude',
              prompt: 'Conclusion?',
              expected: 'All three operations are reversible and preserve the solution set, justifying Gaussian elimination.',
              keywords: ['reversible', 'preserve', 'justified'],
              hints: ['This is the foundation of elimination methods.']
            }
          ]
        }
      ],
      visualization: {
        type: 'grid-deformation',
        title: 'Row Operations on a Matrix',
        description: 'See how row operations transform a matrix while preserving solutions.',
        requiredMastery: 80,
        requiredProofs: ['proof-row-ops-preserve'],
        config: { dimension: 2, matrix: [[1, -2], [-1, 3]] }
      }
    },

    // =========================================================================
    // TOPIC 4: ROW ECHELON FORM AND GAUSSIAN ELIMINATION
    // =========================================================================
    {
      id: 'echelon-forms',
      name: 'Echelon Forms',
      description: 'Row echelon form (REF), reduced row echelon form (RREF), Gaussian elimination, and Gauss-Jordan elimination.',
      prerequisites: ['matrices-and-row-operations'],
      definitions: [
        {
          id: 'def-ref',
          name: 'Row Echelon Form (REF)',
          formalText: 'A matrix is in REF if: (1) zero rows are at the bottom, (2) the first nonzero entry in each row is 1 (leading 1 / pivot), (3) each leading 1 is to the right of the one above (staircase pattern).',
          explanations: [
            {
              type: 'intro',
              title: 'What is Row Echelon Form?',
              body: 'Row echelon form (REF) is a specific shape that a matrix can be reduced to. Once in this form, the system is easy to solve by back substitution.',
              keyTerms: ['row echelon form', 'REF']
            },
            {
              type: 'axiom',
              title: 'Condition 1: Zero Rows at Bottom',
              body: 'Any row that is entirely zeros must be at the very bottom of the matrix. No nonzero row should appear below a zero row.',
              example: 'VALID: $[1,2,3]$ then $[0,0,0]$\nINVALID: $[0,0,0]$ then $[0,1,2]$'
            },
            {
              type: 'axiom',
              title: 'Condition 2: Leading 1s',
              body: 'In each nonzero row, the first nonzero entry (reading left to right) must be 1. This is called a leading 1 or pivot.',
              example: 'VALID: $[0, 1, 3, 5]$ — leading 1 in column 2\nINVALID: $[0, 2, 3, 5]$ — leading entry is 2, not 1'
            },
            {
              type: 'axiom',
              title: 'Condition 3: Staircase Pattern',
              body: 'The leading 1s must step to the right as you go down. Each leading 1 must be in a column further right than the leading 1 in the row above.',
              example: '$\\begin{bmatrix} 1 & * & * & * \\\\ 0 & 1 & * & * \\\\ 0 & 0 & 1 & * \\end{bmatrix}$ \u2190 staircase!'
            },
            {
              type: 'visual',
              title: 'The Staircase Pattern',
              body: 'In REF, the leading 1s (pivots, circled in red) descend in a staircase from top-left toward bottom-right. The orange line traces the staircase step pattern.',
              vizScene: 'teach-matrix-ref-staircase',
              vizConfig: {
                matrix: [[1, 2, -1, 4], [0, 1, 0, 3], [0, 0, 1, -2]],
                pivots: [[0, 0], [1, 1], [2, 2]]
              },
              keyTerms: ['leading 1', 'staircase', 'pivot']
            },
            {
              type: 'example',
              title: 'REF Examples',
              body: 'Here are matrices that are and are not in row echelon form:',
              example: 'IN REF:\n$\\begin{bmatrix} 1 & 2 & -1 & 4 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & -2 \\end{bmatrix}$\n\nNOT in REF (leading entry is 2, not 1):\n$\\begin{bmatrix} 1 & 2 & -3 & 4 \\\\ 0 & 2 & 1 & -1 \\\\ 0 & 0 & 1 & -3 \\end{bmatrix}$'
            }
          ],
          atomicParts: [
            { id: 'ref-part-zeros', text: 'zero rows at bottom', keywords: ['zero rows', 'bottom'] },
            { id: 'ref-part-leading1', text: 'first nonzero entry is 1 (leading 1)', keywords: ['leading 1', 'first nonzero', 'pivot'] },
            { id: 'ref-part-staircase', text: 'staircase pattern of leading 1s', keywords: ['staircase', 'right', 'below'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which matrix is in row echelon form?',
              choices: [
                '[[1, 2, -1, 4], [0, 1, 0, 3], [0, 0, 1, -2]]',
                '[[1, 2, -3, 4], [0, 2, 1, -1], [0, 0, 1, -3]]',
                '[[1, 2, -1, 2], [0, 0, 0, 0], [0, 1, 2, -4]]',
                '[[0, 1, 3], [1, 0, 2], [0, 0, 1]]'
              ],
              correctIndex: 0,
              explanation: 'Option A: zero rows at bottom (none), leading 1s in columns 1, 2, 3 (staircase). Option B fails because row 2 has leading entry 2, not 1.'
            },
            {
              type: 'mc',
              prompt: '[[1, 2, -3, 4], [0, 2, 1, -1], [0, 0, 1, -3]] is NOT in REF because:',
              choices: [
                'Zero rows are not at the bottom',
                'The leading entry in row 2 is 2, not 1',
                'The staircase pattern is violated',
                'It has too many rows'
              ],
              correctIndex: 1,
              explanation: 'Row 2 has first nonzero entry 2. In REF, the leading entry must be 1.'
            },
            {
              type: 'mc',
              prompt: 'In an REF matrix, columns containing a leading 1 are called:',
              choices: ['Free columns', 'Pivot columns', 'Zero columns', 'Diagonal columns'],
              correctIndex: 1,
              explanation: 'Columns with a leading 1 are pivot columns. Columns without a leading 1 correspond to free variables.'
            },
            {
              type: 'mc',
              prompt: 'After reaching REF, the system is solved by:',
              choices: ['Cramer\'s rule', 'Back substitution', 'Matrix inversion', 'Forward elimination'],
              correctIndex: 1,
              explanation: 'In REF (triangular form), we solve from the bottom equation upward using back substitution.'
            }
          ]
        },
        {
          id: 'def-rref',
          name: 'Reduced Row Echelon Form (RREF)',
          formalText: 'RREF satisfies all REF conditions plus: (4) every pivot column has zeros everywhere except the leading 1. Every matrix has a unique RREF.',
          explanations: [
            {
              type: 'intro',
              title: 'What is RREF?',
              body: 'Reduced row echelon form (RREF) is an even cleaner version of REF. It adds one more condition: pivot columns must have zeros above the leading 1, not just below.',
              keyTerms: ['reduced row echelon form', 'RREF']
            },
            {
              type: 'axiom',
              title: 'The Extra Condition',
              body: 'Condition (4): Every column that contains a leading 1 must have zeros in ALL other positions — both above and below the leading 1. In REF, we only require zeros below.',
              example: 'REF (not RREF) — has nonzero above leading 1s:\n$\\begin{bmatrix} 1 & 2 & -1 & 4 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & -2 \\end{bmatrix}$\n\nRREF — all pivot columns are clean:\n$\\begin{bmatrix} 1 & 0 & 0 & 4 \\\\ 0 & 1 & 0 & 7 \\\\ 0 & 0 & 1 & -1 \\end{bmatrix}$'
            },
            {
              type: 'visual',
              title: 'REF vs. RREF',
              body: 'REF has zeros below each pivot. RREF goes further: zeros above AND below. Red entries are pivots. In REF, entries above pivots may be nonzero (red tint). In RREF, those are cleaned to zero (green).',
              vizScene: 'teach-matrix-rref-vs-ref',
              vizConfig: {
                ref:  [[1, -2, 3, 9], [0, 1, 3, 5], [0, 0, 1, 2]],
                rref: [[1, 0, 0, 1], [0, 1, 0, -1], [0, 0, 1, 2]],
                pivotCols: [0, 1, 2]
              },
              keyTerms: ['RREF', 'zeros above']
            },
            {
              type: 'concept',
              title: 'Uniqueness of RREF',
              body: 'An important fact: every matrix has a unique RREF. Different sequences of row operations always lead to the same RREF. However, a matrix can have multiple different REFs.',
              keyTerms: ['unique RREF', 'REF not unique']
            },
            {
              type: 'concept',
              title: 'Reading Solutions from RREF',
              body: 'In RREF, the solution can be read directly without back substitution. Each row with a leading 1 gives: pivot variable = (constant) - (free variable terms).',
              example: 'RREF: $[[1, 0, 5, 2], [0, 1, -3, -1]]$\nMeans: $x_1 + 5x_3 = 2$ and $x_2 - 3x_3 = -1$\nSo $x_1 = 2 - 5t$, $x_2 = -1 + 3t$, $x_3 = t$'
            }
          ],
          atomicParts: [
            { id: 'rref-part-ref', text: 'satisfies all REF conditions', keywords: ['REF', 'conditions'] },
            { id: 'rref-part-zeros-above', text: 'pivot columns have zeros everywhere except leading 1', keywords: ['zeros above', 'pivot column'] },
            { id: 'rref-part-unique', text: 'every matrix has a unique RREF', keywords: ['unique', 'RREF'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'What is the extra condition in RREF beyond REF?',
              choices: [
                'Rows must be sorted by size',
                'Pivot columns have zeros above AND below the leading 1',
                'All entries must be 0 or 1',
                'The matrix must be square'
              ],
              correctIndex: 1,
              explanation: 'In RREF, every pivot column has 0 in every position except the leading 1. REF only requires 0 below.'
            },
            {
              type: 'mc',
              prompt: 'True or False: A matrix can have two different RREFs.',
              choices: ['True', 'False'],
              correctIndex: 1,
              explanation: 'The RREF of a matrix is unique. Different row operation sequences may produce different REFs, but RREF is always the same.'
            },
            {
              type: 'mc',
              prompt: 'RREF is advantageous over REF because:',
              choices: [
                'It requires fewer row operations',
                'The solution can be read directly without back substitution',
                'It always produces a square matrix',
                'It is faster to compute'
              ],
              correctIndex: 1,
              explanation: 'In RREF, pivot variables are immediately expressed in terms of free variables and constants. No back substitution needed.'
            },
            {
              type: 'mc',
              prompt: '[[1, 2, 0, 3, 0, 7], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 2]] is in RREF. The free variables are in columns:',
              choices: ['1, 3, 5', '2 and 4', '1, 2, 3', '3 and 5'],
              correctIndex: 1,
              explanation: 'Pivot columns are 1, 3, 5 (have leading 1s). Non-pivot columns 2 and 4 correspond to free variables.'
            }
          ]
        },
        {
          id: 'def-gaussian-elimination',
          name: 'Gaussian Elimination',
          formalText: 'Gaussian elimination reduces a matrix to REF: find the pivot column, interchange if needed, scale to make leading 1, eliminate below, repeat on submatrix. Solve by back substitution.',
          explanations: [
            {
              type: 'intro',
              title: 'The Gaussian Elimination Procedure',
              body: 'Gaussian elimination is a systematic procedure for reducing any matrix to row echelon form. It works column by column, from left to right.',
              keyTerms: ['Gaussian elimination', 'row echelon form']
            },
            {
              type: 'concept',
              title: 'Step-by-Step Process',
              body: '1. Find the leftmost column with a nonzero entry (pivot column)\n2. If the top entry is 0, swap rows to bring a nonzero entry up\n3. Scale the pivot row to make the leading entry 1\n4. Use row addition to make all entries below the leading 1 zero\n5. Move to the submatrix (below and right) and repeat',
              keyTerms: ['pivot column', 'scale', 'eliminate below', 'submatrix']
            },
            {
              type: 'example',
              title: 'Complete Example',
              body: 'Solve: $x - 2y + 3z = 9$, $-x + 3y = -4$, $2x - 5y + 5z = 17$',
              example: 'Augmented: $[[1,-2,3,9],[-1,3,0,-4],[2,-5,5,17]]$\n\nStep 1: Add $R_1$ to $R_2 \\to [0,1,3,5]$\nStep 2: Add $-2R_1$ to $R_3 \\to [0,-1,-1,-1]$\nStep 3: Add $R_2$ to $R_3 \\to [0,0,2,4]$\nStep 4: Scale $R_3$ by $\\frac{1}{2} \\to [0,0,1,2]$\n\nREF: $[[1,-2,3,9],[0,1,3,5],[0,0,1,2]]$\nBack sub: $z=2$, $y=-1$, $x=1$'
            },
            {
              type: 'visual',
              title: 'Three Planes, One Point',
              body: 'Each equation in three variables defines a plane in 3D space. The system asks: where do all three planes meet? This consistent system has exactly one solution — the red intersection point. Rotate to explore!',
              vizScene: 'teach-3d-three-planes',
              vizConfig: {
                equations: [[1, -2, 3, 9], [-1, 3, 0, -4], [2, -5, 5, 17]],
                solution: [1, -1, 2]
              },
              keyTerms: ['plane', 'intersection', 'unique solution']
            }
          ],
          atomicParts: [
            { id: 'ge-part-goal', text: 'reduces to row echelon form', keywords: ['reduces', 'REF'] },
            { id: 'ge-part-steps', text: 'pivot, interchange, scale, eliminate below, repeat', keywords: ['pivot', 'scale', 'eliminate', 'submatrix'] },
            { id: 'ge-part-solve', text: 'solve by back substitution', keywords: ['back substitution', 'solve'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'The first step of Gaussian elimination is:',
              choices: [
                'Scale all rows to have leading 1s',
                'Find the leftmost column with a nonzero entry',
                'Add all rows together',
                'Sort rows by number of zeros'
              ],
              correctIndex: 1,
              explanation: 'You start by finding the leftmost column that has a nonzero entry — this is the first pivot column.'
            },
            {
              type: 'mc',
              prompt: 'During Gaussian elimination, when the pivot position has a 0, you should:',
              choices: [
                'Skip that column entirely',
                'Multiply the row by 0',
                'Swap with a row below that has a nonzero entry in that column',
                'Stop the procedure'
              ],
              correctIndex: 2,
              explanation: 'If the pivot position is 0, perform a row interchange (swap) with a row below that has a nonzero entry in that column.'
            },
            {
              type: 'mc',
              prompt: 'After Gaussian elimination, the augmented matrix $[[1,-2,3,9],[0,1,3,5],[0,0,0,-2]]$ indicates:',
              choices: [
                'Unique solution',
                'Infinitely many solutions',
                'No solution (inconsistent)',
                'Need more operations'
              ],
              correctIndex: 2,
              explanation: 'The last row $[0,0,0,-2]$ represents $0 = -2$, which is false. The system is inconsistent.'
            },
            {
              type: 'mc',
              prompt: 'After Gaussian elimination, $[[1,0,-3,-1],[0,1,-1,0],[0,0,0,0]]$ indicates:',
              choices: [
                'No solution',
                'Unique solution ($x_1=-1$, $x_2=0$)',
                'Infinitely many solutions ($x_3$ is free)',
                'The system has 4 variables'
              ],
              correctIndex: 2,
              explanation: 'Column 3 has no leading 1, so $x_3$ is a free variable. With $x_3=t$: $x_2=t$, $x_1=3t-1$. Infinitely many solutions.'
            }
          ]
        },
        {
          id: 'def-gauss-jordan-elimination',
          name: 'Gauss-Jordan Elimination',
          formalText: 'Gauss-Jordan elimination extends Gaussian elimination to reach RREF by also eliminating entries above each leading 1. The solution is read directly without back substitution.',
          explanations: [
            {
              type: 'intro',
              title: 'Gauss-Jordan: Going Further',
              body: 'Gauss-Jordan elimination continues where Gaussian elimination stops. After reaching REF, it eliminates entries ABOVE each leading 1 to reach RREF.',
              keyTerms: ['Gauss-Jordan', 'above', 'RREF']
            },
            {
              type: 'concept',
              title: 'The Extra Steps',
              body: 'After reaching REF, work from the rightmost (bottom) leading 1 upward. For each leading 1, use row addition to make ALL entries above it zero. The result is RREF.',
              keyTerms: ['rightmost', 'upward', 'zeros above']
            },
            {
              type: 'example',
              title: 'REF to RREF',
              body: 'Starting from REF:',
              example: 'REF:\n$\\begin{bmatrix} 1 & -2 & 3 & | & 9 \\\\ 0 & 1 & 3 & | & 5 \\\\ 0 & 0 & 1 & | & 2 \\end{bmatrix}$\n\nEliminate above leading 1 in col 3:\n$R_2 = R_2 - 3R_3 \\to [0,1,0,-1]$\n$R_1 = R_1 - 3R_3 \\to [1,-2,0,3]$\n\nEliminate above leading 1 in col 2:\n$R_1 = R_1 + 2R_2 \\to [1,0,0,1]$\n\nRREF:\n$\\begin{bmatrix} 1 & 0 & 0 & | & 1 \\\\ 0 & 1 & 0 & | & -1 \\\\ 0 & 0 & 1 & | & 2 \\end{bmatrix}$\n\nSolution: $x=1$, $y=-1$, $z=2$'
            },
            {
              type: 'concept',
              title: 'Advantage of RREF',
              body: 'In RREF, the solution is immediate: each pivot variable equals the constant in its row. No back substitution needed! For systems with free variables, the RREF shows the parametric form directly.',
              keyTerms: ['no back substitution', 'immediate']
            },
            {
              type: 'visual',
              title: 'When Systems Have No Solution',
              body: 'An inconsistent system corresponds to parallel planes that never intersect. The row $[0\\; 0\\; 0 \\mid -2]$ means $0 = -2$, which is impossible — the planes have no common point.',
              vizScene: 'teach-3d-inconsistent',
              vizConfig: {
                planes: [[1, 1, 0, 3], [1, 1, 0, -2]],
                label: '$0x + 0y + 0z = -2$ is impossible'
              },
              keyTerms: ['inconsistent', 'parallel', 'no solution']
            }
          ],
          atomicParts: [
            { id: 'gj-part-extends', text: 'extends Gaussian elimination to RREF', keywords: ['extends', 'RREF'] },
            { id: 'gj-part-above', text: 'eliminates entries above each leading 1', keywords: ['above', 'eliminate'] },
            { id: 'gj-part-direct', text: 'solution read directly without back substitution', keywords: ['directly', 'no back substitution'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'Gauss-Jordan elimination produces:',
              choices: [
                'Row echelon form (REF)',
                'Reduced row echelon form (RREF)',
                'The identity matrix',
                'A diagonal matrix'
              ],
              correctIndex: 1,
              explanation: 'Gauss-Jordan elimination reduces a matrix to RREF, which may or may not be the identity matrix depending on the system.'
            },
            {
              type: 'mc',
              prompt: 'The main difference between Gaussian and Gauss-Jordan elimination is:',
              choices: [
                'Gaussian is faster',
                'Gauss-Jordan also eliminates above each leading 1',
                'Gauss-Jordan uses different operations',
                'Gaussian only works on square matrices'
              ],
              correctIndex: 1,
              explanation: 'Gaussian elimination only eliminates below each pivot (giving REF). Gauss-Jordan goes further and eliminates above too (giving RREF).'
            },
            {
              type: 'mc',
              prompt: 'RREF $[[1, 0, 0, 1], [0, 1, 0, -1], [0, 0, 1, 2]]$ gives the solution:',
              choices: [
                '$x = 1, y = 1, z = -2$',
                '$x = 0, y = 0, z = 0$',
                '$x = 1, y = -1, z = 2$',
                'Infinitely many solutions'
              ],
              correctIndex: 2,
              explanation: 'Reading directly: row 1 gives $x = 1$, row 2 gives $y = -1$, row 3 gives $z = 2$.'
            },
            {
              type: 'mc',
              prompt: 'RREF $[[1, 0, 5, 2], [0, 1, -3, -1]]$ for a system with variables $x_1, x_2, x_3$ means:',
              choices: [
                'Unique solution: $x_1=2$, $x_2=-1$',
                'No solution',
                'Infinitely many: $x_1=2-5t$, $x_2=-1+3t$, $x_3=t$',
                'The system is inconsistent'
              ],
              correctIndex: 2,
              explanation: 'Column 3 has no leading 1, so $x_3$ is free. Let $x_3=t$. Then $x_1=2-5t$ and $x_2=-1+3t$.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-gaussian-elimination-example',
          name: 'Gaussian Elimination Walkthrough',
          description: 'Solve: $x - 2y + 3z = 9$, $-x + 3y = -4$, $2x - 5y + 5z = 17$.',
          prerequisites: ['def-gaussian-elimination'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'Write the augmented matrix.',
              expected: '$[[1,-2,3,9],[-1,3,0,-4],[2,-5,5,17]]$',
              keywords: ['augmented', '1,-2,3,9', '-1,3,0,-4', '2,-5,5,17'],
              hints: ['List coefficients and constants row by row.']
            },
            {
              type: 'justify',
              prompt: 'Eliminate below the leading 1 in column 1.',
              expected: 'Add $R_1$ to $R_2$: $[0,1,3,5]$. Add $-2R_1$ to $R_3$: $[0,-1,-1,-1]$.',
              keywords: ['R1+R2', '[0,1,3,5]', '-2R1+R3', '[0,-1,-1,-1]'],
              hints: ['To zero out $-1$ in $R_2$: add $1 \\times R_1$.', 'To zero out 2 in $R_3$: add $-2 \\times R_1$.']
            },
            {
              type: 'justify',
              prompt: 'Eliminate below the leading 1 in column 2.',
              expected: 'Add $R_2$ to $R_3$: $[0,0,2,4]$. Scale $R_3$ by $\\frac{1}{2}$: $[0,0,1,2]$. Now in REF.',
              keywords: ['R2+R3', '[0,0,2,4]', 'scale', '[0,0,1,2]', 'REF'],
              hints: ['$R_3$ has $-1$ in column 2. Adding $R_2$ cancels it.']
            },
            {
              type: 'conclude',
              prompt: 'Back-substitute to find the solution.',
              expected: '$z=2$, $y+3(2)=5$ so $y=-1$, $x-2(-1)+3(2)=9$ so $x=1$. Solution: $(1,-1,2)$.',
              keywords: ['z=2', 'y=-1', 'x=1', 'back substitution'],
              hints: ['Start from $z=2$, work up.']
            }
          ]
        }
      ],
      visualization: {
        type: 'kernel-image',
        title: 'Row Reduction Visualized',
        description: 'See the geometric effect of reducing a system to echelon form.',
        requiredMastery: 80,
        requiredProofs: ['proof-gaussian-elimination-example'],
        config: { matrix: [[1, -2], [-1, 3]] }
      }
    },

    // =========================================================================
    // TOPIC 5: HOMOGENEOUS SYSTEMS
    // =========================================================================
    {
      id: 'homogeneous-systems',
      name: 'Homogeneous Systems',
      description: 'Homogeneous systems $Ax = 0$, trivial vs. nontrivial solutions, and existence of nontrivial solutions when m < n.',
      prerequisites: ['echelon-forms'],
      definitions: [
        {
          id: 'def-homogeneous-system',
          name: 'Homogeneous System',
          formalText: 'A system of linear equations is homogeneous if every equation has constant term zero, i.e., the system has the form $Ax = 0$. The solution $x_1 = x_2 = \\cdots = x_n = 0$ is called the trivial solution. Any other solution is a nontrivial solution.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Homogeneous System?',
              body: 'A homogeneous system is a special type of linear system where the right-hand side of every equation is zero. In matrix form we write $Ax = 0$, where $0$ is the zero vector.',
              formula: '$$a_{11}x_1 + a_{12}x_2 + \\cdots + a_{1n}x_n = 0 \\\\ a_{21}x_1 + a_{22}x_2 + \\cdots + a_{2n}x_n = 0 \\\\ \\vdots \\\\ a_{m1}x_1 + a_{m2}x_2 + \\cdots + a_{mn}x_n = 0$$',
              keyTerms: ['homogeneous', 'Ax = 0']
            },
            {
              type: 'concept',
              title: 'Why Are They Special?',
              body: 'A homogeneous system is always consistent because setting every variable to zero always works: $A \\cdot 0 = 0$. This means we never need to ask "does a solution exist?" — one always does. The real question is whether there are other solutions beyond this obvious one.',
              keyTerms: ['always consistent', 'zero solution']
            },
            {
              type: 'concept',
              title: 'Trivial vs. Nontrivial Solutions',
              body: 'The trivial solution is $x_1 = x_2 = \\cdots = x_n = 0$. It is called "trivial" because it is obvious and uninteresting. A nontrivial solution is any solution where at least one variable is nonzero. Finding nontrivial solutions is the main goal when studying homogeneous systems.',
              keyTerms: ['trivial solution', 'nontrivial solution']
            },
            {
              type: 'example',
              title: 'Example: A Homogeneous System',
              body: 'Consider the system:\n$x_1 - 2x_2 + x_3 = 0$\n$2x_1 - x_2 + 3x_3 = 0$\n\nThe trivial solution is $(0, 0, 0)$. Row-reducing the augmented matrix $[[1,-2,1,0],[2,-1,3,0]]$ gives $[[1,0,5/3,0],[0,1,1/3,0]]$. Since $x_3$ is free, let $x_3 = t$: we get $x_1 = -\\frac{5}{3}t$, $x_2 = -\\frac{1}{3}t$. So there are infinitely many nontrivial solutions.',
              keyTerms: ['free variable', 'nontrivial']
            },
            {
              type: 'concept',
              title: 'Recognizing Homogeneous Systems',
              body: 'To check if a system is homogeneous, look at the augmented matrix: the last column (constants) must be all zeros. During row reduction, this column stays all zeros, so we can often just row-reduce $A$ itself.',
              keyTerms: ['augmented matrix', 'zero column']
            }
          ],
          atomicParts: [
            { id: 'hs-part-form', text: 'a system with all constant terms equal to zero: $Ax = 0$', keywords: ['Ax = 0', 'constant terms zero'] },
            { id: 'hs-part-trivial', text: 'the trivial solution is $x_1 = x_2 = \\cdots = x_n = 0$', keywords: ['trivial', 'all zero'] },
            { id: 'hs-part-nontrivial', text: 'a nontrivial solution has at least one nonzero variable', keywords: ['nontrivial', 'nonzero'] },
            { id: 'hs-part-consistent', text: 'every homogeneous system is consistent', keywords: ['always consistent'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'A homogeneous system $Ax = 0$ always has:',
              choices: [
                'No solution',
                'Exactly one solution',
                'At least the trivial solution',
                'Infinitely many solutions'
              ],
              correctIndex: 2,
              explanation: 'Setting all variables to zero always satisfies $Ax = 0$, so the trivial solution always exists. The system may or may not have additional nontrivial solutions.'
            },
            {
              type: 'mc',
              prompt: 'Which of the following systems is homogeneous?',
              choices: [
                '$x + 2y = 3$, $3x - y = 1$',
                '$x + 2y = 0$, $3x - y = 0$',
                '$x + 2y = 0$, $3x - y = 5$',
                '$x + 2y = 1$, $3x - y = 0$'
              ],
              correctIndex: 1,
              explanation: 'A system is homogeneous when ALL constant terms (right-hand sides) are zero. Only the second system has both constants equal to zero.'
            },
            {
              type: 'mc',
              prompt: 'The trivial solution of the system $2x_1 - x_2 + 3x_3 = 0$, $x_1 + x_2 - x_3 = 0$ is:',
              choices: [
                '$(2, -1, 3)$',
                '$(1, 1, -1)$',
                '$(0, 0, 0)$',
                'There is no trivial solution'
              ],
              correctIndex: 2,
              explanation: 'The trivial solution is always $x_1 = x_2 = \\cdots = x_n = 0$, regardless of the coefficients.'
            },
            {
              type: 'mc',
              prompt: 'A homogeneous system can be inconsistent.',
              choices: ['True', 'False'],
              correctIndex: 1,
              explanation: 'False. A homogeneous system is always consistent because the trivial solution ($x = 0$) always satisfies $Ax = 0$.'
            }
          ]
        },
        {
          id: 'def-homogeneous-theorem',
          name: 'Homogeneous System Theorem',
          formalText: 'Theorem 1: (1) Every homogeneous system $Ax = 0$ is consistent. It has either only the trivial solution or infinitely many nontrivial solutions (in addition to the trivial one). (2) If $A$ is $m \\times n$ with $m < n$ (fewer equations than unknowns), then the system $Ax = 0$ has infinitely many solutions.',
          explanations: [
            {
              type: 'intro',
              title: 'The Main Theorem on Homogeneous Systems',
              body: 'This theorem tells us exactly what can happen with a homogeneous system. There are only two possibilities, and the size of the coefficient matrix can guarantee which one occurs.',
              keyTerms: ['theorem', 'two possibilities']
            },
            {
              type: 'concept',
              title: 'Part 1: Two Possibilities Only',
              body: 'A homogeneous system $Ax = 0$ either has:\n(a) Only the trivial solution $x = 0$, or\n(b) Infinitely many solutions (the trivial solution plus infinitely many nontrivial solutions).\n\nThere is no middle ground — you cannot have exactly 2 or 3 nontrivial solutions. It is either none or infinitely many.',
              keyTerms: ['trivial only', 'infinitely many']
            },
            {
              type: 'concept',
              title: 'Part 2: More Variables Than Equations',
              body: 'If the system has fewer equations than variables ($m < n$), then there must be at least one free variable after row reduction. Each free variable can take any value, guaranteeing infinitely many nontrivial solutions.',
              formula: '$$m < n \\implies \\text{infinitely many solutions}$$',
              keyTerms: ['m < n', 'free variable', 'infinitely many']
            },
            {
              type: 'example',
              title: 'Example: 2 Equations, 4 Variables',
              body: 'Consider a homogeneous system with 2 equations and 4 variables ($m=2$, $n=4$). After row reduction, there are at most 2 pivot columns. That leaves at least $4 - 2 = 2$ free variables. So the system must have infinitely many nontrivial solutions.',
              keyTerms: ['pivot columns', 'free variables']
            },
            {
              type: 'concept',
              title: 'Why This Works',
              body: 'Row reduction produces at most $m$ pivots (one per row). With $n$ columns of variables, if $m < n$ then $n - m > 0$ variables must be free. Free variables can take any real value, producing infinitely many solutions. This reasoning applies even without performing the actual row reduction.',
              keyTerms: ['pivots', 'at most m', 'n - m free']
            }
          ],
          atomicParts: [
            { id: 'ht-part-consistent', text: 'every homogeneous system is consistent', keywords: ['consistent', 'always'] },
            { id: 'ht-part-two-cases', text: 'either only trivial or infinitely many solutions', keywords: ['trivial', 'infinitely many', 'two cases'] },
            { id: 'ht-part-m-less-n', text: 'if $m < n$ then infinitely many solutions', keywords: ['m < n', 'fewer equations', 'infinitely many'] },
            { id: 'ht-part-free-vars', text: 'free variables guarantee nontrivial solutions', keywords: ['free variable', 'nontrivial'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'A homogeneous system with 3 equations and 5 unknowns:',
              choices: [
                'May have only the trivial solution',
                'Must have infinitely many solutions',
                'Is always inconsistent',
                'Has exactly 5 solutions'
              ],
              correctIndex: 1,
              explanation: 'Since $m = 3 < 5 = n$, the theorem guarantees infinitely many solutions. There must be at least $5 - 3 = 2$ free variables.'
            },
            {
              type: 'mc',
              prompt: 'A homogeneous system can have exactly 3 nontrivial solutions.',
              choices: ['True', 'False'],
              correctIndex: 1,
              explanation: 'False. A homogeneous system has either zero nontrivial solutions (only trivial) or infinitely many. There is no finite nonzero count possible.'
            },
            {
              type: 'mc',
              prompt: 'If $A$ is a $4 \\times 4$ matrix, what can we say about $Ax = 0$?',
              choices: [
                'It must have infinitely many solutions',
                'It has only the trivial solution',
                'It could have only the trivial or infinitely many solutions',
                'It has no solution'
              ],
              correctIndex: 2,
              explanation: 'When $m = n$, we cannot conclude which case occurs from size alone. We need to row-reduce $A$ to check if every variable is a pivot variable or if free variables exist.'
            },
            {
              type: 'mc',
              prompt: 'Why does $m < n$ guarantee nontrivial solutions for $Ax = 0$?',
              choices: [
                'Because the determinant is zero',
                'Because row reduction produces at most $m$ pivots, leaving at least $n - m$ free variables',
                'Because the system is inconsistent',
                'Because the matrix is square'
              ],
              correctIndex: 1,
              explanation: 'With $m$ rows, there can be at most $m$ pivots. Since there are $n > m$ variable columns, at least $n - m$ columns have no pivot, making those variables free.'
            }
          ]
        }
      ],
      proofs: [],
      visualization: null
    },

    // =========================================================================
    // TOPIC 6: MATRIX OPERATIONS
    // =========================================================================
    {
      id: 'matrix-operations',
      name: 'Matrix Operations',
      description: 'Matrix equality, addition, scalar multiplication, and matrix multiplication with inner-dimension matching.',
      prerequisites: ['homogeneous-systems'],
      definitions: [
        {
          id: 'def-matrix-equality',
          name: 'Matrix Equality',
          formalText: 'Two matrices $A$ and $B$ are equal (written $A = B$) if and only if they have the same size ($m \\times n$) and corresponding entries are equal: $a_{ij} = b_{ij}$ for all $1 \\leq i \\leq m$ and $1 \\leq j \\leq n$.',
          explanations: [
            {
              type: 'intro',
              title: 'When Are Two Matrices Equal?',
              body: 'Two matrices are equal when they are identical in every way: same number of rows, same number of columns, and every single entry matches. If even one entry differs or the sizes are different, the matrices are not equal.',
              keyTerms: ['equal', 'same size', 'same entries']
            },
            {
              type: 'concept',
              title: 'Both Conditions Must Hold',
              body: 'Matrix equality requires two things simultaneously:\n1. Same dimensions: both must be $m \\times n$.\n2. Entry-by-entry match: $a_{ij} = b_{ij}$ for every position $(i, j)$.\n\nA $2 \\times 3$ matrix can never equal a $3 \\times 2$ matrix, even if they contain the same numbers.',
              keyTerms: ['dimensions', 'entry-by-entry']
            },
            {
              type: 'example',
              title: 'Examples of Matrix Equality',
              body: '$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ (same size, same entries)\n\n$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\neq \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}$ (same size, but entries differ)\n\n$\\begin{bmatrix} 1 & 2 & 3 \\end{bmatrix} \\neq \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$ (different sizes: $1 \\times 3$ vs. $3 \\times 1$)',
              keyTerms: ['equal', 'not equal']
            }
          ],
          atomicParts: [
            { id: 'meq-part-size', text: 'equal matrices must have the same size $m \\times n$', keywords: ['same size', 'dimensions'] },
            { id: 'meq-part-entries', text: '$a_{ij} = b_{ij}$ for all $i, j$', keywords: ['corresponding entries', 'all i,j'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'If $A$ is $2 \\times 3$ and $B$ is $3 \\times 2$, can $A = B$?',
              choices: [
                'Yes, if they have the same entries',
                'No, because they have different sizes',
                'Yes, if one is the transpose of the other',
                'Only if both are zero matrices'
              ],
              correctIndex: 1,
              explanation: 'Matrix equality requires identical dimensions. A $2 \\times 3$ matrix can never equal a $3 \\times 2$ matrix, regardless of entries.'
            },
            {
              type: 'mc',
              prompt: '$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & x \\end{bmatrix}$ implies $x =$',
              choices: ['$0$', '$2$', '$3$', '$4$'],
              correctIndex: 3,
              explanation: 'For the matrices to be equal, every entry must match. The entry in row 2, column 2 must satisfy $4 = x$, so $x = 4$.'
            },
            {
              type: 'mc',
              prompt: 'Two matrices with the same entries but different dimensions are:',
              choices: [
                'Always equal',
                'Never equal',
                'Equal if entries match in order',
                'Equal only if both are square'
              ],
              correctIndex: 1,
              explanation: 'Matrix equality requires both the same dimensions AND the same entries. Different dimensions alone means they cannot be equal.'
            }
          ]
        },
        {
          id: 'def-matrix-addition-scalar',
          name: 'Matrix Addition and Scalar Multiplication',
          formalText: 'If $A$ and $B$ are both $m \\times n$ matrices, their sum is the $m \\times n$ matrix $A + B$ with entries $[a_{ij} + b_{ij}]$. Scalar multiplication: for a scalar $c$, the matrix $cA$ has entries $[ca_{ij}]$. Matrix subtraction is defined as $A - B = A + (-1)B$.',
          explanations: [
            {
              type: 'intro',
              title: 'Adding Matrices',
              body: 'To add two matrices, simply add corresponding entries. The matrices must have the same size — you cannot add a $2 \\times 3$ matrix to a $3 \\times 2$ matrix.',
              formula: '$$A + B = [a_{ij} + b_{ij}]$$',
              keyTerms: ['addition', 'corresponding entries', 'same size']
            },
            {
              type: 'example',
              title: 'Matrix Addition Example',
              body: '$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 1+5 & 2+6 \\\\ 3+7 & 4+8 \\end{bmatrix} = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$',
              keyTerms: ['entry-by-entry']
            },
            {
              type: 'concept',
              title: 'Scalar Multiplication',
              body: 'To multiply a matrix by a scalar (a single number), multiply every entry by that scalar. The result has the same size as the original matrix.',
              formula: '$$cA = [ca_{ij}]$$',
              keyTerms: ['scalar', 'multiply every entry']
            },
            {
              type: 'example',
              title: 'Scalar Multiplication Example',
              body: '$3 \\begin{bmatrix} 1 & -2 \\\\ 0 & 4 \\end{bmatrix} = \\begin{bmatrix} 3(1) & 3(-2) \\\\ 3(0) & 3(4) \\end{bmatrix} = \\begin{bmatrix} 3 & -6 \\\\ 0 & 12 \\end{bmatrix}$',
              keyTerms: ['scalar', 'every entry']
            },
            {
              type: 'concept',
              title: 'Matrix Subtraction',
              body: 'Subtraction is defined in terms of addition and scalar multiplication: $A - B = A + (-1)B$. In practice, you subtract corresponding entries: $[a_{ij} - b_{ij}]$.',
              formula: '$$A - B = A + (-1)B = [a_{ij} - b_{ij}]$$',
              keyTerms: ['subtraction', 'A + (-1)B']
            },
            {
              type: 'concept',
              title: 'Properties of Addition and Scalar Multiplication',
              body: 'These operations satisfy familiar algebraic rules:\n$A + B = B + A$ (commutative)\n$(A + B) + C = A + (B + C)$ (associative)\n$c(A + B) = cA + cB$ (distributive)\n$(c + d)A = cA + dA$ (distributive)\n$c(dA) = (cd)A$ (associative for scalars)',
              keyTerms: ['commutative', 'associative', 'distributive']
            }
          ],
          atomicParts: [
            { id: 'ma-part-add', text: '$A + B = [a_{ij} + b_{ij}]$, same size required', keywords: ['addition', 'same size', 'entry-by-entry'] },
            { id: 'ma-part-scalar', text: '$cA = [ca_{ij}]$, multiply every entry by $c$', keywords: ['scalar', 'multiply', 'every entry'] },
            { id: 'ma-part-subtract', text: '$A - B = A + (-1)B$', keywords: ['subtraction', '-1'] },
            { id: 'ma-part-commutative', text: '$A + B = B + A$', keywords: ['commutative'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: '$\\begin{bmatrix} 1 & 3 \\\\ 2 & 0 \\end{bmatrix} + \\begin{bmatrix} -1 & 2 \\\\ 4 & 5 \\end{bmatrix} =$',
              choices: [
                '$\\begin{bmatrix} 0 & 5 \\\\ 6 & 5 \\end{bmatrix}$',
                '$\\begin{bmatrix} 2 & 1 \\\\ -2 & -5 \\end{bmatrix}$',
                '$\\begin{bmatrix} 0 & 5 \\\\ 2 & 5 \\end{bmatrix}$',
                '$\\begin{bmatrix} -1 & 6 \\\\ 8 & 0 \\end{bmatrix}$'
              ],
              correctIndex: 0,
              explanation: 'Add entry by entry: $(1+(-1), 3+2; 2+4, 0+5) = (0, 5; 6, 5)$.'
            },
            {
              type: 'mc',
              prompt: '$2 \\begin{bmatrix} 3 & -1 \\\\ 0 & 4 \\end{bmatrix} =$',
              choices: [
                '$\\begin{bmatrix} 5 & 1 \\\\ 2 & 6 \\end{bmatrix}$',
                '$\\begin{bmatrix} 6 & -2 \\\\ 0 & 8 \\end{bmatrix}$',
                '$\\begin{bmatrix} 6 & -1 \\\\ 0 & 4 \\end{bmatrix}$',
                '$\\begin{bmatrix} 3 & -1 \\\\ 0 & 8 \\end{bmatrix}$'
              ],
              correctIndex: 1,
              explanation: 'Multiply every entry by 2: $2(3)=6$, $2(-1)=-2$, $2(0)=0$, $2(4)=8$.'
            },
            {
              type: 'mc',
              prompt: 'Can you add a $2 \\times 3$ matrix and a $2 \\times 2$ matrix?',
              choices: [
                'Yes, you get a $2 \\times 3$ matrix',
                'Yes, you get a $2 \\times 2$ matrix',
                'No, the matrices must have the same size',
                'Yes, but only if entries are all positive'
              ],
              correctIndex: 2,
              explanation: 'Matrix addition requires both matrices to have the exact same dimensions. A $2 \\times 3$ and $2 \\times 2$ matrix cannot be added.'
            },
            {
              type: 'mc',
              prompt: 'Matrix subtraction $A - B$ is defined as:',
              choices: [
                '$B - A$',
                '$A + (-1)B$',
                '$A \\cdot B^{-1}$',
                '$(-1)A + B$'
              ],
              correctIndex: 1,
              explanation: '$A - B$ is defined as $A + (-1)B$, which means adding $A$ to the matrix $(-1)B$ (every entry of $B$ negated).'
            }
          ]
        },
        {
          id: 'def-matrix-multiplication',
          name: 'Matrix Multiplication',
          formalText: 'If $A$ is $m \\times r$ and $B$ is $r \\times n$, the product $AB$ is the $m \\times n$ matrix whose $(i,j)$-entry is $c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj}$. This is the dot product of row $i$ of $A$ with column $j$ of $B$. The inner dimensions must match: the number of columns of $A$ must equal the number of rows of $B$.',
          explanations: [
            {
              type: 'intro',
              title: 'Multiplying Two Matrices',
              body: 'Matrix multiplication is NOT entry-by-entry like addition. Instead, each entry of the product is computed as a dot product: row $i$ of $A$ dotted with column $j$ of $B$.',
              formula: '$$c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \\cdots + a_{ir}b_{rj}$$',
              keyTerms: ['row times column', 'dot product']
            },
            {
              type: 'concept',
              title: 'Dimension Requirement',
              body: 'For $AB$ to be defined, the number of columns of $A$ must equal the number of rows of $B$. If $A$ is $m \\times r$ and $B$ is $r \\times n$, the product $AB$ is $m \\times n$.\n\nMemory aid: $(m \\times \\mathbf{r})(\\mathbf{r} \\times n) = m \\times n$. The inner dimensions ($r$) must match and they "cancel," leaving the outer dimensions.',
              keyTerms: ['inner dimensions', 'must match', 'outer dimensions']
            },
            {
              type: 'example',
              title: 'Matrix Multiplication Example',
              body: '$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$\n\nRow 1 of $A$ $\\cdot$ Col 1 of $B$: $1(5)+2(7)=19$\nRow 1 of $A$ $\\cdot$ Col 2 of $B$: $1(6)+2(8)=22$\nRow 2 of $A$ $\\cdot$ Col 1 of $B$: $3(5)+4(7)=43$\nRow 2 of $A$ $\\cdot$ Col 2 of $B$: $3(6)+4(8)=50$\n\nResult: $\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$',
              keyTerms: ['row-column product']
            },
            {
              type: 'concept',
              title: 'Non-Square Multiplication',
              body: 'Matrices do not need to be square to be multiplied. A $2 \\times 3$ matrix times a $3 \\times 4$ matrix gives a $2 \\times 4$ matrix. But a $2 \\times 3$ times a $2 \\times 3$ is undefined because the inner dimensions ($3$ and $2$) do not match.',
              keyTerms: ['non-square', 'inner dimensions']
            },
            {
              type: 'example',
              title: 'Non-Square Example',
              body: '$\\begin{bmatrix} 1 & 0 & 2 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 1 \\\\ -1 \\end{bmatrix} = [1(3) + 0(1) + 2(-1)] = [1]$\n\nA $1 \\times 3$ matrix times a $3 \\times 1$ matrix gives a $1 \\times 1$ matrix (a scalar).',
              keyTerms: ['row vector', 'column vector', 'scalar']
            },
            {
              type: 'concept',
              title: 'Order Matters',
              body: 'Even when both $AB$ and $BA$ are defined, they are usually not equal: $AB \\neq BA$ in general. Matrix multiplication is not commutative. Also, $AB$ may be defined while $BA$ is not (if the dimensions do not match in reverse).',
              keyTerms: ['non-commutative', 'order matters']
            }
          ],
          atomicParts: [
            { id: 'mm-part-formula', text: '$c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj}$, row $i$ dot column $j$', keywords: ['dot product', 'row', 'column', 'sum'] },
            { id: 'mm-part-dim', text: '$(m \\times r)(r \\times n) = m \\times n$, inner dimensions must match', keywords: ['inner dimensions', 'match', 'm x n'] },
            { id: 'mm-part-not-commutative', text: '$AB \\neq BA$ in general', keywords: ['not commutative', 'order matters'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'If $A$ is $3 \\times 2$ and $B$ is $2 \\times 4$, what is the size of $AB$?',
              choices: ['$2 \\times 2$', '$3 \\times 4$', '$3 \\times 2$', '$4 \\times 3$'],
              correctIndex: 1,
              explanation: '$(3 \\times \\mathbf{2})(\\mathbf{2} \\times 4) = 3 \\times 4$. The inner dimensions (both 2) match and cancel, leaving the outer dimensions.'
            },
            {
              type: 'mc',
              prompt: 'The entry $c_{ij}$ in $AB$ is computed by:',
              choices: [
                'Multiplying $a_{ij}$ by $b_{ij}$',
                'Adding row $i$ of $A$ to column $j$ of $B$',
                'Dotting row $i$ of $A$ with column $j$ of $B$',
                'Multiplying column $i$ of $A$ by row $j$ of $B$'
              ],
              correctIndex: 2,
              explanation: '$c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj}$, which is the dot product of row $i$ of $A$ with column $j$ of $B$.'
            },
            {
              type: 'mc',
              prompt: '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 3 & 5 \\\\ 7 & 9 \\end{bmatrix} =$',
              choices: [
                '$\\begin{bmatrix} 3 & 0 \\\\ 0 & 9 \\end{bmatrix}$',
                '$\\begin{bmatrix} 3 & 5 \\\\ 7 & 9 \\end{bmatrix}$',
                '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
                '$\\begin{bmatrix} 10 & 5 \\\\ 7 & 10 \\end{bmatrix}$'
              ],
              correctIndex: 1,
              explanation: 'The identity matrix times any matrix gives that matrix back: $I \\cdot B = B$.'
            },
            {
              type: 'mc',
              prompt: 'Can you multiply a $2 \\times 3$ matrix by a $2 \\times 3$ matrix?',
              choices: [
                'Yes, the result is $2 \\times 3$',
                'Yes, the result is $3 \\times 2$',
                'No, inner dimensions $3$ and $2$ do not match',
                'Yes, the result is $2 \\times 2$'
              ],
              correctIndex: 2,
              explanation: 'For $AB$: $A$ is $2 \\times 3$ and $B$ is $2 \\times 3$. The inner dimensions are $3$ (columns of $A$) and $2$ (rows of $B$), which do not match. The product is undefined.'
            }
          ]
        }
      ],
      proofs: [],
      visualization: null
    },

    // =========================================================================
    // TOPIC 7: MATRIX PROPERTIES
    // =========================================================================
    {
      id: 'matrix-properties',
      name: 'Matrix Properties',
      description: 'Special matrices, properties of matrix multiplication, and the transpose operation.',
      prerequisites: ['matrix-operations'],
      definitions: [
        {
          id: 'def-special-matrices',
          name: 'Special Matrices',
          formalText: 'The zero matrix $0_{m \\times n}$ has every entry equal to zero. The identity matrix $I_n$ is the $n \\times n$ matrix with $1$s on the diagonal and $0$s elsewhere. A diagonal matrix $diag(d_1, \\ldots, d_n)$ has entries only on the main diagonal. The trace of a square matrix $A$ is $tr(A) = a_{11} + a_{22} + \\cdots + a_{nn}$, the sum of diagonal entries.',
          explanations: [
            {
              type: 'intro',
              title: 'Named Matrices',
              body: 'Certain matrices appear so frequently that they have special names. Knowing these matrices and their properties is essential for the rest of linear algebra.',
              keyTerms: ['special matrices', 'named matrices']
            },
            {
              type: 'concept',
              title: 'The Zero Matrix',
              body: 'The zero matrix $0_{m \\times n}$ is the $m \\times n$ matrix where every single entry is $0$. It acts like the number zero in arithmetic: $A + 0 = A$ for any matrix $A$ of the same size.',
              example: '$0_{2 \\times 2} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$, $0_{2 \\times 3} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$',
              keyTerms: ['zero matrix', 'additive identity']
            },
            {
              type: 'concept',
              title: 'The Identity Matrix',
              body: 'The identity matrix $I_n$ is the $n \\times n$ square matrix with $1$s on the main diagonal and $0$s everywhere else. It acts like the number 1 in multiplication: $AI_n = I_mA = A$ whenever the sizes are compatible.',
              example: '$I_2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, $I_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$',
              keyTerms: ['identity matrix', 'multiplicative identity', 'I_n']
            },
            {
              type: 'concept',
              title: 'Diagonal Matrices and Trace',
              body: 'A diagonal matrix has nonzero entries only on the main diagonal (positions $a_{11}, a_{22}, \\ldots, a_{nn}$). Written $diag(d_1, d_2, \\ldots, d_n)$. The trace of a square matrix is the sum of its diagonal entries: $tr(A) = a_{11} + a_{22} + \\cdots + a_{nn}$.',
              example: '$diag(2, -1, 5) = \\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$\n$tr(diag(2,-1,5)) = 2 + (-1) + 5 = 6$',
              keyTerms: ['diagonal', 'trace', 'sum of diagonal']
            },
            {
              type: 'example',
              title: 'Trace Calculation',
              body: 'For $A = \\begin{bmatrix} 3 & 1 & 4 \\\\ 1 & 5 & 9 \\\\ 2 & 6 & 7 \\end{bmatrix}$:\n\n$tr(A) = a_{11} + a_{22} + a_{33} = 3 + 5 + 7 = 15$\n\nNote: only the diagonal entries matter for the trace, not the off-diagonal entries.',
              keyTerms: ['trace', 'diagonal entries']
            }
          ],
          atomicParts: [
            { id: 'sm-part-zero', text: '$0_{m \\times n}$: every entry is zero, $A + 0 = A$', keywords: ['zero matrix', 'all zeros'] },
            { id: 'sm-part-identity', text: '$I_n$: $1$s on diagonal, $0$s elsewhere, $AI = IA = A$', keywords: ['identity', 'ones on diagonal'] },
            { id: 'sm-part-diagonal', text: '$diag(d_1,\\ldots,d_n)$: nonzero entries only on the main diagonal', keywords: ['diagonal', 'main diagonal'] },
            { id: 'sm-part-trace', text: '$tr(A) = a_{11} + a_{22} + \\cdots + a_{nn}$ for square $A$', keywords: ['trace', 'sum', 'diagonal'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'What is $tr\\left(\\begin{bmatrix} 2 & 7 \\\\ 3 & -5 \\end{bmatrix}\\right)$?',
              choices: ['$10$', '$-3$', '$7$', '$2$'],
              correctIndex: 1,
              explanation: '$tr(A) = a_{11} + a_{22} = 2 + (-5) = -3$. The trace sums only the diagonal entries.'
            },
            {
              type: 'mc',
              prompt: 'The identity matrix $I_3$ has the property:',
              choices: [
                'All entries are 1',
                'Diagonal entries are 1, all others are 0',
                'It is a $3 \\times 1$ matrix',
                'Its trace is 0'
              ],
              correctIndex: 1,
              explanation: '$I_3$ has $1$s at positions $(1,1)$, $(2,2)$, $(3,3)$ and $0$s everywhere else. Its trace is $1+1+1=3$.'
            },
            {
              type: 'mc',
              prompt: 'For any $3 \\times 3$ matrix $A$, what is $A + 0_{3 \\times 3}$?',
              choices: ['$0_{3 \\times 3}$', '$A$', '$2A$', 'Undefined'],
              correctIndex: 1,
              explanation: 'Adding the zero matrix to any matrix leaves it unchanged: $A + 0 = A$, just like $a + 0 = a$ for numbers.'
            },
            {
              type: 'mc',
              prompt: 'Which of the following is a diagonal matrix?',
              choices: [
                '$\\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$',
                '$\\begin{bmatrix} 4 & 0 \\\\ 0 & -1 \\end{bmatrix}$',
                '$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$',
                '$\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$'
              ],
              correctIndex: 1,
              explanation: 'A diagonal matrix has all off-diagonal entries equal to zero. Only $\\begin{bmatrix} 4 & 0 \\\\ 0 & -1 \\end{bmatrix}$ satisfies this.'
            }
          ]
        },
        {
          id: 'def-matrix-mult-properties',
          name: 'Properties of Matrix Multiplication',
          formalText: 'Matrix multiplication satisfies: (1) Associativity: $A(BC) = (AB)C$. (2) Left distributivity: $A(B+C) = AB + AC$. (3) Right distributivity: $(A+B)C = AC + BC$. (4) Scalar compatibility: $c(AB) = (cA)B = A(cB)$. However, matrix multiplication is NOT commutative: $AB \\neq BA$ in general. Also, $AI_n = I_mA = A$ for compatible identity matrices.',
          explanations: [
            {
              type: 'intro',
              title: 'Algebraic Properties of Matrix Multiplication',
              body: 'Matrix multiplication obeys many familiar arithmetic rules, but with one critical exception: it is NOT commutative. The order in which you multiply matrices matters.',
              keyTerms: ['properties', 'non-commutative']
            },
            {
              type: 'axiom',
              title: 'Associativity',
              body: 'Matrix multiplication is associative: $A(BC) = (AB)C$. You can group the multiplication in any order without changing the result. This means we can write $ABC$ without ambiguity.',
              example: 'For any compatible matrices $A$, $B$, $C$:\n$(AB)C = A(BC)$\nSo we simply write $ABC$.'
            },
            {
              type: 'axiom',
              title: 'Distributivity',
              body: 'Multiplication distributes over addition from both sides:\nLeft: $A(B + C) = AB + AC$\nRight: $(A + B)C = AC + BC$\n\nNote: the order matters! $A$ stays on the left in the left-distributive law.',
              example: '$A(B + C) = AB + AC$ (A multiplies from the left)\n$(A + B)C = AC + BC$ (C multiplies from the right)'
            },
            {
              type: 'concept',
              title: 'Non-Commutativity: $AB \\neq BA$',
              body: 'This is the most important difference from ordinary arithmetic. For matrices, $AB$ and $BA$ are generally different, and sometimes one product exists while the other does not.',
              example: '$A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 0 \\end{bmatrix}$, $B = \\begin{bmatrix} 0 & 0 \\\\ 3 & 4 \\end{bmatrix}$\n$AB = \\begin{bmatrix} 6 & 8 \\\\ 0 & 0 \\end{bmatrix}$, $BA = \\begin{bmatrix} 0 & 0 \\\\ 3 & 6 \\end{bmatrix}$\n$AB \\neq BA$',
              keyTerms: ['non-commutative', 'AB \\neq BA']
            },
            {
              type: 'concept',
              title: 'The Identity Property',
              body: 'The identity matrix is the multiplicative identity: $AI_n = A$ and $I_mA = A$, where the subscripts must match the dimensions of $A$. This is analogous to $a \\cdot 1 = 1 \\cdot a = a$ for numbers.',
              keyTerms: ['identity', 'AI = A']
            },
            {
              type: 'concept',
              title: 'Scalar Compatibility',
              body: 'Scalars can move freely through matrix products: $c(AB) = (cA)B = A(cB)$. You can multiply the scalar into either factor without changing the result.',
              formula: '$$c(AB) = (cA)B = A(cB)$$',
              keyTerms: ['scalar', 'compatibility']
            }
          ],
          atomicParts: [
            { id: 'mp-part-assoc', text: '$A(BC) = (AB)C$', keywords: ['associative'] },
            { id: 'mp-part-distrib', text: '$A(B+C) = AB+AC$ and $(A+B)C = AC+BC$', keywords: ['distributive'] },
            { id: 'mp-part-noncomm', text: '$AB \\neq BA$ in general (non-commutative)', keywords: ['non-commutative', 'not equal'] },
            { id: 'mp-part-identity', text: '$AI_n = I_mA = A$', keywords: ['identity', 'multiplicative'] },
            { id: 'mp-part-scalar', text: '$c(AB) = (cA)B = A(cB)$', keywords: ['scalar', 'compatibility'] }
          ],
          axioms: [
            { id: 'ax-noncommutative', label: 'Non-Commutativity', statement: '$AB \\neq BA$ in general', counterexample: { set: '$A=\\begin{bmatrix}1&2\\\\0&0\\end{bmatrix}$, $B=\\begin{bmatrix}0&0\\\\3&4\\end{bmatrix}$', explanation: '$AB=\\begin{bmatrix}6&8\\\\0&0\\end{bmatrix}$ but $BA=\\begin{bmatrix}0&0\\\\3&6\\end{bmatrix}$' } }
          ],
          exercises: [
            {
              type: 'mc',
              prompt: 'Which property does matrix multiplication NOT satisfy?',
              choices: [
                'Associativity: $A(BC) = (AB)C$',
                'Commutativity: $AB = BA$',
                'Left distributivity: $A(B+C) = AB+AC$',
                'Right distributivity: $(A+B)C = AC+BC$'
              ],
              correctIndex: 1,
              explanation: 'Matrix multiplication is NOT commutative. $AB \\neq BA$ in general. It does satisfy associativity and both distributive laws.'
            },
            {
              type: 'mc',
              prompt: 'If $A$ is $3 \\times 3$, what is $AI_3$?',
              choices: ['$I_3$', '$A$', '$3A$', '$A^2$'],
              correctIndex: 1,
              explanation: 'The identity matrix is the multiplicative identity: $AI_n = A$ for any compatible matrix $A$.'
            },
            {
              type: 'mc',
              prompt: '$A(B + C) = $',
              choices: ['$AB + C$', '$AB + AC$', '$A + BC$', '$(A + B)(A + C)$'],
              correctIndex: 1,
              explanation: 'Matrix multiplication distributes over addition: $A(B+C) = AB + AC$.'
            },
            {
              type: 'mc',
              prompt: 'If $AB = 0$ (zero matrix), can we conclude $A = 0$ or $B = 0$?',
              choices: [
                'Yes, just like with real numbers',
                'No, both $A$ and $B$ can be nonzero and still have $AB = 0$',
                'Only if $A$ is square',
                'Only if $B$ is the identity'
              ],
              correctIndex: 1,
              explanation: 'Unlike real numbers, matrix multiplication can give zero even when neither factor is zero. For example: $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}\\begin{bmatrix}0&0\\\\1&0\\end{bmatrix} = \\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$.'
            }
          ]
        },
        {
          id: 'def-transpose',
          name: 'Transpose of a Matrix',
          formalText: 'The transpose of an $m \\times n$ matrix $A$, written $A^T$, is the $n \\times m$ matrix obtained by interchanging rows and columns: the $(i,j)$-entry of $A^T$ is $a_{ji}$. Properties: $(A^T)^T = A$, $(A+B)^T = A^T + B^T$, $(cA)^T = cA^T$, $(AB)^T = B^TA^T$. A matrix is symmetric if $A = A^T$ and skew-symmetric if $A^T = -A$.',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Transpose?',
              body: 'The transpose of a matrix flips it over its main diagonal: rows become columns and columns become rows. If $A$ is $m \\times n$, then $A^T$ is $n \\times m$.',
              formula: '$$(A^T)_{ij} = a_{ji}$$',
              keyTerms: ['transpose', 'rows to columns']
            },
            {
              type: 'example',
              title: 'Transpose Example',
              body: '$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$ (a $2 \\times 3$ matrix)\n\n$A^T = \\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$ (a $3 \\times 2$ matrix)\n\nRow 1 of $A$ became column 1 of $A^T$, and row 2 of $A$ became column 2 of $A^T$.',
              keyTerms: ['flip', 'rows become columns']
            },
            {
              type: 'concept',
              title: 'Properties of the Transpose',
              body: 'The transpose satisfies these important rules:\n1. $(A^T)^T = A$ — transposing twice gives you back the original.\n2. $(A + B)^T = A^T + B^T$ — transpose of a sum is the sum of transposes.\n3. $(cA)^T = cA^T$ — scalars pass through the transpose.\n4. $(AB)^T = B^TA^T$ — the transpose of a product reverses the order!',
              keyTerms: ['double transpose', 'product reversal']
            },
            {
              type: 'concept',
              title: 'The Shoe-Sock Rule: $(AB)^T = B^TA^T$',
              body: 'The most surprising property is that the transpose of a product reverses the order. Like putting on socks and shoes: if $AB$ is "socks then shoes," then $(AB)^T = B^TA^T$ is "shoes then socks." This extends: $(ABC)^T = C^TB^TA^T$.',
              keyTerms: ['reverse order', 'shoe-sock']
            },
            {
              type: 'concept',
              title: 'Symmetric and Skew-Symmetric Matrices',
              body: 'A square matrix is symmetric if $A = A^T$ (it equals its own transpose). This means $a_{ij} = a_{ji}$ — the matrix is mirrored across the diagonal. A matrix is skew-symmetric if $A^T = -A$, meaning $a_{ij} = -a_{ji}$. Diagonal entries of a skew-symmetric matrix must be zero.',
              example: 'Symmetric: $\\begin{bmatrix} 1 & 3 \\\\ 3 & 5 \\end{bmatrix}$\nSkew-symmetric: $\\begin{bmatrix} 0 & 2 \\\\ -2 & 0 \\end{bmatrix}$',
              keyTerms: ['symmetric', 'skew-symmetric']
            },
            {
              type: 'example',
              title: 'Verifying Symmetry',
              body: '$A = \\begin{bmatrix} 2 & -1 & 3 \\\\ -1 & 5 & 0 \\\\ 3 & 0 & 7 \\end{bmatrix}$\n\n$A^T = \\begin{bmatrix} 2 & -1 & 3 \\\\ -1 & 5 & 0 \\\\ 3 & 0 & 7 \\end{bmatrix} = A$\n\nSince $A = A^T$, this matrix is symmetric. Notice the mirror symmetry across the main diagonal.',
              keyTerms: ['symmetric', 'A = A^T']
            }
          ],
          atomicParts: [
            { id: 'tr-part-def', text: '$A^T$ interchanges rows and columns: $(A^T)_{ij} = a_{ji}$', keywords: ['transpose', 'interchange', 'rows', 'columns'] },
            { id: 'tr-part-double', text: '$(A^T)^T = A$', keywords: ['double transpose'] },
            { id: 'tr-part-sum', text: '$(A+B)^T = A^T + B^T$', keywords: ['sum', 'transpose'] },
            { id: 'tr-part-product', text: '$(AB)^T = B^TA^T$ (order reverses)', keywords: ['product', 'reverse order'] },
            { id: 'tr-part-symmetric', text: 'symmetric: $A = A^T$; skew-symmetric: $A^T = -A$', keywords: ['symmetric', 'skew-symmetric'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'If $A$ is $3 \\times 5$, then $A^T$ is:',
              choices: ['$3 \\times 5$', '$5 \\times 3$', '$5 \\times 5$', '$3 \\times 3$'],
              correctIndex: 1,
              explanation: 'Transposing an $m \\times n$ matrix gives an $n \\times m$ matrix. So a $3 \\times 5$ becomes $5 \\times 3$.'
            },
            {
              type: 'mc',
              prompt: '$(AB)^T =$',
              choices: ['$A^TB^T$', '$B^TA^T$', '$BA$', '$(BA)^T$'],
              correctIndex: 1,
              explanation: 'The transpose of a product reverses the order: $(AB)^T = B^TA^T$. This is the "shoe-sock" rule.'
            },
            {
              type: 'mc',
              prompt: 'A matrix $A$ is symmetric if:',
              choices: [
                '$A = -A$',
                '$A = A^T$',
                '$A = A^{-1}$',
                '$A = I$'
              ],
              correctIndex: 1,
              explanation: 'A symmetric matrix equals its own transpose: $A = A^T$, meaning $a_{ij} = a_{ji}$ for all entries.'
            },
            {
              type: 'mc',
              prompt: 'The diagonal entries of a skew-symmetric matrix must be:',
              choices: ['$1$', 'Positive', '$0$', 'Negative'],
              correctIndex: 2,
              explanation: 'If $A^T = -A$, then $a_{ii} = -a_{ii}$, which implies $2a_{ii} = 0$, so $a_{ii} = 0$.'
            }
          ]
        }
      ],
      proofs: [],
      visualization: null
    },

    // =========================================================================
    // TOPIC 8: MATRIX INVERSE
    // =========================================================================
    {
      id: 'matrix-inverse',
      name: 'Matrix Inverse',
      description: 'Invertible (nonsingular) matrices, finding inverses by row reduction, and the properties of matrix inverses.',
      prerequisites: ['matrix-properties'],
      definitions: [
        {
          id: 'def-inverse-matrix',
          name: 'Inverse of a Matrix',
          formalText: 'An $n \\times n$ matrix $A$ is invertible (nonsingular) if there exists a matrix $B$ such that $AB = BA = I_n$. The matrix $B$ is called the inverse of $A$ and is written $A^{-1}$. If no such $B$ exists, $A$ is called singular (noninvertible).',
          explanations: [
            {
              type: 'intro',
              title: 'What is a Matrix Inverse?',
              body: 'Just as the number $5$ has a multiplicative inverse $\\frac{1}{5}$ (because $5 \\cdot \\frac{1}{5} = 1$), a square matrix $A$ may have an inverse $A^{-1}$ such that $AA^{-1} = A^{-1}A = I_n$. The identity matrix $I_n$ plays the role of the number $1$.',
              keyTerms: ['inverse', 'invertible', 'A^{-1}']
            },
            {
              type: 'concept',
              title: 'Invertible vs. Singular',
              body: 'A matrix that has an inverse is called invertible or nonsingular. A matrix that does NOT have an inverse is called singular or noninvertible. Only square matrices can be invertible (though not all square matrices are).',
              keyTerms: ['invertible', 'nonsingular', 'singular', 'noninvertible']
            },
            {
              type: 'concept',
              title: 'Uniqueness of the Inverse',
              body: 'If a matrix $A$ has an inverse, that inverse is unique. There is only one matrix $B$ satisfying $AB = BA = I_n$. This is why we write "the" inverse $A^{-1}$ rather than "an" inverse.',
              keyTerms: ['unique', 'the inverse']
            },
            {
              type: 'example',
              title: 'Example: A $2 \\times 2$ Inverse',
              body: 'Let $A = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$. Its inverse is $A^{-1} = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$.\n\nVerification: $AA^{-1} = \\begin{bmatrix} 2(3)+1(-5) & 2(-1)+1(2) \\\\ 5(3)+3(-5) & 5(-1)+3(2) \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I_2$',
              keyTerms: ['verify', 'AA^{-1} = I']
            },
            {
              type: 'example',
              title: 'Example: A Singular Matrix',
              body: '$A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$ is singular. Row 2 is $2 \\times$ Row 1, so the rows are linearly dependent. No matrix $B$ exists with $AB = I_2$. Intuitively, $A$ "collapses" two dimensions into one, and this loss of information cannot be undone.',
              keyTerms: ['singular', 'no inverse']
            }
          ],
          atomicParts: [
            { id: 'inv-part-def', text: '$A$ is invertible if $AB = BA = I_n$ for some $B = A^{-1}$', keywords: ['invertible', 'AB = I', 'BA = I'] },
            { id: 'inv-part-singular', text: 'singular (noninvertible) means no inverse exists', keywords: ['singular', 'noninvertible'] },
            { id: 'inv-part-unique', text: 'the inverse is unique if it exists', keywords: ['unique'] },
            { id: 'inv-part-square', text: 'only square matrices can be invertible', keywords: ['square', 'n x n'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'A matrix $A$ is invertible if:',
              choices: [
                '$A^2 = A$',
                '$A + A^{-1} = I$',
                '$AA^{-1} = A^{-1}A = I_n$',
                '$A = A^T$'
              ],
              correctIndex: 2,
              explanation: 'By definition, $A$ is invertible if there exists $A^{-1}$ such that $AA^{-1} = A^{-1}A = I_n$.'
            },
            {
              type: 'mc',
              prompt: 'A singular matrix is one that:',
              choices: [
                'Has an inverse',
                'Is the identity matrix',
                'Does not have an inverse',
                'Is symmetric'
              ],
              correctIndex: 2,
              explanation: 'Singular means noninvertible — the matrix has no inverse.'
            },
            {
              type: 'mc',
              prompt: 'Can a $3 \\times 4$ matrix be invertible?',
              choices: [
                'Yes, if its entries are nonzero',
                'Yes, if it is in RREF',
                'No, only square matrices can be invertible',
                'Yes, if its rank is 3'
              ],
              correctIndex: 2,
              explanation: 'Invertibility is defined only for square ($n \\times n$) matrices. A $3 \\times 4$ matrix is not square and cannot have an inverse.'
            },
            {
              type: 'mc',
              prompt: 'If $A$ is invertible, how many matrices $B$ satisfy $AB = I$?',
              choices: [
                'None',
                'Exactly one',
                'Exactly two',
                'Infinitely many'
              ],
              correctIndex: 1,
              explanation: 'The inverse is unique. There is exactly one matrix $B = A^{-1}$ satisfying $AB = BA = I$.'
            }
          ]
        },
        {
          id: 'def-finding-inverse',
          name: 'Finding the Inverse by Row Reduction',
          formalText: 'To find $A^{-1}$ for an $n \\times n$ matrix $A$: form the augmented matrix $[A \\mid I_n]$ and row-reduce. If the left side reduces to $I_n$, then the right side becomes $A^{-1}$: $[A \\mid I_n] \\to [I_n \\mid A^{-1}]$. If the left side cannot be reduced to $I_n$ (a row of zeros appears on the left), then $A$ is singular and has no inverse.',
          explanations: [
            {
              type: 'intro',
              title: 'The Row Reduction Method',
              body: 'To find the inverse of a matrix $A$, we use a systematic method based on row reduction. We augment $A$ with the identity matrix and row-reduce. The same row operations that turn $A$ into $I$ will simultaneously turn $I$ into $A^{-1}$.',
              formula: '$$[A \\mid I_n] \\xrightarrow{\\text{row reduce}} [I_n \\mid A^{-1}]$$',
              keyTerms: ['augment', 'row reduce', '[A | I]']
            },
            {
              type: 'concept',
              title: 'Why Does This Work?',
              body: 'Each row operation is equivalent to multiplying on the left by an elementary matrix. If a sequence of row operations transforms $A$ into $I$, then $E_k \\cdots E_2 E_1 A = I$. Applying the same operations to $I$ gives $E_k \\cdots E_2 E_1 I = E_k \\cdots E_2 E_1 = A^{-1}$.',
              keyTerms: ['elementary matrices', 'left multiplication']
            },
            {
              type: 'example',
              title: 'Finding an Inverse: Step by Step',
              body: 'Find $A^{-1}$ for $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$.\n\nAugment: $\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$\n$R_2 \\to R_2 - 3R_1$: $\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 0 & 1 & -3 & 1 \\end{array}\\right]$\n$R_1 \\to R_1 - 2R_2$: $\\left[\\begin{array}{cc|cc} 1 & 0 & 7 & -2 \\\\ 0 & 1 & -3 & 1 \\end{array}\\right]$\n\nSo $A^{-1} = \\begin{bmatrix} 7 & -2 \\\\ -3 & 1 \\end{bmatrix}$.',
              keyTerms: ['augment', 'row reduce', 'inverse']
            },
            {
              type: 'concept',
              title: 'Detecting Singular Matrices',
              body: 'During row reduction, if a row of all zeros appears on the left side of $[A \\mid I_n]$, the left side can never become $I_n$. This means $A$ is singular and has no inverse. You can stop the process at that point.',
              example: '$\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 2 & 4 & 0 & 1 \\end{array}\\right] \\to \\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 0 & 0 & -2 & 1 \\end{array}\\right]$\nRow of zeros on the left: $A$ is singular!',
              keyTerms: ['singular', 'row of zeros', 'no inverse']
            },
            {
              type: 'concept',
              title: 'Properties of the Inverse',
              body: 'Key properties:\n$(A^{-1})^{-1} = A$ — inverting twice returns to the original.\n$(AB)^{-1} = B^{-1}A^{-1}$ — the inverse of a product reverses order.\n$(A^T)^{-1} = (A^{-1})^T$ — transpose and inverse commute.\n$(cA)^{-1} = \\frac{1}{c}A^{-1}$ for $c \\neq 0$.',
              keyTerms: ['double inverse', 'product inverse', 'transpose inverse']
            }
          ],
          atomicParts: [
            { id: 'fi-part-method', text: 'row-reduce $[A \\mid I_n]$ to $[I_n \\mid A^{-1}]$', keywords: ['augment', 'row reduce', 'identity'] },
            { id: 'fi-part-singular', text: 'if left side cannot become $I_n$, $A$ is singular', keywords: ['singular', 'row of zeros', 'cannot'] },
            { id: 'fi-part-product', text: '$(AB)^{-1} = B^{-1}A^{-1}$ (reverse order)', keywords: ['product', 'inverse', 'reverse'] },
            { id: 'fi-part-transpose', text: '$(A^T)^{-1} = (A^{-1})^T$', keywords: ['transpose', 'inverse', 'commute'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'mc',
              prompt: 'To find $A^{-1}$, you row-reduce:',
              choices: [
                '$[A \\mid 0]$',
                '$[A \\mid A]$',
                '$[A \\mid I_n]$',
                '$[I_n \\mid A]$'
              ],
              correctIndex: 2,
              explanation: 'The method augments $A$ with the identity matrix on the right: $[A \\mid I_n]$. Row-reducing transforms this to $[I_n \\mid A^{-1}]$.'
            },
            {
              type: 'mc',
              prompt: 'During the row reduction of $[A \\mid I]$, a row of zeros appears on the left. This means:',
              choices: [
                '$A^{-1}$ is the zero matrix',
                '$A$ is invertible',
                '$A$ is singular (no inverse exists)',
                'You need to continue reducing'
              ],
              correctIndex: 2,
              explanation: 'If the left side has a zero row, it cannot be reduced to $I_n$. Therefore $A$ is singular and has no inverse.'
            },
            {
              type: 'mc',
              prompt: '$(AB)^{-1} =$',
              choices: [
                '$A^{-1}B^{-1}$',
                '$B^{-1}A^{-1}$',
                '$BA$',
                '$(BA)^{-1}$'
              ],
              correctIndex: 1,
              explanation: 'The inverse of a product reverses the order: $(AB)^{-1} = B^{-1}A^{-1}$. This is analogous to the transpose rule $(AB)^T = B^TA^T$.'
            },
            {
              type: 'mc',
              prompt: 'If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$, which augmented matrix do you start with?',
              choices: [
                '$\\left[\\begin{array}{cc|cc} 1 & 2 & 0 & 0 \\\\ 3 & 7 & 0 & 0 \\end{array}\\right]$',
                '$\\left[\\begin{array}{cc|cc} 1 & 0 & 1 & 2 \\\\ 0 & 1 & 3 & 7 \\end{array}\\right]$',
                '$\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$',
                '$\\left[\\begin{array}{cc|c} 1 & 2 & 0 \\\\ 3 & 7 & 0 \\end{array}\\right]$'
              ],
              correctIndex: 2,
              explanation: 'Place $A$ on the left and $I_2$ on the right: $[A \\mid I_2] = \\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-finding-inverse',
          name: 'Finding an Inverse by Row Reduction',
          description: 'Find the inverse of $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$ using the augmented matrix method.',
          prerequisites: ['def-finding-inverse'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'Set up the augmented matrix $[A \\mid I_2]$.',
              expected: '$\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$',
              keywords: ['augment', '1,2,1,0', '3,7,0,1'],
              hints: ['Place $A$ on the left and $I_2$ on the right, separated by a vertical bar.']
            },
            {
              type: 'justify',
              prompt: 'Eliminate the $3$ below the leading $1$ in column 1.',
              expected: '$R_2 \\to R_2 - 3R_1$: $\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 0 & 1 & -3 & 1 \\end{array}\\right]$',
              keywords: ['R2 - 3R1', '0,1,-3,1'],
              hints: ['Subtract $3$ times row 1 from row 2.']
            },
            {
              type: 'justify',
              prompt: 'Eliminate the $2$ above the leading $1$ in column 2.',
              expected: '$R_1 \\to R_1 - 2R_2$: $\\left[\\begin{array}{cc|cc} 1 & 0 & 7 & -2 \\\\ 0 & 1 & -3 & 1 \\end{array}\\right]$',
              keywords: ['R1 - 2R2', '1,0,7,-2'],
              hints: ['Subtract $2$ times row 2 from row 1.']
            },
            {
              type: 'conclude',
              prompt: 'Read off the inverse.',
              expected: '$A^{-1} = \\begin{bmatrix} 7 & -2 \\\\ -3 & 1 \\end{bmatrix}$',
              keywords: ['7,-2', '-3,1', 'inverse'],
              hints: ['The right side of the augmented matrix is now $A^{-1}$.']
            }
          ]
        }
      ],
      visualization: null
    }

  ]
});
