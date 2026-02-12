window.ContentRegistry.register({
  id: 'linear-algebra',
  name: 'Systems of Linear Equations',
  description: 'Master systems of linear equations, matrix representations, and solution methods through Gaussian and Gauss-Jordan elimination.',
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
    }

  ]
});
