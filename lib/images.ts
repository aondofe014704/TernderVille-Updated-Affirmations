/**
 * Central image registry.
 *
 * All hero/featured images live here as one source of truth. Components
 * import from this file instead of hard-coding paths.
 *
 * If a local file is missing or you haven't dropped WebP files yet,
 * the "remote" Cloudinary fallback URL will work in the meantime.
 * Once you've added WebP files to public/images/*, the local path is used.
 *
 * To switch a single image: change `useLocal` to false for that entry.
 * To switch site-wide: set USE_LOCAL_IMAGES = false at the top.
 */

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const USE_LOCAL_IMAGES = true; // flip to false if /public/images/* not populated yet

// Helper: pick local path if enabled, else fallback to remote
function img(local: string, remote: string): string {
  return USE_LOCAL_IMAGES ? local : remote;
}

// ============================================================
// HERO CAROUSEL — directly under navbar on home page
// ============================================================
export const HERO_CAROUSEL: CarouselImage[] = [
  {
    src: img("/images/hero/01.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539003/_DSC4919_pfnuvj.jpg"),
    alt: "Tenderville teacher giving individual attention to a student",
    width: 1920,
    height: 1535,
  },
  {
    src: img("/images/hero/02.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538965/_DSC4896_kx83m4.jpg"),
    alt: "Tenderville student writing in workbook",
    width: 1920,
    height: 1536,
  },
  {
    src: img("/images/hero/03.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539001/_DSC4845_e8efz6.jpg"),
    alt: "Tenderville students in school uniform on the school grounds",
    width: 1920,
    height: 1279,
  },
  {
    src: img("/images/hero/04.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538942/_DSC4952_uyetts.jpg"),
    alt: "Tenderville students together outdoors",
    width: 1920,
    height: 1279,
  },
  {
    src: img("/images/hero/05.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538955/_DSC4887_dq81yd.jpg"),
    alt: "Tenderville student group portrait at the school entrance",
    width: 1920,
    height: 1279,
  },
];

// ============================================================
// NURTURE CAROUSEL — in NurtureLeaders section
// ============================================================
export const NURTURE_CAROUSEL: CarouselImage[] = [
  {
    src: img("/images/nurture/01.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538965/_DSC4896_kx83m4.jpg"),
    alt: "Tenderville classroom with students engaged in a lesson",
    width: 1280,
    height: 1023,
  },
  {
    src: img("/images/nurture/02.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538942/_DSC4952_uyetts.jpg"),
    alt: "Two young Tenderville students playing together in the playground",
    width: 1280,
    height: 1024,
  },
  {
    src: img("/images/nurture/03.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538955/_DSC4887_dq81yd.jpg"),
    alt: "Smiling Tenderville toddler in a safe play area",
    width: 1280,
    height: 1920,
  },
  {
    src: img("/images/nurture/04.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538935/_DSC4912_vn3f4d.jpg"),
    alt: "Group of Tenderville children playing together",
    width: 1280,
    height: 853,
  },
  {
    src: img("/images/nurture/05.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539003/_DSC4919_pfnuvj.jpg"),
    alt: "Tenderville student swinging joyfully on the playground",
    width: 1280,
    height: 1920,
  },
];

// ============================================================
// ACTIVITIES CAROUSEL — school activities gallery (tend1–tend68)
// ============================================================
export const ACTIVITIES_CAROUSEL: CarouselImage[] = Array.from(
  { length: 68 },
  (_, i) => ({
    src: `/assets/tend${i + 1}.png`,
    alt: `Tenderville school activity — moment ${i + 1}`,
    width: 1280,
    height: 960,
  }),
);

// ============================================================
// SINGLE IMAGES (used outside carousels)
// ============================================================
export const RESULTS_IMAGE: CarouselImage = {
  src: img("/images/results.webp", "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539001/_DSC4845_e8efz6.jpg"),
  alt: "Tenderville students celebrating their academic achievements",
  width: 1600,
  height: 1067,
};
