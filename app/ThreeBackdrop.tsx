"use client";

import { useEffect, useRef } from "react";

export function ThreeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let cleanup = () => {};
    let cancelled = false;

    import("three").then((THREE) => {
      if (cancelled) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 8);

      const group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.BufferGeometry();
      const count = 240;
      const positions = new Float32Array(count * 3);

      for (let index = 0; index < count; index += 1) {
        const angle = index * 0.61;
        const radius = 1.1 + (index % 42) * 0.085;
        positions[index * 3] = Math.cos(angle) * radius;
        positions[index * 3 + 1] = Math.sin(angle) * radius * 0.68;
        positions[index * 3 + 2] = ((index % 11) - 5) * 0.18;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const points = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color: 0xc7ff37,
          size: 0.028,
          transparent: true,
          opacity: 0.62,
        }),
      );
      group.add(points);

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.25, 0.012, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0x32e6ff, transparent: true, opacity: 0.28 }),
      );
      torus.rotation.x = 1.15;
      group.add(torus);

      const magenta = new THREE.Mesh(
        new THREE.TorusGeometry(3.1, 0.01, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0xff4fb8, transparent: true, opacity: 0.16 }),
      );
      magenta.rotation.x = 1.08;
      magenta.rotation.z = 0.36;
      group.add(magenta);

      const tunnel = new THREE.Group();
      for (let index = 0; index < 9; index += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.3 + index * 0.38, 0.006, 6, 64),
          new THREE.MeshBasicMaterial({
            color: index % 2 ? 0xc7ff37 : 0x32e6ff,
            transparent: true,
            opacity: 0.08 + index * 0.006,
          }),
        );
        ring.position.z = -index * 0.34;
        ring.rotation.x = 0.72;
        tunnel.add(ring);
      }
      tunnel.rotation.z = -0.42;
      group.add(tunnel);

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = event.clientX / window.innerWidth - 0.5;
        pointer.y = event.clientY / window.innerHeight - 0.5;
      };

      const resize = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.00018;
        group.rotation.z = time;
        group.rotation.y += (pointer.x * 0.22 - group.rotation.y) * 0.025;
        group.rotation.x += (-pointer.y * 0.12 - group.rotation.x) * 0.025;
        points.rotation.z = -time * 0.7;
        tunnel.rotation.z = -0.42 + Math.sin(time * 2) * 0.08;
        renderer.render(scene, camera);
      };

      resize();
      animate();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      cleanup = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        torus.geometry.dispose();
        magenta.geometry.dispose();
        tunnel.children.forEach((child) => {
          const mesh = child as THREE.Mesh;
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
        points.material.dispose();
        torus.material.dispose();
        magenta.material.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-backdrop" aria-hidden="true" />;
}
