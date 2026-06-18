// ===== TAJ MAHAL 3D EXPLORER =====
// Interactive 3D visualization with zoom, pan, and interior exploration

class TajMahalExplorer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.tajMahal = null;
        this.door = null;
        this.isInsidePalace = false;
        this.cameraSpeed = 0.5;
        this.zoomLevel = 1.0;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.keys = {};
        
        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.createLighting();
        this.createTajMahal();
        this.setupControls();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
        this.scene.fog = new THREE.Fog(0x87ceeb, 200, 500);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 15, 60);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        const canvas = document.getElementById('canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        canvas.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
        sunLight.position.set(50, 50, 50);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.far = 500;
        sunLight.shadow.camera.left = -100;
        sunLight.shadow.camera.right = 100;
        sunLight.shadow.camera.top = 100;
        sunLight.shadow.camera.bottom = -100;
        this.scene.add(sunLight);

        // Point light for interior
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(0, 30, 0);
        this.scene.add(pointLight);
    }

    createTajMahal() {
        this.tajMahal = new THREE.Group();

        // Main structure
        this.createMainDome();
        this.createMinarets();
        this.createBase();
        this.createWalls();
        this.createDoor();
        this.createDecorations();

        this.scene.add(this.tajMahal);
    }

    createMainDome() {
        // Main dome
        const domeGeometry = new THREE.IcosahedronGeometry(12, 4);
        const domeMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0xcccccc
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.y = 25;
        dome.castShadow = true;
        dome.receiveShadow = true;
        this.tajMahal.add(dome);

        // Dome top (spire)
        const spireGeometry = new THREE.ConeGeometry(2, 8, 32);
        const spireMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1
        });
        const spire = new THREE.Mesh(spireGeometry, spireMaterial);
        spire.position.y = 38;
        spire.castShadow = true;
        this.tajMahal.add(spire);
    }

    createMinarets() {
        const minaretPositions = [
            { x: -18, z: -18 },
            { x: 18, z: -18 },
            { x: -18, z: 18 },
            { x: 18, z: 18 }
        ];

        minaretPositions.forEach(pos => {
            // Minaret cylinder
            const cylinderGeometry = new THREE.CylinderGeometry(2, 2.5, 40, 32);
            const cylinderMaterial = new THREE.MeshStandardMaterial({
                color: 0xf0f0f0,
                metalness: 0.2,
                roughness: 0.5
            });
            const minaret = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            minaret.position.set(pos.x, 20, pos.z);
            minaret.castShadow = true;
            minaret.receiveShadow = true;
            this.tajMahal.add(minaret);

            // Top of minaret
            const topGeometry = new THREE.ConeGeometry(2.5, 5, 32);
            const topMaterial = new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 0.8,
                roughness: 0.2
            });
            const top = new THREE.Mesh(topGeometry, topMaterial);
            top.position.set(pos.x, 40, pos.z);
            top.castShadow = true;
            this.tajMahal.add(top);

            // Balcony
            const balconyGeometry = new THREE.TorusGeometry(3.5, 0.5, 32, 100);
            const balconyMaterial = new THREE.MeshStandardMaterial({
                color: 0xe8e8e8,
                metalness: 0.3,
                roughness: 0.4
            });
            const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
            balcony.rotation.x = Math.PI / 2;
            balcony.position.set(pos.x, 35, pos.z);
            balcony.castShadow = true;
            this.tajMahal.add(balcony);
        });
    }

    createBase() {
        // Platform base
        const baseGeometry = new THREE.BoxGeometry(50, 2, 50);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xd2b48c,
            metalness: 0.1,
            roughness: 0.8
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1;
        base.receiveShadow = true;
        base.castShadow = true;
        this.tajMahal.add(base);

        // Steps
        for (let i = 0; i < 5; i++) {
            const stepGeometry = new THREE.BoxGeometry(60 + i * 4, 0.5, 60 + i * 4);
            const stepMaterial = new THREE.MeshStandardMaterial({
                color: 0xc9a961,
                metalness: 0.1,
                roughness: 0.8
            });
            const step = new THREE.Mesh(stepGeometry, stepMaterial);
            step.position.y = -3 - i * 0.5;
            step.receiveShadow = true;
            this.tajMahal.add(step);
        }
    }

    createWalls() {
        // Main walls
        const wallGeometry = new THREE.BoxGeometry(35, 25, 1);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xfffacd,
            metalness: 0.15,
            roughness: 0.6,
            emissive: 0xf5deb3
        });

        const wallPositions = [
            { x: 0, z: -17.5, rotation: 0 },
            { x: 0, z: 17.5, rotation: 0 },
            { x: -17.5, z: 0, rotation: Math.PI / 2 },
            { x: 17.5, z: 0, rotation: Math.PI / 2 }
        ];

        wallPositions.forEach(pos => {
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(pos.x, 12.5, pos.z);
            wall.rotation.y = pos.rotation;
            wall.castShadow = true;
            wall.receiveShadow = true;
            this.tajMahal.add(wall);
        });
    }

    createDoor() {
        // Door frame
        const doorFrameGeometry = new THREE.BoxGeometry(6, 10, 0.5);
        const doorFrameMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            metalness: 0.3,
            roughness: 0.7
        });
        const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
        doorFrame.position.set(0, 5, -17.6);
        doorFrame.castShadow = true;
        doorFrame.receiveShadow = true;
        this.tajMahal.add(doorFrame);

        // Door (clickable)
        const doorGeometry = new THREE.BoxGeometry(5.5, 9, 0.3);
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0xa0522d,
            metalness: 0.4,
            roughness: 0.6,
            emissive: 0x654321
        });
        this.door = new THREE.Mesh(doorGeometry, doorMaterial);
        this.door.position.set(0, 5, -17.5);
        this.door.castShadow = true;
        this.door.receiveShadow = true;
        this.door.userData.isDoor = true;
        this.tajMahal.add(this.door);

        // Door handle
        const handleGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.95,
            roughness: 0.05
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(2, 5, -17.2);
        handle.castShadow = true;
        this.tajMahal.add(handle);

        // Door decorations (geometric patterns)
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                const gemGeometry = new THREE.OctahedronGeometry(0.2);
                const gemMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
                    metalness: 0.8,
                    roughness: 0.2,
                    emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.3)
                });
                const gem = new THREE.Mesh(gemGeometry, gemMaterial);
                gem.position.set(
                    -2 + i * 0.85,
                    2 + j * 2,
                    -17.2
                );
                gem.castShadow = true;
                this.tajMahal.add(gem);
            }
        }
    }

    createDecorations() {
        // Add decorative elements around the structure
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 25;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const decorGeometry = new THREE.SphereGeometry(0.5, 8, 8);
            const decorMaterial = new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0xffaa00
            });
            const decor = new THREE.Mesh(decorGeometry, decorMaterial);
            decor.position.set(x, 2, z);
            decor.castShadow = true;
            this.scene.add(decor);
        }

        // Ground flowers
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            if (Math.abs(x) < 30 && Math.abs(z) < 30) continue;

            const flowerGeometry = new THREE.SphereGeometry(0.3, 8, 8);
            const flowerMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.9, 0.5),
                emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.3)
            });
            const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
            flower.position.set(x, 0.5, z);
            this.scene.add(flower);
        }
    }

    setupControls() {
        // OrbitControls-like behavior with mouse
        this.controls = {
            autoRotate: true,
            autoRotateSpeed: 0.3,
            targetRotation: 0,
            isDragging: false,
            previousMousePosition: { x: 0, y: 0 }
        };
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', (e) => this.onMouseClick(e));
        window.addEventListener('wheel', (e) => this.onMouseWheel(e));
        window.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (this.controls.isDragging && !this.isInsidePalace) {
            const deltaX = event.clientX - this.controls.previousMousePosition.x;
            const deltaY = event.clientY - this.controls.previousMousePosition.y;

            const qX = new THREE.Quaternion();
            qX.setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.01);

            const qY = new THREE.Quaternion();
            qY.setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaY * 0.01);

            const currentQuat = new THREE.Quaternion();
            currentQuat.setFromRotationMatrix(this.camera.matrix);
            currentQuat.multiplyQuaternions(qX, currentQuat);
            currentQuat.multiplyQuaternions(qY, currentQuat);

            this.camera.quaternion.copy(currentQuat);
        }

        this.controls.previousMousePosition = { x: event.clientX, y: event.clientY };
    }

    onMouseDown(event) {
        this.controls.isDragging = true;
        this.controls.autoRotate = false;
    }

    onMouseUp(event) {
        this.controls.isDragging = false;
    }

    onMouseWheel(event) {
        event.preventDefault();
        const zoomSpeed = 0.1;
        const direction = this.camera.position.clone().normalize();
        
        if (event.deltaY > 0) {
            this.camera.position.addScaledVector(direction, zoomSpeed);
            this.zoomLevel *= 0.95;
        } else {
            this.camera.position.addScaledVector(direction, -zoomSpeed);
            this.zoomLevel *= 1.05;
        }

        this.zoomLevel = Math.max(0.5, Math.min(3, this.zoomLevel));
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.tajMahal.children, true);

        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.userData.isDoor) {
                this.enterPalace();
                return;
            }
        }
    }

    onKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;

        if (event.key === 'Enter' && !this.isInsidePalace) {
            this.enterPalace();
        }

        if (event.key === 'Escape') {
            this.exitPalace();
        }

        if (event.key.toLowerCase() === 'r') {
            this.resetCamera();
        }
    }

    onKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }

    enterPalace() {
        if (!this.isInsidePalace) {
            this.isInsidePalace = true;
            document.getElementById('doorPrompt').style.display = 'none';
            document.getElementById('mode').textContent = 'Interior Exploration';
            document.getElementById('location').textContent = 'Inside Palace';
            
            // Animate camera into the palace
            this.animateCameraToInterior();
            
            // Load interior
            this.createInterior();
        }
    }

    exitPalace() {
        if (this.isInsidePalace) {
            this.isInsidePalace = false;
            document.getElementById('mode').textContent = 'Exterior View';
            document.getElementById('location').textContent = 'Exterior View';
            
            // Remove interior objects
            const objectsToRemove = [];
            this.scene.traverse(obj => {
                if (obj.userData.isInterior) {
                    objectsToRemove.push(obj);
                }
            });
            objectsToRemove.forEach(obj => this.scene.remove(obj));
            
            // Reset camera
            this.resetCamera();
        }
    }

    animateCameraToInterior() {
        const startPos = this.camera.position.clone();
        const endPos = new THREE.Vector3(0, 8, 3);
        const startTime = Date.now();
        const duration = 2000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            this.camera.position.lerpVectors(startPos, endPos, progress);
            this.camera.lookAt(0, 5, 0);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    createInterior() {
        // Main chamber
        const chamberGeometry = new THREE.BoxGeometry(40, 30, 40);
        const chamberMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5deb3,
            side: THREE.BackSide,
            metalness: 0.1,
            roughness: 0.8
        });
        const chamber = new THREE.Mesh(chamberGeometry, chamberMaterial);
        chamber.position.set(0, 15, 0);
        chamber.userData.isInterior = true;
        this.scene.add(chamber);

        // Floor with intricate patterns
        const floorGeometry = new THREE.PlaneGeometry(40, 40);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xdaa520,
            metalness: 0.2,
            roughness: 0.6,
            map: this.createCheckerboardTexture()
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0.1;
        floor.userData.isInterior = true;
        this.scene.add(floor);

        // Ceiling
        const ceilingGeometry = new THREE.PlaneGeometry(40, 40);
        const ceilingMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0xffaa00
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 30;
        ceiling.userData.isInterior = true;
        this.scene.add(ceiling);

        // Pillars
        const pillarPositions = [
            { x: -12, z: -12 },
            { x: 12, z: -12 },
            { x: -12, z: 12 },
            { x: 12, z: 12 },
            { x: -6, z: 0 },
            { x: 6, z: 0 },
            { x: 0, z: -6 },
            { x: 0, z: 6 }
        ];

        pillarPositions.forEach(pos => {
            const pillarGeometry = new THREE.CylinderGeometry(1.5, 1.5, 30, 32);
            const pillarMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.7,
                emissive: 0xcccccc
            });
            const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
            pillar.position.set(pos.x, 15, pos.z);
            pillar.castShadow = true;
            pillar.receiveShadow = true;
            pillar.userData.isInterior = true;
            this.scene.add(pillar);

            // Pillar capital (top decoration)
            const capitalGeometry = new THREE.BoxGeometry(3, 1, 3);
            const capitalMaterial = new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 0.8,
                roughness: 0.2
            });
            const capital = new THREE.Mesh(capitalGeometry, capitalMaterial);
            capital.position.set(pos.x, 30, pos.z);
            capital.castShadow = true;
            capital.userData.isInterior = true;
            this.scene.add(capital);
        });

        // Central chamber details (gems and decorations)
        for (let i = 0; i < 100; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = 1 + Math.random() * 25;
            const z = (Math.random() - 0.5) * 30;

            const gemGeometry = new THREE.OctahedronGeometry(0.15);
            const gemMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.9, 0.5),
                metalness: 0.9,
                roughness: 0.1,
                emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.4)
            });
            const gem = new THREE.Mesh(gemGeometry, gemMaterial);
            gem.position.set(x, y, z);
            gem.castShadow = true;
            gem.userData.isInterior = true;
            this.scene.add(gem);
        }

        // Central pedestal (monument chamber)
        const pedestalGeometry = new THREE.CylinderGeometry(4, 5, 2, 32);
        const pedestalMaterial = new THREE.MeshStandardMaterial({
            color: 0xdaa520,
            metalness: 0.4,
            roughness: 0.5
        });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.position.set(0, 1, 0);
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        pedestal.userData.isInterior = true;
        this.scene.add(pedestal);

        // Main chamber chest/monument
        const monumentGeometry = new THREE.BoxGeometry(3, 4, 3);
        const monumentMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xffaa00
        });
        const monument = new THREE.Mesh(monumentGeometry, monumentMaterial);
        monument.position.set(0, 3, 0);
        monument.castShadow = true;
        monument.userData.isInterior = true;
        this.scene.add(monument);

        // Add interior lighting
        const interiorLight = new THREE.PointLight(0xffd700, 2, 100);
        interiorLight.position.set(0, 25, 0);
        interiorLight.userData.isInterior = true;
        this.scene.add(interiorLight);

        const spotLight1 = new THREE.SpotLight(0xffffff, 1.5);
        spotLight1.position.set(-15, 25, -15);
        spotLight1.target.position.set(0, 5, 0);
        spotLight1.userData.isInterior = true;
        this.scene.add(spotLight1);
        this.scene.add(spotLight1.target);

        const spotLight2 = new THREE.SpotLight(0xffffff, 1.5);
        spotLight2.position.set(15, 25, 15);
        spotLight2.target.position.set(0, 5, 0);
        spotLight2.userData.isInterior = true;
        this.scene.add(spotLight2);
        this.scene.add(spotLight2.target);
    }

    createCheckerboardTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const size = 32;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ctx.fillStyle = (i + j) % 2 === 0 ? '#daa520' : '#cd853f';
                ctx.fillRect(i * size, j * size, size, size);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        return texture;
    }

    resetCamera() {
        this.camera.position.set(0, 15, 60);
        this.camera.lookAt(0, 0, 0);
        this.zoomLevel = 1.0;
        this.controls.autoRotate = true;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateHUD() {
        const camPos = this.camera.position;
        document.getElementById('camPos').textContent = 
            `${camPos.x.toFixed(1)},${camPos.y.toFixed(1)},${camPos.z.toFixed(1)}`;
        document.getElementById('zoom').textContent = `${this.zoomLevel.toFixed(2)}x`;
        
        const distance = this.camera.position.length();
        document.getElementById('distance').textContent = `${distance.toFixed(1)}m`;

        // Check for door proximity
        if (!this.isInsidePalace && this.door) {
            const doorDist = this.camera.position.distanceTo(this.door.position);
            if (doorDist < 20) {
                document.getElementById('doorPrompt').style.display = 'block';
            } else {
                document.getElementById('doorPrompt').style.display = 'none';
            }
        }
    }

    updateKeyboardMovement() {
        const speed = 0.5;
        const moveDirection = new THREE.Vector3();
        
        if (this.keys['w'] || this.keys['arrowup']) {
            moveDirection.z -= speed;
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            moveDirection.z += speed;
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            moveDirection.x -= speed;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            moveDirection.x += speed;
        }

        if (moveDirection.length() > 0) {
            moveDirection.normalize();
            this.camera.position.addScaledVector(moveDirection, speed);
            this.controls.autoRotate = false;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update FPS
        const now = performance.now();
        if (this.lastTime) {
            const fps = Math.round(1000 / (now - this.lastTime));
            document.getElementById('fps').textContent = fps;
        }
        this.lastTime = now;

        // Update object count
        document.getElementById('objCount').textContent = this.scene.children.length;

        // Auto rotate when not dragging
        if (this.controls.autoRotate && !this.isInsidePalace) {
            this.tajMahal.rotation.y += this.controls.autoRotateSpeed * 0.01;
        }

        // Update keyboard movement
        this.updateKeyboardMovement();

        // Update HUD
        this.updateHUD();

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    new TajMahalExplorer();
});
