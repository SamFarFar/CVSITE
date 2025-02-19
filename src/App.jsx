import {useEffect, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInitializer from './lib/SceneInitializer';
function App() {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
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
   // console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});

// const loader2 = new GLTFLoader();
// loader2.load('/green_field/scene.gltf', 
//   function(gltf){
//        const object = gltf.scene;
//       scene.scene.add(object);
//   }, function(xhr){
//     console.log((xhr.loaded/xhr.total *100) + "% Complete.")
//    },function(error){
//    console.error(error);
// });

  },[]);

  return (
    <div className='App'>
      <canvas id="threeJsCanvas"/>
    </div>
  );
}

export default App