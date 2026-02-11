// ============================================================
// utils.js — Text matching, normalization, fuzzy search, scoring
// ============================================================
window.Utils = (() => {
  // Common math synonyms for flexible matching
  const SYNONYMS = {
    'zero vector': ['zero element', '0 vector', 'additive identity', 'zero'],
    'additive inverse': ['negative', 'inverse', '-v'],
    'scalar multiplication': ['scalar product', 'scaling'],
    'vector addition': ['addition', 'sum'],
    'closed': ['closure'],
    'nonempty': ['non-empty', 'not empty'],
    'linear combination': ['lin comb', 'linear combo'],
    'linear transformation': ['linear map', 'linear mapping', 'linear function', 'homomorphism'],
    'kernel': ['null space', 'nullspace', 'ker'],
    'image': ['range', 'im', 'column space'],
    'injective': ['one-to-one', 'one to one', '1-1', '1 to 1', 'monomorphism'],
    'surjective': ['onto', 'surjection', 'epimorphism'],
    'bijective': ['one-to-one and onto', 'isomorphism'],
    'subspace': ['linear subspace', 'sub-space'],
    'dimension': ['dim'],
    'rank': ['rk', 'column rank'],
    'nullity': ['null rank', 'dimension of kernel'],
    'field': ['scalar field'],
    'iff': ['if and only if'],
  };

  // Build reverse synonym map
  const SYNONYM_MAP = {};
  for (const [canonical, alts] of Object.entries(SYNONYMS)) {
    for (const alt of alts) {
      SYNONYM_MAP[alt.toLowerCase()] = canonical.toLowerCase();
    }
  }

  function normalize(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/[''`]/g, "'")
      .replace(/[""]/g, '"')
      .replace(/\s+/g, ' ')
      .replace(/[.,;:!?(){}[\]]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(text) {
    return normalize(text).split(' ').filter(w => w.length > 0);
  }

  function canonicalize(text) {
    let n = normalize(text);
    for (const [alt, canonical] of Object.entries(SYNONYM_MAP)) {
      const regex = new RegExp('\\b' + escapeRegex(alt) + '\\b', 'gi');
      n = n.replace(regex, canonical);
    }
    return n;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Stopwords to ignore in matching
  const STOPWORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'that', 'which', 'who', 'whom',
    'this', 'these', 'those', 'it', 'its', 'and', 'or', 'but', 'not',
    'if', 'then', 'than', 'so', 'as', 'we', 'say', 'such'
  ]);

  function contentTokens(text) {
    return tokenize(text).filter(w => !STOPWORDS.has(w));
  }

  /**
   * Check if input contains the required keywords.
   * Returns { score: 0-1, matched: [...], missing: [...] }
   */
  function keywordMatch(input, keywords) {
    const inputNorm = canonicalize(input);
    const inputTokens = new Set(contentTokens(inputNorm));
    const inputFull = normalize(input);

    const matched = [];
    const missing = [];

    for (const kw of keywords) {
      const kwNorm = normalize(kw);
      // Check exact phrase match first
      if (inputFull.includes(kwNorm) || inputNorm.includes(kwNorm)) {
        matched.push(kw);
      }
      // Check individual keyword tokens
      else if (contentTokens(kwNorm).every(t => inputTokens.has(t))) {
        matched.push(kw);
      }
      // Check synonym match
      else {
        const canonical = SYNONYM_MAP[kwNorm];
        if (canonical && (inputFull.includes(canonical) || inputNorm.includes(canonical))) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      }
    }

    return {
      score: keywords.length > 0 ? matched.length / keywords.length : 1,
      matched,
      missing
    };
  }

  /**
   * Sliding window similarity: compare input to reference text.
   * Returns 0-1 score based on best matching window.
   */
  function slidingWindowSimilarity(input, reference) {
    const inputTokens = contentTokens(canonicalize(input));
    const refTokens = contentTokens(canonicalize(reference));

    if (refTokens.length === 0) return inputTokens.length === 0 ? 1 : 0;
    if (inputTokens.length === 0) return 0;

    const refSet = new Set(refTokens);
    let bestScore = 0;
    const windowSize = Math.min(refTokens.length, inputTokens.length);

    for (let start = 0; start <= inputTokens.length - 1; start++) {
      const end = Math.min(start + windowSize + 2, inputTokens.length);
      const windowTokens = inputTokens.slice(start, end);
      const overlap = windowTokens.filter(t => refSet.has(t)).length;
      const score = overlap / refSet.size;
      if (score > bestScore) bestScore = score;
    }

    // Also check global overlap
    const inputSet = new Set(inputTokens);
    const globalOverlap = refTokens.filter(t => inputSet.has(t)).length;
    const globalScore = globalOverlap / refTokens.length;

    return Math.max(bestScore, globalScore);
  }

  /**
   * Score a response against atomic parts of a definition.
   * Returns { overallScore, parts: [{ part, score, matched, missing }] }
   */
  function scoreDefinitionResponse(input, atomicParts) {
    const parts = atomicParts.map(part => {
      const kwResult = keywordMatch(input, part.keywords || []);
      const simScore = slidingWindowSimilarity(input, part.text);
      // Weight: 60% keywords, 40% similarity
      const score = (kwResult.score * 0.6) + (simScore * 0.4);
      return {
        part,
        score,
        matched: kwResult.matched,
        missing: kwResult.missing,
        similarity: simScore
      };
    });

    const overallScore = parts.length > 0
      ? parts.reduce((sum, p) => sum + p.score, 0) / parts.length
      : 0;

    return { overallScore, parts };
  }

  /**
   * Fuzzy match for short answers (axiom names, property names, etc.)
   * Returns { match: boolean, confidence: 0-1 }
   */
  function fuzzyMatch(input, expected) {
    const inputNorm = canonicalize(input);
    const expectedNorm = canonicalize(expected);

    // Exact match
    if (inputNorm === expectedNorm) return { match: true, confidence: 1 };

    // Contains match
    if (inputNorm.includes(expectedNorm) || expectedNorm.includes(inputNorm)) {
      return { match: true, confidence: 0.9 };
    }

    // Token overlap
    const inputTokens = new Set(contentTokens(inputNorm));
    const expectedTokens = contentTokens(expectedNorm);

    if (expectedTokens.length === 0) return { match: false, confidence: 0 };

    const overlap = expectedTokens.filter(t => inputTokens.has(t)).length;
    const score = overlap / expectedTokens.length;

    return { match: score >= 0.7, confidence: score };
  }

  /**
   * Levenshtein distance for typo tolerance
   */
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
    return dp[m][n];
  }

  /**
   * Classify mistake type based on response scoring
   */
  function classifyMistake(scoreResult) {
    const { overallScore, parts } = scoreResult;
    const missedParts = parts.filter(p => p.score < 0.3);
    const partialParts = parts.filter(p => p.score >= 0.3 && p.score < 0.7);

    if (missedParts.length > parts.length * 0.5) return 'omission';
    if (partialParts.length > 0) return 'partial';
    if (overallScore < 0.5) return 'logical-leap';
    return 'minor';
  }

  /**
   * Generate a readable feedback message from scoring
   */
  function feedbackFromScore(scoreResult) {
    const { overallScore, parts } = scoreResult;

    if (overallScore >= 0.85) {
      return { type: 'correct', message: 'Excellent! You captured the definition accurately.' };
    }
    if (overallScore >= 0.6) {
      const missing = parts.filter(p => p.score < 0.5);
      return {
        type: 'partial',
        message: `Good attempt, but some parts are incomplete or missing.`,
        missingParts: missing.map(p => p.part.text)
      };
    }
    const missing = parts.filter(p => p.score < 0.5);
    return {
      type: 'incorrect',
      message: 'Several key components are missing from your definition.',
      missingParts: missing.map(p => p.part.text)
    };
  }

  // Public API
  return {
    normalize,
    tokenize,
    canonicalize,
    contentTokens,
    keywordMatch,
    slidingWindowSimilarity,
    scoreDefinitionResponse,
    fuzzyMatch,
    levenshtein,
    classifyMistake,
    feedbackFromScore,
    STOPWORDS,
    SYNONYMS
  };
})();
