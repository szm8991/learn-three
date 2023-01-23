import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stat from "three/examples/jsm/libs/stats.module";
const w = window.innerWidth
const h = window.innerHeight

// fps显示器
const stat = Stat()
// 场景——用于保存其他Threejs对象
const scene = new THREE.Scene()
// 物体——WebGL物体矩阵(骨架+纹理)
// 坐标轴
const axes = new THREE.AxesHelper(2)
scene.add(axes)

// 立方体
function createCube(){
    const d=Math.random()
    const geometry=new THREE.BoxGeometry(d,d,d)
    const material=new THREE.MeshBasicMaterial({
        color:0xffffff*Math.random()
    })
    const cube=new THREE.Mesh(geometry,material)
    cube.position.x=(Math.random()-0.5)*4
    cube.position.y=(Math.random()-0.5)*4
    cube.position.z=(Math.random()-0.5)*4
    return cube
}
// @ts-ignore
let cubes=[]
for (let i = 0; i < 50; i++) {
    const cube=createCube()
    cubes.push(cube)
}
cubes.forEach(cube=>scene.add(cube))
// 光线——WebGL光照矩阵
const light = new THREE.AmbientLight(new THREE.Color(0, 1, 0))
scene.add(light)
// 相机——WebGL视点矩阵
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 100)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 1)
// 渲染器——使用什么引擎渲染(css、canvas、webgl)
const renderer = new THREE.WebGLRenderer()
// 设置渲染引擎大小(canvas画布大小)
renderer.setSize(w, h)
renderer.render(scene, camera)
document.body.append(renderer.domElement)
document.body.append(stat.domElement)

// 鼠标操作控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 对 raf tick的封装
const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()
    // @ts-ignore
    cubes.forEach((cube,index)=>{
        cube.rotation.x=time*0.4+index
        cube.rotation.y=time*0.4+index
    })
    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    controls.update();
}