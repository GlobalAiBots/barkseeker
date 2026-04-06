export interface Ramp { id: string; name: string; description: string; latitude: number; longitude: number; address: string; city: string; state: string; zip: string; rating: number; fee: string; rampCount: number; amenities: string[]; }
export const ramps: Ramp[] = [];
export const amenityLabels: Record<string, { icon: string; label: string }> = {};
