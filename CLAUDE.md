# Site vitrine menuiserie

Site vitrine statique **premium** pour artisan menuisier, conçu comme un
**modèle réutilisable** : chaque nouveau client doit pouvoir être servi en
changeant quelques variables et les images.

**HTML, CSS et JavaScript natif uniquement.** Aucune dépendance, aucun build,
aucun framework. C'est une contrainte structurante : ne pas introduire npm,
bundler, ni bibliothèque externe.

## Lancer le site

Ouvrir `index.html` directement, ou lancer le serveur local défini dans
`.claude/launch.json` (`npx serve`, port 4173). Le serveur local est
nécessaire pour que la carte Google Maps de la page contact s'affiche.

## Structure

```
index.html                       Accueil
services.html  service-escaliers.html (page service type à dupliquer)
galerie.html  blog.html  contact.html
mentions-legales.html  politique-confidentialite.html
404.html                         Page introuvable (noindex)
robots.txt  sitemap.xml          Pour les moteurs (domaine à personnaliser)
assets/css/style.css             TOUS les styles (sections numérotées)
assets/js/main.js                TOUTES les interactions (modules numérotés)
assets/img/                      Illustrations SVG + texture + favicon
assets/fonts/                    Polices hébergées (RGPD) + licences OFL
```

L'en-tête et le pied de page sont **dupliqués dans chaque page** (pas
d'includes, site statique). Toute modification de nav/footer doit être
répercutée sur les 9 pages (y compris `404.html` et `service-escaliers.html`).

## Conventions

- **Couleurs et polices** : centralisées dans le bloc `:root` en tête de
  `style.css` (section 1). Deux palettes : thème sombre (`--bg`, `--accent`…)
  et bande beige marbrée (`--band-*`). Ne pas coder de couleur en dur.
- **`style.css` et `main.js`** sont organisés en sections numérotées avec un
  sommaire en tête. Ajouter une fonctionnalité = ajouter une section.
- **Formulaire de contact** : envoi via Web3Forms. La clé du client vit à
  **un seul endroit** : le champ caché `access_key` de `contact.html`
  (placeholder `{{WEB3FORMS_ACCESS_KEY}}`). Garde-fou : clé absente ou
  placeholder → message d'**erreur**. Le succès ne s'affiche que si
  Web3Forms répond `success: true`. Ne jamais réintroduire de « mode démo »
  qui confirme sans envoyer. Anti-spam : champ piège maison
  `champ_controle` (le `botcheck` de Web3Forms est déprécié).
- **Pages légales** : rédigées avec des placeholders `{{NOM_ENTREPRISE}}`,
  `{{SIRET}}`… Chaque page liste ses variables dans un commentaire HTML en
  tête.
- **Accessibilité** : lien d'évitement, `aria-*`, focus visibles, et respect
  de `prefers-reduced-motion` (les animations et le parallaxe sont désactivés).

## Composants JS (`main.js`)

En-tête au scroll · menu mobile · hero parallaxe · apparition au scroll
(`data-reveal` / `data-reveal-stagger`) · lightbox galerie · formulaire ·
**coverflow d'avis Google** · barre d'action mobile (CSS seul) · carte Google
Maps chargée au clic (RGPD) · **comparateur avant / après** (galerie :
`input type="range"` invisible qui pilote la variable CSS `--pos`).

## Pièges connus

- **Le hero est `position: sticky`** et la section suivante le recouvre au
  scroll (effet « rideau »). Conséquence : **seul le premier écran (100svh)
  du hero est visible**. Tout contenu ajouté au hero qui dépasse cette
  hauteur est invisible en permanence — vérifier la hauteur après tout ajout.
- **`[data-reveal]` masque le contenu** (`opacity: 0`) tant que
  l'IntersectionObserver ne l'a pas révélé. C'est volontairement conditionné
  à la classe `.js` sur `<html>` pour que la page reste lisible sans JS.
- Le **coverflow** calcule les positions des cartes en JS (translate + scale
  + rotateY) ; la hauteur de la scène suit la carte centrale. Le nombre de
  puces `.cf-dot` doit correspondre au nombre d'avis `.cf-review`.
- Les **transitions CSS sont gelées** quand l'onglet est en arrière-plan :
  une mesure de `getComputedStyle` peut alors renvoyer l'état de départ et
  non la valeur cible. Ne pas en conclure à un bug.

## À personnaliser pour un nouveau client

Le `README.md` détaille la procédure complète. En résumé : couleurs (`:root`),
nom/coordonnées (rechercher-remplacer sur les 9 pages, plus le domaine
dans `robots.txt` et `sitemap.xml`), images
(`assets/img/`, mêmes noms de fichiers), avis Google, services, clé
Web3Forms et messagerie pour les photos (WhatsApp, SMS ou Messenger) du
formulaire, adresse Google Maps, placeholders légaux, métadonnées SEO et
JSON-LD dans `index.html`.

- **Ne rien inventer** (coordonnées, SIRET, avis, chiffres) : demander à
  Raphaël ce qui manque, notamment la **clé Web3Forms** (il la crée avec
  l'email du client).
- Ne **jamais** ajouter `aggregateRating` (note des avis) au JSON-LD :
  Google interdit qu'une entreprise déclare la note de ses propres avis.
  La note visible sur la page, elle, se met à jour normalement.
- L'adresse est aussi **encodée dans les deux liens Google Maps** de
  `contact.html` (`%20` et `+`) : un rechercher-remplacer simple les rate.

## État actuel

Contenu de démonstration (« Menuiserie Dubois », Lyon, coordonnées fictives).
Deux éléments restent des placeholders assumés :

- la **vidéo du hero** pointe vers un fichier de démonstration externe ;
- les **images** sont des illustrations vectorielles maison, à remplacer par
  de vraies photos en conservant les noms de fichiers.

## Déploiement

Poussé sur GitHub, branche `main`. GitHub Pages est actif : chaque `git push`
redéploie le site en ligne automatiquement en une à deux minutes.
