import {useEffect, useState, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInitializer from './lib/SceneInitializer';

function TowerPage() {
  const [objects, setObjects] = useState([]);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
  const scene = new SceneInitializer("threeJsCanvas");
    scene.initalize();
    scene.makeDragDropable();
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

// First flags loader
const loader2 = new GLTFLoader();
let object;
loader2.load('/flag_with_pole/scene.gltf', 
  function(gltf){
       object = gltf.scene;
       object.scale.multiplyScalar(0.01);
       object.position.set(0,0,0);
       object.position.set(-1.6187918832602661,6.30353757822164, -0.45949027833285805);
       object.castShadow = true;
       object.receiveShadow = true;
       object.rotateX(Math.PI/180 * 90);
       object.rotateY(Math.PI/180 * 180);
       object.rotateZ(Math.PI/180 * 185);
       scene.addObject(object);
       console.log(object.uuid);
       setObjects(prevObjects => [...prevObjects, object]); // Append to state
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});
// third flags loader
const loader3 = new GLTFLoader();
loader3.load('/flag_with_pole/scene.gltf', 
  function(gltf){
       object = gltf.scene;
       object.scale.multiplyScalar(0.01);
       object.position.set(0,0,0);
       object.position.set(0.4374088543945698, 12.402468066223273, -2.4753760783709278);
       object.castShadow = true;
       object.receiveShadow = true;
       object.rotateX(Math.PI/180 * 90);
       object.rotateY(Math.PI/180 * 180);
       object.rotateZ(Math.PI/180 * 90);
       scene.addObject(object);
       console.log(object.uuid);
       setObjects(prevObjects => [...prevObjects, object]); // Append to state
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});

// second flags loader
const loader4 = new GLTFLoader();
loader4.load('/flag_with_pole/scene.gltf', 
  function(gltf){
       object = gltf.scene;
       object.scale.multiplyScalar(0.01);
       object.position.set(0,0,0);
       object.position.set(-0.6794020745336833, 9.582585621659138,  -1.8418932749288874);
       object.castShadow = true;
       object.receiveShadow = true;
       object.rotateX(Math.PI/180 * 90);
       object.rotateY(Math.PI/180 * 180);
       object.rotateZ(Math.PI/180* 135);
       scene.addObject(object);
       console.log(object.uuid);
       setObjects(prevObjects => [...prevObjects, object]); // Append to state
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});
const loader5 = new GLTFLoader();
loader5.load('/wooden_sign/scene.gltf', 
  function(gltf){
       object = gltf.scene;
      
       object.position.set( -2.916044756439595,3, 0.8463172630730074);
       
       object.castShadow = true;
       object.receiveShadow = true;
      //  object.rotateX(Math.PI/180 * 90);
      //  object.rotateY(Math.PI/180 * 180);
      //  object.rotateZ(Math.PI/180* 135);
       scene.addObject(object);
       setObjects(prevObjects => [...prevObjects, object]); // Append to state
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% sign Complete.")
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

export default TowerPage