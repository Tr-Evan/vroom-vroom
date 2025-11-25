import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {
	modelUrl?: string
	autoRotate?: boolean
}

export default function CarViewer({ modelUrl = '/models/car.glb', autoRotate = true }: Props) {
	const mountRef = useRef<HTMLDivElement | null>(null)
	const frameRef = useRef<number | null>(null)

	useEffect(() => {
		const mount = mountRef.current
		if (!mount) return

		const width = mount.clientWidth
		const height = mount.clientHeight

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(width, height)
		renderer.outputEncoding = THREE.sRGBEncoding
		mount.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		scene.background = null

		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
		camera.position.set(0, 1.2, 3)

		const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
		hemi.position.set(0, 1, 0)
		scene.add(hemi)

		const dir = new THREE.DirectionalLight(0xffffff, 1.0)
		dir.position.set(5, 10, 7.5)
		scene.add(dir)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.autoRotate = !!autoRotate
		controls.autoRotateSpeed = 0.6
		controls.enablePan = false
		controls.maxPolarAngle = Math.PI / 2.2

		const loader = new GLTFLoader()
		let currentModel: THREE.Object3D | null = null

		loader.load(
			modelUrl,
			(gltf) => {
				currentModel = gltf.scene
				const box = new THREE.Box3().setFromObject(currentModel)
				const size = box.getSize(new THREE.Vector3()).length()
				const center = box.getCenter(new THREE.Vector3())
				const scale = size > 0 ? 1.0 / size : 1.0
				currentModel.scale.setScalar(scale * 1.2)
				currentModel.position.sub(center.multiplyScalar(scale * 1.2))
				scene.add(currentModel)
			},
			undefined,
			(err) => {
				// eslint-disable-next-line no-console
				console.error('Error loading model:', err)
			}
		)

		const onResize = () => {
			if (!mount) return
			const w = mount.clientWidth
			const h = mount.clientHeight
			camera.aspect = w / h
			camera.updateProjectionMatrix()
			renderer.setSize(w, h)
		}
		window.addEventListener('resize', onResize)

		const animate = () => {
			controls.update()
			renderer.render(scene, camera)
			frameRef.current = requestAnimationFrame(animate)
		}
		animate()

		return () => {
			if (frameRef.current) cancelAnimationFrame(frameRef.current)
			window.removeEventListener('resize', onResize)
			controls.dispose()
			scene.traverse((child) => {
				const mesh = child as THREE.Mesh
				if (mesh.isMesh) {
					mesh.geometry?.dispose()
					const material = mesh.material as THREE.Material | THREE.Material[] | undefined
					if (Array.isArray(material)) {
						material.forEach((m) => m.dispose && m.dispose())
					} else if (material) {
						material.dispose && material.dispose()
					}
				}
			})
			renderer.dispose()
			if (renderer.domElement && mount.contains(renderer.domElement)) {
				mount.removeChild(renderer.domElement)
			}
		}
	}, [modelUrl, autoRotate])

	return <div ref={mountRef} className="w-full h-full min-h-[360px]" />
}
