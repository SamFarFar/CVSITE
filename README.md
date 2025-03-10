# Credits

Tower model:
"Kickelhahn Tower" (https://skfb.ly/5i3g2e10ba) by 3DHaupt is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).

Sign Model:

"🧱Wooden Sign" (https://skfb.ly/6Vzo6) by Carlos is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

## general tips when using Three.js

```javascript
 makeDragDropable(){
        const dControls = new DragControls(this.objects,this.camera,this.renderer.domElement);

        dControls.addEventListener('dragend', function(event) {
            // This won't give you the correct position
            console.log("Final Position:", event.object.position);
            event.object.updateMatrixWorld(true);
            // This will give you the correct position due to the fact
            // the position is now in relation to the scene (I believe)
            const worldPosition = new THREE.Vector3();
            event.object.getWorldPosition(worldPosition);
            console.log("World Position:", worldPosition);
          });
    }
```
