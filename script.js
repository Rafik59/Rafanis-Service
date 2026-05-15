const schedule = {
  0: [],
  1: [["13:30", "19:30"]],
  2: [["09:30", "12:00"], ["13:30", "19:30"]],
  3: [["09:30", "12:00"], ["13:30", "19:30"]],
  4: [["09:30", "12:00"], ["13:30", "19:30"]],
  5: [["09:30", "12:00"], ["14:00", "19:30"]],
  6: [["09:30", "12:00"], ["13:30", "19:30"]]
};

const earthConfig = {
  desktopScale: 1.22,
  tabletScale: 0.95,
  mobileScale: 0.62,
  desktopPosition: { x: 2.35, y: -0.1, z: -1.25 },
  tabletPosition: { x: 1.65, y: -0.45, z: -1.4 },
  mobilePosition: { x: 0.9, y: -1.35, z: -1.6 }
};

function openContact() {
  const modal = document.getElementById("contactModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeContact() {
  const modal = document.getElementById("contactModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.openContact = openContact;
window.closeContact = closeContact;

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatHour(time) {
  return time.replace(":", "h");
}

function updateStatus() {
  const badge = document.getElementById("statusBadge");
  const label = document.getElementById("statusLabel");
  const subtext = document.getElementById("statusSubtext");

  if (!badge || !label || !subtext) return;

  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todaySlots = schedule[day] || [];

  badge.className = "live-status";

  if (todaySlots.length === 0) {
    badge.classList.add("closed");
    label.textContent = "Fermé aujourd'hui";
    subtext.textContent = "Réouverture selon les prochains horaires";
    return;
  }

  let isOpen = false;
  let nextOpen = null;
  let currentClose = null;

  for (const [start, end] of todaySlots) {
    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      isOpen = true;
      currentClose = end;
      break;
    }

    if (currentMinutes < startMin && !nextOpen) {
      nextOpen = start;
    }
  }

  if (isOpen) {
    const closingIn = timeToMinutes(currentClose) - currentMinutes;

    if (closingIn <= 60) {
      badge.classList.add("closing-soon");
      label.textContent = "Ouvert · ferme bientôt";
    } else {
      badge.classList.add("open");
      label.textContent = "Ouvert actuellement";
    }

    subtext.textContent = `Fermeture à ${formatHour(currentClose)}`;
    return;
  }

  if (nextOpen) {
    const openingIn = timeToMinutes(nextOpen) - currentMinutes;

    if (openingIn <= 60) {
      badge.classList.add("opening-soon");
      label.textContent = "Fermé · ouvre bientôt";
      subtext.textContent = `Ouverture à ${formatHour(nextOpen)}`;
    } else {
      badge.classList.add("closed");
      label.textContent = "Actuellement fermé";
      subtext.textContent = `Prochaine ouverture à ${formatHour(nextOpen)}`;
    }
    return;
  }

  badge.classList.add("closed");
  label.textContent = "Fermé pour aujourd'hui";
  subtext.textContent = "Réouverture au prochain créneau";
}

function initNavigation() {
  const button = document.querySelector(".nav-hamburger");
  const links = document.querySelectorAll(".menu a");

  button?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(open));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      button?.setAttribute("aria-expanded", "false");
    });
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -30px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initModal() {
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) closeContact();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeContact();
  });
}

function createFallbackEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#123454");
  ocean.addColorStop(0.45, "#0b243d");
  ocean.addColorStop(1, "#06172b");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 52; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const w = 120 + Math.random() * 360;
    const h = 34 + Math.random() * 110;
    ctx.fillStyle = i % 2 ? "#59704d" : "#8a815d";
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 90; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      60 + Math.random() * 220,
      7 + Math.random() * 28,
      Math.random() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createFallbackCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let i = 0; i < 180; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      35 + Math.random() * 120,
      6 + Math.random() * 24,
      Math.random() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createFallbackLightsTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,218,150,0.72)";
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height * (0.25 + Math.random() * 0.48);
    const size = Math.random() > 0.9 ? 1.8 : 0.9;
    ctx.globalAlpha = 0.12 + Math.random() * 0.55;
    ctx.fillRect(x, y, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function loadTexture(loader, url, fallback) {
  const texture = fallback;
  loader.load(
    url,
    (loaded) => {
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.anisotropy = 8;
      texture.image = loaded.image;
      texture.colorSpace = loaded.colorSpace;
      texture.anisotropy = loaded.anisotropy;
      texture.wrapS = loaded.wrapS;
      texture.wrapT = loaded.wrapT;
      texture.minFilter = loaded.minFilter;
      texture.magFilter = loaded.magFilter;
      texture.needsUpdate = true;
    },
    undefined,
    () => {}
  );
  return texture;
}

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function initEarthScene() {
  const canvas = document.getElementById("earthCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070c);

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 180);
  camera.position.set(0, 0.1, 10.5);

  const loader = new THREE.TextureLoader();
  const earthMap = loadTexture(
    loader,
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    createFallbackEarthTexture()
  );
  const bumpMap = loadTexture(
    loader,
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
    createFallbackEarthTexture()
  );
  const specularMap = loadTexture(
    loader,
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
    createFallbackEarthTexture()
  );
  const cloudMap = loadTexture(
    loader,
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
    createFallbackCloudTexture()
  );
  const lightsMap = loadTexture(
    loader,
    "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
    createFallbackLightsTexture()
  );

  const earthGroup = new THREE.Group();
  scene.add(earthGroup);

  const radius = 3.05;
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 128, 128),
    new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap,
      bumpScale: 0.035,
      specularMap,
      specular: new THREE.Color(0x1f3548),
      shininess: 18
    })
  );
  earth.rotation.y = -0.42;
  earthGroup.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.01, 96, 96),
    new THREE.MeshLambertMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.36,
      depthWrite: false
    })
  );
  clouds.rotation.y = -0.42;
  earthGroup.add(clouds);

  const cityLights = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.006, 96, 96),
    new THREE.MeshBasicMaterial({
      map: lightsMap,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  cityLights.rotation.y = -0.42;
  earthGroup.add(cityLights);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.045, 96, 96),
    new THREE.MeshBasicMaterial({
      color: 0x9bd7ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
  );
  earthGroup.add(atmosphere);

  const roubaixPosition = latLonToVector3(50.6927, 3.1746, radius * 1.025);
  const marker = new THREE.Group();
  marker.position.copy(roubaixPosition);
  marker.lookAt(new THREE.Vector3(0, 0, 0));

  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(0.08, 0.12, 42),
    new THREE.MeshBasicMaterial({
      color: 0x9bd7ff,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    })
  );
  halo.rotation.x = Math.PI / 2;
  marker.add(pin, halo);
  earth.add(marker);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x9bd7ff,
    transparent: true,
    opacity: 0.42
  });
  const linePoints = [
    roubaixPosition.clone().multiplyScalar(1.01),
    roubaixPosition.clone().multiplyScalar(1.28)
  ];
  const locationLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePoints), lineMaterial);
  earth.add(locationLine);

  const starCount = window.innerWidth < 760 ? 500 : 900;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 90;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 58;
    positions[i * 3 + 2] = -18 - Math.random() * 65;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    starsGeometry,
    new THREE.PointsMaterial({
      color: 0xd8e7f2,
      size: 0.028,
      transparent: true,
      opacity: 0.72,
      depthWrite: false
    })
  );
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0x3b5268, 0.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.45);
  sun.position.set(-5.2, 2.7, 6.4);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x8fc9ff, 0.72);
  rim.position.set(3.8, -1.5, -3.2);
  scene.add(rim);
  const atmosphereGlow = new THREE.PointLight(0x9bd7ff, 0.85, 18);
  atmosphereGlow.position.set(3.2, 0.6, 3.4);
  scene.add(atmosphereGlow);

  const pointer = { x: 0, y: 0 };

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    let config;
    if (width < 760) {
      config = { scale: earthConfig.mobileScale, position: earthConfig.mobilePosition };
    } else if (width < 1024) {
      config = { scale: earthConfig.tabletScale, position: earthConfig.tabletPosition };
    } else {
      config = { scale: earthConfig.desktopScale, position: earthConfig.desktopPosition };
    }

    earthGroup.scale.setScalar(config.scale);
    earthGroup.position.set(config.position.x, config.position.y, config.position.z);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  resize();

  const clock = new THREE.Clock();
  function animate() {
    const delta = Math.min(clock.getDelta(), 0.035);
    const elapsed = clock.getElapsedTime();
    const motion = reduceMotion ? 0.18 : 1;

    earth.rotation.y += delta * 0.035 * motion;
    clouds.rotation.y += delta * 0.047 * motion;
    cityLights.rotation.y = earth.rotation.y;
    atmosphere.rotation.y += delta * 0.018 * motion;
    halo.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.14);
    halo.material.opacity = 0.58 + Math.sin(elapsed * 1.4) * 0.12;

    stars.rotation.y = pointer.x * 0.012;
    stars.rotation.x = pointer.y * 0.008;
    camera.position.x += (pointer.x * 0.13 - camera.position.x) * 0.028;
    camera.position.y += (-pointer.y * 0.09 + 0.1 - camera.position.y) * 0.028;
    camera.lookAt(0.75, -0.05, -1.25);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initRevealAnimations();
  initModal();
  initEarthScene();
  updateStatus();
  setInterval(updateStatus, 60000);
});
