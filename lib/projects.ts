export type ProjectSection = {
  id: string;
  label: string;
  images: string[];
  text?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  subtitle?: string;
  bodyText: string;
  coverImage: string;
  status: "published" | "coming-soon";
  sections: ProjectSection[];
};

import manifest from "./image-manifest.json";

export const projects: Project[] = [
  {
    slug: "stripping-benidorm",
    title: "Stripping Benidorm",
    year: 2025,
    status: "published",
    bodyText: `De pueblo pesquero a metrópolis mediterránea.
De 3.000 habitantes a 400.000 huéspedes.
De casitas bajas a rascacielos que desafían la ley de la gravedad y la Ley de Costas.
Benidorm se desarrolló a partir de los años 60, trayendo consigo dinero, relajación moral a una España todavía franquista —siendo la primera ciudad en legalizar el topless y enfadando a algún que otro obispo— y mucha, mucha, mucha gente del norte de Europa.
Pionera en turismo de masas que, a excepción de unos pocos beneficiados, empobrece y precariza la economía local, agota recursos, daña tejidos vecinales y borra la identidad cultural de un lugar. Este tipo de turismo, que ahora azota con fuerza en lugares como Baleares o Canarias, encuentra gran oposición entre sus habitantes, sin embargo, en Benidorm, se sigue congratulando. ¿Quizás sea ya su propia identidad?
Dicen que es la ciudad de la felicidad, que tiene de todo para todos, desde jóvenes a jubilados. Pero, aparte de lo evidente —sol, playa, gastronomía española, fiesta— ¿qué más ofrece la Manhattan mediterránea?
Este fotozine explora lo que sería un día cualquiera en esta tumultuosa ciudad, siendo fiel al costumbrismo de la zona establecido por sus nuevos y fugaces ocupantes.`,
    coverImage: "/images/stripping-benidorm/dia/",
    sections: [
      {
        id: "dia",
        label: "Día",
        images: manifest["stripping-benidorm"]?.["dia"] ?? [],
        text: "",
      },
      {
        id: "noche",
        label: "Noche",
        images: manifest["stripping-benidorm"]?.["noche"] ?? [],
        text: "",
      },
    ],
  },
  {
    slug: "us-era",
    title: "Us-era",
    year: 2025,
    status: "coming-soon",
    bodyText: "",
    coverImage: "",
    sections: [],
  },
  {
    slug: 'el-corte-ingles',
    title: 'El corte inglés sin escalera, señora',
    year: 2022,
    status: 'published',
    bodyText: '',
    coverImage: (manifest as Record<string, { root?: string[] }>)['el-corte-ingles']?.['root']?.[0] ?? '',
    sections: []
  },
  {
    slug: 'tenerife',
    title: 'Tenerife',
    year: 2024,
    status: 'published',
    bodyText: '',
    coverImage: (manifest as Record<string, { root?: string[] }>)['tenerife']?.['root']?.[0] ?? '',
    sections: []
  },
  {
    slug: 'mosi',
    title: 'Mosi',
    year: 2024,
    status: 'published',
    bodyText: '',
    coverImage: (manifest as Record<string, { root?: string[] }>)['mosi']?.['root']?.[0] ?? '',
    sections: []
  },
  {
    slug: "cuba",
    title: "Cuba",
    year: 2024,
    status: "published",
    bodyText: "",
    coverImage: manifest["cuba"]?.["root"]?.[0] ?? "/images/cuba/",
    sections: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
