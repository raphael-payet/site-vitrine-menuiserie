# Site vitrine menuiserie — Menuiserie Dubois

Site vitrine premium multi-pages pour un artisan menuisier, fidèle au design
Claude Design « Site vitrine menuisiers premium ».
**HTML / CSS / JavaScript purs** — aucun framework, aucune étape de build.
Ouvrez `index.html` dans un navigateur, c'est tout.

```
.
├── index.html            → Accueil (hero vidéo + effet de recouvrement)
├── services.html         → Services + méthode
├── galerie.html          → Réalisations (lightbox plein écran)
├── blog.html             → Journal de l'atelier
├── contact.html          → Formulaire, coordonnées, Google Maps
├── mentions-legales.html          → Mentions légales ({{PLACEHOLDERS}})
├── politique-confidentialite.html → Politique de confidentialité ({{PLACEHOLDERS}})
├── assets/
│   ├── css/style.css     → styles (couleurs & polices dans :root, tout en haut)
│   ├── js/main.js        → interactions (config en haut du fichier)
│   └── img/              → images (placeholders SVG à remplacer)
└── README.md
```

---

## Personnaliser le site en quelques minutes

### 1. Les couleurs (2 min)
Tout est centralisé dans `assets/css/style.css`, bloc `:root` en tête de
fichier (section « 1. CONFIGURATION »). Deux palettes :

```css
--accent:  #D3A873;   /* doré — couleur principale        */
--bg:      #100D0A;   /* fond sombre                       */
--band-bg: #D2BB90;   /* bande beige marbrée               */
```
Chaque variable est commentée ; changez-les, tout le site suit.

### 2. Les polices (1 min)
- Titres : `--font-serif` (Cormorant Garamond) — texte : `--font-sans` (Jost).
- Si vous changez de police, mettez aussi à jour le `<link>` Google Fonts
  dans le `<head>` de **chaque page**.

### 3. Nom, textes, coordonnées (5 min)
Tout est dans les fichiers HTML, en clair. Recherchez / remplacez sur les
5 pages :
- **Nom** : `Menuiserie Dubois`
- **Téléphone** : `04 78 12 34 56` et les liens `tel:+33478123456`
- **Email** : `contact@menuiserie-dubois.fr`
- **Adresse** : `12 rue des Charpentiers`, `69003 Lyon`
- **Horaires** : blocs « Horaires » (pied de page + page contact)
- Le bloc **SEO** de chaque page (`<title>`, `<meta name="description">`,
  `<link rel="canonical">`) et les **données structurées** JSON-LD dans
  `index.html`.
- **Logo** : remplacez le losange `<span class="brand__diamond">` par
  `<img src="assets/img/logo.svg" alt="" height="40">` (commentaire dans
  le code).

### 4. Les images (3 min)
Le dossier `assets/img/` contient des **illustrations vectorielles** (SVG)
cohérentes avec le thème (cuisine, escalier, bibliothèque, dressing, fenêtres,
terrasse, atelier). Elles servent de visuels par défaut, prêts à être
remplacés par vos **photos réelles** en **gardant les mêmes noms** :
`work-1.svg` (cuisine) … `work-6.svg` (terrasse), `about.svg` (atelier),
`hero.svg` (affiche de la vidéo).

> Pour une photo, remplacez le fichier `.svg` par un `.jpg`/`.webp` et mettez
> à jour l'attribut `src` de la balise `<img>` (ou `poster` de la vidéo)
> correspondante.

- Vous pouvez aussi mettre des `.jpg`/`.webp` : changez alors les attributs
  `src` des balises `<img>` correspondantes.
- Les légendes plein écran de la galerie se règlent via `data-caption`.

### 5. La vidéo du hero (1 min)
Dans `index.html`, bloc `<video>` du hero : remplacez le `src` de la balise
`<source>` (idéalement un `.mp4` local, ex. `assets/video/hero.mp4`, sombre,
muet, en boucle). L'image `poster` s'affiche pendant le chargement.
La vidéo n'apparaît que dans le hero et se met en pause automatiquement dès
qu'il est recouvert.

### 6. Les avis Google (2 min)
Dans `index.html`, section « Ils nous font confiance » : le **carrousel
Coverflow** est constitué des blocs `<figure class="cf-review">` (5 avis).
Dupliquez / éditez le texte, le nom et la date de chaque avis, et **gardez
autant de puces `.cf-dot` que d'avis**. L'avis du milieu est mis en avant au
chargement. Mettez aussi à jour la note globale (« 4,9/5 — 47 avis ») et le
lien « Voir tous les avis sur Google » avec l'URL de votre fiche Google
Business.

### 7. Les services (2 min)
- Accueil : cartes `<a class="dark-card">` (3 aperçus).
- Page services : blocs `<article class="service-card">` — dupliquez-en
  un pour ajouter un service.

### 8. Google Maps (30 s)
Dans `contact.html`, section « CARTE » (conteneur premium `.map-card`) :
changez l'adresse à **deux** endroits — le paramètre `q=` de l'iframe **et**
le `destination=` du bouton « Itinéraire ».

### 9. Le formulaire de contact (2 min)
Prêt à être connecté. Par défaut il affiche un message de confirmation sans
rien envoyer. Pour recevoir les demandes par email :

1. Créez un endpoint chez un service au choix — [Formspree](https://formspree.io),
   [Getform](https://getform.io), [Basin](https://usebasin.com),
   [Web3Forms](https://web3forms.com)…
2. Ouvrez `assets/js/main.js` et renseignez la constante en haut du fichier :
   ```js
   var FORM_ENDPOINT = 'https://formspree.io/f/VOTRE_ID';
   ```
Le formulaire enverra les champs en `POST` (JSON) et gérera les états
d'envoi, de succès et d'erreur automatiquement.

### 10. Les pages légales (2 min)
`mentions-legales.html` et `politique-confidentialite.html` sont rédigées avec
des **placeholders** de la forme `{{NOM_ENTREPRISE}}`. Chaque page commence par
un **commentaire HTML récapitulant toutes les variables à remplacer** — un
simple rechercher/remplacer suffit :

| Placeholder | Exemple |
|---|---|
| `{{NOM_ENTREPRISE}}` · `{{FORME_JURIDIQUE}}` | Menuiserie Dubois · SARL |
| `{{ADRESSE}}` · `{{CODE_POSTAL}}` · `{{VILLE}}` | 12 rue des Charpentiers · 69003 · Lyon |
| `{{SIRET}}` · `{{DIRECTEUR_PUBLICATION}}` | 123 456 789 00012 · Jean Dubois |
| `{{TELEPHONE}}` · `{{EMAIL}}` | 04 78 12 34 56 · contact@… |
| `{{HEBERGEUR_NOM}}` · `{{HEBERGEUR_ADRESSE}}` · `{{HEBERGEUR_TELEPHONE}}` | OVH · Roubaix · … |
| `{{DUREE_CONSERVATION}}` · `{{SERVICE_FORMULAIRE}}` | 3 ans · Formspree |

> Ces pages sont en `noindex` (elles n'ont pas vocation à être référencées) et
> sont liées depuis le pied de page de toutes les pages du site.

---

## Effets & interactions (déjà en place)

- **Hero vidéo « rideau »** : la section suivante recouvre progressivement
  le hero au défilement ; parallaxe discret sur la vidéo et le texte ;
  la vidéo se coupe une fois recouverte et ne réapparaît plus.
- **Navigation premium** : transparente en haut de page, fond sombre flouté
  après quelques pixels de défilement ; menu mobile plein écran.
- **Profondeur** : bande beige marbrée fondue dans le noir par dégradés
  (aucune coupure brutale), ombre portée du contenu sur le hero.
- **Animations** : fade-in + translation au scroll (IntersectionObserver),
  cascade sur les grilles, micro-interactions sur les boutons — uniquement
  `transform` / `opacity`.
- **Carrousel Coverflow d'avis Google** : avis central mis en avant, avis
  latéraux plus petits/atténués pour la profondeur (translate + scale +
  opacity + léger pivot). Clic sur une carte latérale, flèches, puces,
  glissement tactile et clavier ; défilement auto en pause au survol/focus.
- **Carte Maps premium (contact)** : conteneur arrondi, ombre douce, teinte
  sombre assortie, bouton « Itinéraire » vers Google Maps.
- **Galerie** : ouverture des photos en plein écran (lightbox), clavier
  et touche Échap gérés.
- **Mobile** : bouton d'appel flottant visible après un léger défilement,
  téléphone toujours accessible dans l'en-tête.

## Détails techniques

- **Performances** : aucune dépendance hors Google Fonts (préconnecté),
  images `loading="lazy"`, JS `defer`, une seule boucle de scroll (rAF).
- **SEO** : HTML sémantique, métadonnées par page, Open Graph, JSON-LD
  `Carpenter` (schema.org), `alt` sur toutes les images.
- **Responsive** : mobile d'abord — grilles fluides (`auto-fit`), `clamp()`,
  menu mobile sous 960 px, hero en `100svh`.
- **Accessibilité** : lien d'évitement, navigation clavier, `aria-*`,
  focus visibles, respect de `prefers-reduced-motion` (parallaxe et
  animations désactivés).

## Mise en ligne
Hébergez le dossier tel quel sur n'importe quel hébergement statique :
Netlify, Vercel, GitHub Pages, Cloudflare Pages, ou un simple serveur FTP.
