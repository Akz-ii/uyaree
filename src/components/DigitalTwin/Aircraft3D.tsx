import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SubsystemHealth, SubsystemId } from '../../types/uyaree';
import { RotateCcw, ZoomIn, ZoomOut, Eye, AlertTriangle, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface Aircraft3DProps {
  subsystems: SubsystemHealth[];
  selectedSubsystemId: SubsystemId | null;
  onSelectSubsystem: (id: SubsystemId) => void;
  isSimulating?: boolean;
}

export const Aircraft3D: React.FC<Aircraft3DProps> = ({
  subsystems,
  selectedSubsystemId,
  onSelectSubsystem,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredSub, setHoveredSub] = useState<SubsystemHealth | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const angleRef = useRef({ theta: 0.4, phi: 1.1, radius: 20 });
  const targetAngle = useRef({ theta: 0.4, phi: 1.1, radius: 20 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const aircraftRef = useRef<THREE.Group | null>(null);

  // High risk & Medium risk subsystems
  const highRiskSub = subsystems.find(s => s.id === 'engine2');
  const mediumRiskSub = subsystems.find(s => s.id === 'electrical');

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050a15');

    // Camera
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    el.innerHTML = '';
    el.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x8899bb, 0.9));
    const keyLight = new THREE.DirectionalLight(0x00d4ff, 2.2);
    keyLight.position.set(10, 20, 15);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x3366ff, 0.7);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    // Alert Lights
    const redAlertLight = new THREE.PointLight(0xff0044, 0.8, 10);
    redAlertLight.position.set(2.6, -0.65, 0.4);
    scene.add(redAlertLight);

    const orangeAlertLight = new THREE.PointLight(0xffaa00, 0.6, 10);
    orangeAlertLight.position.set(0, 0.8, -4.2);
    scene.add(orangeAlertLight);

    // ---- MATERIALS ----
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.65,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // HIGH RISK (Red Material)
    const highRiskMat = new THREE.MeshBasicMaterial({
      color: 0xff0044,
      transparent: true,
      opacity: 0.20,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const highRiskEdgeMat = new THREE.LineBasicMaterial({ color: 0xff1100, transparent: true, opacity: 0.45 });

    // MEDIUM RISK (Orange / Amber Material)
    const medRiskMat = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      transparent: true,
      opacity: 0.20,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const medRiskEdgeMat = new THREE.LineBasicMaterial({ color: 0xffbb00, transparent: true, opacity: 0.45 });

    // Helper: add mesh + edges & assign subsystem ID for touch/click raycasting
    const addPart = (
      geo: THREE.BufferGeometry, 
      mat: THREE.Material, 
      group: THREE.Group, 
      subsystemId: SubsystemId,
      pos?: [number, number, number], 
      rot?: [number, number, number], 
      customEdgeMat = edgeMat
    ) => {
      const mesh = new THREE.Mesh(geo, mat);
      if (pos) mesh.position.set(...pos);
      if (rot) mesh.rotation.set(...rot);
      mesh.userData = { id: subsystemId };
      group.add(mesh);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), customEdgeMat);
      if (pos) edges.position.set(...pos);
      if (rot) edges.rotation.set(...rot);
      edges.userData = { id: subsystemId };
      group.add(edges);

      return mesh;
    };

    // ======== BUILD REALISTIC AIRCRAFT WITH TOUCHABLE COMPONENTS ========
    const aircraft = new THREE.Group();
    aircraftRef.current = aircraft;
    scene.add(aircraft);

    // A. Main Fuselage Body (Mapped to Fuel System & Structure)
    const fuselageGeo = new THREE.CylinderGeometry(0.65, 0.65, 9.5, 24);
    addPart(fuselageGeo, bodyMat, aircraft, 'fuel', [0, 0, -0.2], [Math.PI / 2, 0, 0]);

    // B. Aerodynamic Nose Radome (Mapped to Avionics)
    const nosePoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const radius = 0.65 * Math.sin(t * Math.PI * 0.5);
      const zLength = 2.2 * Math.cos(t * Math.PI * 0.5);
      nosePoints.push(new THREE.Vector2(radius, zLength));
    }
    const noseGeo = new THREE.LatheGeometry(nosePoints, 24);
    addPart(noseGeo, bodyMat, aircraft, 'avionics', [0, 0, 4.55], [Math.PI / 2, 0, 0]);

    // C. Cockpit Windshield (Mapped to Flight Controls / Avionics)
    const cockpitGeo = new THREE.SphereGeometry(0.62, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const cockpitMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, wireframe: true });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.22, 4.8);
    cockpit.rotation.x = -0.05;
    cockpit.userData = { id: 'avionics' };
    aircraft.add(cockpit);

    // D. Tail Cone Taper — APU & ELECTRICAL BUS (MEDIUM PRIORITY ORANGE COMPONENT)
    const tailPoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 15; i++) {
      const t = i / 15;
      const radius = 0.65 * (1 - t * 0.7);
      const zLength = -t * 2.0;
      tailPoints.push(new THREE.Vector2(radius, zLength));
    }
    const tailGeo = new THREE.LatheGeometry(tailPoints, 24);
    addPart(tailGeo, medRiskMat, aircraft, 'electrical', [0, 0, -4.95], [-Math.PI / 2, 0, 0], medRiskEdgeMat);

    // Medium Priority Orange Pulsing Box & Aura around APU & Electrical Tail
    const medBoxGeo = new THREE.BoxGeometry(1.6, 1.6, 2.2);
    const medBoxWire = new THREE.LineSegments(new THREE.EdgesGeometry(medBoxGeo), medRiskEdgeMat);
    medBoxWire.position.set(0, 0.8, -4.2);
    medBoxWire.userData = { id: 'electrical' };
    aircraft.add(medBoxWire);

    const medAuraGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const medAuraMat = new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.28 });
    const medAuraMesh = new THREE.Mesh(medAuraGeo, medAuraMat);
    medAuraMesh.position.set(0, 0.8, -4.2);
    medAuraMesh.userData = { id: 'electrical' };
    aircraft.add(medAuraMesh);

    const orangeHazardRing = new THREE.Mesh(
      new THREE.RingGeometry(1.0, 1.15, 32),
      new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    orangeHazardRing.rotation.x = -Math.PI / 2;
    orangeHazardRing.position.set(0, -2.57, -4.2);
    orangeHazardRing.userData = { id: 'electrical' };
    aircraft.add(orangeHazardRing);

    // E. Swept Wings & Surfaces (Mapped to Fly-by-Wire Flight Controls)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 1.2);
    wingShape.lineTo(7.2, -1.0);
    wingShape.lineTo(7.0, -1.6);
    wingShape.lineTo(0, -0.6);
    wingShape.lineTo(-7.0, -1.6);
    wingShape.lineTo(-7.2, -1.0);
    wingShape.closePath();

    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.08, bevelEnabled: false });
    addPart(wingGeo, glowMat, aircraft, 'flightControls', [0, -0.08, 0.2], [Math.PI / 2, 0, 0]);

    // Winglets (Left & Right)
    const wingletGeo = new THREE.BoxGeometry(0.06, 0.9, 0.6);
    addPart(wingletGeo, glowMat, aircraft, 'flightControls', [-7.1, 0.35, -1.1], [0, -0.2, 0.15]);
    addPart(wingletGeo, glowMat, aircraft, 'flightControls', [7.1, 0.35, -1.1], [0, 0.2, -0.15]);

    // F. ENGINE 1 — Healthy Port Engine (Mapped to engine1)
    const engine1Geo = new THREE.CylinderGeometry(0.38, 0.34, 2.0, 16);
    addPart(engine1Geo, bodyMat, aircraft, 'engine1', [-2.6, -0.65, 0.4], [Math.PI / 2, 0, 0]);

    const inletGeo = new THREE.TorusGeometry(0.36, 0.04, 8, 24);
    const inletMat1 = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 });
    const inlet1 = new THREE.Mesh(inletGeo, inletMat1);
    inlet1.position.set(-2.6, -0.65, 1.4);
    inlet1.userData = { id: 'engine1' };
    aircraft.add(inlet1);

    // G. ENGINE 2 — HIGH RISK (RED) COMPONENT (Starboard Engine mapped to engine2)
    addPart(engine1Geo, highRiskMat, aircraft, 'engine2', [2.6, -0.65, 0.4], [Math.PI / 2, 0, 0], highRiskEdgeMat);

    // Pulsing Red High-Risk Box Wire & Aura
    const riskBoxGeo = new THREE.BoxGeometry(1.2, 1.2, 2.4);
    const riskBoxWire = new THREE.LineSegments(new THREE.EdgesGeometry(riskBoxGeo), highRiskEdgeMat);
    riskBoxWire.position.set(2.6, -0.65, 0.4);
    riskBoxWire.userData = { id: 'engine2' };
    aircraft.add(riskBoxWire);

    const riskAuraGeo = new THREE.SphereGeometry(1.1, 16, 16);
    const riskAuraMat = new THREE.MeshBasicMaterial({ color: 0xff0044, transparent: true, opacity: 0.25 });
    const riskAuraMesh = new THREE.Mesh(riskAuraGeo, riskAuraMat);
    riskAuraMesh.position.set(2.6, -0.65, 0.4);
    riskAuraMesh.userData = { id: 'engine2' };
    aircraft.add(riskAuraMesh);

    const redHazardRingGeo = new THREE.RingGeometry(0.8, 0.95, 32);
    const redHazardRingMat = new THREE.MeshBasicMaterial({ color: 0xff1100, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const redHazardRing = new THREE.Mesh(redHazardRingGeo, redHazardRingMat);
    redHazardRing.position.set(2.6, -0.65, 1.42);
    redHazardRing.userData = { id: 'engine2' };
    aircraft.add(redHazardRing);

    // H. MAIN LANDING GEAR & HYDRAULICS (Healthy Cyan Components)
    const gearLegGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 12);
    addPart(gearLegGeo, bodyMat, aircraft, 'landingGear', [0, -1.1, 0.2], [0, 0, 0]);

    // Hydraulic system actuators (Mapped to hydraulics)
    const hydBoxGeo = new THREE.BoxGeometry(0.6, 0.4, 1.2);
    addPart(hydBoxGeo, bodyMat, aircraft, 'hydraulics', [0, -0.4, -0.8], [0, 0, 0]);

    // I. Vertical Tail Fin (APU & Electrical Bus Area - Orange Medium Priority)
    const tailFinShape = new THREE.Shape();
    tailFinShape.moveTo(0, 0);
    tailFinShape.lineTo(0, 2.4);
    tailFinShape.lineTo(-1.6, 1.8);
    tailFinShape.lineTo(-2.2, 0);
    tailFinShape.closePath();
    const tailFinGeo = new THREE.ExtrudeGeometry(tailFinShape, { depth: 0.08, bevelEnabled: false });
    addPart(tailFinGeo, medRiskMat, aircraft, 'electrical', [0, 0.6, -4.8], [0, 0, 0], medRiskEdgeMat);

    const stabShape = new THREE.Shape();
    stabShape.moveTo(0, 0.4);
    stabShape.lineTo(2.4, -0.5);
    stabShape.lineTo(2.2, -0.9);
    stabShape.lineTo(0, -0.4);
    stabShape.lineTo(-2.2, -0.9);
    stabShape.lineTo(-2.4, -0.5);
    stabShape.closePath();
    const stabGeo = new THREE.ExtrudeGeometry(stabShape, { depth: 0.06, bevelEnabled: false });
    addPart(stabGeo, glowMat, aircraft, 'flightControls', [0, 0.2, -5.2], [Math.PI / 2, 0, 0]);

    // J. Navigation Lights
    const redLight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    redLight.position.set(-7.1, 0, -1.1);
    aircraft.add(redLight);

    const greenLight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    greenLight.position.set(7.1, 0, -1.1);
    aircraft.add(greenLight);

    const whiteLight = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    whiteLight.position.set(0, 3.0, -5.2);
    aircraft.add(whiteLight);

    // ======== GROUND GRID ========
    const grid = new THREE.GridHelper(32, 32, 0x00f0ff, 0x0a1628);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.15;
    grid.position.y = -2.6;
    scene.add(grid);

    // Ground Target Compass Rings (Cyan, Red for Engine 2, Orange for APU & Electrical Bus)
    const ringCyan = new THREE.Mesh(new THREE.RingGeometry(5.8, 5.9, 64), new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.15 }));
    ringCyan.rotation.x = -Math.PI / 2;
    ringCyan.position.y = -2.58;
    scene.add(ringCyan);

    const ringRed = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.3, 32), new THREE.MeshBasicMaterial({ color: 0xff0044, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
    ringRed.rotation.x = -Math.PI / 2;
    ringRed.position.set(2.6, -2.57, 0.4);
    scene.add(ringRed);

    const ringOrange = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.1, 32), new THREE.MeshBasicMaterial({ color: 0xff9900, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
    ringOrange.rotation.x = -Math.PI / 2;
    ringOrange.position.set(0, -2.57, -4.2);
    scene.add(ringOrange);

    // ======== SUBSYSTEM BEACON MARKERS ========
    const markers = new THREE.Group();
    scene.add(markers);

    subsystems.forEach((sub) => {
      const isSelected = selectedSubsystemId === sub.id;
      const isHighRisk = sub.id === 'engine2';
      const isMedRisk = sub.id === 'electrical';
      const color = isHighRisk ? 0xef4444 : isMedRisk ? 0xf59e0b : 0x10b981;

      const dotGeo = new THREE.SphereGeometry(isSelected || isHighRisk || isMedRisk ? 0.28 : 0.2, 14, 14);
      const dotMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: isSelected || isHighRisk || isMedRisk ? 1 : 0.8 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(...sub.position3D);
      dot.userData = { id: sub.id };
      markers.add(dot);

      const glowGeo = new THREE.SphereGeometry(isHighRisk ? 0.45 : isMedRisk ? 0.4 : 0.35, 14, 14);
      const glowM = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: isHighRisk ? 0.4 : isMedRisk ? 0.3 : 0.2 });
      const glow = new THREE.Mesh(glowGeo, glowM);
      glow.position.set(...sub.position3D);
      glow.userData = { id: sub.id };
      markers.add(glow);
    });

    // ======== CONTROLS & RAYCASTING (TOUCH ANY PART OF PLANE TO SEE COMPONENT NAME) ========
    const updateCamera = () => {
      const { theta, phi, radius } = angleRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);
    };
    updateCamera();

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const getIntersectedSubsystemId = (e: PointerEvent | MouseEvent): SubsystemId | null => {
      if (!el || !cameraRef.current || !aircraftRef.current) return null;
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(mx, my), cameraRef.current);

      // Raycast against both aircraft 3D mesh parts AND beacon markers!
      const allObjects = [...aircraftRef.current.children, ...markers.children];
      const hits = ray.intersectObjects(allObjects, true);

      for (const hit of hits) {
        if (hit.object.userData && hit.object.userData.id) {
          return hit.object.userData.id as SubsystemId;
        }
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      // Raycast to detect touched/hovered component
      const subId = getIntersectedSubsystemId(e);
      if (subId) {
        const found = subsystems.find(s => s.id === subId);
        if (found) setHoveredSub(found);
      } else {
        setHoveredSub(null);
      }

      // Drag Orbit
      if (isDragging.current) {
        const dx = e.clientX - prevMouse.current.x;
        const dy = e.clientY - prevMouse.current.y;
        targetAngle.current.theta -= dx * 0.008;
        targetAngle.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2, targetAngle.current.phi + dy * 0.008));
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => { isDragging.current = false; };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetAngle.current.radius = Math.max(8, Math.min(40, targetAngle.current.radius + e.deltaY * 0.02));
    };

    const onClick = (e: MouseEvent) => {
      const subId = getIntersectedSubsystemId(e as unknown as PointerEvent);
      if (subId) {
        onSelectSubsystem(subId);
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('click', onClick);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // ======== ANIMATION LOOP ========
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth camera orbit
      angleRef.current.theta += (targetAngle.current.theta - angleRef.current.theta) * 0.08;
      angleRef.current.phi += (targetAngle.current.phi - angleRef.current.phi) * 0.08;
      angleRef.current.radius += (targetAngle.current.radius - angleRef.current.radius) * 0.08;

      if (autoRotate && !isDragging.current) {
        targetAngle.current.theta += 0.005;
      }

      updateCamera();

      // Pulsing High Risk Effects (Red - Engine 2)
      const redPulse = 1 + Math.sin(t * 5) * 0.2;
      riskAuraMesh.scale.set(redPulse, redPulse, redPulse);
      (riskAuraMat as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(t * 5) * 0.04;
      redHazardRing.scale.set(redPulse, redPulse, redPulse);

      // Pulsing Medium Risk Effects (Orange - Main Landing Gear)
      const orangePulse = 1 + Math.sin(t * 3.5) * 0.18;
      medAuraMesh.scale.set(orangePulse, orangePulse, orangePulse);
      (medAuraMat as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(t * 3.5) * 0.04;
      orangeHazardRing.scale.set(orangePulse, orangePulse, orangePulse);

      // Pulse Subsystem Markers
      markers.children.forEach((child, i) => {
        if (i % 2 === 1) {
          const s = 1 + Math.sin(t * 3.5 + i) * 0.25;
          child.scale.set(s, s, s);
        }
      });

      // Blink nav lights
      redLight.visible = Math.sin(t * 4) > -0.3;
      greenLight.visible = Math.sin(t * 4 + 1) > -0.3;
      whiteLight.visible = Math.sin(t * 5) > -0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!el || !cameraRef.current || !rendererRef.current) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, [subsystems, selectedSubsystemId, autoRotate, onSelectSubsystem]);

  return (
    <div className="relative w-full h-full min-h-[520px] bg-[#050a15] rounded-2xl overflow-hidden border border-cyan-500/25 shadow-2xl flex flex-col select-none">
      {/* Top Header Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3 bg-slate-950/90 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-cyan-500/30 pointer-events-auto shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">3D Interactive Airliner Digital Twin</span>
          <span className="text-[10px] text-slate-500 font-mono">| Touch/Click any part to inspect</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-xl p-1.5 rounded-xl border border-cyan-500/30 pointer-events-auto shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {autoRotate ? '360° Orbit: ON' : '360° Orbit: OFF'}
          </button>
          <button onClick={() => { targetAngle.current.radius = Math.max(8, targetAngle.current.radius - 3); }} className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => { targetAngle.current.radius = Math.min(40, targetAngle.current.radius + 3); }} className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={() => { targetAngle.current = { theta: 0.4, phi: 1.1, radius: 20 }; setAutoRotate(true); }} className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Risk Level Badges Overlay (Red High Risk & Orange Medium Risk) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        {/* Red High Risk Badge */}
        {highRiskSub && (
          <div className="bg-red-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-red-500/50 shadow-xl flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-extrabold block">HIGH RISK (RED)</span>
                <span className="text-xs font-mono text-red-200 font-bold">{highRiskSub.name} ({highRiskSub.health}%)</span>
              </div>
            </div>
            <button
              onClick={() => onSelectSubsystem(highRiskSub.id)}
              className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg text-[10px] font-mono font-bold border border-red-500/40 transition-colors"
            >
              Inspect
            </button>
          </div>
        )}

        {/* Orange Medium Priority Badge */}
        {mediumRiskSub && (
          <div className="bg-amber-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/50 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold block">MEDIUM RISK (ORANGE)</span>
                <span className="text-xs font-mono text-amber-200 font-bold">{mediumRiskSub.name} ({mediumRiskSub.health}%)</span>
              </div>
            </div>
            <button
              onClick={() => onSelectSubsystem(mediumRiskSub.id)}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-lg text-[10px] font-mono font-bold border border-amber-500/40 transition-colors"
            >
              Inspect
            </button>
          </div>
        )}
      </div>

      {/* Floating Component Name & Details Tooltip (Appears when touching / hovering ANY 3D component) */}
      {hoveredSub && (
        <div className="absolute bottom-24 left-6 z-30 bg-slate-950/95 backdrop-blur-xl p-4 rounded-xl border border-cyan-500/50 shadow-2xl max-w-sm pointer-events-none animate-fadeIn border-l-4 border-l-cyan-400">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              INSPECTING 3D MESH
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold ${
              hoveredSub.status === 'CRITICAL' || hoveredSub.risk === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              hoveredSub.status === 'ATTENTION' || hoveredSub.risk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {hoveredSub.health}% HEALTH
            </span>
          </div>

          <h4 className="font-mono text-sm font-extrabold text-slate-100 mb-1">{hoveredSub.name}</h4>
          <p className="text-xs text-slate-300 mb-2 leading-relaxed">{hoveredSub.description}</p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <div>Category: <span className="text-cyan-300 font-bold">{hoveredSub.category}</span></div>
            <div>Risk: <span className={
              hoveredSub.risk === 'HIGH' ? 'text-red-400 font-bold' :
              hoveredSub.risk === 'MEDIUM' ? 'text-amber-400 font-bold' :
              'text-emerald-400 font-bold'
            }>{hoveredSub.risk}</span></div>
            <div>Temp: <span className="text-slate-200">{hoveredSub.metrics.temperature}°C</span></div>
            <div>Vibration: <span className="text-slate-200">{hoveredSub.metrics.vibration}g</span></div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-2 text-right">Click part to open full diagnostics →</span>
        </div>
      )}

      {/* 3D Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Subsystems Quick Selection Bar */}
      <div className="z-10 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/60 p-3 px-4 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono shrink-0">
          <Eye className="w-3.5 h-3.5 text-cyan-500" />
          <span>Subsystems:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {subsystems.map((sub) => {
            const isSelected = selectedSubsystemId === sub.id;
            const isHighRisk = sub.id === 'engine2';
            const isMedRisk = sub.id === 'electrical';
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubsystem(sub.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-400/60 text-cyan-300 shadow-md shadow-cyan-500/15 font-bold'
                    : isHighRisk
                    ? 'bg-red-500/15 border border-red-500/60 text-red-300 font-bold animate-pulse'
                    : isMedRisk
                    ? 'bg-amber-500/15 border border-amber-500/60 text-amber-300 font-bold'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  isHighRisk ? 'bg-red-500 animate-ping' :
                  isMedRisk ? 'bg-amber-500 animate-pulse' :
                  'bg-emerald-500'
                }`} />
                <span>{sub.name.split(' ').slice(0, 2).join(' ')}</span>
                <span className={`text-[10px] font-bold ${
                  isHighRisk ? 'text-red-400' : isMedRisk ? 'text-amber-400' : 'text-slate-600'
                }`}>{sub.health}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
