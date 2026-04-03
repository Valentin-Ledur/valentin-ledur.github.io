import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvas.clientWidth, canvas.clientHeight );
renderer.setAnimationLoop( animate );
canvas.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render( scene, camera );

}