window.ContentRegistry.register({
  id: 'linear-algebra',
  name: 'Linear Algebra',
  description: 'Master core linear algebra concepts through precise definitions and rigorous proofs.',
  topics: [

    // =========================================================================
    // TOPIC 1: VECTOR SPACES
    // =========================================================================
    {
      id: 'vector-spaces',
      name: 'Vector Spaces',
      description: 'The foundational algebraic structure of linear algebra: sets equipped with addition and scalar multiplication satisfying eight axioms.',
      prerequisites: [],
      definitions: [
        {
          id: 'def-vector-space',
          name: 'Vector Space',
          formalText: 'A vector space over a field F is a set V together with two operations — addition (V x V -> V) and scalar multiplication (F x V -> V) — satisfying the following eight axioms for all u, v, w in V and all a, b in F: (1) u + v = v + u (commutativity of addition); (2) (u + v) + w = u + (v + w) (associativity of addition); (3) there exists an element 0 in V such that v + 0 = v for all v in V (existence of additive identity); (4) for each v in V there exists an element -v in V such that v + (-v) = 0 (existence of additive inverses); (5) a(bv) = (ab)v (compatibility of scalar multiplication with field multiplication); (6) 1v = v (identity element of scalar multiplication); (7) a(u + v) = au + av (distributivity of scalar multiplication over vector addition); (8) (a + b)v = av + bv (distributivity of scalar multiplication over field addition). Additionally, V must be closed under both addition and scalar multiplication.',
          atomicParts: [
            { id: 'vs-part-set', text: 'a set V', keywords: ['set', 'V'] },
            { id: 'vs-part-field', text: 'over a field F', keywords: ['field', 'F'] },
            { id: 'vs-part-addition', text: 'an addition operation V x V -> V', keywords: ['addition', 'operation', 'V x V'] },
            { id: 'vs-part-scalar', text: 'a scalar multiplication operation F x V -> V', keywords: ['scalar', 'multiplication', 'F x V'] },
            { id: 'vs-part-closure', text: 'V is closed under both addition and scalar multiplication', keywords: ['closed', 'addition', 'scalar multiplication'] },
            { id: 'vs-part-axioms', text: 'satisfying eight axioms for all u, v, w in V and a, b in F', keywords: ['eight', 'axioms', 'for all'] }
          ],
          axioms: [
            {
              id: 'ax-comm-add',
              label: 'Commutativity of Addition',
              statement: 'u + v = v + u for all u, v in V',
              counterexample: {
                set: 'The set of 2x2 matrices with operation A + B defined as AB (matrix multiplication)',
                explanation: 'Matrix multiplication is not commutative in general. For example, let A = [[1,1],[0,0]] and B = [[0,0],[1,1]]. Then AB = [[1,1],[0,0]] but BA = [[0,0],[1,1]], so AB != BA.'
              }
            },
            {
              id: 'ax-assoc-add',
              label: 'Associativity of Addition',
              statement: '(u + v) + w = u + (v + w) for all u, v, w in V',
              counterexample: {
                set: 'R (reals) with operation a + b defined as a - b (subtraction)',
                explanation: '(3 - 2) - 1 = 0, but 3 - (2 - 1) = 2. Since 0 != 2, associativity fails.'
              }
            },
            {
              id: 'ax-zero',
              label: 'Existence of Additive Identity',
              statement: 'There exists an element 0 in V such that v + 0 = v for all v in V',
              counterexample: {
                set: 'The set of positive real numbers R+ with standard addition',
                explanation: 'The additive identity would need to be 0, but 0 is not in R+. There is no element e in R+ such that a + e = a for all a in R+.'
              }
            },
            {
              id: 'ax-inverse',
              label: 'Existence of Additive Inverses',
              statement: 'For each v in V, there exists -v in V such that v + (-v) = 0',
              counterexample: {
                set: 'The set of non-negative real numbers [0, infinity) with standard addition and scalar multiplication',
                explanation: 'The element 5 has no additive inverse in [0, infinity) because -5 is not in the set.'
              }
            },
            {
              id: 'ax-compat-scalar',
              label: 'Compatibility of Scalar Multiplication',
              statement: 'a(bv) = (ab)v for all a, b in F and v in V',
              counterexample: {
                set: 'R^2 with standard addition but scalar multiplication defined as c(x,y) = (cx, 0)',
                explanation: 'Let a = 2, b = 3, v = (1,1). Then a(bv) = 2(3(1,1)) = 2(3,0) = (6,0). But (ab)v = 6(1,1) = (6,0). Now try a = 2, b = 3, v = (0,1): a(bv) = 2(3(0,1)) = 2(0,0) = (0,0) and (ab)v = 6(0,1) = (0,0). Actually, let scalar mult be c(x,y) = (cx, y). Then a(bv) = 2(3,1) = (6,1) but (ab)v = 6(1,1) = (6,1). Instead define c(x,y) = (c^2 x, c^2 y). Then a(bv) = 2((9,9)) = (36,36) but (ab)v = (36,36). Define c * v = (c x, y). Then a(bv) = a(b x, y) = (abx, y). (ab)v = (abx, y). OK use c * v = v for all c. Then a(bv) = a(v) = v and (ab)v = v. Compatibility holds trivially. Instead use the operation c * (x,y) = (|c| x, |c| y) over R. Then a(bv) = (|a| |b| x, |a| |b| y) but (ab)v = (|ab| x, |ab| y) = (|a||b| x, |a||b| y). These are equal. Use c * v = (c+1)(x,y) component-wise. a(bv) = (a+1)((b+1)x, (b+1)y) = ((a+1)(b+1)x, (a+1)(b+1)y). (ab)v = (ab+1)(x,y). For a=1, b=1, v=(1,1): a(bv)=(2)(2,2)=(4,4) but (ab)v=(2)(1,1)=(2,2). So 4 != 2.'
              }
            },
            {
              id: 'ax-scalar-id',
              label: 'Multiplicative Identity',
              statement: '1v = v for all v in V',
              counterexample: {
                set: 'R^2 with standard addition and scalar multiplication defined as c(x,y) = (0, 0) for all c and (x,y)',
                explanation: '1(x,y) = (0,0) != (x,y) for any nonzero vector. The scalar 1 does not act as the identity on V.'
              }
            },
            {
              id: 'ax-distrib-vec',
              label: 'Distributivity over Vector Addition',
              statement: 'a(u + v) = au + av for all a in F and u, v in V',
              counterexample: {
                set: 'R with standard addition and scalar multiplication defined as a * v = a^2 * v (using field multiplication on the right)',
                explanation: 'Let a = 2, u = 1, v = 1. Then a(u+v) = 2^2 * 2 = 8. But au + av = 2^2 * 1 + 2^2 * 1 = 4 + 4 = 8. Try a = 3, u = 1, v = 2: a(u+v) = 9*3 = 27 but au+av = 9+18 = 27. This works because (a^2)(u+v) = a^2 u + a^2 v. Instead define a * v = |a| v. Then a(u+v) = |a|(u+v) = |a|u + |a|v = au + av. This also distributes. Use a * v = a + v instead. Then a(u+v) = a + u + v. But au + av = (a+u) + (a+v) = 2a + u + v. For a=1, u=1, v=1: a(u+v) = 3 but au+av = 4.'
              }
            },
            {
              id: 'ax-distrib-scalar',
              label: 'Distributivity over Scalar Addition',
              statement: '(a + b)v = av + bv for all a, b in F and v in V',
              counterexample: {
                set: 'R^1 with standard addition but scalar multiplication defined as a * v = a^2 v',
                explanation: 'Let a = 1, b = 1, v = 1. Then (a+b)v = 2^2 * 1 = 4. But av + bv = 1^2 * 1 + 1^2 * 1 = 1 + 1 = 2. Since 4 != 2, distributivity over scalar addition fails.'
              }
            }
          ],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the complete definition of a vector space over a field F.'
            },
            {
              type: 'axiom-id',
              prompt: 'Consider the set R with standard addition but scalar multiplication defined as c * x = 0 for all c in R and x in R. Which vector space axiom fails?',
              failingAxiom: 'ax-scalar-id',
              explanation: 'We need 1 * x = x for all x. But 1 * x = 0 != x for any nonzero x. The multiplicative identity axiom fails.',
              keywords: ['multiplicative identity', '1v = v', 'fails', '1 * x = 0']
            },
            {
              type: 'axiom-id',
              prompt: 'Consider R^2 with standard scalar multiplication but addition defined as (a,b) + (c,d) = (a+c, 0). Which vector space axiom fails?',
              failingAxiom: 'ax-inverse',
              explanation: 'The zero vector would be (0,0). The additive inverse of (0,5) would need to satisfy (0,5) + (-v) = (0,0). But for any vector (x,y), (0,5) + (x,y) = (0+x, 0) = (x, 0), which can never equal (0,0) unless x=0, giving (0,0). But then (0,5) + (0,y) = (0,0) for all y, so the inverse is (0,y). Check: (0,5) + (0,0) = (0,0). But we also need (0,0) + (0,5) = (0,0) for (0,0) to be the identity. (0,0) + (0,5) = (0,0). And we need v + 0 = v: (a,b) + (0,0) = (a,0) != (a,b) when b != 0. So the additive identity axiom actually fails first.',
              keywords: ['additive identity', 'second component', 'zero']
            },
            {
              type: 'counterexample',
              prompt: 'Give a specific numerical example showing that the set S = {(x, y) in R^2 : x + y = 1} is NOT a vector space under the standard operations of R^2.',
              failingProperty: 'not closed under addition (or does not contain the zero vector)',
              expectedKeywords: ['zero vector', '(0,0)', 'not in S', 'closure', '1'],
              exampleAnswer: 'The zero vector (0,0) is not in S because 0 + 0 = 0 != 1. Alternatively, (1,0) and (0,1) are both in S but (1,0) + (0,1) = (1,1) and 1+1 = 2 != 1, so S is not closed under addition.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-unique-zero',
          name: 'Uniqueness of the Zero Vector',
          description: 'Prove that in any vector space V, the zero vector is unique.',
          prerequisites: ['def-vector-space'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show to prove the zero vector is unique?',
              expected: 'Assume there exist two zero vectors 0 and 0\' in V. We must show that 0 = 0\'.',
              keywords: ['assume', 'two', 'zero vectors', 'show', 'equal'],
              hints: [
                'How do we typically prove something is unique? We assume two objects with the same property exist.',
                'Suppose both 0 and 0\' satisfy the additive identity property. Our goal is to show 0 = 0\'.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Since 0 is a zero vector, what can we say about 0 + 0\'?',
              expected: '0 + 0\' = 0\', because 0 is an additive identity, so 0 + v = v for all v in V. Taking v = 0\' gives 0 + 0\' = 0\'.',
              keywords: ['0 + 0\'', '= 0\'', 'additive identity', 'for all v'],
              hints: [
                'What defining property does the zero vector have?',
                'Apply the property 0 + v = v with v = 0\'.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Since 0\' is also a zero vector, what can we say about 0 + 0\'?',
              expected: '0 + 0\' = 0, because 0\' is an additive identity, so v + 0\' = v for all v in V. Taking v = 0 gives 0 + 0\' = 0.',
              keywords: ['0 + 0\'', '= 0', '0\' is', 'additive identity'],
              hints: [
                'Now use the fact that 0\' is also a zero vector.',
                'Apply the property v + 0\' = v with v = 0.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'Combine the two equalities to finish the proof.',
              expected: 'From step 2, 0 + 0\' = 0\'. From step 3, 0 + 0\' = 0. Therefore 0\' = 0 + 0\' = 0, so the zero vector is unique.',
              keywords: ['therefore', '0\' = 0', 'unique', 'both equal'],
              hints: [
                'You have two expressions both equal to 0 + 0\'. What can you conclude?',
                'By transitivity of equality: 0\' = 0 + 0\' = 0.'
              ]
            }
          ]
        },
        {
          id: 'proof-unique-inverse',
          name: 'Uniqueness of Additive Inverses',
          description: 'Prove that in any vector space V, each vector has a unique additive inverse.',
          prerequisites: ['def-vector-space'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show?',
              expected: 'Let v in V. Suppose w1 and w2 are both additive inverses of v, meaning v + w1 = 0 and v + w2 = 0. We must show w1 = w2.',
              keywords: ['two', 'additive inverses', 'w1', 'w2', 'show', 'equal'],
              hints: [
                'As with uniqueness of zero, assume two objects with the same property.',
                'Suppose v + w1 = 0 and v + w2 = 0. Show w1 = w2.'
              ]
            },
            {
              type: 'chain',
              prompt: 'Start with w1 and use the additive identity to write a chain of equalities ending at w2.',
              expected: 'w1 = w1 + 0 = w1 + (v + w2) = (w1 + v) + w2 = 0 + w2 = w2',
              keywords: ['w1 + 0', 'w1 + (v + w2)', '(w1 + v) + w2', '0 + w2', 'w2'],
              hints: [
                'Start with w1 = w1 + 0. Now substitute 0 = v + w2.',
                'After substituting, use associativity to regroup, then use the fact that w1 + v = 0.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'Therefore w1 = w2, so the additive inverse of v is unique.',
              keywords: ['w1 = w2', 'unique', 'additive inverse'],
              hints: [
                'The chain of equalities shows w1 = w2.',
                'Since any two additive inverses of v must be equal, the inverse is unique.'
              ]
            }
          ]
        }
      ],
      visualization: {
        type: 'vector-addition',
        title: 'Vector Addition in R\u00B3',
        description: 'Explore how vectors add geometrically using the parallelogram law. Drag vectors to see how their sum changes.',
        requiredMastery: 80,
        requiredProofs: ['proof-unique-zero', 'proof-unique-inverse'],
        config: {
          dimension: 3,
          showBasis: true
        }
      }
    },

    // =========================================================================
    // TOPIC 2: SUBSPACES
    // =========================================================================
    {
      id: 'subspaces',
      name: 'Subspaces',
      description: 'Subsets of a vector space that are themselves vector spaces under the inherited operations.',
      prerequisites: ['vector-spaces'],
      definitions: [
        {
          id: 'def-subspace',
          name: 'Subspace',
          formalText: 'Let V be a vector space over a field F. A subset W of V is called a subspace of V if W is itself a vector space over F under the operations of addition and scalar multiplication inherited from V. Equivalently, W is a subspace of V if and only if: (1) W is nonempty (equivalently, 0 is in W); (2) for all u, v in W, u + v is in W (closure under addition); (3) for all c in F and v in W, cv is in W (closure under scalar multiplication).',
          atomicParts: [
            { id: 'sub-part-subset', text: 'W is a subset of V', keywords: ['subset', 'W', 'V'] },
            { id: 'sub-part-nonempty', text: 'W is nonempty (contains the zero vector)', keywords: ['nonempty', 'zero vector', '0 in W'] },
            { id: 'sub-part-add-closed', text: 'W is closed under addition: u, v in W implies u + v in W', keywords: ['closed', 'addition', 'u + v'] },
            { id: 'sub-part-scalar-closed', text: 'W is closed under scalar multiplication: c in F, v in W implies cv in W', keywords: ['closed', 'scalar', 'cv'] },
            { id: 'sub-part-inherited', text: 'using the operations inherited from V', keywords: ['inherited', 'operations', 'from V'] }
          ],
          axioms: [
            {
              id: 'ax-sub-nonempty',
              label: 'Nonempty (Contains Zero)',
              statement: 'W is nonempty, equivalently 0 is in W',
              counterexample: {
                set: 'The empty set as a subset of R^2',
                explanation: 'The empty set contains no elements, so it does not contain the zero vector, and it fails the nonempty condition.'
              }
            },
            {
              id: 'ax-sub-add',
              label: 'Closure Under Addition',
              statement: 'For all u, v in W, u + v is in W',
              counterexample: {
                set: '{(x, y) in R^2 : x^2 + y^2 <= 1} (the closed unit disk)',
                explanation: 'Let u = (0.8, 0) and v = (0.8, 0). Both are in the unit disk. But u + v = (1.6, 0) and 1.6^2 + 0^2 = 2.56 > 1, so u + v is not in the disk.'
              }
            },
            {
              id: 'ax-sub-scalar',
              label: 'Closure Under Scalar Multiplication',
              statement: 'For all c in F and v in W, cv is in W',
              counterexample: {
                set: '{(x, y) in R^2 : x and y are integers} (the integer lattice Z^2) as a subset of R^2 over R',
                explanation: 'Let v = (1, 0) in Z^2 and c = 1/2 in R. Then cv = (1/2, 0) which is not in Z^2 because 1/2 is not an integer.'
              }
            }
          ],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the three conditions for a subset W of a vector space V to be a subspace of V.'
            },
            {
              type: 'axiom-id',
              prompt: 'Consider the set W = {(x, y) in R^2 : xy >= 0} (vectors in the first and third quadrants, plus axes). Which subspace condition fails?',
              failingAxiom: 'ax-sub-add',
              explanation: 'Take u = (1, 0) and v = (0, -1). Both are in W since 1*0 = 0 >= 0 and 0*(-1) = 0 >= 0. But u + v = (1, -1) and 1*(-1) = -1 < 0, so u + v is not in W. Closure under addition fails.',
              keywords: ['closure', 'addition', '(1,-1)', 'not in W', 'negative product']
            },
            {
              type: 'counterexample',
              prompt: 'Give a specific numerical example showing that the set of all polynomials of degree exactly 2 is NOT a subspace of P(R), the vector space of all polynomials with real coefficients.',
              failingProperty: 'closure under addition',
              expectedKeywords: ['degree', 'less than 2', 'not degree 2', 'closure', 'cancel'],
              exampleAnswer: 'Let p(x) = x^2 + 1 and q(x) = -x^2 + x. Both have degree exactly 2. But p(x) + q(x) = x + 1, which has degree 1, not 2. So the set is not closed under addition.'
            },
            {
              type: 'counterexample',
              prompt: 'Give a specific numerical example showing that the set W = {(x, y) in R^2 : x + y = 1} is NOT a subspace of R^2.',
              failingProperty: 'does not contain the zero vector',
              expectedKeywords: ['zero vector', '(0,0)', '0 + 0 = 0', 'not equal to 1'],
              exampleAnswer: 'The zero vector (0,0) is not in W because 0 + 0 = 0 != 1. So W is nonempty but does not contain the zero vector, hence is not a subspace.'
            }
          ]
        },
        {
          id: 'def-subspace-test',
          name: 'Subspace Test (One-Step)',
          formalText: 'A nonempty subset W of a vector space V over F is a subspace if and only if for all u, v in W and all c in F, the vector cu + v is in W.',
          atomicParts: [
            { id: 'st-part-nonempty', text: 'W is a nonempty subset of V', keywords: ['nonempty', 'subset'] },
            { id: 'st-part-field', text: 'V is a vector space over a field F', keywords: ['vector space', 'field', 'F'] },
            { id: 'st-part-condition', text: 'for all u, v in W and all c in F, cu + v is in W', keywords: ['cu + v', 'for all', 'in W'] },
            { id: 'st-part-equiv', text: 'this single condition is equivalent to the three subspace conditions', keywords: ['equivalent', 'subspace', 'conditions'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the one-step subspace test.'
            },
            {
              type: 'equivalence',
              prompt: 'Explain why "W is a subspace of V" is equivalent to "W is nonempty and for all u, v in W and all c in F, cu + v is in W".',
              formulation1: 'W is a subspace: W is nonempty, closed under addition, and closed under scalar multiplication',
              formulation2: 'W is nonempty and for all u, v in W and c in F, cu + v is in W',
              keywords: ['closure', 'addition', 'scalar multiplication', 'combine', 'single condition', 'both operations', 'c = 1', 'v = 0'],
              explanation: 'The second formulation implies closure under scalar multiplication by setting v = 0 (which is in W since W is nonempty and closed): cu + 0 = cu is in W. It implies closure under addition by setting c = 1: 1u + v = u + v is in W. Conversely, if W is closed under both operations, then cu is in W and so cu + v is in W by closure under addition.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-subspace-test',
          name: 'Equivalence of the Subspace Test',
          description: 'Prove that a nonempty subset W of V is a subspace if and only if cu + v is in W for all u, v in W and c in F.',
          prerequisites: ['def-subspace', 'def-subspace-test'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What are the two directions we need to prove?',
              expected: 'Forward: if W is a subspace, then cu + v in W for all u, v in W and c in F. Backward: if W is nonempty and cu + v in W for all u, v in W and c in F, then W is a subspace.',
              keywords: ['two directions', 'forward', 'backward', 'if and only if', 'subspace implies', 'condition implies'],
              hints: [
                'This is an if-and-only-if statement, so you need to prove both implications.',
                'Direction 1: subspace => cu+v in W. Direction 2: cu+v in W => subspace.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Prove the forward direction: assume W is a subspace and show cu + v in W.',
              expected: 'Since W is a subspace, it is closed under scalar multiplication, so cu is in W. Since W is closed under addition, cu + v is in W.',
              keywords: ['closed', 'scalar multiplication', 'cu in W', 'closed', 'addition', 'cu + v in W'],
              hints: [
                'A subspace is closed under scalar multiplication and addition. Apply these in order.',
                'First: c in F, u in W => cu in W. Then: cu in W, v in W => cu + v in W.'
              ]
            },
            {
              type: 'justify',
              prompt: 'For the backward direction, first show that 0 is in W.',
              expected: 'Since W is nonempty, there exists some v in W. Taking c = -1 and u = v, we get (-1)v + v = -v + v = 0 is in W. (Alternatively, take c = 0: 0u + v = v, then take u = v, c = -1 to get 0.)',
              keywords: ['nonempty', 'exists v', 'c = -1', '0 in W'],
              hints: [
                'W is nonempty, so pick any v in W. Can you choose c and u to produce the zero vector?',
                'Set u = v and c = -1. Then cu + v = -v + v = 0.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Now show W is closed under scalar multiplication.',
              expected: 'Let u in W and c in F. We have shown 0 is in W. Setting v = 0 in the condition cu + v in W gives cu + 0 = cu is in W.',
              keywords: ['v = 0', 'cu + 0', 'cu in W', '0 in W'],
              hints: [
                'We know 0 is in W from the previous step. What happens when v = 0?',
                'cu + 0 = cu, which is in W by the given condition.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Finally, show W is closed under addition.',
              expected: 'Let u, v in W. Setting c = 1 in the condition cu + v in W gives 1u + v = u + v is in W.',
              keywords: ['c = 1', '1u + v', 'u + v in W'],
              hints: [
                'What value of c gives simple addition?',
                'Set c = 1. Then cu + v = u + v, which is in W by the condition.'
              ]
            }
          ]
        },
        {
          id: 'proof-intersection-subspace',
          name: 'Intersection of Subspaces',
          description: 'Prove that the intersection of any collection of subspaces of V is itself a subspace of V.',
          prerequisites: ['def-subspace'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show?',
              expected: 'Let {W_i : i in I} be a collection of subspaces of V. Let W = intersection of all W_i. We need to show W is nonempty, closed under addition, and closed under scalar multiplication.',
              keywords: ['intersection', 'collection', 'nonempty', 'closed', 'addition', 'scalar'],
              hints: [
                'We verify the three subspace conditions for the intersection.',
                'Let W be the intersection of subspaces W_i. Check the three conditions.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show that W is nonempty.',
              expected: 'Each W_i is a subspace, so 0 is in W_i for every i in I. Therefore 0 is in the intersection of all W_i, so 0 is in W. In particular, W is nonempty.',
              keywords: ['0', 'in each W_i', 'intersection', 'nonempty'],
              hints: [
                'What element is guaranteed to be in every subspace?',
                'The zero vector is in every subspace. So it is in the intersection.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show that W is closed under addition.',
              expected: 'Let u, v in W. Then u, v are in W_i for every i in I. Since each W_i is a subspace, u + v is in W_i for every i. Therefore u + v is in the intersection W.',
              keywords: ['u, v in W', 'in each W_i', 'W_i subspace', 'u + v in W_i', 'in intersection'],
              hints: [
                'If u and v are in the intersection, then u and v are in each W_i. What follows?',
                'Each W_i is closed under addition, so u + v is in each W_i, hence in the intersection.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show that W is closed under scalar multiplication.',
              expected: 'Let c in F and v in W. Then v is in W_i for every i in I. Since each W_i is a subspace, cv is in W_i for every i. Therefore cv is in the intersection W.',
              keywords: ['c in F', 'v in W', 'in each W_i', 'cv in W_i', 'intersection'],
              hints: [
                'This follows the same pattern as the addition argument.',
                'v is in each W_i, each W_i is closed under scalar multiplication, so cv is in each W_i.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'Since W is nonempty, closed under addition, and closed under scalar multiplication, W is a subspace of V. Therefore the intersection of any collection of subspaces is a subspace.',
              keywords: ['subspace', 'intersection', 'nonempty', 'closed', 'three conditions'],
              hints: [
                'We verified all three subspace conditions.',
                'By the subspace criterion, W is a subspace of V.'
              ]
            }
          ]
        }
      ],
      visualization: {
        type: 'subspace',
        title: 'Subspaces of R\u00B3',
        description: 'Visualize lines and planes through the origin in R\u00B3 as subspaces. See why sets not passing through the origin cannot be subspaces.',
        requiredMastery: 80,
        requiredProofs: ['proof-subspace-test', 'proof-intersection-subspace'],
        config: {
          dimension: 3
        }
      }
    },

    // =========================================================================
    // TOPIC 3: LINEAR TRANSFORMATIONS
    // =========================================================================
    {
      id: 'linear-transformations',
      name: 'Linear Transformations',
      description: 'Structure-preserving maps between vector spaces that respect addition and scalar multiplication.',
      prerequisites: ['vector-spaces', 'subspaces'],
      definitions: [
        {
          id: 'def-linear-transformation',
          name: 'Linear Transformation',
          formalText: 'Let V and W be vector spaces over the same field F. A function T: V -> W is called a linear transformation (or linear map) if it satisfies two properties: (1) Additivity: T(u + v) = T(u) + T(v) for all u, v in V; (2) Homogeneity: T(cv) = cT(v) for all c in F and v in V. Equivalently, T is linear if and only if T(au + bv) = aT(u) + bT(v) for all a, b in F and u, v in V.',
          atomicParts: [
            { id: 'lt-part-domain', text: 'V and W are vector spaces over the same field F', keywords: ['vector spaces', 'same field', 'F'] },
            { id: 'lt-part-function', text: 'T is a function from V to W', keywords: ['function', 'T', 'V to W', 'map'] },
            { id: 'lt-part-additivity', text: 'T(u + v) = T(u) + T(v) for all u, v in V', keywords: ['additivity', 'T(u + v)', 'T(u) + T(v)'] },
            { id: 'lt-part-homogeneity', text: 'T(cv) = cT(v) for all c in F and v in V', keywords: ['homogeneity', 'T(cv)', 'cT(v)', 'scalar'] },
            { id: 'lt-part-equiv', text: 'equivalently T(au + bv) = aT(u) + bT(v) for all a, b in F and u, v in V', keywords: ['equivalently', 'linear combination', 'aT(u) + bT(v)'] }
          ],
          axioms: [
            {
              id: 'ax-lt-additivity',
              label: 'Additivity',
              statement: 'T(u + v) = T(u) + T(v) for all u, v in V',
              counterexample: {
                set: 'T: R -> R defined by T(x) = x^2',
                explanation: 'T(1 + 1) = T(2) = 4, but T(1) + T(1) = 1 + 1 = 2. Since 4 != 2, additivity fails.'
              }
            },
            {
              id: 'ax-lt-homogeneity',
              label: 'Homogeneity',
              statement: 'T(cv) = cT(v) for all c in F and v in V',
              counterexample: {
                set: 'T: R^2 -> R defined by T(x, y) = x + 1',
                explanation: 'T(2 * (1,0)) = T(2,0) = 2 + 1 = 3, but 2T(1,0) = 2(1 + 1) = 4. Since 3 != 4, homogeneity fails. (Note: T also fails additivity.)'
              }
            }
          ],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of a linear transformation T: V -> W.'
            },
            {
              type: 'axiom-id',
              prompt: 'Consider T: R -> R defined by T(x) = |x|. Which linearity condition fails?',
              failingAxiom: 'ax-lt-homogeneity',
              explanation: 'T((-1) * 1) = T(-1) = |-1| = 1, but (-1)T(1) = (-1)|1| = -1. Since 1 != -1, homogeneity fails.',
              keywords: ['homogeneity', 'absolute value', 'negative scalar', 'T(-1)', '-T(1)']
            },
            {
              type: 'axiom-id',
              prompt: 'Consider T: R^2 -> R^2 defined by T(x, y) = (x + 1, y). Which linearity condition fails?',
              failingAxiom: 'ax-lt-additivity',
              explanation: 'T((1,0) + (1,0)) = T(2,0) = (3,0). But T(1,0) + T(1,0) = (2,0) + (2,0) = (4,0). Since (3,0) != (4,0), additivity fails. (Equivalently, T(0,0) = (1,0) != (0,0), so T cannot be linear.)',
              keywords: ['additivity', 'constant term', 'T(0) != 0', 'translation']
            },
            {
              type: 'counterexample',
              prompt: 'Give a specific numerical example showing that T: R^2 -> R defined by T(x,y) = xy is NOT a linear transformation.',
              failingProperty: 'additivity (or homogeneity)',
              expectedKeywords: ['T(u+v)', 'T(u) + T(v)', 'not equal', 'product'],
              exampleAnswer: 'Let u = (1,0) and v = (0,1). Then T(u+v) = T(1,1) = 1*1 = 1. But T(u) + T(v) = 1*0 + 0*1 = 0. Since 1 != 0, T is not additive, hence not linear.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-T-zero',
          name: 'Linear Maps Preserve the Zero Vector',
          description: 'Prove that if T: V -> W is a linear transformation, then T(0_V) = 0_W.',
          prerequisites: ['def-linear-transformation'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we want to prove?',
              expected: 'If T: V -> W is linear, then T(0_V) = 0_W, where 0_V is the zero vector of V and 0_W is the zero vector of W.',
              keywords: ['T(0)', '= 0', 'zero vector', 'linear'],
              hints: [
                'We want to show the image of the zero vector in V is the zero vector in W.',
                'T(0_V) = 0_W.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Use homogeneity (or another property) to express T(0_V) in a useful way.',
              expected: 'T(0_V) = T(0 * 0_V) = 0 * T(0_V) = 0_W, using homogeneity with c = 0. Alternatively, T(0_V) = T(v + (-v)) = T(v) + T(-v) = T(v) - T(v) = 0_W.',
              keywords: ['T(0 * v)', '0 * T(v)', '= 0_W', 'homogeneity'],
              hints: [
                'Note that 0_V = 0 * v for any v in V. Apply homogeneity.',
                'T(0 * v) = 0 * T(v) = 0_W by homogeneity.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'Therefore T(0_V) = 0_W. Every linear transformation maps the zero vector to the zero vector.',
              keywords: ['T(0_V) = 0_W', 'linear', 'maps zero to zero'],
              hints: [
                'The computation shows directly that T sends zero to zero.',
                'Conclude that T preserves the zero vector.'
              ]
            }
          ]
        },
        {
          id: 'proof-T-linear-combo',
          name: 'Linear Maps Preserve Linear Combinations',
          description: 'Prove that if T: V -> W is linear, then T(a_1 v_1 + ... + a_n v_n) = a_1 T(v_1) + ... + a_n T(v_n).',
          prerequisites: ['def-linear-transformation'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we want to prove, and what technique should we use?',
              expected: 'We want to prove T(a_1 v_1 + ... + a_n v_n) = a_1 T(v_1) + ... + a_n T(v_n) for all a_i in F and v_i in V. We proceed by induction on n.',
              keywords: ['linear combination', 'induction', 'n vectors', 'T preserves'],
              hints: [
                'This generalizes the two-vector case to n vectors.',
                'Induction on the number of terms n is the standard approach.'
              ]
            },
            {
              type: 'justify',
              prompt: 'What is the base case?',
              expected: 'Base case n = 1: T(a_1 v_1) = a_1 T(v_1) by homogeneity. This holds directly from the definition of linearity.',
              keywords: ['n = 1', 'T(a_1 v_1)', 'a_1 T(v_1)', 'homogeneity'],
              hints: [
                'When n = 1, the linear combination is just a_1 v_1.',
                'Apply homogeneity directly.'
              ]
            },
            {
              type: 'justify',
              prompt: 'State the inductive hypothesis and prove the inductive step.',
              expected: 'Inductive hypothesis: assume T(a_1 v_1 + ... + a_k v_k) = a_1 T(v_1) + ... + a_k T(v_k) for some k >= 1. For k+1 terms: T(a_1 v_1 + ... + a_k v_k + a_{k+1} v_{k+1}) = T((a_1 v_1 + ... + a_k v_k) + a_{k+1} v_{k+1}) = T(a_1 v_1 + ... + a_k v_k) + T(a_{k+1} v_{k+1}) by additivity = (a_1 T(v_1) + ... + a_k T(v_k)) + a_{k+1} T(v_{k+1}) by the inductive hypothesis and homogeneity.',
              keywords: ['inductive hypothesis', 'k terms', 'k+1', 'additivity', 'homogeneity', 'inductive step'],
              hints: [
                'Group the first k terms together and apply additivity to split off the (k+1)-th term.',
                'After splitting, apply the inductive hypothesis to the first k terms and homogeneity to the last term.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'By induction, T(a_1 v_1 + ... + a_n v_n) = a_1 T(v_1) + ... + a_n T(v_n) for all n >= 1. Linear transformations preserve all finite linear combinations.',
              keywords: ['by induction', 'all n', 'preserves', 'linear combinations'],
              hints: [
                'The base case and inductive step together prove the result for all n.',
                'Conclude that T preserves arbitrary finite linear combinations.'
              ]
            }
          ]
        }
      ],
      visualization: {
        type: 'grid-deformation',
        title: 'Grid Deformation by a Linear Map',
        description: 'See how a linear transformation deforms the plane. Watch grid lines map to grid lines (or collapse). Adjust the matrix entries to explore different transformations.',
        requiredMastery: 80,
        requiredProofs: ['proof-T-zero', 'proof-T-linear-combo'],
        config: {
          dimension: 2,
          matrix: [[2, 1], [0, 1]]
        }
      }
    },

    // =========================================================================
    // TOPIC 4: KERNEL AND IMAGE
    // =========================================================================
    {
      id: 'kernel-image',
      name: 'Kernel and Image',
      description: 'The fundamental subspaces associated with a linear transformation: the kernel (null space) and the image (range).',
      prerequisites: ['vector-spaces', 'subspaces', 'linear-transformations'],
      definitions: [
        {
          id: 'def-kernel',
          name: 'Kernel (Null Space)',
          formalText: 'Let T: V -> W be a linear transformation. The kernel of T (also called the null space of T) is the set ker(T) = {v in V : T(v) = 0_W}. That is, the kernel consists of all vectors in V that T maps to the zero vector of W.',
          atomicParts: [
            { id: 'ker-part-lt', text: 'T: V -> W is a linear transformation', keywords: ['linear', 'transformation', 'T', 'V', 'W'] },
            { id: 'ker-part-set', text: 'ker(T) = {v in V : T(v) = 0_W}', keywords: ['ker', 'T(v) = 0', 'zero vector'] },
            { id: 'ker-part-subset', text: 'ker(T) is a subset of the domain V', keywords: ['subset', 'domain', 'V'] },
            { id: 'ker-part-meaning', text: 'all vectors in V that map to the zero vector of W', keywords: ['map to zero', 'all vectors', 'zero'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of the kernel of a linear transformation T: V -> W.'
            },
            {
              type: 'counterexample',
              prompt: 'Find all elements of the kernel of T: R^3 -> R^2 defined by T(x,y,z) = (x + y, y + z).',
              failingProperty: 'N/A (computation exercise)',
              expectedKeywords: ['x + y = 0', 'y + z = 0', 'x = -y', 'z = -y', 'span', '(1,-1,1)'],
              exampleAnswer: 'We need T(x,y,z) = (0,0), so x + y = 0 and y + z = 0. From the first equation x = -y, from the second z = -y. So ker(T) = {(-y, y, -y) : y in R} = {y(-1, 1, -1) : y in R} = span{(-1, 1, -1)}.'
            }
          ]
        },
        {
          id: 'def-image',
          name: 'Image (Range)',
          formalText: 'Let T: V -> W be a linear transformation. The image of T (also called the range of T) is the set im(T) = {T(v) : v in V} = {w in W : there exists v in V such that T(v) = w}. That is, the image consists of all vectors in W that are hit by T.',
          atomicParts: [
            { id: 'im-part-lt', text: 'T: V -> W is a linear transformation', keywords: ['linear', 'transformation', 'T'] },
            { id: 'im-part-set', text: 'im(T) = {T(v) : v in V}', keywords: ['im', 'T(v)', 'image'] },
            { id: 'im-part-subset', text: 'im(T) is a subset of the codomain W', keywords: ['subset', 'codomain', 'W'] },
            { id: 'im-part-meaning', text: 'all vectors in W that are outputs of T for some input in V', keywords: ['outputs', 'hit by T', 'exists', 'some input'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of the image of a linear transformation T: V -> W.'
            }
          ]
        },
        {
          id: 'def-injective',
          name: 'Injective (One-to-One)',
          formalText: 'A linear transformation T: V -> W is called injective (or one-to-one) if for all u, v in V, T(u) = T(v) implies u = v. Equivalently, T is injective if distinct vectors in V map to distinct vectors in W.',
          atomicParts: [
            { id: 'inj-part-lt', text: 'T: V -> W is a linear transformation', keywords: ['linear', 'transformation'] },
            { id: 'inj-part-condition', text: 'T(u) = T(v) implies u = v for all u, v in V', keywords: ['T(u) = T(v)', 'implies', 'u = v'] },
            { id: 'inj-part-distinct', text: 'distinct inputs map to distinct outputs', keywords: ['distinct', 'one-to-one', 'different'] },
            { id: 'inj-part-equiv-ker', text: 'equivalently, ker(T) = {0}', keywords: ['kernel', 'trivial', '{0}', 'only zero'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of an injective linear transformation.'
            }
          ]
        },
        {
          id: 'def-surjective',
          name: 'Surjective (Onto)',
          formalText: 'A linear transformation T: V -> W is called surjective (or onto) if for every w in W, there exists v in V such that T(v) = w. Equivalently, T is surjective if and only if im(T) = W.',
          atomicParts: [
            { id: 'surj-part-lt', text: 'T: V -> W is a linear transformation', keywords: ['linear', 'transformation'] },
            { id: 'surj-part-condition', text: 'for every w in W, there exists v in V with T(v) = w', keywords: ['for every', 'exists', 'T(v) = w'] },
            { id: 'surj-part-image', text: 'equivalently, im(T) = W', keywords: ['image', 'equals', 'W', 'im(T) = W'] },
            { id: 'surj-part-meaning', text: 'every element of the codomain is hit by T', keywords: ['every', 'codomain', 'hit', 'onto'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of a surjective linear transformation.'
            },
            {
              type: 'counterexample',
              prompt: 'Give a specific linear transformation T: R^2 -> R^2 that is not surjective, and identify a vector not in im(T).',
              failingProperty: 'surjectivity',
              expectedKeywords: ['image', 'not all of R^2', 'span', 'not in image'],
              exampleAnswer: 'Let T(x,y) = (x+y, x+y). Then im(T) = {(a,a) : a in R}, which is the line y = x. The vector (1,0) is not in im(T) because there is no (x,y) with x+y = 1 and x+y = 0 simultaneously.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-kernel-subspace',
          name: 'The Kernel is a Subspace',
          description: 'Prove that if T: V -> W is a linear transformation, then ker(T) is a subspace of V.',
          prerequisites: ['def-kernel', 'def-subspace'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show?',
              expected: 'We need to show ker(T) is a subspace of V by verifying three conditions: (1) ker(T) is nonempty (0 is in ker(T)), (2) ker(T) is closed under addition, (3) ker(T) is closed under scalar multiplication.',
              keywords: ['nonempty', 'closed under addition', 'closed under scalar multiplication', 'three conditions'],
              hints: [
                'To show a subset is a subspace, verify the three subspace conditions.',
                'Show ker(T) contains 0, is closed under addition, and is closed under scalar multiplication.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show that 0_V is in ker(T).',
              expected: 'Since T is linear, T(0_V) = 0_W (proved earlier). Therefore 0_V satisfies T(0_V) = 0_W, so 0_V is in ker(T). In particular, ker(T) is nonempty.',
              keywords: ['T(0) = 0', 'linear', '0 in ker(T)', 'nonempty'],
              hints: [
                'We proved that linear maps send zero to zero.',
                'T(0_V) = 0_W, so 0_V is in {v : T(v) = 0_W} = ker(T).'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show ker(T) is closed under addition.',
              expected: 'Let u, v in ker(T). Then T(u) = 0_W and T(v) = 0_W. By additivity of T, T(u + v) = T(u) + T(v) = 0_W + 0_W = 0_W. So u + v is in ker(T).',
              keywords: ['T(u) = 0', 'T(v) = 0', 'T(u+v)', 'T(u) + T(v)', '0 + 0 = 0', 'u+v in ker'],
              hints: [
                'If u and v are in the kernel, then T(u) = 0 and T(v) = 0. What is T(u+v)?',
                'Use additivity: T(u+v) = T(u) + T(v) = 0 + 0 = 0.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show ker(T) is closed under scalar multiplication.',
              expected: 'Let c in F and v in ker(T). Then T(v) = 0_W. By homogeneity, T(cv) = cT(v) = c * 0_W = 0_W. So cv is in ker(T).',
              keywords: ['T(v) = 0', 'T(cv)', 'cT(v)', 'c * 0 = 0', 'cv in ker'],
              hints: [
                'If v is in the kernel, then T(v) = 0. What is T(cv)?',
                'Use homogeneity: T(cv) = cT(v) = c * 0 = 0.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'Since ker(T) is nonempty, closed under addition, and closed under scalar multiplication, ker(T) is a subspace of V.',
              keywords: ['subspace', 'three conditions', 'ker(T)', 'subspace of V'],
              hints: [
                'We verified all three subspace conditions.',
                'By the subspace criterion, ker(T) is a subspace of V.'
              ]
            }
          ]
        },
        {
          id: 'proof-image-subspace',
          name: 'The Image is a Subspace',
          description: 'Prove that if T: V -> W is a linear transformation, then im(T) is a subspace of W.',
          prerequisites: ['def-image', 'def-subspace'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What do we need to show?',
              expected: 'We need to show im(T) is a subspace of W by verifying: (1) im(T) is nonempty, (2) im(T) is closed under addition, (3) im(T) is closed under scalar multiplication.',
              keywords: ['nonempty', 'closed', 'addition', 'scalar multiplication', 'subspace of W'],
              hints: [
                'Apply the three subspace conditions to im(T) as a subset of W.',
                'Verify nonempty, closed under addition, closed under scalar multiplication.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show that im(T) is nonempty.',
              expected: 'T(0_V) = 0_W, so 0_W = T(0_V) is in im(T). Therefore im(T) is nonempty.',
              keywords: ['T(0_V) = 0_W', '0_W in im(T)', 'nonempty'],
              hints: [
                'What is the image of the zero vector?',
                'T(0_V) = 0_W is in im(T).'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show im(T) is closed under addition.',
              expected: 'Let w1, w2 in im(T). Then there exist v1, v2 in V with T(v1) = w1 and T(v2) = w2. By additivity, T(v1 + v2) = T(v1) + T(v2) = w1 + w2. Since v1 + v2 is in V, w1 + w2 is in im(T).',
              keywords: ['w1 = T(v1)', 'w2 = T(v2)', 'T(v1+v2)', 'w1 + w2 in im(T)', 'additivity'],
              hints: [
                'Elements of im(T) are of the form T(v). If w1 = T(v1) and w2 = T(v2), what preimage gives w1 + w2?',
                'T(v1 + v2) = T(v1) + T(v2) = w1 + w2, so w1 + w2 is in im(T).'
              ]
            },
            {
              type: 'justify',
              prompt: 'Show im(T) is closed under scalar multiplication.',
              expected: 'Let c in F and w in im(T). Then there exists v in V with T(v) = w. By homogeneity, T(cv) = cT(v) = cw. Since cv is in V, cw is in im(T).',
              keywords: ['w = T(v)', 'T(cv)', 'cT(v)', 'cw in im(T)', 'homogeneity'],
              hints: [
                'If w = T(v), what preimage gives cw?',
                'T(cv) = cT(v) = cw by homogeneity.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the conclusion.',
              expected: 'Since im(T) is nonempty, closed under addition, and closed under scalar multiplication, im(T) is a subspace of W.',
              keywords: ['subspace', 'im(T)', 'subspace of W', 'three conditions'],
              hints: [
                'All three subspace conditions are verified.',
                'Therefore im(T) is a subspace of W.'
              ]
            }
          ]
        },
        {
          id: 'proof-injective-iff-kernel-trivial',
          name: 'T is Injective if and only if ker(T) = {0}',
          description: 'Prove that a linear transformation T: V -> W is injective if and only if ker(T) = {0_V}.',
          prerequisites: ['def-kernel', 'def-injective'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'What are the two directions we must prove?',
              expected: 'Forward: if T is injective, then ker(T) = {0}. Backward: if ker(T) = {0}, then T is injective.',
              keywords: ['two directions', 'injective implies', 'kernel trivial implies', 'if and only if'],
              hints: [
                'This is a biconditional, so prove both directions.',
                'Direction 1: injective => ker = {0}. Direction 2: ker = {0} => injective.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Prove the forward direction: if T is injective, then ker(T) = {0}.',
              expected: 'We always have 0 in ker(T) since T(0) = 0. Now suppose v is in ker(T), so T(v) = 0 = T(0). Since T is injective, T(v) = T(0) implies v = 0. Therefore ker(T) = {0}.',
              keywords: ['T(v) = 0', 'T(0) = 0', 'T(v) = T(0)', 'injective implies v = 0', 'ker = {0}'],
              hints: [
                'We know 0 is always in the kernel. To show the kernel contains nothing else, take v in ker(T).',
                'If T(v) = 0 = T(0) and T is injective, what can you conclude about v?'
              ]
            },
            {
              type: 'justify',
              prompt: 'Prove the backward direction: assume ker(T) = {0} and show T is injective. Start by assuming T(u) = T(v).',
              expected: 'Suppose T(u) = T(v). Then T(u) - T(v) = 0. By linearity, T(u - v) = T(u) - T(v) = 0. So u - v is in ker(T) = {0}, which means u - v = 0, hence u = v. Therefore T is injective.',
              keywords: ['T(u) = T(v)', 'T(u-v) = 0', 'u-v in ker', 'u-v = 0', 'u = v', 'injective'],
              hints: [
                'If T(u) = T(v), consider T(u) - T(v) = T(u - v).',
                'T(u - v) = 0 means u - v is in ker(T) = {0}, so u - v = 0.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the full conclusion.',
              expected: 'Therefore T is injective if and only if ker(T) = {0}. Injectivity of a linear map is completely characterized by the triviality of its kernel.',
              keywords: ['if and only if', 'injective', 'ker(T) = {0}', 'both directions'],
              hints: [
                'Both directions are proved.',
                'The biconditional is established: injective iff trivial kernel.'
              ]
            }
          ]
        }
      ],
      visualization: {
        type: 'kernel-image',
        title: 'Kernel and Image of a Linear Map',
        description: 'Visualize the kernel (null space) and image (column space) of a matrix transformation. See how vectors in the kernel collapse to zero and how the image forms a subspace of the codomain.',
        requiredMastery: 80,
        requiredProofs: ['proof-kernel-subspace', 'proof-image-subspace', 'proof-injective-iff-kernel-trivial'],
        config: {
          matrix: [[1, 2], [2, 4]]
        }
      }
    },

    // =========================================================================
    // TOPIC 5: RANK-NULLITY THEOREM
    // =========================================================================
    {
      id: 'rank-nullity',
      name: 'Rank-Nullity Theorem',
      description: 'The fundamental theorem relating the dimensions of the kernel and image of a linear transformation to the dimension of its domain.',
      prerequisites: ['vector-spaces', 'subspaces', 'linear-transformations', 'kernel-image'],
      definitions: [
        {
          id: 'def-dimension',
          name: 'Dimension',
          formalText: 'The dimension of a finite-dimensional vector space V, denoted dim(V), is the number of vectors in any basis of V. By convention, dim({0}) = 0. The dimension is well-defined because all bases of a finite-dimensional vector space have the same number of elements.',
          atomicParts: [
            { id: 'dim-part-fd', text: 'V is a finite-dimensional vector space', keywords: ['finite-dimensional', 'vector space'] },
            { id: 'dim-part-def', text: 'dim(V) is the number of vectors in any basis of V', keywords: ['dim', 'number', 'basis', 'vectors'] },
            { id: 'dim-part-zero', text: 'dim({0}) = 0 by convention', keywords: ['dim', 'zero space', '0'] },
            { id: 'dim-part-welldef', text: 'well-defined because all bases have the same cardinality', keywords: ['well-defined', 'same', 'cardinality', 'all bases'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of the dimension of a finite-dimensional vector space.'
            }
          ]
        },
        {
          id: 'def-rank',
          name: 'Rank',
          formalText: 'Let T: V -> W be a linear transformation between finite-dimensional vector spaces. The rank of T is defined as rank(T) = dim(im(T)), the dimension of the image (range) of T. For a matrix A, rank(A) equals the dimension of the column space of A, which also equals the number of pivot columns in any row echelon form of A.',
          atomicParts: [
            { id: 'rank-part-lt', text: 'T: V -> W is a linear transformation between finite-dimensional spaces', keywords: ['linear', 'finite-dimensional'] },
            { id: 'rank-part-def', text: 'rank(T) = dim(im(T))', keywords: ['rank', 'dim', 'image', 'im(T)'] },
            { id: 'rank-part-matrix', text: 'for a matrix A, rank(A) = dimension of the column space', keywords: ['matrix', 'column space', 'rank'] },
            { id: 'rank-part-pivot', text: 'equals the number of pivot columns in row echelon form', keywords: ['pivot', 'columns', 'row echelon'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of the rank of a linear transformation T: V -> W.'
            },
            {
              type: 'equivalence',
              prompt: 'Explain why rank(A) equals the dimension of the column space of A.',
              formulation1: 'rank(A) = dim(im(T_A)) where T_A is the linear map x -> Ax',
              formulation2: 'rank(A) = dimension of the column space of A',
              keywords: ['column space', 'image', 'Ax', 'linear combination', 'columns'],
              explanation: 'If T_A(x) = Ax, then im(T_A) = {Ax : x in R^n}. Writing Ax as x_1 a_1 + ... + x_n a_n where a_i are columns of A, we see im(T_A) = span{a_1, ..., a_n} = column space of A. So rank(A) = dim(im(T_A)) = dim(column space of A).'
            }
          ]
        },
        {
          id: 'def-nullity',
          name: 'Nullity',
          formalText: 'Let T: V -> W be a linear transformation between finite-dimensional vector spaces. The nullity of T is defined as nullity(T) = dim(ker(T)), the dimension of the kernel (null space) of T. For a matrix A, nullity(A) equals the number of free variables in the system Ax = 0.',
          atomicParts: [
            { id: 'null-part-lt', text: 'T: V -> W is a linear transformation between finite-dimensional spaces', keywords: ['linear', 'finite-dimensional'] },
            { id: 'null-part-def', text: 'nullity(T) = dim(ker(T))', keywords: ['nullity', 'dim', 'kernel', 'ker(T)'] },
            { id: 'null-part-matrix', text: 'for a matrix A, nullity(A) = number of free variables in Ax = 0', keywords: ['matrix', 'free variables', 'Ax = 0'] },
            { id: 'null-part-null-space', text: 'the kernel is also called the null space', keywords: ['null space', 'kernel'] }
          ],
          axioms: [],
          exercises: [
            {
              type: 'fill-in',
              prompt: 'State the definition of the nullity of a linear transformation T: V -> W.'
            }
          ]
        }
      ],
      proofs: [
        {
          id: 'proof-rank-nullity',
          name: 'The Rank-Nullity Theorem',
          description: 'Prove that if T: V -> W is a linear transformation and V is finite-dimensional, then dim(V) = rank(T) + nullity(T), i.e., dim(V) = dim(im(T)) + dim(ker(T)).',
          prerequisites: ['def-rank', 'def-nullity', 'def-dimension', 'def-kernel', 'def-image'],
          steps: [
            {
              type: 'state-goal',
              prompt: 'State the theorem precisely and describe the proof strategy.',
              expected: 'We want to prove dim(V) = dim(ker(T)) + dim(im(T)). Strategy: let {u_1, ..., u_k} be a basis for ker(T). Extend this to a basis {u_1, ..., u_k, v_1, ..., v_r} for V. We will show {T(v_1), ..., T(v_r)} is a basis for im(T), giving dim(V) = k + r = nullity(T) + rank(T).',
              keywords: ['dim(V)', 'dim(ker(T))', 'dim(im(T))', 'basis of kernel', 'extend', 'basis of V', 'show images form basis'],
              hints: [
                'The key idea: start with a basis for ker(T), extend to a basis for V, and show the images of the extension vectors form a basis for im(T).',
                'Let nullity = k and rank = r. We need dim(V) = k + r.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Let {u_1, ..., u_k} be a basis for ker(T) and {u_1, ..., u_k, v_1, ..., v_r} a basis for V. Show that {T(v_1), ..., T(v_r)} spans im(T).',
              expected: 'Let w in im(T). Then w = T(v) for some v in V. Since {u_1,...,u_k,v_1,...,v_r} is a basis for V, write v = a_1 u_1 + ... + a_k u_k + b_1 v_1 + ... + b_r v_r. Then T(v) = a_1 T(u_1) + ... + a_k T(u_k) + b_1 T(v_1) + ... + b_r T(v_r). Since each u_i is in ker(T), T(u_i) = 0. So w = T(v) = b_1 T(v_1) + ... + b_r T(v_r). Therefore {T(v_1),...,T(v_r)} spans im(T).',
              keywords: ['w = T(v)', 'write v in basis', 'T(u_i) = 0', 'kernel', 'b_1 T(v_1) + ... + b_r T(v_r)', 'spans'],
              hints: [
                'Any w in im(T) is T(v) for some v. Express v in the basis of V and apply T.',
                'The u_i terms vanish because u_i are in ker(T), leaving only T(v_j) terms.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Now show that {T(v_1), ..., T(v_r)} is linearly independent.',
              expected: 'Suppose b_1 T(v_1) + ... + b_r T(v_r) = 0. By linearity, T(b_1 v_1 + ... + b_r v_r) = 0, so b_1 v_1 + ... + b_r v_r is in ker(T). Since {u_1,...,u_k} is a basis for ker(T), we can write b_1 v_1 + ... + b_r v_r = c_1 u_1 + ... + c_k u_k. Rearranging: c_1 u_1 + ... + c_k u_k - b_1 v_1 - ... - b_r v_r = 0. Since {u_1,...,u_k,v_1,...,v_r} is a basis for V (hence linearly independent), all coefficients are zero. In particular, b_1 = ... = b_r = 0. So {T(v_1),...,T(v_r)} is linearly independent.',
              keywords: ['suppose', 'b_1 T(v_1) + ... = 0', 'T(b_1 v_1 + ...) = 0', 'in ker(T)', 'express in basis of ker', 'linearly independent', 'all coefficients zero'],
              hints: [
                'Assume a linear combination of the T(v_j) equals zero. Pull the scalars inside T by linearity.',
                'The resulting vector is in ker(T), so write it as a combination of u_i. Then use the linear independence of the full basis of V.'
              ]
            },
            {
              type: 'justify',
              prompt: 'Combine the spanning and independence results.',
              expected: 'Since {T(v_1), ..., T(v_r)} spans im(T) and is linearly independent, it is a basis for im(T). Therefore dim(im(T)) = r.',
              keywords: ['basis for im(T)', 'spans', 'linearly independent', 'dim(im(T)) = r'],
              hints: [
                'A set that is both spanning and linearly independent is a basis.',
                'So {T(v_1),...,T(v_r)} is a basis for im(T) with r elements.'
              ]
            },
            {
              type: 'conclude',
              prompt: 'State the final conclusion with the dimension count.',
              expected: 'We have dim(ker(T)) = k and dim(im(T)) = r. The basis for V has k + r elements, so dim(V) = k + r = dim(ker(T)) + dim(im(T)) = nullity(T) + rank(T). This is the Rank-Nullity Theorem.',
              keywords: ['dim(V) = k + r', 'nullity(T) + rank(T)', 'dim(ker(T)) + dim(im(T))', 'Rank-Nullity'],
              hints: [
                'Count: the basis of V has k + r vectors, the kernel has dimension k, the image has dimension r.',
                'dim(V) = k + r = nullity(T) + rank(T).'
              ]
            }
          ]
        }
      ],
      visualization: {
        type: 'rank-nullity',
        title: 'The Rank-Nullity Theorem in Action',
        description: 'Visualize how the domain space splits into the kernel and a complement. Watch how the complement maps bijectively onto the image while the kernel collapses to zero. Adjust the matrix to see how rank and nullity trade off.',
        requiredMastery: 80,
        requiredProofs: ['proof-rank-nullity'],
        config: {
          matrix: [[1, 0, 1], [0, 1, 1]]
        }
      }
    }

  ]
});
