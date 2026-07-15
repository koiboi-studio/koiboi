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
      const count = 180;
      const positions = new Float32Array(count * 3);

      for (let index = 0; index < count; index += 1) {
        const angle = index * 0.48;
        const radius = 1.2 + (index % 36) * 0.075;
        positions[index * 3] = Math.cos(angle) * radius;
        positions[index * 3 + 1] = Math.sin(angle) * radius * 0.68;
        positions[index * 3 + 2] = ((index % 11) - 5) * 0.18;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const points = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color: 0xc7ff37,
          size: 0.035,
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
        group.rotation.y = Math.sin(time * 1.6) * 0.18;
        points.rotation.z = -time * 0.7;
        renderer.render(scene, camera);
      };

      resize();
      animate();
      window.addEventListener("resize", resize);

      cleanup = () => {
        window.removeEventListener("resize", resize);
        geometry.dispose();
        torus.geometry.dispose();
        magenta.geometry.dispose();
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
