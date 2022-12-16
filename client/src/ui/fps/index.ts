/**
 * Display current FPS & position
 */

import Terrain from '../../terrain'

export default class FPS {
  terrain: Terrain;
  constructor(terrain: Terrain) {
    this.terrain = terrain;
    this.fps.className = 'fps'
    this.fps.innerHTML = `FPS: 60`

    document.body.appendChild(this.fps)
  }

  p1 = performance.now()
  p2 = performance.now()
  gap = performance.now()
  fps = document.createElement('div')
  count = 0

  update = () => {
    this.p1 = performance.now()
    this.count++

    if (performance.now() - this.gap > 1000) {
      this.fps.innerHTML = `FPS: ${this.count}<br />
      X: ${Math.round(this.terrain.camera.position.x)},
      Y: ${Math.round(this.terrain.camera.position.y)},
      Z: ${Math.round(this.terrain.camera.position.z)},
      totalUsers: ${window.totalUsers || 0}
      `
      // totalUsers meto variable global para simplificar demo
      this.gap = performance.now()
      this.count = 0
    }

    this.p2 = this.p1
  }
}
