"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL "water-splash" ripple reveal — recreation of the bleibtgleich.dev
 * hero fluid-canvas effect. The section is white at rest; moving the cursor
 * injects impulses into a ping-pong damped-wave simulation. The resulting
 * ripple height + gradient displaces and reveals the project-cover imagery
 * underneath (which slowly cross-fades like a looping video), then fades
 * back to white as the water settles.
 */

const COVERS = [
  "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/bleibtgleich-25.avif",
  "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/velor-app.avif",
  "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/grabl-app.avif",
  "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/do-lorem-ipsum.avif",
];

const IMAGE_ASPECT = 1011 / 680;

const SIM_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uForce;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uDamping;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 s = texture2D(uState, uv);
    float h = s.x;
    float hPrev = s.y;

    float l = texture2D(uState, uv - vec2(uTexel.x, 0.0)).x;
    float r = texture2D(uState, uv + vec2(uTexel.x, 0.0)).x;
    float u = texture2D(uState, uv + vec2(0.0, uTexel.y)).x;
    float d = texture2D(uState, uv - vec2(0.0, uTexel.y)).x;

    float newH = (l + r + u + d) * 0.5 - hPrev;
    newH *= uDamping;

    // Distance from this texel to the mouse-move segment (aspect corrected),
    // so a fast swipe lays down a continuous splash trail.
    vec2 aspect = vec2(uAspect, 1.0);
    vec2 p = uv * aspect;
    vec2 a = uPrevMouse * aspect;
    vec2 b = uMouse * aspect;
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
    float dist = length(pa - ba * t);
    float splat = smoothstep(uRadius, 0.0, dist) * uForce;
    newH += splat;

    newH = clamp(newH, -1.0, 1.0);
    gl_FragColor = vec4(newH, h, 0.0, 1.0);
  }
`;

const DISPLAY_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform sampler2D uTex0;
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform sampler2D uTex3;
  uniform float uTime;
  uniform float uScreenAspect;
  uniform float uImageAspect;
  uniform vec3 uBg;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, float sA, float iA) {
    vec2 r = uv - 0.5;
    if (sA > iA) { r.y *= iA / sA; } else { r.x *= sA / iA; }
    return r + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float h = texture2D(uState, uv).x;
    float hx = texture2D(uState, uv + vec2(uTexel.x, 0.0)).x
             - texture2D(uState, uv - vec2(uTexel.x, 0.0)).x;
    float hy = texture2D(uState, uv + vec2(0.0, uTexel.y)).x
             - texture2D(uState, uv - vec2(0.0, uTexel.y)).x;
    vec3 normal = normalize(vec3(-hx, -hy, 0.14));

    // Cover-fit UVs with a subtle drift + ripple displacement.
    vec2 base = coverUv(uv, uScreenAspect, uImageAspect);
    base += vec2(sin(uTime * 0.05), cos(uTime * 0.04)) * 0.01;
    vec2 disp = clamp(base + normal.xy * 0.07, 0.001, 0.999);

    // Cross-fade the four covers like a looping video.
    float ph = mod(uTime * 0.16, 4.0);
    int i0 = int(ph);
    float f = smoothstep(0.0, 1.0, fract(ph));
    vec3 s0 = texture2D(uTex0, disp).rgb;
    vec3 s1 = texture2D(uTex1, disp).rgb;
    vec3 s2 = texture2D(uTex2, disp).rgb;
    vec3 s3 = texture2D(uTex3, disp).rgb;
    vec3 arr0 = i0 == 0 ? s0 : i0 == 1 ? s1 : i0 == 2 ? s2 : s3;
    vec3 arr1 = i0 == 0 ? s1 : i0 == 1 ? s2 : i0 == 2 ? s3 : s0;
    vec3 img = mix(arr0, arr1, f);

    float energy = clamp(abs(h) * 2.5 + length(vec2(hx, hy)) * 6.0, 0.0, 1.0);
    float reveal = smoothstep(0.06, 0.32, energy);

    vec3 color = mix(uBg, img, reveal);

    // Water sheen along the wavefront.
    float highlight = pow(
      clamp(dot(normalize(vec3(hx, hy, 0.2)), normalize(vec3(0.6, 0.6, 1.0))), 0.0, 1.0),
      8.0
    );
    color += highlight * reveal * 0.22;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export function RippleReveal({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry);
    scene.add(mesh);

    // Sim resolution (kept low; the wave field doesn't need many texels).
    let simW = 320;
    let simH = 320;

    const rtOpts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let rtA = new THREE.WebGLRenderTarget(simW, simH, rtOpts);
    let rtB = new THREE.WebGLRenderTarget(simW, simH, rtOpts);

    const simMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: SIM_FRAG,
      uniforms: {
        uState: { value: rtA.texture },
        uTexel: { value: new THREE.Vector2(1 / simW, 1 / simH) },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uPrevMouse: { value: new THREE.Vector2(-1, -1) },
        uForce: { value: 0 },
        uAspect: { value: 1 },
        uRadius: { value: 0.045 },
        uDamping: { value: reduceMotion ? 0.9 : 0.945 },
      },
    });

    const loader = new THREE.TextureLoader();
    const loadTex = (url: string) =>
      loader.load(url, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.wrapS = THREE.ClampToEdgeWrapping;
        t.wrapT = THREE.ClampToEdgeWrapping;
      });
    const textures = COVERS.map(loadTex);

    const displayMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: DISPLAY_FRAG,
      uniforms: {
        uState: { value: rtB.texture },
        uTexel: { value: new THREE.Vector2(1 / simW, 1 / simH) },
        uTex0: { value: textures[0] },
        uTex1: { value: textures[1] },
        uTex2: { value: textures[2] },
        uTex3: { value: textures[3] },
        uTime: { value: 0 },
        uScreenAspect: { value: 1 },
        uImageAspect: { value: IMAGE_ASPECT },
        uBg: { value: new THREE.Color(0xffffff) },
      },
    });

    // Pointer tracking (uv space, y-up to match the plane).
    const mouse = new THREE.Vector2(-1, -1);
    const prevMouse = new THREE.Vector2(-1, -1);
    let targetForce = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1 - (clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      prevMouse.copy(mouse.x < 0 ? new THREE.Vector2(x, y) : mouse);
      mouse.set(x, y);
      const moved = prevMouse.distanceTo(mouse);
      targetForce = Math.min(0.03 + moved * 3.5, 0.16);
    };

    const onMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const onLeave = () => {
      mouse.set(-1, -1);
      prevMouse.set(-1, -1);
      targetForce = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      displayMat.uniforms.uScreenAspect.value = aspect;
      simMat.uniforms.uAspect.value = aspect;

      // Keep sim texels roughly square so ripples stay circular.
      simW = 320;
      simH = Math.max(64, Math.round(320 / aspect));
      rtA.setSize(simW, simH);
      rtB.setSize(simW, simH);
      const texel = new THREE.Vector2(1 / simW, 1 / simH);
      simMat.uniforms.uTexel.value = texel;
      displayMat.uniforms.uTexel.value = texel;
    };
    resize();
    window.addEventListener("resize", resize);

    // Clear both targets to the rest state (height 0).
    const clearColor = new THREE.Color(0, 0, 0);
    for (const rt of [rtA, rtB]) {
      renderer.setRenderTarget(rt);
      renderer.setClearColor(clearColor, 1);
      renderer.clear();
    }
    renderer.setRenderTarget(null);

    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      displayMat.uniforms.uTime.value += dt;

      // Ease the injection force down when the pointer stops moving.
      targetForce *= 0.82;
      simMat.uniforms.uForce.value = targetForce;
      simMat.uniforms.uMouse.value.copy(mouse);
      simMat.uniforms.uPrevMouse.value.copy(
        prevMouse.x < 0 ? mouse : prevMouse
      );

      // Sim step: read rtA, write rtB.
      simMat.uniforms.uState.value = rtA.texture;
      mesh.material = simMat;
      renderer.setRenderTarget(rtB);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);

      // Display using the freshly written rtB.
      displayMat.uniforms.uState.value = rtB.texture;
      mesh.material = displayMat;
      renderer.render(scene, camera);

      // Swap.
      const tmp = rtA;
      rtA = rtB;
      rtB = tmp;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerleave", onLeave);
      rtA.dispose();
      rtB.dispose();
      simMat.dispose();
      displayMat.dispose();
      geometry.dispose();
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
