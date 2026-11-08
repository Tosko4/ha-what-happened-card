import type { HomeAssistant, TargetConfig } from "./types";

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export function hasTarget(target: TargetConfig | undefined): boolean {
  if (!target) return false;
  return Object.values(target).some((v) => toArray(v as string | string[] | undefined).length > 0);
}

/**
 * Expand a Home Assistant style target (entities, devices, areas, floors, labels)
 * into a flat set of entity ids using the frontend registries.
 */
export function resolveTargetEntities(hass: HomeAssistant, target: TargetConfig): Set<string> {
  const result = new Set<string>();
  const entityRegistry = hass.entities ?? {};
  const deviceRegistry = hass.devices ?? {};
  const areaRegistry = hass.areas ?? {};

  const areaIds = new Set(toArray(target.area_id));
  for (const floorId of toArray(target.floor_id)) {
    for (const area of Object.values(areaRegistry)) {
      if (area.floor_id === floorId) areaIds.add(area.area_id);
    }
  }
  const deviceIds = new Set(toArray(target.device_id));
  const labelIds = new Set(toArray(target.label_id));

  for (const id of toArray(target.entity_id)) result.add(id);

  for (const entity of Object.values(entityRegistry)) {
    const device = entity.device_id ? deviceRegistry[entity.device_id] : undefined;
    const effectiveArea = entity.area_id ?? device?.area_id ?? undefined;

    if (effectiveArea && areaIds.has(effectiveArea)) result.add(entity.entity_id);
    if (entity.device_id && deviceIds.has(entity.device_id)) result.add(entity.entity_id);
    if (entity.labels?.some((l) => labelIds.has(l))) result.add(entity.entity_id);
    if (device?.labels?.some((l) => labelIds.has(l))) result.add(entity.entity_id);
  }
  return result;
}
