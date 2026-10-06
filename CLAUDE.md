# Modèle de site vitrine menuiserie

Site vitrine statique **premium** pour artisan menuisier, conçu comme un
**modèle réutilisable**. Ce dossier est le modèle : **ne jamais le
personnaliser pour un client**. Chaque client se fait sur une copie.

Les procédures (recherche sur un client, personnalisation, démo puis
livraison) sont dans les skills `recherche-entreprise-artisan` et
`personnaliser-site-menuisier`. Ce fichier ne contient que ce qui est vrai
en permanence sur le code du site.

**HTML, CSS et JavaScript natif uniquement.** Aucune dépendance, aucun build,
aucun framework : ne pas introduire npm, bundler, ni bibliothèque externe.

## Lancer le site

Ouvrir `index.html`, ou lancer le serveur local de `.claude/launch.json`
(`npx serve`, port 4173). Le serveur est nécessaire pour la carte Google Maps.

## Structure

```
index.html                       Accueil
services.html  service-*.html    6 pages service (modèle : service-escaliers.html)
galerie.html  blog.html  contact.html
blog-*.html                      5 articles (modèle : blog-escalier-essences.html)
mentions-legales.html  politique-confidentialite.html
404.html                         Page introuvable (noindex)
robots.txt  sitemap.xml          Pour les moteurs (même domaine que les canonical)
manifest.webmanifest             Nom + icônes pour l'écran d'accueil des téléphones
assets/css/style.css             TOUS les styles (sections numérotées)
assets/js/main.js                TOUTES les interactions (modules numérotés)
assets/img/                      Illustrations SVG + texture + favicon + icônes
assets/fonts/                    Polices hébergées (RGPD) + licences OFL
```

L'en-tête et le pied de page sont **dupliqués dans chaque page** (pas
d'includes). Toute modification de nav/footer doit être répercutée sur les
19 pages, y compris `404.html`, les `service-*.html` et les `blog-*.html`.

## Conventions

- **Couleurs et polices** : uniquement dans le bloc `:root` en tête de
  `style.css`. Deux palettes : thème sombre (`--bg`, `--accent`…) et bande
  beige (`--band-*`). Pas de couleur en dur. Si `--band-bg` change, vérifier
  le contraste de `--band-accent-text`, `--band-muted` et `--band-faint`.
- **`style.css` et `main.js`** : sections numérotées avec sommaire en tête.
  Nouvelle fonctionnalité = nouvelle section.
- **Formulaire** (Web3Forms) : la clé vit à **un seul endroit**, le champ
  caché `access_key` de `contact.html`. Clé absente ou placeholder →
  message d'**erreur**. Succès affiché seulement si Web3Forms répond
  `success: true`, délai maximal 15 s. Ne jamais réintroduire de mode qui
  confirme sans envoyer. Anti-spam : champ piège `champ_controle`, pas
  d'attribut `action` dans le HTML.
- **Liens internes** : une carte de service ou une réalisation pointe vers
  sa page service si elle existe. Tous les boutons « Devis » pointent vers
  `contact.html#devis`. Jamais de `href="#"`.
- **Pages légales** : placeholders `{{NOM_ENTREPRISE}}`, `{{SIRET}}`…
  listés dans un commentaire en tête de chaque page.
- **Accessibilité** : lien d'évitement, `aria-*`, focus visibles, piège de
  focus dans le menu mobile et la lightbox, `prefers-reduced-motion`
  respecté, zones tactiles d'au moins 24 px.

## Composants JS (`main.js`)

En-tête au scroll · menu mobile · hero parallaxe · apparition au scroll
(`data-reveal` / `data-reveal-stagger`) · lightbox galerie · formulaire en
2 étapes · **coverflow d'avis** · barre d'action mobile (CSS seul) · carte
Google Maps chargée au clic (RGPD) · **avant / après** (galerie : `input
type="range"` invisible qui pilote la variable CSS `--pos`) · FAQ animée.

## Pièges connus

- **Le hero est `position: sticky`** et la section suivante le recouvre :
  **seul le premier écran (100svh) du hero est visible**. Tout ajout qui
  dépasse cette hauteur devient invisible. Vérifier jusqu'à 320 × 568.
- **`[data-reveal]` masque le contenu** (`opacity: 0`) jusqu'à
  l'IntersectionObserver, seulement si `<html>` a la classe `.js`.
- **Coverflow** : positions calculées en JS. Le nombre de puces `.cf-dot`
  doit égaler le nombre d'avis `.cf-review`.
- **Adresse encodée** dans les deux liens Google Maps de `contact.html`
  (`%20` et `+`) : un rechercher-remplacer simple les rate.
- **`noindex`** : présent sur les pages publiques en démo, signalé par un
  commentaire « MODÈLE DE DÉMONSTRATION ». Les pages légales et la 404 le
  gardent toujours.
- **Délais de la FAQ** : repérés par un commentaire `⚙️ DÉLAI`.
- **Performances mobiles** : jamais de filtre SVG (`feTurbulence`…) en
  image de fond, il faut plusieurs secondes de calcul par tuile sur un
  téléphone. La texture de la bande est `texture-marbre.jpg`, une image
  tirée de `texture-marbre.svg` (garder le .svg comme source). Sous
  960 px, la section 18 du CSS et `smallScreen` dans `main.js` retirent le
  flou de l'en-tête, le parallaxe et la 3D du carrousel.
- **Transitions gelées** quand l'onglet est en arrière-plan :
  `getComputedStyle` peut renvoyer l'état de départ. Ce n'est pas un bug.

## Interdits

- `aggregateRating` (note des avis) dans le JSON-LD.
- « Bois durable », « forêts gérées », « écologique » sans certificat PEFC ou
  FSC (directive UE 2024/825).
- Écrire que *tous* les ouvrages sont couverts par la décennale.
- Coordonnées réalistes dans le modèle : il reste au nom fictif
  « Menuiserie Ferlanne », téléphone en 04 65 71 (plage Arcep réservée à la
  fiction), domaine = adresse GitHub Pages de la démo.

## Placeholders assumés du modèle

Vidéo du hero (fichier externe de démonstration) et illustrations SVG
(remplacées par de vraies photos en gardant les mêmes noms de fichiers).

## Déploiement

Dépôt GitHub, branche `main`, GitHub Pages actif : chaque `git push`
redéploie en une à deux minutes. Ce dépôt est **public** : n'y mettre
aucune information client (fiches, notes, feuilles d'appel).
