// project-specific
export type ProjectInteraction = 'full' | 'subtle' | 'none';

export interface ProjectLayout {
  width: number; // in vw
  position: 'top' | 'mid' | 'bottom';
  marginBefore: number; // in vw
  marginAfter: number; // in vw
  interaction: ProjectInteraction;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  slug: string;
  image: string;
  layout: ProjectLayout;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'El Corte Inglés',
    year: '2023',
    slug: 'el-corte-ingles',
    image: '/images/El corte ingles sin escaleras, señora/IMG_7335.jpg',
    layout: {
      width: 48,
      position: 'top',
      marginBefore: 0,
      marginAfter: 12,
      interaction: 'full'
    }
  },
  {
    id: '2',
    title: 'Cuba',
    year: '2022',
    slug: 'cuba',
    image: '/images/cuba/IMG_9715.jpg',
    layout: {
      width: 42,
      position: 'mid',
      marginBefore: 8,
      marginAfter: 18,
      interaction: 'subtle'
    }
  },
  {
    id: '3',
    title: 'Stripping Benidorm',
    year: '2024',
    slug: 'stripping-benidorm',
    image: '/images/stripping-benidorm/IMG_8815.jpg',
    layout: {
      width: 75, // ANCLA
      position: 'mid',
      marginBefore: 12,
      marginAfter: 30, // PAUSA VISUAL
      interaction: 'full'
    }
  },
  {
    id: '4',
    title: 'Tenerife',
    year: '2023',
    slug: 'tenerife',
    image: '/images/tenerife/IMG_2387.jpg',
    layout: {
      width: 32, // SILENCIO
      position: 'bottom',
      marginBefore: 0,
      marginAfter: 15,
      interaction: 'none'
    }
  },
  {
    id: '5',
    title: 'Mosi',
    year: '2021',
    slug: 'mosi',
    image: '/images/mosi/IMG_9825.jpg',
    layout: {
      width: 42,
      position: 'top',
      marginBefore: 10,
      marginAfter: 15,
      interaction: 'subtle'
    }
  },
  {
    id: '6',
    title: 'Machaka',
    year: '2024',
    slug: 'machaka',
    image: '/images/machaka-fotozine/MachakaPortada.jpg',
    layout: {
      width: 52, // OUTRO
      position: 'bottom',
      marginBefore: 5,
      marginAfter: 25,
      interaction: 'none'
    }
  }
];
