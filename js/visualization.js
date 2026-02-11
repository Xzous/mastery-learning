// ============================================================
// visualization.js — Three.js 3D scenes, math utilities, gating
// ============================================================
window.Visualization = (() => {
  // Store active scene data for cleanup
  let _activeScene = null;

  // ==================== MATH UTILITIES ====================

  /**
   * Row-reduce a matrix to RREF.
   */
  function rref(matrix) {
    const m = matrix.map(row => [...row]);
    const rows = m.length;
    const cols = m[0].length;
    let lead = 0;

    for (let r = 0; r < rows; r++) {
      if (lead >= cols) break;
      let i = r;
      while (Math.abs(m[i][lead]) < 1e-10) {
        i++;
        if (i === rows) { i = r; lead++; if (lead === cols) return m; }
      }
      [m[i], m[r]] = [m[r], m[i]];
      const div = m[r][lead];
      if (Math.abs(div) > 1e-10) {
        for (let j = 0; j < cols; j++) m[r][j] /= div;
      }
      for (let i2 = 0; i2 < rows; i2++) {
        if (i2 !== r) {
          const factor = m[i2][lead];
          for (let j = 0; j < cols; j++) m[i2][j] -= factor * m[r][j];
        }
      }
      lead++;
    }
    return m;
  }

  /**
   * Compute null space basis of a matrix.
   */
  function nullSpace(matrix) {
    const r = rref(matrix);
    const rows = r.length;
    const cols = r[0].length;

    // Find pivot columns
    const pivotCols = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.abs(r[i][j] - 1) < 1e-10) {
          pivotCols.push(j);
          break;
        }
      }
    }

    const freeCols = [];
    for (let j = 0; j < cols; j++) {
      if (!pivotCols.includes(j)) freeCols.push(j);
    }

    // Build null space vectors
    const basis = [];
    for (const fc of freeCols) {
      const vec = new Array(cols).fill(0);
      vec[fc] = 1;
      for (let i = 0; i < pivotCols.length; i++) {
        vec[pivotCols[i]] = -r[i][fc];
      }
      basis.push(vec);
    }
    return basis;
  }

  /**
   * Compute column space basis.
   */
  function columnSpace(matrix) {
    const r = rref(matrix);
    const rows = r.length;
    const cols = r[0].length;
    const pivotCols = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.abs(r[i][j] - 1) < 1e-10) {
          pivotCols.push(j);
          break;
        }
      }
    }

    return pivotCols.map(j => matrix.map(row => row[j]));
  }

  /**
   * Matrix-vector multiply.
   */
  function matVecMul(matrix, vec) {
    return matrix.map(row =>
      row.reduce((sum, val, j) => sum + val * (vec[j] || 0), 0)
    );
  }

  // ==================== GATING ====================

  function isUnlocked(courseId, topicId) {
    const viz = ContentRegistry.getVisualization(courseId, topicId);
    if (!viz) return false;

    const mastery = Persistence.getTopicDefinitionMastery(courseId, topicId);
    const masteryMet = mastery >= (viz.requiredMastery || 80);

    let proofsMet = true;
    if (viz.requiredProofs && viz.requiredProofs.length > 0) {
      for (const proofId of viz.requiredProofs) {
        const proof = ContentRegistry.getProof(courseId, proofId);
        if (proof && !Persistence.isProofComplete(proofId, proof.steps.length)) {
          proofsMet = false;
          break;
        }
      }
    }

    return masteryMet && proofsMet;
  }

  function getRequirements(courseId, topicId) {
    const viz = ContentRegistry.getVisualization(courseId, topicId);
    if (!viz) return [];

    const reqs = [];
    const mastery = Persistence.getTopicDefinitionMastery(courseId, topicId);
    const threshold = viz.requiredMastery || 80;
    reqs.push({
      label: `Definition mastery ≥ ${threshold}%`,
      met: mastery >= threshold,
      current: `${mastery}%`
    });

    if (viz.requiredProofs) {
      for (const proofId of viz.requiredProofs) {
        const proof = ContentRegistry.getProof(courseId, proofId);
        if (proof) {
          const complete = Persistence.isProofComplete(proofId, proof.steps.length);
          reqs.push({
            label: `Complete proof: ${proof.name}`,
            met: complete
          });
        }
      }
    }

    return reqs;
  }

  // ==================== RENDERING ====================

  function renderVisualization(container, courseId, topicId) {
    const viz = ContentRegistry.getVisualization(courseId, topicId);
    if (!viz) {
      container.innerHTML = '<div class="empty-state"><p>No visualization available for this topic.</p></div>';
      return;
    }

    const unlocked = isUnlocked(courseId, topicId);

    let html = `
      <div class="card">
        <div class="card-header">
          <h3>${_esc(viz.title || '3D Visualization')}</h3>
          ${unlocked
            ? '<span class="badge badge-success">Unlocked</span>'
            : '<span class="badge badge-muted">Locked</span>'}
        </div>
        <div class="card-body" style="padding: 0;">
          <div class="viz-container" id="viz-canvas-container">
    `;

    if (!unlocked) {
      const reqs = getRequirements(courseId, topicId);
      html += `
        <div class="viz-locked-overlay">
          <div class="lock-icon">&#128274;</div>
          <div class="lock-message">
            Complete the requirements below to unlock this visualization.
          </div>
          <ul class="lock-requirements">
            ${reqs.map(r => `<li class="${r.met ? 'met' : 'unmet'}">
              ${r.met ? '&#10003;' : '&#9675;'} ${_esc(r.label)} ${r.current ? '(' + r.current + ')' : ''}
            </li>`).join('')}
          </ul>
        </div>
      `;
    }

    html += `</div>`;

    if (unlocked) {
      html += `
        <div class="viz-controls">
          <span>Click and drag to rotate. Scroll to zoom.</span>
          ${viz.description ? '<span style="margin-left: auto; color: var(--text-muted);">' + _esc(viz.description) + '</span>' : ''}
        </div>
      `;
    }

    html += `</div></div>`;
    container.innerHTML = html;

    // Initialize Three.js scene if unlocked
    if (unlocked) {
      setTimeout(() => _initScene(courseId, topicId, viz), 100);
    }

    // Return cleanup function
    return () => _cleanup();
  }

  // ==================== THREE.JS SCENES ====================

  function _initScene(courseId, topicId, viz) {
    _cleanup();

    const canvasContainer = document.getElementById('viz-canvas-container');
    if (!canvasContainer) return;

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(5, 4, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 5);
    scene.add(directional);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x303050, 0x202040);
    scene.add(gridHelper);

    // Axis lines
    _addAxes(scene);

    // Build scene based on type
    switch (viz.type) {
      case 'vector-addition':
        _buildVectorAdditionScene(scene, viz.config);
        break;
      case 'subspace':
        _buildSubspaceScene(scene, viz.config);
        break;
      case 'grid-deformation':
        _buildGridDeformationScene(scene, viz.config);
        break;
      case 'kernel-image':
        _buildKernelImageScene(scene, viz.config);
        break;
      case 'rank-nullity':
        _buildRankNullityScene(scene, viz.config);
        break;
    }

    // Animation loop
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      const w = canvasContainer.clientWidth;
      const h = canvasContainer.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    _activeScene = { scene, renderer, camera, controls, animId, onResize };
  }

  function _cleanup() {
    if (_activeScene) {
      cancelAnimationFrame(_activeScene.animId);
      window.removeEventListener('resize', _activeScene.onResize);
      if (_activeScene.renderer && _activeScene.renderer.domElement) {
        _activeScene.renderer.domElement.remove();
      }
      _activeScene.renderer.dispose();
      _activeScene = null;
    }
  }

  function _addAxes(scene) {
    const axisLen = 5;
    const colors = [0xff4444, 0x44ff44, 0x4444ff]; // R, G, B for X, Y, Z
    const dirs = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)];
    const labels = ['x', 'y', 'z'];

    dirs.forEach((dir, i) => {
      const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0,0,0), axisLen, colors[i], 0.15, 0.08);
      scene.add(arrow);
    });
  }

  function _createVector(from, to, color, lineWidth) {
    const dir = new THREE.Vector3().subVectors(to, from);
    const length = dir.length();
    dir.normalize();
    const arrow = new THREE.ArrowHelper(dir, from, length, color, 0.2, 0.12);
    return arrow;
  }

  function _buildVectorAdditionScene(scene, config) {
    // Show vectors u, v, and u+v
    const u = new THREE.Vector3(2, 1, 0);
    const v = new THREE.Vector3(1, 2, 1);
    const sum = new THREE.Vector3().addVectors(u, v);

    // Vector u (blue)
    scene.add(_createVector(new THREE.Vector3(0,0,0), u, 0x58a6ff));
    // Vector v (green)
    scene.add(_createVector(new THREE.Vector3(0,0,0), v, 0x3fb950));
    // Sum u+v (yellow)
    scene.add(_createVector(new THREE.Vector3(0,0,0), sum, 0xd29922));

    // Parallelogram helper lines (dashed)
    const dashMat = new THREE.LineDashedMaterial({ color: 0x8b949e, dashSize: 0.2, gapSize: 0.1 });

    const geom1 = new THREE.BufferGeometry().setFromPoints([u, sum]);
    const line1 = new THREE.Line(geom1, dashMat);
    line1.computeLineDistances();
    scene.add(line1);

    const geom2 = new THREE.BufferGeometry().setFromPoints([v, sum]);
    const line2 = new THREE.Line(geom2, dashMat);
    line2.computeLineDistances();
    scene.add(line2);

    // Labels via sprites
    _addLabel(scene, 'u', u.clone().multiplyScalar(0.5).add(new THREE.Vector3(-0.3, 0.2, 0)), 0x58a6ff);
    _addLabel(scene, 'v', v.clone().multiplyScalar(0.5).add(new THREE.Vector3(0.2, 0.2, 0)), 0x3fb950);
    _addLabel(scene, 'u+v', sum.clone().add(new THREE.Vector3(0.2, 0.2, 0)), 0xd29922);

    // Show basis vectors if configured
    if (config && config.showBasis) {
      const e1 = new THREE.Vector3(1, 0, 0);
      const e2 = new THREE.Vector3(0, 1, 0);
      const e3 = new THREE.Vector3(0, 0, 1);
      // Basis vectors shown as thin arrows
      [e1, e2, e3].forEach((e, i) => {
        const arrow = new THREE.ArrowHelper(e, new THREE.Vector3(0,0,0), 1, [0xff6666, 0x66ff66, 0x6666ff][i], 0.1, 0.06);
        arrow.line.material.opacity = 0.4;
        arrow.line.material.transparent = true;
        scene.add(arrow);
      });
    }
  }

  function _buildSubspaceScene(scene, config) {
    // Show a plane through origin (subspace of R3) and a line through origin
    // Plane: span{(1,0,1), (0,1,0)}
    const planeGeo = new THREE.PlaneGeometry(8, 8);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x58a6ff, transparent: true, opacity: 0.2,
      side: THREE.DoubleSide, flatShading: true
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    // Rotate to show span of (1,0,1) and (0,1,0)
    const normal = new THREE.Vector3(1, 0, 1).cross(new THREE.Vector3(0, 1, 0)).normalize();
    planeMesh.lookAt(normal);
    scene.add(planeMesh);

    // Plane wireframe
    const wireGeo = new THREE.PlaneGeometry(8, 8, 8, 8);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x58a6ff, wireframe: true, transparent: true, opacity: 0.15 });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.lookAt(normal);
    scene.add(wireMesh);

    // Spanning vectors
    scene.add(_createVector(new THREE.Vector3(0,0,0), new THREE.Vector3(2,0,2), 0x58a6ff));
    scene.add(_createVector(new THREE.Vector3(0,0,0), new THREE.Vector3(0,2,0), 0x3fb950));

    _addLabel(scene, 'W = span{v1, v2}', new THREE.Vector3(2, 0.5, 2), 0x58a6ff);
    _addLabel(scene, 'v1', new THREE.Vector3(1.2, 0, 1.2), 0x58a6ff);
    _addLabel(scene, 'v2', new THREE.Vector3(0.2, 1.2, 0), 0x3fb950);

    // Line through origin (1D subspace)
    const lineDir = new THREE.Vector3(1, 1, -1).normalize();
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      lineDir.clone().multiplyScalar(-4),
      lineDir.clone().multiplyScalar(4)
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xd29922 });
    scene.add(new THREE.Line(lineGeo, lineMat));

    scene.add(_createVector(new THREE.Vector3(0,0,0), lineDir.clone().multiplyScalar(2), 0xd29922));
    _addLabel(scene, 'U = span{w}', new THREE.Vector3(1.5, 1.5, -1.5), 0xd29922);
  }

  function _buildGridDeformationScene(scene, config) {
    const matrix = (config && config.matrix) || [[2, 1], [0, 1]];
    const gridSize = 5;
    const gridColor = 0x303050;
    const transformedColor = 0x58a6ff;

    // Original grid (faint)
    for (let i = -gridSize; i <= gridSize; i++) {
      // Horizontal
      const hGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize, 0, i),
        new THREE.Vector3(gridSize, 0, i)
      ]);
      scene.add(new THREE.Line(hGeo, new THREE.LineBasicMaterial({ color: gridColor, transparent: true, opacity: 0.3 })));
      // Vertical
      const vGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0, -gridSize),
        new THREE.Vector3(i, 0, gridSize)
      ]);
      scene.add(new THREE.Line(vGeo, new THREE.LineBasicMaterial({ color: gridColor, transparent: true, opacity: 0.3 })));
    }

    // Transformed grid
    for (let i = -gridSize; i <= gridSize; i++) {
      // Transform horizontal lines
      const hPoints = [];
      for (let j = -gridSize; j <= gridSize; j++) {
        const transformed = matVecMul(matrix, [j, i]);
        hPoints.push(new THREE.Vector3(transformed[0], 0, transformed[1]));
      }
      const hGeo = new THREE.BufferGeometry().setFromPoints(hPoints);
      scene.add(new THREE.Line(hGeo, new THREE.LineBasicMaterial({ color: transformedColor, transparent: true, opacity: 0.6 })));

      // Transform vertical lines
      const vPoints = [];
      for (let j = -gridSize; j <= gridSize; j++) {
        const transformed = matVecMul(matrix, [i, j]);
        vPoints.push(new THREE.Vector3(transformed[0], 0, transformed[1]));
      }
      const vGeo = new THREE.BufferGeometry().setFromPoints(vPoints);
      scene.add(new THREE.Line(vGeo, new THREE.LineBasicMaterial({ color: transformedColor, transparent: true, opacity: 0.6 })));
    }

    // Show where basis vectors go
    const e1t = matVecMul(matrix, [1, 0]);
    const e2t = matVecMul(matrix, [0, 1]);

    scene.add(_createVector(
      new THREE.Vector3(0, 0.01, 0),
      new THREE.Vector3(e1t[0], 0.01, e1t[1]),
      0xff4444
    ));
    scene.add(_createVector(
      new THREE.Vector3(0, 0.01, 0),
      new THREE.Vector3(e2t[0], 0.01, e2t[1]),
      0x44ff44
    ));

    _addLabel(scene, 'T(e1)', new THREE.Vector3(e1t[0], 0.4, e1t[1]), 0xff4444);
    _addLabel(scene, 'T(e2)', new THREE.Vector3(e2t[0], 0.4, e2t[1]), 0x44ff44);
  }

  function _buildKernelImageScene(scene, config) {
    const matrix = (config && config.matrix) || [[1, 2], [2, 4]];
    const ns = nullSpace(matrix);
    const cs = columnSpace(matrix);

    // Show kernel vectors
    if (ns.length > 0) {
      for (const vec of ns) {
        const v3 = new THREE.Vector3(vec[0] || 0, 0, vec[1] || 0).normalize().multiplyScalar(3);
        // Line through origin for kernel
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          v3.clone().multiplyScalar(-1), v3
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xf85149, linewidth: 2 });
        scene.add(new THREE.Line(lineGeo, lineMat));
        scene.add(_createVector(new THREE.Vector3(0, 0.01, 0), v3, 0xf85149));
        _addLabel(scene, 'ker(T)', v3.clone().add(new THREE.Vector3(0.3, 0.3, 0)), 0xf85149);
      }
    }

    // Show image vectors
    if (cs.length > 0) {
      for (const vec of cs) {
        const v3 = new THREE.Vector3(vec[0] || 0, 0, vec[1] || 0).normalize().multiplyScalar(3);
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          v3.clone().multiplyScalar(-1), v3
        ]);
        scene.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x3fb950 })));
        scene.add(_createVector(new THREE.Vector3(0, 0.02, 0), v3, 0x3fb950));
        _addLabel(scene, 'im(T)', v3.clone().add(new THREE.Vector3(0.3, 0.5, 0)), 0x3fb950);
      }
    }

    // Show a few sample input vectors and their images
    const samples = [[1, 0], [0, 1], [1, 1], [-1, 1]];
    for (const s of samples) {
      const output = matVecMul(matrix, s);
      const from = new THREE.Vector3(s[0], 0.01, s[1]);
      const to = new THREE.Vector3(output[0], 0.01, output[1]);

      // Input vector (faint)
      const inArrow = _createVector(new THREE.Vector3(0, 0.01, 0), from, 0x8b949e);
      inArrow.line.material.transparent = true;
      inArrow.line.material.opacity = 0.3;
      scene.add(inArrow);

      // Mapping arrow
      if (from.distanceTo(to) > 0.1) {
        const mapGeo = new THREE.BufferGeometry().setFromPoints([from, to]);
        const mapMat = new THREE.LineDashedMaterial({ color: 0xd29922, dashSize: 0.15, gapSize: 0.1 });
        const mapLine = new THREE.Line(mapGeo, mapMat);
        mapLine.computeLineDistances();
        scene.add(mapLine);
      }
    }
  }

  function _buildRankNullityScene(scene, config) {
    const matrix = (config && config.matrix) || [[1, 0, 1], [0, 1, 1]];
    const ns = nullSpace(matrix);
    const cs = columnSpace(matrix);
    const n = matrix[0].length; // domain dimension
    const rank = cs.length;
    const nullity = ns.length;

    // Visual: show domain as a cube region, kernel as highlighted subspace, image as another region

    // Domain: translucent box
    const domainGeo = new THREE.BoxGeometry(4, 0.1, 4);
    const domainMat = new THREE.MeshStandardMaterial({
      color: 0x58a6ff, transparent: true, opacity: 0.1, flatShading: true
    });
    const domainMesh = new THREE.Mesh(domainGeo, domainMat);
    domainMesh.position.set(-3, 0, 0);
    scene.add(domainMesh);
    _addLabel(scene, `Domain R${n}`, new THREE.Vector3(-3, 0.8, 0), 0x58a6ff);

    // Kernel subspace
    if (ns.length > 0) {
      const kerDir = new THREE.Vector3(ns[0][0] || 0, 0, ns[0][1] || 0).normalize();
      const kerGeo = new THREE.BufferGeometry().setFromPoints([
        kerDir.clone().multiplyScalar(-2).add(new THREE.Vector3(-3, 0.05, 0)),
        kerDir.clone().multiplyScalar(2).add(new THREE.Vector3(-3, 0.05, 0))
      ]);
      scene.add(new THREE.Line(kerGeo, new THREE.LineBasicMaterial({ color: 0xf85149, linewidth: 2 })));
      _addLabel(scene, `ker(T) dim=${nullity}`, new THREE.Vector3(-3, 0.5, 1.5), 0xf85149);
    }

    // Image space
    const imageGeo = new THREE.BoxGeometry(3, 0.1, 3);
    const imageMat = new THREE.MeshStandardMaterial({
      color: 0x3fb950, transparent: true, opacity: 0.15, flatShading: true
    });
    const imageMesh = new THREE.Mesh(imageGeo, imageMat);
    imageMesh.position.set(3, 0, 0);
    scene.add(imageMesh);
    _addLabel(scene, `Image R${matrix.length}`, new THREE.Vector3(3, 0.8, 0), 0x3fb950);
    _addLabel(scene, `rank=${rank}`, new THREE.Vector3(3, 0.5, 1.5), 0x3fb950);

    // Arrow from domain to image
    scene.add(_createVector(new THREE.Vector3(-1, 0.5, 0), new THREE.Vector3(1.5, 0.5, 0), 0xd29922));
    _addLabel(scene, 'T', new THREE.Vector3(0.25, 0.9, 0), 0xd29922);

    // Rank-Nullity equation label
    _addLabel(scene, `dim=${n} = rank ${rank} + nullity ${nullity}`, new THREE.Vector3(0, 2, 0), 0xbc8cff);
  }

  // ==================== LABEL HELPER ====================

  function _addLabel(scene, text, position, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 256, 64);

    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.fillStyle = '#' + (color || 0xffffff).toString(16).padStart(6, '0');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(position);
    sprite.scale.set(2, 0.5, 1);
    scene.add(sprite);
  }

  function _esc(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return {
    rref,
    nullSpace,
    columnSpace,
    matVecMul,
    isUnlocked,
    getRequirements,
    renderVisualization
  };
})();
