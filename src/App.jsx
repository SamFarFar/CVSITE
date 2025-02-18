import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function App() {

  useEffect(() => {

    // create the Scene and the Camera 
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    cam.position.z = 25;

    // Create an access point to the canvas
    const canvas = document.getElementById('threeJsCanvas');

    // create a renderer and initialize its size
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias:true, // 3D objects look smooth
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create orbital controls 
    const orbControls = new OrbitControls(cam,renderer.domElement);
    
    // Create the FPS stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    // create a light source to light the scene 
    const ambLight = new THREE.AmbientLight(0xffffff,1);
    ambLight.castShadow = true;
    scene.add(ambLight);

    const spotLight = new THREE.SpotLight(0xffffff,1);
    spotLight.castShadow = true;
    spotLight.position.set(0,64,32);
     scene.add(spotLight);

    // const boxGeometry = new THREE.BoxGeometry(16,16,16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
    // scene.add(boxMesh);


    // Loader to load the tower gltf file 
    const loader = new GLTFLoader();
    loader.load('/tower/scene.gltf', 
      function(gltf){
      const object = gltf.scene;
      scene.add(object);
    }, function(xhr){
      console.log((xhr.loaded/xhr.total *100) + "% Complete.")
    },function(error){
      console.log("HI");
      console.error(error);
    });


    // This is the update function for every frame 
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;
      stats.update();
      orbControls.update();
      renderer.render(scene,cam);
      window.requestAnimationFrame(animate);
    };
animate();

  },[]);

  return (
    <div className='App'>
      <canvas id="threeJsCanvas">
      </canvas>
    </div>
  );
}

export default App