import { MeshStandardMaterial } from "three";

class MeshMaterialManager {
  private materials: Map<string, MeshStandardMaterial> = new Map();

  constructor() {}

  public getMaterial(color: string): MeshStandardMaterial {
    if (!this.materials.has(color)) {
      this.materials.set(
        color,
        new MeshStandardMaterial({ color, flatShading: true })
      );
    }

    return this.materials.get(color);
  }
}

export const meshMaterialManager = new MeshMaterialManager();
