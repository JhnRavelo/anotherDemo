import * as THREE from 'three';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject} from './jsm/renderers/CSS2DRenderer.js'
// import { RGBLoader } from './jsm/loaders/RGBLoader.js'

let camera, controls, scene, renderer,loader,model,hemiLight,spotLight,pointLight,dirLight,topLight,Width,Height,labelRender
	,portelabel,imgporte,divporte,fenetrelabel,imgfenetre,divfenetre,ambientLight
Width = window.innerWidth
Height = window.innerHeight

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
camera.position.z = 2.5;

// scene

scene = new THREE.Scene();
scene.add( camera );

// model

// const onProgress = function ( xhr ) {

// if ( xhr.lengthComputable ) {

//     const percentComplete = xhr.loaded / xhr.total * 100;
//     console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

// }

// };
new MTLLoader()
	.setPath( 'AKORDIGUE/' )
	.load( 'SRAKOORDIGUE.mtl', ( materials ) => {

		materials.preload();

		new OBJLoader()
			.setMaterials( materials )
			.setPath( 'AKORDIGUE/' )
			.load( 'SRAKOORDIGUE.obj', ( object ) => {
				model = object
				model.traverse( child => {
					if(child.isMesh){
						child.castShadow = true
						child.receiveShadow = true	
					}
					var material = child.material
					// console.log(child.material);
					if(material && material.map){
						material.map.anisotropy = 16
					}
				})	
				model.rotation.set(-Math.PI/2,0,0)
				model.position.set(-0.8,0,0.5)
				model.scale.set(0.0001,0.0001,0.0001)
				scene.add( model )
				scene.add(portelabel)
    			portelabel.position.set(-0.9,0.095,0)
				scene.add(fenetrelabel)
				fenetrelabel.position.set(-0.175,0.168,-0.17)
			});

	} );

//
// ------------------Render 2D----------
labelRender = new CSS2DRenderer()
labelRender.setSize(Width, Height)
labelRender.domElement.style.position = 'absolute'
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRender.domElement)

const create2DElement = (urlImage,altImage,classImage,classDiv) => {
	console.log('change');
	let img,div,label
	img = document.createElement('img')
	img.className = classImage
	img.src = urlImage
	img.alt = altImage

	div = document.createElement('div')
	div.appendChild(img)
	div.className = classDiv
	label = new CSS2DObject(div)
	return label
}

portelabel = create2DElement('./assets/icon/iconizer-ouverture-de-porte-ouverte.svg',"img_porte","imgi","divi")
fenetrelabel = create2DElement('./assets/icon/iconizer-la-fenetre.svg',"img_fentere","imgi","divi")
// imgporte = document.createElement('img')
// imgporte.className = "imgi"
// imgporte.src = './assets/icon/iconizer-ouverture-de-porte-ouverte.svg'
// imgporte.alt = "img_porte"

// divPorte = document.createElement('div')
// divPorte.appendChild(imgporte)
// divPorte.className = "divi"
// portelabel = new CSS2DObject(divPorte)

// imgfenetre = document.createElement('img')
// imgfenetre.className = "imgi"
// imgfenetre.src = './assets/icon/iconizer-la-fenetre.svg'
// imgfenetre.alt = "img_fenetre"

// divFenetre = document.createElement('div')
// divFenetre.appendChild(imgfenetre)
// divFenetre.className = "divi"
// fenetrelabel = new CSS2DObject(divFenetre)


// ------------------Render 2D----------
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// renderer.setClearColor(0xfffff5)
renderer.setClearColor(0xE86222)
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.5
renderer.shadowMap.enabled = true

// renderer.toneMapping = THREE.CineonToneMapping
// renderer.toneMappingExposure = 1.1
// renderer.shadowMap.enabled = true
//

controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI/2

// -------control of the light---------
topLight = new THREE.DirectionalLight(0xffffff, 5); 
topLight.position.set(100, 100, 100) 
topLight.castShadow = true;
topLight.color.setHSL(0.1,1,0.95)
// scene.add(new THREE.DirectionalLightHelper(topLight))
// scene.add( new THREE.CameraHelper( topLight.shadow.camera ) );
topLight.shadow.mapSize.width = 3*1024
topLight.shadow.mapSize.height = 3*1024
// topLight.shadow.bias = - 0.0001

scene.add(topLight);
// scene.add(new THREE.DirectionalLightHelper(topLight))
ambientLight = new THREE.AmbientLight(0x333333, 3);
scene.add(ambientLight);
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

// scene.add(new THREE.HemisphereLightHelper(hemiLight))

// dirLight = new THREE.DirectionalLight(0xffffff,3)
// dirLight.color.setHSL(0.1,1,0.95)
// dirLight.position.set(-1,1.75,1)
// dirLight.position.multiplyScalar(30)
// scene.add(dirLight)
// scene.add(new THREE.DirectionalLightHelper(dirLight))
// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
// dirLight.castShadow = true
// dirLight.shadow.mapSize.width = 2048
// dirLight.shadow.mapSize.height = 2048

// var distance = 20

// dirLight.shadow.camera.left = -distance
// dirLight.shadow.camera.right = distance
// dirLight.shadow.camera.top = distance
// dirLight.shadow.camera.bottom = -distance
// dirLight.shadow.camera.far = distance
// dirLight.shadow.bias = - 0.0001
// spotLight = new THREE.SpotLight(0xffa95c,4)
// spotLight.castShadow = true
// spotLight.shadow.bias = -20
// spotLight.shadow.mapSize.width = 1024*4
// spotLight.shadow.mapSize.height = 1024*4
// scene.add(new THREE.SpotLightHelper(spotLight))
// camera.add( spotLight.target );
// spotLight.target.position.set( 0, 0, -2 )
// pointLight = new THREE.PointLight(0xffa95c,4,30)
// pointLight.position.set(0,0,0)
// pointLight.castShadow = true
// pointLight.shadow.bias = -0.001
// pointLight.shadow.mapSize.width = 1024*4
// pointLight.shadow.mapSize.height = 1024*4
// scene.add(pointLight)
// scene.add(new THREE.PointLightHelper(pointLight))
// -------control of the light---------
//
scene.add(new THREE.AxesHelper(20))
window.addEventListener( 'resize', onWindowResize );
// --------display icon----------
const controlChange = () => {
	
	let imgLabel = [...document.querySelectorAll('.imgi')]
	let divLabel = [...document.querySelectorAll('.divi')]

	let imgLabelShow = [...document.querySelectorAll('.img')]
	let divLabelShow = [...document.querySelectorAll('.div')]
	
	// var cameraPosition = camera.position.clone()
	// console.log(`controls:${camera.getWorldDirection}`);
	// console.log(controls.getAzimuthalAngle() )
	var objectRotation = controls.getAzimuthalAngle()
	// console.log(camera.position);
	// var newZ = -(camera.position.x * Math.cos(5.49779)) - (camera.position.z * Math.sin(5.49779));
	// var newX = (camera.position.x * Math.cos(0.78)) + (camera.position.z * Math.sin(0.78));
	// console.log(`x:${newX}`)
	// console.log(`z:${newZ}`)
	if(objectRotation <= -1.5 && objectRotation >= -1.9){
		
		gsap.to(imgLabel[0], {
			opacity: 1,
			duration: 1	
		  })
		gsap.to(divLabel[0], {
			opacity: 1,
			duration: 1
		})
		
	}else if(objectRotation >= -3.1 && objectRotation <= -2.7){
		console.log('moi aussi');
		gsap.to(imgLabel[1], {
			opacity: 1,
			duration: 1	
		  })
		gsap.to(divLabel[1], {
			opacity: 1,
			duration: 1
		})
	}
	else{
		gsap.to(imgLabel[0], {
			opacity: 0,
			duration: 1
		
			})
		gsap.to(divLabel[0], {
			opacity: 0,
			duration: 1
		})

		gsap.to(imgLabel[1], {
			opacity: 0,
			duration: 1
		
			})
		gsap.to(divLabel[1], {
			opacity: 0,
			duration: 1
		})
		}	
}


// --------display icon----------

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {
	
	// spotLight.position.copy( camera.position )
	// spotLight.position.set(
	// 	camera.position.x + 10,
	// 	camera.position.y + 10,
	// 	camera.position.z + 10,
	// )
	// topLight.position.x = camera.position.x + 500
	// topLight.position.z = camera.position.z + 500
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update()
	labelRender.render(scene, camera)
	controlChange()
}

animate();