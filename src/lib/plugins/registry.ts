export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  entrypoint: string;
  permissions: string[];
}

export class PluginRegistry {
  private static plugins = new Map<string, PluginManifest>();

  static register(manifest: PluginManifest) {
    this.plugins.set(manifest.id, manifest);
  }

  static getPlugin(id: string): PluginManifest | undefined {
    return this.plugins.get(id);
  }

  static getAll(): PluginManifest[] {
    return Array.from(this.plugins.values());
  }

  static clear() {
    this.plugins.clear();
  }
}
