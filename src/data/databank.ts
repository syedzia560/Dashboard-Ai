import { PackageX, UserX, Shield as ShieldIcon, AlertTriangle, type LucideIcon } from "lucide-react";

// Simple seeded RNG for deterministic sequences between refreshes
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng: () => number, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export type Databank = {
  people: {
    enteredToday: number;
    leftToday: number;
    currentInStore: number;
    avgDwellMin: number;
    genderData: { name: string; value: number; color: string }[];
    ageData: { age: string; count: number }[];
    trafficData: { time: string; visitors: number }[];
    queue: { counter: string; people: number }[];
  };
  staff: {
    members: { id: number; name: string; role: string; status: "Active" | "Break"; zone: string }[];
    unattendedZones: { zone: string; duration: string; priority: "high" | "medium" }[];
  };
  cameras: { id: string; location: string; status: "online" | "warning" | "offline"; quality: number }[];
  zones: { name: string; engagement: number; avgTime: string; visitors: number; status: "hot" | "warm" | "cold" }[];
  heatmapGrid: ("hot" | "warm" | "cold")[][];
  alerts: {
    id: number;
    type: string;
    location: string;
    time: string;
    severity: "high" | "medium" | "low";
    status: "active" | "investigating" | "resolved" | "monitoring";
    iconKey: "package" | "userX" | "shield" | "alertTriangle";
    icon?: LucideIcon;
  }[];
};

const DATA_KEY = "databank:data";
const KEEP_KEY = "databank:keep"; // "0" = keep existing on next load, "1" = regenerate on next load

function iconFromKey(key: "package" | "userX" | "shield" | "alertTriangle"): LucideIcon {
  switch (key) {
    case "package":
      return PackageX;
    case "userX":
      return UserX;
    case "shield":
      return ShieldIcon;
    case "alertTriangle":
    default:
      return AlertTriangle;
  }
}

function generate(seed: number): Databank {
  const rng = mulberry32(seed);

  // People
  const entered = randInt(rng, 900, 1600);
  const left = Math.max(0, entered - randInt(rng, 0, 100));
  const current = randInt(rng, 30, 120);
  const dwell = randInt(rng, 15, 35);
  const malePct = randInt(rng, 45, 65);
  const femalePct = 100 - malePct;
  const people = {
    enteredToday: entered,
    leftToday: left,
    currentInStore: current,
    avgDwellMin: dwell,
    genderData: [
      { name: "Male", value: malePct, color: "hsl(var(--chart-1))" },
      { name: "Female", value: femalePct, color: "hsl(var(--chart-2))" },
    ],
    ageData: [
      { age: "18-25", count: randInt(rng, 20, 80) },
      { age: "26-35", count: randInt(rng, 50, 120) },
      { age: "36-45", count: randInt(rng, 40, 100) },
      { age: "46-55", count: randInt(rng, 20, 80) },
      { age: "56+", count: randInt(rng, 10, 60) },
    ],
    trafficData: ["9AM", "11AM", "1PM", "3PM", "5PM", "7PM"].map((t) => ({
      time: t,
      visitors: randInt(rng, 40, 180),
    })),
    queue: [
      { counter: "Counter 1", people: randInt(rng, 1, 8) },
      { counter: "Counter 2", people: randInt(rng, 1, 10) },
      { counter: "Counter 3", people: randInt(rng, 1, 7) },
    ],
  };

  // Staff
  const names = [
    "John Smith",
    "Sarah Johnson",
    "Mike Davis",
    "Emily Brown",
    "Tom Wilson",
    "Anna Garcia",
    "Daniel Lee",
    "Sophia Patel",
    "James Miller",
    "Olivia Chen",
    "Liam Martin",
    "Emma Thompson",
  ];
  const roles = ["Floor Manager", "Cashier", "Stock Associate", "Security"];
  const zonesList = [
    "Aisle 1-3",
    "Aisle 4-6",
    "Aisle 7-9",
    "Entrance",
    "Checkout",
    "Storage",
    "Frozen Section",
  ];
  const staffCount = 12;
  const members = Array.from({ length: staffCount }).map((_, i) => ({
    id: i + 1,
    name: pick(rng, names),
    role: pick(rng, roles),
    status: rng() < 0.15 ? ("Break" as const) : ("Active" as const),
    zone: pick(rng, zonesList),
  }));
  const unattendedZones = Array.from({ length: randInt(rng, 1, 3) }).map(() => ({
    zone: pick(rng, zonesList),
    duration: `${randInt(rng, 3, 15)} min`,
    priority: rng() < 0.5 ? ("high" as const) : ("medium" as const),
  }));

  // Cameras
  const locations = [
    "Main Entrance",
    "Aisle 1-3",
    "Aisle 4-6",
    "Aisle 7-9",
    "Checkout Area",
    "Exit",
    "Storage Room",
    "Back Door",
    "Frozen Section",
    "Produce Area",
    "Meat Counter",
    "Pharmacy",
  ];
  const cameras = locations.map((loc, idx) => {
    const r = rng();
    const status = r < 0.1 ? ("offline" as const) : r < 0.25 ? ("warning" as const) : ("online" as const);
    const quality = status === "offline" ? 0 : randInt(rng, status === "warning" ? 60 : 90, 99);
    return { id: `CAM-${String(idx + 1).padStart(3, "0")}`, location: loc, status, quality };
  });

  // Zones
  const zones = [
    { name: "Entrance", engagement: randInt(rng, 80, 100), avgTime: `${(rng() * 3 + 1.5).toFixed(1)} min`, visitors: randInt(rng, 800, 1400), status: "hot" as const },
    { name: "Aisle 1-3", engagement: randInt(rng, 60, 90), avgTime: `${(rng() * 4 + 3).toFixed(1)} min`, visitors: randInt(rng, 500, 1000), status: "hot" as const },
    { name: "Aisle 4-6", engagement: randInt(rng, 50, 80), avgTime: `${(rng() * 3 + 2).toFixed(1)} min`, visitors: randInt(rng, 400, 900), status: "warm" as const },
    { name: "Aisle 7-9", engagement: randInt(rng, 30, 60), avgTime: `${(rng() * 2 + 2).toFixed(1)} min`, visitors: randInt(rng, 300, 700), status: "cold" as const },
    { name: "Produce", engagement: randInt(rng, 70, 95), avgTime: `${(rng() * 4 + 3).toFixed(1)} min`, visitors: randInt(rng, 700, 1200), status: "hot" as const },
    { name: "Frozen", engagement: randInt(rng, 40, 70), avgTime: `${(rng() * 3 + 2).toFixed(1)} min`, visitors: randInt(rng, 400, 800), status: "warm" as const },
    { name: "Bakery", engagement: randInt(rng, 55, 85), avgTime: `${(rng() * 3 + 2.5).toFixed(1)} min`, visitors: randInt(rng, 500, 900), status: "warm" as const },
    { name: "Checkout", engagement: randInt(rng, 85, 100), avgTime: `${(rng() * 2 + 3).toFixed(1)} min`, visitors: left, status: "hot" as const },
  ];

  const statuses: ("hot" | "warm" | "cold")[] = ["hot", "warm", "cold"];
  const heatmapGrid = Array.from({ length: 4 }).map(() =>
    Array.from({ length: 4 }).map(() => pick(rng, statuses)),
  );

  // Alerts
  const alertTypes = ["Abandoned Object", "Loitering Detected", "Unauthorized Entry", "Suspicious Behavior"];
  const sev: ("high" | "medium" | "low")[] = ["high", "medium", "low"];
  const stat: ("active" | "investigating" | "resolved" | "monitoring")[] = [
    "active",
    "investigating",
    "resolved",
    "monitoring",
  ];
  const iconKeys: ("package" | "userX" | "shield" | "alertTriangle")[] = [
    "package",
    "userX",
    "shield",
    "alertTriangle",
  ];
  const locationsAlerts = ["Aisle 5", "Exit Area", "Storage Room", "Aisle 7", "Entrance"];
  const alerts = Array.from({ length: 4 }).map((_, i) => {
    const iconKey = pick(rng, iconKeys);
    return {
      id: i + 1,
      type: pick(rng, alertTypes),
      location: pick(rng, locationsAlerts),
      time: `${randInt(rng, 1, 30)} min ago`,
      severity: pick(rng, sev),
      status: pick(rng, stat),
      iconKey,
      icon: iconFromKey(iconKey),
    };
  });

  return {
    people,
    staff: { members, unattendedZones },
    cameras,
    zones,
    heatmapGrid,
    alerts,
  };
}

let cached: Databank | null = null;

export function getDatabank(): Databank {
  if (cached) return cached;

  const serialize = (db: Databank) => {
    // strip non-serializable icon functions
    return {
      ...db,
      alerts: db.alerts.map(({ icon, ...rest }) => rest),
    };
  };
  const hydrate = (db: Databank) => {
    return {
      ...db,
      alerts: db.alerts.map((a) => ({ ...a, icon: iconFromKey(a.iconKey) })),
    } as Databank;
  };

  try {
    const raw = localStorage.getItem(DATA_KEY);

    if (!raw) {
      // First load: create and persist data, and set keep flag so next refresh keeps the same data
      const seed = Date.now() % 2147483647;
      const data = generate(seed);
      localStorage.setItem(DATA_KEY, JSON.stringify(serialize(data)));
      localStorage.setItem(KEEP_KEY, "0");
      cached = data;
      return data;
    }

    // Subsequent loads: toggle behavior based on keep flag
    const keep = localStorage.getItem(KEEP_KEY) ?? "0";
    if (keep === "0") {
      // Keep existing data this load; set flag so next load regenerates
      try {
        cached = hydrate(JSON.parse(raw) as Databank);
      } catch {
        // If corrupted, regenerate
        const seed = Date.now() % 2147483647;
        cached = generate(seed);
        localStorage.setItem(DATA_KEY, JSON.stringify(serialize(cached)));
      }
      localStorage.setItem(KEEP_KEY, "1");
      return cached;
    } else {
      // Regenerate now, and set flag so next load keeps
      const seed = Date.now() % 2147483647;
      const data = generate(seed);
      localStorage.setItem(DATA_KEY, JSON.stringify(serialize(data)));
      localStorage.setItem(KEEP_KEY, "0");
      cached = data;
      return data;
    }
  } catch {
    // Fallback if localStorage not available
    const seed = Math.floor(Math.random() * 2147483647);
    cached = generate(seed);
    return cached;
  }
}
