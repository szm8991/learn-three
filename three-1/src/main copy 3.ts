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

// 立方体
const group = new THREE.Group()

const geometry1 = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const cube1 = new THREE.Mesh(geometry1, material1)
group.add(cube1)
cube1.position.y = 1.5

const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00
})
const cube2 = new THREE.Mesh(geometry2, material2)
group.add(cube2)

const geometry3 = new THREE.BoxGeometry(1, 1, 1)
const material3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff
})
const cube3 = new THREE.Mesh(geometry3, material3)
group.add(cube3)
cube3.position.y = -1.5
scene.add(group)
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
// 坐标轴
const axes = new THREE.AxesHelper(2)
scene.add(axes)
document.body.append(renderer.domElement)
document.body.append(stat.domElement)

// 鼠标操作控制器
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()
    // cube1.rotation.z = time
    // cube2.rotation.z = time
    // cube3.rotation.z = time
    group.rotation.z = time
    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    controls.update()
}