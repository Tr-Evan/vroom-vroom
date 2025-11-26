import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Textures = {
	map?: string
	normal?: string
	roughness?: string
	metalness?: string
	ao?: string
	env?: string
}

type Props = {
		modelUrl?: string
		autoRotate?: boolean
		textures?: Textures
}

export default function CarViewer({ modelUrl = '/models/car.glb', autoRotate = false, textures }: Props) {
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
		camera.position.set(2.5, 1.2, 2.2)

		// Lumière ambiante
		const ambient = new THREE.AmbientLight(0xffffff, 0.5)
		scene.add(ambient)

		// Lumière hémisphérique
		const hemi = new THREE.HemisphereLight(0xffffff, 0x1a1a2e, 0.4)
		hemi.position.set(0, 10, 0)
		scene.add(hemi)

		// Lumière directionnelle principale (de face-haut-gauche)
		const dir = new THREE.DirectionalLight(0xffffff, 1.0)
		dir.position.set(5, 10, 5)
		scene.add(dir)

		// Lumière d'accentuation (fill light de droite - violet)
		const fill = new THREE.DirectionalLight(0x6366f1, 0.4)
		fill.position.set(-5, 8, -3)
		scene.add(fill)

		// Lumière de rebond (subtile, par le bas)
		const bounce = new THREE.PointLight(0xffffff, 0.2)
		bounce.position.set(0, -2, 0)
		scene.add(bounce)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.dampingFactor = 0.05
		controls.autoRotate = autoRotate
		controls.autoRotateSpeed = 4
		controls.enablePan = false
		controls.maxPolarAngle = Math.PI / 2.2
		controls.minPolarAngle = Math.PI / 4
		controls.minDistance = 1.2
		controls.maxDistance = 6

		const loader = new GLTFLoader()
		const textureLoader = new THREE.TextureLoader()
		const loadedTextures: THREE.Texture[] = []
		let currentModel: THREE.Object3D | null = null

		const loadTexture = (url: string | undefined, srgb = false) => {
			return new Promise<THREE.Texture | null>((resolve) => {
				if (!url) return resolve(null)
				textureLoader.load(
					url,
						(tex) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						;(tex as any).encoding = srgb ? (THREE as any).sRGBEncoding : (THREE as any).LinearEncoding
						tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
						loadedTextures.push(tex)
						resolve(tex)
					},
					undefined,
					(err) => {
						console.warn('Texture load failed', url, err)
						resolve(null)
					}
				)
			})
		}

		loader.load(
			modelUrl,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
						async (gltf: any) => {
								currentModel = gltf.scene
								if (currentModel) {
										// charger les textures si fournies
										const texProps = {
											map: await loadTexture((textures && textures.map) || undefined, true),
											normal: await loadTexture((textures && textures.normal) || undefined, false),
											roughness: await loadTexture((textures && textures.roughness) || undefined, false),
											metalness: await loadTexture((textures && textures.metalness) || undefined, false),
											ao: await loadTexture((textures && textures.ao) || undefined, false),
										}

										// Appliquer les textures aux matériaux
										currentModel.traverse((child: THREE.Object3D) => {
											const mesh = child as THREE.Mesh
											if (mesh && mesh.isMesh) {
												const mat = mesh.material
												const applyToMaterial = (m: THREE.Material) => {
													const material = m as THREE.MeshStandardMaterial
													if (texProps.map) {
														material.map = texProps.map
														// eslint-disable-next-line @typescript-eslint/no-explicit-any
														;(material.map as any).encoding = (THREE as any).sRGBEncoding
													}
													if (texProps.normal) material.normalMap = texProps.normal
													if (texProps.roughness) material.roughnessMap = texProps.roughness
													if (texProps.metalness) material.metalnessMap = texProps.metalness
													if (texProps.ao) material.aoMap = texProps.ao
													material.needsUpdate = true
												}

												if (Array.isArray(mat)) {
													mat.forEach(applyToMaterial)
												} else if (mat) {
													applyToMaterial(mat)
												}
											}
										})

										const box = new THREE.Box3().setFromObject(currentModel)
										const size = box.getSize(new THREE.Vector3()).length()
										const scale = size > 0 ? 4.0 / size : 8.0
										currentModel.scale.setScalar(scale * 1.2)
										currentModel.position.set(0, 0, 0)
										scene.add(currentModel)
								}
						},
			undefined,
			(err: unknown) => {
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
						material.forEach((m) => m.dispose?.())
					} else if (material) {
						material.dispose?.()
					}
				}
			})
			renderer.dispose()
			// dispose loaded textures
			if (loadedTextures.length) {
				loadedTextures.forEach((t) => t.dispose())
			}
			if (renderer.domElement && mount.contains(renderer.domElement)) {
				mount.removeChild(renderer.domElement)
			}
		}
	}, [modelUrl, autoRotate, textures])

	return <div ref={mountRef} className="w-full h-full min-h-[360px]" />
}
