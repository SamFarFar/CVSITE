import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


export default class SceneInitializer {
    constructor(canvasID) {
        // basic class set up before initialization
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        // Camera Parameters
        this.fov = 85;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasID = canvasID;
        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;
    
        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.spotLight = undefined;

        this.onScroll = this.onScroll.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.curvePoints = [];
        this.startPoint = undefined
        this.path = undefined;
        this.t = 0;
        this.towerCenter = new THREE.Vector3(0.9144808865880965, 13.133300864715576, 0.1071671011090305);
    }
   
    initalize(){
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            this.nearPlane,
            this.farPlane
            );
            

            const canvas = document.getElementById(this.canvasID);

            this.renderer= new THREE.WebGLRenderer({
                canvas,
                antialias:true,
            });
            document.body.appendChild( this.renderer.domElement );
            this.startPoint = new THREE.Vector3(-5.079442473576416,
                3.9072535659226775,
                9.571777431259965);

            // logic for helix spiral movement
             const radius = Math.sqrt(
                Math.pow(this.startPoint.x - this.towerCenter.x, 2) + 
                Math.pow(this.startPoint.z - this.towerCenter.z, 2)
            )*0.7;
            
            const height = 18; // Spiral height
            const revolutions = 0.925; // Full rotations
            const pointsPerRevolution = 10; // Smoothness
            
            const totalPoints = revolutions * pointsPerRevolution;
            for (let i = 0; i < totalPoints; i++) {
                const angle = (i / pointsPerRevolution) * Math.PI * 2 + 2; // Angle in radians
                
                // Compute new X, Z positions relative to tower center
                const x = this.towerCenter.x + radius * Math.cos(angle);
                const z = this.towerCenter.z + radius * Math.sin(angle);
                
                // Gradual upward movement
                const y = this.startPoint.y + (height / totalPoints) * i;
                
                // Add new point to curve
                this.curvePoints.push(new THREE.Vector3(x, y, z));
            }
          
           this.camera.position.set(
                -5.079442473576416,
                3.9072535659226775,
                9.571777431259965)

            this.path = new THREE.CatmullRomCurve3(this.curvePoints);
            this.renderer.setSize(window.innerWidth,window.innerHeight);
            document.body.appendChild(this.renderer.domElement);

            this.stats = new Stats();
            document.body.appendChild(this.stats.dom);
            this.controls = new OrbitControls(this.camera,this.renderer.domElement);
            this.controls.enableZoom = false;  // Allow zooming with scroll
            this.controls.enableRotate = true; // Allow rotation
            this.controls.enablePan = false;   // Disable panning
            this.clock = new THREE.Clock();
            
            this.ambientLight = new THREE.AmbientLight(0xffffff,1);
            this.ambientLight.castShadow = true;
            this.scene.add(this.ambientLight);

            this.spotLight = new THREE.SpotLight(0xffffff,1);
            this.spotLight.castShadow = true;
            this.spotLight.position.set(0,64,32);
            this.scene.add(this.spotLight);

            window.addEventListener('wheel', this.onScroll, false);
            window.addEventListener('resize', this.onWindowResize, false);
            

    }

    animate(){
        this.req = window.requestAnimationFrame(this.animate.bind(this));
        this.stats.update();
       // this.controls.update(); // wont allow the camera to look at the updating center of the tower
        this.render();
    }
    render(){
      //  console.log(this.renderer.getContext());
        this.renderer.render(this.scene,this.camera);
        
    }
    getRenderer(){
        return this.renderer;
    }
    
 
   onScroll(ev){
    const scrollSpeed = 0.002;
    this.t += ev.deltaY * scrollSpeed; // Adjust movement speed
    this.t = Math.max(0, Math.min(1, this.t)); // Keep t in range [0,1]
    const pos = this.path.getPointAt(this.t);
    if (pos) this.camera.position.copy(pos);
    const lookatTarget = new THREE.Vector3(this.towerCenter.x, pos.y, this.towerCenter.z);
    this.camera.lookAt(lookatTarget); // Ensure camera always looks at the tower
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
}