import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import SceneInitializer from './lib/SceneInitializer';
function App() {

  useEffect(() => {
    
  const scene = new SceneInitializer("threeJsCanvas");
    scene.initalize();

    scene.animate();
    //scene.loadTower();
    const loader = new GLTFLoader();
loader.load('/tower/scene.gltf', 
  function(gltf){
       const object = gltf.scene;
     
      scene.scene.add(object);
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});


  },[]);

  return (
    <div className='App'>
      <canvas id="threeJsCanvas"/>
    </div>
  );
}

export default App