export default class SceneInitializer {
    constructor(canvasID) {
        // basic class set up before initialization
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        // Camera Parameters
        this.fov = 45;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;
    
        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;
    
        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initalize(){
        

    }
    animate(){

    }
    render(){

    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
}