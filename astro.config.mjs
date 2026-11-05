import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://let0oro.github.io',
  base: '/faro-python-go/',
  integrations: [
    starlight({
      title: 'Faro',
      description: 'Campus práctico de Python y Go para procesos, redes y ciberseguridad defensiva.',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es' } },
      customCss: ['./src/styles/global.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Let0oro/faro-python-go' }],
      sidebar: [
        {
          label: 'Campus',
          items: [
            { label: 'Cómo funciona', link: '/guia/como-funciona/' },
            { label: 'Roadmap', link: '/guia/roadmap/' },
            { label: 'Proyectos', link: '/guia/proyectos/' },
            { label: 'Retos', link: '/guia/retos/' },
            { label: 'Evaluación', link: '/guia/evaluacion/' },
            { label: 'Capstone final', link: '/guia/capstone/' }
          ]
        },
        {
          label: 'Python · Laboratorio',
          items: [
            { label: 'Preparar el laboratorio', link: '/python/00-laboratorio/' },
            { label: 'Procview', link: '/python/01-procview/' },
            { label: 'Árbol de procesos', link: '/python/02-arbol-de-procesos/' },
            { label: 'Procesos hijos seguros', link: '/python/03-procesos-hijos/' },
            { label: 'Integridad de archivos', link: '/python/04-integridad-archivos/' },
            { label: 'Diagnóstico de logs', link: '/python/05-diagnostico-logs/' }
          ]
        },
        {
          label: 'Go · Servicios',
          items: [
            { label: 'Primeros pasos', link: '/go/00-primeros-pasos/' },
            { label: 'Red y concurrencia', link: '/go/01-red-y-concurrencia/' },
            { label: 'Servicio local', link: '/go/02-servicio-local/' },
            { label: 'Pool de trabajadores', link: '/go/03-pool-trabajadores/' },
            { label: 'HTTP robusto', link: '/go/04-http-robusto/' },
            { label: 'Capstone Go', link: '/go/05-capstone/' }
          ]
        }
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
    })
  ]
});
