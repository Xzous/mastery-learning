// ============================================================
// teach-viz.js — Animated interactive 3D visualizations in teach slides
// ============================================================
window.TeachViz = (() => {

  // ==================== MOUNT / DISPOSE ====================

  function mount(containerId, sceneType, config) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);

    const is2D = sceneType.startsWith('teach-2d-') || sceneType.startsWith('teach-matrix');
    let camera;
    if (is2D) {
      const aspect = width / height;
      const vs = (config && config.viewSize) || 12;
      camera = new THREE.OrthographicCamera(
        -vs * aspect / 2, vs * aspect / 2,
        vs / 2, -vs / 2, 0.1, 100
      );
      camera.position.set(0, 20, 0);
      camera.lookAt(0, 0, 0);
    } else {
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(5, 4, 5);
      camera.lookAt(0, 0, 0);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    if (is2D) {
      controls.enableRotate = false;
      controls.enableZoom = true;
      controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
      controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
    } else {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }

    scene.add(new THREE.AmbientLight(0x404060, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    // Animation system
    const _anims = [];
    const _startTime = performance.now() / 1000;

    const builder = SCENE_BUILDERS[sceneType];
    if (builder) {
      builder(scene, config || {}, camera, controls, _anims);
    }

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      const t = performance.now() / 1000 - _startTime;
      for (let i = 0; i < _anims.length; i++) _anims[i](t);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 300;
      if (camera.isOrthographicCamera) {
        const aspect = w / h;
        const vs = (config && config.viewSize) || 12;
        camera.left = -vs * aspect / 2;
        camera.right = vs * aspect / 2;
        camera.top = vs / 2;
        camera.bottom = -vs / 2;
      } else {
        camera.aspect = w / h;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return {
      dispose() {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        controls.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }

  // ==================== ANIMATION HELPERS ====================

  function _ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; } // ease-in-out quad

  // Fade material opacity from 0 to target
  function _animFadeIn(anims, obj, delay, dur, targetOpacity) {
    if (obj.material) {
      obj.material.transparent = true;
      obj.material.opacity = 0;
    }
    obj.visible = false;
    anims.push((t) => {
      if (t < delay) return;
      obj.visible = true;
      const p = Math.min(1, (t - delay) / dur);
      if (obj.material) obj.material.opacity = _ease(p) * targetOpacity;
    });
  }

  // Scale object from 0 to target
  function _animScaleIn(anims, obj, delay, dur, targetScale) {
    obj.scale.setScalar(0.001);
    obj.visible = false;
    const ts = targetScale || 1;
    anims.push((t) => {
      if (t < delay) return;
      obj.visible = true;
      const p = Math.min(1, (t - delay) / dur);
      const ep = _ease(p);
      // overshoot bounce
      const s = p < 1 ? ep * ts * (1 + 0.15 * Math.sin(ep * Math.PI)) : ts;
      obj.scale.setScalar(s);
    });
  }

  // Sprite: fade + slide up
  function _animSpriteIn(anims, sprite, delay, dur) {
    sprite.material.transparent = true;
    sprite.material.opacity = 0;
    sprite.visible = false;
    const targetY = sprite.position.y;
    anims.push((t) => {
      if (t < delay) return;
      sprite.visible = true;
      const p = Math.min(1, (t - delay) / dur);
      const ep = _ease(p);
      sprite.material.opacity = ep;
      sprite.position.y = targetY - 0.3 * (1 - ep);
    });
  }

  // Draw a line progressively
  function _animDrawLine(anims, line, delay, dur) {
    const geo = line.geometry;
    const totalCount = geo.attributes.position.count;
    geo.setDrawRange(0, 0);
    line.visible = false;
    anims.push((t) => {
      if (t < delay) return;
      line.visible = true;
      const p = Math.min(1, (t - delay) / dur);
      geo.setDrawRange(0, Math.floor(_ease(p) * totalCount));
    });
  }

  // Continuous pulse (scale oscillation)
  function _animPulse(anims, obj, delay, baseScale, amplitude, speed) {
    anims.push((t) => {
      if (t < delay) return;
      const s = baseScale + amplitude * Math.sin((t - delay) * speed);
      obj.scale.setScalar(s);
    });
  }

  // Continuous glow pulse (opacity oscillation)
  function _animGlowPulse(anims, obj, delay, baseOpacity, amplitude, speed) {
    anims.push((t) => {
      if (t < delay) return;
      obj.material.opacity = baseOpacity + amplitude * Math.sin((t - delay) * speed);
    });
  }

  // Slide position from A to B
  function _animSlideIn(anims, obj, delay, dur, fromPos, toPos) {
    obj.position.copy(fromPos);
    obj.visible = false;
    anims.push((t) => {
      if (t < delay) return;
      obj.visible = true;
      const p = Math.min(1, (t - delay) / dur);
      const ep = _ease(p);
      obj.position.lerpVectors(fromPos, toPos, ep);
    });
  }

  // ==================== SHARED DRAW HELPERS ====================

  function _addLabel(scene, text, position, color, scale, anims, delay) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillStyle = '#' + (color || 0xffffff).toString(16).padStart(6, '0');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: anims ? 0 : 1 });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(position);
    const s = scale || 1;
    sprite.scale.set(3 * s, 0.75 * s, 1);
    scene.add(sprite);
    if (anims) _animSpriteIn(anims, sprite, delay || 0, 0.4);
    return sprite;
  }

  function _drawLine2DAnim(scene, eq, color, label, range, anims, delay) {
    const [a, b, c] = eq;
    const r = range || 8;
    const pts = [];
    if (Math.abs(b) > 1e-10) {
      for (let t = -r; t <= r; t += 0.1) {
        pts.push(new THREE.Vector3(t, 0.01, (c - a * t) / b));
      }
    } else if (Math.abs(a) > 1e-10) {
      const x = c / a;
      pts.push(new THREE.Vector3(x, 0.01, -r));
      pts.push(new THREE.Vector3(x, 0.01, r));
    }
    if (pts.length < 2) return;
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    if (anims) _animDrawLine(anims, line, delay || 0, 0.8);
    if (label) {
      const mid = pts[Math.floor(pts.length / 2)];
      _addLabel(scene, label, new THREE.Vector3(mid.x + 0.5, 0.4, mid.z), color, 0.7, anims, (delay || 0) + 0.6);
    }
    return line;
  }

  function _addGrid2D(scene, size, divisions) {
    size = size || 16;
    divisions = divisions || 16;
    scene.add(new THREE.GridHelper(size, divisions, 0x252540, 0x1a1a30));
  }

  function _addAxes2D(scene, length) {
    const len = length || 6;
    const xPts = [new THREE.Vector3(-len, 0.02, 0), new THREE.Vector3(len, 0.02, 0)];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(xPts), new THREE.LineBasicMaterial({ color: 0x666680 })));
    _addLabel(scene, 'x', new THREE.Vector3(len + 0.3, 0.3, 0), 0x8888aa, 0.6);
    const zPts = [new THREE.Vector3(0, 0.02, -len), new THREE.Vector3(0, 0.02, len)];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(zPts), new THREE.LineBasicMaterial({ color: 0x666680 })));
    _addLabel(scene, 'y', new THREE.Vector3(0, 0.3, len + 0.3), 0x8888aa, 0.6);
  }

  function _addSphereAnim(scene, x, y, z, color, emissive, radius, anims, delay) {
    const geo = new THREE.SphereGeometry(radius || 0.15, 16, 16);
    const mat = new THREE.MeshStandardMaterial({ color: color, emissive: emissive || 0x000000, emissiveIntensity: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    if (anims) {
      _animScaleIn(anims, mesh, delay || 0, 0.5, 1);
      _animPulse(anims, mesh, (delay || 0) + 0.5, 1, 0.12, 3);
    }
    return mesh;
  }

  function _addAxes3D(scene, length) {
    const len = length || 5;
    const colors = [0xff4444, 0x44ff44, 0x4488ff];
    const labels = ['x', 'y', 'z'];
    const dirs = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)];
    for (let i = 0; i < 3; i++) {
      const arrow = new THREE.ArrowHelper(dirs[i], new THREE.Vector3(0,0,0), len, colors[i], 0.2, 0.1);
      scene.add(arrow);
      const pos = dirs[i].clone().multiplyScalar(len + 0.4);
      _addLabel(scene, labels[i], pos, colors[i], 0.5);
    }
  }

  // ==================== SCENE BUILDERS ====================

  const SCENE_BUILDERS = {

    // ── TOPIC 1: LINEAR EQUATIONS ──

    'teach-2d-single-line': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene);
      _addAxes2D(scene);
      const color = config.color || 0x58a6ff;
      _drawLine2DAnim(scene, [config.a || 1, config.b || 1, config.c || 3], color, config.label || '', 8, anims, 0.3);
    },

    'teach-2d-solution-on-line': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene);
      _addAxes2D(scene);
      // Line draws in first
      _drawLine2DAnim(scene, [config.a, config.b, config.c], 0x58a6ff, '', 8, anims, 0.2);
      // Solution points pop in staggered after line
      (config.solutions || []).forEach(([sx, sz], i) => {
        const d = 1.2 + i * 0.4;
        _addSphereAnim(scene, sx, 0.15, sz, 0x3fb950, 0x1a5c28, 0.15, anims, d);
        _addLabel(scene, '(' + sx + ', ' + sz + ')', new THREE.Vector3(sx, 0.6, sz), 0x3fb950, 0.55, anims, d + 0.2);
      });
      // Non-solution point last
      if (config.nonSolution) {
        const [nx, nz] = config.nonSolution;
        const d = 1.2 + (config.solutions || []).length * 0.4 + 0.3;
        _addSphereAnim(scene, nx, 0.15, nz, 0xf85149, 0x660000, 0.15, anims, d);
        _addLabel(scene, '(' + nx + ', ' + nz + ') \u2717', new THREE.Vector3(nx, 0.6, nz), 0xf85149, 0.55, anims, d + 0.2);
      }
    },

    // ── TOPIC 2: SYSTEMS OF LINEAR EQUATIONS ──

    'teach-2d-system-intersect': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene);
      _addAxes2D(scene);
      _drawLine2DAnim(scene, config.eq1, 0x58a6ff, config.label1 || '', 8, anims, 0.2);
      _drawLine2DAnim(scene, config.eq2, 0xd29922, config.label2 || '', 8, anims, 0.6);
      // Intersection point
      const [a1, b1, c1] = config.eq1;
      const [a2, b2, c2] = config.eq2;
      const det = a1 * b2 - a2 * b1;
      if (Math.abs(det) > 1e-10) {
        const xi = (c1 * b2 - c2 * b1) / det;
        const zi = (a1 * c2 - a2 * c1) / det;
        _addSphereAnim(scene, xi, 0.2, zi, 0xff4444, 0x880000, 0.2, anims, 1.5);
        _addLabel(scene, '(' + xi.toFixed(1) + ', ' + zi.toFixed(1) + ')', new THREE.Vector3(xi, 0.8, zi), 0xff4444, 0.65, anims, 1.8);
        _addLabel(scene, 'Unique Solution', new THREE.Vector3(xi, 1.4, zi), 0xffffff, 0.6, anims, 2.0);
      }
    },

    'teach-2d-system-parallel': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene);
      _addAxes2D(scene);
      _drawLine2DAnim(scene, config.eq1, 0x58a6ff, config.label1 || '', 8, anims, 0.2);
      _drawLine2DAnim(scene, config.eq2, 0xd29922, config.label2 || '', 8, anims, 0.6);
      _addLabel(scene, 'No Solution \u2014 Parallel Lines', new THREE.Vector3(0, 0.8, 0), 0xf85149, 0.8, anims, 1.6);
    },

    'teach-2d-system-coincident': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene);
      _addAxes2D(scene);
      _drawLine2DAnim(scene, config.eq1, 0x58a6ff, config.label1 || '', 8, anims, 0.2);
      _drawLine2DAnim(scene, config.eq2, 0xd29922, config.label2 || '', 8, anims, 0.6);
      _addLabel(scene, 'Infinitely Many Solutions', new THREE.Vector3(0, 0.8, 0), 0x3fb950, 0.8, anims, 1.6);
      _addLabel(scene, 'Lines are identical!', new THREE.Vector3(0, 1.5, 0), 0xffffff, 0.6, anims, 2.0);
    },

    'teach-2d-three-cases': (scene, config, cam, ctrl, anims) => {
      _addGrid2D(scene, 30, 30);
      const systems = config.systems || [];
      const spacing = 10;
      systems.forEach((sys, idx) => {
        const offsetX = (idx - 1) * spacing;
        const r = 4;
        const baseDelay = idx * 1.0;

        // Lines draw in
        _drawOffsetLineAnim(scene, sys.eq1, 0x58a6ff, offsetX, r, anims, baseDelay + 0.2);
        _drawOffsetLineAnim(scene, sys.eq2, 0xd29922, offsetX, r, anims, baseDelay + 0.5);
        // Label
        _addLabel(scene, sys.label || '', new THREE.Vector3(offsetX, 0.5, -r - 0.8), 0xffffff, 0.7, anims, baseDelay + 1.0);

        // Intersection point for unique case
        const [a1, b1, c1] = sys.eq1;
        const [a2, b2, c2] = sys.eq2;
        const det = a1 * b2 - a2 * b1;
        if (Math.abs(det) > 1e-10) {
          const xi = (c1 * b2 - c2 * b1) / det;
          const zi = (a1 * c2 - a2 * c1) / det;
          _addSphereAnim(scene, offsetX + xi, 0.2, zi, 0xff4444, 0x880000, 0.18, anims, baseDelay + 1.1);
        }
      });
    },

    // ── TOPIC 3: MATRICES AND ROW OPERATIONS ──

    'teach-matrix-augmented': (scene, config, camera, ctrl, anims) => {
      camera.position.set(0, 0, 14);
      camera.lookAt(0, 0, 0);

      const matrix = config.matrix || [];
      const rows = matrix.length;
      const cols = matrix[0] ? matrix[0].length : 0;
      const cellW = 1.4;
      const cellH = 1.2;
      const totalW = cols * cellW;
      const totalH = rows * cellH;
      const startX = -(totalW / 2) + cellW / 2;
      const startY = (totalH / 2) - cellH / 2;

      // Brackets fade in first
      const bLeft = startX - cellW / 2 - 0.2;
      const bRight = startX + (cols - 1) * cellW + cellW / 2 + 0.2;
      const bTop = startY + cellH / 2 + 0.15;
      const bBot = startY - totalH + cellH / 2 - 0.15;
      const lBracket = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(bLeft + 0.3, bTop, 0), new THREE.Vector3(bLeft, bTop, 0),
          new THREE.Vector3(bLeft, bBot, 0), new THREE.Vector3(bLeft + 0.3, bBot, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0xaaaacc, transparent: true, opacity: 0 })
      );
      scene.add(lBracket);
      _animFadeIn(anims, lBracket, 0.1, 0.4, 1);
      const rBracket = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(bRight - 0.3, bTop, 0), new THREE.Vector3(bRight, bTop, 0),
          new THREE.Vector3(bRight, bBot, 0), new THREE.Vector3(bRight - 0.3, bBot, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0xaaaacc, transparent: true, opacity: 0 })
      );
      scene.add(rBracket);
      _animFadeIn(anims, rBracket, 0.1, 0.4, 1);

      // Divider line
      const divX = startX + (cols - 1.5) * cellW;
      const divLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(divX, bTop, 0), new THREE.Vector3(divX, bBot, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0 })
      );
      scene.add(divLine);
      _animFadeIn(anims, divLine, 0.3, 0.4, 1);

      // Matrix entries cascade in row by row, left to right
      matrix.forEach((row, i) => {
        row.forEach((val, j) => {
          const x = startX + j * cellW;
          const y = startY - i * cellH;
          const isAug = j === cols - 1;
          const color = isAug ? 0xd29922 : 0x58a6ff;
          const delay = 0.4 + i * 0.3 + j * 0.08;
          _addLabel(scene, val.toString(), new THREE.Vector3(x, y, 0), color, 0.6, anims, delay);
        });
      });

      // Background regions fade in after entries
      const bgDelay = 0.4 + rows * 0.3 + cols * 0.08 + 0.2;
      const coeffW = (cols - 1) * cellW + 0.6;
      const coeffMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(coeffW, totalH + 0.4),
        new THREE.MeshBasicMaterial({ color: 0x58a6ff, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      coeffMesh.position.set(startX + ((cols - 2) * cellW) / 2, startY - ((rows - 1) * cellH) / 2, -0.1);
      scene.add(coeffMesh);
      _animFadeIn(anims, coeffMesh, bgDelay, 0.5, 0.1);

      const augMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(cellW + 0.3, totalH + 0.4),
        new THREE.MeshBasicMaterial({ color: 0xd29922, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      augMesh.position.set(startX + (cols - 1) * cellW, startY - ((rows - 1) * cellH) / 2, -0.1);
      scene.add(augMesh);
      _animFadeIn(anims, augMesh, bgDelay + 0.2, 0.5, 0.1);

      // Section labels
      _addLabel(scene, 'Coefficients (A)', new THREE.Vector3(startX + ((cols - 2) * cellW) / 2, startY - totalH, -0.1), 0x58a6ff, 0.55, anims, bgDelay + 0.4);
      _addLabel(scene, 'Constants (b)', new THREE.Vector3(startX + (cols - 1) * cellW, startY - totalH, -0.1), 0xd29922, 0.55, anims, bgDelay + 0.6);
    },

    'teach-matrix-row-op': (scene, config, camera, ctrl, anims) => {
      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const before = config.before || [];
      const after = config.after || [];
      const rows = before.length;
      const cols = before[0] ? before[0].length : 0;
      const cellW = 1.2;
      const cellH = 1.1;
      const gapX = 3;

      // "Before" matrix fades in first
      _drawMatrixBlockAnim(scene, before, -gapX - (cols * cellW) / 2, 1, cellW, cellH, config.changedRow, 0x444466, anims, 0.1);

      // Arrow and operation label appear in the middle
      _addLabel(scene, '\u2192', new THREE.Vector3(0, 1, 0), 0xffffff, 1.2, anims, 1.0);
      _addLabel(scene, config.operation || '', new THREE.Vector3(0, 2.2, 0), 0x3fb950, 0.55, anims, 1.2);

      // "After" matrix slides/fades in
      _drawMatrixBlockAnim(scene, after, gapX - (cols * cellW) / 2, 1, cellW, cellH, config.changedRow, 0x3fb950, anims, 1.4);

      // Labels
      _addLabel(scene, 'Before', new THREE.Vector3(-gapX, -(rows * cellH) / 2 - 0.5, 0), 0x8888aa, 0.5, anims, 0.2);
      _addLabel(scene, 'After', new THREE.Vector3(gapX, -(rows * cellH) / 2 - 0.5, 0), 0x8888aa, 0.5, anims, 1.5);
    },

    // ── TOPIC 4: ECHELON FORMS ──

    'teach-matrix-ref-staircase': (scene, config, camera, ctrl, anims) => {
      camera.position.set(0, 0, 14);
      camera.lookAt(0, 0, 0);

      const matrix = config.matrix || [];
      const pivots = config.pivots || [];
      const rows = matrix.length;
      const cols = matrix[0] ? matrix[0].length : 0;
      const cellW = 1.4;
      const cellH = 1.2;
      const startX = -(cols * cellW) / 2 + cellW / 2;
      const startY = (rows * cellH) / 2 - cellH / 2;

      // Brackets
      const bLeft = startX - cellW / 2 - 0.2;
      const bRight = startX + (cols - 1) * cellW + cellW / 2 + 0.2;
      const bTop = startY + cellH / 2 + 0.15;
      const bBot = startY - (rows - 1) * cellH - cellH / 2 - 0.15;
      const lBr = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(bLeft + 0.3, bTop, 0), new THREE.Vector3(bLeft, bTop, 0),
          new THREE.Vector3(bLeft, bBot, 0), new THREE.Vector3(bLeft + 0.3, bBot, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0xaaaacc, transparent: true, opacity: 0 })
      );
      scene.add(lBr);
      _animFadeIn(anims, lBr, 0.1, 0.3, 1);
      const rBr = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(bRight - 0.3, bTop, 0), new THREE.Vector3(bRight, bTop, 0),
          new THREE.Vector3(bRight, bBot, 0), new THREE.Vector3(bRight - 0.3, bBot, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0xaaaacc, transparent: true, opacity: 0 })
      );
      scene.add(rBr);
      _animFadeIn(anims, rBr, 0.1, 0.3, 1);

      // Entries cascade
      matrix.forEach((row, i) => {
        row.forEach((val, j) => {
          const x = startX + j * cellW;
          const y = startY - i * cellH;
          let color = 0x8888aa;
          const isPivot = pivots.some(p => p[0] === i && p[1] === j);
          if (isPivot) color = 0xff4444;
          else if (val === 0) color = 0x444466;
          _addLabel(scene, val.toString(), new THREE.Vector3(x, y, 0), color, 0.6, anims, 0.2 + i * 0.25 + j * 0.06);
        });
      });

      // Pivot glow rings — appear after entries, then pulse
      const pivotDelay = 0.2 + rows * 0.25 + cols * 0.06 + 0.3;
      pivots.forEach(([pr, pc], idx) => {
        const x = startX + pc * cellW;
        const y = startY - pr * cellH;
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.35, 0.45, 32),
          new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0, side: THREE.DoubleSide })
        );
        ring.position.set(x, y, -0.05);
        scene.add(ring);
        const d = pivotDelay + idx * 0.3;
        _animFadeIn(anims, ring, d, 0.3, 0.6);
        _animGlowPulse(anims, ring, d + 0.3, 0.6, 0.2, 2.5);
      });

      // Staircase line draws in last
      if (pivots.length > 1) {
        const stairPts = [];
        for (let i = 0; i < pivots.length; i++) {
          const x = startX + pivots[i][1] * cellW;
          const y = startY - pivots[i][0] * cellH;
          if (i > 0) {
            stairPts.push(new THREE.Vector3(x, startY - pivots[i - 1][0] * cellH, 0.05));
          }
          stairPts.push(new THREE.Vector3(x, y, 0.05));
        }
        const stairLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(stairPts),
          new THREE.LineBasicMaterial({ color: 0xff8844, linewidth: 2 })
        );
        scene.add(stairLine);
        _animDrawLine(anims, stairLine, pivotDelay + pivots.length * 0.3 + 0.2, 1.0);
      }

      // Title labels
      _addLabel(scene, 'Row Echelon Form', new THREE.Vector3(0, startY + cellH, 0), 0xffffff, 0.7, anims, 0.1);
      const stairLabelDelay = pivotDelay + pivots.length * 0.3 + 1.4;
      _addLabel(scene, 'Pivots descend left \u2192 right', new THREE.Vector3(0, bBot - 0.5, 0), 0xff8844, 0.5, anims, stairLabelDelay);
    },

    'teach-matrix-rref-vs-ref': (scene, config, camera, ctrl, anims) => {
      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const ref = config.ref || [];
      const rref = config.rref || [];
      const pivotCols = config.pivotCols || [];
      const rows = ref.length;
      const cols = ref[0] ? ref[0].length : 0;
      const cellW = 1.2;
      const cellH = 1.1;
      const gapX = 3.5;

      // REF on left — cascades in
      const refStartX = -gapX - (cols * cellW) / 2;
      _drawMatrixEntriesAnim(scene, ref, refStartX, 1, cellW, cellH, pivotCols, false, anims, 0.2);
      _addLabel(scene, 'REF', new THREE.Vector3(-gapX, (rows * cellH) / 2 + 1.2, 0), 0x58a6ff, 0.7, anims, 0.1);

      // Arrow appears
      const arrowDelay = 0.2 + rows * 0.25 + cols * 0.06 + 0.3;
      _addLabel(scene, '\u2192', new THREE.Vector3(0, 1, 0), 0xffffff, 1.2, anims, arrowDelay);
      _addLabel(scene, 'Gauss-Jordan', new THREE.Vector3(0, 2.2, 0), 0x3fb950, 0.5, anims, arrowDelay + 0.2);

      // RREF on right — cascades in after arrow
      const rrefStartX = gapX - (cols * cellW) / 2;
      _drawMatrixEntriesAnim(scene, rref, rrefStartX, 1, cellW, cellH, pivotCols, true, anims, arrowDelay + 0.5);
      _addLabel(scene, 'RREF', new THREE.Vector3(gapX, (rows * cellH) / 2 + 1.2, 0), 0x3fb950, 0.7, anims, arrowDelay + 0.4);
    },

    'teach-3d-three-planes': (scene, config, cam, ctrl, anims) => {
      _addAxes3D(scene, 4);
      scene.add(new THREE.GridHelper(10, 10, 0x252540, 0x1a1a30));

      const equations = config.equations || [];
      const colors = [0x58a6ff, 0x3fb950, 0xd29922];

      equations.forEach(([a, b, c, d], i) => {
        const normal = new THREE.Vector3(a, b, c);
        const len = normal.length();
        if (len < 1e-10) return;

        const nNorm = normal.clone().normalize();
        const dist = d / len;
        const targetPos = nNorm.clone().multiplyScalar(dist);
        // Start far away along normal, slide in
        const fromPos = nNorm.clone().multiplyScalar(dist + 8);

        const planeGeo = new THREE.PlaneGeometry(8, 8);
        const planeMat = new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          flatShading: true
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.lookAt(nNorm);
        mesh.position.copy(fromPos);
        scene.add(mesh);

        const wireGeo = new THREE.PlaneGeometry(8, 8);
        const wireMat = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          wireframe: true,
          transparent: true,
          opacity: 0
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        wireMesh.lookAt(nNorm);
        wireMesh.position.copy(fromPos);
        scene.add(wireMesh);

        // Animate: slide in + fade in
        const delay = 0.3 + i * 0.8;
        _animSlideIn(anims, mesh, delay, 1.0, fromPos.clone(), targetPos.clone());
        _animFadeIn(anims, mesh, delay, 1.0, 0.18);
        _animSlideIn(anims, wireMesh, delay, 1.0, fromPos.clone(), targetPos.clone());
        _animFadeIn(anims, wireMesh, delay, 1.0, 0.3);
      });

      // Solution point bounces in last
      if (config.solution) {
        const [sx, sy, sz] = config.solution;
        const totalDelay = 0.3 + equations.length * 0.8 + 0.5;
        _addSphereAnim(scene, sx, sy, sz, 0xff4444, 0xaa0000, 0.2, anims, totalDelay);
        _addLabel(scene, '(' + sx + ', ' + sy + ', ' + sz + ')', new THREE.Vector3(sx, sy + 0.6, sz), 0xff4444, 0.6, anims, totalDelay + 0.3);
        _addLabel(scene, 'Solution', new THREE.Vector3(sx, sy + 1.2, sz), 0xffffff, 0.5, anims, totalDelay + 0.5);
      }
    },

    'teach-3d-inconsistent': (scene, config, cam, ctrl, anims) => {
      _addAxes3D(scene, 4);
      scene.add(new THREE.GridHelper(10, 10, 0x252540, 0x1a1a30));

      const planes = config.planes || [[1, 0, 0, 2], [1, 0, 0, 5]];
      const colors = [0x58a6ff, 0xd29922];

      planes.forEach(([a, b, c, d], i) => {
        const normal = new THREE.Vector3(a, b, c);
        const len = normal.length();
        if (len < 1e-10) return;

        const nNorm = normal.clone().normalize();
        const dist = d / len;
        const targetPos = nNorm.clone().multiplyScalar(dist);
        const fromPos = nNorm.clone().multiplyScalar(dist + (i === 0 ? -8 : 8));

        const planeGeo = new THREE.PlaneGeometry(8, 8);
        const planeMat = new THREE.MeshStandardMaterial({
          color: colors[i],
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          flatShading: true
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.lookAt(nNorm);
        mesh.position.copy(fromPos);
        scene.add(mesh);

        const delay = 0.3 + i * 1.0;
        _animSlideIn(anims, mesh, delay, 1.2, fromPos.clone(), targetPos.clone());
        _animFadeIn(anims, mesh, delay, 1.0, 0.22);
      });

      // Labels appear after planes settle
      const labelDelay = 0.3 + planes.length * 1.0 + 0.5;
      _addLabel(scene, 'No Intersection \u2014 Inconsistent', new THREE.Vector3(0, 4, 0), 0xf85149, 0.8, anims, labelDelay);
      if (config.label) {
        _addLabel(scene, config.label, new THREE.Vector3(0, 3.2, 0), 0xffffff, 0.55, anims, labelDelay + 0.3);
      }
    }
  };

  // ==================== ANIMATED MATRIX HELPERS ====================

  function _drawOffsetLineAnim(scene, eq, color, offsetX, range, anims, delay) {
    const [a, b, c] = eq;
    const r = range || 4;
    const pts = [];
    if (Math.abs(b) > 1e-10) {
      for (let t = -r; t <= r; t += 0.1) {
        pts.push(new THREE.Vector3(offsetX + t, 0.01, (c - a * t) / b));
      }
    } else if (Math.abs(a) > 1e-10) {
      const x = c / a;
      pts.push(new THREE.Vector3(offsetX + x, 0.01, -r));
      pts.push(new THREE.Vector3(offsetX + x, 0.01, r));
    }
    if (pts.length < 2) return;
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: color }));
    scene.add(line);
    if (anims) _animDrawLine(anims, line, delay || 0, 0.6);
  }

  function _drawMatrixBlockAnim(scene, matrix, startX, startY, cellW, cellH, highlightRow, highlightColor, anims, baseDelay) {
    const rows = matrix.length;
    const cols = matrix[0] ? matrix[0].length : 0;

    // Highlight row background
    if (highlightRow !== undefined && highlightRow !== null) {
      const bg = new THREE.Mesh(
        new THREE.PlaneGeometry(cols * cellW + 0.4, cellH + 0.1),
        new THREE.MeshBasicMaterial({ color: highlightColor, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      bg.position.set(startX + ((cols - 1) * cellW) / 2, startY - highlightRow * cellH, -0.05);
      scene.add(bg);
      _animFadeIn(anims, bg, baseDelay + 0.1, 0.4, 0.15);
    }

    // Entries cascade
    matrix.forEach((row, i) => {
      row.forEach((val, j) => {
        const x = startX + j * cellW;
        const y = startY - i * cellH;
        const isHighlighted = i === highlightRow;
        const color = isHighlighted ? 0x3fb950 : 0x8888aa;
        _addLabel(scene, val.toString(), new THREE.Vector3(x, y, 0), color, 0.5, anims, baseDelay + i * 0.2 + j * 0.05);
      });
    });
  }

  function _drawMatrixEntriesAnim(scene, matrix, startX, startY, cellW, cellH, pivotCols, isRref, anims, baseDelay) {
    matrix.forEach((row, i) => {
      row.forEach((val, j) => {
        const x = startX + j * cellW;
        const y = startY - i * cellH;
        let color = 0x8888aa;
        const isPivotCol = pivotCols.includes(j);
        if (isPivotCol && i === pivotCols.indexOf(j)) {
          color = 0xff4444;
        } else if (isPivotCol && val === 0 && isRref) {
          color = 0x3fb950;
        } else if (isPivotCol && val !== 0 && !isRref && i < pivotCols.indexOf(j)) {
          color = 0xf85149;
        } else if (val === 0) {
          color = 0x444466;
        }
        _addLabel(scene, val.toString(), new THREE.Vector3(x, y, 0), color, 0.5, anims, baseDelay + i * 0.25 + j * 0.06);
      });
    });
  }

  return { mount };
})();
