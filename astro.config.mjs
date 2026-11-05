import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://let0oro.github.io',
  base: '/faro-python-go/',
  integrations: [
    starlight({
      title: 'Faro',
      description: 'Curso práctico de Python y Go para procesos, redes y ciberseguridad defensiva.',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es' } },
      customCss: ['./src/styles/global.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Let0oro/faro-python-go' }],
      sidebar: [
        {
          label: 'Guía',
          items: [
            { label: 'Cómo funciona', link: '/guia/como-funciona/' },
            { label: 'Roadmap', link: '/guia/roadmap/' },
            { label: 'Retos y estilo', link: '/guia/retos/' }
          ]
        },
        {
          label: 'Python',
          items: [
            { label: 'Preparar el laboratorio', link: '/python/00-laboratorio/' },
            { label: 'Procview', link: '/python/01-procview/' },
            { label: 'Árbol de procesos', link: '/python/02-arbol-de-procesos/' }
          ]
        },
        {
          label: 'Go',
          items: [
            { label: 'Primeros pasos', link: '/go/00-primeros-pasos/' },
            { label: 'Red y concurrencia', link: '/go/01-red-y-concurrencia/' },
            { label: 'Servicio local', link: '/go/02-servicio-local/' }
          ]
        }
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
    })
  ]
});