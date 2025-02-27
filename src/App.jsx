import {useEffect, useState, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInitializer from './lib/SceneInitializer';
function App() {
  const [rotationD, setrotationD] = useState(0)
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

const loader2 = new GLTFLoader();
let object;
loader2.load('/flag_with_pole/scene.gltf', 
  function(gltf){
       object = gltf.scene;
       object.scale.multiplyScalar(0.01);
       object.position.set(-0.5,7,5);
       object.castShadow = true;
       object.receiveShadow = true;
       object.rotateX(Math.PI/2 * 45);
       object.rotateY(Math.PI/2 * 90);
       object.rotateZ(Math.PI/2 * 90);
       scene.addObject(object);
       setObjects(prevObjects => [...prevObjects, object]); // Append to state
  }, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% Complete.")
   },function(error){
   console.error(error);
});
  },[]);

  useEffect(() => {
    
    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case " ":
          event.preventDefault();
          if (objects.length > 0) {
            objects.forEach((obj, index) => {

              
              console.log(-0.5+ obj.position.x,7+ obj.position.y,5 + obj.position.z);

            });
          }
          break;
        case "w":
          event.preventDefault();
          setrotationD(prevRot => prevRot + 1);
          console.log("rotationD: " + rotationD);
        default:
          break;
      }
      
      // if (event.key === " ") {
      //     event.preventDefault();
      //     if (objects.length > 0) {
      //       objects.forEach((obj, index) => {
      //         console.log(obj.position);

      //       });
      //     }
      // }
      // else if(event.key === "w"){
      //   event.preventDefault();
      //   setrotationD(rotationD + 1);
      // }
    
  });
    
  }, [objects]); // Runs every time `objects` changes

  return (
    <div className='App'>
      <canvas id="threeJsCanvas"/>
    </div>
  );
}

export default App