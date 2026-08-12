"use client";

import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  Float32BufferAttribute,
  LineSegments,
  ShaderMaterial,
  AdditiveBlending,
  Group,
  Color,
  Vector2,
  Vector3,
  Plane,
  Raycaster,
} from "three";
import type { HeroVisual } from "@/lib/schema";

/**
 * Cinematic Flow, rebuilt as filaments rather than a lit surface.
 *
 * The reference is not a shaded solid — it is thousands of hairline threads
 * whose brightness comes from how densely they bunch, and a vortex of
 * concentric rings spiralling into a point. So:
 *
 *  - Geometry is a stack of concentric rings (dense at the centre, sparser
 *    outward) drawn as 1px LineSegments. WebGL ignores lineWidth, which is
 *    exactly what we want here — true hairlines.
 *  - AdditiveBlending with a very low per-line alpha means overlapping
 *    threads sum into the bright cores, and sparse regions stay near black.
 *    Density *is* the lighting model; there is no specular term at all.
 *  - A rotation whose angle falls off with distance from the cursor shears
 *    the rings into the spiral vortex.
 *  - Noise warp is scaled by ring radius, so inner rings stay near-circular
 *    (the concentric eye) while outer rings stretch into the sweeping lobes.
 *
 * Promoted from the /compare concept build: now `fixed` (persists behind all
 * scrolled sections, not just the hero viewport), driven by a `visual` prop
 * (see content/site.json → heroVisual), and with scroll-linked keyframes
 * that calm the vortex/rotation and fade the threads down to an ambient
 * ~30% intensity by one viewport-height of scroll.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uCursor;
  uniform float uCursorStr;

  attribute float aU;      // normalised radius, 0 at centre
  attribute float aJitter;

  varying float vBright;
  varying float vFade;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2v = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2v,p2v), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2v *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2v,x2), dot(p3,x3)));
  }

  void main(){
    float t = uTime * 0.045;
    vec2 base = position.xy;

    // Vortex: rotate about the cursor by an angle that decays with distance.
    // Because the falloff is smooth, rings shear progressively rather than
    // rotating rigidly — that shear is what draws the spiral.
    vec2 rel = base - uCursor;
    float dc = length(rel);
    float swirl = exp(-dc * dc * 0.0022) * uCursorStr;
    float a = swirl * 3.4;
    float sa = sin(a), ca = cos(a);
    vec2 p = uCursor + vec2(rel.x * ca - rel.y * sa, rel.x * sa + rel.y * ca);

    // Noise warp scaled by radius: centre stays a tight concentric eye,
    // outer rings stretch into the big sweeping lobes.
    float warp = smoothstep(0.03, 1.0, aU) * 11.0;
    float n1 = snoise(vec3(p * 0.052, t));
    float n2 = snoise(vec3(p * 0.052 + 41.7, t));
    p += vec2(n1, n2) * warp;

    float z = snoise(vec3(p * 0.040 + 11.3, t * 0.85)) * warp * 1.15;

    // Threads bunch where the warp compresses them; approximate that with
    // the local noise gradient so bunched areas also read brighter.
    float grad = abs(n1 - n2);
    vBright = (0.35 + grad * 0.9) * (0.55 + swirl * 2.6) * (0.5 + aJitter * 0.5);
    vFade = 1.0 - smoothstep(0.62, 1.0, aU);

    vec4 mv = modelViewMatrix * vec4(p, z, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3  uColor;
  uniform float uAlpha;
  varying float vBright;
  varying float vFade;
  void main(){
    gl_FragColor = vec4(uColor * vBright, uAlpha * vBright * vFade);
  }
`;

const DEFAULT_VISUAL: HeroVisual = {
  rings: 210,
  ringsMobile: 90,
  segments: 250,
  segmentsMobile: 140,
  maxRadius: 46,
  vortexStrength: 1,
  threadAlpha: 0.09,
  color: "#dfe6f2",
  rotationSpeed: 0.012,
};

// Scroll-linked keyframes: intensity is full at the top of the page and
// eases down to a low-key ambient state by one viewport height of scroll
// (i.e. past Hero, calm through Work/About/Experience/Contact).
const SCROLL_KEYFRAMES = [
  { p: 0, alpha: 1, vortex: 1, rotation: 1 },
  { p: 0.33, alpha: 0.7, vortex: 0.7, rotation: 0.7 },
  { p: 0.66, alpha: 0.45, vortex: 0.45, rotation: 0.5 },
  { p: 1, alpha: 0.3, vortex: 0.25, rotation: 0.3 },
];

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

function sampleScrollKeyframes(progress: number) {
  for (let i = 0; i < SCROLL_KEYFRAMES.length - 1; i++) {
    const a = SCROLL_KEYFRAMES[i];
    const b = SCROLL_KEYFRAMES[i + 1];
    if (progress <= b.p || i === SCROLL_KEYFRAMES.length - 2) {
      const local = smoothstep(a.p, b.p, progress);
      return {
        alpha: a.alpha + (b.alpha - a.alpha) * local,
        vortex: a.vortex + (b.vortex - a.vortex) * local,
        rotation: a.rotation + (b.rotation - a.rotation) * local,
      };
    }
  }
  return SCROLL_KEYFRAMES[SCROLL_KEYFRAMES.length - 1];
}

export default function HeroFilament({ visual }: { visual?: Partial<HeroVisual> }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const v = { ...DEFAULT_VISUAL, ...visual };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return;
    }
    if (!renderer.getContext()) return;

    const BG = new Color(0x050607);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(BG, 1);
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 400);
    camera.position.set(0, 0, 66);
    camera.lookAt(0, 0, 0);

    const group = new Group();
    group.rotation.set(-0.42, 0.22, 0.14);
    scene.add(group);

    const RINGS = isMobile ? v.ringsMobile : v.rings;
    const SEG = isMobile ? v.segmentsMobile : v.segments;
    const MAXR = v.maxRadius;

    const verts: number[] = [];
    const us: number[] = [];
    const jit: number[] = [];

    for (let i = 1; i <= RINGS; i++) {
      const u = i / RINGS;
      // Exponent > 1 crowds rings toward the centre, matching the dense eye.
      const r = Math.pow(u, 1.55) * MAXR;
      const j = Math.random();
      for (let s = 0; s < SEG; s++) {
        const a0 = (s / SEG) * Math.PI * 2;
        const a1 = ((s + 1) / SEG) * Math.PI * 2;
        verts.push(Math.cos(a0) * r, Math.sin(a0) * r, 0);
        verts.push(Math.cos(a1) * r, Math.sin(a1) * r, 0);
        us.push(u, u);
        jit.push(j, j);
      }
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(verts, 3));
    geo.setAttribute("aU", new Float32BufferAttribute(us, 1));
    geo.setAttribute("aJitter", new Float32BufferAttribute(jit, 1));

    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uCursor: { value: new Vector2(0, 0) },
        uCursorStr: { value: v.vortexStrength },
        uColor: { value: new Color(v.color) },
        uAlpha: { value: v.threadAlpha },
      },
    });

    const lines = new LineSegments(geo, mat);
    group.add(lines);

    // Pointer -> the ring plane, scoped to this panel's own rect.
    const raycaster = new Raycaster();
    const ndc = new Vector2(0, 0);
    const basePlane = new Plane(new Vector3(0, 0, 1), 0);
    const hit = new Vector3();
    const target = new Vector2(0, 0);
    const smooth = new Vector2(0, 0);

    function onPointerMove(ev: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      if (ev.clientX < rect.left || ev.clientX > rect.right || ev.clientY < rect.top || ev.clientY > rect.bottom) return;
      ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      group.updateMatrixWorld(true);
      const localPlane = basePlane.clone().applyMatrix4(group.matrixWorld);
      if (raycaster.ray.intersectPlane(localPlane, hit)) {
        group.worldToLocal(hit);
        target.set(hit.x, hit.y);
      }
    }
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    function onResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", onResize);

    let running = true;
    function onVisibility() {
      running = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", onVisibility);
    function onContextLost(e: Event) {
      e.preventDefault();
      running = false;
    }
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    let raf = 0;
    const start = performance.now();
    let lastRender = 0;
    let prevT = 0;
    let rotationAngle = group.rotation.z;

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const now = performance.now();
      if (isMobile && now - lastRender < 33) return;
      lastRender = now;
      const t = (now - start) / 1000;
      const dt = prevT === 0 ? 0 : t - prevT;
      prevT = t;

      // Heavy damping: the vortex trails the cursor and settles.
      smooth.x += (target.x - smooth.x) * 0.045;
      smooth.y += (target.y - smooth.y) * 0.045;

      const scrollProgress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      const kf = sampleScrollKeyframes(scrollProgress);

      mat.uniforms.uTime.value = t;
      mat.uniforms.uCursor.value.copy(smooth);
      mat.uniforms.uCursorStr.value = v.vortexStrength * kf.vortex;
      mat.uniforms.uAlpha.value = v.threadAlpha * kf.alpha;

      rotationAngle += v.rotationSpeed * kf.rotation * dt;
      group.rotation.z = rotationAngle;

      renderer.render(scene, camera);
    }

    if (reduceMotion) {
      mat.uniforms.uTime.value = 5;
      renderer.render(scene, camera);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- visual params only meant to seed initial render; live tuning happens via admin re-render (future phase), not prop churn here.
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 z-0" aria-hidden="true" tabIndex={-1} style={{ pointerEvents: "none" }} />
  );
}
